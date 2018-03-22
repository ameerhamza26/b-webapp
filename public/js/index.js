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

    $('#localmedia-search').on('input', function() {
        
        $.get("/api/localmedia/search?text=" + $('#localmedia-search').val(), function(data, status){
            var html="";
            for (var i = 0; i<data.data.length;i++) {
                html+= '<a href="/localmedia/edit/'+data.data[i].ID+'" class="list-group-item">'+
                '<h4 class="list-group-item-heading">'+ data.data[i].Name + '</h4>'+
                '</a>'
            }
            $('#event-list-group').html(html);
        });
    
    });

    $('#survey-search').on('input', function() {
        
        $.get("/api/survey/search?text=" + $('#survey-search').val(), function(data, status){
            var html="";
            for (var i = 0; i<data.data.length;i++) {
                html+= '<a href="/survey/edit/'+data.data[i].ID+'" class="list-group-item">'+
                '<h4 class="list-group-item-heading">'+ data.data[i].Title + '</h4>'+
                '</a>'
            }
            $('#survey-list-group').html(html);
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

  $('#survey-quest-1').on('change',function() {
    $('#questions-div-1').show();  
    if (this.value == 'MCQ') {
        $('#options-div-1').show();  
    }
    else {
        $('#options-div-1').hide();  
    }
  })

  $('#survey-quest-2').on('change',function() {
    $('#questions-div-2').show();  
    if (this.value == 'MCQ') {
        $('#options-div-2').show();  
    }
    else {
        $('#options-div-2').hide();  
    }
  })


  $('#survey-quest-3').on('change',function() {
    $('#questions-div-3').show();  
    if (this.value == 'MCQ') {
        $('#options-div-3').show();  
    }
    else {
        $('#options-div-3').hide();  
    }
  })

  $('#survey-quest-4').on('change',function() {
    $('#questions-div-4').show();  
    if (this.value == 'MCQ') {
        $('#options-div-4').show();  
    }
    else {
        $('#options-div-4').hide();  
    }
  })

  $('#survey-quest-5').on('change',function() {
    $('#questions-div-5').show();  
    if (this.value == 'MCQ') {
        $('#options-div-5').show();  
    }
    else {
        $('#options-div-5').hide();  
    }
  })

  var surveyId = 0;
  var questionCount =0;
  $('#survey-question-submit-1').click(function() {
    
    $.post('/create/survey/'+ surveyId+ '/questions', {
        questionType: $('#survey-quest-1').val(),
        question: $('#survey-question-text-1').val(),
        option1: $('#survey-question-1-option-1').val(),
        option2: $('#survey-question-1-option-2').val(),
        option3: $('#survey-question-1-option-3').val(),
        option4: $('#survey-question-1-option-4').val(),
    }, function(data, status) {
        questionCount++;
        $('#question-button-div-1').hide();
        $('#main-question-div-2').show();
    })
  });

  $('#survey-question-submit-2').click(function() {
    $.post('/create/survey/'+ surveyId+ '/questions', {
        questionType: $('#survey-quest-2').val(),
        question: $('#survey-question-text-2').val(),
        option1: $('#survey-question-2-option-1').val(),
        option2: $('#survey-question-2-option-2').val(),
        option3: $('#survey-question-2-option-3').val(),
        option4: $('#survey-question-2-option-4').val(),
    }, function(data, status) {
        questionCount++;
        $('#question-button-div-2').hide();
        $('#main-question-div-3').show();
    })
  });


  
  $('#survey-question-submit-3').click(function() {
    $.post('/create/survey/'+ surveyId+ '/questions', {
        questionType: $('#survey-quest-3').val(),
        question: $('#survey-question-text-3').val(),
        option1: $('#survey-question-3-option-1').val(),
        option2: $('#survey-question-3-option-2').val(),
        option3: $('#survey-question-3-option-3').val(),
        option4: $('#survey-question-3-option-4').val(),
    }, function(data, status) {
        questionCount++;
        $('#question-button-div-3').hide();
        $('#main-question-div-4').show();
    })
  });

  
  $('#survey-question-submit-4').click(function() {
    $.post('/create/survey/'+ surveyId+ '/questions', {
        questionType: $('#survey-quest-4').val(),
        question: $('#survey-question-text-4').val(),
        option1: $('#survey-question-4-option-1').val(),
        option2: $('#survey-question-4-option-2').val(),
        option3: $('#survey-question-4-option-3').val(),
        option4: $('#survey-question-4-option-4').val(),
    }, function(data, status) {
        questionCount++;
        $('#question-button-div-4').hide();
        $('#main-question-div-5').show();
    })
  });


  
  $('.survey-final-submit').click(function() {
      console.log("hello final submit", questionCount);
    $.post('/create/survey/'+ surveyId+ '/questions', {
        questionType: $('#survey-quest-' +questionCount).val(),
        question: $('#survey-question-text-'+ questionCount).val(),
        option1: $('#survey-question-'+questionCount+'-option-1').val(),
        option2: $('#survey-question-'+questionCount+'-option-2').val(),
        option3: $('#survey-question-'+questionCount+'-option-3').val(),
        option4: $('#survey-question-'+questionCount+'-option-4').val(),
    }, function(data, status) {
        //$('#main-question-div-3').show();
        window.location = "/survey";
    })
  });


  $('#city-select').on('change', function() {
    // alert( this.value );
  })

    $('#survey-submit').click(function() {
        $.post('/create/survey', 
        { title: $('#survey-title-text').val(),
          causeId: $('#survey-cause-id').val()  
        }, function(data,status) {
            console.log("data",data);
            surveyId = data.surveyId;
            questionCount++;
            $('#survey-question-div').show();
        })
    })


    var url = window.location.href;
    if (url.indexOf('/survey/edit') != -1) {
        
    }
});