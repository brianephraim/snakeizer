;(function(global){
	// UglifyJS define hack.  Used for unit testing..
	if (typeof SNAKEIZER_NOW === 'undefined') {
	  SNAKEIZER_NOW = function () {
	    return +new Date();
	  };
	}

	var makeSnakeizerObject = function($){
		console.log('makeSnakeizerObject')
		var snakeizer = function(options){
			console.log('asdfasdf');

            (function($) {

            	console.log('asdfasdf')

				var types = ['DOMMouseScroll', 'mousewheel'];

				if ($.event.fixHooks) {
					for ( var i=types.length; i; ) {
						$.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
					}
				}

				$.event.special.mousewheel = {
					setup: function() {
						if ( this.addEventListener ) {
							for ( var i=types.length; i; ) {
								this.addEventListener( types[--i], handler, false );
							}
						} else {
							this.onmousewheel = handler;
						}
					},
					
					teardown: function() {
						if ( this.removeEventListener ) {
							for ( var i=types.length; i; ) {
								this.removeEventListener( types[--i], handler, false );
							}
						} else {
							this.onmousewheel = null;
						}
					}
				};

				$.fn.extend({
					mousewheel: function(fn) {
						return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
					},
					
					unmousewheel: function(fn) {
						return this.unbind("mousewheel", fn);
					}
				});


				function handler(event) {
					var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
					event = $.event.fix(orgEvent);
					event.type = "mousewheel";
					
					// Old school scrollwheel delta
					if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
					if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }
					
					// New school multidimensional scroll (touchpads) deltas
					deltaY = delta;
					
					// Gecko
					if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
						deltaY = 0;
						deltaX = -1*delta;
					}
					
					// Webkit
					if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
					if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }
					
					// Add event and delta to the front of the arguments
					args.unshift(event, delta, deltaX, deltaY);
					
					return ($.event.dispatch || $.event.handle).apply(this, args);
				}

			})(jQuery);
			
			var cb = function(){
			  console.log('cb')
			};

			$('.x').on('mousewheel',function(e){
			  cb.apply(this,arguments);
			  e.preventDefault();
			});

			var fullHeight = '200px';
			var fullWidth = '200px';
			var itemMinHeight = '20px';
			var itemMaxHeight = '75px';


			var $historyList = $('.historyList');
			var $itemArray = [];
			for(var i = 0; i< 100;i++){
			  var $item = $('<div class="item">i</div>');
			  $itemArray.push($item);
			  $historyList.append($item);
			}


			var currentScroll = 0;
			var firstTime = true;
			cb = function(e, delta, deltaX, deltaY){
			  deltaX = deltaX || 0;
			  deltaY = deltaY || 0;
			  var currentScrollCache = currentScroll;
			  currentScroll += (deltaX + -deltaY)* -4;
			  var l = $itemArray.length;
			  if(firstTime === true){
			    firstTime = false;
			    //currentScroll = -l*10;
			  }
			  
			  if(currentScroll <= 0 && currentScroll >= -l*10){
			    for(var i = 0; i< l;i++){
			    console.log(currentScroll)
			      var itemPositionTop = ((i*20) + currentScroll);
			      if(itemPositionTop < 100 ){
			        $itemArray[i].css({
			          'top': (itemPositionTop)+'px',
			          'left':'0px'
			        })
			      } else {
			         $itemArray[i].css({
			          'left': (itemPositionTop -100)+'px',//
			          'top': '100px'
			      })  
			    }
			    
			    
			  }
			  } else {
			    currentScroll = currentScrollCache;
			  }
			};
			cb();
			/**/
        };
        snakeizer()
		return snakeizer;
	}
	//return objInstance;

	if (typeof exports === 'object') {
		// nodejs
		module.exports = makeSnakeizerObject($,tools);
	} else if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jQuery'],function(){
			return makeSnakeizerObject.apply(null,arguments);
		});
	} else if (typeof global.snakeizer === 'undefined') {
		// Browser: Make `Tweenable` globally accessible.
		global.snakeizer = makeSnakeizerObject($,tools);
	}



})(this);