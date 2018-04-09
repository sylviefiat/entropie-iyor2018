/*
 * Adapted from https://github.com/zgrossbart/htmlpresent
 */

var hash = window.location.hash.substr(1);
var slideCount = 0;
var slideArray = [];
var currentSlide = (hash!=='')?hash:'home';
var videoCount = 0;
var videoArray = [];
var currentVideo = '';
var direction = 1;
var $sl, interval, interval1;
var imgWidth = 824, imgHeight=481;
var projectSlide = 'projets';
var keys ;

function slidit(container, delta){	
	var startX = ($(window).width()-imgWidth)/2;
  	var max = -(container.width() - $(window).width());
	// new position = old position + deltaY
	var posX = container.offset().left -= delta;
	// boundaries calculation
	if(posX >= startX) { posX = max-startX; }
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

	if(currentSlide!==slide){
		slideArray[currentSlide].fadeOut(500);
		if(slideArray[currentSlide].find("iframe") && slideArray[currentSlide].find("iframe")[0]){
			slideArray[currentSlide].find("iframe")[0].src="";
		}
	}
	// new slide
	//currentSlide = (keys.indexOf(slide)<=slideCount)?((slide!=='home')?slide:keys[slideCount]):'home';
	currentSlide = slide;
	// display background video on first slide only
	$("#bgvid").css("display", (currentSlide!=='home')?"none":"block");
	// do not display left arrow on first slide
	$(".arrow_left").css("display", (currentSlide==='home')?"none":"block");

	slideArray[currentSlide].fadeIn(1500, 'swing');
	if(slideArray[currentSlide].find("iframe") && slideArray[currentSlide].find("iframe")[0]){
		currentVideo=currentSlide+"-video";
		slideArray[currentSlide].find("iframe")[0].src = videoArray[currentVideo];	
	} else {
		currentVideo='';
	}

	if(slide === projectSlide){
		imgWidth = $(".img0").width();
		$('.images').css('margin-left',($(window).width()-imgWidth)/2);
		$('.acant').find('.para').css('display','flex');
		startSlider();
    	$('.images').hover(function(){
		    stopSlider();
		    }, function(){
		    startSlider();
		});
		$('.images').css('margin-right',($(window).width()-imgWidth)/2);
	}

}

function nextSlide() {	
	let i = keys.indexOf(currentSlide) === (slideCount-1) ? 0:keys.indexOf(currentSlide)+1;
	positionSlide(keys[i]);
}

function prevSlide() {
	let i = keys.indexOf(currentSlide) === 0 ? (slideCount-1):keys.indexOf(currentSlide)-1;
	positionSlide(keys[i]);
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
			positionSlide('end');
			return false;
		case 36: // home key
			positionSlide('home');
			return false;
	}
};

function getTime(){
	console.log(currentSlide);
	switch(currentSlide){
		case 'yior':
		case 'entropie':		
		case 'pathogen':
			return 30000;
		case 'projects':
			return 60000;
		case 'oreanet':
			return 300000; // 18min32
		case 'blanco':
			return 300000; //5min27
		case 'apex':
			return 300000; //23min
		case 'carioca':
			return 300000; //8min56
		case 'coca':
			return 60000; //1min01
		case 'resocorail':
			return 300000; // 15min 42
		case 'planactiondugong':
			return 300000; // 26min 29
		case 'pristine':
			return 300000; // 20min 59
		case 'macadam':
			return 140000; // 2min 20
		case 'where':
			return 60000; // 0min 58
		case 'home':
		case 'end':
		default:
			return 10000;
	}
}

function runDiapo(){	
	stopDiapo();
	nextSlide();
	var time = getTime();
	interval1 = setInterval(runDiapo, time);
}

function startDiapo(time){
	

	interval1 = setInterval(function()
    	{    		
        	nextSlide();
    	}, time);
}

function stopDiapo(){
	clearInterval(interval1);
}

$(function() {
	imgWidth = $(".img0").width();
	imgHeight = $(".img0").height();
	// slide loading in array
	$(".slide").each(function () {
		slideCount++;
		$(this).css("display", "none");
		//slideArray[slideCount] = $(this);
		slideArray[$(this).attr('id')] = $(this);
	});
	keys = Object.keys(slideArray);
	$(document).keyup(handleKeyup);

	// video url in array
	$(".video").each(function () {
		videoCount++;
		//videoArray[videoCount]=$(this).find("iframe")[0].src;
		videoArray[$(this).attr('id')]=$(this).find("iframe")[0].src;
		$(this).find("iframe")[0].src = null;
	});

	positionSlide(currentSlide);
	let t1 = getTime();
	interval1 = setInterval(runDiapo, t1);
	
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

