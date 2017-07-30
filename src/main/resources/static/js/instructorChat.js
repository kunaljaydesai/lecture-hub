$(document).ready(function() {
    var endpoint = "wss://x5xqvzll.api.satori.com";
        var appkey = "554F2EC95da36B82cD2fa7E6ddE442fE";
        var channelName = $("#info").data("channel");
        console.log(channelName);
        var authProvider;

        var client = new RTM(endpoint, appkey);

        client.on("enter-connected", function () {
            console.log('Connected to Satori RTM! - Instructor');
        });

        var subscription = client.subscribe(channelName, RTM.SubscriptionMode.SIMPLE);

        subscription.on('rtm/subscription/data', function (pdu) {
            pdu.body.messages.forEach(function (msg) {
                console.log("Received message: " + msg);
                if ('response' in msg) {
                    console.log("Response is in message");
                    var option = msg.response;
                    console.log("Option chosen is: " + option);
                    if (option in optionsVal) {
                        optionsVal[option] = optionsVal[option] + 1;
                    } else {
                        optionsVal[option] = 1;
                        addTopic(topic);
                    }
                } else {

                }
            });
        });

        client.start();

});

function  addTopic(topic) {
    var $topicCont = $("<div>", {"class": "topics-container"});
    var $topicBg = $("<div>", {"class": "topic-background"});
    var $topic = $("<h5>", {"class": "topic"});
    var $topicCount = $("<h5>", {"class": "topic"}).addClass("counter");
    $topicCount.html("1");

    $topicCont.append($topicBg)
            .append($topic)
            .append($topicCount);
    $("#all-chat").append($topicCont);
}