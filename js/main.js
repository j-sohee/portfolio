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

//gnbMo
var btnCall = document.querySelector(".btnCall");
var menuMo = document.querySelector(".menuMo");

btnCall.onclick = function(e){
    e.preventDefault();
    btnCall.classList.toggle("on");
    menuMo.classList.toggle("on");
}
//main scroll
const $boxs = $(".myScroll");
const $btns = $("#navi li");
let posArr = [];
let len = $btns.length;
let baseLine = -200;

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

//visual swiper
var swiper = new Swiper(".mySwiper", {
    direction:"vertical",
    pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

//visual txtsliding
const $sub_txt = $("#visual").find(".sub_txt");
const $sub_pic = $("#visual .main1").find(".pic");

slidingTxt(".tit1", 500);
slidingTxt(".tit2", 800, 500);

function slidingTxt(el, speed, delay){
    let bgColor = $(el).find("span").css("color");
    $(el).append(
        $("<em class='mask'>").css({
            display: "block",
            width: "100%",
            height : "100%",
            backgroundColor : bgColor,
            position: "absolute",
            top: 0,
            left : "-100%"
        })
    )

    $(el).find(".mask").stop().delay(delay).animate({ left : 0 },speed, "easeInExpo", function(){
        $(this).prev("span").css({ opacity : 1});
        $(this).animate({ left:"100%"},speed, "easeInExpo", function(){
            $(this).remove;
            $sub_txt.animate({ left:0, opacity:1}, speed)
            $sub_pic.animate({ width:"100%", opacity:1}, speed*2)
        })
    })
}

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



 