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
        console.log("came");
        pdu.body.messages.forEach(function (msg) {
            console.log("Message: " + msg);
            if ( $("#info").data("view") === "student" && msg.options) {
                loadQuiz(msg);
            } else if (msg.response) {
                return;
            } else {
                addThread(msg);
            }
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
        var text;
        if (option == 0) {
            text = data.options[option].slice(2, data.options[option].length - 1);
        } else if (option == data.options.length - 1) {
            text = data.options[option].slice(1, data.options[option].length - 2);
        } else {
            text = data.options[option].slice(1, data.options[option].length - 1);
        }
        text = text.replace('"', '');
        text = text.replace("[", '');
        text = text.replace("]", '');
        $optionText.html(text);
        var $quizOption = $("<div>", {"class": "quiz-option"});
        $quizOption.append($("<input>", {"id": text, "type": "checkbox","class": "quiz-select"}));

        console.log($optionText.html());
        $quizOption.append($optionText);
        $container.append($quizOption);
    }
}


function addThread(data) {
    var $thread = $("<div>", {"class": "thread-container"});
    var $subject = $("<div>", {"class": "thread-subject"});
    var $content = $("<div>", {"class": "thread-content"});
    var $color = $("<div>", {"class": "thread-background"});
    var $status = $("<div>", {"class": "thread-status"});
    $status.data("read");

    $content.html(data.message);
    var $author = $("<div>", {"class": "thread-author"});
    $author.html(data.author);
    $subject.html(data.subject);
    $thread.append($color)
            .append($author)
            .append($subject)
            .append($status)
            .append($content);
    $("#discussion-content").append($thread);
   $thread.velocity("fadeIn", {duration: 500});
}


