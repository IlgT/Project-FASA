package de.ilg.wg.expensetrackerbackend.common.configuration;

import org.modelmapper.ModelMapper;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@EntityScan(basePackages = {"de.ilg.wg.expensetrackerbackend.exchange.dao.entity", "de.ilg.wg.expensetrackerbackend.expense.dao.entity", "de.ilg.wg.expensetrackerbackend.tag.dao.entity"})
@EnableJpaRepositories(basePackages = {"de.ilg.wg.expensetrackerbackend.exchange.dao.api", "de.ilg.wg.expensetrackerbackend.expense.dao.api", "de.ilg.wg.expensetrackerbackend.tag.dao.api"})
@Configuration
public class AppConfiguration {
	
	@Bean
	public ModelMapper modelMapper() {
	    return new ModelMapper();
	}
}