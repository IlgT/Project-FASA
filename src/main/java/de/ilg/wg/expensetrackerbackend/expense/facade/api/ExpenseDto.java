package de.ilg.wg.expensetrackerbackend.expense.facade.api;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;

import de.ilg.wg.expensetrackerbackend.common.entity.Money;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.ToString;

@Data
@NoArgsConstructor
public class ExpenseDto {

	@ToString.Exclude
	private Long id;

	@ToString.Exclude
	private Long version;

	@NonNull private Money amount;
	
	@NonNull private String reason;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	@JsonDeserialize(using = LocalDateDeserializer.class)
	@JsonSerialize(using = LocalDateSerializer.class)
	@NonNull private LocalDate date;

	@NonNull private Money originalAmount;
	
	private BigDecimal exchangeRate;
	
	@NonNull private Set<String> tags;
}
