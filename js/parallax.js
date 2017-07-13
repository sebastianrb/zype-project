(function() {
    "use strict";

    function initializeParallax() {
        var scrollOffset = 400;
        var parallaxSpeed = 0.18;
        var initialOffset = 20;
        var factor = parallaxSpeed * scrollOffset;
        var parallaxContainers = Array.from(document.querySelectorAll(".parallax-container"));
        var parallaxBackgrounds = Array.from(document.querySelectorAll(".parallax-background"));
        //set initial top offsets
        parallaxBackgrounds.forEach( function(element, index) {
            // element.style.top = (-scrollOffset * parallaxSpeed) + "px";
            // element.style.top = factor + "px";
            // element.style.top = -initialOffset + "px";
        });


        window.addEventListener("scroll", parallax)

        function parallax(event){

            var scrolled = $(window).scrollTop();

            //don't start parallax movement until user has scrolled to div
            var offsetObject = makeSectionOffsetObject(parallaxContainers);
            // console.log(offsetObject);

            for(var i = 0; i < parallaxContainers.length; i++) {
                if( offsetObject[i] - scrolled < scrollOffset && offsetObject[i] - scrolled > -200) {
                    // $(parallaxContainers[i]).find(".parallax-background").css('top',((scrolled - $(parallaxContainers[i]).offset().top)*parallaxSpeed)+'px');
                    $(parallaxContainers[i]).find(".parallax-background").css('top', (($(parallaxContainers[i]).offset().top - scrolled) * parallaxSpeed) - factor +'px');
                }
            }
        }


        //helper functions
        function makeSectionOffsetObject(sections) {
            var offsetObject = {};
            sections.forEach( function(element, index) {
                offsetObject[index] = $(element).offset().top;
            });
            return offsetObject;
        }
    }

    window.initializeParallax = initializeParallax;

})();


//basic code
// $(window).scroll(function(e){
//   parallax();
// });

// var scrolled = $(window).scrollTop();

// $('.parallax-background').css('top',-(scrolled*parallaxSpeed)+'px');
