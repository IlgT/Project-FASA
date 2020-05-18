package de.ilg.wg.expensetrackerbackend.common.configuration;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = {"de.ilg.wg.expensetrackerbackend.exchange.controller.impl", "de.ilg.wg.expensetrackerbackend.expense.controller.impl", "de.ilg.wg.expensetrackerbackend.tag.controller.impl", "de.ilg.wg.expensetrackerbackend.filter.controller.impl"})
public class CorsConfiguration implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
        .allowedOrigins("http://localhost:4200")
        .allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}
