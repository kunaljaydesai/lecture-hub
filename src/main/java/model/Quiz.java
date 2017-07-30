package model;

import util.Database;

import java.util.List;

/**
 * Created by KunalDesai on 7/30/17.
 */
public class Quiz implements SatoriPublisher {

    private String question;
    private List<String> options;
    private String id;
    private String roomName;

    public Quiz(String question, List<String> options, String roomName) {
        this.question = question;
        this.options = options;
        this.id = Database.generateRandomString(8);
        this.roomName = roomName;
    }

    public String getRoomName() {
        return roomName;
    }

    public String getQuestion() {
        return question;
    }

    public List<String> getOptions() {
        return options;
    }

    public String getId() {
        return id;
    }
}
