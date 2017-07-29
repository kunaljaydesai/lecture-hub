package model;

import util.Database;

import java.sql.ResultSet;
import java.sql.SQLException;

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

    public static Room fromResultSet(ResultSet rs) throws SQLException{
        Room r = new Room(rs.getString("ROOM_NAME"));
        r.setId(rs.getInt("ID"));
        return r;
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
