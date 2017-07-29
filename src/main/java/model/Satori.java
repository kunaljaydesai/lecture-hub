package model;

import com.google.common.util.concurrent.*;
import com.fasterxml.jackson.annotation.*;
import com.satori.rtm.*;
import com.satori.rtm.auth.*;
import com.satori.rtm.model.*;
import java.util.*;
import java.util.concurrent.*;

public class Satori {
    static private final String endpoint = "wss://x5xqvzll.api.satori.com";
    static private final String appkey = "554F2EC95da36B82cD2fa7E6ddE442fE";

    // Role and secret are optional: replace only if you need to authenticate.
    static private final String role = "YOUR_ROLE";
    static private final String roleSecretKey = "YOUR_SECRET";


    static private RtmClient client = null;


    public Satori() {
        final RtmClientBuilder builder = new RtmClientBuilder(endpoint, appkey)
                .setListener(new RtmClientAdapter() {
                    //  connection messages

                    @Override
                    public void onConnectingError(RtmClient client, Exception ex) {
                        String msg = String.format("RTM client failed to connect to '%s': %s",
                                endpoint, ex.getMessage());
                        System.out.println(msg);
                    }

                    @Override
                    public void onError(RtmClient client, Exception ex) {
                        String msg = String.format("RTM client failed: %s", ex.getMessage());
                        System.out.println(msg);
                    }

                    @Override
                    public void onEnterConnected(RtmClient client) {
                        System.out.println("Connected to Satori!");
                    }

                });


        //check if the role is set to authenticate or not
        boolean shouldAuthenticate = !"YOUR_ROLE".equals(role);
        if (shouldAuthenticate) {
            builder.setAuthProvider(new RoleSecretAuthProvider(role, roleSecretKey));
        }


        client = builder.build();
        if (client == null) {
            System.out.println("Client is NULL");
        }

        System.out.println(String.format(
                "RTM connection config:\n" +
                        "\tendpoint='%s'\n" +
                        "\tappkey='%s'\n" +
                        "\tauthenticate?=%b", endpoint, appkey, shouldAuthenticate));

        client.start();
    }

    public void publish(Message msg) {

        String channel = Integer.toString(msg.getRoomNumber());

        // At this point, the client may not yet be connected to Satori RTM.
        // If the client is not connected, the SDK internally queues the publish request and
        // will send it once the client connects
        ListenableFuture<Pdu<PublishReply>> reply = client.publish(channel, msg, Ack.YES);

        Futures.addCallback(reply, new FutureCallback<Pdu<PublishReply>>() {
            public void onSuccess(Pdu<PublishReply> publishReplyPdu) {
                System.out.println("Message is published: " + msg);
            }

            public void onFailure(Throwable t) {
                System.out.println("Publish request failed: " + t.getMessage());
            }
        });

    }


}
