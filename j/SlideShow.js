
/**************
Author: Joel Fiser
Original Date 4/15/2014; 
- Updated with touch interface (hammer.js) 7/2/2014
- Updated with keyboard arrow handling (ESC to exit) 7/28/2014
- Updated with fade in / out (12/10/2014). Can now do either a fade, or slide. Just add this to the JSON file:
"swipeType":"fade", 
as one of the settings at the top. Default is slide.
- Updated (12/20/2014) with ability to add an icon beside the pageCount (using this to 
show a grid - but could be anything). set "iconBesidePagecount" in the JSON file to the url of the image / svg.
- Added ability to set number of images loaded at page load. The rest will load when user clicks / swipes to
see next / prev image. Set "numImagesToLoadAtStart" in JSON file.


- This touch-enabled slideShow component is designed to enable quick and easy creation of a slideShow (aka carousel) by simply creating a list of the images intended for the slideShow and their captions. The component handles how the images are displayed wihin the available viewport. You can specify:
- bestfit - the enitre image must fit inside the viewport filling either width or height.
- fillview - the entire viewport is filled. Cropping will occur in the way that crops least of the image. You can specify how to crop the image top-left, bottom-right, etc
- cinematic - fill the width of the viewport. Cropping willl occur as necessary. You can specify how to crop the image top-left, bottom-right, etc.
- Responsiveness is built in for any size.
- This slideShow will work using mouse, keyboard arrows and touch interface

HOW TO:
-------
You need the following files:
<script src="./js/jquery-1.10.2.js"></script>  or latest
<script src="./js/Tweenlite.min.js"></script>
<script src="./js/CSSPlugin.min.js"></script>
<script src="./js/EasePack.min.js"></script>
<script src="./js/jquery.visible.min.js"></script>  
<script src="./js/SlideShow.js"></script>
<script src="./js/hammer.min.js"></script>    

<link rel="stylesheet" href="./css/slideShow.css" type="text/css" media="screen" />

One JSON file for each slideshow

Usage:
1. Invoke a slideShow by adding this script to a DIV. 
<div id="slideShow1Div"> or if using one of the pre-made styling classes
<div id="carousel2Div" class="inlineSlideShow">
    <script>var slideShow1 = new SlideShow("slideShow1Div", "./data/slideShow1Data.json");</script>
</div>
2. id for DIV can be anything
3. You must use the id of the DIV (in this case "slideShow1Div") as the 1st param to the SlideShow constructor
4. The 2nd param must be the JSON (or any text file) file containing the list of images and descriptions, etc

Notes:
------
>>If using the slideShow in a modal and therefore the parent is display:none - until it's time to display the modal, you should force the browser
to resize when you click the btn to open the modal. This is because when you use display:none - the heights and widths are not correct when the images load and call the sizeImage() function:
window.dispatchEvent(new Event('resize'));
calling the parents window resize function won't call the resize function for the slideShow in the 
iframe. So we have to force the resize by making the window itself trigger a resize event

>>If slideshow is in a modal, you should explicitly set focus to make the keyboard arrows work:
$("#slideShow1Div").focus();

>>Since the slideShow is 100% width and height, it relies on the parent container to determine its size.
When there's a navBar with a height (say 64px), and we're using a modal ot display the slideShow, 
we need the container to accurately reflect the height of the
remaining space (height-64) rather than making the conatiner for example: 94% or something lke that.
Here's how you should resize the container on window resize:
$("#slideShow-modal").height($(window).height() - 64); // 64px is height of navBar
$("#africa-modal").height($(window).height() - 64);

>>IMPORTANT - To modify this code - only use the unique ids when styling / moving, etc elements. If you use a class, and you have more than one slideShow on the page - you'll get very strange results.
***************/


function SlideShow(_myParentId, _imagesJsonUrl){
    this.SMALL_SCREEN = 720;
    this.slideArr = [];
	this.myParent = document.getElementById(_myParentId);
	this.myParentId = _myParentId;
	this.addSlideShowHolder();
	this.getImageData(_imagesJsonUrl);
	this.curIndx = 0;
	var self = this;
    this.setKeyPress();
	window.addEventListener('resize', function(){self.arrowResize(self);});
	window.addEventListener('resize', function(){self.windowResize(self);});
	//window.addEventListener('resize', this.windowResize);
	$(window).on('orientationchange', function(){self.arrowResize(self);});
	$(window).load(function(){self.arrowResize(self);});
}
SlideShow.prototype.windowResize = function(_this){
    //console.log("this.SMALL_SCREEN: " + this.SMALL_SCREEN);
    if($(window).width() < this.SMALL_SCREEN){
        //console.log("thinks it's < SMALL_SCREEN: " + $(window).width());
        $("#" + _this.arrowLeftId).attr('src', 
                this.leftArrowUrl_mobile == undefined ? this.leftArrowUrl : this.leftArrowUrl_mobile);
        $("#" + _this.arrowRightId).attr('src', 
                this.rightArrowUrl_mobile == undefined ? this.rightArrowUrl : this.rightArrowUrl_mobile);
    }
    else{
        $("#" + _this.arrowLeftId).attr('src', _this.leftArrowUrl);
        $("#" + _this.arrowRightId).attr('src', _this.rightArrowUrl);
    }
    
    //$("#" + this.myParentId).css("height", "755px");
}

SlideShow.prototype.setKeyPress = function(){
    var self = this;

    var el = this.myParent;

    $(document).keydown(function(evt){  
    	
    	if (! isElementInViewport(el)) {
    		return;
    	}
    	
    	$(el).focus(); 
		
		switch(evt.keyCode){
            case 37:  // left
                if(self.swipeType === "slide-strip"){
                    //if(self.curIndx > 0){
                        self.leftArrowClickSlideStrip();
                    /*}
                    else{
                        if(self.slideArr[0].subImageShowing){
                            self.slideArr[0].prevSubImage();
                        }
                        else
                        if(!self.slideArr[0].overlayShowing){
                            self.slideArr[0].slideRightSubImage();
                            self.slideArr[0].tweenToFullBleed();
                        }
                    }*/
                }
                else
                if(self.swipeType === "fade"){
                    self.setPrevSlide(self);
                    self.prevSlideFade(self);
                }
                else{
                    self.setPrevSlide(self);
                    self.prevSlide(self);
                }
            	self.arrowResize(self);
                break;
            case 39:  // right
                if(self.swipeType === "slide-strip"){
                    if(self.curIndx == self.slideArr.length-1){
                        self.lastSlideClickNext();
                    }
                    else
                    if(self.slideArr[self.curIndx].overlayShowing){
                        self.slideArr[self.curIndx].nextOverlay();
                    }
                    else
                    if(self.slideArr[self.curIndx].subImageShowing){
                        self.slideArr[self.curIndx].nextSubImage();
                    }
                    else    
                    if(self.curIndx < self.slideArr.length-1){
                        self.curIndx++;
                        self.nextSlideStrip(true);
                    }
                }
                else
                if(self.swipeType === "fade"){
                    self.setNextSlide(self);
                    self.nextSlideFade(self);
                }
                else{
                    self.setNextSlide(self);
                    self.nextSlide(self);
                }
            	self.arrowResize(self);
                break;
            case 27:  // escape
                $(".modal-holder").css("display", "none");
                break;
            case 40:  // down
                break;   
            default: break;
        }
    });
}
SlideShow.prototype.arrowResize = function(_this){
    var self = this; 
    try {
	    if(this.stackImageArrowsText != undefined){
			// stackImageArrowsText is set from the JSON file
			if($(window).width() <= this.stackImageArrowsText){
				$('#' + this.arrowHolderId).css("margin-top", ($(this.slideArr[self.curIndx].img).height() + 30) + "px");
			}
			else{
				img_h = $(this.slideArr[self.curIndx].img).height()/2;
				arrow_h = $('#' + this.arrowHolderId).height()/2;
				$('#' + this.arrowHolderId).css("margin-top", (img_h - arrow_h) + "px");
			}
		}
		 
	    $('#' + this.captionBarHolderId).css("margin-top", ($(this.slideArr[self.curIndx].img).height() + 30) + "px");
	    $('#' + this.myParentId).css("height", ($(this.slideArr[self.curIndx].img).height() + $('#' + this.captionBarHolderId).height() +  parseInt(this.captionBarOffset_h)) + "px");
    } catch(err) {}
    
}
SlideShow.prototype.getImageData = function(_imagesJsonUrl){
	var self = this;
	var slide, numToLoad;
    //console.log("_imagesJsonUrl", _imagesJsonUrl);
	$.getJSON(_imagesJsonUrl, function(_dataObj){
						//console.log("_data", _dataObj);
						self.imageArr = _dataObj.imageArr;
						self.leftArrowUrl = _dataObj.leftArrowUrl;
						self.rightArrowUrl = _dataObj.rightArrowUrl;
                        self.leftArrowUrl_mobile = _dataObj.leftArrowUrl_mobile;
						self.rightArrowUrl_mobile = _dataObj.rightArrowUrl_mobile;
                        self.iconBesidePagecount = _dataObj.iconBesidePagecount
                        self.captionBarOffset_h = _dataObj.captionBarOffset_h
						self.displayMethod = _dataObj.displayMethod;
						self.showCloseBtn = _dataObj.showCloseBtn;
						//self.moveArrowsOnResize = _dataObj.moveArrowsOnResize;
						self.keepCaptionUnderImage = _dataObj.keepCaptionUnderImage;
						self.stackImageArrowsText = _dataObj.stackImageArrowsText;
						self.topZindex = self.imageArr.length; // so we can shuffle the slides
						self.hasCoverSlide = false;
						self.coverSlideShowing = false;
                        self.swipeType = _dataObj.swipeType;
                        self.numImagesToLoadAtStart = (_dataObj.numImagesToLoadAtStart == undefined 
                                                        ? 10000 : _dataObj.numImagesToLoadAtStart);
        
						//for(var i = 0; i < self.imageArr.length; i++){
                        if(self.numImagesToLoadAtStart < self.imageArr.length){
                            numToLoad = self.numImagesToLoadAtStart;
                            self.allImagesLoaded = false;
                        }
                        else{
                            numToLoad = self.imageArr.length;
                            self.allImagesLoaded = true;
                        }
						for(var i = 0; i < numToLoad; i++){
							slide = new Slide(self, self.imageArr[i], self.slidesHolderId, i);
							self.slideArr.push(slide);
							if(slide.slideType == "coverSlide"){
								self.hasCoverSlide = true;
								self.coverSlideShowing = true;
							}
						}
						
						
						self.addArrows(self.hasCoverSlide);
						self.captionBar = new CaptionBar(self, self.slideShowHolder, 
                                                self.imageArr.length, self.showCloseBtn, self.captionBarHolderId);
        
                        if(!self.hasCoverSlide){
							self.slideArr[0].showSlide();
                            self.captionBar.updateCaptionBar(0, self.slideArr[0].caption);
						}
        
					});
}
SlideShow.prototype.loadRestOfImages = function(){
    var slide;
    
    for(var i = this.numImagesToLoadAtStart; i < this.imageArr.length; i++){
        //console.log("loading rest of images: " + i);
        slide = new Slide(this, this.imageArr[i], this.slidesHolderId, i);
        this.slideArr.push(slide);
    }
    this.allImagesLoaded = true;
}
SlideShow.prototype.addSlideShowHolder = function(){
	// Create a random id - so it will be unique
	this.slideShowHolderId = "slideShowHolder_" + Math.floor(Math.random() * 100000);
	$(this.myParent).append('<div class="slideShowHolder" id="' + this.slideShowHolderId + '"></div>');
	
	this.slidesHolderId = "slidesHolder_" + Math.floor(Math.random() * 100000);
	$('#' + this.slideShowHolderId).append('<div class="slidesHolder" id="' + this.slidesHolderId + '"></div>');
	
	this.arrowHolderId = "arrowHolder_" + Math.floor(Math.random() * 100000);
	$('#' + this.slideShowHolderId).append('<div class="arrowHolder" id="' + this.arrowHolderId + '"></div>');
    
    this.captionBarHolderId = "captionBarHolder_" + Math.floor(Math.random() * 100000);
	$('#' + this.slideShowHolderId).append('<div class="captionBarHolder" id="' + this.captionBarHolderId + '"></div>');
}
SlideShow.prototype.addArrows = function(_hasCoverSlide){
	this.arrowLeftId = "arrowLeft_" + Math.floor(Math.random() * 100000);
	//$('#' + this.arrowHolderId).append('<div class="arrowLeft" id="' + this.arrowLeftId + '"></div>');
	$('#' + this.arrowHolderId).append('<img class="arrowLeft" id="' + this.arrowLeftId 
                + '" src="' 
                + ($(window).width() < this.SMALL_SCREEN && this.leftArrowUrl_mobile != undefined 
                                    ? this.leftArrowUrl_mobile 
                                    : this.leftArrowUrl) 
                + '"/>');
	var self = this;
	$('#' + this.arrowLeftId).click(function(){
		
        self.setPrevSlide(self);
        if(self.swipeType === "fade"){
            self.prevSlideFade(self);
        }
        else{
            self.prevSlide(self);
        }
        self.arrowResize(self);
    });
	$('#' + this.arrowLeftId).load(function(){self.arrowResize(self);});
	
	if(_hasCoverSlide){
		$('#' + this.arrowLeftId).hide();
	}
	
	this.arrowRightId = "arrowRight_" + Math.floor(Math.random() * 100000);
	//$('#' + this.arrowHolderId).append('<div class="arrowRight" id="' + this.arrowRightId + '"></div>');
	$('#' + this.arrowHolderId).append('<img class="arrowRight" id="' + this.arrowRightId 
                + '" src="' 
                + ($(window).width() < this.SMALL_SCREEN && this.rightArrowUrl_mobile != undefined 
                                    ? this.rightArrowUrl_mobile 
                                    : this.rightArrowUrl)
                + '"/>');
	$('#' + this.arrowRightId).click(function(){
        self.setNextSlide(self);
        if(self.swipeType === "fade"){
            self.nextSlideFade(self);
        }
        else{
            self.nextSlide(self);
        }
        self.arrowResize(self);
    });
	$('#' + this.arrowRightId).load(function(){self.arrowResize(self);});
}
SlideShow.prototype.showArrows = function(){
	$('#' + this.arrowRightId).show();
	$('#' + this.arrowLeftId).show();
}
SlideShow.prototype.checkCoverSlide = function(){
	if(this.coverSlideShowing){
		this.coverSlideShowing = false;
		this.slideArr[1].showSlide();
		this.slideArr[0].coverSlideClick();
		this.showArrows();
		this.curIndx = 1;
		return(true);
	}
	return(false);
}
SlideShow.prototype.deepLinkToSlide = function(_indx){
	this.topZindex++;
    this.curIndx = _indx;
    $(this.slideArr[this.curIndx].slideHolder).css("zIndex", this.topZindex);
    for(var i = 0; i < this.slideArr.length; i++){
        this.slideArr[i].hideSlide();
    }
    this.slideArr[this.curIndx].showSlide();
}
SlideShow.prototype.setNextSlide = function(_this){
    if(this.checkCoverSlide()){
		return;
	}

	this.topZindex++;
    this.topSlideHolder = this.slideArr[this.curIndx].slideHolder;
    $(this.topSlideHolder).css("zIndex", this.topZindex);
    
	var newIndx; // don't set curIndx yet - we haven't actually slide yet 
    if(this.curIndx >= this.slideArr.length-1){
		newIndx = 0;
	}
	else{
		newIndx = this.curIndx + 1;
	}
    
    this.newSlide = this.slideArr[newIndx];
    this.newSlideHolder = this.slideArr[newIndx].slideHolder;
    $(this.newSlide.slideHolder).css("zIndex", this.topZindex-1);
    this.newSlide.showSlide();
    this.captionBar.hideCaptionBar();
    if(!this.allImagesLoaded){
        this.loadRestOfImages();
    }
}
SlideShow.prototype.nextSlide = function(_this){
	//console.log("nextSlide: %o", this.topSlideHolder);
    TweenLite.to(this.topSlideHolder, .7, {left:"-200%", ease:Expo.easeOut});
    //TweenLite.to(this.newSlideHolder, .7, {opacity:1});
    // Now set curIndx - because we're changing slides
    if(this.curIndx >= this.slideArr.length-1){
		this.curIndx = 0;
	}
	else{
		this.curIndx++;
	}
    this.captionBar.updateCaptionBar(this.curIndx, this.slideArr[this.curIndx].caption);
}
SlideShow.prototype.nextSlideFade = function(_this){
	//console.log("nextSlide: %o", this.topSlideHolder);
    TweenLite.to(this.topSlideHolder, .7, {opacity:0, ease:Expo.easeOut});
    //TweenLite.to(this.newSlideHolder, .7, {opacity:1});
    // Now set curIndx - because we're changing slides
    if(this.curIndx >= this.slideArr.length-1){
		this.curIndx = 0;
	}
	else{
		this.curIndx++;
	}
    this.captionBar.updateCaptionBar(this.curIndx, this.slideArr[this.curIndx].caption);
}
SlideShow.prototype.setPrevSlide = function(_this){
	if(this.checkCoverSlide()){
		return;
	}
    
	this.topZindex++;
    this.topSlideHolder = this.slideArr[this.curIndx].slideHolder;
    $(this.topSlideHolder).css("zIndex", this.topZindex);
    
	var newIndx; // don't set curIndx yet - we haven't actually slid yet 
    if(this.curIndx == 0){
		newIndx = this.slideArr.length-1;
	}
	else{
        newIndx =  this.curIndx -1;
	}
    
    this.newSlide = this.slideArr[newIndx];
    this.newSlideHolder = this.slideArr[newIndx].slideHolder;
    $(this.newSlide.slideHolder).css("zIndex", this.topZindex-1);
    this.newSlide.showSlide();
    this.captionBar.hideCaptionBar();
    if(!this.allImagesLoaded){
        this.loadRestOfImages();
    }
}
SlideShow.prototype.prevSlide = function(_this){
	TweenLite.to(this.topSlideHolder, .7, {left:"100%", ease:Expo.easeOut});
    //TweenLite.to(this.newSlideHolder, .7, {opacity:1});
    // Now set curIndx - because we're changing slides
    if(this.curIndx == 0){
		this.curIndx = this.slideArr.length-1;
	}
	else{
		this.curIndx--;
	}
    this.captionBar.updateCaptionBar(this.curIndx, this.slideArr[this.curIndx].caption);
}
SlideShow.prototype.prevSlideFade = function(_this){
	TweenLite.to(this.topSlideHolder, .7, {opacity:0, ease:Expo.easeOut});
    //TweenLite.to(this.newSlideHolder, .7, {opacity:1});
    // Now set curIndx - because we're changing slides
    if(this.curIndx == 0){
		this.curIndx = this.slideArr.length-1;
	}
	else{
		this.curIndx--;
	}
    this.captionBar.updateCaptionBar(this.curIndx, this.slideArr[this.curIndx].caption);
}
/****************** Slide Object ***********************/
													
function Slide(_slideShow, _slideObj, _appendToId, _indx){
	this.slideShow = _slideShow;
	this.numSlides = _slideShow.imageArr.length;
	this.displayMethod = _slideObj.displayMethod == undefined 
                            ? _slideShow.displayMethod.toLowerCase() 
                            : _slideObj.displayMethod.toLowerCase();
	this.imagerUrl = this.chooseImage(_slideObj);
	this.alt = _slideObj.alt;
	this.caption = _slideObj.caption;
	this.crop = _slideObj.crop.toLowerCase();
	this.slideType = _slideObj.slideType;
	this.slideId = "slide_" + Math.floor(Math.random() * 100000);    
	$('#' + _appendToId).append('<div class="slideHolder" id="' + this.slideId + '"></div>');
	this.slideHolder = document.getElementById(this.slideId);
    
	
	this.imageId = "image_" + Math.floor(Math.random() * 100000);
	$(this.slideHolder).append('<div class="imageHolder" id="' + this.imageId + '"></div>');
	this.imageHolder = document.getElementById(this.imageId);
	
    if(_slideShow.swipeType === "fade"){
        this.setSwipeFade(this.slideHolder);
    }
    else{
        this.setSwipeSlide(this.slideHolder);
    }
    
	if(_indx != 0){ // 0 is the index of the coverSlide
		$(this.slideHolder).css("visibility", "hidden");
	}
	
	this.loadImage();
	if(this.slideType != "coverSlide"){ // no captionBar for coverSlides
		/*this.captionBar = new CaptionBar(this.slideShow, this.slideHolder, 
                                        this.caption, _indx, this.numSlides, 
                                        _slideShow.showCloseBtn, this.img, 
                                        _slideShow.keepCaptionUnderImage);*/
		//window.addEventListener('resize', function(){self.captionBar.resize();});
		//$(window).on('orientationchange', function(){self.captionBar.resize();});
	}
	else{
		this.setCoverSlide(_slideObj);
	}
	var self = this;
	window.addEventListener('resize', function(){self.sizeImage();});
	$(window).on('orientationchange', function(){self.sizeImage();});
	
	//window.addEventListener('resize', function(){self.captionBar.resize();});
	//$(window).on('orientationchange', function(){self.captionBar.resize();});
	//$(window).load(function(){self.captionBar.resize();});
}
// We have two types of switching out images - sliding or fading
Slide.prototype.setSwipeFade = function(_slideHolder){
    //var el = document.getElementById(this.slideId);
    var slideShow = this.slideShow;
    var cur_x = 0;
    var $slideHolder = $("#" + this.slideId);
    var curDirection;
    //var curpos = $slideHolder.position().left;
    this.swipeHandler = Hammer(_slideHolder, {});
    //this.swipeHandler.on("swipeleft swiperight dragright dragleft dragstart dragend", function(evt){
    this.swipeHandler.on("swipeleft swiperight", function(evt){
        evt.preventDefault();
        // So we don't process mouseEvents here.
        if(evt.gesture == undefined){
           return;
        }
        switch(evt.type){
            case "swipeleft":
                //console.log("swipeleft");
                slideShow.setNextSlide(slideShow);
                slideShow.nextSlideFade(slideShow);
                break;
            //case "dragright":
            case "swiperight":
                //console.log("swiperight");
                slideShow.setPrevSlide(slideShow);
                slideShow.prevSlideFade(slideShow);
                break;
            }
        });
   
}
// We have two types of switching out images - sliding or fading
Slide.prototype.setSwipeSlide = function(_slideHolder){
    //var el = document.getElementById(this.slideId);
    var slideShow = this.slideShow;
    var cur_x = 0;
    var $slideHolder = $("#" + this.slideId);
    var wasSwiped = false;
    var curDirection;
    //var curpos = $slideHolder.position().left;
    //this.swipeHandler = Hammer(_slideHolder, {
    this.swipeHandler = Hammer(this.imageHolder, {
                    dragLockToAxis: true,
                    dragBlockHorizontal: true
        
                });
    this.swipeHandler.on("swipeleft swiperight dragright dragleft dragstart dragend", function(evt){
        evt.preventDefault();
        // So we don't process mouseEvents here.
        if(evt.gesture == undefined){
           return;
        }
        switch(evt.type){
            case "swipeleft":
                // console.log("swipeleft");
                slideShow.nextSlide(slideShow);
                wasSwiped = true;
                break;
            //case "dragright":
            case "swiperight":
                // console.log("swiperight");
                slideShow.prevSlide(slideShow);
                wasSwiped = true;
                break;
            case "dragstart":
                //console.log("dragstart");
                cur_x = $slideHolder.position().left;
                //console.log("evt: %o", evt);
                if(evt.gesture.direction == "left"){
                    slideShow.setNextSlide(slideShow);
                }
                else{
                    slideShow.setPrevSlide(slideShow);
                }
                break;
            case "dragend":
                //console.log("dragend");
                if(wasSwiped){
                    wasSwiped = false;
                    return;
                };
                cur_x = $slideHolder.position().left;
                if(cur_x > $slideHolder.width() / 4){
                    slideShow.setPrevSlide(slideShow);
                    slideShow.prevSlide(slideShow);
                }
                else // divide by 2 to account for the margin-right
                if(cur_x/2 < $slideHolder.width() / -4){
                    slideShow.setNextSlide(slideShow);
                    slideShow.nextSlide(slideShow);
                }
                else{ // put the slide back where it was (no change)
                    //TweenLite.to(_slideHolder, 1.3,  {css:{left:0, ease:Expo.easeIn}});
                    TweenLite.to(_slideHolder, .3,  {left:0});
                }
                break;
            case "dragright":
                //TweenLite.killTweensOf(_slideHolder);
                if(curDirection != "right"){
                    curDirection = "right";
                    slideShow.setPrevSlide(slideShow);
                };
                $slideHolder.css("left", (cur_x + evt.gesture.deltaX) + "px");
                //console.log("deltaX: " + evt.gesture.deltaX);
                break;
            case "dragleft":
                //TweenLite.killTweensOf(_slideHolder);
                //console.log("cur_x+delta: " + (cur_x + evt.gesture.deltaX));
                if(curDirection != "left"){
                    curDirection = "left";
                    slideShow.setNextSlide(slideShow);
                };
                // multiply by 2 to account for margin-right
                $slideHolder.css("left", (cur_x + evt.gesture.deltaX*2) + "px");
                break;
            }
        });
   
}
Slide.prototype.chooseImage = function(_slideObj){
	if(navigator.userAgent.match(/(iPad)/g) && _slideObj.imageUrl_ipad != undefined && $(window).height() > $(window).width()){
		return(_slideObj.imageUrl_ipad);
	}
	else
	if(navigator.userAgent.match(/(iPhone)/g) && _slideObj.imageUrl_iphone != undefined && $(window).height() > $(window).width()){
		return(_slideObj.imageUrl_iphone);
	}
	else	
	if($(window).width() <= 640){
		return(_slideObj.imageUrl_640);
	}
	else
	if($(window).width() <= 1536){
		return(_slideObj.imageUrl_1536);
	}
	else{
		return(_slideObj.imageUrl_2048);
	}
}
Slide.prototype.putToBtm = function(){
	$(this.slideHolder).css("zIndex", -1); // make sure coverSlide is on btm so elems below can be clicked
}
Slide.prototype.coverSlideClick = function(){
	var self = this;
	TweenLite.to($(this.slideHolder), 1,  {css:{opacity:0}, onComplete:function(){self.putToBtm();}});
	//TweenLite.to($(this.slideHolder), 1,  {css:{opacity:0}});
}
Slide.prototype.setCoverSlide = function(_coverSlideObj){
	$(this.slideHolder).css("zIndex", 1000); // make sure coverSlide is on top
	
	this.coverSlideDivId = "coverSlideDiv_" + Math.floor(Math.random() * 100000);
	$(this.slideHolder).append('<div class="coverSlideDiv" id=' + this.coverSlideDivId + '></div>');
	
	this.coverSlideHedId = "coverSlideHedId_" + Math.floor(Math.random() * 100000);
	$('#' + this.coverSlideDivId).append('<p class="coverHed" id="' + this.coverSlideHedId  +  '">' + _coverSlideObj.hed + '</p>');
	//$('#' + this.coverSlideHedId).fitText(1.26, { minFontSize: '50px', maxFontSize: '100px' });
	
	this.coverSlideDekId = "coverSlideDekId_" + Math.floor(Math.random() * 100000);
	$('#' + this.coverSlideDivId).append('<p class="coverDek" id="' +  this.coverSlideDekId +  '">' + _coverSlideObj.dek + '</p>');
	//$('#' + this.coverSlideDekId).fitText(1.8, { minFontSize: '20px', maxFontSize: '40px' });
	
	//this.coverSlideCredsId = "coverSlideCredsId_" + Math.floor(Math.random() * 100000);
	$('#' + this.coverSlideDivId).append('<p class="coverCredits" id="' + this.coverSlideCredsId  + '">' + _coverSlideObj.credits + '</p>');
	//$('#' + this.coverSlideCredsId).fitText(4.2, { minFontSize: '13px', maxFontSize: '16px' });
}
Slide.prototype.loadImage = function(){
	this.img = new Image();
	var self = this;
	this.img.onload = function(){  
		self.aspectRatio = this.naturalWidth / this.naturalHeight;
		self.sizeImage();
		if(self.captionBar != undefined){
			self.captionBar.resize();
		}
	};
	this.img.src = this.imagerUrl;
	this.img.alt = this.alt;
	
	//if(this.displayMethod == "cinematic" || this.displayMethod == "fillview"){
		this.setCrop(this.crop);
	//}
	//else{
		//$(this.img).addClass('centered');
	//}
	
	$(this.img).addClass('slideImage');
	this.imageHolder.appendChild(this.img);
}
Slide.prototype.sizeImage = function(){
    var imgWidthToHeightRatio = this.img.naturalWidth / this.img.naturalHeight;
	var viewWidthToHeightRatio = $(this.imageHolder).width() / $(this.imageHolder).height();
    
	if(this.displayMethod == "cinematic"){
		$(this.img).width("100%");
		$(this.img).height($(this.img).width() * (1/this.aspectRatio));
		if(this.crop == "keep-centered-crop-top"){
			if($(this.img).height() < $(this.imageHolder).height()){
				$(this.img).removeClass('keep-centered-crop-top');
				this.setCrop("keep-centered-crop-btm");
			}
			else{
				$(this.img).removeClass('keep-centered-crop-btm');
				this.setCrop("keep-centered-crop-top");
			}
		}
		else{
			;
		}
	}
	else
	if(this.displayMethod == "bestfit"){
        if(imgWidthToHeightRatio > viewWidthToHeightRatio){
            $(this.img).width("100%");
            $(this.img).height("auto");
		}
		else{
            $(this.img).height("100%");
			$(this.img).width(($(this.img).height() * this.aspectRatio) + "px");
		}
	}
	else
	if(this.displayMethod == "fillview"){
		if(imgWidthToHeightRatio < viewWidthToHeightRatio){
			$(this.img).width("100%");
			$(this.img).height("auto");
		}
		else{
			$(this.img).height("100%");
			$(this.img).width(($(this.img).height() * this.aspectRatio) + "px");
		}
	}
}
Slide.prototype.hideSlide = function(_topZindex){
	$(this.slideHolder).css("visibility", "hidden");
}
Slide.prototype.showSlide = function(_topZindex){
    TweenLite.killTweensOf(this.slideHolder);
    $(this.slideHolder).show()
	$(this.slideHolder).css("opacity", 1);
	$(this.slideHolder).css("visibility", "visible");
    
	$(this.slideHolder).css("left", "0px");
}

Slide.prototype.setCrop = function(_crop){
	switch(_crop){
		case "keep-centered-crop-top": $(this.img).addClass('keep-centered-crop-top');
			break;
		case "keep-centered-crop-btm": $(this.img).addClass('keep-centered-crop-btm');
			break;
		case "keep-centered-crop-left": $(this.img).addClass('keep-centered-crop-left');
			break;
		case "keep-centered-crop-right": $(this.img).addClass('keep-centered-crop-right');
			break;
		case "crop-left-top": $(this.img).addClass('crop-left-top');
			break;
		case "crop-left-btm": $(this.img).addClass('crop-left-btm');
			break;
		case "crop-right-top": $(this.img).addClass('crop-right-top');
			break;
		case "crop-right-btm": $(this.img).addClass('crop-right-btm');
			break;
		default: $(this.img).addClass('centered');
			break;
	}
}

/***************** CAPTION BAR Object ******************/

function CaptionBar(_slideShow, _slideShowHolder, _numSlides, _showCloseBtn, _captionBarHolderId){
	this.slideShow = _slideShow;
	this.slideShowHolder = _slideShowHolder;
	this.numSlides = _numSlides;
	this.showCloseBtn = _showCloseBtn;
	this.captionBarHolderId = _captionBarHolderId;
    
	this.addPageCount(0, _numSlides);
	this.addCaptionText(_slideShowHolder);
	if(_showCloseBtn != "false"){
		this.addOpenCloseBtns(_slideShowHolder);
	}
}
CaptionBar.prototype.hideCaptionBar = function(){
    $("#" + this.captionBarHolderId).hide();
}
CaptionBar.prototype.updateCaptionBar = function(_curIndx, _caption){
    $("#" + this.captionBarHolderId).show();
    $("#" + this.pageCountId).html((_curIndx+1) + "/" + this.numSlides);
    $("#" + this.captionTextId).html(_caption);
}
CaptionBar.prototype.addCaptionText = function(_slideShowHolder){
	this.captionTextId = "captionText_" + Math.floor(Math.random() * 100000);
	$('#' + this.captionBarHolderId).append('<p class="captionText" id="' +  this.captionTextId + '">' + "testoid" + '</p>');
	
	//$('#' + this.captionTextId).fitText(4.2, { minFontSize: '13px', maxFontSize: '17px' });
	this.resize();
}
CaptionBar.prototype.addPageCount = function(_indx, _numSlides){
	this.pageCountId = "pageCount_" + Math.floor(Math.random() * 100000);
	if(!this.slideShow.hasCoverSlide){
		_indx++;
	}
	else{
		_numSlides--;
	}
	$('#' + this.captionBarHolderId).append(
        '<div class="pageCountHolder">'
            + '<p class="pageCount" id="' +  this.pageCountId + '">' + (_indx) + '/' + (_numSlides) + '</p>'
        + '</div>'
        );
}
CaptionBar.prototype.addOpenCloseBtns = function(_slideShowHolder){
	var self = this;
	// open Arrow
    this.openBtnId = "openBtn_" + Math.floor(Math.random() * 100000);
	var str = '<div class="openBtn" id="' +  this.openBtnId + '">'             
                + '<p class="openCloselabel">CAPTION</p>'
                + '<img class="captionArrow" src="./images/arrows/up.png"/>'
            + '</div>'
    $(_slideShowHolder).append(str); 
    $('#' + this.openBtnId).click(function(){self.openBtnClick(self);});
	$('#' + this.openBtnId).hide();
	// close Arrow
	this.closeBtnId = "closeBtn_" + Math.floor(Math.random() * 100000);
    $('#' + this.captionBarHolderId).append(
        '<div class="closeBtn" id="' +  this.closeBtnId + '">'                    
            + '<p class="openCloselabel">CLOSE</p>'
            + '<img class="captionArrow" src="./images/arrows/down.png"/>'
        + '</div>'
        );    
    
	//$('#' + this.captionBarHolderId).append('<img class="closeBtn" id="' +  this.closeBtnId + '" src="./images/arrows/down.png"/>');
	$('#' + this.closeBtnId).click(function(){self.closeBtnClick(self);});
}
CaptionBar.prototype.closeBtnClick = function(_this){
	var yLoc = $('#' + _this.captionBarHolderId).height() * -1;
	TweenLite.to($('#' + _this.captionBarHolderId), .3, {bottom: (yLoc + "px"), ease:Expo.easeOut, 
											onComplete:function(){$('#' + _this.openBtnId).show()}});
}
CaptionBar.prototype.openBtnClick = function(_this){
	$('#' + _this.openBtnId).hide();
	TweenLite.to($('#' + _this.captionBarHolderId), .3, {bottom:"0px", ease:Expo.easeOut});
}

CaptionBar.prototype.resize = function(){
    return;    
}
/************* COVER Slide *************/

function CoverSlide(_coverSlideObj, _attachToDiv){
	
}

/**************** VISIBLE **************/

function isElementInViewport (el) {

	try{
		var rect = el.getBoundingClientRect();
		
		return (
			rect.top + (rect.height / 2 )  >= 0 &&
			rect.bottom - (rect.height / 2 )  <= (window.innerHeight || document.documentElement.clientHeight)
		);
	} catch (err) {
	
		return false;
	
	}

}

