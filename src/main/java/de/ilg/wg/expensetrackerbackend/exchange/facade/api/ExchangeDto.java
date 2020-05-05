package de.ilg.wg.expensetrackerbackend.exchange.facade.api;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.NonNull;
import lombok.ToString;
import lombok.Value;

@Value
public class ExchangeDto {

	@ToString.Exclude
	private Long id;

	@ToString.Exclude
	private Long version;
	
	@NonNull private String base;
	
	@NonNull private String symbol;
	
	@NonNull private BigDecimal rate;
	
	@NonNull private LocalDate date;
}
