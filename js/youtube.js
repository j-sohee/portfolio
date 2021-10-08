$.ajax({
    url:"https://www.googleapis.com/youtube/v3/playlistItems",
    dataType : "jsonp",
    data : {
        part : "snippet",
        key : "AIzaSyAAMk0RKq2aVlltRyS8dlW_Hr1zw8_ouCs",
        maxResult : 6,
        playlistId : "PL_R5V_bKthTv_06V-xhGR6l0S-CvfmyNJ",
    }
})
.success(function(data){
    // console.log(data);

    let items = data.items;
    console.log(items);

    $(items).each(function(index,data){

        let txt = data.snippet.description;
        let len = txt.length;
        if( len >  150){
            txt = txt.substr(0, 150) + "...";
        }

        let date = data.snippet.publishedAt;
        date = date.split("T")[0];
        
        $(".vidGallery")
            .append(
                $("<article>")
                    .append(
                        $("<a>").attr({ href : data.snippet.resourceId.videoId })
                                .append(
                                    $("<img>").attr({ src : data.snippet.thumbnails.high.url })
                                 ),
                        $("<div class='con'>")
                                .append(
                                    $("<h2>").text(data.snippet.title),
                                    $("<p>").text(txt),
                                    $("<span>").text(date)
                                )
                    )
            )
    })
})
.error(function(err){
    console.error(err);
})