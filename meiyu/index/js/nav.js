window.onload=function(){
    var  oLi=$(".navcontent li a");
    oLi.mouseenter(function () {
        $(this).addClass("active").sibling().removeClass("active");
    });
    oLi.mouseleave(function(){
        $(this).removeClass("active");
        oLi.eq(0).addClass("active");
    })
}
