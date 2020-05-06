package de.ilg.wg.expensetrackerbackend.common.entity;

import java.math.BigDecimal;

import lombok.Data;
import lombok.NonNull;

@Data
public class Money {
	
	@NonNull private BigDecimal value;
	
	@NonNull private String currency;

}
