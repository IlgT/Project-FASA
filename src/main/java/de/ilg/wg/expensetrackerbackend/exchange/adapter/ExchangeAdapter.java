package de.ilg.wg.expensetrackerbackend.exchange.adapter;

import org.springframework.web.client.RestTemplate;

public class ExchangeAdapter {
	
	private static final String BASE_URL = "http://data.fixer.io/api/latest?access_key=";
	
	private static final String API_KEY = "0764b22840dae9de5fde3e719ae211c2";
	
	private static final String BASE_CURRENCY_REQUEST = "&base=";
	
	public ExchangeResponse getAllExchangeRates(String baseCurrency) {
        RestTemplate restTemplate = new RestTemplate();
        String url = BASE_URL + API_KEY + BASE_CURRENCY_REQUEST + baseCurrency;
        ExchangeResponse exchange = restTemplate.getForObject(url, ExchangeResponse.class);
        return exchange;
	}

}
