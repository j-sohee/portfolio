//header 2depth menu
$("#gnb>li").on("mouseenter", function(){
    $(this).find(".gnb_2depth").show();
})
$("#gnb>li").on("mouseleave", function(){
    $(this).find(".gnb_2depth").hide();
})

$("#gnb>li").each(function(index){
    $("#gnb>li").eq(index).find("a").on("focusin", function(){
        $("#gnb>li").eq(index).find(".gnb_2depth").show();     
    });

    $("#gnb>li").eq(index).find("a").last().on("focusout", function(){
        $("#gnb>li").eq(index).find(".gnb_2depth").hide();
    });
});


//main scroll
const $boxs = $(".myScroll");
const $btns = $("#navi li");
let posArr = [];
let len = $btns.length;
let baseLine = -300;

for(let i=0; i<len; i++){
    posArr.push($boxs.eq(i).offset().top);
}

$(window).on("scroll", function(){
    let scroll = $(this).scrollTop();
    for(let i=0; i<len; i++){
        if(scroll >= posArr[i] +baseLine){
            $btns.children("a").removeClass("on");
            $btns.eq(i).children("a").addClass("on");

            $boxs.removeClass("on");
            $boxs.eq(i).addClass("on");
        }
    }
});

$("#navi li a").on("click", function(e){
    e.preventDefault();
    let target = $(this).attr("href");
    let targetPos = $(target).offset().top;

    $("html,body").animate({
        scrollTop : targetPos
    },1000);
});





//쿠키팝업----------------------------------------------
let isCookie = document.cookie.indexOf("popup=done");

if(isCookie == -1){
    $("#popup").show();
}else{
    $("#popup").hide();
}

$("#popup .close").on("click", function(e){
    e.preventDefault();

    let isChecked = $("#popup").find("input[type=checkbox]").is(":checked");

    if(isChecked) setCookie(1);

    $("#popup").hide();
});

function setCookie(time){
    let today = new Date();
    let date = today.getDate();
    today.setDate(date + time);

    let dueDate = today.toGMTString();
    document.cookie = "popup=done; expires="+dueDate;
}



 