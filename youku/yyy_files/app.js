(function(W){
  var tracked = {};
  W.hz = {
    track: function(id, data){
      tracked[id] = data;
    },
    url: "http://hz.youku.com/red/click.php?tp=1&cpp=1000974"
  };

  function validLink(link) {
    return link && /^http/.test(link);
  }

  W.addEventListener('click', function(e) {
    var t = tracked[e.target.dataset.track];
    if (t) {
      var img = new Image();
      img.src = hz.url + "&rand=" + new Date().getTime() + "&cp=" + t + encodeURIComponent((validLink(e.target.getAttribute('href')) ? ("&url=" + e.target.href) : ""));
    }
  }, true);


  W.BDApi = {
    follow: function(pid) {
      return $.post("/user/collection/add", {"clid": pid});
    },

    unfollow: function(pid) {
      return $.post("/user/collection/delete", {"clid": pid});
    },

    followed: function(pid) {
      return $.get("/user/collection/followed", {"clid": pid});
    }
  };
})(window);
