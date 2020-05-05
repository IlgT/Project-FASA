package de.ilg.wg.expensetrackerbackend.exchange.adapter.api;

import java.time.LocalDate;

public interface ExchangeAdapter {
	
	/**
	 * Requests all exchange rates for a given currency (=baseCurrency) for a given date.
	 * Is the date not available, the method will request the latest exchange rate.
	 * @param baseCurrency - Currency that shall be exchanged to a certain currency
	 * @param date - Date of the exchange
	 * @return ExchangeResponse with all available exchange rates.
	 */
	public ExchangeResponse getAllExchangeRates(String baseCurrency, LocalDate date);
}
