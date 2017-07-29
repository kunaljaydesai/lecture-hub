package util;

import org.apache.log4j.BasicConfigurator;
import org.apache.log4j.Logger;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import java.sql.SQLException;

import model.Message;
import model.Satori;

@SpringBootApplication
@ComponentScan(basePackages = {"controller"})
public class Application {

    public static Logger logger = Logger.getLogger(Application.class);

    public static void main(String[] args) throws SQLException {
        BasicConfigurator.configure();
//        Database db = new Database("jdbc:derby:lecturehub");
//        db.connect();
//        db.createTables();
//        SpringApplication.run(Application.class, args);

        Message m = new Message(1, "hello", "anthony");
        Message m2 = new Message(2, "he", "ant");
        Message m3 = new Message(1, "hdsdfad", "andrew");
        Message m4 = new Message( 4, "kunal", "kunal");
        Message m5 = new Message(2, "test", "and");

        Satori s = new Satori();
        s.publish(m);
        s.publish(m2);
        s.publish(m3);
        s.publish(m4);
        s.publish(m5);
    }

}