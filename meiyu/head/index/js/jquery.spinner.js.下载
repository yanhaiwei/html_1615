;(function ($) {

  i = 0; 
  lft=false;
  //flag为4时为理财计划
  var flag = $("[data-infos]").attr("data-infos");
  var finmin = $("#finmin").val();//理财计划起投值
  var finstep = $("#finstep").val();//理财计划递增递减值
  $.fn.spinner = function (opts) {
    return this.each(function () {
    		var defaults = {value:finmin, min:0}

    		//var defaults = {value:50, min:0}

      var options = $.extend(defaults, opts)
      var keyCodes = {up:38, down:40}
      var container = $('<div></div>')
      container.addClass('spinner')
      var textField = $(this).addClass('value').val(options.value)
      //var textField = $(this).addClass('value').attr('maxlength', '9').val(options.value)
        .bind('keyup paste change', function (e) {
          var field = $(this)
          if (e.keyCode == keyCodes.up) changeValue(50)
          else if (e.keyCode == keyCodes.down) changeValue(-50)
          else if (getValue(field) != container.data('lastValidValue')) validateAndTrigger(field)
        })
      textField.wrap(container);
      //判断是否是我的借款表单还是投标
      var lendhidden = $('#lendhidden').val();
      if(lendhidden){
    	  var increaseButton = $('<button class="increase">+</button>').click(function () { 
        	  changeValue(10000,'add');
        	  })
          var decreaseButton = $('<button class="decrease">-</button>').click(function () {
        	  changeValue(-10000,'minus');
        	  })
      }else{
    	  var increaseButton = $('<button class="increase">+</button>').click(function () { 
    			  changeValue(+finstep); 
    			  //changeValue(50);  
        	  })
          var decreaseButton = $('<button class="decrease">-</button>').click(function () { 
    			  changeValue(-finstep); 
    			  //changeValue(-50);  
        	  })
      }
      validate(textField)
      container.data('lastValidValue', options.value)
      textField.before(decreaseButton)
      textField.after(increaseButton)

      function changeValue(delta,flag) {
    	if(lft){
    		i = t;
    		lft=false;
    	}  	
    	var flag = flag;
    	 var numarry = new Array("壹万","贰万","叁万","肆万","伍万","陆万","柒万","捌万","玖万","拾万","拾壹万","拾贰万","拾叁万","拾肆万","拾伍万","拾陆万","拾柒万","拾捌万","拾玖万","贰拾万","贰拾壹万","贰拾贰万","贰拾叁万","贰拾肆万","贰拾伍万","贰拾陆万","贰拾柒万","贰拾捌万","贰拾玖万","叁拾万");
    	if(flag == 'add'){
    	       
    	  if(i>=29){
    		i=29;
    	    return false
    	  }
    	  i = ++i;  
    	  var lendhidden = $('#lendhidden').val();
    	  if(lendhidden){
        	$('.lendmoneys').html(numarry[i]);
            textField.val(getValue() + delta);
            var curmoney=getValue();
            var curterm=$('#applyterm').find("option:selected").val();
            applynumFun(curmoney,curterm);
          }  
    	}else if(flag == 'minus'){
    	  i = --i; 
    	  if(i<0){
    		i=0;
      	    return false
      	  }
      	  $('.lendmoneys').html(numarry[i]);
          textField.val(getValue() + delta);
          var curmoney=getValue();
          var curterm=$('#applyterm').find("option:selected").val();
          applynumFun(curmoney,curterm);
        }else{
          textField.val(getValue() + delta);
        }
        validateAndTrigger(textField)
      }
      /*借款数值改变计算金额*/
      function applynumFun(curmoney,curterm){
		  if(curmoney!=""){
				  $.ajax({
					  url:contentPath+"/total_lixi.do?lend_money="+curmoney+"&bill_num="+curterm,
					  type:"post",
					  dataType:"json",
					  success:function(data){ 
						$(".first_month").html(data.first_paymoney+"元");
						$(".lendnum").html(data.should_pay+"元");
					  },  
				      error: function (data) {   
				           
				      } 
				  })
		  }
		  
	  }
      function validateAndTrigger(field) {
        clearTimeout(container.data('timeout'))
        var value = validate(field)
        if (!isInvalid(value)) {
          textField.trigger('update', [field, value])
        }
      //计算
        var dataselect = $(".coupon option:selected").attr("id");
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
		          var surplusum = parseInt(spinner) - parseInt(dataselect);
		          $(".coupontip").html('已优惠'+parseInt(dataselect)+'元，实际支付'+surplusum+'元');
		    }
		}
        increaseFun();
    	//var away = $('.spinnerExample').val()   	
      }
    //计算
      function increaseFun(){
  		var away = $('.spinnerExample').val();
  		//利率隐藏域。动态计算预计收益
  		var rates = $('.rates').val();
  		//var total = (away*rates).toFixed(2);
  		var total = away*rates;
  		var a = total+"";
  		var aa = a.indexOf(".");
  		var last = a.substring(aa+1, aa+4);
  		var lastnum = last.substring(2,3);
  		
          if(lastnum>=5){
          	var mmm = (away*rates)-0.01;
          	var totalss = parseFloat(mmm.toFixed(2));
          
          }else{
          	var totalss = parseFloat((away*rates).toFixed(2));
          }		
  		$('#away .hou_money').html(totalss);

  	}
      function validate(field) {
        var value = getValue()
        if (value <= options.min) decreaseButton.attr('disabled', 'disabled')
        else decreaseButton.removeAttr('disabled')
        field.toggleClass('invalid', isInvalid(value)).toggleClass('passive', value === 0)

        if (isInvalid(value)) {
          var timeout = setTimeout(function () {
            textField.val(container.data('lastValidValue'))
            validate(field)
          }, 500)
          container.data('timeout', timeout)
        } else {
          container.data('lastValidValue', value)
        }
        return value
      }

      function isInvalid(value) { return isNaN(+value) || value < options.min; }

      function getValue(field) {
        field = field || textField;
        return parseInt(field.val() || 0, 10)
      }
    })
  }
})(jQuery)