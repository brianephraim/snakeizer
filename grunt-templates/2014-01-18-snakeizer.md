---
layout: post
title: "Snakeizer"
description: ""
category: 
tags: [dev]
git_widget_repo_name: "snakeizer"
---

{x% include JB/setup %x}

description

{x% include BE/github_widget %x}

<div class="noShow">

<link rel="stylesheet" href="{{ site.JB.WIDGET_PATH }}/snakeizer/app/css/snakeizer.css" media="screen" type="text/css" />

<link rel="stylesheet" href="{{ site.JB.WIDGET_PATH }}/snakeizer/app/css/app.css" media="screen" type="text/css" />

</div>

<div class="snakeizerBlogWidgetWrap widgetWrap">
	<div class="snakeizerWidgetFrame"> </div>
</div>

<script> 
	inlineScript.snakeizer = require.config({
		paths: {
	 		'jQuery': '{{ site.JB.WIDGET_PATH }}/snakeizer/app/bower_components/jquery/jquery.min'
	 	},
	 	shim: {
	        'jQuery': {
	            exports: '$'
	        }
	    },
     	 context: "snakeizer",
         baseUrl: "{{ site.JB.WIDGET_PATH }}/snakeizer/app/"
    });
	inlineScript.snakeizer(['js/app']);
</script>