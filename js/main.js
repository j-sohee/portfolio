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



const swiper = new Swiper('#product .inner', {
    //좌우버튼 옵션
    navigation :{
        nextEl :".swiper-button-next", 
        prevEl :".swiper-button-prev" 
    }, 

    loop: true, //순환여부 결정 
    speed : 500, //슬라이딩 속도 
    direction : "horizontal", //슬라이딩 방향 vertical:세로 
    spaceBetween : 0, //사이간격( 숫자 px )
    slidesPerView : "auto", // 하나의 화면당 보일 패널의 갯수 
    centeredSlides : true,
   //활성화 슬라이드를 화면 가운데 배치
    grabCursor : true, //마우스 커서 모양 변경 
    //자동롤링 
    autoplay :{
        delay:1000, 
        disableOnInteraction : true 
        //false : 롤링중에 스와이프되더라도 계속 롤링 
        //true : 롤링중에 스와이프되면 롤링 중지 
    },
    effect: "coverflow",
     coverflowEffect : {
         rotate : 50, //슬라이드 회전 각도
         stretch : -150, //슬라이드간의 거리,클수록 많이 겹침
         depth : 250, //깊이효과값
         modifier : 1, //효과배수 2로적으면 rotate 50 x 2 = 100이 됨
         slideShadows : false //슬라이더 그림자
     }
 });

 swiper.autoplay.stop(); 

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



 