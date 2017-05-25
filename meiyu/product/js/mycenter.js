$(function() {
	//安全认证图标，鼠标移上效果
	$(".authen li").hover(function() {
		$(this).children('span').show();
	}, function() {
		$(this).children('span').hide();
	});
	//账户左侧鼠标移上及点击事件
	$(".accboleft a").hover(function() {
		$(this).css('background', '#f2f0f5');
		$(this).parent().addClass("clicurr");
	}, function() {
		$(this).css('background', 'none');
		$(this).parent().removeClass("clicurr");
	});
	/*$(".accboleft li").click(function(event) {
		$(this).addClass('clicur').siblings().removeClass('clicur');
	});*/
	//账户余额隐藏效果
	/*var zl=$(".ztch span").text().length;
	var y=[];
	for (var i=0; i<zl; i++) {
		y.push("*");
	};
	$(".ztch em").html(y.join(''));*/
	//隐藏点击事件
	//我的账户饼图切换
	$(".disleft").mouseover(function(event) {
		$(".zanileft").show();
		$(".zaniright").hide();
	});
	$(".disright").mouseover(function(event) {
		$(".zaniright").show();
		$(".zanileft").hide();
	});
	//定期理财饼图切换
	$(".zregle").mouseover(function(event) {
		$(".zgele").show();
		$(".zgeri").hide();
	});
	$(".zregri").mouseover(function(event) {
		$(".zgeri").show();
		$(".zgele").hide();
	});
	//分享鼠标移上图标颜色变浅函数
	$(".shareway img").mouseover(function(event) {
		setover(this);
	});
	$(".shareway img").mouseout(function(event) {
		setout(this);
	});
	function setover(obj) {
    	obj.style['opacity'] = 0.8;
    	obj.style['filter'] = 'alpha(opacity=80)';
	}
	function setout(obj) {
    	obj.style['opacity'] = 1;
    	obj.style['filter'] = 'alpha(opacity=100)';
	}
	//邀请好友规则及奖励切换
	$(".zinfa").click(function(event) {
		$(".zinvfri").hide();
		$(".zivtable").hide();
		$(".zinvirules").show();
	});
	$(".zinreturn").click(function(event) {
		$(".zinvirules").hide();
		$(".zinvfri").show();
		$(".zivtable").show();
	});
});