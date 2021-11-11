$.ajax({
    url:"https://www.googleapis.com/youtube/v3/playlistItems",
    dataType : "jsonp",
    data : {
        part : "snippet",
        key : "AIzaSyAAMk0RKq2aVlltRyS8dlW_Hr1zw8_ouCs",
        maxResults : 8,
        playlistId : "PL_R5V_bKthTtOskiIsA-w_VcyqRlaLdc0"
    }
})
.success(function(data){

    let items = data.items;
    console.log(items);


    $(items).each(function(index, data){

        let txt = data.snippet.description; //본문
        let tit = data.snippet.title; // 타이틀
        let len = txt.length;
        let titLen = tit.length;
        let date = data.snippet.publishedAt;
        date = date.split("T")[0];

        if( len >  70){
            txt = txt.substr(0, 80) + "...";
        }
        if( titLen > 50){
            tit = tit.substr(0, 50) + "...";
        }

        $("#vidGallery")
            .append(
                $("<article>")
                    .append(
                        $("<a>").attr({ href : data.snippet.resourceId.videoId})
                                .append(
                                    $("<img>").attr({ src : data.snippet.thumbnails.high.url })
                                 ),
                        $("<div class='btns'>")
                        .append(
                            $("<a>").attr({ href : data.snippet.resourceId.videoId})
                                    .text("VIEW")
                        ),
                        $("<div class='con'>")
                                .append(
                                    $("<h2>").text(tit),
                                    $("<p>").text(txt)
                                )
                    )
            )
    });
})
.error(function(err){
    console.error(err);
})

$("body").on("click", "#vidGallery article a", function(e){
    e.preventDefault();

    let vidId = $(this).attr("href");

    $("body")
        .append(
            $("<div class='vidpop'>")
                .append(
                    $("<iframe>").attr({
                        src : "https://www.youtube.com/embed/"+vidId,
                        frameborder : 0,
                        width:"100%",
                        height: 600
                    }),
                    $("<span>").text("CLOSE")
                )
        )
});

$("body").on("click", ".vidpop span", function(){
    $(".vidpop").remove();
})