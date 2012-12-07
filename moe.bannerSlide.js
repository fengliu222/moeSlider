var  moe = {};
  moe.bannerSlide = function(obj){
		this.init.call(this,obj);
	}

	moe.bannerSlide.prototype = moe.fn = {
		init:function(obj){
			var that = this;
			this.items = $(obj);
			setInterval(function(){
				that.slide(that);
			},6000);
		},
		slide:function(that){
			var oleft = parseInt(that.items.css("left"));
			var owidth = that.items.children(".item").width();
			var offsetWidth = (that.items.children("div").length)*owidth;

			that.items.css({
				left:function(){
					if(offsetWidth+oleft>(owidth))
					{
						return oleft - 945;
					}
					else{
						return 0;
					}
				}
			});
		}

	};