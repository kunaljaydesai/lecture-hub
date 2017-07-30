$(document).ready(function() {
    var fileUploadName = "test.pdf";
    $("#button1").on('click', function() {
        $('.ui.basic.modal').modal('show');
    });

    $("#create-button").on('click', function() {
        fileUploadName = $("#lecture-upload").val();
        var formData = new FormData();
        formData.append("file", $("#lecture-upload")[0].files[0]);
        console.log("FILE " + $("#lecture-upload")[0].files[0]);
        $.ajax({
           url: "/files",
           type: "POST",
           data: formData,
           processData: false,
           contentType: false,
           success: function(response) {
               console.log(response);
               $.ajax({ type: 'GET',
                   url: '/api/addRoom',
                   datatype:'json',
                   success : function(data)
                   {
                       fileUploadName = fileUploadName.replace(/^.*[\\\/]/, '')
                       console.log("FILE NAME: " + fileUploadName);
                       var room = data.name;
                       location.href = "/r/" + room + "/instructor?file=" + fileUploadName;
                   }
               });
           },
           error: function(jqXHR, textStatus, errorMessage) {
               console.log(errorMessage); // Optional
           }
        });


    });

    $("#button2").on('click', function() {
        location.href = "/";
    });
    $(".learnbutton").on('click', function() {
        location.href = "/";
    });
})