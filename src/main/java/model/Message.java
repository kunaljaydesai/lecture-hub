package model;

import util.Database;

/**
 * Created by KunalDesai on 7/29/17.
 */
public class Message implements SatoriPublisher {

    private String message;
    private String author;
    private String roomName;
    private int slideNumber;
    private String article = "";
    private String subject = "";

    public Message(String roomName, String msg, String author, int slideNumber, String subject) {
        this.message = msg;
        this.author = author;
        this.roomName = roomName;
        this.slideNumber = slideNumber;
        this.subject = subject;
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

    public String getArticle() {
        return article;
    }

    public String getSubject() {
        return subject;
    }

    public void addArticle(String article) {
        this.article = article;
    }

    @Override
    public String toString() {
        return "(" + getAuthor() + ", " + getRoomName() + ", " + getMessage() + ", " + getSlideNumber() + ", " + getArticle() + ")";
    }
}
