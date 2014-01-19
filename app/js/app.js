;(function(global){
	// UglifyJS define hack.  Used for unit testing.
	if (typeof SNAKEIZER_APP_NOW === 'undefined') {
	  SNAKEIZER_APP_NOW = function () {
	    return +new Date();
	  };
	}

	//!!!!!!!!!!!!!!!!!!!!!!!!!!!
	//EXPECTS <whatev class="catSlides"></whatev> in the DOM
	var app = function($,appHtml,snakeizer){
		console.log({a:snakeizer})
		$(function(){
			
    		$('.snakeizerWidgetFrame').append(appHtml);
    		snakeizer()
		});
		return 'Hi i am return app';
	};


	if (typeof exports === 'object') {
		// nodejs
		module.exports = app($,snakeizer);
	} else if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jQuery','generated/js/appHtml','js/snakeizer'],function(){ 
			return app.apply(null,arguments);
		});
	} else if (typeof global.app === 'undefined') {
		// Browser: Make `Tweenable` globally accessible.
		global.app = app($,snakeizer);
	}



})(this);


