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
            addPost(msg);
        });
    });



    client.start();

});



function addPost(data) {
   var $post = $("<div>", {"class": "post-container"});
   var $content = $("<div>", {"class": "post-content"});
   $content.html(data.message);
   var $author = $("<div>", {"class": "post-sender"});
   $author.html(data.author);
   $post.append($author)
        .append($content);
   $("#discussion-content").append($post);
}

