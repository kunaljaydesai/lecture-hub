package model;

import util.Database;

/**
 * Created by KunalDesai on 7/29/17.
 */
public class Message {

    private String message;
    private String author;
    private String roomName;
    private int slideNumber;

    public Message(String roomName, String msg, String author, int slideNumber) {
        this.message = msg;
        this.author = author;
        this.roomName = roomName;
        this.slideNumber = slideNumber;
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

    public String getRoomName() {
        return roomName;
    }

    public int getSlideNumber() {
        return slideNumber;
    }

    @Override
    public String toString() {
        return "(" + getAuthor() + ", " + getRoomName() + ", " + getMessage() + ", " + getSlideNumber() + ")";
    }
}
