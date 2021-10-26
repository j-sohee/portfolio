/*
// key : c28561608d1c0e9f7db60ecfda79bf27
//원하는 이미지 출력
https://www.flickr.com/services/rest/?method=flickr.photos.search

//사진경로
https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg

*/

$.ajax({
    url : "https://www.flickr.com/services/rest/?method=flickr.photos.search",
    dataType : "json",
    data : {
        api_key : "c28561608d1c0e9f7db60ecfda79bf27",
        per_page : 20,
        format: "json",
        nojsoncallback:1,
        privacy_filter:1,
        tags : "moonlit"
    }
})

.success(function(data){
    console.log(data.photos.photo);
    let items = data.photos.photo;

    $(items).each(function(index,data){

        let text = data.title; 
        if(!data.title){
            text = "No description in this photo";
        }

        $("#gallery").append(
            $("<article>")
                .append(
                    $("<div class='list'>")
                        .append(
                            $("<div class='txt'>")
                        .append(
                            $("<p>").text("CATEGORY"),
                            $("<span>").text(data.owner),
                            $("<h2>").text(text)
                        ),
                        $("<a>").attr({
                            href : "https://live.staticflickr.com/"+data.server+"/"+data.id+"_"+data.secret+"_b.jpg"
                            })
                            .append(
                                $("<img>").attr({ src : "https://live.staticflickr.com/"+data.server+"/"+data.id+"_"+data.secret+"_b.jpg" })
                            )
                   )
                    
                )
        )
 });

    let imgNum = 0;
    let photo = $("#gallery article").length;

    $("#gallery article img").each(function(index,data){
       

        data.onload = function(){
            imgNum++;
            console.log(imgNum);

            if(imgNum === photo){

                $(".loading").addClass("off");

                new Isotope("#gallery", {
                    itemSelector : "#gallery article",
                    columnWidth : "#gallery article",
                    percentPosition : true,
                    transitionDuration : "0.5s"
                });

                $("#gallery article").addClass("on");
            }
        }
    })

    
})

.error(function(err){
    console.err("데이터를 호출하는데 실패했습니다");
})

$("body").on("click", "#gallery article a", function(e){
    e.preventDefault();

    let imgSrc = $(this).attr("href");

    $("body").append(
        $("<div class='pop'>")
            .append(
                $("<img>").attr({src : imgSrc }),
                $("<span>").text("close")
            )
    )
})

$("body").on("click", ".pop span", function(){
    $(".pop").remove();
})

