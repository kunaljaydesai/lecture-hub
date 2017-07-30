$(document).ready(function() {
    $("#button1").on('click', function() {
        console.log("Button 1 was clicked!");
        $.ajax({ type: 'GET',
            url: '/api/addRoom',
            datatype:'json',
            success : function(data)
            {
                console.log(data);
                var room = data.name;
                location.href = "/r/" + room;
            }
        });
    });
    $("#button2").on('click', function() {
        console.log("Button 2 was clicked!");
        location.href = "/room";
    });
    $(".learnbutton").on('click', function() {
        console.log("Learn button was clicked!");
        location.href = "/room";
    });
})