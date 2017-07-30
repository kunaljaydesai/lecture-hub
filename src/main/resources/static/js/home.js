$(document).ready(function() {
    var fileUploadName = "test.pdf";
    $("#button1").on('click', function() {
        $.ajax({ type: 'GET',
            url: '/api/addRoom',
            datatype:'json',
            success : function(data)
            {
                fileUploadname = $("#lecture-upload").val();
                var room = data.name;
                location.href = "/r/" + room + "?file=" + fileUploadName;
            }
        });
    });
    $("#button2").on('click', function() {
        location.href = "/room";
    });
    $(".learnbutton").on('click', function() {
        location.href = "/room";
    });
})