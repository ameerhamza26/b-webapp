var quetionHtml = "";
var surveyId = 0;
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

    $('#talkingpoint-search').on('input', function() {
        
            $.get("/api/cause/search/talkinpoint?title=" + $('#talkingpoint-search').val(), function(data, status){
                var html="";
                for (var i = 0; i<data.data.length;i++) {
                    html+= '<a href="/talkingpoints/edit/'+data.data[i].ID+'" class="list-group-item">'+
                    '<h4 class="list-group-item-heading">'+ data.data[i].Title + '</h4>'+
                    '<p class="list-group-item-text">'+ data.data[i].Description+'</p>' + 
                    '</a>'
                }
                $('#talkingpoint-list-group').html(html);
            });
        
    });

    $('#resources-search').on('input', function() {
        
            $.get("/api/cause/search/resources?title=" + $('#resources-search').val(), function(data, status){
                var html="";
                for (var i = 0; i<data.data.length;i++) {
                    html+= '<a href="/resources/edit/'+data.data[i].ID+'" class="list-group-item">'+
                    '<h4 class="list-group-item-heading">'+ data.data[i].Title + '</h4>'+
                    '<p class="list-group-item-text">'+ data.data[i].Description+'</p>' + 
                    '</a>'
                }
                $('#resources-list-group').html(html);
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


  var questionCount =0;
//   $('#survey-question-submit-1').click(function() {
    
//     $.post('/create/survey/'+ surveyId+ '/questions', {
//         questionType: $('#survey-quest-1').val(),
//         question: $('#survey-question-text-1').val(),
//         option1: $('#survey-question-1-option-1').val(),
//         option2: $('#survey-question-1-option-2').val(),
//         option3: $('#survey-question-1-option-3').val(),
//         option4: $('#survey-question-1-option-4').val(),
//     }, function(data, status) {
//         questionCount++;
//         $('#question-button-div-1').hide();
//         $('#main-question-div-2').show();
//     })
//   });

//   $('#survey-question-submit-2').click(function() {
//     $.post('/create/survey/'+ surveyId+ '/questions', {
//         questionType: $('#survey-quest-2').val(),
//         question: $('#survey-question-text-2').val(),
//         option1: $('#survey-question-2-option-1').val(),
//         option2: $('#survey-question-2-option-2').val(),
//         option3: $('#survey-question-2-option-3').val(),
//         option4: $('#survey-question-2-option-4').val(),
//     }, function(data, status) {
//         questionCount++;
//         $('#question-button-div-2').hide();
//         $('#main-question-div-3').show();
//     })
//   });


  
//   $('#survey-question-submit-3').click(function() {
//     $.post('/create/survey/'+ surveyId+ '/questions', {
//         questionType: $('#survey-quest-3').val(),
//         question: $('#survey-question-text-3').val(),
//         option1: $('#survey-question-3-option-1').val(),
//         option2: $('#survey-question-3-option-2').val(),
//         option3: $('#survey-question-3-option-3').val(),
//         option4: $('#survey-question-3-option-4').val(),
//     }, function(data, status) {
//         questionCount++;
//         $('#question-button-div-3').hide();
//         $('#main-question-div-4').show();
//     })
//   });

  
//   $('#survey-question-submit-4').click(function() {
//     $.post('/create/survey/'+ surveyId+ '/questions', {
//         questionType: $('#survey-quest-4').val(),
//         question: $('#survey-question-text-4').val(),
//         option1: $('#survey-question-4-option-1').val(),
//         option2: $('#survey-question-4-option-2').val(),
//         option3: $('#survey-question-4-option-3').val(),
//         option4: $('#survey-question-4-option-4').val(),
//     }, function(data, status) {
//         questionCount++;
//         $('#question-button-div-4').hide();
//         $('#main-question-div-5').show();
//     })
//   });


  
//   $('.survey-final-submit').click(function() {
//       console.log("hello final submit", questionCount);
//     $.post('/create/survey/'+ surveyId+ '/questions', {
//         questionType: $('#survey-quest-' +questionCount).val(),
//         question: $('#survey-question-text-'+ questionCount).val(),
//         option1: $('#survey-question-'+questionCount+'-option-1').val(),
//         option2: $('#survey-question-'+questionCount+'-option-2').val(),
//         option3: $('#survey-question-'+questionCount+'-option-3').val(),
//         option4: $('#survey-question-'+questionCount+'-option-4').val(),
//     }, function(data, status) {
//         //$('#main-question-div-3').show();
//         window.location = "/survey";
//     })
//   });


  $('#city-select').on('change', function() {
    // alert( this.value );
  })

  var html = '<div id="main-question-div-number"><div class="form-group"> \
  <input type="text" id="question-id-number"  hidden  > \
  <label for="title" class="col-md-3 control-label">Select question type</label> \
  <div class="col-md-9"> \
      <select class="form-control" name="causeId" id="survey-quest-number"  onchange="getQuestionTypeChange(number)"> \
              <option value="TEXT"> Description </option> \
              <option value="MCQ">Choose from option</option> \
      </select> \
  </div> \
</div> \
<div id="questions-div-number" class="form-group" > \
    <label for="title" class="col-md-3 control-label">Add question</label> \
    <div class="col-md-9"> \
        <input id="survey-question-text-number" type="text" class="form-control" name="title" placeholder="Add question"> \
    </div> \
</div> \
<div id="options-div-number" style="display: none;"> \
    <div class="form-group" > \
        <label for="title" class="col-md-3 control-label">Add option1</label> \
        <div class="col-md-9"> \
            <input id="survey-question-number-option-1" type="text" class="form-control" name="title" placeholder="Add option1"> \
        </div> \
    </div> \
    <div class="form-group">  <label for="title" class="col-md-3 control-label">Add option2</label> \
        <div class="col-md-9"> \
            <input id="survey-question-number-option-2" type="text" class="form-control" name="title" placeholder="Add option2"> \
        </div> \
    </div> \
    <div class="form-group"> <label for="title" class="col-md-3 control-label">Add option3</label> \
        <div class="col-md-9"> \
            <input id="survey-question-number-option-3" type="text" class="form-control" name="title" placeholder="Add option3"> \
        </div> \
    </div> \
    <div class="form-group"> \
        <label for="title" class="col-md-3 control-label">Add option4</label> \
        <div class="col-md-9"> \
            <input id="survey-question-number-option-4" type="text" class="form-control" name="title" placeholder="Add option4"> \
        </div> \
    </div> \
</div> \
<div class="form-group" id="question-button-div-number"> \
<div class="col-md-offset-3 col-md-9"> \
    <button id="survey-question-submit-number" type="submit" class="btn btn-info" onclick="addMoreQuestion()"> \
        <i class="icon-hand-right"></i> &nbsp Add more question</button> \
</div> \
<div class="col-md-offset-3 col-md-9"> \
    <button id="survey-final-submit" type="submit" class="btn btn-info survey-final-submit" onclick="submitQuestions()"> \
        <i class="icon-hand-right"></i> &nbsp Submit</button> \
</div> \
</div> \
<div id="delete-button-div-number" style="display:none"> \
    <div class="col-md-offset-3 col-md-9"> \
    <button id="survey-question-delete-number" type="submit" class="btn btn-info" onclick="deleteQuestion(number)"> \
        <i class="icon-hand-right"></i> &nbsp Delete this question </button> \
    </div> \
</div></div>';
       

quetionHtml = html;

    $('#survey-submit').click(function() {
        $.post('/create/survey', 
        { title: $('#survey-title-text').val(),
          causeId: $('#survey-cause-id').val()  
        }, function(data,status) {
            console.log("data",data);
            surveyId = data.surveyId;
            questionCount++;
            htmlq = html.replace(/number/gi,"1");
            $('#survey-question-div').append(htmlq);
        })
    })


    var url = window.location.href;
    var editQuestionCount = 1;
    if (url.indexOf('/survey/edit') != -1) {
        var id = url.split('/')[url.split('/').length -1];
        surveyId=id;
        $.get('/api/questions/'+id, function(data,status) {
            console.log(data);
          
            setTimeout(function() {
                $('#survey-question-div').show();
                if (data.data.length > 0) {
                    for (var i=0; i< data.data.length; i++) {
                        console.log(i+1);
                        htmlq = html.replace(/number/gi,i+1);
                        $('#survey-question-div').append(htmlq);
                        $('#question-id-'+(i+1)).val(data.data[i].ID)
                        $('#survey-question-text-'+(i+1)).val(data.data[i].Question)
                        $('#survey-quest-'+(i+1)).val(data.data[i].AnswerType);
                        $('#survey-question-'+(i+1) +'-option-1').val(data.data[i].Option1)
                        $('#survey-question-'+(i+1) +'-option-2').val(data.data[i].Option2)
                        $('#survey-question-'+(i+1)+'-option-3').val(data.data[i].Option3)
                        $('#survey-question-'+(i+1) +'-option-4').val(data.data[i].Option4)
                        $('#question-button-div-'+ i).hide();
                        $('#delete-button-div-'+ i).show();
                        $('.survey-final-submit').hide();
                        if (data.data[i].AnswerType == 'TEXT') {
                            $('#options-div-'+(i+1)).hide();  
                        }
                        else {
                            $('#options-div-'+(i+1)).show();  
                        }
                        editQuestionCount++;
                    }
                }
            },1000)

        });
    }

    $('#survey-submit-edit').click(function() {
        $.post('/survey/edit/'+surveyId, 
        { title: $('#survey-title-text').val(),
          causeId: $('#survey-cause-id').val()  
        }, function(data,status) {
            if (editQuestionCount> 0) {
                var finalObj = [];
                for (var i = 1; i<=editQuestionCount;i++) {
                    if ($('#main-question-div-'+i).length) {
                        var question =[];
                        question.push(Number(surveyId));
                        question.push($('#survey-question-text-'+i).val());
                        question.push( $('#survey-quest-'+i).val());
                        question.push(  $('#survey-question-'+i +'-option-1').val());
                        question.push(  $('#survey-question-'+i +'-option-2').val());
                        question.push(  $('#survey-question-'+i +'-option-3').val());
                        question.push(  $('#survey-question-'+i +'-option-4').val());
                        question.push(Number( $('#question-id-'+i).val()))
                        finalObj.push(question);
                    }
                }
        
                $.ajax({
                    url:'/survey/edit/questions/'+ surveyId,
                    type:"POST",
                    data:  JSON.stringify({data: finalObj}),
                    contentType:"application/json",
                    dataType:"json",
                    success: function(){
                        window.location = "/survey";
                    }
                    })
            }
        })
    })


});



function getQuestionTypeChange(number) {
    console.log("number",number);
    $('#questions-div-'+number).show();  
    if ($('#survey-quest-'+number).val() == 'MCQ') {
        $('#options-div-'+number).show();  
    }
    else {
        $('#options-div-'+number).hide();  
    }
}
var questionCount = 1;
function addMoreQuestion() {
    $('#question-button-div-'+ questionCount).hide();
    $('#delete-button-div-'+ questionCount).show();

    questionCount++;
    var html = quetionHtml.replace(/number/gi, questionCount);
    $('#survey-question-div').append(html);
}

function deleteQuestion(number) {
    $('#main-question-div-'+number).remove();
}

function submitQuestions() {

    if (questionCount> 0) {
        var finalObj = [];
        for (var i = 1; i<=questionCount;i++) {
            if ($('#main-question-div-'+i).length) {
                var question =[];
                question.push(Number(surveyId));
                question.push($('#survey-question-text-'+i).val());
                question.push( $('#survey-quest-'+i).val());
                question.push(  $('#survey-question-'+i +'-option-1').val());
                question.push(  $('#survey-question-'+i +'-option-2').val());
                question.push(  $('#survey-question-'+i +'-option-3').val());
                question.push(  $('#survey-question-'+i +'-option-4').val());

                finalObj.push(question);
            }
        }

        $.ajax({
            url:'/create/survey/'+ surveyId+ '/questions',
            type:"POST",
            data:  JSON.stringify({data: finalObj}),
            contentType:"application/json",
            dataType:"json",
            success: function(){
                window.location = "/survey";
            }
            })
    }
}