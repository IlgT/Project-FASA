package de.ilg.wg.expensetrackerbackend.exchange.dao.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Version;

@Entity(name="exchange")
@Table(name="EXCHANGE", schema="EXPENSE_TRACKER")
public class Exchange {
	
	@Id
	@Column(name="EXCHANGE_ID", nullable=false, unique=true)
	private long id;
	
	@Version
	@Column(name="EXCHANGE_VERSION", nullable=false, unique=false)
	private long version;
	
	@Column(name="EXCHANGE_BASE_CURRENCY", length=3, nullable=false, unique=false)
	private String baseCurrency;

	@Column(name="EXCHANGE_DESTINATION_CURRENCY", length=3, nullable=false, unique=false)
	private String destinationCurrency;
	
	@Column(name="EXCHANGE_RATE", nullable=false, unique=false)
	private BigDecimal rate;

	@Column(name="EXCHANGE_CREATED_TIMESTAMP", nullable=false, unique=false)
    private LocalDate createdTimestamp;
    
	@Column(name="EXCHANGE_UPDATED_TIMESTAMP", nullable=true, unique=false)
    private LocalDate updatedTimestamp;

	public final long getId() {
		return id;
	}

	public final void setId(long id) {
		this.id = id;
	}

	public final long getVersion() {
		return version;
	}

	public final void setVersion(long version) {
		this.version = version;
	}

	public final String getBaseCurrency() {
		return baseCurrency;
	}

	public final void setBaseCurrency(String baseCurrency) {
		this.baseCurrency = baseCurrency;
	}

	public final String getDestinationCurrency() {
		return destinationCurrency;
	}

	public final void setDestinationCurrency(String destinationCurrency) {
		this.destinationCurrency = destinationCurrency;
	}

	public final BigDecimal getRate() {
		return rate;
	}

	public final void setRate(BigDecimal rate) {
		this.rate = rate;
	}

	public final LocalDate getCreatedTimestamp() {
		return createdTimestamp;
	}

	public final void setCreatedTimestamp(LocalDate createdTimestamp) {
		this.createdTimestamp = createdTimestamp;
	}

	public final LocalDate getUpdatedTimestamp() {
		return updatedTimestamp;
	}

	public final void setUpdatedTimestamp(LocalDate updatedTimestamp) {
		this.updatedTimestamp = updatedTimestamp;
	}
}
