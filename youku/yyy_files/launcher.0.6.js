!function(e){function t(e,t,n){n?(e.source=e.x_source,delete e.x_source):(e.x_source=e.source,e.source=t)}function n(e,t,n){for(key in t)(!n||n.indexOf(key)>-1)&&(e[key]=t[key]);return e}function o(e){var t=document.cookie.match(RegExp("(^| )"+e+"=([^;]*)(;|$)"));return null!=t?unescape(t[2]):null}function i(e,t,n){return"undefined"==typeof e[t]?n:e[t]}function r(e){var t=document.createElement("a");t.href=e;var n=t.search&&t.search.substring(1);return a(n)}function a(e){if(!e)return{};var t=e.split("&"),n={};return t.forEach(function(e){var t=e.split("=");n[t[0]]=decodeURIComponent(t[1])}),n}function c(e,t){var n=[];for(key in e)t?n.push(key+"="+e[key]):n.push(encodeURIComponent(key)+"="+encodeURIComponent(e[key]));return n.join("&")}function s(e){document.getSelection().removeAllRanges();var t=document.createRange();t.selectNodeContents(e),document.getSelection().addRange(t)}function u(e){var t=new Image;t.src="http://link-jump.youku.com/t/ac.gif?ok="+e+"&ua="+encodeURIComponent(navigator.userAgent)}function d(){var e=r(location.href),t={ua:w},i=o("__ysuid");return n(t,e,["refer","tuid"]),i&&(t.cookieid=i+"|"+x.uuid(6)),t}function p(t){t=t||{},this.hasWebSocket="WebSocket"in e,this.webSocketEnabled=i(t,"webSocketEnabled",k),this.copyCodeEnabled=i(t,"copyCodeEnabled",!1),this.yingyongbaoEnabled=i(t,"yingyongbaoEnabled",k&&b),this.yingyongbaoCallback=i(t,"yingyongbaoCallback"),this.onCodeCopied=i(t,"onCodeCopied"),this.onPromptCopy=i(t,"onPromptCopy"),this.port=i(t,"port",51200),this.universalLink=i(t,"universalLink","http://link-jump.youku.com/a/"),this.universalRedirect=i(t,"universalRedirect",location.href),this.trackConfig=i(t,"trackConfig",{})}function h(e,t){var n=document.createElement("div");n.className=t,n.style.cssText="width: 200px; height: 30px;";var o=document.createElement("input");if(o.type="text",o.id="code-launcher-input",f&&!m){var i=document.createElement("span");i.innerText=">>点击 ";var r=document.createElement("span");r.innerText=" 复制<<",o.style.cssText="font-size: 1px; letter-spacing: -1px; width: 2px; height: 14px; line-height: 14px;",n.appendChild(i),n.appendChild(o),n.appendChild(r)}else{var a=document.createElement("p");a.innerText=g?"请全选并'剪切'下面的文本":"请全选并复制下面的文本",n.appendChild(a),n.appendChild(o)}this.box=n,this.input=o,this.code=e}function l(e,t,n){var o=document.createElement("script"),i=function(e){return function(){document.body.removeChild(o),e&&e()}};o.onload=i(t),o.onerror=i(n),o.defer=!0,o.async=!0,document.body.appendChild(o),e.nonce=(new Date).getTime(),o.src="http://statis.api.3g.youku.com/openapi-wireless/statis/recall_app_service?"+c(e)}var y=/MQQBrowser|micromessenger|weibo|QQ/i.test(navigator.userAgent),g=/MQQBrowser/.test(navigator.userAgent),f=/iPhone|iPod/.test(navigator.userAgent),v=/iPhone|iPod/.test(navigator.userAgent)&&/ OS 9_/.test(navigator.userAgent),m=/iPhone|iPod/.test(navigator.userAgent)&&/ OS (6_|7_)/.test(navigator.userAgent),k=(/ QQ\//.test(navigator.userAgent),/Android/.test(navigator.userAgent)),b=/MicroMessenger/.test(navigator.userAgent),C=/iPad/.test(navigator.userAgent)?"youkuhd://":"youku://",_=/weibo/i.test(navigator.userAgent),E=/UCBrowser/.test(navigator.userAgent),w=function(){return b?"wechat":_?"weibo":E?"uc":"other"}(),x={chars:"0123456789abcdefghijklmnopqrstuvwxyz",uuid:function(e){for(var t=this.chars.length,n=[],o=0;e>o;o++)n.push(this.chars[parseInt(Math.random()*t)]);return n.join("")}},S={key:"_h5_app_launcher_track_key",restore:function(){var e=localStorage.getItem(this.key);return JSON.parse(e||"[]")},backup:function(e){var t=this.restore();t.push(e),localStorage.setItem(this.key,JSON.stringify(t))},resend:function(){var e=this.restore(),t=this;for(this.clear(),e.reverse();e.length;){var n=e.pop();n._t_retry&&n._t_retry>2||!function(e){l(e,function(){},function(){e._t_retry=(e._t_retry||0)+1,t.backup(e)})}(n)}},clear:function(){localStorage.removeItem(this.key)}};S.resend(),h.prototype.attach=function(e){e.appendChild(this.box)},h.prototype.show=function(){var e=this.code;if(this.input.value=this.code,g)this.input.addEventListener("input",function(e){if(0==this.value.length){var t=document.createEvent("Event");t.initEvent("copy",!0,!0),t.target=e.target,e.target.dispatchEvent(t)}});else{this.input.focus(),this.input.setSelectionRange(0,this.code.length);var t=this.input;this.input.addEventListener("focus",function(){setTimeout(function(){t.setSelectionRange(0,e.length)},300)}),this.box.addEventListener("click",function(){t.focus()})}},h.prototype.detach=function(){this.box.parent.removeChild(this.box)},p.prototype._track=function(e,t,o){var i={pagetype:1,datetime:parseInt((new Date).getTime()/1e3),sender:1,pid:f?"69b81504767483cf":"0d7c3ff41d42fcd9"};n(i,e),n(i,this.trackConfig),S.backup(i);var r=function(){t&&t()},a=function(){o&&o()};l(i,r,a)},p.prototype.launch=function(e){return n(e,d()),e.ccts=(new Date).getTime(),e.action=e.action?e.action:"play",y?void(v&&this.universalLink?this._launchViaUniversalLink(e):this.hasWebSocket&&this.webSocketEnabled?this._launchViaWebSocket(e):this._launchNoWebSocket(e)):void this._directLaunch(e)},p.prototype._directLaunch=function(e){var t=C+e.action+"?"+c(e,f);if(this._track(e),v)window.location.href=t;else{var n=document.createElement("iframe");n.width=0,n.height=0,n.src=t,document.body.appendChild(n),setTimeout(function(){document.body.removeChild(n)},1e3)}},p.prototype._tryCopyCode=function(e){var t=document.createElement("p");t.style.cssText="position: absolute; top: -1000px; width: 0; height: 0",t.innerText=e,document.body.appendChild(t),s(t);var n=document.execCommand("copy");return document.body.removeChild(t),u(n),n},p.prototype._promptCopy=function(t){if(this.onPromptCopy){var o=this;this.onPromptCopy(t);var i=((new Date).getTime(),function(e){"code-launcher-input"==e.target.id&&setTimeout(function(){e.target.value=t,o.onCodeCopied&&o.onCodeCopied(),document.activeElement.blur(),o._track(n(params,{source:"copycode"}),function(){o.yingyongbaoEnabled&&o.yingyongbaoCallback()})},300)});e.addEventListener("copy",i),e.addEventListener("cut",i)}},p.prototype._launchNoWebSocket=function(e){t(e,"copycode",!1);var o=c(e,f),i=btoa(o);t(e,"copycode",!0);var r=this._tryCopyCode(i);this.copyCodeEnabled&&(r?this.onCodeCopied&&this.onCodeCopied():this._promptCopy(i)),this.copyCodeEnabled&&!r||!this.yingyongbaoEnabled||(r?this._track(n(e,{source:"copycode"}),this.yingyongbaoCallback):this.yingyongbaoCallback())},p.prototype._launchViaWebSocket=function(e){var o=new WebSocket("ws://127.0.0.1:"+this.port);t(e,"copycode",!1);var i=c(e,f),r=btoa(i),a=this._tryCopyCode(r),s=this,u=setTimeout(function(){o.onerror()},1e3);o.onerror=function(){clearTimeout(u),s.copyCodeEnabled&&(a?s.onCodeCopied&&s.onCodeCopied():s._promptCopy(r)),s.copyCodeEnabled&&!a||!s.yingyongbaoEnabled||(a?s._track(n(e,{source:"copycode"}),s.yingyongbaoCallback):s.yingyongbaoCallback())},o.onopen=function(){clearTimeout(u),t(e,"copycode",!0),e.special=2,s._track(e),this.send(c(e,f)),this.close()}};var T={key:"_h5_app_launcher_ios9_timestamp",save:function(){localStorage.setItem(this.key,(new Date).getTime())},restore:function(){return parseInt(localStorage.getItem(this.key)||0)}};p.universalLinkFailed=function(){return v&&(new Date).getTime()-T.restore()<=3e4},p.prototype._launchViaUniversalLink=function(t){this.universalRedirect&&(t.fallback_url=encodeURIComponent(this.universalRedirect)),t.fua=/Safari\/\d+(\.\d+)*$/.test(navigator.userAgent)?"safari":"other",t.special=1,t.ts=(new Date).getTime();var n=this;this._track(t),T.save(),e.location.href=n.universalLink+t.action+"?"+c(t,f)},p.universalLinkFailed()&&(window._ExternalPromptDownload||alert("请下载最新的优酷客户端~")),e.Launcher=p,p.CodeBox=h}(window);