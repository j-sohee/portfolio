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


//main slider

class Slider{
    constructor(selector,opt){
        if(!selector){
            console.error("selector값은 필수입력사항입니다");
            return;
        }
    
        const defaults = {
            prev : ".prev",
            next : ".next",
            speed : 1000
        }
        let result_opt = Object.assign({}, defaults, opt)
    
        this.initDom(selector, result_opt);
        this.bindingEvent();
        this.init(this.$slider);
    }
    
    initDom(selector, result_opt){
        this.$slider = $(selector);
        this.$prev = $(result_opt.prev);
        this.$next = $(result_opt.next);
        this.speed = result_opt.speed;
    }
    
    bindingEvent(){
        this.$prev.on("click", e=>{
            e.preventDefault();
            this.prev(this.$slider);
        });
    
        this.$next.on("click", e=>{
            e.preventDefault();
            this.next(this.$slider);
        });
    }
    
    init(el){
        let sliderLen = el.children("ul").find("li").length;
        el.children("ul").css({ width : 100 * sliderLen +"%"});
        el.children("ul").find("li").css({ width: 100 / sliderLen +"%"})
        el.children("ul").find("li").last().prependTo(el.children("ul"));
    }
    
    prev(el){
        el.children("ul").animate({ marginLeft : "0%"},this.speed, function(){
            $(this).css({ marginLeft : "-100%"});
            $(this).children("li").last().prependTo(this);
        });
    }
    
    next(el){
        el.children("ul").animate({ marginLeft : "-200%"},this.speed, function(){
            $(this).css({ marginLeft : "-100%"});
            $(this).children("li").first().appendTo(this);
        });
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



 