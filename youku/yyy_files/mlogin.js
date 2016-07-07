(function (w) {
	var self,
		cbfuns = [],
		lwin,
		sframe,
		username,
		password;

	if (w.Local && w.Local.PASSPORT_DOMAIN) {
		var passport_url =  'http://'+ w.Local.PASSPORT_DOMAIN;
	} else {
		var passport_url =   w.passport_url || 'http://'+ window.location.host;
	}


function U8_16(_1) {
	var i, len, c;
	var char2, char3;
	var ary = [];
	len = _1.length;
	i = 0;
	while (i < len) {
		c = _1.charCodeAt(i++);
		switch (c >> 4) {
		case 0:
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
			// 0xxxxxxx
			ary.push(_1.charAt(i - 1));
			break;
		case 12:
		case 13:
			// 110x xxxx   10xx xxxx
			char2 = _1.charCodeAt(i++);
			ary.push(String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F)));
			break;
		case 14:
			// 1110 xxxx 10xx xxxx 10xx xxxx
			char2 = _1.charCodeAt(i++);
			char3 = _1.charCodeAt(i++);
			ary.push(String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0)));
			break;
		}
	}
	return ary.join('');
}
function decode64(_1) {
	if(!_1) return '';
	var _2 = "ABCDEFGHIJKLMNOP"+"QRSTUVWXYZabcdef"+"ghijklmnopqrstuv"+"wxyz0123456789+/"+"=";
	var _3 = "";
	var _4, _5, _6;
	var _7, _8, _9, _a;
	var i = 0;
	_1 = _1.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	do {
		_7 = _2.indexOf(_1.charAt(i++));
		_8 = _2.indexOf(_1.charAt(i++));
		_9 = _2.indexOf(_1.charAt(i++));
		_a = _2.indexOf(_1.charAt(i++));
		_4 = (_7 << 2) | (_8 >> 4);
		_5 = ((_8 & 15) << 4) | (_9 >> 2);
		_6 = ((_9 & 3) << 6) | _a;
		_3 = _3 + String.fromCharCode(_4);
		if (_9 != 64) {
			_3 = _3 + String.fromCharCode(_5);
		}
		if (_a != 64) {
			_3 = _3 + String.fromCharCode(_6);
		}
	} while (i < _1.length);
	return U8_16(_3);
}
function encode64(str)
{
	if(!str) return '';
	str = str.toString();
	var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var base64DecodeChars = new Array(
       -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
       -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
       -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
       52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
       -1, 0,   1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
       15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
       -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
       41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1
	);
	var out, i, len;
	var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
	while(i < len) {
		c1 = str.charCodeAt(i++) & 0xff;
		if(i == len)
		{
		    out += base64EncodeChars.charAt(c1 >> 2);
		    out += base64EncodeChars.charAt((c1 & 0x3) << 4);
		    out += "==";
		    break;
		}
		c2 = str.charCodeAt(i++);
		if(i == len)
		{
		    out += base64EncodeChars.charAt(c1 >> 2);
		    out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
		    out += base64EncodeChars.charAt((c2 & 0xF) << 2);
		    out += "=";
		    break;
		}
		c3 = str.charCodeAt(i++);
		out += base64EncodeChars.charAt(c1 >> 2);
		out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
		out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
		out += base64EncodeChars.charAt(c3 & 0x3F);
	}
	return out;
}
	var htmllock = false;

	var loginUI_show_do = function(){
		/*$('.fixedBar').hide();
		var sidebar = $('.sidebar');
		if(sidebar.css('display') == 'block'){
			sidebar.attr('login_show', 'true');
			sidebar.hide();
		}else{
			sidebar.attr('login_show', 'false');
		}*/
		if(typeof(MHeader) == 'object'){
			MHeader.unfix();
			MHeader.dropmenuGroup.hideAll();
		}
        if($('#player_tabsbox').length){//评论弹框
            $('#player_tabsbox').hide();
        }
        if($('#player').length){//播放器
            $("#player").css('visibility','hidden');
        }
	}
	var loginUI_hide_do = function(){
		/*$('.fixedBar').show();
		var sidebar = $('.sidebar');
		if(sidebar.attr('login_show') == 'true'){
			sidebar.show();
		}*/
		if(typeof(MHeader) == 'object'){
			MHeader.dofix();
		}
        if ($('#player_tabsbox').length){
            $('#player_tabsbox').show();
        }
        if($('#player').length){//播放器
            $("#player").css('visibility','visible');
        }
	}

    var accountValid = false, //账户是否验证通过
        accountError = '',  //账户验证错误信息记录
        needCaptcha = false; //是否需要验证码

	function login(callback) {
		return new login.prototype.init(callback);
	}

	login.fn = login.prototype = {
		constructor: login,

		init: function(callback) {
			if (typeof callback == 'function')
				this.addCallback(callback);
			this.show();
			return this;
		},

		show: function(data) {
			if(!lwin && !htmllock) {
				htmllock = true;
				$.ajax({
					url: passport_url+'/index/mlogin?callback=?',
					dataType: 'jsonp',
					context: this
				}).done(function(data) {
					htmllock = false;
					$(data.data).appendTo($('body'));
					lwin = {
						dialog: $('#yk-winlogin'),
						form: $('#winlogin-form'),
						close: $('#winlogin-close'),
						error: $('#winlogin-error'),
						name: $('#yk-winlogin [name="username"]'),
						pass: $('#yk-winlogin [name="password"]'),
						icode: $('#captcha-entry'),
						captcha: $('#yk-winlogin [name="captcha"]'),
						captimg: $('#captcha-img'),
						renew: $('#switch-captcha'),
						mask: $('#yk-mask'),
                        stfrom: $('#stFrom'),
                        thirdLogin: $('.thirdLogin')
					}
					this.loginFormInit();
					return this.show();
				});
			} else {
				loginUI_show_do();
				lwin.dialog.css({
					display: 'block',
					top: (
							$(document).scrollTop()
							//将位置由居中 改为 置顶
							//+ ($(window).height() - lwin.dialog.height())/2
						) + 'px'
				});
				lwin.name.val('');
				lwin.pass.val('');
				lwin.captcha.val('');
				lwin.mask.height($(document).height());
				lwin.mask.show();
                $(document).trigger('mloginshow');
			}

            var ua = navigator.userAgent.toLowerCase();
            if (ua.indexOf('micromessenger') != -1) {
                $('#alipayThirdLogin').hide();
                //$('#taobaoThirdLogin').hide();
                $('#wechatThirdLogin').show();
            }
		},

		renew: function() {
			var capturl = lwin.captimg.attr('src'),
				repattern = /([?&])\d+$/,
				ret;

			ret = repattern.exec(capturl);

			if(ret) {
				lwin.captimg.attr(
					'src', capturl.substring(0, capturl.length - ret[0].length) + ret[1] + (+new Date)
				);
			} else {
				if(capturl.indexOf('?') >= 0) {
					lwin.captimg.attr('src', capturl+'&'+(+new Date));
				} else {
					lwin.captimg.attr('src', capturl+'?'+(+new Date));
				}
			}
			//console.log(lwin.captimg.attr('src'));
		},

		error: function(msg) {
			if(!lwin) return this;

			if(typeof msg != 'string' || msg == '') {
				lwin.error.html('');
			}
			lwin.error.html(msg);
			lwin.error.css({display: 'block'});
		},

		loginFormInit: function() {
			if(!lwin) return this;
			var that = this;

			lwin.name.removeAttr('readonly');
			lwin.pass.removeAttr('readonly');
			lwin.captcha.removeAttr('readonly');
			lwin.form.removeAttr('disabled');
			lwin.dialog.find('button').removeAttr('disabled')
			lwin.name.val('');
			lwin.pass.val('');
			lwin.captcha.val('');
            lwin.stfrom.val(that._genStfromParam());

			lwin.close.on('click', function(e) {
				lwin.dialog.hide();
				lwin.mask.hide();
				lwin.error.html('');
				loginUI_hide_do();
			});

			lwin.dialog.on('focus', 'input', function(){ return false; });
			lwin.dialog.on('blur', 'input', function(){ return false; });
			lwin.thirdLogin.on('click', function(){
                var url = passport_url+'/partner_thirdLoginEntry/tlsite_'+$(this).attr('data-ename')+'_tlclient_ykmweb?stfrom='+that._genStfromParam();
                window.location.href = url;
            });

            lwin.name.on('change', function(e){
                var val = $(this).val();
                if(val){
                    that.chkAccount.apply(that, [val]);
                }
            });

			lwin.renew.add(lwin.captimg).on('click', function(e) {
				that.renew.apply(that);
				e.preventDefault();
			});

			lwin.form.on('submit', function(e) {
                that.submit.apply(that, [e]);
            });

		},

        chkAccount: function(val){
            var _this = this, msg = '';
            $.getJSON(passport_url + '/user/chkAccountJSONP?callback=?', {inputs: val}, function(rs){
                rs = parseInt(rs, 10);
                if(rs >= 0){
                    msg = '';
                    _this.error(msg);
                    accountError = msg;
                    accountValid = true;
                }else if(rs === -1){
                    msg = '用户不存在！';
                    _this.error(msg);
                    accountError = msg;
                    accountValid = false;
                    needCaptcha = false;
                }else if(rs === -2){
                    msg = '';
                    _this.error(msg);
                    accountValid = true;
                    needCaptcha = true;
                }else if(rs === -4){
                    msg = '用户名已修改过请重新登录！';
                    _this.error(msg);
                    accountError = msg;
                    accountValid = false;
                }else{
                    msg = '系统错误！'
                    _this.error(msg);
                    accountError = msg;
                    accountValid = false;
                }
                if(needCaptcha){
                    lwin.icode.show();
                    var capturl = lwin.captimg.attr('_src');
                    lwin.captimg.attr('src', capturl+'?'+(+new Date));
                }else{
                    lwin.icode.hide();
                }
            });
        },

		submit: function(e) {
			if(!lwin) return false;

			if(lwin.name.val() == '') {
				this.error('必须填写用户名！');
				lwin.name.focus();
				e.preventDefault();
				return false;
			}else if(!accountValid){//账户是否通过验证
                this.error(accountError);
                lwin.name.focus();
                e.preventDefault();
                return false;
            }
			if(lwin.pass.val() == '') {
				this.error('必须填写密码！');
				lwin.pass.focus();
				e.preventDefault();
				return false;
			}
			if(needCaptcha && lwin.captcha.val() == '') {
				this.error('必须填写验证码！');
				lwin.captcha.focus();
				e.preventDefault();
				return false;
			}

			lwin.name.attr('readonly', true);
			lwin.pass.attr('readonly', true);
			lwin.captcha.attr('readonly', true);
			lwin.dialog.find('button').attr('disabled', true);
			this.error();

			username = lwin.name.val();
			password = lwin.pass.val();
			if(!sframe) {
				sframe = $('<iframe name="winlogin-submit-iframe" id="winlogin-submit-iframe"></iframe>')
					.css({
						height: 0, width:0, display: 'none',
					}).appendTo($('body'));
				lwin.form.attr('target', 'winlogin-submit-iframe');
				lwin.form.append($('<input type="hidden" name="callback" value="mloginCallback"/>'));
			}
			//setTimeout(function() {lwin.form.attr('disabled', true);}, 1);

            return true;
		},

		subresult: function(data) {
			lwin.name.removeAttr('readonly');
			lwin.pass.removeAttr('readonly');
			lwin.captcha.removeAttr('readonly');
			lwin.form.removeAttr('disabled');
			lwin.dialog.find('button').removeAttr('disabled')

			lwin.name.val(username || '');
			lwin.pass.val(password || '');
			username = password = null;

			var capturl = lwin.captimg.attr('_src');

			if(data == -7) {
				this.error('请填写验证码');
//				lwin.captimg.attr('src', lwin.captimg.attr('_src'));
//				lwin.icode.show();
                needCaptcha = true;
                lwin.icode.show();
				lwin.captimg.attr('src', capturl+'?'+(+new Date));
                lwin.captcha.select();
            } else if(data == -8) {
				this.error('验证码错误');

				lwin.captimg.attr('src', capturl+'?'+(+new Date));
				lwin.captcha.select();
			} else if(data == -3) {
				this.error('近期用户名修改失败请重试');
				lwin.name.select();

				lwin.captimg.attr('src', capturl+'?'+(+new Date));
			} else if(data == -5) {
				this.error('用户名已修改过请重新登录');
				lwin.name.select();

				lwin.captimg.attr('src', capturl+'?'+(+new Date));
			} else if(data == -4) {
				this.error('该帐号无法登录');
				lwin.name.select();

				lwin.captimg.attr('src', capturl+'?'+(+new Date));
			} else if(data == -9 || data == -6) {
				this.error('错误次数过多请3小时后再试');

				lwin.captimg.attr('src', capturl+'?'+(+new Date));
			} else if(data == -10) {
				this.error('错误次数过多请24小时后再试');

				lwin.captimg.attr('src', capturl+'?'+(+new Date));
			} else if(data == -1 || data == -2 || data === null) {
				this.error('帐号或密码错误');
				lwin.name.select();

				lwin.captimg.attr('src', capturl+'?'+(+new Date));
			} else if(data) {
				lwin.name.val('');
				lwin.pass.val('');
				lwin.captcha.val('');
				lwin.dialog.hide();
				lwin.mask.hide();
				if(typeof(MHeader) == 'object'){
					loginUI_hide_do();
				}
				$(cbfuns).each(function(e, t) {
					if(typeof t == 'function') t();
				});
				$(document).trigger('userlogin').trigger('userchange');

                // 跨域登录
                var cUrl = passport_url+'/user/crossdomain?yktk=' + this.getCookie('yktk');
                var hIframe = $('<iframe id="to-crossdomain"></iframe>')
                              .css({height: 0, width:0, display: 'none',})
                              .appendTo($('body'));
                hIframe.attr('src', cUrl);
			}
		},
		getCookie: function(n){
            var name = n + '=';
            var ca = document.cookie.split(';');
            for(var i=0;i<ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
            }
            return '';
        },

		addCallback: function(cbfun) {
			if(typeof cbfun != 'function') return;
			cbfuns.push(cbfun);
		},
		rmCallBack: function(cbfun) {
			if(typeof cbfun != 'function') return;
			$.grep(cbfuns, function(v) { return v != cbfun; });
		},
        _genStfromParam: function(){
            var locationUrl = encodeURIComponent(window.location.href);
            var referrerUrl = encodeURIComponent(window.document.referrer);
            var operateForSt = 'mlogin';

            return encodeURIComponent(locationUrl+ '@@'+ referrerUrl+ '@@'+ operateForSt);
        }
	};
	login.fn.init.prototype = login.fn;

	login.islogin = function() {
		var username = '';
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf('u=') == 0 || c.indexOf('k=') == 0) var _c = c;
			if(c.indexOf('yktk=') == 0){
				var u_info = decode64(decodeURIComponent(c).split("|")[3]);
				if(u_info.indexOf(",") > -1 && u_info.indexOf("nn:") > -1 && u_info.indexOf("id:") > -1){
					 var username = u_info.split(",")[1].split(":")[1];
					 if(username != '') break;
				}
			}
		}
		if(username == ''){
			if(_c){
				var username = _c.substring(2,_c.length);
				if(username == '__LOGOUT__') username = '';
			}
		}
		return (username == '') ? false : true;
	};
    login.getUserInfo = function(){
        var userInfo = {};
        var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if(c.indexOf('yktk=') == 0){
				var u_info = decode64(decodeURIComponent(c).split("|")[3]);
				if(u_info.indexOf(",") > -1 && u_info.indexOf("nn:") > -1 && u_info.indexOf("id:") > -1){
                     userInfo['userid'] = u_info.split(",")[0].split(":")[1];
                     userInfo['username'] = u_info.split(",")[1].split(":")[1];
                     break;
				}
			}
		}

        return userInfo;
    };
	login.logout = function(callback) {
        var youkulogout = function(){
            //iframe logout request for redirect 302
            var callbackname = 'logout' + (+new Date()),
                iframe = document.createElement('iframe'),
                url = 'http://login.youku.com/user/logout?callback=' + callbackname;
            iframe.src = url;
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            //create function for callback
            window[callbackname] = function(rs){
                if(rs && rs.errno === 1){
                    iframe.parentNode.removeChild(iframe);
                    try{ delete window[callbackname]; } catch(e){ }
                    if(typeof(callback) === 'function'){
                        callback(rs);
                    }else{
                        window.top.location.reload();
                    }
                    $(document).trigger('userlogout').trigger('userchange');
                }
            }
        }
        //use new passport:
        //from: https://account.youku.com/static-resources/js/loadFrame.js
        if(typeof getLoginFrame != 'undefined'){
            new getLoginFrame({
                loginOrLogout: 'logout',
                logoutSuccess: function(){
                    youkulogout();
                }
            });
        }else{
            youkulogout();
        }
	};
	w.login = login;
	w.islogin = login.islogin;
	w.logout = login.logout;
    w.mloginCallback = function(ret) {login().subresult(ret);},
	w.decode64 = decode64;

})(window);