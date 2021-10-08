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
        per_page : 9,
        format: "json",
        nojsoncallback:1,
        privacy_filter:5,
        tags : "sky"
    }
})

.success(function(data){
    console.log(data.photos.photo);
    let items = data.photos.photo;

    $(".myImg").append("<ul>");
    $(items).each(function(index,data){

        let text = data.title; 
        if(!data.title){
            text = "No description in this photo";
        }

        $(".myImg ul")
            .append(
                $("<li>")
                    .append(
                        $("<h2>").text(text)
                    )
                    .append(
                        $("<div class='imgBox'>")
                            .append(
                                $("<a>").attr({
                                    href : "https://live.staticflickr.com/"+data.server+"/"+data.id+"_"+data.secret+"_b.jpg"
                                })
                                    .append(
                                        $("<img>").attr({
                                            src: "https://live.staticflickr.com/"+data.server+"/"+data.id+"_"+data.secret+"_w.jpg"
                                        })
                                    )
                            )
                    )
                    
                    .append(
                        $("<p>").text("quis illum consectetur")
                    )
            )
    })
})
.error(function(err){
    console.err("데이터를 호출하는데 실패했습니다");
})