// JavaScript Document

$(function(){
	/*娉ㄥ唽椤靛垽鏂�*/
	var regform = $(".registerform").Validform({
		btnSubmit:"#subbt", 
		tiptype:function(msg,o,cssctl){
			if(o.type==3){
				o.obj.nextAll("span").first().html(''+msg);
			
			}else if(o.type==2){
				o.obj.nextAll("span").first().html('');

			}else{
				//loading				
				o.obj.nextAll("span").first().html(msg);

			}
		},
		datatype:{
			"*6-16n":/^[a-zA-Z\d]{6,16}$/,
			"*phone":/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/
		},
		ajaxPost:true,
		beforeSubmit:function(curform){
			//loading
			$("#register_btn .loadimg").css('display', 'block');
			$('#register_btn input').attr('disabled',"true");
			
			//鍦ㄩ獙璇佹垚鍔熷悗锛岃〃鍗曟彁浜ゅ墠鎵ц鐨勫嚱鏁帮紝curform鍙傛暟鏄綋鍓嶈〃鍗曞璞°€�
			//杩欓噷鏄庣‘return false鐨勮瘽琛ㄥ崟灏嗕笉浼氭彁浜�;	
		},
		callback:function(data){
			var code = data.code;
			var message = data.message;
			var couponflag = data.couponflag;
			var couponAmount = data.couponAmount;
			var summary = data.summary;
			if(code == 0){ 
				var url = $("#retUrl").val();
				//remove loading
				$("#register_btn .loadimg").css('display', 'none');
				$('#register_btn input').removeAttr('disabled');
				if(couponflag == 1){
					window.location.href='comtification.html';
					//x.showTip("<div class='regist_cont'><div class='regist_top'>娉ㄥ唽鎴愬姛锛�</div><span class='regist_amount'><b>"+couponAmount+"</b>鍏�</span><div class='regist_mes'>"+summary+"</div></div>",x.returnHrefss,url);
				}else{
					if(url != '' && url.indexOf("lendpage") != -1){
						window.location.href='comtification.html?retUrl=/lendpage.html';
					}else{
						window.location.href='comtification.html';
					}
				}	
			}else{
				//remove loading
				$("#register_btn .loadimg").css('display', 'none');
				$('#register_btn input').removeAttr('disabled');
				alert(message);
			}
//			alert(data);
		}
	});
	regform.config({
		ajaxurl:{
			beforeSend :function(obj){
				if(this.url.indexOf("checkCode")>=0){
					var data = {};
					data.phone = $("#phone").val();
					data.phoneCode =$("#phoneCode").val();
					data.memberType =$("#memberType").val();
					this.data = $.param(data);
				}
			},
	        success:function(data,obj){
	        	var name = $(obj).attr("name");
	        	if(data.code != 0){
	        		$($(obj)[0]).nextAll("span").first().html('<span class="datamsg">'+ (data.msg|| data.desc)+'</span>');
	        	}else{
	        		$($(obj)[0]).nextAll("span").first().html('');	        	
	        	}
	        }
	    }
	});
	
	$("input[tipMsg]").each(function(){  
        if($(this).val() == ""){  
            var oldVal=$(this).attr("tipMsg");  
        if($(this).val()==""){$(this).attr("value",oldVal).css({"color":"#888"});}  
        $(this)  
           .css({"color":"#888"})     //鐏拌壊  
           .focus(function(){  
            if($(this).val()!=oldVal){$(this).css({"color":"#888"})}else{$(this).val("").css({"color":"#888"})}  
           })  
           .blur(function(){  
            if($(this).val()==""){$(this).val(oldVal).css({"color":"#888"})}  
           })  
           .keydown(function(){$(this).css({"color":"#888"})});  
        }  
    });  
    $('#passWord').click(function(){
		$('.hide_pass').hide();
		$(this).blur(function(){
			if( $(this).val() == ''){
				$('.hide_pass').show();
			}
		});
	});
    $('#passWord').focus(function(){
		$('.hide_pass').hide();
		$(this).blur(function(){
			if( $(this).val() == ''){
				$('.hide_pass').show();
			}
		});
	});
    $('#passWordAgain').click(function(){
		$('.hide_affirm').hide();
		$(this).blur(function(){
			if( $(this).val() == ''){
				$('.hide_affirm').show();
			}
		});
	});
    $('#passWordAgain').focus(function(){
		$('.hide_affirm').hide();
		$(this).blur(function(){
			if( $(this).val() == ''){
				$('.hide_affirm').show();
			}
		});
	});
    document.getElementById("getPhoneCode").onclick=function(e){ var _t = $(e.target); sendPhoneCode(_t)}	
});
/*鎵嬫満鑾峰彇楠岃瘉鐮佸€掕鏃�*/
var wait=60;
function code_Time(o) {
    if (wait == 0) {
    	$('.registerspeech').show();
        $(o).removeAttr("disabled","disabled");            
        $(o).val("閲嶆柊鑾峰彇");
        wait = 60;
    } else {
    	$(o).attr("disabled", "disabled");
        $(o).val("閲嶆柊鍙戦€�(" + wait + ")");
        wait--;
        setTimeout(function() {
            code_Time(o)
        },1000)
    }
}
//鐧诲綍瀵嗙爜/纭瀵嗙爜鐐瑰嚮鍚庣姸鎬�
$('.hide_pass').click(function(){
	$('#passWord').focus();
	$(this).hide();
	$('#passWord').blur(function(){
		if($(this).val() == ''){
			$('.hide_pass').show();
		}
	})
})
$('.hide_affirm').click(function(){
	$('#passWordAgain').focus();
	$(this).hide();
	$('#passWordAgain').blur(function(){
		if($(this).val() == ''){
			$('.hide_affirm').show();
		}
	})
})
//娉ㄥ唽鍙戦€佹墜鏈洪獙璇佺爜
function sendPhoneCode(targert){
	$('#phoneCode_label').html('');
	$('.datamsg').html('');
	var phone = $("#phone").val();
	var randCode = $("#randCode").val();
	if(!$("#phone")[0].validform_valid){		
		if(phone == "鎵嬫満鍙�"){
			$('#registerphone .logintip').html('鎵嬫満鍙蜂笉鑳戒负绌�');
		}else{
			$('#regCodes #phoneCode_label').html('鎵嬫満鍙峰凡娉ㄥ唽鎴栨牸寮忔湁闂')
		}	
		return ;
	}
	if(randCode=="闅忔満鐮�"){
		$('#testcode .logintip').html('闅忔満鐮佷笉鑳戒负绌�');
		return ;
	}
	if(randCode==""){
		return ;
	}
	var a = $('#testcode .form_tips .datamsg').html();
	if(a == '楠岃瘉鐮佷笉姝ｇ‘'){
		return false
	}
	if(a == '闅忔満鐮佷笉姝ｇ‘'){	
		return false
	}
	//loading
	$(targert).attr("disabled", "disabled");	
	//loading
    $('.proving_box .loadimg').css('display', 'block');
    var data = {phone:phone,randCode:randCode};
	$.ajax({
			url:"/customer/sendPhoneCode.do",
			type:"POST",
			data:data,
			dataType:"json",
			success: function(data){
				var a = $('#testcode .form_tips .datamsg').html();
				if(a == '闅忔満鐮佷笉姝ｇ‘'){
					$('#getPhoneCode').removeAttr("disabled");
					$('.proving_box .loadimg').css('display', 'none');
					return false
				}
				if(a == '楠岃瘉鐮佷笉姝ｇ‘'){
					$('#getPhoneCode').removeAttr("disabled");
					$('.proving_box .loadimg').css('display', 'none');
					return false
				}
				//鍙栨秷loading
				$('.proving_box .loadimg').css('display', 'none');
				if(data.code=="0"){
					$("phoneCode_label").hide();
					//alert("楠岃瘉鐮佸凡鍙戦€侊紒");
					code_Time(targert);
					/* $("#getPhoneCode").attr("disabled",false);
					document.getElementById("phone").readOnly=true;*/
				}else if(data.code=="209"){
					$('.registerspeech').show();
					$('#getPhoneCode').removeAttr("disabled");
					$('#regCodes .form_tips').html('鎵嬫満鍙风爜宸茶缁戝畾');
					//alert("鎵嬫満鍙风爜宸茶缁戝畾锛岃鏇存崲鎵嬫満鍙风爜锛�");
				    /*$("#getPhoneCode").attr("disabled",false);*/
				}else if(data.code=="230"){
					$('.registerspeech').show();
					$('#getPhoneCode').removeAttr("disabled");
					$('#regCodes .form_tips').html('楠岃瘉鐮佹湭杩囨湡');
					//alert("楠岃瘉鐮佹湭杩囨湡锛岃浣跨敤锛屽凡鍙戦€侀獙璇佺爜锛�");
				    /*$("#getPhoneCode").attr("disabled",false);*/
				}else if(data.code=="231"){
					$('.registerspeech').show();
					$('#getPhoneCode').removeAttr("disabled");
					$('#regCodes .form_tips').html('鍙戦€佺煭淇℃鏁伴绻侊紝璇风◢鍚庡啀璇曪紒');
					//alert("鎮ㄥ彂閫佺煭淇℃鏁板お棰戠箒锛岃绋嶅悗鍐嶈瘯锛�");
				    /*$("#getPhoneCode").attr("disabled",false);*/
				}else{
					$('.registerspeech').show();
					$('#getPhoneCode').removeAttr("disabled");
					$('#regCodes .form_tips').html(data.message);
					//alert("楠岃瘉鐮佽幏鍙栧け璐ワ紝璇风◢鍚庨噸鏂拌幏鍙栵紒");
				    /*$("#getPhoneCode").attr("disabled",false);*/
				}
			}
		});
	
	
}
//璇煶楠岃瘉鐮�
function sendPsayCode(targert){
	$('#phoneCode_label').hide();
	var phone = $("#phone").val();
	var randCode = $("#randCode").val();
	if(!$("#phone")[0].validform_valid){		
		if(phone == "鎵嬫満鍙�"){
			$('#registerphone .logintip').html('鎵嬫満鍙蜂笉鑳戒负绌�');
		}else{
			$('#regCodes #phoneCode_label').html('鎵嬫満鍙峰凡娉ㄥ唽鎴栨牸寮忔湁闂')
		}	
		return ;
	}
	if(randCode=="闅忔満鐮�"){
		$('#testcode .logintip').html('闅忔満鐮佷笉鑳戒负绌�');
		return ;
	}
	if(randCode==""){
		return ;
	}
    var data = {phone:phone,randCode:randCode};
	$.ajax({
			url:"/customer/sendYYCode.do",
			type:"POST",
			data:data,
			dataType:"json",
			success: function(data){
				if(data.code=="0"){
					$('.warntip').html(data.data.summary);
				}else{
					$('.warntip').html(data.message);
				}
			}
		});
	
	
}