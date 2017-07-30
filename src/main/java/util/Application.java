package util;

import model.storage.StorageProperties;
import model.storage.StorageService;
import org.apache.log4j.BasicConfigurator;
import org.apache.log4j.Logger;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import java.sql.SQLException;

@SpringBootApplication
@ComponentScan(basePackages = {"controller", "model.storage"})
@EnableConfigurationProperties(StorageProperties.class)
public class Application {

    public static Logger logger = Logger.getLogger(Application.class);

    public static void main(String[] args) throws SQLException {
        BasicConfigurator.configure();
        Database db = new Database("jdbc:derby:lecturehub;create=true");
        db.connect();
        db.createTables();
        SpringApplication.run(Application.class, args);

    }

    @Bean
    CommandLineRunner init(StorageService storageService) {
        return (args) -> {
            storageService.deleteAll();
            storageService.init();
        };
    }

}