package de.ilg.wg.expensetrackerbackend.exchange.facade.api;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

public interface ExchangeFacade {

	public Set<String> getAllCurrencies();

	public BigDecimal getExchangeRateToTargetCurrency(String baseCurrency, LocalDate date, String targetCurrency);

	public BigDecimal getExchangeRateToDefaultCurrency(LocalDate date, String baseCurrency);

	public String getDefaultCurrency();
}
