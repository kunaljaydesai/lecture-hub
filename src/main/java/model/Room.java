package model;

import util.Database;

/**
 * Created by KunalDesai on 7/29/17.
 */
public class Room {

    private String name;
    private int id;

    public Room(String roomName) {
        this.name = roomName;
    }

    public void pushToDatabase() {
        Database.addRoom(this);
    }

    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        return "(" + name + ")";
    }

    public void setId(int id) {
        this.id = id;
    }

}
