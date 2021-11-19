
getList({
    type:"userid",
    user_id:"194106842@N02"
})

$("#searchBox button").on("click", function(){

    let inputs = $("#searchBox input").val();

    if(!inputs){
        alert("검색어를 입력하세요");
        return;
    }

    $("#gallery").removeClass("on");
    $(".loading").removeClass("off");


    $("#searchBox input").val("");
    getList({
        type:"search",
        tag : inputs
    });
});

$(window).on("keypress", function(e){
    if(e.keyCode == 13){

        let inputs = $("#searchBox input").val();

        if(!inputs){
            alert("검색어를 입력하세요");
            return;
        }
        $("#gallery").removeClass("on");
        $(".loading").removeClass("off");

       
        $("#searchBox input").val("");
        getList({
            type:"search",
            tag : inputs
        });
    }
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

function getList(opt){
    let result_opt = [];

    if(opt.type == "interesting"){
        result_opt = {
            url : "https://www.flickr.com/services/rest/?method=flickr.interestingness.getList",
            dataType : "json",
            data : {
                api_key : "c28561608d1c0e9f7db60ecfda79bf27",
                per_page : 20,
                format: "json",
                nojsoncallback:1,
                privacy_filter:1,
            }
        }
    }

    if(opt.type == "search"){
        result_opt = {
            url : "https://www.flickr.com/services/rest/?method=flickr.photos.search",
            dataType : "json",
            data : {
                api_key : "c28561608d1c0e9f7db60ecfda79bf27",
                per_page : 20,
                format: "json",
                nojsoncallback:1,
                privacy_filter:1,
                tags : opt.tag
            }
        }
    }

    if(opt.type == "userid"){
        result_opt = {
            url:"https://www.flickr.com/services/rest/?method=flickr.people.getPhotos", 
            dataType:"json", 
            data:{
                api_key:"c28561608d1c0e9f7db60ecfda79bf27",
                per_page:20, 
                format:"json",
                nojsoncallback:1, 
                privacy_filter : 1, 
                user_id : opt.user_id
            }
        }
    }

    $.ajax(result_opt)

    .success(function(data){

        let items = data.photos.photo;
        console.log(items);

        $("#gallery").empty();
    
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
    
                    $("#gallery").addClass("on");
                }
            }
        })
    })
    
    .error(function(err){
        console.err("데이터를 호출하는데 실패했습니다");
    })
} 
