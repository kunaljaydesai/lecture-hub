package model;

/**
 * Created by KunalDesai on 7/29/17.
 */
public class Message {

    private String message;
    private String author;

    public Message(String msg, String author) {
        this.message = msg;
        this.author = author;
    }

    public void pushToDatabase() {
        //TODO: push to database
    }

}
