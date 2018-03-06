/*
 * Adapted from https://github.com/zgrossbart/htmlpresent
 */

var slideCount = 0;
var slideArray = [];
var currentSlide = 1;

var players = [];
var playingID = null;

function positionSlide(slide) {
	if (slide > 0 && slide <= slideCount) {
		slideArray[currentSlide].fadeOut(500);
		currentSlide = slide;
		slideArray[currentSlide].fadeIn(1500, 'swing');
		// display background video on first slide only
		$("#bgvid").css("display", (slide>1)?"none":"block");
		// start video player on current slide
		if(slideArray[currentSlide].find("iframe")!==null && slideArray[currentSlide].find("iframe").length > 0){
			
		}
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

});

document.addEventListener("wheel", function (e) {
	if(currentSlide !== 3)
	{
		if(e.deltaY < 0)
			prevSlide();
		else
			nextSlide();
	} else {
		var $div = $('.images'),
      	max = -($div.width() - $(window).width());
		// new position = old position + deltaY
	    var posX = $div.offset().left -= e.deltaY;
	    // boundaries calculation
	    if(posX >= 0) { posX = 0; }
	    if(posX <= max) { posX = max; }
	    // update position
	    $div.offset({left: posX});
	}
}, true);
