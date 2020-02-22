package de.ilg.wg.expensetrackerbackend.exchange.adapter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ExchangeResponse {

	private Map<String, BigDecimal> rates;
	private String base;
	private LocalDate date;
	
	public ExchangeResponse() {
	}

	public final String getBase() {
		return base;
	}

	public final void setBase(String base) {
		this.base = base;
	}

	public final LocalDate getDate() {
		return date;
	}

	public final void setDate(LocalDate date) {
		this.date = date;
	}

	public final Map<String, BigDecimal> getRates() {
		return rates;
	}

	public final void setRates(Map<String, BigDecimal> rates) {
		this.rates = rates;
	}
	
	@Override
	public String toString() {
		String result = "Rates for " + base + ": ";
		for(String key : rates.keySet()) {
			result = result + key + "=" + rates.get(key) +"; ";
		}
		return result; 
	}
}
