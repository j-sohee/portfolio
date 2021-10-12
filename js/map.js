//지도생성---------------------------------------
const container = document.getElementById('map'); 
const options = { 
	center: new kakao.maps.LatLng(37.3754367,127.007084), 
	level: 3
};

const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

//지도이동--------------------------------------
const b1 = document.querySelector(".b1");
const b2 = document.querySelector(".b2");

b1.addEventListener("click", function(e){
	e.preventDefault();
	setCenter;
});

b2.addEventListener("click", function(e){
	e.preventDefault();
	panTo();
})

function setCenter() {            
    const moveLatLon = new kakao.maps.LatLng(37.3754367,127.007084);
    
    map.setCenter(moveLatLon);
}

function panTo() {
    const moveLatLon = new kakao.maps.LatLng(33.450580, 126.574942);
    
    map.panTo(moveLatLon);            
}        
//지도이동막기 ------------------------------------------
setDraggable(true);

function setDraggable(draggable) {

    map.setDraggable(draggable);    
}

//지도확대축소막기-----------------------------
setZoomable(true);

function setZoomable(zoomable) {

    map.setZoomable(zoomable);    
}

//마커 표시하기--------------------------------------------
const imageSrc = 'img/location/marker1.png',
	  imageSize = new kakao.maps.Size(64,64),
	  imageOption = {offset: new kakao.maps.Point(82, 50)}; 

// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
	markerPosition = new kakao.maps.LatLng(37.376225932632416,127.01024599480006); //

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
    position: markerPosition, 
    image: markerImage // 마커이미지 설정 
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);

//지도에 컨트롤 올리기--------------------------------------
// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
const mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
const zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);