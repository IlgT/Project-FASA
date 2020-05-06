package de.ilg.wg.expensetrackerbackend.common.entity;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Data;
import lombok.NonNull;

@Data
@Embeddable
public class Money {

	@Column(name="VALUE", nullable=false, unique=false)
	@NonNull private BigDecimal value;

	@Column(name="CURRENCY", nullable=false, unique=false)
	@NonNull private String currency;

}
