package util;

import model.Message;
import model.Room;
import org.apache.derby.jdbc.EmbeddedDriver;

import java.sql.*;
import java.util.Properties;

/**
 * Created by KunalDesai on 7/29/17.
 */
public class Database {

    public static Connection connection;
    private String connectionURL;
    private static final String ALPHA_NUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    public Database(String connectionURL) {
        this.connectionURL = connectionURL;
    }

    public void connect() throws SQLException {
        EmbeddedDriver driver = new EmbeddedDriver();
        connection = driver.connect(connectionURL, new Properties());
    }

    public void createTables() {
        try {
            Statement statement = connection.createStatement();
            statement.addBatch("CREATE TABLE ROOMS (ID INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1, INCREMENT BY 1)," +
                    "ROOM_NAME VARCHAR(155))");
            statement.addBatch("CREATE TABLE MESSAGES (ID INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1, INCREMENT BY 1)," +
                    "AUTHOR_NAME VARCHAR(155), ROOM_NUM INTEGER, MESSAGE VARCHAR(155))");
            statement.executeBatch();
        } catch (SQLException e) {
            e.printStackTrace();
            Application.logger.debug("Table already exists...");
        }
    }

    public static void addMessage(Message m) {
        String sqlStatement = "INSERT INTO MESSAGES " +
                "(AUTHOR_NAME, ROOM_NUM, MESSAGE) VALUES ('" +
                m.getAuthor() + "', " + m.getRoomNumber() + ", '" + m.getMessage() + "')";
        try {
            Statement statement = connection.createStatement();
            statement.executeUpdate(sqlStatement);
            Application.logger.debug("Inserted record " + m.toString() + " into MESSAGES");
        } catch (SQLException e) {
            e.printStackTrace();
            Application.logger.error(sqlStatement);
            Application.logger.error("Record didn't insert...");

        }
    }

    public static Room addRoom(Room r) {
        String sqlStatement = "INSERT INTO ROOMS " +
                "(ROOM_NAME) VALUES ('" +
                r.getName() + "')";
        try {
            Statement statement = connection.createStatement();
            int id = statement.executeUpdate(sqlStatement);
            r.setId(id);
            Application.logger.debug("Inserted record " + r.toString() + " into ROOMS");
            return r;
        } catch (SQLException e) {
            e.printStackTrace();
            Application.logger.error(sqlStatement);
            Application.logger.error("Record didn't insert...");
        }
        return null;
    }

    public static String generateRandomString(int count) {
        StringBuilder builder = new StringBuilder();
        while (count-- != 0) {
            int character = (int)(Math.random()*ALPHA_NUMERIC_STRING.length());
            builder.append(ALPHA_NUMERIC_STRING.charAt(character));
        }
        return builder.toString();
    }

}
