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
const $visual = $(".visual");
const $mainTit = $visual.find("#mainTit")
const $mainVisual = $(".visual2 .mainVisual")
const $smallVisual = $visual.find(".smallVisual");
const $next = $(".next");
const $prev = $(".prev");
let num = 0;
let speed = 500;

$mainVisual.find("li").last().prependTo($mainVisual);


$next.on("click", function(e){
    e.preventDefault();

    next_slider($mainVisual);

    $mainTit.find("li.on").addClass("upper");
    $smallVisual.find("li.on").addClass("upper");
    
    
    setTimeout(function(){
        $mainTit.find("li").removeClass("on");
        $mainTit.find("li").removeClass("upper");
        $smallVisual.find("li").removeClass("on");
        $smallVisual.find("li").removeClass("upper");
        if(num<2){
            $mainTit.find("li").eq(num + 1).addClass("on");
            $smallVisual.find("li").eq(num + 1).addClass("on");
            num++;
        }else{
            num = 0;
            $mainTit.find("li").eq(num).addClass("on");
            $smallVisual.find("li").eq(num).addClass("on");
        }
    },speed)
});

$prev.on("click", function(e){
    e.preventDefault();

    prev_slider($mainVisual);

    $mainTit.find("li.on").addClass("upper");
    
    setTimeout(function(){
        $mainTit.find("li").removeClass("on");
        $mainTit.find("li").removeClass("upper");
        if(num>0){
            $mainTit.find("li").eq(num-1).addClass("on");
            num--;
        }else{
            num = 2;
            $mainTit.find("li").eq(num).addClass("on");
        }
    },500)
});

function prev_slider(el){
    el.animate({marginLeft : "0%"}, speed,function(){
        el.css({marginLeft:"-100%"});
        el.find("li").last().prependTo(this);
    });
}
function next_slider(el){
    el.animate({marginLeft : "-200%"},speed,function(){
        el.css({marginLeft:"-100%"});
        el.find("li").first().appendTo(this);
    });
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



 