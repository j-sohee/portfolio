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
        per_page : 16,
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

        $(".myImg").append(
            $("<article>")
                .append(
                    $("<div class='item'>")
                        .append(
                            $("<a>").attr({
                                href : "https://live.staticflickr.com/"+data.server+"/"+data.id+"_"+data.secret+"_b.jpg"
                            })
                                .append(
                                    $("<img>").attr({ src : "https://live.staticflickr.com/"+data.server+"/"+data.id+"_"+data.secret+"_b.jpg" })
                                )
                        )
                        .append(
                            $("<span>").text("Lorem, ipsum dolor")
                        )
                        .append(
                            $("<h2>").text(text)
                        )
                )
            )
    })

    let imgNum = 0;

    $(".myImg article img").each(function(index,data){
        data.onload = function(){
            imgNum++;
            console.log(imgNum);

            if(imgNum == 16){
                new Isotope(".myImg", {
                    itemSelector : ".myImg article",
                    columnWidth : ".myImg article",
                    percentPosition : true,
                    transitionDuration : "0.5s"
                })
            }
        }
    })

    
})

.error(function(err){
    console.err("데이터를 호출하는데 실패했습니다");
})

$("body").on("click", ".myImg article .item", function(e){
    e.preventDefault();

    let imgSrc = $(this).children("a").attr("href");

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

