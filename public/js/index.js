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

    $('.selectpicker').selectpicker();
    $(".bootstrap-select").click(function () {
        console.log("in select class")
        $(this).addClass("open");
        $('.selectpicker').addClass('open');
   });

   $('#country-select').on('change', function() {
    $('#state-select')
    .empty();
    $.get("/api/states/"+this.value, function(data, status){
        $.each(data.data, function (i, item) {
            $('#state-select').append($('<option>', { 
                value: item.id,
                text : item.name 
            }));
        });
    });
  })

  $('#state-select').on('change', function() {
    $('#city-select')
    .empty();
    $.get("/api/cities/"+this.value, function(data, status){
        $.each(data.data, function (i, item) {
            $('#city-select').append($('<option>', { 
                value: item.id,
                text : item.name 
            }));
        });
    });
  })

  $('#city-select').on('change', function() {
    // alert( this.value );
  })
});