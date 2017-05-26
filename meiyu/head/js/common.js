;
!function () {
	var url_host = 'http://10.1.1.210:8090/';//更改接口域名
	
    /** @description 创建初始化*/
    function CreateObject(obj) {
        var func = function () {};
        func.prototype = obj || {};
        func.constructor = func;
        return new func();
    }
    /**@description ajax对象**/
    var ajaxObj = {
        url: '',
        method: 'get',
        data: '',
        dataType: 'json',
        callback: '',
        retoken: '',
        isJsonp: 'json'        
    };
    
	var ispreRender = 'no';		//开关是否preRender
    
    /** @description 数据层 */
    var ajaxService = {
		//接口对象
		setPreRender:function(d) {
			ispreRender = d;	//设置preRender开关
		},
		urlObj : {
        regStep1 : 'account/reg1',//注册第一步, 发送短信验证码
		regStep2 : 'account/reg2',//注册第二步, 验证短信验证码和设置密码
        login:'account/login'
        },
		port: url_host,
        //发送
        send: function (callback) {
            if (ajaxObj.isJsonp) {
                ajaxObj.jsonp = ajaxObj.isJsonp;
            }
			var callback = callback;
			ajaxObj.success = function (response) {
				          //console.log(response)
						  
				  if (response.statusCode ==301){
				  //alert('出现301');
				 
				 window.location.href='/m/plan';
				  
				  }

				        callback.call(this, response);
			}
                        return $.ajax(ajaxObj);
        },       
        //调用接口
        PostService: function () {
            var self = this;
            return {
                run: function (url, data, callback) {
					//console.log(ispreRender);
					ajaxObj.url=self.port+url+ '&__VIEW__=json';
    

			
                    ajaxObj.data = data;
                    self.send(callback);
                },                
                /*
                 * @description 动态加载js文件
                 */
                loadScript: function (url) {
                    var _doc = document,
                            _script = _doc.createElement('script'),
                            _header = _doc.getElementsByTagName('head')[0];
                    url = url + '?time=' + new Date().getTime();
                    _script.src = url;
                    _header.appendChild(_script);
                }
            }
        }
    };
    /** @description 公共方法层*/
    var publicService = {		
		getNewbieStepbonus:function(response,callback){				
			var iscach=	hmd.isSessionStorageSupported();			
			if (response.NewbieStepbonus){
            var bindCard= response.NewbieStepbonus.bindCardRedPackage.amount,//绑卡
               inves= response.NewbieStepbonus.invesRedPackage.amount,//首次投资
               recharge= response.NewbieStepbonus.rechargeRedPackage.amount,//充值
               register= response.NewbieStepbonus.registerRedPackage.amount;//注册			  
			   
		if (register!=-1 && bindCard==-1 && recharge==-1 && inves==-1){
            //未绑卡			
           callback('1');		    
        }else if (register!=-1 && bindCard!=-1 && recharge==-1 && inves==-1){
           //未充值
            callback('2');		  
        }else if (register!=-1 && bindCard!=-1 && recharge!=-1 && inves==-1){
            //未投资
			 callback('3');		    
        }else if (register!=-1 && bindCard!=-1 && recharge!=-1 && inves!=-1){
            //投资
			 callback('4');		    
        }

           }else{
			   
			    //参数未返回
			 callback('0');	
			   
		   }		
		},		
		getSinaStatus:function(response,callback){			
			/////////////// 设置新浪支付状态			
			if (response.GetSinaStatus){
           var isCertificate= response.GetSinaStatus.isCertificate,//认证
               isSetProxyAuth= response.GetSinaStatus.isSetProxyAuth,//设置委托扣款
               isSetPwd= response.GetSinaStatus.isSetPwd;//设置密码             
			   
			  if  (isCertificate!=1){
            //未认证
			console.log('未认证');        
		  callback('1');
        } else  if  (isSetProxyAuth!=1&&isSetPwd==1){
            //未设置委托扣款
			console.log('未设置委托扣款');          
		  callback('2');		  
        }else if (isSetPwd!=1&&isCertificate==1){
           //未设置密码
		   console.log('未设置密码');           
		   callback('3');		 
        }else if (isCertificate==1&&isSetProxyAuth==1&&isSetPwd==1){
            //所有流程完成
			//console.log('所有流程完成');           
		   callback('4');		  
           }
		   /////////////// 设置新浪支付状态结束
			}else{
				
				 //参数没有返回
			//console.log('所有流程完成');           
		   callback('0');
				
			}
		},
        /**
         * 作用：跳转函数
         * 例子
         *     var jsonobj = {
         id: 123905869506905
         
         }
         *
         *   
         * 
         */

        //跳转方法
        //console.log(hmd.jumpto(false,'demojumpto.html','frontend',{id:"123232343434343333",ppfd:'20394939958vdffd_'})); //  第一参数 true 为跳转  false 为不跳转，直接返回跳转的连接字符串，后面两个参数可以没有直接返回，不带参数的页面
        //console.log(hmd.jumpto(false,'demojumpto.html'));
        jumpto: function (Is, url, paramName, paramValue) {

            //jumpto('detal.html','frontreff',{id: 123905869506905});
            if (Is) {

                if (arguments.length == 2) {

                    window.location.href = url;

                } else {
                    var str = paramValue || {};
                    str = this.jsonobjtobase64(str);

                    window.location.href = url + '?' + paramName + '=' + str;
                }



            } else {
                if (arguments.length == 2) {

                    return url;

                } else {
                    var str = paramValue || {};
                    str = this.jsonobjtobase64(str);

                    return  url + '?' + paramName + '=' + str;
                }

            }
        },
        jsonobjtobase64: function (jsonobj) {

            return base64.base64encode(base64.utf16to8(JSON.stringify(jsonobj)));


        },
        //可以将base64字符串解析成json对象
        base64tojsonobj: function (str) {

            var data = JSON.parse(base64.utf8to16(base64.base64decode(str)));

            return data;


        },
        //获取连接地址？后面参数的值，paramName指参数名，返回参数的值或找不到该参数返回null
        getParameter: function (paramName) {
            var searchString = window.location.search.substring(1),
                    i, val, params = searchString.split("&");
            for (i = 0; i < params.length; i++) {
                val = params[i].split("=");
                if (val[0] == paramName) {
                    return decodeURIComponent(val[1]);
                }
            }
            return null;
        },
        /*hmd.getParam('frontend','ppfd',function(value){console.log(value);});*/
        getParam: function (paramName, param, callback) {

            //a.getParam('frontreff','id',function(id){   ajax  });

            var str64 = this.getParameter(paramName);
           // console.log(str64);
            var jsonobj;
            if (str64 != null) {
                jsonobj = this.base64tojsonobj(str64);
				
				if (!callback){
					if (param==''){
						return jsonobj;
						}else{
					return jsonobj[param];
					}
					
				}else{
					
					if (param==''){
						
						callback(jsonobj);
					}else{
						
						callback(jsonobj[param]);
						
					}
					
					
				}
                
            }else{
                   if (!callback){
					   return null;
					   
					   
				   }else{callback(null);}
				
				
			}
        },
		
		
		geturl:function(){
			var httpurl = top.location.href;
			var parseurl=hmd.parseUrl(httpurl);
			var protocol=parseurl.protocol;
			var host=parseurl.host;
			var pathname=hmd.pathname2path(parseurl.pathname);
			 var url=protocol+ '//' + host+'/'+pathname;
			 return url;
		},


        gethost:function(){
             var httpurl = top.location.href;
			var parseurl=hmd.parseUrl(httpurl);
			
			var host=parseurl.host;
              return host; 


        },		
		
		getFile:function(){
			var httpurl = top.location.href;
			var parseurl=hmd.parseUrl(httpurl);
			var pathname=parseurl.pathname;
			var file=pathname.split('/')			
			   return  file[file.length-1];
			
		},
		
	pathname2path :function(pathname) {
            var str='';
 
            var parts = pathname.split('/');
            for (var i = 0; i < parts.length; i++) {

               if (i<parts.length-2){
               
                str += parts[i + 1]+'/';
				} 

            }

            return str;

    },
		 

    parseUrl :function(url) {
		 var r = {
        protocol: /([^\/]+:)\/\/(.*)/i,
        host: /(^[^\:\/]+)((?:\/|:|$)?.*)/,
        port: /\:?([^\/]*)(\/?.*)/,
        pathname: /([^\?#]+)(\??[^#]*)(#?.*)/


       };
        var tmp,
        res = {};
        res["href"] = url;
        for (p in r) {
            tmp = r[p].exec(url);
            res[p] = tmp[1];
            url = tmp[2];
            if (url === "") {
                url = "/";


            }
            if (p === "pathname") {
                res["pathname"] = tmp[1];
                res["search"] = tmp[2];
                res["hash"] = tmp[3];


            }


        }

        return res;


    },
        //demo
        sayName: function (name) {
            return name;
        },
        //check login
        checkLogin: function (name,tourl) {
            var token = sessionStorage.getItem(name);
            if (token == null) {
                window.location.href = tourl;
            } else {
                return token;
            }
        },
		
		
		isSessionStorageSupported:function () {
        var testKey = 'test',
        storage = window.sessionStorage;
        try {
        storage.setItem(testKey, 'testValue');

		storage.removeItem(testKey);
        return true;
    } catch (error) {
        return false;
    }
     },
	 
	  
	 
	  setStore:function (name,value){
		  if (typeof value =='object'){
		  var a=JSON.stringify(value);
		  }else{
			  
			  var a=value;
		  }
		 
		//if (this.isSessionStorageSupported()){//
			
			//this.setSeStorage(name,a);
			  
		//}else{
			  
			   this.setCookie(name,a,this.gethost(),30* 24 * 60 * 60); 
			  
		//}
		  
		
		  
		  
	  },
	  
	  getStore:function(name){
		  
		 //if (this.isSessionStorageSupported()){
			  
			// var a=this.getSeStorage(name);
			  
		 //}else{
			  
			   var a=this.getCookie(name);
			  
		//}
		  

		  if (typeof a=='string'){
			  
			  var value=a;
			  
		  }else{
			  
			  var value=JSON.parse(a);
			  
		  }
		  

		return  value; 
		  
	  },

      delStore:function(name){
		  
		   this.delCookie(name,this.gethost())
		  
	  },
	 
	 setCookie :function(name, value, domain,time)
    {
		
		
		var s=60;
        var Days = 30;//默认30天
        var exp = new Date();
        exp.setTime(exp.getTime() + time * 1000);//Days * 24 * 60 * 60 * 1000
        document.cookie = name + "=" + escape(value)  + "; domain=" + domain + "; path=/";//+ ";expires=" + exp.toGMTString()


    },
	 
	 
	  getCookie :function(name)
    {
        var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            return unescape(arr[2]);


        } else {
            return null;


        }


    },
	
	//删除cookies
    delCookie:function (name,domain)
     {
     var exp = new Date();
     exp.setTime(exp.getTime() - 1000);
     var cval=this.getCookie(name);
     if(cval!=null)
     document.cookie= name + "="+cval+";expires="+exp.toGMTString()+ "; domain=" + domain + "; path=/";
     },
	 
	
	    getPrepage:function(){
			return this.getStore('Hprepageto34332');
			
			
		},
		//设置需要回去的页面
		setPrepage:function(value){
			
		this.setStore('Hprepageto34332',value);	
			
	
		},
		//删除该cookies
		//delPrepage:function(){
			 //this.delCookie('Hprepageto34332','.xiaoxialicai.com');
			
			
		//},
		
		 //获取需要回去的页面
	    getwareid:function(){
			return this.getStore('Hwareidto2334455');
			
			
		},
		//设置需要回去的页面
		setwareid:function(value){
			this.setStore('Hwareidto2334455',value);	
						
		},
		
		 //获取jiebangstate
	    getjiebang:function(){
			return this.getStore('H5jiebangto2334455564');
			
			
		},
		//设置jiebangstate
		setjiebang:function(value){
			this.setStore('H5jiebangto2334455564',value);	
						
		},
		//删除该cookies
		//delwareid:function(){
			// this.delCookie('Hwareidto2334455','.xiaoxialicai.com');
			
			
		//},
		
		
		

        //设置sessionStorage
        setSeStorage :function(name,value){
			
        	window.sessionStorage.setItem(name,value);
			
        },
		
		
		//获取sessionStorage
        getSeStorage :function(name){
        	return window.sessionStorage.getItem(name);
        },
		//hmd.getStateCode();返回
		// '0'代表未登录  '1':代表未绑卡  '2'代表未充值  '3'代表未投资
		
		getStateCode:function (){
			return this.getStore('statecode');
			
		},
		//hmd.getzhifuStateCode(); 返回
		// '1'未认证  '2':未委托扣款   '3'未设置支付密码 '4'新浪支付全流程完成
		getzhifuStateCode:function (){
			return this.getStore('zhifustatecode');
			
		},
		
		
		
		setStateCode:function (value){
			this.setStore('statecode',value);
			
		},
	
	    setzhifuStateCode:function (value){
			this.setStore('zhifustatecode',value);
			
		},
	
        //clear sessionStorage
        clearLocal: function (clearName) {
            if (clearName != null) {
                sessionStorage.removeItem(clearName);
            } else {
                sessionStorage.clear();
            }
        },
        //加载数据
        loadData: function (arr, data) {
            $(arr).each(function (index, element) {
                var $element = $('#' + element);
                if (($element[0].nodeName === 'INPUT' && $element[0].type === 'text') || $element[0].nodeName === 'TEXTAREA') {
                    $element.val(data[element]);
                } else {
                    $element.text(data[element]);
                }
            });
        },
        //返回首页
        backIndex: function () {
            window.location.href = "../index.html";
        },
        //退出
        layOut: function () {
            this.clearLocal();
            window.location.href = "../index.html";
        },
        //返回登录页面
        backLogin: function () {
            window.location.href = 'login.html';
        },
        //返回上一页
        backPage: function () {
            window.history.back(-1);
        },
        getToken: function (token) {

            token = token || 'token';
            return sessionStorage.getItem(token);
        },
        //验证token
        checkToken: function () {
            var token = this.getToken();
            if (!token) {
                return false
            }
            return true;
        },
        transformStringToArray: function (str, separator1, separator2) {
            var sep_a = !!separator1 ? separator1 : '&',
                    sep_b = !!separator2 ? separator2 : '=',
                    arr = str.split(sep_a),
                    obj_arr = [];
            for (var i = 0, len = arr.length; i < len; i++) {
                var element = arr[i],
                        _arr = element.split(sep_b);
                obj_arr.push({
                    name: _arr[0],
                    value: _arr[1]
                });
            }
            return obj_arr;
        }

    };


    /**
     * 作用：base64 编码块
     *
     *
     * @param {string}  输入需要在地址里检索的字符串
     * @return 无
     */

    var base64 = {
        base64EncodeChars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        base64DecodeChars: new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1),
        base64encode: function (str) {
            var out, i, len;
            var c1, c2, c3;
            len = str.length;
            i = 0;
            out = "";
            while (i < len) {
                c1 = str.charCodeAt(i++) & 0xff;
                if (i == len) {
                    out += this.base64EncodeChars.charAt(c1 >> 2);
                    out += this.base64EncodeChars.charAt((c1 & 0x3) << 4);
                    out += "==";
                    break;
                }
                c2 = str.charCodeAt(i++);
                if (i == len) {
                    out += this.base64EncodeChars.charAt(c1 >> 2);
                    out += this.base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                    out += this.base64EncodeChars.charAt((c2 & 0xF) << 2);
                    out += "=";
                    break;
                }
                c3 = str.charCodeAt(i++);
                out += this.base64EncodeChars.charAt(c1 >> 2);
                out += this.base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += this.base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
                out += this.base64EncodeChars.charAt(c3 & 0x3F);
            }
            return out;
        },
        base64decode: function (str) {
            var c1, c2, c3, c4;
            var i, len, out;
            len = str.length;
            i = 0;
            out = "";
            while (i < len) {
                do {
                    c1 = this.base64DecodeChars[str.charCodeAt(i++) & 0xff];
                } while (i < len && c1 == -1);
                if (c1 == -1)
                    break;
                do {
                    c2 = this.base64DecodeChars[str.charCodeAt(i++) & 0xff];
                } while (i < len && c2 == -1);
                if (c2 == -1)
                    break;
                out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
                do {
                    c3 = str.charCodeAt(i++) & 0xff;
                    if (c3 == 61)
                        return out;
                    c3 = this.base64DecodeChars[c3];
                } while (i < len && c3 == -1);
                if (c3 == -1)
                    break;
                out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
                do {
                    c4 = str.charCodeAt(i++) & 0xff;
                    if (c4 == 61)
                        return out;
                    c4 = this.base64DecodeChars[c4];
                } while (i < len && c4 == -1);
                if (c4 == -1)
                    break;
                out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
            }
            return out;
        },
        utf16to8: function (str) {
            var out, i, len, c;
            out = "";
            len = str.length;
            for (i = 0; i < len; i++) {
                c = str.charCodeAt(i);
                if ((c >= 0x0001) && (c <= 0x007F)) {
                    out += str.charAt(i);
                } else if (c > 0x07FF) {
                    out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                    out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                    out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                } else {
                    out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                    out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                }
            }
            return out;
        },
        utf8to16: function (str) {
            var out, i, len, c;
            var char2, char3;
            out = "";
            len = str.length;
            i = 0;
            while (i < len) {
                c = str.charCodeAt(i++);
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
                        out += str.charAt(i - 1);
                        break;
                    case 12:
                    case 13:
                        // 110x xxxx   10xx xxxx  
                        char2 = str.charCodeAt(i++);
                        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                        break;
                    case 14:
                        // 1110 xxxx  10xx xxxx  10xx xxxx  
                        char2 = str.charCodeAt(i++);
                        char3 = str.charCodeAt(i++);
                        out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
                        break;
                }
            }
            return out;
        },
        CharToHex: function (str) {
            var out, i, len, c, h;
            out = "";
            len = str.length;
            i = 0;
            while (i < len) {
                c = str.charCodeAt(i++);
                h = c.toString(16);
                if (h.length < 2)
                    h = "0" + h;
                out += "\\x" + h + " ";
                if (i > 0 && i % 8 == 0)
                    out += "\r\n";
            }
            return out;
        }
    };




    //初始化
    var _public_obj = $.extend({}, ajaxService, publicService);
    this.hmd = CreateObject(_public_obj);

}();

//更改提示框位置
function sweetalert(msg) {
    $(".tk").show();
    $(".tk").html(msg);
      var screenWidth = $(window).width(), screenHeigth = $(window).height();  
        //获取屏幕宽高  
        var scollTop = document.body.scrollTop;//$(document).scrollTop(); 

        console.log(scollTop);		
        //当前窗口距离页面顶部的距离  
        var objLeft = (screenWidth - $(".tk").width()) / 2;  
        ///弹出框距离左侧距离  
        var objTop = (screenHeigth - $(".tk").height()) / 2 + scollTop;  
        ///弹出框距离顶部的距离  
        $(".tk").css('left',objLeft + "px"); 
         $(".tk").css('top',objTop + "px"); 

		
 
setTimeout(function () {
    $(".tk").hide();
  }, 3000)
}

//正在加载
function loading() {
    $('.tk_loading').show();
}


function unloading() {
    $('.tk_loading').hide();
}

/*
 setProxyAuth委托扣款
 * 
 * urlHtml参数  返回的结果页面
 * */
function setProxyAuth(urlHtml){//setProxyAuth
	console.log(123)
	var post = hmd.geturl();
	var PostService = hmd.PostService();
	var setUrl = {
		returnUrl:post+urlHtml	
		//returnUrl : 'http://mdev.xiaoxialicai.com/spread/0/M_touzi/'+urlHtml
	};
	PostService.run(hmd.urlObj.setProxyAuth,setUrl,function(res){
		console.log(res)
		if(res.code==200){
			window.location.href = res.proxyAuth_set.redirectUrl;
		}
		if(res.code==401){
			sweetalert('登陆超时或未登陆,请重新登入');
			setTimeout(function(){
				window.location.href = 'login.html'
			},3000)
			
		}
	})
}

/*
   setPayPwd设置支付密码
 * 
 * pswUrl参数  返回的结果页面
 * */
function setPayPwd(pswUrl){
	var post = hmd.geturl();
	var PostService = hmd.PostService();
	var dataUrl = {
		returnUrl: post+ pswUrl
		//returnUrl : 'http://mdev.xiaoxialicai.com/spread/0/M_touzi/'+ pswUrl
	};
	PostService.run(hmd.urlObj.creatPwd,dataUrl,function(data){
		console.log(data)
		if(data.code==200){
			window.location.href = data.setPayPwd.redirectUrl
		}
		if(data.code==401){
			sweetalert('登陆超时或未登陆,请重新登入');
			setTimeout(function(){
				window.location.href = 'login.html'
			},3000)
			
		}
	})
}

//==========
// 解析接口返回的字符串
//==========
function parseConnMsg(str) {
    return findStr(str) ? findStr(str) : str;
}

function findStr(str) {

    var clientLang = {
        "amount_change3": "您购买的数额已超过商品余量",
        "page_expired": "页面数据已过期,请刷新重试！",
        "voucher_out": "您的优惠券使用数量已超过上限！",
        "amount_change": "您目前的购买金额会使产品余量低于起投资金，请修改您的购买金额！",
        "error_smscode": "您的短信验证码为空，请填写",
        "error_paypwd": "错误的支付密码",
        "no_paypwd": "为输入支付密码",
        "redPacket_out": "您的红包额度不足！",
        "no_wares": "商品不存在",
        "ware_out": "您查看的商品已售完",
        "amount_change0": "您投资的额度低于起投资金",
        "amount_change1": "您购买后商品余量将低于起投金额！",
        "amount_change2": "您的购买金额不符合递增要求",
        "limit_user": "网络限制！",
        "limit_vipLevel": "限制VIP购买",
        "voucherTPL_invalid": "无效的券模板",
        "voucherRule_invalid": "无效的券规则",
        "wallet_out": "钱包余额不足",
        "voucher_invalid": "此券无效",
        "not_bind_card": "您尚未绑定银行卡，请绑定后重试！",
        "user_locked": "用户被锁",
        "wares_locked": "商品被锁",
        "db_error": "数据库连接错误",
        "no": "服务器繁忙！",
        "error_name": "错误的实名",
        "error_idCardSn": "错误的身份证号",
        "error_cmd": "操作异常，请重试！",
        "card_exist": "银行卡已经存在",
        "addCard_failed": "添加银行卡失败",
        "gw_error": "实名认证时支付网关通讯失败",
        "null_payCorp": "网络异常,请重试",
        "no_ticket": "网络异常,请重试",
        "null_cardId": "绑卡失败，请重试！",
        "null_card": "您的银行卡不存在",
        "already_binding": "已经绑过卡了",
        "update_card_failed": "更新银行卡失败",
        "update_user_failed": "更新用户失败",
        "apply_success": "操作成功！",
        "authorize_fail": "授权失败！",
        "auth_invalid_date": "授权已过期！",
        "add_verify_fail": "认证信息添加失败！",
        "advance_failed": "操作失败，请重试！",
        "bank_account_not_exists": "未能获取您的银行卡信息，请重试！",
        "bank_account_too_many": "您绑定的银行卡数量已超过上限！",
        "bank_card_not_verified": "您的银行卡未认证！",
        "bank_code_not_support": "抱歉，暂不支持该银行！",
        "bank_card_not_effect": "您的银行卡未能生效！",
        "bank_card_not_sign": "您的银行卡未签约！",
        "bank_info_verify_failed": "您的银行卡信息校验失败，请重试！",
        "bind_card_failed": "绑卡失败！",
        "biz_pending": "业务正在办理中，请等待通知或者直接查询",
        "blance_not_enough": "您的余额不足！",
        "card_type_not_support": "暂不支持此类银行卡！",
        "cert_not_exist": "查询不到您的证件号，请先进行实名认证！",
        "certno_not_matching": "您的证件号码不匹配，请更改后重试！",
        "duplicate_out_freeze_no": "您有订单未完成,请完成订单后重试",
        "duplicate_out_unfreeze_no": "订单已完成,请勿重复执行该操作",
        "duplicate_request_no": "请勿重复请求！",
        "duplicate_verify": "信息认证重复，请稍后再试！",
        "freeze_fund_fail": "服务器繁忙！",
        "get_verify_fail": "认证信息查询失败！",
        "host_pay_not_support_refund": "代付交易暂不支持退款！",
        "illegal_access_switch_system": "访问失败，请检查网络！",
        "illegal_argument": "系统异常！",
        "illegal_decrypt": "网络错误！",
        "illegal_indetity_paltformtype": "信息异常，请重试！",
        "illegal_ip_or_domain": "IP异常，请稍后再试",
        "illegal_outer_trade_no": "交易订单号不存在，请查询后再试！",
        "illegal_service": "服务无法连接，请查询网络！",
        "illegal_sign": "未通过验签，请验证后重试！",
        "illegal_sign_type": "系统异常，请稍后再试",
        "incorrect_card_information": "银行卡信息有误，请稍后再试！",
        "insufficient_freeze_balance": "冻结金额已达上限！",
        "insufficient_unfreeze_balance": "解冻金额已达上限！",
        "member_id_not_exist": "用户不存在！",
        "member_not_exist": "无法识别该用户，请重试！",
        "no_bank_card_info": "银行卡信息获取失败！",
        "no_basic_account": "账户信息获取失败！",
        "no_fund_orig_freeeze_trade": "交易不存在！",
        "no_such_merchant": "信息不存在！",
        "order_not_exist": "订单不存在！",
        "other_error": "系统异常！",
        "parameter_invalid": "商户不存在！",
        "partner_id_not_exist": "id异常！",
        "pay_method_not_support": "暂不支持该类支付方式！",
        "payer_inconsistent": "信息不一致，请查询后重试！",
        "payment_duplidate": "请勿重复支付！",
        "pay_failed": "支付失败，请重试！",
        "realname_confirm_failed": "尚未通过实名认证！",
        "real_name_not_matching": "您输入的姓名与身份证不一致，请核对！",
        "request_method_not_validate": "操作异常，请重试！",
        "request_expired": "您的数据已逾期，请重新打开！",
        "saving_pot_account_open_failed": "开户失败，请重试！",
        "system_error": "网络异常，请重试！",
        "trade_closed": "交易已关闭",
        "trade_failed": "交易失败，请重试！",
        "trade_no_match_error": "交易信息错误，请重试 ！",
        "user_bank_account_not_match": "银行卡信息匹配失败，请查询后重试！",
        "verify_not_exist": "您尚未认证或认证失败",
        "verify_binded_overrun": "该手机号已被绑定,请修改后重试",
        "unbinding_security_card_forbidding": "您的账户当前还有余额，不能解绑！",
        "biz_check_exception": "校验异常，请重试！",
        "upload_file_fail": "上传失败，请重试！",
        "check_file_digest_fail": "验证失败请重试！",
        "account_not_exist": "账户不存在",
        "merchant_build_fail": "信息构建失败，请查询网络后重试！",
        "merchant_submit_audit_success": "审核请求成功！",
        "merchant_submit_audit_fail": "审核请求失败！",
        "merchant_audit_req_is_empty": "请求异常，请重试！",
        "forbidden_repeat_request": "操作过于频繁，请稍后重试！",
        "audit_processing": "审核处理中，请勿重复提交！",
        "audit_success": "审核已通过，请勿重复提交！",
        "audit_refused": "审核驳回，请重新提交信息！",
        "audit_nothing": "无审核信息",
        "binding_bank_card_faild": "银行卡绑定失败！",
        "file_not_found": "网络异常，未找到该文件！",
        "merchant_open_account_fail": "开户失败，请查询网络！",
        "merchant_open_req_error": "开户数据异常，请检查后再试！",
        "illegal_party_info": "数据异常，请检查后再试！",
        "inspect_filter_fail": "操作异常，请重试！",
        "inspect_filter_safecard_fail": "信息异常，请重试！",
        "perTime_out": "提现超出单次提现限额",
        "calendar_out": "提现时获取每日提现总限额失败",
        "lost_date": "网络异常，请稍后重试！",
        "rpc_failed:binding": "网关未响应",
        "name_out": "绑卡时实名的长度不合法",
        "rpc_failed:recharge": "服务器未响应",
        "rpc_failed:rechargeCode": "服务器未响应",
        "bank_error": "充值时使用的银行卡无效",
        "error_return": "网关未返回orderId",
        "ordersOfCharge_failed": "获取充值订单失败",
        "null_return": "网关未返回支付渠道号",
        "addOrder_failed": "创建充值订单失败",
        "void_card": "提现超出单次提现限额",
        "out_amount": "提现超出余额",
        "lock_user_failed": "提现锁定用户失败",
        "loginout": "未登录",
        "no_records": "空记录",
        "args_null": "参数错误！",
        "no_waresId": "未找到该商品！",
        "void_waresId": "投资时商品id无效",
        "no_orders_id": "充值详情查询中流水订单号无效",
        "incorrect_old_trade_password": "旧的支付密码不正确",
        "sorry_there_is_not_exist": "对不起，不存在",
        "voucher_not_exist": "优惠券不存在",
        "phone_number_does_not_exist": "手机号尚未注册",
        "realname_id_notMatch": "你输入的姓名和身份证号不匹配",
        "pwd_not_syn": "密码版本不同步,请重新登录",
        "dayAmount_out": "提现超出单日提现限额",
        "paypwd_exist": "已经创建过支付密码了",
        "name_more_eleven": "姓名不能超过11个字，请输入您的真实姓名！",
        "error_code": "补填邀请码但是邀请码无效",
        "phone_number_is_incorrect": "手机号不正确",
        "inviteCode_is_incorrect": "邀请码错误",
        "accounts_existing": "帐号已经存在",
        "params_error": "参数错误",
        "account_or_password_input_error": "帐号或密码输入错误",
        "account_or_smscode_input_error": "帐号或验证码输入错误",
        "reset_password_error": "重置密码出错",
        "account_is_not_existing": "帐号不存在",
        "verId_misssing": "协议版本不存在",
        "check_error": "审核失败",
        "add_asset_error": "添加资产失败",
        "asset_not_effect_modify": "未生效的资产才能修改",
        "pers_error": "分段不能小于天数",
        "perAmount_error": "每份金额不能大于总金额",
        "sn_missing": "流水账号不存在",
        "check_over": "已支付",
        "user_notfound": "用户不存在",
        "user_lock_fail": "锁定用户失败",
        "sn_add_fail": "添加流水失败",
        "sn_upd_fail": "更新流水表失败",
        "saving_pot_upd_fail": "存钱罐更新失败",
        "user_upd_fail": "更新用户表失败",
        "ver_add_not_filled": "添加的版本号未填写",
        "ver_upd_not_filled": "更新版本号未填写",
        "copartnerId_not_filled": "渠道号未填写",
        "var_already_existing": "版本号已经存在",
        "delete_not_record": "无删除记录",
        "copartners_unfound": "没有渠道，请添加渠道",
        "contractId_ rules": "协议号必须是18位数字,前4位为渠道号",
        "contractId_already_existing": "协议号已经存在",
        "contractId_unmatch_copartners": "协议号和渠道号不匹配，应该以渠道号开头",
        "upd_not_record": "更新时无记录",
        "copartnerAbs_frist_letter": "渠道简称第一位必须是字母",
        "record_already_existing": "记录已存在",
        "excode_missing_expired": "兑换码过期",
        "excode_used": "兑换码已使用",
        "excode_dberror": "兑换码数据库故障",
        "try_fetch_samegrp": "已经领取过同类的",
        "try_fetch_other": "尝试领取其他人的",
        "record_unfound": "无记录",
        "wares_not_existing": "投资时商品不存在",
        "args_error": "参数错误",
        "forbidden": "不显示未上架的商品",
        "password_error": "密码错误",
        "deviceType_error": "设备类型不存在",
        "admin_error_or_password_error_or_account_forbidden": "用户名错误或密码错误或帐号已禁用",
        "passwd_rset_fail": "密码重置失败",
        "unknown_manager": "未知管理员",
        "forbidden_fail": "禁用失败",
        "strattime_lessthan_endtime": "起始时间应该小于或等于结束时间",
        "account_or_pwd_error": "帐号或密码输入错误",
        "inviteCode_is_not_valid": "邀请码不合法",
        "phone_is_already_registered": "手机号已经注册",
        "phone_is_not_registered": "手机号未注册",
        "nickname_is_not_valid": "昵称不合法",
        "no_cmd": "cmd参数为空",
        "unknown_cmd": "未知的cmd参数",
        "only_noob": "仅限新手购买",
        "out_noob": "超过新手限额",
        "user_limit": "没有购买资格",
        "not_open": "商品未开放购买",
        "no_orderId": "没有订单ID",
        "void_order": "无效的订单",
        "error_syn1": "订单券不同步",
        "error_syn3": "订单不同步",
        "logout_done": "退出登录成功",
        "phone_number_is_not_registered": "手机号未注册！",
        "smscode_is_not_valid": "短信验证码不合法",
        "smscode_send_failed": "验证码发送失败",
        "smscode_send_success": "验证码已发送至手机！",
        "smscode_not_correct_or_timed_out": "验证码不正确或已经超时",
        "password_is_not_valid": "密码不合法",
        "clientType_is_not_valid": "clientType不合法",
        "clientId_is_not_valid": "clientId不合法",
        "clientSecret_is_not_valid": "clientSecret不合法",
        "contractId_is_not_valid": "渠道ID不合法",
        "deviceId_is_not_valid": "设备ID不正确",
        "no_login_or_has_timed_out": "未登入或已经超时，请重新登入",
        "Repeat_submit": "重复提交 ",
        "intercept": "拦截",
        "pay_over": "请勿重复支付",
        "realPayAmount_more_amountExt": "本金支付超额",
        "realPayInterest_over_amountExt": "利息支付超额",
        "not_reimbursemen": "借款方还未还款",
        "voucher_missing": "此券不存在",
        "smscode_not_correct": "验证码不正确",
        "service_key_missing": "服务号不存在",
        "server_busy": "服务器忙",
        "arg_error": "请勿提交非法规定的参数",
        "error": "有错误，使用了其他字段描述错误，这里不用做任何改动",
        "paypwd_invalid": "支付密码为6位纯数字",
        "idcard_mismatch": "两次提供的号码不一致",
        "void_userId": "尝试领取预定给予其他人的红包",
        "no_code": "补填邀请码但是空",
        "resetpaypwd_oldinvalid": "支付密码已失效，请重新输入",
        "forbid": "TODO:无法申请成为借款人",
        "is_borrower": "TODO:已经是借款人了",
        "wait_borrower": "TODO:已经发送过借款申请了",
        "user_has_been_invited": "邀请码已使用过",
        "cant_fill_out_own_invitation_code": "请勿填写自己的邀请码",
        "voucherId_error": "券不存在",
        "voucher_unfound": "没找到券",
        "void_statusCode": "尝试领取已经关闭的红包",
        "content_unfilled": "内容未填写",
        "taskId_existing": "taskId已存在",
        "not_filled": "手机号未填写",
        "phone_number_is_not_valid": "手机号不合法",
        "voucher_reason": "发券原因",
        "void_voucherId": "尝试领取不存在的红包",
        "failed": "验证码发送失败",
        "success": "验证码发送成功",
        "wares_amountreal": "商品尚未募集结束",
        "wares_not_modify": "商品已上架，不能修改",
        "waresId_error": "无商品id",
        "order_unrecord": "无订单记录",
        "no_img": "图片路径不存在",
        "bonus_fetched_already": "已经领取，请勿重复领取",
        "weekactive_bonusstep_dismatch": "要领取奖励的积分段不存在，请刷新重试",
        "ap_not_enough": "周活跃积分不足，不能领取奖励",
        "givebonus_failed": "发放奖励失败，请通知管理员",
        "group_batch_error": "分组或批次错误",
        "excode_not_left": "兑换码已领完",
        "excode_error": "兑换码不正确,请输入正确的兑换码",
        "only_fetch_one": "兑换码只能领用一次",
        "excode_change_success": "恭喜您，你已兑换成功，请到奖品列表查看",
        "excode_to_redpacket_title": "兑换码换取了红包",
        "excode_to_redpacket_content": "你已用兑换码换取了红包，尽请查看",
        "NewFirstLoginAppRedPacket": "新红包：首次登录app送红包",
        "NewRegisterRedPacket": "新红包：注册送红包",
        "Rebate": "返利",
        "RedPacketForAward": "手动发放奖励红包",
        "RedPacketForCheckin": "签到送红包",
        "RedPacketForFirstBind": "首次绑卡赠送的红包",
        "RedPacketForFirstBuy": "首次购买赠送的红包",
        "RedPacketForFirstBuyForInvite": "首次购买给邀请人赠送的红包",
        "RedPacketForFirstcharge": "首次充值赠送的红包",
        "RedPacketForOrder": "废弃 可删",
        "RedPacketForRebate": "购买给邀请人赠送的返利",
        "RedPacketForReBuy": "购买（非首购）红包,（没有在使用）",
        "RedPacketForRegister": "注册送红包",
        "RedPacketForShare": "投资母红包，分享领取子红",
        "RedPacketForWeekactive": "周常活动里的专属红包",
        "ShopPointForCheckin": "签到送积分",
        "VoucherCheckin": "这个是废弃的,目前没有使用",
        "RedPacket": "提示用的红包通称，主要用于最后提示用户获得xx元红包",
        "Withdraw": " 提现次数",
        "RedPacketForRecharge": "充值（非首冲）奖励红包",
        "ban_repeated_refreshes": "禁止重复刷新",
        "login_info_has_expired_please_login_again": "登录信息已过期，请重新登录",
        "asset_unexists": "资产不存在",
        "date_invalid": "结束日期不合法",
        "displayPercent_error": "展示比例请输入0-100的数字",
        "batch_unfound": "未找到此批次信息的记录",
        "reward_format_wrong": "奖励格式不对",
        "prem_error": "参数错误",
        "pay_over_realPay": "支付本息金额大于实际需要支付的金额",
        "transfer_error": "该商品尚未确认转账",
        "returnFund_fail": "未更新还款计划",
        "alter_password_other": '您的登录密码已修改，请重新登录！',
        "not_bound_resign": '您的银行卡绑定信息已更改，请重新登录！',
        
        
        //
        
	    "amount_change3": "您购买的数额已超过商品余量",
	    "page_expired": "页面数据已过期,请刷新重试！",
	    "voucher_out": "您的优惠券使用数量已超过上限！",
	    "amount_change": "您目前的购买金额会使产品余量低于起投资金，请修改您的购买金额！",
	    "error_smscode": "您的短信验证码为空，请填写",
	    "error_paypwd": "错误的支付密码",
	    "no_paypwd": "为输入支付密码",
	    "redPacket_out": "您的红包额度不足！",
	    "no_wares": "商品不存在",
	    "ware_out": "您查看的商品已售完",
	    "amount_change0": "您投资的额度低于起投资金",
	    "amount_change1": "您购买后商品余量将低于起投金额！",
	    "amount_change2": "您的购买金额不符合递增要求",
	    "limit_user": "网络限制！",
	    "limit_vipLevel": "限制VIP购买",
	    "voucherTPL_invalid": "无效的券模板",
	    "voucherRule_invalid": "无效的券规则",
	    "wallet_out": "钱包余额不足",
	    "voucher_invalid": "此券无效",
	    "not_bind_card": "您尚未绑定银行卡，请绑定后重试！",
	    "user_locked": "用户被锁",
	    "wares_locked": "商品被锁",
	    "db_error": "数据库连接错误",
	    "no": "服务器繁忙！",
	    "error_name": "错误的实名",
	    "error_idCardSn": "错误的身份证号",
	    "error_cmd": "操作异常，请重试！",
	    "card_exist": "银行卡已经存在",
	    "addCard_failed": "添加银行卡失败",
	    "gw_error": "实名认证时支付网关通讯失败",
	    "null_payCorp": "网络异常,请重试",
	    "no_ticket": "网络异常,请重试",
	    "null_cardId": "绑卡失败，请重试！",
	    "null_card": "您的银行卡不存在",
	    "already_binding": "已经绑过卡了",
	    "update_card_failed": "更新银行卡失败",
	    "update_user_failed": "更新用户失败",
	    "apply_success": "操作成功！",
	    "authorize_fail": "授权失败！",
	    "auth_invalid_date": "授权已过期！",
	    "add_verify_fail": "认证信息添加失败！",
	    "advance_failed": "操作失败，请重试！",
	    "bank_account_not_exists": "未能获取您的银行卡信息，请重试！",
	    "bank_account_too_many": "您绑定的银行卡数量已超过上限！",
	    "bank_card_not_verified": "您的银行卡未认证！",
	    "bank_code_not_support": "抱歉，暂不支持该银行！",
	    "bank_card_not_effect": "您的银行卡未能生效！",
	    "bank_card_not_sign": "您的银行卡未签约！",
	    "bank_info_verify_failed": "您的银行卡信息校验失败，请重试！",
	    "bind_card_failed": "绑卡失败！",
	    "biz_pending": "业务正在办理中，请等待通知或者直接查询",
	    "blance_not_enough": "您的余额不足！",
	    "card_type_not_support": "暂不支持此类银行卡！",
	    "cert_not_exist": "查询不到您的证件号，请先进行实名认证！",
	    "certno_not_matching": "您的证件号码不匹配，请更改后重试！",
	    "duplicate_out_freeze_no": "您有订单未完成,请完成订单后重试",
	    "duplicate_out_unfreeze_no": "订单已完成,请勿重复执行该操作",
	    "duplicate_request_no": "请勿重复请求！",
	    "duplicate_verify": "信息认证重复，请稍后再试！",
	    "freeze_fund_fail": "服务器繁忙！",
	    "get_verify_fail": "认证信息查询失败！",
	    "host_pay_not_support_refund": "代付交易暂不支持退款！",
	    "illegal_access_switch_system": "访问失败，请检查网络！",
	    "illegal_argument": "系统异常！",
	    "illegal_decrypt": "网络错误！",
	    "illegal_indetity_paltformtype": "信息异常，请重试！",
	    "illegal_ip_or_domain": "IP异常，请稍后再试",
	    "illegal_outer_trade_no": "交易订单号不存在，请查询后再试！",
	    "illegal_service": "服务无法连接，请查询网络！",
	    "illegal_sign": "未通过验签，请验证后重试！",
	    "illegal_sign_type": "系统异常，请稍后再试",
	    "incorrect_card_information": "银行卡信息有误，请稍后再试！",
	    "insufficient_freeze_balance": "冻结金额已达上限！",
	    "insufficient_unfreeze_balance": "解冻金额已达上限！",
	    "member_id_not_exist": "用户不存在！",
	    "member_not_exist": "无法识别该用户，请重试！",
	    "no_bank_card_info": "银行卡信息获取失败！",
	    "no_basic_account": "账户信息获取失败！",
	    "no_fund_orig_freeeze_trade": "交易不存在！",
	    "no_such_merchant": "信息不存在！",
	    "order_not_exist": "订单不存在！",
	    "other_error": "系统异常！",
	    "parameter_invalid": "商户不存在！",
	    "partner_id_not_exist": "id异常！",
	    "pay_method_not_support": "暂不支持该类支付方式！",
	    "payer_inconsistent": "信息不一致，请查询后重试！",
	    "payment_duplidate": "请勿重复支付！",
	    "pay_failed": "支付失败，请重试！",
	    "realname_confirm_failed": "尚未通过实名认证！",
	    "real_name_not_matching": "您输入的姓名与身份证不一致，请核对！",
	    "request_method_not_validate": "操作异常，请重试！",
	    "request_expired": "您的数据已逾期，请重新打开！",
	    "saving_pot_account_open_failed": "开户失败，请重试！",
	    "system_error": "网络异常，请重试！",
	    "trade_closed": "交易已关闭",
	    "trade_failed": "交易失败，请重试！",
	    "trade_no_match_error": "交易信息错误，请重试 ！",
	    "user_bank_account_not_match": "银行卡信息匹配失败，请查询后重试！",
	    "verify_not_exist": "您尚未认证或认证失败",
	    "verify_binded_overrun": "该手机号已被绑定,请修改后重试",
	    "unbinding_security_card_forbidding": "您的账户当前还有余额，不能解绑！",
	    "biz_check_exception": "校验异常，请重试！",
	    "upload_file_fail": "上传失败，请重试！",
	    "check_file_digest_fail": "验证失败请重试！",
	    "account_not_exist": "账户不存在",
	    "merchant_build_fail": "信息构建失败，请查询网络后重试！",
	    "merchant_submit_audit_success": "审核请求成功！",
	    "merchant_submit_audit_fail": "审核请求失败！",
	    "merchant_audit_req_is_empty": "请求异常，请重试！",
	    "forbidden_repeat_request": "操作过于频繁，请稍后重试！",
	    "audit_processing": "审核处理中，请勿重复提交！",
	    "audit_success": "审核已通过，请勿重复提交！",
	    "audit_refused": "审核驳回，请重新提交信息！",
	    "audit_nothing": "无审核信息",
	    "binding_bank_card_faild": "银行卡绑定失败！",
	    "file_not_found": "网络异常，未找到该文件！",
	    "merchant_open_account_fail": "开户失败，请查询网络！",
	    "merchant_open_req_error": "开户数据异常，请检查后再试！",
	    "illegal_party_info": "数据异常，请检查后再试！",
	    "inspect_filter_fail": "操作异常，请重试！",
	    "inspect_filter_safecard_fail": "信息异常，请重试！",
	    "perTime_out": "提现超出单次提现限额",
	    "calendar_out": "提现时获取每日提现总限额失败",
	    "lost_date": "网络异常，请稍后重试！",
	    "rpc_failed:binding": "网关未响应",
	    "name_out": "绑卡时实名的长度不合法",
	    "rpc_failed:recharge": "服务器未响应",
	    "rpc_failed:rechargeCode": "服务器未响应",
	    "bank_error": "充值时使用的银行卡无效",
	    "error_return": "网关未返回orderId",
	    "ordersOfCharge_failed": "获取充值订单失败",
	    "null_return": "网关未返回支付渠道号",
	    "addOrder_failed": "创建充值订单失败",
	    "void_card": "提现超出单次提现限额",
	    "out_amount": "提现金额大于账户余额",
	    "lock_user_failed": "提现锁定用户失败",
	    "loginout": "未登录",
	    "no_records": "空记录",
	    "args_null": "参数错误！",
	    "no_waresId": "未找到该商品！",
	    "void_waresId": "投资时商品id无效",
	    "no_orders_id": "充值详情查询中流水订单号无效",
	    "incorrect_old_trade_password": "旧的支付密码不正确",
	    "sorry_there_is_not_exist": "对不起，不存在",
	    "voucher_not_exist": "优惠券不存在",
	    "phone_number_does_not_exist": "手机号尚未注册",
	    "realname_id_notMatch": "你输入的姓名和身份证号不匹配",
	    "pwd_not_syn": "密码版本不同步,请重新登录",
	    "paypwd_exist": "已经创建过支付密码了",
	    "name_more_eleven": "姓名不能超过11个字，请输入您的真实姓名！",
	    "error_code": "邀请码错误，请重新填写",
	    "phone_number_is_incorrect": "手机号不正确",
	    "inviteCode_is_incorrect": "邀请码错误",
	    "accounts_existing": "帐号已经存在",
	    "params_error": "参数错误",
	    "account_or_password_input_error": "帐号或密码输入错误",
	    "account_or_smscode_input_error": "帐号或验证码输入错误",
	    "reset_password_error": "重置密码出错",
	    "account_is_not_existing": "帐号不存在",
	    "verId_misssing": "协议版本不存在",
	    "check_error": "审核失败",
	    "add_asset_error": "添加资产失败",
	    "asset_not_effect_modify": "未生效的资产才能修改",
	    "pers_error": "分段不能小于天数",
	    "perAmount_error": "每份金额不能大于总金额",
	    "sn_missing": "流水账号不存在",
	    "check_over": "已支付",
	    "user_notfound": "用户不存在",
	    "user_lock_fail": "锁定用户失败",
	    "sn_add_fail": "添加流水失败",
	    "sn_upd_fail": "更新流水表失败",
	    "saving_pot_upd_fail": "存钱罐更新失败",
	    "user_upd_fail": "更新用户表失败",
	    "ver_add_not_filled": "添加的版本号未填写",
	    "ver_upd_not_filled": "更新版本号未填写",
	    "copartnerId_not_filled": "渠道号未填写",
	    "var_already_existing": "版本号已经存在",
	    "delete_not_record": "无删除记录",
	    "copartners_unfound": "没有渠道，请添加渠道",
	    "contractId_ rules": "协议号必须是18位数字,前4位为渠道号",
	    "contractId_already_existing": "协议号已经存在",
	    "contractId_unmatch_copartners": "协议号和渠道号不匹配，应该以渠道号开头",
	    "upd_not_record": "更新时无记录",
	    "copartnerAbs_frist_letter": "渠道简称第一位必须是字母",
	    "record_already_existing": "记录已存在",
	    "excode_missing_expired": "兑换码过期",
	    "excode_used": "兑换码已使用",
	    "excode_dberror": "兑换码数据库故障",
	    "try_fetch_samegrp": "已经领取过同类的",
	    "try_fetch_other": "尝试领取其他人的",
	    "record_unfound": "无记录",
	    "wares_not_existing": "投资时商品不存在",
	    "args_error": "参数错误",
	    "forbidden": "不显示未上架的商品",
	    "password_error": "密码错误",
	    "deviceType_error": "设备类型不存在",
	    "admin_error_or_password_error_or_account_forbidden": "用户名错误或密码错误或帐号已禁用",
	    "passwd_rset_fail": "密码重置失败",
	    "unknown_manager": "未知管理员",
	    "forbidden_fail": "禁用失败",
	    "strattime_lessthan_endtime": "起始时间应该小于或等于结束时间",
	    "account_or_pwd_error": "帐号或密码输入错误",
	    "inviteCode_is_not_valid": "邀请码不合法",
	    "phone_is_already_registered": "手机号已经注册",
	    "phone_is_not_registered": "手机号未注册",
	    "nickname_is_not_valid": "昵称不合法",
	    "no_cmd": "cmd参数为空",
	    "unknown_cmd": "未知的cmd参数",
	    "only_noob": "仅限新手购买",
	    "out_noob": "超过新手限额",
	    "user_limit": "没有购买资格",
	    "not_open": "商品未开放购买",
	    "no_orderId": "没有订单ID",
	    "void_order": "无效的订单",
	    "error_syn1": "订单券不同步",
	    "error_syn3": "订单不同步",
	    "logout_done": "退出登录成功",
	    "phone_number_is_not_registered": "手机号未注册！",
	    "smscode_is_not_valid": "短信验证码不合法",
	    "smscode_send_failed": "验证码发送失败",
	    "smscode_send_success": "验证码已发送至手机！",
	    "smscode_not_correct_or_timed_out": "验证码不正确或已经超时",
	    "password_is_not_valid": "密码不合法",
	    "clientType_is_not_valid": "clientType不合法",
	    "clientId_is_not_valid": "clientId不合法",
	    "clientSecret_is_not_valid": "clientSecret不合法",
	    "contractId_is_not_valid": "渠道ID不合法",
	    "deviceId_is_not_valid": "设备ID不正确",
	    "no_login_or_has_timed_out": "未登入或已经超时，请重新登入",
	    "Repeat_submit": "重复提交  ",
	    "intercept": "拦截",
	    "pay_over": "请勿重复支付",
	    "realPayAmount_more_amountExt": "本金支付超额",
	    "realPayInterest_over_amountExt": "利息支付超额",
	    "not_reimbursemen": "借款方还未还款",
	    "voucher_missing": "此券不存在",
	    "smscode_not_correct": "验证码不正确",
	    "service_key_missing": "服务号不存在",
	    "server_busy": "服务器忙",
	    "arg_error": "请勿提交非法规定的参数",
	    "error": "有错误，使用了其他字段描述错误，这里不用做任何改动",
	    "paypwd_invalid": "支付密码为6位纯数字",
	    "idcard_mismatch": "请输入与帐号匹配的身份证号码",
	    "void_userId": "尝试领取预定给予其他人的红包",
	    "no_code": "补填邀请码但是空",
	    "dayAmount_out": "提现超出单日提现限额",
	    "resetpaypwd_oldinvalid": "支付密码已失效，请重新输入",
	    "forbid": "TODO:无法申请成为借款人",
	    "is_borrower": "TODO:已经是借款人了",
	    "wait_borrower": "TODO:已经发送过借款申请了",
	    "user_has_been_invited": "邀请码已使用过",
	    "cant_fill_out_own_invitation_code": "请勿填写自己的邀请码",
	    "voucherId_error": "券不存在",
	    "voucher_unfound": "没找到券",
	    "void_statusCode": "尝试领取已经关闭的红包",
	    "content_unfilled": "内容未填写",
	    "taskId_existing": "taskId已存在",
	    "not_filled": "手机号未填写",
	    "phone_number_is_not_valid": "手机号不合法",
	    "voucher_reason": "发券原因",
	    "void_voucherId": "尝试领取不存在的红包",
	    "failed": "验证码发送失败",
	    "success": "验证码发送成功",
	    "wares_amountreal": "商品尚未募集结束",
	    "wares_not_modify": "商品已上架，不能修改",
	    "waresId_error": "无商品id",
	    "order_unrecord": "无订单记录",
	    "no_img": "图片路径不存在",
	    "bonus_fetched_already": "已经领取，请勿重复领取",
	    "weekactive_bonusstep_dismatch": "要领取奖励的积分段不存在，请刷新重试",
	    "ap_not_enough": "周活跃积分不足，不能领取奖励",
	    "givebonus_failed": "发放奖励失败，请通知管理员",
	    "group_batch_error": "分组或批次错误",
	    "excode_not_left": "兑换码已领完",
	    "excode_error": "兑换码不正确,请输入正确的兑换码",
	    "only_fetch_one": "兑换码只能领用一次",
	    "excode_change_success": "恭喜您成功兑换奖品",
	    "excode_to_redpacket_title": "兑换码换取了红包",
	    "excode_to_redpacket_content": "你已用兑换码换取了红包，尽请查看",
	    "NewFirstLoginAppRedPacket": "新红包：首次登录app送红包",
	    "NewRegisterRedPacket": "新红包：注册送红包",
	    "Rebate": "返利",
	    "RedPacketForAward": "手动发放奖励红包",
	    "RedPacketForCheckin": "签到送红包",
	    "RedPacketForFirstBind": "首次绑卡赠送的红包",
	    "RedPacketForFirstBuy": "首次购买赠送的红包",
	    "RedPacketForFirstBuyForInvite": "首次购买给邀请人赠送的红包",
	    "RedPacketForFirstcharge": "首次充值赠送的红包",
	    "RedPacketForOrder": "废弃 可删",
	    "RedPacketForRebate": "购买给邀请人赠送的返利",
	    "RedPacketForReBuy": "购买（非首购）红包,（没有在使用）",
	    "RedPacketForRegister": "注册送红包",
	    "RedPacketForShare": "投资母红包，分享领取子红",
	    "RedPacketForWeekactive": "周常活动里的专属红包",
	    "ShopPointForCheckin": "签到送积分",
	    "VoucherCheckin": "这个是废弃的,目前没有使用",
	    "RedPacket": "提示用的红包通称，主要用于最后提示用户获得xx元红包",
	    "Withdraw": " 提现次数",
	    "RedPacketForRecharge": "充值（非首冲）奖励红包",
	    "ban_repeated_refreshes": "禁止重复刷新",
	    "login_info_has_expired_please_login_again": "登录信息已过期，请重新登录",
	    "asset_unexists": "资产不存在",
	    "date_invalid": "结束日期不合法",
	    "displayPercent_error": "展示比例请输入0-100的数字",
	    "batch_unfound": "未找到此批次信息的记录",
	    "reward_format_wrong": "奖励格式不对",
	    "prem_error": "参数错误",
	    "pay_over_realPay": "支付本息金额大于实际需要支付的金额",
	    "transfer_error": "该商品尚未确认转账",
	    "returnFund_fail": "未更新还款计划",
	    "Can not update as record is locked": "您的帐户已锁定，请联系客服解锁",
	    "contractId_rules": "协议号必须是18位数字,前4位为渠道号",
	    "shelfId_error": "货架id为空",
	    "NewFirstBuyRedPacket": "首购红包",
	    "NewFirstByForInviteRedPacket": "邀请红包",
	    "NewFirstBindRedPacket": "认证红包",
	    "NewFirstChargeRedPacket": "首充红包",
	    "deviceId_and_phone_notall_empty": "设备号手机号不能同时为空",
	    "no_smsCode": "没有短信验证码",
	    "ware_flow": "项目已下架",
	    "rpc_failed:sendWithdraw": "提现失败:支付服务未响应",
	    "error_time": "自助解绑服务时间为：10:00-23:00，请在服务时间内提出申请",
	    "wallet_not_null": "您的账户余额不为0，无法自助解绑。",
	    "orders_not_null": "您还有正在投资的产品，无法自助解绑。",
	    "bankcard_miss": "无法自助解绑，请致电小虾理财客服：400-101-8610",
	    "idCard_miss": "无法自助解绑，请致电小虾理财客服：400-101-8610",
	    "rpc_error": "无法自助解绑，请致电小虾理财客服：400-101-8610",
	    "update failed, verid changed?": "系统正忙，请稍后再试",
	    "update failed，verid changed？": "系统正忙，请稍后再试",
	    "rebunding_error": "与原有绑定的身份证信息不符，请重新填写",
	    "id_not_match": "身份证号与原有绑定的身份证号不符，请重新填写",
	    "id_exist": "身份证信息已经被使用，请使用其他身份证进行身份验证",
	    "name_not_match": "姓名与原有绑定的姓名不符，请重新填写",
	    "record_locked": "系统正忙，请稍后再试",
	    "ticket不存在或已失效": "验证码已过期，请重新尝试",
	    "void_smscode": "无效的验证码",
	    "freezeAmount_not_null": "您还有冻结金额，无法自助解绑。",
	    "未查询到您的银行卡信息": "验证码错误，请重新填写",
	    "update failed，verid changed?": "系统正忙，请稍后再试",
	    "未查询到您的银行卡信息，请重试或联系小虾客服": "验证码错误，请重新填写",
	    "无相关银行卡信息": "验证码错误，请重新填写",
	    "wares_has_full": "该产品已满标，请购买其他产品",
	    "未获取到订单号": "验证码错误，请重新填写",
	    "系统正忙，请重新获取验证码": "验证码错误，请重新填写",
	    "系统正忙,请重新获取验证码": "验证码错误，请重新填写",
	    "rpc_failed:register": "系统正忙，请稍后再试",
	    'have_certify' : '您已实名认证'

    }
    for (var i in clientLang) {
        if (str == i) {
            return clientLang[i];
        }
    }
}

