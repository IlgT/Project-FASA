package de.ilg.wg.expensetrackerbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = {"exchange.dao.entity", "expense.dao.entity", "income.dao.entity", "tag.dao.entity"})
@EnableJpaRepositories(basePackages = {"exchange.dao.api", "expense.dao.api", "income.dao.api", "tag.dao.api"})
public class ExpenseTrackerBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ExpenseTrackerBackendApplication.class, args);
	}

}