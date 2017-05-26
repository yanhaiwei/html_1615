// 品牌页面TAP切换
var oPList = document.querySelector('.meiyuclass_main_nav');
var oList = document.querySelector('.meiyuclass_main_nav').children;
var Hd = $('.meiyuclass_first_head')[0];
var oUl = $('.meiyuclass_main_list').children();



for(var i = 0;i<oList.length;i++){
    oList[i].index = i;
    oList[i].onclick = function(){
		$(this).siblings().attr('class','libColor');
	    $(this).attr('class','liColor');
	    
		Hd.innerHTML = this.innerHTML;
		show(this.index);
		
	}
}

function show(a){
	index = a;
	
	for(var j = 0 ; j < oUl.length;j++){
		oUl[j].style.display = 'none';
		oUl[index].style.display = 'block';
	}
	
}
