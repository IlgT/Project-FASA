package de.ilg.wg.expensetrackerbackend.exchange.adapter.api;

import java.time.LocalDate;

public interface ExchangeAdapter {

	/**
	 * Requests the exchange rate from the base currency to the default currency
	 * (=EUR) for a given date. Is the date not available, the method will request
	 * the latest exchange rate.
	 *
	 * @param baseCurrency - Currency that shall be exchanged to a certain currency
	 * @param date         - Date of the exchange
	 * @return ExchangeResponse with exchange rate.
	 */
	public ExchangeResponse getExchangeRateInDefaultCurrency(String baseCurrency, LocalDate date);

	/**
	 * Requests the exchange rate from the base currency to the target currency for
	 * a given date. Is the date not available, the method will request the latest
	 * exchange rate.
	 *
	 * @param baseCurrency   - Currency that shall be exchanged to a certain
	 *                       currency
	 * @param date           - Date of the exchange
	 * @param targetCurrency - Currency into which the amount should be exchanged
	 * @return ExchangeResponse with exchange rate.
	 */
	public ExchangeResponse getExchangeRate(String baseCurrency, LocalDate date, String targetCurrency);
}
