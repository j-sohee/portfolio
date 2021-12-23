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
let baseLine = -300;

for(let i=0; i<len; i++){
    posArr.push($boxs.eq(i).offset().top);
}

$(window).on("resize", function(){
    posArr = [];
    for(let i=0; i<len; i++){
        posArr.push($boxs.eq(i).offset().top);
    }
})

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

//2번째단 video 재생
const vid = document.querySelectorAll("video");
for(let el of vid){
    el.addEventListener("mouseenter", ()=>{
        el.play();
    });
    el.addEventListener("mouseleave", ()=>{
        el.pause();
    })
}

//navi버튼을 클릭했을 때
$("#navi li a").on("click", function(e){
    e.preventDefault();

    let target = $(this).attr("href");
    let targetPos = $(target).offset().top;

    $("html,body").animate({ 
        scrollTop : targetPos 
    }, 1000)
});

//main slider
const visual = $(".visual");
const mainTit = visual.find("#mainTit")
const mainVisual_top = $(".visual2 .top");
const mainVisual_bottom = $(".visual2 .bottom");
const smallVisual = visual.find(".smallVisual");
const next = $(".next");
const prev = $(".prev");
let currentInedx = 0;
let sliderCount = mainVisual_top.find("li").length;
let speed = 500;

next.on("click", function(e){
    e.preventDefault();

    let nextIndex = (currentInedx +1) % sliderCount;
    nextSlide(nextIndex);
    nextVisual(nextIndex);

});

prev.on("click", function(e){
    e.preventDefault();

    let prevIndex = (currentInedx -1) % sliderCount;
    prevSlide(prevIndex);   
    prevVisual(prevIndex);
});

function nextSlide(nextIndex){
    if(currentInedx < nextIndex){
        mainVisual_bottom.find("li.on").removeClass("on").addClass("upper");
        setTimeout(function(){
            mainVisual_top.find("li.on").removeClass("on").addClass("upper");
        },speed)

        //두번째slide(핑크) top나오고 첫번째bottom upper사라짐
        setTimeout(function(){
            mainVisual_top.find("li").eq(nextIndex).addClass("on");
            mainVisual_bottom.eq(nextIndex-1).find("li.upper").removeClass("upper");
        },speed*2)

        ///두번째slide(핑크) bottom나오고 첫번째top upper사라짐
        setTimeout(function(){
            mainVisual_bottom.find("li").eq(nextIndex).addClass("on");
            
        },speed*2.5)
        setTimeout(function(){
            mainVisual_top.eq(nextIndex-1).find("li.upper").removeClass("upper");
            currentInedx = nextIndex;
        },speed*3)
    }else{
        currentInedx=0;
        mainVisual_bottom.find("li.on").removeClass("on").addClass("upper");

        setTimeout(function(){
            mainVisual_top.find("li.on").removeClass("on").addClass("upper");
        },speed)

        setTimeout(function(){
            mainVisual_top.find("li").eq(nextIndex).addClass("on");
            mainVisual_bottom.find("li.upper").removeClass("upper");
            console.log(nextIndex);
        },speed*2)

        setTimeout(function(){
            mainVisual_bottom.find("li").eq(nextIndex).addClass("on");
            mainVisual_bottom.find("li.upper").removeClass("upper");
        },speed*2.5)

        setTimeout(function(){
            mainVisual_top.find("li.upper").removeClass("upper");
        },speed*3)
    }
}

function prevSlide(prevIndex){
    if(currentInedx > prevIndex){
        mainVisual_bottom.find("li.on").removeClass("on").addClass("upper");
        setTimeout(function(){
            mainVisual_top.find("li.on").removeClass("on").addClass("upper");
        },speed)
        //두번째slide(핑크) top나오고 첫번째bottom upper사라짐
        setTimeout(function(){
            mainVisual_top.find("li").eq(prevIndex).addClass("on");
            mainVisual_bottom.find("li.upper").removeClass("upper");
        },speed*2)

        ///두번째slide(핑크) bottom나오고 첫번째top upper사라짐
        setTimeout(function(){
            mainVisual_bottom.find("li").eq(prevIndex).addClass("on");
            currentInedx = prevIndex;
        },speed*2.5)
        setTimeout(function(){
            mainVisual_top.find("li.upper").removeClass("upper");
        },speed*3)
        
    }else{
        currentInedx=0;
        mainVisual_bottom.find("li.on").removeClass("on").addClass("upper");

        setTimeout(function(){
            mainVisual_top.find("li.on").removeClass("on").addClass("upper");
        },speed)

        setTimeout(function(){
            mainVisual_top.find("li").eq(prevIndex).addClass("on");
        },speed*2)

        setTimeout(function(){
            mainVisual_bottom.find("li").eq(prevIndex).addClass("on");
            setTimeout(function(){
                enableClick = true;
            },speed*3)
        },speed*2.5)
    }

}

function nextVisual(nextIndex){
    if(currentInedx < nextIndex){
        mainTit.find("li.on").addClass("upper");
        smallVisual.find("li.on").addClass("upper");

        setTimeout(function(){
            mainTit.find("li").removeClass("upper");
            mainTit.find("li").removeClass("on");
            smallVisual.find("li").removeClass("upper");
            smallVisual.find("li").removeClass("on");

            mainTit.find("li").eq(nextIndex).addClass("on");
            smallVisual.find("li").eq(nextIndex).addClass("on");
            currentInedx = nextIndex;
            console.log(currentInedx);
        },speed)
    }else{
        currentInedx=0;
        mainTit.find("li.on").addClass("upper");
        smallVisual.find("li.on").addClass("upper");
        setTimeout(function(){
            mainTit.find("li").removeClass("upper");
            mainTit.find("li").removeClass("on");
            smallVisual.find("li").removeClass("upper");
            smallVisual.find("li").removeClass("on");
            
            mainTit.find("li").eq(nextIndex).addClass("on");
            smallVisual.find("li").eq(nextIndex).addClass("on");
        },speed)
    }
    
}

function prevVisual(prevIndex){
    if(currentInedx > prevIndex){
        mainTit.find("li.on").addClass("upper");
        smallVisual.find("li.on").addClass("upper");

        setTimeout(function(){
            mainTit.find("li").removeClass("upper");
            mainTit.find("li").removeClass("on");
            smallVisual.find("li").removeClass("upper");
            smallVisual.find("li").removeClass("on");

            mainTit.find("li").eq(prevIndex).addClass("on");
            smallVisual.find("li").eq(prevIndex).addClass("on");

            currentInedx = prevIndex;
        },speed)

    }else{
        currentInedx=0;
        mainTit.find("li.on").addClass("upper");
        smallVisual.find("li.on").addClass("upper");
        setTimeout(function(){
            mainTit.find("li").eq(prevIndex).addClass("on");
            smallVisual.find("li").eq(prevIndex).addClass("on");
        },speed)
    }
}

//navi
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



 