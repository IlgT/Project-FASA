package de.ilg.wg.expensetrackerbackend.common.entity;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class Money {

	@Column(name="VALUE", nullable=false, unique=false)
	private BigDecimal value;

	@Column(name="CURRENCY", nullable=false, unique=false)
	@NonNull private String currency;

}
