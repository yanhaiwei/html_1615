// JavaScript Document
url_prefix = contentPath;
$(function(){	
	$(".zaboutleft li a").mouseover(function(event) {
		$(this).css('border-left', '13.5px solid #d93636');
	});
	$(".zaboutleft li a").mouseout(function(event) {
		$(this).css('border-left', '13.5px solid #e6e5e5');
	});
	/*进度条为0时*/
	/*var miin=$('.home_miin').text();
	alert(miin)
	if(miin=="0.00%"){
		
		$('.lineper').css("min-width",0);
	}*/

	var milen=$('.home_miin').length;
	for(var i=0;i<milen;i++){
	 var miin=$('.home_miin').eq(i).text();
	 if(miin=="0.00%" || miin=="进度：0.00%"){
		$('.lineper').css("min-width",0);
	}
	}
	/*footer居底*/
	var hh1=$('.footbottom').height();
	var hh2=$(window).height()-$('.header').height()-$('.nav').height()-$('.footer').height();
	if (hh1<hh2) {
		$('.footbottom').css('height', hh2+'px');
	};
	$('.footbottom').css('overflow', 'hidden');
	
	/*客户端移入移出*/
	$(".head_web").hover(hoverIn,hoverOut);
	$(".head_app").hover(hoverIn,hoverOut);

	function hoverIn(){
		$(".head_web").css({"color":"#fa9260"});
		//$(".head_app").show();
	}

	function hoverOut(){
		$(".head_web").css({"color":"#acaeb2","background":"none"});
		//$(".head_app").hide();
	}
	/*$('.head_web').click(function(){
		window.location.href=url_prefix+"/download.html";
	});*/
	/*导航移入移出*/
	$('.nav_arrow').hover(function(){
		$('.nav_box').css('display','block');
	},function(){
		$('.nav_box').css('display','none');
	});

	// 返回顶部
	$('.back2Top').click('tap', function() {
		$('body,html').animate({
		  scrollTop: 0
		}, 200);
	});

	/*微信弹框*/
	$('.foot_hover2').click(function(){
		$('.win_warp').fadeIn('1000');
	});
	$('.close').click(function(){
		$('.win_warp').fadeOut('1000');
	});
	
	/*快乐币任务弹框*/
	$('.zhfcol').click(function(){
		$('#zftask').hide();
	});

	/*详情页切换*/
	var $menupro = $('.project .pro_title li');
	$menupro.click(function(){
	    $(this).addClass('pro_curr').siblings().removeClass('pro_curr');
	    var index = $menupro.index(this);
	    $('.pro_warp > .pro_tab').eq(index).show().siblings().hide();
	});

	/*投资记录切换*/
	var $menu = $('.invest .invest_title li');
	$menu.click(function(){
	    $(this).addClass('invert_curr').siblings().removeClass('invert_curr');
	    var index = $menu.index(this);
	    $('.inver_warp > .inver_tab').eq(index).show().siblings().hide();
	});
	 $(".changenum").focus(function(){
		 increaseFun();
	 });
	 $(".changenum").blur(function(){
		 //increaseFun();
	 });
	/*详情页加减*/
	//$('.spinnerExample').spinner({});

	//$('.spinner button').click(function(){
	 $('.increase , .decrease').click(function(){
		//$('.hou_hide').hide();
		//$('.coupontip').hide();
		//$("#coupons").val('暂不使用优惠券');
		//var dataInfo = document.getElementById("coupons").value;
        //$(".moneypic").html(dataInfo);
		//var dataInfo = document.getElementById("coupons").value;
		//var dataselect = $(".coupon option:selected").attr("id");
		var dataselect = $("#coupons option:selected").attr("id");
		if(dataselect != '' && dataselect != undefined){
			$('.hou_hide').hide();
			var spinner = $('#spinner').val();
			var largemoney = $(".coupon option:selected").attr("data-info");
	        if(parseInt(spinner)<parseInt(largemoney)){
	          $(".coupontip").html("该优惠券最低起投金额为"+largemoney+"元");
	          return;
	        }
			if(spinner =="" || parseInt(spinner)<50){
		          $(".coupontip").html("不能使用优惠券。");
		          return;
		    }
		    if(parseInt(dataselect)>parseInt(spinner)){
		          $(".coupontip").html("投资金额需大于抵现券金额。");
		          return;
		    }else{
		          var surplusum = parseFloat(spinner) - parseFloat(dataselect);
		          $(".coupontip").html('<div class="youhui">已优惠'+parseFloat(dataselect)+'元，实际支付'+surplusum+'元</div>');
		    }
		}
		increaseFun();
	});
	$(".spinnerExample").blur(function(){
		var away = parseInt($('.spinnerExample').val());
		if(away >= 50){
			increaseFun();
		}
		
	})
	function increaseFun(){
		var away = $('.spinnerExample').val();
		//利率隐藏域。动态计算预计收益
		var rates = $('.rates').val();
		//var total = (away*rates).toFixed(2);
		var total = away*rates;
		var totalss=Math.floor(total*100)/100;
        /*if(lastnum>=5){
        	var mmm = (away*rates)-0.01;
        	var totalss = parseFloat(mmm.toFixed(2));
        
        }else{
        	var totalss = parseFloat((away*rates).toFixed(2));
        }	*/	
		$('#away .hou_money').html(totalss);

	}
	setInterval(function(){
		var away = $('.spinnerExample').val();
		//利率隐藏域。动态计算预计收益(不四舍五入)
		var rates = $('.rates').val();
		var total = away*rates;	
		var totalss=Math.floor(total*100)/100;
       /* if(lastnum>=5){        	
        	var mmm = (away*rates)-0.01;
        	var totalss = Math.round(mmm * 100) / 100;  
        	//var totalss = parseFloat(mmm.toFixed(2));  
        }else{
        	var totalss = parseFloat((away*rates).toFixed(2));
        }	*/
		$('#away .hou_money').html(totalss);
	},0);

	$('.spinnerExample').click(function(){
		if(Number($(this).val())==0){
			$('.spinnerExample').val('');
		}
	});
	$('.spinnerExample').keyup(function(){
		//$("#coupons").val('暂不使用优惠券');
		//var dataInfo = document.getElementById("coupons").value;
        //$(".moneypic").html(dataInfo);
       // $('.hou_hide').hide();
       // $('.coupontip').hide();
		// if($(this).val().substring(0, 1) == 0){
		// 	$(this).val(0);
		// }
		if(Number($(this).val())==0){
			$(this).val(0);
		}
		$('#keyup').hide();
		//var dataInfo = document.getElementById("coupons").value;
		var dataselect = $("#coupons option:selected").attr("id");
		//var dataselect = $(".coupon option:selected").attr("id");
		if(dataselect != '' && dataselect != undefined){
			var largemoney = $(".coupon option:selected").attr("data-info");
			var spinner = $('#spinner').val();
	        if(parseInt(spinner)<parseInt(largemoney)){
	          $(".coupontip").html("该优惠券最低起投金额为"+largemoney+"元");
	          return;
	        }
			$('.hou_hide').hide();
			if(spinner =="" || parseInt(spinner)<50){
		          $(".coupontip").html("不能使用优惠券。");
		          return;
		    }
		    if(parseInt(dataselect)>parseInt(spinner)){
		          $(".coupontip").html("投资金额需大于抵现券金额。");
		          return;
		    }else{
		          var surplusum = parseFloat(spinner) - parseFloat(dataselect);
		          $(".coupontip").html('<div class="youhui">已优惠'+parseFloat(dataselect)+'元，实际支付'+surplusum+'元</div>');
		    }
		}	        
	});
	/*邀请好友暂无记录*/
	var anolen=$('.anonymous .nonym tr').length;
	 if(anolen==1){
		 $('.inver_not').css("display",'block');
	 }
	
	/*邀请好友*/
	$('#copy-button').click(function(){
		$('.invite_warp').fadeIn();
	});
	$('.invite_btn a').click(function(){
		$('.invite_warp').fadeOut();
	});
	
	

	//天天赚剩余额度为0或购买进度100%时，转入按钮不可点
	/*var restNum=$("#restNum").text();
	var curPercent=$("#curPercent").text();
	if(restNum == 0 || curPercent == "100%"){
		$('.paybtn').attr('disabled',"true");
		$('.paybtn').css('background',"#ccc");
	}else{
		$('.paybtn').removeAttr('disabled');
		$('.paybtn').css('background',"##904ECB");
	}*/
	/*天天赚详情页*/
/*	$('.regpay_btn').on('click',function(){
		alert('dd')
		debugger
		//获取账户余额（balancemoney）和转入金额（spinner）
		var balancemoney = $('.balancemoney').html();
	    var spinner = $('#spinner').val();
	    if(parseFloat(spinner)>parseFloat(balancemoney)){
	    	$('#persondialogsuccessif').show();
	    }
	    //转入金额不能低于50元
	    if(spinner<50){
	       $('.regpaytip').html('转入金额不能低于50元');
	    }else{
	       $('.regpaytip').html('');
	    }
	    $('#spinner').focus(function(){
	       $('.regpaytip').html('');
	    });
	})*/
	/*天天赚详情页关闭弹出按钮*/	    
    $('#lendoverno').on('click',function(){
	    $('#persondialogsuccessif').hide();
	});
  //关闭福气未满弹框
	$("#zwmtipyes").on('click',function(){
		$("#zfqwm").hide();
	})
    /**/
    $('#bidagainyes').on('click',function(){
    	$('#persondialogwrong').hide();
    })
    $('#bidagain').on('click',function(){
    	$('#persondialogwrong').hide();
    })
	/*体验标投标*/
	$('.paytestbtn').click(function(){
		  //新浪支付判断
	    $.ajax({
	    	
	    	            url:url_prefix+"/querySinaAuth.do",
	    				type:"post",
	    				dataType:"json",
	    				success:function(data){
	    				    var	code=data.code;
	    				    console.log(data);
	    				    if(code==300){
	    				    	var desc = data.desc;
	    				    	var flag = data.data.flag;
	    				    	var authStatus = data.data.authStatus;
	    				    	if(flag == 4 && authStatus == -1){//企业未认证
	    				    		$("#zqysm").show();
	    				    		$("#zqysm1").hide();
	    				    		$("#zgrsm").hide();
	    				    		$('#persondialogwrongdl .failedtext').html(desc);
	    				    	}else if(flag == 4 && authStatus == 0){//企业认证中
	    				    		$("#zqysm1").show();
	    				    		$("#zqysm").hide();
	    				    		$("#zgrsm").hide();
	    				    		$('#persondialogwrongdl .failedtext').html("实名认证中");
	    				    	}else if(flag == 4 && authStatus == 2){//认证失败
	    				    		$("#zqysm1").show();
	    				    		$("#zqysm").hide();
	    				    		$("#zgrsm").hide();
	    				    		$('#persondialogwrongdl .failedtext').html("实名认证失败，请联系客服");
	    				    	}else{//个人未认证
	    				    		$("#zgrsm").show();
	    				    		$("#zqysm1").hide();
	    				    		$("#zqysm").hide();
	    				    		$('#persondialogwrongdl .failedtext').html(desc);
	    				    	}
	    				    	$('#persondialogwrongdl').show();
	    				    }else if(code==-2){
	    				    	window.location.href=url_prefix+"/login.html";
	    						return;
	    				    }else{
	    					var withdrawStatus = data.data.withdrawStatus;//判断是否有新浪支付
	    					var isSinaPayPassword = data.data.isSinaPayPassword;
	    					var isWithholdAuth = data.data.isWithholdAuth;
	    					var sinaWithholdAuthUrl = data.data.sinaWithholdAuthUrl;
	    					var payPasswordTips = data.data.payPasswordTips;
	    					var withholdAuthTips =data.data.withholdAuthTips;
	    					if(withdrawStatus == 1){	
	    						if(isSinaPayPassword==0 && isWithholdAuth==1){
	    							$('.xinlang li').html(payPasswordTips);
	    							$('#fillcheckxlang').show();
	    							$('.babyaddsignbuxl').attr('href',sinaWithholdAuthUrl);
	    						}else if(isSinaPayPassword==1 && isWithholdAuth==0){
	    							$('.xinlang li').html(withholdAuthTips);
	    							$('#fillcheckxlang').show();
	    							$('.babyaddsignbuxl').attr('href',sinaWithholdAuthUrl);
	    						}else if(isSinaPayPassword==0 || isWithholdAuth==0){
	    							$('.xinlang li').html(payPasswordTips);
	    							$('#fillcheckxlang').show();
	    							$('.babyaddsignbuxl').attr('href',sinaWithholdAuthUrl);
	    						}else{
	    							$('.hiddenor').hide();
	    							nexttest()
	    						}
	    						   
	    						
	    					}else{
	    						$('.hiddenor').show();
	    						nexttest()
	    					} 
	    				  }					
	    				}
	    			});	
	})
	function nexttest(){
		//隐藏域
		var bidvalue = $('#bidvalue').val();
		//投标金额
		var spinner = $('#spinner').val();
		//账户余额
		var experiencePrincipal = $('.experiencePrincipal').html();
		//预计收益
		var zpermoney = $('.zpermoney').html();
		$(".loadingmoney").text(spinner);
		if(parseFloat(spinner)>parseFloat(experiencePrincipal)){
			$('.zpromtip').show();
			$('.zpromtip').html('特权本金不足');
			return false;
		}
		if(parseFloat(spinner)<50){
			$('.zpromtip').show();
			$('.zpromtip').html('投资金额不能低于50元！');
			return false;
		}
		if(parseFloat(spinner)%50 != 0){
			$('.zpromtip').show();
			$('.zpromtip').html('投资金额需为50的整数倍！');
			return false;
		}
		
		//http://localhost/managingExper/d333750c-6e1f-4509-93f2-a700414a16f7.html
		//loading
		//x.showRule("<div class='coin_load'><span class='coin_load_img'></span><div class='bid_load_mes'><span>投资金额"+spinner+"元</span>正在投标，请稍候......</div></div>");
	 	 $("#loadingbox").show(); 
		$(".ui_button_wrap").css("display","none");
	    	$.ajax({
				url:url_prefix+"/poi.do?amount="+spinner+"&bidId="+bidvalue,
				type:"post",
				dataType:"json",
				success:function(data){	
					console.log(data)
					if(data.code==-2) {
						window.location.href=url_prefix+"/login.html";
						return;
					} 
					if(data.code==227){
						$("#loadingbox").hide(); 
						$('#zfqwm .zwmtip').html(data.desc);
						 $('#zfqwm').show();
						 return;
					}
					
					//loading取消
					//x.Dialog.close("showDialog");
					$("#loadingbox").hide(); 
					if(data.code == 0){
 						 $('#persondialogsuccess').show();
 						
 						//体验标标题
 						 var experiencetest = $('.experiencetest').html();
 						 $('#terminaldate').html(experiencetest);
 						 //投资金额
 						 $('#popgive span').html(spinner);
 						 //投资期限
 						 var reday = $('.reday span').html();
 						 if(reday == '月'){
 	 						 $('#popgivetime span').html('个'+reday);
 						 }else{
 	 						 $('#popgivetime span').html(reday);
 						 }
 						 //预计收益
 						 var zpermoney = $('.zpermoney').html();
 						 $('#popgiveincom span').html(zpermoney);
 						// window.location.reload();//刷新当前页面.
 						 
					}else if(data.code == 300){
						$('#persondialogrealif .wrongtipfont').html(data.desc);
						$('#persondialogrealif').show();
					}else{
						
						$('.failedtext').html(data.desc);
						$('#persondialogwrong').show();
						//x.showRule("<div class='pay_cont'><span class='person_false_img'></span><div class='pay_cont_txt'>"+data.desc+"</div></div>");
					}
					
				     //alert(data.desc);
					 //location.reload();
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {	
					x.Dialog.close("showDialog");
					$('#persondialogwrong .failedtext').html('请求超时，请重试')
					$('#persondialogwrong').show();
	            }  
			});	
	}
	
	/*详情页判断数量是否为空*/
	$('.pay_btn').click(function(){
		  //新浪支付判断
	    $.ajax({
	    	
	    	            url:url_prefix+"/querySinaAuth.do",
	    				type:"post",
	    				dataType:"json",
	    				success:function(data){
	    					console.log(data)
	    				    var	code=data.code;
	    				    if(code==300){
	    				    	var desc = data.desc;
	    				    	var flag = data.data.flag;
	    				    	var authStatus = data.data.authStatus;
	    				    	if(flag == 4 && authStatus == -1){//企业未认证
	    				    		$("#zqysm").show();
	    				    		$("#zqysm1").hide();
	    				    		$("#zgrsm").hide();
	    				    		$('#persondialogwrongdl .failedtext').html(desc);
	    				    	}else if(flag == 4 && authStatus == 0){//企业认证中
	    				    		$("#zqysm1").show();
	    				    		$("#zqysm").hide();
	    				    		$("#zgrsm").hide();
	    				    		$('#persondialogwrongdl .failedtext').html("实名认证中");
	    				    	}else if(flag == 4 && authStatus == 2){//认证失败
	    				    		$("#zqysm1").show();
	    				    		$("#zqysm").hide();
	    				    		$("#zgrsm").hide();
	    				    		$('#persondialogwrongdl .failedtext').html("实名认证失败，请联系客服");
	    				    	}else{//个人未认证
	    				    		$("#zgrsm").show();
	    				    		$("#zqysm1").hide();
	    				    		$("#zqysm").hide();
	    				    		$('#persondialogwrongdl .failedtext').html(desc);
	    				    	}
	    				    	$('#persondialogwrongdl').show();
	    				    }else if(code==-2){
	    				    	window.location.href=url_prefix+"/login.html";
	    						return;
	    				    }else{
	    				    	debugger
	    					var withdrawStatus = data.data.withdrawStatus;//判断是否有新浪支付
	    					var isSinaPayPassword = data.data.isSinaPayPassword;
	    					var isWithholdAuth = data.data.isWithholdAuth;
	    					var sinaWithholdAuthUrl = data.data.sinaWithholdAuthUrl;
	    					var payPasswordTips = data.data.payPasswordTips;
	    					var withholdAuthTips =data.data.withholdAuthTips;
	    					if(withdrawStatus == 1){	
	    						if(isSinaPayPassword==0 && isWithholdAuth==1){
	    							$('.xinlang li').html(payPasswordTips);
	    							$('#fillcheckxlang').show();
	    							$('.babyaddsignbuxl').attr('href',sinaWithholdAuthUrl);
	    						}else if(isSinaPayPassword==1 && isWithholdAuth==0){
	    							$('.xinlang li').html(withholdAuthTips);
	    							$('#fillcheckxlang').show();
	    							$('.babyaddsignbuxl').attr('href',sinaWithholdAuthUrl);
	    						}else if(isSinaPayPassword==0 || isWithholdAuth==0){
	    							$('.xinlang li').html(payPasswordTips);
	    							$('#fillcheckxlang').show();
	    							$('.babyaddsignbuxl').attr('href',sinaWithholdAuthUrl);
	    						}else{
	    							$('.hiddenor').hide();
	    							nextbidclick()
	    						}
	    						   
	    						
	    					}else{
	    						$('.hiddenor').show();
	    						nextbidclick()
	    					} 
	    				  }					
	    				}
	    			});
		
	});
	 $('.babyaddsignclo').on('click',function(){
		 $('.addsignclo').attr('href','javascript:void(0);');
		 $('.babyfillcheckbox').hide();
	})
	$('.babyaddsignbuxl').on('click',function(){
		
	})
	function nextbidclick(){
		//适用于投标失败，重新投标
		$('#persondialogwrong').hide();
				
		var away = $('.spinnerExample').val();
		var dataselect = $("#coupons option:selected").attr("id");
		var largemoney = $("#coupons option:selected").attr("data-info");
		var spinner = $("#spinner").val(); 
		var finmax = $("#finmax").val();
		console.log(finmax)
		//用户余额
		var user = $('#user').text();
		//减去后余额
		if(dataselect == ""){
			var surplusum = parseInt(away)
		}else{
		    var surplusum = parseInt(away) - parseInt(dataselect);
		}
		//以.结尾的金额
		 var reg=/\.$/;
		 var sValue=$('#spinner').val();
         if(reg.test(sValue)){
        	 sValue.replace(sValue,this.defaultValue);
             $('.hou_hide').show();
             $('.hou_hide').html('金额不能以小数点结尾，请输入正确的金额！');
             return;
         }
         
         //以0开头的金额
         var reg=/^0\d+/;
		 var sValue=$('#spinner').val();
         if(reg.test(sValue)){
        	 //sValue.replace(sValue,this.defaultValue);
             $('.hou_hide').show();
             $('.hou_hide').html('请输入正确的金额！');
             return;
         }
         
         var reg=/([\u4E00-\u9FA5]|[a-z])$/;
         var sValue=$('#spinner').val();
         if(reg.test(sValue)){
        	 //sValue.replace(sValue,this.defaultValue);
             $('.hou_hide').show();
             $('.hou_hide').html('请输入正确的金额！');
             return;
         }
		//体验标
		var tasthi=$("#tastein").val();
		if(tasthi == "501"){
			if(dataselect == undefined){
				if(parseFloat(away) > parseFloat(user)){
					$('.hou_hide').show();
					$('.hou_hide').html('您的特权本金不足！');
					return
				}
			}else{
			  if(parseFloat(surplusum) > parseFloat(user)){
				$('.hou_hide').show();
				$('.hou_hide').html('您的特权本金不足！');
				return
			  }
			}
		}
		//区分天天赚，房宝宝和房产抵押
		var flag = $("[data-infos]").attr("data-infos");
		//判断投资金额和可用金额的大小
		var payContent="<div class='pay_cont'><span class='pay_cont_img'></span><div class='pay_cont_txt'>转入金额大于您的账户余额，请先充值后再进行转入。</div></div>";
		var payContents="<div class='pay_cont'><span class='pay_cont_img'></span><div class='pay_cont_txt'>投资金额大于您的账户余额，请先充值后再进行投资。</div></div>";
		if(dataselect == undefined){
			if(parseFloat(away) > parseFloat(user)){
				$('.hou_hide').hide();
				if(flag == 1){
					$('#persondialogsuccessif').show();
					//x.showConfirm(payContent,"充值",x.returnHref);
				}else{
					$('#persondialogsuccessif').show();
					//x.showConfirm(payContents,"充值",x.returnHref);
				}
				
				confirmStyle();
				return
			}
		}else{
		  if(parseFloat(surplusum) > parseFloat(user)){
			/*$('.hou_hide').show();
			$('.hou_hide').html('可用余额不足，请速速充值。');
			*/
			  $('.hou_hide').hide();
			  if(flag == 1){
				  $('#persondialogsuccessif').show();
					//x.showConfirm(payContent,"充值",x.returnHref);
				}else{
					$('#persondialogsuccessif').show();
					//x.showConfirm(payContents,"充值",x.returnHref);
				}
			  confirmStyle();
			  return
		  }
		}
		//$(".moneypic").hide();
		if(parseFloat(away) > parseFloat(finmax) && parseFloat(finmax) > 0){
			$('.hou_hide').show();
			$('.hou_hide').html('此标的限购金额为'+finmax+'元！');
			return
		}
		//隐藏域 判断是哪个标的
		var bidvalue = $('#bidvalue').val();
		//隐藏域 判断输入金额小于起投金额
		var finmin = $('#finmin').val();
		//隐藏域  递增值
		var finstep = $('#finstep').val();
		//投资金额不能为0
		if(parseFloat(away) == 0){
			$('.hou_hide').show();
			return
		}else if(parseFloat(away) < parseFloat(finmin)){
			$('.hou_hide').show();
			if(flag == 1){
				$('.hou_hide').html('转入金额不能低于'+finmin+'元！');
			}else{
				$('.hou_hide').html('投资金额不能低于'+finmin+'元！');
			}
			return
		}
        if(flag == 1){
        	if(away == ''){
    			$('.hou_hide').show();
    			$('.hou_hide').html('转入金额不能为空！');
    			return
    		}
		}else{
			if(away == ''){
				$('.hou_hide').show();
				$('.hou_hide').html('投资金额不能为空！');
				return
			}
			if(away%finstep != 0){
				$('.hou_hide').show();
				$('.hou_hide').html('投资金额需为'+finstep+'的整数倍！');
				return
			}
		}
		if(parseInt(dataselect)>parseInt(away)){
	          $(".coupontip").html("该优惠券最低起投金额为"+largemoney+"元");
	          return false;
	    }
		if(parseInt(largemoney)>parseInt(away)){
	          return false;
	    }
		var away = $('.spinnerExample').val();
		if(away == 0){
			$('.hou_hide').show();
		}
		var num = $('.spinnerExample').val();
	    var reg = /.*\..*/;
	    if(reg.test(num)){
		   if(num.toString().split(".")[1].length>2){
			  $('.hou_hide').hide();
			  $('#keyup').show();
			  return false
		   }
	    }
		$('.hou_hide').hide();
		var aa = $('#aa').val();
		debugger
		//天天赚ajax请求投标 productType（定期宝1房宝宝2车宝宝4赎楼贷5理财计划6）
		if(flag == 1){
		   moneyvalue(aa,away,bidvalue);//判断是否为首投
		   makeday(away,bidvalue);
		}
		//房宝宝ajax请求投标
		if(flag == 2){
			moneyvalue(aa,away,bidvalue);//判断是否为首投
		   makehouse(away,bidvalue);
		}
		//房产抵押ajax请求投标
		if(flag == 3){
			//moneyvalue(aa,away,bidvalue);//判断是否为首投
		    makepledge(aa,away,bidvalue);
		}
		//理财计划ajax请求投标
		if(flag == 4){
			//moneyvalue(aa,away,bidvalue);//判断是否为首投
			   makefiplan(aa,away,bidvalue);
			}
	}
    var zusernu=$("#user").text();
    var zusernu1=Number(zusernu).toFixed(2);
    $("#user").text(zusernu1);
    //判断是否为首投
    function moneyvalue(flag,away,bidvalue){
    	//loading
    	//var spinner = $("#spinner").val(); 
 	    //$('.loadingmoney').html(spinner);
 	   // $('#loadingbox').show();
    	$.ajax({
			url:url_prefix+"/poiLucky.do?productType="+flag,
			type:"post",
			dataType:"json",
			success:function(data){	
				var mis_succ_image = data.data.mis_succ_image;
				var firstPoiDesc = data.data.firstPoiDesc;
				if(mis_succ_image){
					//$('#loadingbox').hide();
					$('#manpop').show();
					$('.manpoptext').html(firstPoiDesc);//首投文字动态后台返
					$('.mancardpop').hide();//关闭首投提示
				}else{
					$('#persondialogsuccess').show();
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				 //loading取消
				$('#loadingbox').hide();
				//x.Dialog.close("showDialog");
				$('#persondialogwrong .failedtext').html('请求超时，请重试')
				$('#persondialogwrong').show();
            }  
		});
    }
	//天天赚ajax请求投标
    function makeday(away,bidvalue){
    	var spinner = $("#spinner").val();
    	var spinner1=Number(spinner).toFixed(2);
    	//loading
	    /*$('.payload').css('display', 'block');
		$('.paybtn').attr('disabled',"true");*/
    	var awaynum = Number(away).toFixed(2);
    	$('.loadingmoney').html(spinner1);
    	$('#loadingbox').show();
    	//x.showRule("<div class='coin_load'><span class='coin_load_img'></span><div class='bid_load_mes'><span>转入金额"+awaynum+"元</span>正在转入，请稍候......</div></div>");
  	    $(".ui_button_wrap").css("display","none");
    	$.ajax({
			url:url_prefix+"/yuebao/poi.do?amount="+away+"&bidId="+bidvalue,
			type:"post",
			dataType:"json",
			success:function(data){		
				if(data.code==-2) {
					window.location.href=url_prefix+"/login.html";
					return;
				}
				$('.hou_hide').hide();
				//loading隐藏
				$('#loadingbox').hide();
				//x.Dialog.close("showDialog");
				if(data.code == 0){
					//产品名称
					var regularbartitle = $('.regularbartitle').html();
					$('#popgivename').html(regularbartitle);
					//收益时间
					$('#popgiveway').html(data.data.incomeTime);
					//投资金额
					$('#popgive span').html(awaynum);
					//预计日收益
					var dayearnings = $('.hou_money').html()
					$('#dayearnings span').html(dayearnings)
					$('.detailboxpop1').show();
				}else{
					$('#persondialogwrong .failedtext').html(data.info);
					$('#persondialogwrong').show();
				    //x.showRule("<div class='pay_cont'><span class='person_false_img'></span><div class='pay_cont_txt'>"+data.info+"</div></div>");
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {					
				 //loading取消
				$('#loadingbox').hide();
				//x.Dialog.close("showDialog");
				$('#persondialogwrong .failedtext').html('请求超时，请重试')
				$('#persondialogwrong').show();
            }  
		});
    }
  //房宝宝ajax请求投标
    function makehouse(away,bidvalue){
    	var spinner = $("#spinner").val();
    	//loading
	    /*$('.payload').css('display', 'block');
		$('.paybtn').attr('disabled',"true");*/
    	//x.showRule("<div class='coin_load'><span class='coin_load_img'></span><div class='bid_load_mes'><span>投资金额"+spinner+"元</span>正在投标，请稍候......</div></div>");
    	$('#loadingbox').show();
    	$(".ui_button_wrap").css("display","none");
    	$.ajax({
			url:url_prefix+"/yuebao/poi.do?amount="+away+"&bidId="+bidvalue,
			type:"post",
			dataType:"json",
			success:function(data){
				//debugger
				if(data.code==-2) {
					window.location.href=url_prefix+"/login.html";
					return;
				}
				//loading取消
				/*$('.payload').css('display', 'none');
				$('.paybtn').removeAttr('disabled');*/
				//x.Dialog.close("showDialog");
				$('#loadingbox').hide();
				if(data.desc == "成功"){
					$('#lendsuccess').show();
					$('#failure').hide();
					$('#bidsee').show();
					$('#bidagain').hide();
					var bidtitles = $('.bidtitles').text();
					$('.dialogpayed').html(bidtitles);				
					var spinnerss = $('#spinner').val();
					$('#popgive').html(spinnerss+"元");
					var demand = $('.demand').text();
					$('#popgivetime').html(demand+"个月");
					$('.detailboxpop').show();
				}else{
					/*$('.wrongmsg').html(data.desc);
					$('.dialogpayed').html("--");				
					$('#popgive').html("--");
					$('#popgivetime').html("--");				
					$('.detailboxpop').show();
					$('#lendsuccess').hide();
					$('#failure').show();
					$('#bidsee').hide();
					$('#bidagain').show();*/
					x.showRule("<div class='pay_cont'><span class='person_false_img'></span><div class='pay_cont_txt'>"+data.desc+"</div></div>");
				}
				
			     /*alert(data.info);
				 location.reload();*/
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {	
				//loading取消
				/*$('.payload').css('display', 'none');
				$('.paybtn').removeAttr('disabled');*/
				$('#loadingbox').hide();
				//x.Dialog.close("showDialog");
				$('#persondialogwrong .failedtext').html('请求超时，请重试')
				$('#persondialogwrong').show();
            }  
		});
    }
  //房产抵押ajax请求投标
    function makepledge(aa,away,bidvalue){
    	var spinner = $("#spinner").val();
    	//选择的钱数 and 投资金额
    	var dataselect = $(".coupon option:selected").attr("id");
        var spinner = $("#spinner").val(); 
        if(parseInt(dataselect)>parseInt(spinner)){
          $(".coupontip").html("投资金额需大于抵现券金额。");
          return;
        }
        var dataid = $(".coupon option:selected").attr("class");
        //选中的id优惠券
        if(dataid == undefined){
            var dataid = '';
        }else{
            var dataid = $(".coupon option:selected").attr("class");
        }  
    	var reg = /.*\..*/;
 	    if(reg.test(away)){
 		   if(away.toString().split(".")[1].length>0){
 			  $('#keyup').show();
 			  return false
 		   }
 	    }
    	//loading
 	    $('.loadingmoney').html(spinner);
 	    $('#loadingbox').show();
 	    //x.showRule("<div class='coin_load'><span class='coin_load_img'></span><div class='bid_load_mes'><span>投资金额"+spinner+"元</span>正在投标，请稍候......</div></div>");
 	    $(".ui_button_wrap").css("display","none");
    	$.ajax({
			url:url_prefix+"/poi.do?amount="+away+"&bidId="+bidvalue+"&ccId="+dataid,
			type:"post",
			dataType:"json",
			success:function(data){	
				if(data.code==-2) {
					window.location.href=url_prefix+"/login.html";
					return;
				} 
				//loading取消
				$('#loadingbox').hide();
				//x.Dialog.close("showDialog");
				if(data.code == 0){
					//投资产品
					var regulartitleelite =$('.regulartitle h2 span').html();
					$('#terminaldate').html(regulartitleelite);
					//投资金额
					var popgive = $('#spinner').val();
					$('#popgive span').html(popgive);
	
					//productTypes=2为房宝宝。1和3为定期宝和赎楼贷
					var demand = $('#redaydate').html();
					var productTypes = $('.productTypes').text();					
					if(productTypes == 2){
	 						 $('#popgivetime span').html(demand);						 
					}else{
						$('#popgivetime span').html(demand);
					}
					//预计收益
					var hou_money = $('.hou_money').html();
					$('#popgiveincom span').html(hou_money);
					moneyvalue(aa)
					//$('#persondialogsuccess').show();
					
					
					
					/*$('#bidsee').show();
					$('#bidagain').hide();
					var bidtitles = $('.bidtitles').text();
					$('.dialogpayed').html(bidtitles);				
					var spinnerss = $('#spinner').val();
					$('#popgive').html(spinnerss+"元");
					var demand = $('.demand').text();*/
					
                    
					if(data.code==-2) {
						window.location.href=url_prefix+"/login.html";
						return;
					} 
					/*$('.detailboxpop').show();*/
				}else{
					$('#persondialogwrong .failedtext').html(data.desc);
					$('#persondialogwrong').show();
					//x.showRule("<div class='pay_cont'><span class='person_false_img'></span><div class='pay_cont_txt'>"+data.desc+"</div></div>");
				}
				
			     //alert(data.desc);
				 //location.reload();
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {	
				 $('#loadingbox').hide();
				 //x.Dialog.close("showDialog");
				 $('#persondialogwrong .failedtext').html('请求超时，请重试')
				 $('#persondialogwrong').show();
            }  
		});
    }
  //理财计划ajax请求投标
    function makefiplan(aa,away,bidvalue){
    	debugger
    	var spinner = $("#spinner").val();
    	//选择的钱数 and 投资金额
    	var dataselect = $(".coupon option:selected").attr("id");
        var spinner = $("#spinner").val(); 
        if(parseInt(dataselect)>parseInt(spinner)){
          $(".coupontip").html("投资金额需大于抵现券金额。");
          return;
        }
        var dataid = $(".coupon option:selected").attr("class");
        //选中的id优惠券
        if(dataid == undefined){
            var dataid = '';
        }else{
            var dataid = $(".coupon option:selected").attr("class");
        }  
    	var reg = /.*\..*/;
 	    if(reg.test(away)){
 		   if(away.toString().split(".")[1].length>0){
 			  $('#keyup').show();
 			  return false
 		   }
 	    }
    	//loading
 	    $('.loadingmoney').html(spinner);
 	    $('#loadingbox').show();
 	    //x.showRule("<div class='coin_load'><span class='coin_load_img'></span><div class='bid_load_mes'><span>投资金额"+spinner+"元</span>正在投标，请稍候......</div></div>");
 	    $(".ui_button_wrap").css("display","none");
    	$.ajax({
			url:url_prefix+"/finance/poi.do?amount="+away+"&financeId="+bidvalue+"&ccId="+dataid,
			type:"post",
			dataType:"json",
			success:function(data){	
				console.log(data)
				
				if(data.code==-2) {
					window.location.href=url_prefix+"/login.html";
					return;
				} 
				//loading取消
				$('#loadingbox').hide();
				if(data.code == 0){
					//投资产品
					var regulartitleelite =$('.regulartitle h2 span').html();
					$('#terminaldate').html(regulartitleelite);
					//投资金额
					var popgive = $('#spinner').val();
					$('#popgive span').html(popgive);
					var zvada = $(".zvada").html();
					$("#popgivetime2").html(zvada);
					//productTypes=2为房宝宝。1和3为定期宝和赎楼贷
					var demand = $('#redaydate').html();
					var productTypes = $('.productTypes').text();					
					if(productTypes == 2){
	 						 $('#popgivetime span').html(demand);						 
					}else{
						$('#popgivetime span').html(demand);
					}
					//预计收益
					var hou_money = $('.hou_money').html();
					$('#popgiveincom span').html(hou_money);
					moneyvalue(aa)
					//$('#persondialogsuccess').show();
					if(data.code==-2) {
						window.location.href=url_prefix+"/login.html";
						return;
					} 
					/*$('.detailboxpop').show();*/
				}else{
					$('#persondialogwrong .failedtext').html(data.desc);
					$('#persondialogwrong').show();
					//x.showRule("<div class='pay_cont'><span class='person_false_img'></span><div class='pay_cont_txt'>"+data.desc+"</div></div>");
				}
				
			     //alert(data.desc);
				 //location.reload();
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {	
				 $('#loadingbox').hide();
				 //x.Dialog.close("showDialog");
				 $('#persondialogwrong .failedtext').html('请求超时，请重试')
				 $('#persondialogwrong').show();
            }  
		});
    }
    
    //关闭定期活期投资弹框
    $('.dialogclose').on('click',function(){
     window.location.reload();//刷新当前页面.
   	 $('.detailboxpop1').hide();
    })
	/*活动中心 所有活动下拉*/
	$('.acti_select').hover(function(){
		$('.acti_select ul').show();
	},function(){
		$('.acti_select ul').hide();
	});

	/*个人账户左边*/
	$('.person_ul li').click(function(){
		$('.person_ul li').removeClass('person_active');
		$(this).addClass('person_active');
	});

	$('.person_mr1').click(function(){
		$('.person_ul li').removeClass('person_in2 person_in3 person_in4 person_in5 person_in6 person_in7');
		$('.person_mr1').addClass('person_in1');
	});
	$('.person_mr2').click(function(){
		$('.person_ul li').removeClass('person_in1 person_in3 person_in4 person_in5 person_in6 person_in7');
		$('.person_mr2').addClass('person_in2');
	});
	$('.person_mr3').click(function(){
		$('.person_ul li').removeClass('person_in2 person_in1 person_in4 person_in5 person_in6 person_in7');
		$('.person_mr3').addClass('person_in3');
	});
	$('.person_mr4').click(function(){
		$('.person_ul li').removeClass('person_in2 person_in1 person_in3 person_in5 person_in6 person_in7');
		$('.person_mr4').addClass('person_in4');
	});
	$('.person_mr5').click(function(){
		$('.person_ul li').removeClass('person_in2 person_in1 person_in3 person_in4 person_in6 person_in7');
		$('.person_mr5').addClass('person_in5');
	});
	$('.person_mr6').click(function(){
		$('.person_ul li').removeClass('person_in2 person_in1 person_in3 person_in4 person_in5 person_in7');
		$('.person_mr6').addClass('person_in6');
	});
	$('.person_mr7').click(function(){
		$('.person_ul li').removeClass('person_in2 person_in1 person_in3 person_in4 person_in5 person_in6');
		$('.person_mr7').addClass('person_in7');
	});

	$('.person_mr1').hover(function(){
		$('.person_mr1').addClass('person_ok1');
	},function(){
		$('.person_mr1').removeClass('person_ok1');
	});

	$('.person_mr2').hover(function(){
		$('.person_mr2').addClass('person_ok2');
	},function(){
		$('.person_mr2').removeClass('person_ok2');
	});

	$('.person_mr3').hover(function(){
		$('.person_mr3').addClass('person_ok3');
	},function(){
		$('.person_mr3').removeClass('person_ok3');
	});

	$('.person_mr4').hover(function(){
		$('.person_mr4').addClass('person_ok4');
	},function(){
		$('.person_mr4').removeClass('person_ok4');
	});

	$('.person_mr5').hover(function(){
		$('.person_mr5').addClass('person_ok5');
	},function(){
		$('.person_mr5').removeClass('person_ok5');
	});

	$('.person_mr6').hover(function(){
		$('.person_mr6').addClass('person_ok6');
	},function(){
		$('.person_mr6').removeClass('person_ok6');
	});
	$('.person_mr7').hover(function(){
		$('.person_mr7').addClass('person_ok7');
	},function(){
		$('.person_mr7').removeClass('person_ok7');
	});

	/*个人账户充值和提现*/
	$('.action_list1').hover(function(){
		$('.action_list1 .action_hide').show();
		$('.action_list1 .action_img').addClass('action_become');
	},function(){
		$('.action_list1 .action_hide').hide();
		$('.action_list1 .action_img').removeClass('action_become');
	});

	$('.action_list2').hover(function(){
		$('.action_list2 .action_hide').show();
		$('.action_list2 .action_img').addClass('action_become');
	},function(){
		$('.action_list2 .action_hide').hide();
		$('.action_list2 .action_img').removeClass('action_become');
	});

	$('.action_list3').hover(function(){
		$('.action_list3 .action_hide').show();
		$('.action_list3 .action_img').addClass('action_become');
	},function(){
		$('.action_list3 .action_hide').hide();
		$('.action_list3 .action_img').removeClass('action_become');
	});	

	$('.sign_btn2').click(function(){
		$('.sign_btn2').html('已签到');
	});

	/*关于我们*/
/*	$('.about_left li').click(function(event) {
		var i=$(this).index();
		$(this).addClass('us_current').siblings('li').removeClass('us_current');
		$('.about_right').eq(i).addClass('about_block').siblings('.about_right').removeClass('about_block');
	});*/
	$('.about_left li').hover(function() {
		if ($(this).hasClass('us_current')) {} else{
			$(this).css('background', '#dcdff5');
		};
	}, function() {	
		if ($(this).hasClass('us_current')) {} else{
			$(this).css('background', '#fff');
		};
	});
	/*选择充值银行*/
	$('.bank_box li').click(function(){
		$('.bank_box li em').removeClass('bank_check');
		$(this).find('em').addClass('bank_check');
		$('.bank_txt3').hide();
		$('.bank_txt4').hide();
	});
	/*银行卡页面*/
	$('.bank_btn a').click(function(){
		var bank = $('.bank_pay input').val();
		if(bank == 0){
			$('.bank_right').show();
		}

		var has = $('.bank_box li em').hasClass('bank_check');
		if(has){
			$('.bank_txt3').hide();
		}else{
			$('.bank_txt3').show();
			$('.bank_txt4').show();
		}
		//loading
		/*$('.bank .bank_pay .bank_btn img').css('display', 'block');
		$('.bank_btn a').attr('disabled',"true");*/
	});
    /*取消loading*/
	/*function zGrey(){
		$('.bank .bank_pay .bank_btn img').css('display', 'none');
		$('.bank_btn a').removeAttr('disabled');
	}*/
	
	/*经办人信息收缩展开*/
	var curText1=$('#secure_btn11').text();
	$('#secure_btn11').click(function(){
	  if($('#secure_hide11').is(":visible")){
		  $('#secure_hide11 .zinput').val("");
          $('.zdisblo .error').html("");
	      $('#secure_hide11').slideUp();
	      if(curText1 == "设置"){
	    	  $('#secure_btn11').html('设置');
	      }else if(curText1 == "修改"){
	    	  $('#secure_btn11').html('修改');
	      }
	  }else{
	      $('#secure_hide11').slideDown();
	      $('#secure_btn11').html('取消');
	  }
	});

	/*登陆密码收缩展开*/
	var curText1=$('#secure_btn1').text();
	$('#secure_btn1').click(function(){
	  if($('#secure_hide1').is(":visible")){
		  $('#secure_hide1 .zinput').val("");
          $('.zdisblo .error').html("");
	      $('#secure_hide1').slideUp();
	      if(curText1 == "设置"){
	    	  $('#secure_btn1').html('设置');
	      }else if(curText1 == "修改"){
	    	  $('#secure_btn1').html('修改');
	      }
	  }else{
	      $('#secure_hide1').slideDown();
	      $('#secure_btn1').html('取消');
	  }
	});

	/*取现密码收缩展开*/
	var curText2=$('#secure_btn2').text();
	$('#secure_btn2').click(function(){
	  if($('#secure_hide2').is(":visible") || $('#forget_hide').is(":visible")){
          $('#secure_hide2 .zinput').val("");
          $('.zdisblo .error').html("");
	      $('#secure_hide2').slideUp();
	      $('#forget_hide').slideUp();
	      if(curText2 == "设置"){
	    	  $('#secure_btn2').html('设置');
	      }else if(curText2 == "修改"){
	    	  $('#secure_btn2').html('修改');
	      }
	  }else{
	      $('#secure_hide2').slideDown();
	      $('#secure_btn2').html('取消');
	  }
	});
	/*忘记提现密码*/
	$("#forget_btn").click(function(){
		$("#secure_hide2").slideUp();
		$('#forget_hide').slideDown();
	});
	

	/*绑定邮箱收缩展开*/
	var curText3=$('#secure_btn3').text();
	$('#secure_btn3').click(function(){
	  if($('#secure_hide3').is(":visible")){
		  $('#secure_hide3 .zinput').val("");
          $('.zdisblo .error').html("");
	      $('#secure_hide3').slideUp();
	      if(curText3 == "设置"){
	    	  $('#secure_btn3').html('设置');
	      }else if(curText3 == "修改"){
	    	  $('#secure_btn3').html('修改');
	      }
	  }else{
	      $('#secure_hide3').slideDown();
	      $('#secure_btn3').html('取消');
	  }
	});

	/*绑定手机收缩展开*/
	var curText4=$('#secure_btn4').val();
	$('#secure_btn4').click(function(){
	  if($('#secure_hide4').is(":visible") || $('#new_phone4').is(":visible")){
		  $('#secure_hide4 .zinput').val("");
          $('.zdisblo .error').html("");
	      $('#secure_hide4').slideUp();
	      $('#new_phone4').slideUp();
	      if(curText4 == "绑定"){
	    	  $('#secure_btn4').val('绑定');
	      }else if(curText4 == "修改"){
	    	  $('#secure_btn4').val('修改');
	      }
	  }else{
	      $('#secure_hide4').slideDown();
	      $('#secure_btn4').val('取消');
	  }
	});
	$('#getoriginalCode').click(function(){
		$(".zphcode").slideDown();
		modify();
	});
	//修改手机发送验证码函数
	function modify(){
		var o = $("#getoriginalCode");
	      var zcellphone = $("#zcellphone").text();
	      o.attr('disabled',"true");
	      $.ajax({
	  		url:url_prefix+"/customer/sendPhoneCode.do?type=1&phone=" + zcellphone,
	  		type:"post",
	  		dataType:"json",
	  		success: function(data){
	  		    $('.zlote .loadimg').css('display', 'none');
	  			o.removeAttr('disabled');
	  			if(data.code=="0"){
	  				$('#code_original').html('');
	  				code_Time(o[0]);
	  			}else if(data.code=="noEmail"){
	  				$('#code_original').html("不存在此手机号码！");
	  			}else{
	  				$('#code_original').html(data.message);
	  			}
	  		}
	  	});
	}
	
	/*修改手机下一步*/
	$("#originalNext").click(function(){
		var zcellphone = $("#zcellphone").text();
		var originalCode = $("#originalCode").val();
		if(originalCode == ""){
			$('#code_original').html("验证码不能为空！");
			return;
		}
		var url = "/customer/checkMdPhoneCode.do?phone=" + zcellphone + "&phoneCode=" + originalCode;
		$.ajax({
			type:'POST',
	        url: url,
			dataType:'json',
			success: function(data){
				console.log(data)
				      if(data.code==0){
				        $("#secure_btn4").removeAttr('disabled');
				        $("#secure_hide4").slideUp();
				        $('#new_phone4').slideDown();
				      }else{
				        $("#code_original").html(data.message);
				        $("#secure_btn4").removeAttr('disabled');
				  }
			}
		});
	});
	//新手机获取验证码
	$("#getNewphoCode").click(function(){
		var o = $(this);
		$("#newpho_label").html("");
		var zNewpho =$("#zNewpho").val();
		if(zNewpho == ""){
			$("#newpho_label").html("请填写手机号！")
			return false;
		}
		$('.zlote .loadimg').css('display', 'block');
		o.attr('disabled',"true");
		$.ajax({
			url:url_prefix+"/security/sendPhoneCode.do?phone=" + zNewpho,
			type:"post",
			dataType:"json",
			success: function(data){
				//取消 loading
			    $('.zlote .loadimg').css('display', 'none');
				o.removeAttr('disabled');
				if(data.code=="0"){
					$('#newpho_label').html('');
					code_Time1(o[0]);
				}else if(data.code=="noEmail"){
					$('#newpho_label').html("不存在此手机号码！");
				}else{
					$('#newpho_label').html(data.message);
				}
			}
		});
	});
	//新手机号提交
	$("#newphoSubmit").click(function(){
		var zNewpho = $("#zNewpho").val();
		var newphoCode = $("#newphoCode").val();
		if(zNewpho == ""){
			$('#newpho_label').html("手机号不能为空！");
			return;
		}
		if(newphoCode == ""){
			$('#nphocode_label').html("验证码不能为空！");
			return;
		}
		var url = "/security/modifyPhone.do?phone=" + zNewpho + "&phoneCode=" + newphoCode;
		$.ajax({
			type:'POST',
	        url: url,
			dataType:'json',
			success: function(data){
				console.log(data)
				      if(data.code==0){
				        $("#mynewphosec").show();
				      }else{
				        $("#nphocode_label").html(data.message);
				  }
			}
		});
	});
	
	/*实名认证收缩展开*/
	$('#secure_btn6').click(function(){
		  if($('#secure_hide6').is(":visible")){
			  $('#secure_hide6 .zinput').val("");
	          $('.zdisblo .error').html("");
		      $('#secure_hide6').slideUp();
		      $('#secure_btn6').html('现在认证');
		  }else{
		      $('#secure_hide6').slideDown();
		      $('#secure_btn6').html('取消');
		  }
		});

	/*昵称收缩展开*/
	$('#secure_btn5').click(function(){
	  if($('#secure_hide5').is(":visible")){
		  $('#secure_hide5 .zinput').val("");
          $('.zdisblo .error').html("");
	      $('#secure_hide5').slideUp();
	      $('#secure_btn5').html('修改');
	  }else{
	      $('#secure_hide5').slideDown();
	      $('#secure_btn5').html('取消');
	  }
	});

	/*邀请好友表格隔行变色*/
	$(".table tr:odd").css("background-color",'#f2f2f2');
    $(".tabley tr:odd").css("background-color",'#f2f2f2');
    $(".table .mystyle tr:odd").css("background-color",'#fff');
	/*天天赚分页*/
	$('.page a').click(function(){
		$('.page a').removeClass('active');
		$(this).addClass('active');
	});

	/*手机获取验证码倒计时*/
	var wait=60;
	function code_Time(o) {
		if (wait == 0) {
			o.removeAttribute("disabled");
			o.value="获取验证码";
			wait = 60;
		} else {
			o.setAttribute("disabled", true);
			o.value="重新发送(" + wait + ")";
			wait--;
			setTimeout(function() {
				code_Time(o)
			},1000)
		}
	}
	var wait1=60;
	function code_Time1(o) {
		if (wait1 == 0) {
			o.removeAttribute("disabled");
			o.value="获取验证码";
			wait1 = 60;
		} else {
			o.setAttribute("disabled", true);
			o.value="重新发送(" + wait1 + ")";
			wait1--;
			setTimeout(function() {
				code_Time1(o)
			},1000)
		}
	}
	//绑定银行卡发送手机验证码
	$("#bank_bton").click(function(){
		var o = $(this);
	    if(bankCode == '' || bankCode == undefined){
			return;
		}
	    
	    var realname = $("#realname").val();
		if(realname==null||realname==""){
			$('#persondialogwrong').show();
            $('.wrongtip').html("请先开通第三方支付后再进行绑卡操作！");
			return;
		}
		
		var card_no = $("#card_no").val();
		if(card_no==null||card_no==""){
			$('.ts1').show();
			$('.ts1').html("银行卡号不能为空！");
			//alert("银行卡号不能为空！");
			return;
		}
		
		var phone = $("#phone").val();
		if(phone==null||phone==""){
			$('.ts2').show();
			$('.ts2').html("手机号不能为空！");
			return;
		}else if(!/^1[3,4,5,7,8]\d{9}$/.test(phone)){
			$('.ts2').show();
			$('.ts2').html("请正确填写手机号码！");
			return;
		}
		var phoneVal=$(".bank_ts2").val();
		var phoneVal1=$(".min_length").val();
		if(phoneVal1==""){
			$(".ts1").show();
			return;
		}else if(!/^[0-9]{16,19}$/.test(phoneVal1)){
			$(".ts1").show();
			$(".ts1").html("请正确填写银行卡号！");
			return;
		}else{
			$(".ts1").hide();
		};

		if(phoneVal==""){
			$(".ts2").show();
			return;
		}else if(!/^1[3,4,5,7,8]\d{9}$/.test(phoneVal)){
			$(".ts2").show();
			$(".ts2").html("请正确填写手机号码！");
			return;
		}else{
			$(".ts2").hide();
		};
		$(".ts3").hide();
		$(".zvercode img").show();
		$.ajax({
			url:"getCardBinDingInfo.html?bankCode=" + bankCode + "&cardNo=" + card_no+ "&phone=" + phone,
			type:"post",
			dataType:"json",
			success:function(data){
				console.log(data)
				  var code = data.code;
				  var message = data.message;
				  $(".zvercode img").hide();
				  if(code == "0"){
					$('#persondialogwrong').show();
					$('.wrongtip').html("验证码已发送！");
				    code_Time(o[0]);
				    var ticket = data.data.ticket;
				    var bindingId = data.data.bindingId;
				    $("#ticket").val(ticket);
				    $("#bindingId").val(bindingId);
				  }else if(code == "2"){
					  $('#persondialogwrong').show();
                      $('.wrongtip').html(message);
				  }else if(code == "232"){
					  $('#persondialogwrong').show();
                      $('.wrongtip').html("只允许绑定一张银行卡！");
				  }else if(code == "300"){
					  $('#persondialogwrong').show();
                      $('.wrongtip').html("未开通实名认证！");
				  }else if(code == "207"){	
					  $('#persondialogwrong').show();
                      $('.wrongtip').html("此银行卡号已绑定！");
				  }else{
					  $('#persondialogwrong').show();
                      $('.wrongtip').html(message);
				  }
			}
		});
	})
    //忘记密码
	/*$("#getyz_btn").click(function(){
		var o = $(this);
		var phoneVal=$(".phone_input").val();
		
		if(phoneVal==""){
			$(".phone_em").show();
			return;
		}else if(!/^1[3,4,5,7,8]\d{9}$/.test(phoneVal)){
			$(".phone_em").show();
			$(".phone_em").html("请正确填写手机号码！");
			return;
		}else{
			//loading
		    $('.yz_box .loadimg').css('display', 'block');
			o.attr('disabled',"true");
			$(".phone_em").hide();
			$.ajax({
				url:url_prefix+"/customer/sendPhoneCode?type=1&phone=" + phoneVal +"",
				type:"post",
				dataType:"json",
				success: function(data){
					//取消 loading
				    $('.yz_box .loadimg').css('display', 'none');
					o.removeAttr('disabled');
					if(data.code=="0"){
						$('.warns').html('');
						code_Time(o[0]); 
					}else if(data.code=="noEmail"){
						$('.warns').html("不存在此手机号码！");
					}else{
						$('.warns').html(data.message);
					}
				}
			});
		}
	})*/

	//手机验证
	$("#phone_submit").click(function(){
		var phoneVal=$("#phone").val();
		var yzVal=$("#forget_code").val();
		if(phoneVal=="手机号"){
			$(".zphtip").text("请输入手机号！");
			return;
		}
		if(yzVal=="短信验证码"){
			$(".logintip").text("验证码不能为空！");
			return;
		}
		checkCode(phoneVal,yzVal);

	})

	function checkCode(find_phone,emailCode){
	var url = "customer/checkCode?type=1&phone=" + find_phone + "&phoneCode=" + emailCode + "";
	$.ajax({
		type:'POST',
        url: url,
		dataType:'json',
		success: function(data){
			      if(data.code==0){
			        document.getElementById("registerform").submit();
			      }else if(data.code=="228"){
			        $(".logintip").html("验证码输入有误！");
			      }else if(data.code=="noCustomer"){
			        $(".warns").html("不存在该手机号码对应的账户！");
			      }else if(data.code=="227"){
			        $(".logintip").html("验证码已过期！");
			  }
		}
	});
}
	//修改密码
	/*$(".revise_submit").click(function(){
		document.getElementById("reviseForm").submit();
	});	*/
	//天天赚转出
	$('#goout').click(function(){
		var daymoney = $(".inputstyle").val();//转出金额
		var daynow = $("#daynow").html();//可用金额
		if(daymoney =="" || daymoney == null){			
			$('.daywarn').html('转出金额不能为空！');
			return false;	
		}
		var reg = /.*\..*/;
 	    if(reg.test(daymoney)){
 		   if(daymoney.toString().split(".")[1].length>2){
 			  $('.daywarn').html('转出金额需为2位小数！');
 			  return false;
 		   }
 	    }
		var daymoney = Number(daymoney);//转出金额
		var daynow = Number(daynow);//可用金额
		if(daynow == 0){
			$('.daywarn').html('您余额为0.00,无法转出！');
			return false;
		}
		if(daymoney > daynow){
			$('.daywarn').html('您最多可转出'+daynow+'元！');
			return false;
		}
		if(daymoney == 0){
			$('.daywarn').html('转出金额不能为零！');
			return false;
		}
		 $('.daywarn').html('');
		//loading
	    $('.dayoutload img').css('display', 'block');
		$('.dayoutload input').attr('disabled',"true");
		$.ajax({
			url:url_prefix+"/yuebao/redeem.do?amount="+daymoney,
			type:"post",
			dataType:"json",
			success:function(data){	
				console.log(data)
				//$("#myoutbox").css('display', 'block');
				if(data.code==-2) {
					window.location.href=url_prefix+"login.html";
					return;
				}else if(data.code==0){
					$("#outm").html(daymoney);
					$("#myoutbox").css('display', 'block');
				}else{
					$("#failtip").html(data.info)
					$("#myoutfail").css('display', 'block');
					$("#zremytt").click(function(){
						location.reload();
					})
				}
				//loading取消
				$('.dayoutload img').css('display', 'none');
				$('.dayoutload input').removeAttr('disabled');
				$(".inputstyle").val("");
			     //alert(data.info);
				 //location.reload();
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {					
				 //loading取消
				$('.payload').css('display', 'none');
				$('.paybtn').removeAttr('disabled');
			     //document.body.removeChild(circle.canvas);
                // alert("请求超时，请重试");
                 $("#failtip").html("请求超时，请重试")
					$("#myoutfail").css('display', 'block');
					$("#zremytt").click(function(){
						location.reload();
					})
            }  
		});
	})
	
	$(".bank_btton").click(function(){		
		var phoneVal=$(".bank_ts2").val();
		var phoneVal1=$(".min_length").val();
		var bankbal=$('.min_width').val();
		if(phoneVal1==""){
			$(".ts1").show();
			return;
		}else if(!/^[0-9]{16,19}$/.test(phoneVal1)){
			$(".ts1").show();
			$(".ts1").html("请正确填写银行卡号！");
			return;
		}else{
			$(".ts1").hide();
		};

		if(phoneVal==""){
			$(".ts2").show();
			return;
		}else if(!/^1[3,4,5,7,8]\d{9}$/.test(phoneVal)){
			$(".ts2").show();
			$(".ts2").html("请正确填写手机号码！");
			return;
		}else{
			$(".ts2").hide();
		};
		if(bankbal==""){
			$(".ts3").show();
			return;
		}else{
			$(".ts3").hide();
		}
	})
	
	x.returnHref= function(){
		window.location.href=url_prefix+"/personBank.html";
	};
	x.returnReload= function(){
		window.location.reload();
		x.Dialog.close("showDialog");
	};
	
	x.returnHrefs= function(retUrl){
		if(retUrl != '' && retUrl.indexOf("lendpage") != -1){
		   window.location.href=url_prefix+"/lendpage.html";
		}else{
		   window.location.href=url_prefix+"/mycenterInfo.html";
		}
	};
	x.returnHrefss= function(url){
		if(url != '' && url.indexOf("lendpage") != -1){
			window.location.href=url_prefix+'/register-name.html?retUrl=/lendpage.html';
		}else{
			window.location.href=url_prefix+'/register-name.html';
		}
	};
	
	x.showRule = function (info){
		x.Dialog({
			title:info, 
			boxID: "showDialog",
			yesBtn:["关闭",function(){
				x.Dialog.close("showDialog");
			}]
		});
	};
	
	x.showTip = function (info,fn,retUrl){
		x.Dialog({
			title:info, 
			boxID: "showDialog",
			yesBtn:["关闭",function(){
				return fn(retUrl);
			}]
		});
	};
	
	x.showConfirm = function (info,txt,fn){
		x.Dialog({
			title:info,
			boxID: "confirmDialog",
			yesBtn:[txt,function(){
				return fn();
			}],
			noBtn: ["取消",function(){
				x.Dialog.close("confirmDialog");
			}]
		});
	};
	
	
	function confirmStyle(){
		$(".ui_box_btn").css("width","50%");
		$(".ui_box_btn_yes").css("float","right");
		$(".ui_box_btn_no").css("border-right","1px solid #ccc");
	}
	
});
