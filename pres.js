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


function slidit(container, delta){	
  	var max = -(container.width() - $(window).width());
	// new position = old position + deltaY
	var posX = container.offset().left -= delta;
	    // boundaries calculation
	    if(posX >= 0) { posX = max;}
	    if(posX <= max) { posX = 0;}
	    // update position
	    container.offset({left: posX});  	
};

function startSlider(){
	interval = setInterval(function()
    	{
        	slidit($('.images'), $(window).width()/2);
    	}, 5000);
}

function stopSlider(){
	console.log("stop");
	clearInterval(interval);
}

function positionSlide(slide) {
	stopSlider();
	// display background video on first slide only
	$("#bgvid").css("display", (slide>1)?"none":"block");

	if (slide > 0 && slide <= slideCount) {
		// remove previous slide
		slideArray[currentSlide].fadeOut(500);
		if(slideArray[currentSlide].find("iframe") && slideArray[currentSlide].find("iframe")[0]){
			slideArray[currentSlide].find("iframe")[0].src="";
		}
		// new slide
		currentSlide = slide;
		slideArray[currentSlide].fadeIn(1500, 'swing');
		if(slideArray[currentSlide].find("iframe") && slideArray[currentSlide].find("iframe")[0]){
			currentVideo++;
			slideArray[currentSlide].find("iframe")[0].src = videoArray[currentVideo];	
		} else {
			currentVideo=0;
		}
	}

	if(slide === 3){
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
	if(currentSlide !== 3)
	{
		if(e.deltaY < 0)
			prevSlide();
		else
			nextSlide();
	} else {
		slidit($('.images'), e.deltaY);
	}
}, true);



