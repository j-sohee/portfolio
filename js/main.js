
let isCookie = document.cookie.indexOf("popup=done");
console.log(isCookie);

if(isCookie == -1){
    $("#popup").show();
}else{
    $("#popup").hide();
}

$(".del").on("click", function(){
    setCookie(0);
    alert("쿠키삭제완료");
});
$(".view").on("click", function(){
    console.log(document.cookie);
});

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

    var dueDate = today.toGMTString();
    document.cookie = "popup=done; expires="+dueDate;
}