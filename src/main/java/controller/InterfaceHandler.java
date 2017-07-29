package controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import util.Application;

/**
 * Created by KunalDesai on 7/29/17.
 */
@Controller
public class InterfaceHandler {

    @RequestMapping("/room")
    public ModelAndView getRoom() {
        Application.logger.debug("Accessed room...");
        ModelAndView room = new ModelAndView("index");
        return room;
    }

    @RequestMapping("/room/instructor")
    public ModelAndView getInstructorView() {
        Application.logger.debug("Accessed instructor view...");
        return new ModelAndView("instructor");
    }

}
