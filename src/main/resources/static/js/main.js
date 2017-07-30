var SLIDENUM = 1;
var AUTHOR;
var ROOMID;



$(function() {
    var windowLocation = window.location.href;
    ROOMID = $("#info").data("channel");
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
    buttonToggle();

    formHandler();


});



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
                sendMessage(AUTHOR, MESSAGE, ROOMID, SLIDENUM);
                formOut();
                $("#post-container").css("display", "block");
                $("#post-content").val("");
                $("#post-subject").val("");
            }
        });
}

function sendMessage(author, message, roomId, slideNum) {
        $.ajax({
            url : '/api/chat/addMessage',
            data : {
                'msg' : message,
                'author' : author,
                'room' : roomId,
                'slide' : slideNum,
            },
            success : function() {
                console.log("Succesfully sent message");
            },
            fail: function() {
                console.log("Failed to send");
            }
        });
}

function buttonToggle() {
    formOut();
    var $btnContainer = $("#post-container");
    var $btn = $("#post-toggle");
    var $form = $("#post-form");
    $btn.bind({
        click: function() {
            $btnContainer.css("display", "none");
            formIn();
        },
    });
}

function threadHandler() {
    var $color = $("")
    $(".thread-container").bind({
        mouseover: function() {

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
        { opacity: "0.6"
        },
        {
            duration: 300,
            easing: "easeInSine"
        }
    );
}

function formOut() {
    $("#post-form").velocity(
        { opacity: "none" },
        {
            duration: 300,
            easing: "easeInSine"
        }
    );
}