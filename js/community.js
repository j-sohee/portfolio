const $board = $(".community #board tbody");

$.ajax({
    url : "js/community.json",
    datatype : "json"
})
.success(function(item){
    let items = item.data;

    createTable(items);
})
.error(function(item){
    console.error("데이터를 불러오는데 실패했습니다");
})

function createTable(items){
    $(items).each((index,items)=>{
        $board.prepend(
            $("<tr>").append(
                $("<td>").text(index + 1),
                $("<td>").append(
                    $("<a href='#'>").text(items.title)
                ),
                $("<td>").text(items.date)
            )
        )
    });
}