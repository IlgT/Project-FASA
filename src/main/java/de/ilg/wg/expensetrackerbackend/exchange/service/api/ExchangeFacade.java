package de.ilg.wg.expensetrackerbackend.exchange.service.api;

import java.math.BigDecimal;
import java.util.List;

public interface ExchangeFacade {

	public List<String> getAllCurrencies();
	
	public BigDecimal getExchangeRate(String baseCurrency);
	
	public BigDecimal getPriceInDefaultCurrency(BigDecimal expenseValue, String baseCurrency);
	
	public String getDefaultCurrency();	
}
