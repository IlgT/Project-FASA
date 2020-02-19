package de.ilg.wg.expensetrackerbackend.exchange.adapter;

import java.time.LocalDate;

import org.springframework.web.client.RestTemplate;

public class ExchangeAdapter {
	
	private static final String BASE_URL = "http://data.fixer.io/api/";
	
	private static final String LATEST = "latest";
	
	private static final String API_KEY = "?access_key=0764b22840dae9de5fde3e719ae211c2";
	
	private static final String BASE_CURRENCY_REQUEST = "&base=";
	
	public ExchangeResponse getAllExchangeRates(String baseCurrency, LocalDate date) {
        RestTemplate restTemplate = new RestTemplate();
        String url = BASE_URL + getDateInformation(date) + API_KEY
        		+ BASE_CURRENCY_REQUEST + baseCurrency;
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
