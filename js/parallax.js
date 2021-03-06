(function() {

    "use strict";

    function initializeParallax() {
        //initialize variables
        var scrollOffset = 400;
        var parallaxUntil = 220;
        var parallaxSpeed = 0.18;
        var factor = parallaxSpeed * scrollOffset;
        var parallaxContainers = Array.from(document.querySelectorAll(".parallax-container"));
        var parallaxBackgrounds = Array.from(document.querySelectorAll(".parallax-background"));
        var topButton = document.querySelector(".top-button");
        var topButtonOffset = 200;

        //trigger parallax effect handler on page scroll
        window.addEventListener("scroll", parallax);

        function parallax(event) {

            //get page scroll amount
            var scrolled = $(window).scrollTop();

            //get top offsets of each video
            var offsetObject = makeSectionOffsetObject(parallaxContainers);

            //apply parallax effect to relevant video on page scroll
            //don't start parallax movement until user has scrolled to a specific video
            for(var i = 0; i < parallaxContainers.length; i++) {
                if( offsetObject[i] - scrolled < scrollOffset && offsetObject[i] - scrolled > -parallaxUntil) {
                    $(parallaxContainers[i]).find(".parallax-background").css('top', (($(parallaxContainers[i]).offset().top - scrolled) * parallaxSpeed) - factor +'px');
                }
            }

            //show top button only at some scroll heights
            if(scrolled > topButtonOffset) {
                topButton.classList.add("shown");
            } else {
                topButton.classList.remove("shown");
            }

            //if user is at top of page, reset video top offsets to control for small discrepancies
            if(scrolled === 0) {
                resetTops();
            }
        }

        //event handler for top button
        topButton.addEventListener("click", function(event) {
            $("html, body").stop(true, false).animate({ scrollTop: 0 }, 500, function() {
                resetTops();
            });
        });

        //helper functions
        //get video top offsets into an object so we know which videos should exhibit parallax effects
        function makeSectionOffsetObject(sections) {
            var offsetObject = {};
            sections.forEach( function(element, index) {
                offsetObject[index] = $(element).offset().top;
            });
            return offsetObject;
        }

        function resetTops() {
            parallaxBackgrounds.forEach( function(element, index) {
                $(element).css("top", "-1px");
            });
        }
    }

    //expose parallax initialization function to rest of application
    window.initializeParallax = initializeParallax;

})();
