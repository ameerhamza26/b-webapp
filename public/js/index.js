$(document).ready(function(){
    console.log("in javaascript");
    $('#event-search').on('input', function() {
        
            $.get("/cause/search?title=" + $('#event-search').val(), function(data, status){
                var html="";
                for (var i = 0; i<data.data.length;i++) {
                    html+= '<a href="/events/edit/'+data.data[i].ID+'" class="list-group-item">'+
                    '<h4 class="list-group-item-heading">'+ data.data[i].Title + '</h4>'+
                    '<span>Cause: </span> <span>' + data.data[i].CauseTitle+ '</span>' +
                    '</a>'
                }
                $('#event-list-group').html(html);
            });
        
    });
});