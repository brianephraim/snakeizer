;(function(global){
	// UglifyJS define hack.  Used for unit testing.
	if (typeof SNAKEIZER_APP_NOW === 'undefined') {
	  SNAKEIZER_APPHTML_NOW = function () {
	    return +new Date();
	  };
	}

	//!!!!!!!!!!!!!!!!!!!!!!!!!!!
	//EXPECTS <whatev class="catSlides"></whatev> in the DOM
	var app = function($,snakeizer){
		var html = '<div class="app x">  <div class="navigation">    <div class="historyList">      <!-- js loop items -->    </div>  </div>  <div class="main"></div></div>asdf';
		if(document.location.host === 'localhost:4000'){
			html = html.replace('$@$rootPathReplaceString$@$','http://localhost:8000/snakeizer/app/')
		} else if (document.location.host === 'defualt.github.io'){
			html = html.replace('$@$rootPathReplaceString$@$','/snakeizer/app/')
		} else if (document.location.origin === 'file://'){
			html = html.replace('$@$rootPathReplaceString$@$','')

		}
		return html;
	};


	if (typeof exports === 'object') {
		// nodejs
		module.exports = app($,snakeizer);
	} else if (typeof define === 'function' && define.amd) {
		// AMD
		define([],function(){ 
			return app.apply(null,arguments);
		});
	} else if (typeof global.app === 'undefined') {
		// Browser: Make `Tweenable` globally accessible.
		global.app = app($,snakeizer);
	}



})(this);


