package de.ilg.wg.expensetrackerbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = {"de.ilg.wg.expensetrackerbackend.exchange.dao.entity", "de.ilg.wg.expensetrackerbackend.expense.dao.entity", "de.ilg.wg.expensetrackerbackend.income.dao.entity", "de.ilg.wg.expensetrackerbackend.tag.dao.entity"})
@EnableJpaRepositories(basePackages = {"de.ilg.wg.expensetrackerbackend.exchange.dao.api", "de.ilg.wg.expensetrackerbackend.expense.dao.api", "de.ilg.wg.expensetrackerbackend.income.dao.api", "de.ilg.wg.expensetrackerbackend.tag.dao.api"})
public class ExpenseTrackerBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ExpenseTrackerBackendApplication.class, args);
	}

}