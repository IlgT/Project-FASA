package de.ilg.wg.expensetrackerbackend.exchange.service.impl;

import java.math.BigDecimal;
import java.util.List;

import de.ilg.wg.expensetrackerbackend.exchange.service.api.ExchangeService;

public class ExchangeServiceImpl implements ExchangeService {

	@Override
	public List<String> getAllCurrencies() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public BigDecimal getExchangeRate(String baseCurrency) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public BigDecimal getPriceInDefaultCurrency(BigDecimal expenseValue, String baseCurrency) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getDefaultCurrency() {
		// TODO Auto-generated method stub
		return null;
	}

}
