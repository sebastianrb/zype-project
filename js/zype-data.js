(function() {
    $(document).ready(function() {
        var url = "https://api.zype.com/videos/?api_key=H7CF2IHbEc6QIrMVwb2zfd9VI14HHGAfYax1eHEUsJ4voYuqWF2oWvByUOhERva_";
        var ajaxList = document.querySelector(".ajax-target-list");
        var parallaxBackgrounds = Array.from(document.querySelectorAll(".parallax-background"));
        var parallaxBackgroundImages = Array.from(document.querySelectorAll(".parallax-background img"));
        var captions = Array.from(document.querySelectorAll(".parallax-foreground__caption"));

        //ajax call
        $.getJSON(url)

        .done(function(data) {
            var videoArray = data.response;
            var videoThumbnails = [];
            var videoTitles = [];

            //get video thumbnails and titles
            for(var i = 0; i < videoArray.length; i++) {
                videoTitles.push(videoArray[i].title);
                videoThumbnails.push(videoArray[i].thumbnails[3].url);
            }

            console.log(videoThumbnails);

            //populate titles and thumbnail href attributes
            parallaxBackgroundImages.forEach( function(element, index) {
                element.setAttribute("src", videoThumbnails[index]);
            });

            captions.forEach( function(element, index) {
                element.textContent = videoTitles[index];
            });

            //remove loading tiles
        })

        .fail(function() {
          console.log("Fail!");
        });
    });

})();
