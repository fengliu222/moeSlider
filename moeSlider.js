$.fn.moeSlide = function(con){
// 用户自定变量
	var slideContainerWidth = 0,	 //容器宽度
		autoPlay = false,	//自动滚动开关
		step = 10	, //自动滚动时间间隔
		speed = 0,	//滚动速度
		intro = false,	//是否有介绍文字
		style = 'slide';

	// 插件变量
	var sDiv = $(this),
		sUl = $("ul",$(this)),
		sLi = $("li",sUl),
		sLeft = $(".goLeft"),sRight = $(".goRight"),
		me = this,
		scrollTimer = null,
		styleArr = ['slide','slide-auto','scroll'],
		slideWidth = con.slideWidth,
		autoPlay = arguments[0].autoPlay,
		speed = arguments[0].speed,
		slideContainerWidth = arguments[0].slideContainerWidth,
		picWidth;

		style = arguments[0].style;

	function init(){
		for(var key in styleArr){
			if (style && styleArr[key] == style){
				eval(style+"()");
			}
		}
	}

	init();
			
	function slide(){
		picWidth = slideContainerWidth;

		$(me).css({
			'width': slideWidth+"px",
			'height':'392px',
			'overflow':'hidden',
			'position':'relative'
		});

		$(sLi).each(function(){
			$(this).css({
			  'visibility': 'visible',
			  'list-style':'none',
			  'float':'left'
			});
		});

		$(sUl).prepend($(sLi).eq($(sLi).length-1).clone(true));
		$(".bannerBtnContainer").prepend($('.bannerIntroWord').eq($('.bannerIntroWord').length-1).clone(true))
		$(sUl).css({
			'width':$(".bannerimg li").length*(picWidth)+ "px",
			'position': 'absolute',
			'z-index':2,
			'left': 0,
			'top':0,
			'margin': 0,
		    'padding': 0
		});

		$(".bannerIntroWord").eq(0).css({
			"display":"block",
		});

		var curindex=0;

		$(".bannerbtn.left").bind('click',slide_left);
		$(".bannerbtn.right").bind('click',slide_right);

		function slide_left(){
			if(parseInt($(".bannerimg").position().left) == 0){
				$(".bannerimg").css('left',-(($(".bannerimg li").length-1)*picWidth));
				curindex=$(".bannerimg li").length-1;
			}
			$(".bannerimg").animate({left:'+='+picWidth+'px'},500);
 			curindex--;
			
			$(".bannerIntroWord").each(function(i){
				if(i==curindex) $(this).css("display",'block');
				else $(this).css("display",'none');
			});
			
		}

		function slide_right(){
			if(parseInt($(".bannerimg").position().left) == -(($(".bannerimg li").length-1)*picWidth)){
				$(".bannerimg").css('left',0);
				curindex=0;
			}
			$(".bannerimg").animate({left:'-='+picWidth+'px'},500);
 			curindex++;

			$(".bannerIntroWord").each(function(i){
				if(i==curindex) $(this).css("display",'block');
				else $(this).css("display",'none');
			});
		}
	}

	function autoscroll(){
		var s = sLi.length; 
		var scrollTimer = setInterval(sc,step);
			
		$(me).css({
			'width': slideWidth+"px",
			'height':'392px',
			'overflow':'hidden',
			'position':'relative'
		});

		$(sUl).css({
			'width':sLi.length*(picWidth+5)+ "px",
			'position': 'absolute',
			'z-index':2,
			'left': 0,
			'top':0,
			'margin': 0,
		    'padding': 0
		});

		$(sLi).each(function(){
			$(this).css({
			  'visibility': 'visible',
			  'position': 'absolute',
			  'list-style':'none',
			  'left':0,
			  'top':0,
			  'z-index':1,

			  'transition':'all 1s',
			  '-webkit-transition':'all 1s',
			  '-moz-transition':'all 1s',
			  '-o-transition':'all 1s',
			  '-ms-transition':'all 1s'
			});
		});

		$(sLi).find("img").each(function(){
			$(this).css("width",picWidth+"px");
		});

		sLi.each(function(i){
			$(this).css("left",i*picWidth + "px");
			$(this).css("opacity",0.8);
		});

	 
		$(sUl).mouseover(function(){
				clearInterval(scrollTimer);
				$(this).css("cursor","hand");
				$(this).find("li").each(function(){
					$(this).mouseover(function(){
						$(this).css("opacity",1);
					})
				})
		});

		$(sUl).mouseout(function(){
			 scrollTimer = setInterval(sc,step);
			 $(this).css("cursor"," ");
			 $(this).find("li").each(function(){
			$(this).mouseout(function(){
				$(this).css("opacity",0.8);
			})
		});
	});

	function scroll(){
		var ulPosition = $(sUl).position().left;
		var ind =  (parseInt(-ulPosition / (picWidth)))-1;
	 

		$(sUl).css("left",ulPosition-speed+"px");
		if(	ulPosition!==0 && 
			-ulPosition == (picWidth) * (parseInt(-ulPosition / (picWidth))) &&
			$("li",sUl).length < sLi.length*2)
		{
			sLi.eq(ind).clone().appendTo(sUl).css("left",s*picWidth);
			s++;
		}

		if(-ulPosition == sLi.length * (picWidth)){
		 	$(sUl).css("left",0);
		 	 
		}
	}

	
	}
};