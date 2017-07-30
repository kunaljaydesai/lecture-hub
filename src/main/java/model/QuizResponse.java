package model;

/**
 * Created by KunalDesai on 7/30/17.
 */
public class QuizResponse implements SatoriPublisher {

    private String id;
    private String response;
    private String roomName;

    public QuizResponse(String id, String response, String roomId) {
        this.id = id;
        this.response = response;
        this.roomName = roomId;
    }

    public String getRoomName() {
        return roomName;
    }
}
