package controller;

import model.Message;
import model.Room;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import model.Satori;
/**
 * Created by KunalDesai on 7/29/17.
 */
@RestController
public class ChatHandler {

    /*
        In the parameters, given a message, author name, and room id publish the message to satori
     */
    @RequestMapping("/api/addMessage")
    public String publishMessage(@RequestParam(value="msg", required=true) String message, @RequestParam(value="author", required=true)
            String author, @RequestParam(value="room", required=true) String roomName, @RequestParam(value="slide", required=true) int slideNum) {
        Message m = new Message(roomName, message, author, slideNum);

        Satori s = new Satori();
        s.publish(m);

        m.pushToDatabase();

        return "worked";
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
