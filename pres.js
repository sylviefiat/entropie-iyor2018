/*
 * Adapted from https://github.com/zgrossbart/htmlpresent
 */

var slideCount = 0;
var slideProject = 4;
var slideArray = [];
var currentSlide = 1;
var videoCount = 0;
var videoArray = [];
var currentVideo = 0;
var direction = 1;
var $sl, interval;
var imgWidth = 824, imgHeight=481;
var projectSlide = 4;


function slidit(container, delta){	
	var startX = ($(window).width()-imgWidth)/2;
  	var max = -(container.width() - $(window).width());
	// new position = old position + deltaY
	var posX = container.offset().left -= delta;
	//console.log(max);
	//console.log(posX);
	// boundaries calculation
	if(posX >= startX) { posX = max-startX; console.log(max) }
	if(posX <= max-startX-30) { posX = startX}
	// update position
	container.offset({left: posX});
	// display project metadata	
	container.find("a").each(function(child, a){
        var centerLine = $(window).width()/2;
        var divStart = $(this).offset().left;
        var divEnd = divStart + $(this).width();
        if(divStart < centerLine && divEnd > centerLine){
            $(this).find('.para').css('display','flex');
        } else {
            $(this).find('.para').css('display','none');
        };
    });
};

function startSlider(){
	interval = setInterval(function()
    	{
        	slidit($('.images'), imgWidth);
    	}, 3000);
}

function stopSlider(){
	clearInterval(interval);
}

function positionSlide(slide) {
	stopSlider();
	// display background video on first slide only
	//$("#bgvid").css("display", (slide>1)?"none":"block");
	// do not display left arrow on first slide
	//$(".arrow_left").css("display", (slide===1)?"none":"block");

	slideArray[currentSlide].fadeOut(500);
	if(slideArray[currentSlide].find("iframe") && slideArray[currentSlide].find("iframe")[0]){
		slideArray[currentSlide].find("iframe")[0].src="";
	}

	// new slide
	currentSlide = (slide<=slideCount)?((slide>0)?slide:slideCount):1;

	// display background video on first slide only
	$("#bgvid").css("display", (currentSlide>1)?"none":"block");
	// do not display left arrow on first slide
	$(".arrow_left").css("display", (currentSlide===1)?"none":"block");

	slideArray[currentSlide].fadeIn(1500, 'swing');
	if(slideArray[currentSlide].find("iframe") && slideArray[currentSlide].find("iframe")[0]){
		currentVideo=currentSlide-projectSlide;
		slideArray[currentSlide].find("iframe")[0].src = videoArray[currentVideo];	
	} else {
		currentVideo=0;
	}

	if(slide === projectSlide){
		$('.images').css('margin-left',($(window).width()-imgWidth)/2);
		$('.images').css('margin-right',($(window).width()-imgWidth)/2);
		$('.acant').find('.para').css('display','flex');
		startSlider();
    	$('.images').hover(function(){
		    stopSlider();
		    }, function(){
		    startSlider();
		});
	}

}

function nextSlide() {	
	positionSlide(currentSlide + 1);
}

function prevSlide() {
	positionSlide(currentSlide - 1);
}

var handleKeyup = function(e) {
	var code = e.keyCode || e.which;
	switch(code) {
		case 37: //left arrow key
			prevSlide();
			return false;
		case 39: // right arrow key
		case 32: //space key
			nextSlide();
			return false;
		case 35: // end key
			positionSlide(slideCount);
			return false;
		case 36: // home key
			positionSlide(1);
			return false;
	}
};

$(function() {
	imgWidth = $(".img0").width();
	imgHeight = $(".img0").height();
	// slide loading in array
	$(".slide").each(function () {
		slideCount++;
		$(this).css("display", "none");
		slideArray[slideCount] = $(this);
	});
	$(document).keyup(handleKeyup);
	slideArray[currentSlide].css("display", "flex");
	// video url in array
	$(".video").each(function () {
		videoCount++;
		videoArray[videoCount]=$(this).find("iframe")[0].src;
		$(this).find("iframe")[0].src = null;
	});
});

document.addEventListener("wheel", function (e) {
	if(currentSlide !== projectSlide)
	{
		if(e.deltaY < 0)
			prevSlide();
		else
			nextSlide();
	} else {
		slidit($('.images'), e.deltaY);
	}
}, true);

