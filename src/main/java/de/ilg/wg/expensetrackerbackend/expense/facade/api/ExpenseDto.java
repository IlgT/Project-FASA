package de.ilg.wg.expensetrackerbackend.expense.facade.api;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

import de.ilg.wg.expensetrackerbackend.tag.facade.api.TagDto;
import lombok.NonNull;
import lombok.ToString;
import lombok.Value;

@Value
public class ExpenseDto {

	@ToString.Exclude
	private long id;

	@ToString.Exclude
	private long version;

	@NonNull private BigDecimal amount;
	
	@NonNull private String reason;
	
	@NonNull private LocalDate date;

	@NonNull private BigDecimal originalValue;
	
	@NonNull private String originalCurrency;
	
	@NonNull private BigDecimal exchangeRate;
	
	@NonNull private Set<TagDto> utilizedTags;
}
