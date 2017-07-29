package controller;

import model.Message;
import model.Room;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by KunalDesai on 7/29/17.
 */
@RestController
public class ChatHandler {

    @RequestMapping("/")
    public String index() {
        return "Greetings from Spring Boot!";
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
