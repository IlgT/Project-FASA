package de.ilg.wg.expensetrackerbackend.exchange.adapter.impl;

import java.time.LocalDate;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import de.ilg.wg.expensetrackerbackend.exchange.adapter.api.ExchangeAdapter;
import de.ilg.wg.expensetrackerbackend.exchange.adapter.api.ExchangeResponse;

@Component
public class ExchangeRatesAdapterImpl implements ExchangeAdapter{
	
	private static final String BASE_URL = "https://api.exchangeratesapi.io/";
	
	private static final String LATEST = "latest";
	
	private static final String BASE_CURRENCY_REQUEST = "?base=";
	
	private static final String SOURCE_CURRENCY_REQUEST = "&symbols=";
	
	private static final String EUR_SYMBOL = "EUR";
	
	public ExchangeResponse getExchangeRateInDefaultCurrency(String baseCurrency, LocalDate date) {
		return getExchangeRate(baseCurrency, date, EUR_SYMBOL);
	}
	
	public ExchangeResponse getExchangeRate(String baseCurrency, LocalDate date, String targetCurrency) {
        RestTemplate restTemplate = new RestTemplate();
        String url = BASE_URL + getDateInformation(date)
        		+ BASE_CURRENCY_REQUEST + baseCurrency;
        if (targetCurrency != null) {
        		url = url + SOURCE_CURRENCY_REQUEST + targetCurrency;
        }
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