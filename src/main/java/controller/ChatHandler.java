package controller;

import model.*;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import util.Application;

import java.net.URL;
import java.io.BufferedReader;
import java.io.InputStreamReader;

import java.net.HttpURLConnection;
import java.util.List;

/**
 * Created by KunalDesai on 7/29/17.
 */
@RestController
public class ChatHandler {

    @RequestMapping("/api/chat/addMessage")
    public Message publishMessage(@RequestParam(value="msg", required=true) String message, @RequestParam(value="author", required=true)
            String author, @RequestParam(value="room", required=true) String roomName, @RequestParam(value="slide", required=true) int slideNum) throws Exception{
        Message m = new Message(roomName, message, author, slideNum);

        boolean question = false;
        for (int i = 0; i < message.length(); i++) {
            char c = message.charAt(i);

            // if question is being asked, find relevant article
            if (c == '?') {
                question = true;
            }
        }

        if (question) {
            String apikey = "AIzaSyBNxGMxfuqGqb0UojILPNpVQLc4QN4m064";
            String engineID = "001563739986655026708:t2exokv1gjg";

            message.replace(" ", "%20");

            URL url = new URL("https://cse.google.com:443/cse/publicurl" +
                    "?key=" + apikey +
                    "&cx=" + engineID +
                    "&q=" + message);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Accept", "application/json");

            BufferedReader br = new BufferedReader(new InputStreamReader(
                    (connection.getInputStream())));

            String result;
            String article = "";

            while ((result = br.readLine()) != null) {

                if(result.contains("\"link\": \"")){
                    article=result.substring(result.indexOf("\"link\": \"")+("\"link\": \"").length(), result.indexOf("\","));
                    System.out.println(article);
                    break;
                }
            }
            connection.disconnect();

            m.addArticle(article);
        }
        Application.s.publish(m);
        m.pushToDatabase();
        return m;
    }

    @RequestMapping("/api/chat/{roomId}/addQuiz")
    public Quiz addQuiz(@PathVariable String roomId, @RequestParam(value="question") String question, @RequestParam(value="options", required=false) List<String> options) {
        Quiz q = new Quiz(question, options, roomId);
        Application.s.publish(q);
        return q;
    }

    @RequestMapping("/api/chat/{roomId}/quizResponse")
    public QuizResponse addQuizResponse(@PathVariable String roomId, @RequestParam(value="id") String id, @RequestParam(value="response") String response) {
        QuizResponse qr = new QuizResponse(id, response, roomId);
        Application.s.publish(qr);
        return qr;
    }

    @RequestMapping("/test/addingMessage")
    public String addMessage() {
        Message m = new Message("abc", "test", "test", 1);
        m.pushToDatabase();
        return "worked";
    }

    @RequestMapping("/test/addingRoom")
    public String addRoom() {
        Room r = new Room("a");
        r.pushToDatabase();
        return "worked";
    }

}
