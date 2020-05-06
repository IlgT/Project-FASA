package de.ilg.wg.expensetrackerbackend.exchange.service.impl;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.ilg.wg.expensetrackerbackend.exchange.adapter.api.ExchangeAdapter;
import de.ilg.wg.expensetrackerbackend.exchange.adapter.api.ExchangeResponse;
import de.ilg.wg.expensetrackerbackend.exchange.dao.api.ExchangeDao;
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
		return exchangeResponse.getRates().keySet();
	}

	@Override
	public BigDecimal getExchangeRateToTargetCurrency(String baseCurrency, LocalDate date,
			String targetCurrency) {
		BigDecimal exchangeRate = getExchangeRateFromDatabase(baseCurrency, date, targetCurrency);
		if (isPresentInDatabase(exchangeRate)) {
			exchangeRate = getExchangeRateForTargetCurrencyFromExternalSystem(baseCurrency, date, targetCurrency);
		}
		return exchangeRate;
	}

	@Override
	public BigDecimal getExchangeRateToDefaultCurrency(String baseCurrency, LocalDate date) {
		BigDecimal exchangeRate = getExchangeRateFromDatabase(baseCurrency, date, getDefaultCurrency());
		if (isPresentInDatabase(exchangeRate)) {
			exchangeRate = getExchangeRateForDefaultCurrencyFromExternalSystem(date, baseCurrency);
		}
		return exchangeRate;
	}

	@Override
	public String getDefaultCurrency() {
		return "EUR";
	}

	private boolean isPresentInDatabase(BigDecimal exchangeRate) {
		return exchangeRate != null;
	}

	private BigDecimal getExchangeRateForTargetCurrencyFromExternalSystem(String baseCurrency, LocalDate date,
			String targetCurrency) {
		BigDecimal exchangeRate = exchangeAdapter.getExchangeRateInDefaultCurrency(baseCurrency, date).getRates()
				.get(targetCurrency);
		return exchangeRate;
	}

	private BigDecimal getExchangeRateFromDatabase(String baseCurrency, LocalDate date, String targetCurrency) {
		BigDecimal exchangeRate = exchangeDao.findByBaseAndTargetAndDate(baseCurrency, targetCurrency, date).getRate();
		return exchangeRate;
	}

	private BigDecimal getExchangeRateForDefaultCurrencyFromExternalSystem(LocalDate date, String baseCurrency) {
		BigDecimal exchangeRate = exchangeAdapter.getExchangeRateInDefaultCurrency(baseCurrency, date).getRates()
				.get(getDefaultCurrency());
		return exchangeRate;
	}
}
