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

    $("#chat-input").keyup(function(e) {
    	console.log("hello");
    });

    $("#join-button").on('click', function() {
        author = $("#author-name").val();
        $('.mini.modal').modal('hide').modal('hide dimmer');
    });

    $("#chat-post").on('click', function() {
        var message = $("#chat-input").value();
        sendMessage(author, message, roomId, slideNum);
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

});
