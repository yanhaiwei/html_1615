
		 	
            function initMap(){
                createMap();//创建地图
                setMapEvent();//设置地图事件
            }
            //创建地图函数：
            function createMap(){
            	var x = 121.537243863448607;
			    var y = 31.230917172420714;
			    var ggPoint = new BMap.Point(x,y);
			    var marker = new BMap.Marker(ggPoint);
			    
                var map = new BMap.Map("BaiduDitu");//在百度地图容器中创建一个地图
                map.centerAndZoom(ggPoint,18);//设定地图的中心点和坐标并将地图显示在地图容器中
                map.addOverlay(marker);
                var opts = {
                	width:200,
                	height:100,
                	title:"美豫投资总部"
                }
                var infoWindow = new BMap.InfoWindow('地址：上海市浦东新区福山路388号越秀大厦8F',opts);
                marker.addEventListener('click',function(){
                	map.openInfoWindow(infoWindow,ggPoint);
                });
                window.map = map;//将map变量存储在全局
            }
            //地图事件设置函数：
            function setMapEvent(){
                map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
                map.enableScrollWheelZoom();//启用地图滚轮放大缩小
                map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
                map.enableKeyboard();//启用键盘上下左右键移动地图
            }
            $(function(){
                initMap();//创建和初始化地图
                createSearch();
               
            });
            function createSearch() {
                var map = window.map;
                var local = new BMap.LocalSearch(map,
                    {
                        renderOptions: { map: map, panel: "searchlist" }
                    });
                window.local = local;
            }
