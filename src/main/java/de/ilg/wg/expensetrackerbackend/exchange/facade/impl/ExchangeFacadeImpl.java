package de.ilg.wg.expensetrackerbackend.exchange.facade.impl;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;

import de.ilg.wg.expensetrackerbackend.exchange.facade.api.ExchangeFacade;
import de.ilg.wg.expensetrackerbackend.exchange.service.api.ExchangeService;

public class ExchangeFacadeImpl implements ExchangeFacade {

	@Autowired
	private ExchangeService exchangeService;

	@Override
	public Set<String> getAllCurrencies() {
		return exchangeService.getAllCurrencies();
	}

	@Override
	public BigDecimal getExchangeRateToTargetCurrency(String baseCurrency, LocalDate date,
			String targetCurrency) {
		return exchangeService.getExchangeRateToTargetCurrency(baseCurrency, date, targetCurrency);
	}

	@Override
	public BigDecimal getExchangeRateToDefaultCurrency(LocalDate date, String baseCurrency) {
		return exchangeService.getExchangeRateToDefaultCurrency(baseCurrency, date);
	}

	@Override
	public String getDefaultCurrency() {
		return exchangeService.getDefaultCurrency();
	}

}
