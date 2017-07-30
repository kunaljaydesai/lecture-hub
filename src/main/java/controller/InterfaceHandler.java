package controller;

import model.Room;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    public ModelAndView getRoom(@PathVariable String roomId, @RequestParam(value="file", required=false) String pdf) {
        Application.logger.debug("Accessing room " + roomId + "...");
        Room r = Database.getRoom(new Room(roomId));
        ModelAndView roomView = new ModelAndView("index");
        roomView.addObject("id", roomId);
        pdf = "/files/" + pdf;
        roomView.addObject("src", pdf);
        return roomView;
    }

    @RequestMapping("/r/{roomId}/instructor")
    public ModelAndView getInstructorView(@PathVariable String roomId, @RequestParam(value="file", required=false) String pdf) {
        Room r = Database.getRoom(new Room(roomId));
        ModelAndView roomView = new ModelAndView("instructor");
        roomView.addObject("id", roomId);
        pdf = "/files/" + pdf;
        roomView.addObject("src", pdf);
        return roomView;
    }

}
