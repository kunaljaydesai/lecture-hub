$(function() {
    var endpoint = "wss://x5xqvzll.api.satori.com";
    var appkey = "554F2EC95da36B82cD2fa7E6ddE442fE";
    var channelName = $("#info").data("channel");
    console.log(channelName);
    var authProvider;

    var client = new RTM(endpoint, appkey);

    client.on("enter-connected", function () {
        addPost("Connected to Satori RTM!");
        console.log('Connected to Satori RTM!');
    });

    var subscription = client.subscribe(channelName, RTM.SubscriptionMode.SIMPLE);

    subscription.on("enter-connected", function () {
        console.log("subscribed baby");
    });



    client.start();

});

function addPost(text) {
   var post = "<div>" + text + "</div>";
   console.log(post);
   $("#discussion-content").append(post);
}

