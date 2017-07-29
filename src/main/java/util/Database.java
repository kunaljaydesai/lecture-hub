package util;

import model.Message;
import org.apache.derby.jdbc.EmbeddedDriver;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

/**
 * Created by KunalDesai on 7/29/17.
 */
public class Database {

    public static Connection connection;
    private String connectionURL;

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
            statement.executeUpdate("CREATE TABLE Messages (ID INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1, INCREMENT BY 1)," +
                    "AUTHOR_NAME VARCHAR(155), ROOM_NUM INTEGER, MESSAGE VARCHAR(155))");
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
            Application.logger.debug("Inserted record " + m.toString());
        } catch (SQLException e) {
            e.printStackTrace();
            Application.logger.error(sqlStatement);
            Application.logger.error("Record didn't insert...");

        }
    }

}
