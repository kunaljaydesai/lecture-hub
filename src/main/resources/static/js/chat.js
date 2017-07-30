$(function() {
    var endpoint = "wss://x5xqvzll.api.satori.com";
    var appkey = "554F2EC95da36B82cD2fa7E6ddE442fE";
    var channelName = $("#info").data("channel");
    console.log(channelName);
    var authProvider;

    var client = new RTM(endpoint, appkey);

    client.on("enter-connected", function () {
        console.log('Connected to Satori RTM!');
    });

    var subscription = client.subscribe(channelName, RTM.SubscriptionMode.SIMPLE);

    subscription.on('rtm/subscription/data', function (pdu) {
        pdu.body.messages.forEach(function (msg) {
            console.log(msg);
            if (msg.question && $("#info").data("view") === "student") {
                loadQuiz(msg);
            } else {
                addThread(msg);
            }
            addThread(msg);
            console.log(JSON.parse(msg));
        });
    });

    client.start();

});

function loadQuiz(data) {
    $("#quiz").css("display", "block");
    $("#quiz-q").html(data.question);
    console.log(data.question);
    $container = $("#quiz-options");
    for (var option in data.options) {
        var $optionText = $("<div>", {"class": "quiz-option-text"});
        if (option == 0) {
            $optionText.html(data.options[option].slice(2, data.options[option].length - 1));
        } else if (option == data.options.length - 1) {
            $optionText.html(data.options[option].slice(1, data.options[option].length - 2));
        } else {
            $optionText.html(data.options[option].slice(1, data.options[option].length - 1));
        }
        var $quizOption = $("<div>", {"class": "quiz-option"});
        $quizOption.append($("<input>", {"id": option, "type": "checkbox","class": "quiz-select"}));

        console.log($optionText.html());
        $quizOption.append($optionText);
        $container.append($quizOption);
    }
}


function addThread(data) {
   var $thread = $("<div>", {"class": "thread-container"});
   var $content = $("<div>", {"class": "thread-content"});
   var $color = $("<div>", {"class": "thread-background"});
   $content.html(data.message);
   var $author = $("<div>", {"class": "thread-author"});
   $author.html(data.author);
   $thread.append($color)
        .append($author)
        .append($content);
   $("#discussion-content").append($thread);
//   $thread.velocity("fadeIn", {duration: 500});
}




