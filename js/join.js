//약관동의box scroll
const $frame = $(".wrap");
const $btns = $frame.find("dl dt a");
const $boxs = $frame.find("dl dd");
let speed = 500;
let isDone = true;

$btns.on("click", function(e){
    e.preventDefault();

    let i = $(this).parent().index();
    let isOn = $(this).hasClass("on");

    $(this).removeClass("on");

    if(isOn){
        $(this).removeClass("on");
        $(this).parent(i).next().slideUp(speed);
    }else{
        $(this).addClass("on");
        $(this).parent(i).next().slideDown(speed);
    }
});

//input_submit
$("input[type=submit]").on("click", function(e){
    e.preventDefault();
    
    if(!isTxt("userid",5)) e.preventDefault();
    if(!isTxt("name",2)) e.preventDefault();
    if(!isEmail("email")) e.preventDefault();

    if(!isPwd("pwd", "pwd_check",8)) e.preventDefault();
});


//텍스트 인증 함수 정의
function isTxt(name, len){

    if(len == undefined) len = 5;
    let txt = $("[name="+name+"]").val();

    if(txt.length >= len){
        $("[name="+name+"]").parent().find(".err_txt").remove();
        return true;
    }else{
        $("[name="+name+"]").parent().find(".err_txt").remove();
        $("[name="+name+"]").parent().append(
            $("<div class='err_txt'>").append(
                "<p>입력항목을 "+len+"글자 이상 입력하세요"
            )
        )
    }
    return false;
}

//이메일 인증함수 정의
function isEmail(name){

    let txt = $("[name="+name+"]").val();
    if(/@/.test(txt)){
        $("[name="+name+"]").parent().find(".err_txt").remove();
        return true;
    }else{
        $("[name="+name+"]").parent().find(".err_txt").remove();
        $("[name="+name+"]").parent().append(
            $("<div class='err_txt'>").append(
                "<p>@를 포함한 전체 메일주소를 입력하세요."
            )
        );
        return false;
    }
}

function isPwd(name1,name2,len){
    let pwd1 = $("input[name="+name1+"]").val();
    let pwd2 = $("input[name="+name1+"]").val();

    let num = /[0-9]/;
    let eng = /[a-zA-z]/;
    let spc = /[~!@#$%^&*()_+\[\]-]/;

    if(pwd1 === pwd2 && pwd1.length>=len && num.test(pwd1) && eng.test(pwd1) && spc.test(pwd1)){
        $("input[name="+name1+"]").parent().find(".err_txt").remove();
    }else{
        $("input[name="+name1+"]").parent().find(".err_txt").remove();
        $("[name="+name1+"]").parent().append(
            $("<div class='err_txt'>").append(
                "<p>비밀번호는 "+len+"글자 이상 영문,특수문자,숫자를 포함해서 동일하게 입력하세요."
            )
        );
        return false;
    }
}
