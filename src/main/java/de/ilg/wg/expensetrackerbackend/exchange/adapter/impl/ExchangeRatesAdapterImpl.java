package de.ilg.wg.expensetrackerbackend.exchange.adapter.impl;

import java.time.LocalDate;

import org.springframework.web.client.RestTemplate;

import de.ilg.wg.expensetrackerbackend.exchange.adapter.api.ExchangeAdapter;
import de.ilg.wg.expensetrackerbackend.exchange.adapter.api.ExchangeResponse;

public class ExchangeRatesAdapterImpl implements ExchangeAdapter{
	
	private static final String BASE_URL = "https://api.exchangeratesapi.io/";
	
	private static final String LATEST = "latest";
	
	private static final String BASE_CURRENCY_REQUEST = "?base=";
	
	private static final String SOURCE_CURRENCY_REQUEST = "&symbols=";
	
	private static final String EUR_SYMBOL = "EUR";
	
	public ExchangeResponse getAllExchangeRates(String baseCurrency, LocalDate date) {
        RestTemplate restTemplate = new RestTemplate();
        String url = BASE_URL + getDateInformation(date)
        		+ BASE_CURRENCY_REQUEST + baseCurrency
        		+ SOURCE_CURRENCY_REQUEST + EUR_SYMBOL;
        ExchangeResponse exchange = restTemplate.getForObject(url, ExchangeResponse.class);
        return exchange;
	}
	
	private String getDateInformation(LocalDate date) {
		if (date == null || date.equals(LocalDate.now())) {
			return LATEST;
		}
		return date.toString();
	}
}
