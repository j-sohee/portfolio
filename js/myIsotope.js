
//페이지 로드 이벤트

window.addEventListener("load", ()=>{
    //isotope 플로그인 호출구문
    const grid = new Isotope(".myImg", { //배치할 요소를 감싸고 있는 부모 요소명
        itemSelector:"article", //배치할 요소명
        columnWidth:"article", //너비값을 구할 요소명
        transitionDuration:"0.5s" //화면 재배치시 요소가 움직이는 속도
    });
    //grid에 저장된 결과값을 불러와서 재정렬 기능 연결
    grid.arrange();
});

