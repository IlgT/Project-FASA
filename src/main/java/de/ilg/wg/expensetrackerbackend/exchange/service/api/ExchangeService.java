package de.ilg.wg.expensetrackerbackend.exchange.service.api;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

public interface ExchangeService {

	public Set<String> getAllCurrencies();

	public BigDecimal getExchangeRateToTargetCurrency(String baseCurrency, LocalDate date, String targetCurrency);

	public BigDecimal getExchangeRateToDefaultCurrency(String baseCurrency, LocalDate date);

	public String getDefaultCurrency();
}
