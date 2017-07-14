(function() {

    var url = "https://api.zype.com/videos/?api_key=H7CF2IHbEc6QIrMVwb2zfd9VI14HHGAfYax1eHEUsJ4voYuqWF2oWvByUOhERva_";
    var ajaxList = document.querySelector(".ajax-target-list");
    var parallaxBackgrounds = Array.from(document.querySelectorAll(".parallax-background"));
    var parallaxBackgroundImages = Array.from(document.querySelectorAll(".parallax-background img"));
    var videoList = document.querySelector(".main-content__video-list");
    var loader = document.querySelector(".loading-placeholder");

    //ajax call
    $.getJSON(url)

    .done(function(data) {
        var videoArray = data.response;
        console.log(videoArray);
        var videoThumbnails = [];
        var videoTitles = [];

        //get video thumbnails and titles
        for(var i = 0; i < videoArray.length; i++) {
            var title = videoArray[i].title;
            var url = (i !== 1 ? videoArray[i].thumbnails[4].url : "./dest/images/placeholder-image.jpg");

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
                    <button class="main-content__video-info-button">Go To Video</button>
                </li>
            `;

            //inject list items into DOM with relevant data
            loader.remove();
            videoList.innerHTML += listItem;

            //initialize parallax
            window.initializeParallax();
        }


        //remove loading tiles
    })

    .fail(function() {
      console.log("Fail!");
    });

})();
