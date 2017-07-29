package controller;

import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by KunalDesai on 7/29/17.
 */
public class InterfaceHandler {

    @RequestMapping("/home")
    public String index() {
        return "Greetings from Spring Boot!";
    }

}
