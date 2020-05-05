package de.ilg.wg.expensetrackerbackend.exchange.dao.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Version;

import lombok.Data;
import lombok.NonNull;
import lombok.ToString;

@Entity(name="exchange")
@Table(name="EXCHANGE", schema="EXPENSE_TRACKER")
@Data
public class Exchange {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="EXCHANGE_ID", nullable=false, unique=true)
	@ToString.Exclude
	private long id;
	
	@Version
	@Column(name="EXCHANGE_VERSION", nullable=false, unique=false)
	@ToString.Exclude
	private long version;
	
	@Column(name="EXCHANGE_BASE", length=3, nullable=false, unique=false)
	@NonNull private String base;
	
	@Column(name="EXCHANGE_SYMBOL", length=3, nullable=false, unique=false)
	@NonNull private String symbol;
	
	@Column(name="EXCHANGE_RATE", nullable=false, unique=false)
	@NonNull private BigDecimal rate;
	
	@Column(name="EXCHANGE_DATE", nullable=false, unique=false)
	@NonNull private LocalDate date;
	
	@Column(name="EXCHANGE_CREATED_TIMESTAMP", nullable=false, unique=false)
	@ToString.Exclude
    private LocalDate createdTimestamp;
    
	@Column(name="EXCHANGE_UPDATED_TIMESTAMP", nullable=true, unique=false)
	@ToString.Exclude
    private LocalDate updatedTimestamp;

}