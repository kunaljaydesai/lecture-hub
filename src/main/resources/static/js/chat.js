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
            addThread(msg);
            console.log(msg);
        });
    });

    client.start();

});



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




