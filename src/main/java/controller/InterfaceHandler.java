package controller;

import model.Room;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import util.Application;
import util.Database;

/**
 * Created by KunalDesai on 7/29/17.
 */
@Controller
public class InterfaceHandler {

    @RequestMapping("/")
    public ModelAndView getHome() {
        Application.logger.debug("Accessed home view...");
        return new ModelAndView("home");
    }


    @RequestMapping("/r/{roomId}")
    public ModelAndView getRoom(@PathVariable String roomId) {
        Application.logger.debug("Accessing room " + roomId + "...");
        Room r = Database.getRoom(new Room(roomId));
        Application.logger.debug("Room is " + r.toString());
        if (r == null) {
            Application.logger.debug("Couldn't find room " + roomId);
            return new ModelAndView("error");
        }
        ModelAndView roomView = new ModelAndView("index");
        roomView.addObject("id", roomId);
        return roomView;
    }

    @RequestMapping("/room/instructor")
    public ModelAndView getInstructorView() {
        Application.logger.debug("Accessed instructor view...");
        return new ModelAndView("instructor");
    }

}
