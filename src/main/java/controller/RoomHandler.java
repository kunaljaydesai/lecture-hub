package controller;

import model.Room;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import util.Database;

/**
 * Created by KunalDesai on 7/29/17.
 */
@RestController
public class RoomHandler {

    @RequestMapping("/api/addRoom")
    public Room addRoom() {
        Room r = new Room(Database.generateRandomString(8));
        r.pushToDatabase();
        return r;
    }

}
