App.module("Animation", function(Animation){

Animation.vanisher = function(view){
						console.log('vanish triggered');

					view.$el.stop(true).animate({opacity:0.0},750, function(){
						view.close();
						console.log('vanished view closed');
						//App.vent.trigger('KD:viewready',model);

					});			
	}


	Animation.fit_image = function (model,view){

		//TODO -- BROKEN IN CHROME ONLY --
		/*var container_height = Animation.getvalue($('#productimagebox',view.el).css('height'))
			,container_width = Animation.getvalue($('#productimagebox',view.el).css('width'));*/

		var maxdim = Animation.image_format(model);
		var container_width = maxdim[0];
		var container_height = maxdim[1];


		var  attachments = model.get('attachments')
			,latest = attachments.length-1
			,image = (attachments[latest].images)
			, o_width  = image.full.width
			,o_height = image.full.height;

		setfield = function(value,default_val){
			var name = 'zoom'+value;
			if(typeof model.get("custom_fields")[name] === "undefined"){
				return  default_val;
			}else{
				return model.get("custom_fields")[name][0];
			};
		}
						
		var x1 = 0
			,y1 = 0
			,x2 = o_width
			,y2 = o_height

		return Animation.resizer(o_width
								,o_height
								,x1
								,y1
								,x2
								,y2
								,container_width
								,container_height);			
	};
	Animation.calculate_zoom = function (model,view){

		//TODO -- BROKEN IN CHROME ONLY --
		/*var container_height = Animation.getvalue($('#productimagebox',view.el).css('height'))
			,container_width = Animation.getvalue($('#productimagebox',view.el).css('width'));*/

		var maxdim = Animation.image_format(model);
		var container_width = maxdim[0];
		var container_height = maxdim[1];

		var  attachments = model.get('attachments')
			,latest = attachments.length-1
			,image = (attachments[latest].images)
			, o_width  = image.full.width
			,o_height = image.full.height;

		setfield = function(value,default_val){
			var name = 'zoom'+value;
			if(typeof model.get("custom_fields")[name] === "undefined"){
				return  default_val;
			}else{
				return model.get("custom_fields")[name][0];
			};
		}
						
		var x1 = setfield('x1',0)
			,y1 = setfield('y1',0)
			,x2 = setfield('x2',o_width)
			,y2 = setfield('y2',o_height);
		
		return Animation.resizer(o_width
			,o_height
			,x1
			,y1
			,x2
			,y2
			,container_width
			,container_height);			
	};

	Animation.resizer = function(w,h,x1,y1,x2,y2,dw,dh){

		var zoomfactor = Animation.zoomfactor(x1,y1,x2,y2,dw,dh)
		
		var resize_w = w * zoomfactor
			, resize_h = h * zoomfactor
			,resize_x = -x1 * zoomfactor
			, resize_y = -y1 * zoomfactor;
			
		var final = {}
		
		final['top'] = resize_x;
		final['left'] = resize_y;
		final['width'] = resize_w;
		final['height'] = resize_h;


		return final;
		
	};

	Animation.widthorheight = function(x1,y1,x2,y2,dw,dh){
		
		var zw = x2-x1
			, zh = y2-y1
			, dhw = dh/dw
			, zhw = zh/zw;

		if(dhw<zhw){
			//use height
			return false;
		}else{
			//use width
			return true;
		};
	};
		
	Animation.zoomfactor = function(x1,y1,x2,y2,dw,dh){
		
		var zw = x2-x1
			, zh = y2-y1;
		
		woh = Animation.widthorheight(x1,y1,x2,y2,dw,dh);

		if(woh){
			return (dw/zw);	
		}else{
			return (dh/zh);
		}
	}

	Animation.aligner = function(zoomfactor,resize_w,resize_h,x1,y1){
				
		var aligned_x0 = resize_w * zoomfactor
			, aligned_y0 = resize_h * zoomfactor
			, aligned_x1 = -x1 * zoomfactor
			, aligned_y1 = -y1 * zoomfactor
			, returnitem = [aligned_x0,aligned_y0,aligned_x1,aligned_y1];

		return returnitem;
	};					

	Animation.getvalue 	= function(value){

		var Num = Number(value);

		if(isNaN(Num)){
			if((value === undefined)||(value.length < 1 )){
				return 0;
			}else{
				value = value.slice(0,value.length-1);
				return Animation.getvalue(value);
			}
		}else{
			return Num;
		}
	};

	Animation.image_format = function(model){
		var model_data = model.get("custom_fields");
		switch(model_data.type){
			default:
				return [300,500];
				break;
		}


	};
	 	

});
