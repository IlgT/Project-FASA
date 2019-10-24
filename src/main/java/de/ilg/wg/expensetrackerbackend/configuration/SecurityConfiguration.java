package de.ilg.wg.expensetrackerbackend.configuration;

import org.h2.server.web.WebServlet;

import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * Configuring the H2 console for debugging purpose.
 */
@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		httpSecurity.authorizeRequests().antMatchers("/h2-console/**").permitAll();

		httpSecurity.csrf().disable();
		httpSecurity.headers().frameOptions().disable();
	}

	@Bean
	public ServletRegistrationBean<WebServlet> h2servletRegistration() {
	    ServletRegistrationBean<WebServlet> registration = new ServletRegistrationBean<>(new WebServlet());
	    registration.addUrlMappings("/h2-console/*");
	    return registration;
	}
	
}
