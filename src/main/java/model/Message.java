package model;

import util.Database;

/**
 * Created by KunalDesai on 7/29/17.
 */
public class Message {

    private String message;
    private String author;
    private int roomNumber;

    public Message(int roomNumber, String msg, String author) {
        this.message = msg;
        this.author = author;
        this.roomNumber = roomNumber;
    }

    public void pushToDatabase() {
        Database.addMessage(this);
    }

    public String getMessage() {
        return message;
    }

    public String getAuthor() {
        return author;
    }

    public int getRoomNumber() {
        return roomNumber;
    }

    @Override
    public String toString() {
        return "(" + getAuthor() + ", " + getRoomNumber() + ", " + getMessage() + ")";
    }
}
