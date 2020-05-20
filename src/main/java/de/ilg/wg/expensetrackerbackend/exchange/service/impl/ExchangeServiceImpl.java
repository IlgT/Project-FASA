package de.ilg.wg.expensetrackerbackend.exchange.service.impl;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.ilg.wg.expensetrackerbackend.exchange.adapter.api.ExchangeAdapter;
import de.ilg.wg.expensetrackerbackend.exchange.adapter.api.ExchangeResponse;
import de.ilg.wg.expensetrackerbackend.exchange.dao.api.ExchangeDao;
import de.ilg.wg.expensetrackerbackend.exchange.dao.entity.Exchange;
import de.ilg.wg.expensetrackerbackend.exchange.service.api.ExchangeService;

@Service
public class ExchangeServiceImpl implements ExchangeService {

	@Autowired
	private ExchangeAdapter exchangeAdapter;

	@Autowired
	private ExchangeDao exchangeDao;

	@Override
	public Set<String> getAllCurrencies() {
		ExchangeResponse exchangeResponse = exchangeAdapter.getExchangeRate(getDefaultCurrency(), LocalDate.now(),
				null);
		Set<String> currencies = new HashSet<>();
		currencies.addAll(exchangeResponse.getRates().keySet());
		currencies.add(getDefaultCurrency());
		return currencies;
	}

	@Override
	public BigDecimal getExchangeRateToTargetCurrency(String baseCurrency, LocalDate date,
			String targetCurrency) {
		BigDecimal exchangeRate = getExchangeRateFromDatabase(baseCurrency, date, targetCurrency);
		if (isNotPresentInDatabase(exchangeRate)) {
			exchangeRate = getExchangeRateForTargetCurrencyFromExternalSystem(baseCurrency, date, targetCurrency);
		}
		return exchangeRate;
	}

	@Override
	public BigDecimal getExchangeRateToDefaultCurrency(String baseCurrency, LocalDate date) {
		if(getDefaultCurrency().equals(baseCurrency)) {
			return BigDecimal.ONE;
		}
		BigDecimal exchangeRate = getExchangeRateFromDatabase(baseCurrency, date, getDefaultCurrency());
		if (isNotPresentInDatabase(exchangeRate)) {
			exchangeRate = getExchangeRateForDefaultCurrencyFromExternalSystem(date, baseCurrency);
		}
		return exchangeRate;
	}

	@Override
	public String getDefaultCurrency() {
		return "EUR";
	}

	private boolean isNotPresentInDatabase(BigDecimal exchangeRate) {
		return exchangeRate == null;
	}

	private BigDecimal getExchangeRateForTargetCurrencyFromExternalSystem(String baseCurrency, LocalDate date,
			String targetCurrency) {
		BigDecimal exchangeRate = exchangeAdapter.getExchangeRateInDefaultCurrency(baseCurrency, date).getRates()
				.get(targetCurrency);
		return exchangeRate;
	}

	private BigDecimal getExchangeRateFromDatabase(String baseCurrency, LocalDate date, String targetCurrency) {
		Exchange exchange = exchangeDao.findByBaseAndTargetAndDate(baseCurrency, targetCurrency, date);
		return exchange != null ? exchange.getRate() : null;
	}

	private BigDecimal getExchangeRateForDefaultCurrencyFromExternalSystem(LocalDate date, String baseCurrency) {
		BigDecimal exchangeRate = exchangeAdapter.getExchangeRateInDefaultCurrency(baseCurrency, date).getRates()
				.get(getDefaultCurrency());
		return exchangeRate;
	}
}