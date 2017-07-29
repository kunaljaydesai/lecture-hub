package controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by KunalDesai on 7/29/17.
 */
@Controller
public class InterfaceHandler {

    @RequestMapping("/room")
    public ModelAndView getRoom() {
        System.out.println("Accessed room...");
        ModelAndView model = new ModelAndView("index");
        model.addObject("name", "angel");
        return model;
    }

}
