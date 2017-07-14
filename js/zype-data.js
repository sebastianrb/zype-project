(function() {

    "use strict";

    //initialize variables
    var apiURL = "https://api.zype.com/videos/?api_key=H7CF2IHbEc6QIrMVwb2zfd9VI14HHGAfYax1eHEUsJ4voYuqWF2oWvByUOhERva_";
    var ajaxList = document.querySelector(".ajax-target-list");
    var parallaxBackgrounds = Array.from(document.querySelectorAll(".parallax-background"));
    var parallaxBackgroundImages = Array.from(document.querySelectorAll(".parallax-background img"));
    var videoList = document.querySelector(".main-content__video-list");
    var loader = document.querySelector(".loading-placeholder");

    //ajax call
    $.getJSON(apiURL)

    .done(function(data) {
        //handle success scenario

        //store video array
        var videoArray = data.response;

        //get video thumbnails and titles, and construct HTML template
        for(var i = 0; i < videoArray.length; i++) {

            //titles and thumbnail URLs
            var title = videoArray[i].title;
            var url = (i !== 1 ? videoArray[i].thumbnails[4].url : "./dest/images/placeholder-image.jpg");

            //HTML template using template literal
            var listItem = `
                <li class='main-content__video'>
                    <div class="main-content__video-image-container">
                        <div class="parallax-container">
                            <div class="parallax-background">
                              <img src="${url}" alt="video-thumbnail">
                            </div>
                            <div class="parallax-foreground foreground-title">
                              <p class="parallax-foreground__caption">${title}</p>
                            </div>
                            <div class="parallax-foreground foreground-play">
                              <i class="fa fa-play" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                </li>
            `;

            //inject list items into DOM with relevant data
            loader.remove();
            videoList.innerHTML += listItem;

            //initialize parallax after DOM has been constructed
            window.initializeParallax();

        }

    })

    .fail(function() {
        //handle error scenario
        console.log("Failed to load data from the API.");
        videoList.innerHTML = `<p class="loading-error-message">Sorry, we were unable to load the video data. Please refresh the page to try again.</p>`;
    });

})();
