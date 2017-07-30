var SLIDENUM = 1;
var AUTHOR;
var ROOMID;
var OPTIONS = [];
var optionsVal = {};
var progressBars = [];
var progressExists = false;

$(function() {
    ROOMID = $("#info").data("channel");
    init();
    var windowLocation = window.location.href;

    console.log("Document loaded...");
    $('.mini.modal').modal('show');
    var COLORS = {
        orange: "#FA8500",
        lightBlue: "#2B92FF",
        darkBlue: "#031D4A",
        offWhite: "#F0F3F4",
        gray: "#D0D3D4"
    }

    login();
//    buttonToggle();

    formHandler();
    threadHandler();
    handleQuiz();

});

function init() {
    console.log("INIT METHOD RAN");
    $("#quiz-stats-button").on('click', function() {
        $("#instructor-quiz-stats").modal('show');
        if (!progressExists) {
            $(".container-bar").each(function() {

                        totalOptionsVal = 0;
                        for (var key in optionsVal) {
                            totalOptionsVal += optionsVal[key];
                        }
                        var appendDestination = ".progress#" + $(this).attr('id');
                        var bar = new ProgressBar.Line(appendDestination, {easing: 'easeInOut'});
//                        bar.animate(0.25);
                        console.log(optionsVal[$(this).attr('id')] / totalOptionsVal);
                        bar.animate(optionsVal[$(this).attr('id')] / totalOptionsVal);
                    });
            progressExists = true;
        }



    });

    $("#quiz-button").on('click', function() {
        //show modal
        $("#instructor-quiz").modal('show');
    });

    $("#add-option").on('click', function() {
        var option = $("#new-option").val();
        $("#option-list").append('<input type="radio" name="radio" checked="checked"><label class=option-labels>' + option + '</label>')
        $("#new-option").val("");
    });

    $("#publish-quiz").on('click', function() {
        console.log("OLD OPTIONS: " + OPTIONS);
        OPTIONS = [];
        console.log("NEW OPTIONS: " + OPTIONS);
        $('.option-labels').each(function () {
            OPTIONS.push($(this).text());
        }).promise().done(function() {
            var question = $("#new-question").val();
            $.ajax({
                method : "POST",
                url : "/api/chat/" + ROOMID + "/addQuiz",
                data : {
                    'options' : JSON.stringify(OPTIONS),
                    'question' : question,
                },
                success : function(data) {
                    progressExists = false;
                    console.log("Quiz succesfully published");
                    $("#instructor-quiz-stats .content").empty();
                    $("#empty").empty();

                    $("#instructor-quiz-stats .content").append("<h2>Question</h2>" + "<p>" + question + "</p>");
                    $("#instructor-quiz-stats .content").append("<h2>Options</h2>");
                    for (var i = 0; i < OPTIONS.length; i++) {
                        $("#instructor-quiz-stats .content").append("<div class=container-bar id=" + OPTIONS[i] + "><p class=options-stats>" + OPTIONS[i] + "</p><div class=progress id=" + OPTIONS[i] + "></div></div><br>");
                    }
                    $("#new-question").val("");
                    $("#option-list").empty();
                }
            });
        });

    });


}

function handleQuiz() {
    $("#quiz-submit").on("click", function() {
        var response = null;
//        console.log($("#quiz-options").children(".quiz-select"));
//        for (var option in $("#quiz-options").children(".quiz-select")) {
//            console.log(option);
//            if (option.checked) {
//                response = option.id;
//            }
//        }
        $(".quiz-select").each(function() {
            if (this.checked) {
                response = this.id;
            }
        });

        if (response) {
            console.log("sending response");
            sendQuizResp(AUTHOR, response);
        }
    });
}



function sendQuizResp(author, response) {
    $.ajax({
        url : "/api/chat/" + ROOMID + "/quizResponse",
        data : {
            'id' : author,
            'response' : response,
        },
        success: function() {
            console.log("Succesfully sent message");
            $("#quiz").css("display", "none");
            $("#quiz").empty();
        },
        fail: function() {
            console.log("Failed to send");
        }
    });
}



function notify(text) {
    window.alert(text);
}

function login() {
    $("#join-button").on('click', function() {
            AUTHOR = $("#author-name").val();
            $('.mini.modal').modal('hide').modal('hide dimmer');
    });

    $("#author-name").bind({
            keypress: function(e) {
                if (!e) e = window.event;
                var keyCode = e.keyCode || e.which;
                if (keyCode == '13') {
                    AUTHOR = $("#author-name").val();
                    $('.mini.modal').modal('hide').modal('hide dimmer');
                }
            }
    });
}

function formHandler() {
        var $post = $("#chat-post");
        $post.bind({
            click: function() {
                var MESSAGE = $("#post-content").val();
                var SUBJECT = $("#post-subject").val();
                if (!MESSAGE) {
                    notify("please enter subject and subject before posting!");
                    return;
                }
               fakeThread();
                // sendMessage(AUTHOR, SUBJECT, MESSAGE, ROOMID, SLIDENUM);
//                formOut();
//                $("#plus-sign").css("display", "block");
                $("#post-content").val("");
                $("#post-subject").val("");
            }
        });
}

function sendMessage(author, subject, message, roomId, slideNum) {
        $.ajax({
            url : '/api/chat/addMessage',
            data : {
                'msg' : message,
                'author' : author,
                'room' : roomId,
                'slide' : slideNum,
            },
            success: function() {
                console.log("Succesfully sent message");
            },
            fail: function() {
                console.log("Failed to send");
            }
        });
}

function buttonToggle() {
    formOut();
    var $sign = $("#plus-sign");
    var $btn = $("#post-toggle");
    var $form = $("#post-form");
    $btn.bind({
        click: function() {
            $sign.css("display", "none");
            openButton($btn);
            formIn();
        },
    });
}

function openButton($btn) {
    $btn.velocity(
        {
            width: "95%",
            borderRadius: "5px"
        },
        {
            duration: 400,
        }
    );
}

function closeButton() {
    $("#post-toggle").velocity("reverse");
}

function threadHandler() {
    var $color = $("");
    $(".thread-content").bind({
        mouseover: function() {

        },
        click: function() {
            console.log("clicked");
            var thread = this;
            if (!thread.dataset.read) {
                thread.dataset.read = true;
                $(thread).children(".thread-status").css("background", "green");
            } else {

            }
        }
    });
}




function fadeOut($dom) {
    $dom.velocity("slideDown", {duration: 100})
        .velocity("fadeOut", {duration: 100});
}

function appear($dom) {
    $dom.css("display", "block");
}

function fadeIn($dom) {
    $dom.velocity(
        {
            opacity: 1
        },
        {
            duration: 400
        }
    ).velocity("slideUp", {duration: 200});
    $dom.velocity("slideUp", {duration: 300})
        .velocity("fadeIn", {duration: 300});
}

function formIn() {
    $("#post-form").velocity(
        {
            display: "block",
            opacity: "0.6",
            height: "auto"
        },
        {
            duration: 300,
            easing: "easeInSine"
        }
    );
}

function formOut() {
    $("#post-form").velocity(
        { opacity: "none",
           display: "none"
        },
        {
            duration: 300,
            easing: "easeInSine"
        }
    );
}

function fakeThread() {
   var $thread = $("<div>", {"class": "thread-container"});
   var $subject = $("<div>", {"class": "thread-subject"});
   var $content = $("<div>", {"class": "thread-content"});
   var $color = $("<div>", {"class": "thread-background"});
   var $status = $("<div>", {"class": "thread-status"});
   $status.data("read");

   $content.html("blah blah balh blah blah lah blah balh blah blahlah blahah balh blah blahlah blah balh blah balh blah blahlah blah balh blah balh blah blahlah blah balh blah balh blah blahlah blah balh blah balh blah blahlah blah balh bl balh blah blahlah blah balh blah blahlah blah balh blah blahlah blah balh blah blah");
   var $author = $("<div>", {"class": "thread-author"});
   $author.html("author");
   $subject.html("merge-sort");
   $thread.append($color)
        .append($author)
        .append($subject)
        .append($status)
        .append($content);
   $("#discussion-content").append($thread);
   $thread.velocity("fadeIn", {duration: 500});
}