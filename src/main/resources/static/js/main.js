$(function() {
    var slideNum = 1;
    var windowLocation = window.location.href;
    var roomId = windowLocation.substring(windowLocation.length - 8);
    console.log("Document loaded...");
    var authorName = "";
    $('.mini.modal').modal('show');
    var COLORS = {
        orange: "#FA8500",
        lightBlue: "#2B92FF",
        darkBlue: "#031D4A",
        offWhite: "#F0F3F4",
        gray: "#D0D3D4"
    }


    var $chat = $("#chat-input");

    $("#chat-input").bind({
        keyUp: function() {
            console.log("typing");
        },
    });

    $("#join-button").on('click', function() {
        author = $("#author-name").val();
        $('.mini.modal').modal('hide').modal('hide dimmer');
    });

    $("#author-name").bind({
        keypress: function(e) {
            if (!e) e = window.event;
            var keyCode = e.keyCode || e.which;
            if (keyCode == '13') {
                author = $("#author-name").val();
                $('.mini.modal').modal('hide').modal('hide dimmer');
            }
        }
    });

    $("#chat-post").on('click', function() {
        var message = $("#chat-input").val();
        sendMessage(author, message, roomId, slideNum);
        $("#chat-input").val("");
    });

});


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

