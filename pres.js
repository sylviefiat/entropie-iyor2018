/*
 * Adapted from https://github.com/zgrossbart/htmlpresent
 */

var slideCount = 0;
var slideArray = [];
var currentSlide = 1;

function positionSlide(slide) {
	if (slide > 0 && slide <= slideCount) {
		slideArray[currentSlide].fadeOut(500);
		currentSlide = slide;
		slideArray[currentSlide].fadeIn(1500, 'swing');
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
	$(".slide").each(function () {
		slideCount++;
		$(this).css("display", "none");
		slideArray[slideCount] = $(this);
	});
	$(document).keyup(handleKeyup);
	slideArray[currentSlide].css("display", "flex");
});
