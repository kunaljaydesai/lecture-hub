package controller;

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

}
