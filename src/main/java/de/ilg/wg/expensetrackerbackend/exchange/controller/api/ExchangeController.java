package de.ilg.wg.expensetrackerbackend.exchange.controller.api;

import java.util.Set;

public interface ExchangeController {
	
	public Set<String> getAllCurrencies();
	
	public String getDefaultCurrency();

}
