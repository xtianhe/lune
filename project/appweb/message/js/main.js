(function(){
    var num = 0;
    var message = {
        'key': 'comment',
        'comment': [],
        init:function() {
            this.updateCache();
            this.initRefresher();
            this.restoreComment();
            this.initComment();
        },
        initRefresher: function(){
            refresher.init({
                id: "wrapper", //<------------------------------------------------------------------------------------┐
                pullDownAction: this.refresh, //回调函数
                pullUpAction: this.load //回调函数
            });
        },
        restoreComment: function(){
            var _this = this;
            localforage.getItem(_this.key, function(err, lists) {
                console.log('reading', lists);
                Array.prototype.push.apply(_this.comment, lists);
                _this.insertNext(lists||[]);
                wrapper.refresh();
            });
        },
        initComment: function() {
            var _this = this;
            $.ajax({
                url: "http://topv.yunfan.com/webapi/index/getmycomment/?user_id=0&uid=1cb094cc3c1b",
                dataType: "jsonp",
                jsonp: 'callback',
                success: function(res) {
                    var lists = res.data.list;
                    console.log(lists);
                    _this.insertComment(lists);
                    _this.insertNext(lists);
                    wrapper.refresh();
                },
                error: function(res) {
                    console.log("initComment ajax error:" + res);
                }
            });
        },
        refresh: function(){
            var _this = message;
            $.ajax({
                url: "http://topv.yunfan.com/webapi/index/getmycomment/?user_id=0&uid=1cb094cc3c1b",
                dataType: "jsonp",
                jsonp: 'callback',
                success: function(res) {
                    var lists = res.data.list;
                    console.log(lists);
                    _this.insertComment(lists);
                    _this.insertPrev(lists);
                    wrapper.refresh();
                },
                error: function(res) {
                    console.log("refresh ajax error:" + res);
                }
            });
        },
        load: function(){
            var _this = message;
            $.ajax({
                url: "http://topv.yunfan.com/webapi/index/getmycomment/?user_id=0&uid=1cb094cc3c1b",
                dataType: "jsonp",
                jsonp: 'callback',
                success: function(res) {
                    var lists = res.data.list;
                    console.log(lists);
                    _this.insertComment(lists);
                    _this.insertNext(lists);
                    wrapper.refresh();
                },
                error: function(res) {
                    console.log("load ajax error:" + res);
                }
            });
        },
        insertComment: function(lists){
            Array.prototype.push.apply(this.comment, lists);
            this.comment = this.comment.slice(0,10);
            localforage.setItem(this.key, this.comment, function(err, value) {
                console.log('saving', value);
            });
        },
        // insertPrev: function(lists){
        //     for (i = 0; i < lists.length; i++) {
        //         $("#wrapper ul").prepend(this.getWrapperLi(lists[i]));
        //     }
        // },
        // insertNext: function(lists){
        //     for (i = 0; i < lists.length; i++) {
        //         $("#wrapper ul").append(this.getWrapperLi(lists[i]));
        //     }
        // },
        insertPrev: function(lists){
            $("#wrapper ul").prepend(this.getWrapperUl(lists));
        },
        insertNext: function(lists){
            $("#wrapper ul").append(this.getWrapperUl(lists));
        },
        getWrapperUl: function(lists){
            var str = '';
            for (i = 0; i < lists.length; i++) {
                str += this.getWrapperLi(lists[i]);
            }
            return str;
        },
        getWrapperLi: function(list){
            var str = '<li class="wrapper-li">' +
                    '<div class="part1">' +
                    '<i class="avatar"><img src="' + list.user_photo + '"></i>' +
                    '<div class="user-info">' +
                    '<p class="c-999">'+ list.user_name +'</p>' +
                    '<p>' + list.content + '</p></div>' + ++num +
                    '<span class="receive-time">'+ this.getPubTime(list.pub_time) +'</span></div>' +
                    '<div class="part2">' +
                    '<p>评价影视：<span>' + list.title + '</span></p></div></li>';
            return str;
        },
        getPubTime: function(pubTime){
            var curTime = new Date().getTime()/1000;
            var secend = curTime - pubTime;
            if (secend < 60 ) {
                return parseInt(secend) + "秒前";
            }else if (secend < 60 * 60) {
                return parseInt(secend/60) + "分前";
            }else if (secend < 60 * 60 * 24) {
                return parseInt(secend/(60 * 60)) + "小时前";
            }else{
                return parseInt(secend/(60 * 60 * 24)) + "天前";
            }
        },
        addHandler: function(element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent("on" + type, handler);
            } else {
                element["on" + type] = handler;
            }
        },
        updateCache: function(){
            this.addHandler(applicationCache, "updateready", function() {
                if(window.applicationCache.status == window.applicationCache.UPDATEREADY){
                    window.applicationCache.update();
                    window.applicationCache.swapCache();
                    window.location.reload();
                }
            });
        }
    }
    return message;
})().init();
