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

@Entity(name="exchange")
@Table(name="EXCHANGE", schema="EXPENSE_TRACKER")
public class Exchange {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="EXCHANGE_ID", nullable=false, unique=true)
	private long id;
	
	@Version
	@Column(name="EXCHANGE_VERSION", nullable=false, unique=false)
	private long version;
	
	@Column(name="EXCHANGE_BASE", length=3, nullable=false, unique=false)
	private String base;
	
	@Column(name="EXCHANGE_SYMBOL", length=3, nullable=false, unique=false)
	private String symbol;
	
	@Column(name="EXCHANGE_RATE", nullable=false, unique=false)
	private BigDecimal rate;
	
	@Column(name="EXCHANGE_DATE", nullable=false, unique=false)
	private LocalDate date;
	
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

	public final String getBase() {
		return base;
	}

	public final void setBase(String base) {
		this.base = base;
	}

	public final String getSymbol() {
		return symbol;
	}

	public final void setSymbol(String symbol) {
		this.symbol = symbol;
	}

	public final BigDecimal getRate() {
		return rate;
	}

	public final void setRate(BigDecimal rate) {
		this.rate = rate;
	}

	public final LocalDate getDate() {
		return date;
	}

	public final void setDate(LocalDate date) {
		this.date = date;
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

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((base == null) ? 0 : base.hashCode());
		result = prime * result + ((createdTimestamp == null) ? 0 : createdTimestamp.hashCode());
		result = prime * result + ((date == null) ? 0 : date.hashCode());
		result = prime * result + (int) (id ^ (id >>> 32));
		result = prime * result + ((rate == null) ? 0 : rate.hashCode());
		result = prime * result + ((symbol == null) ? 0 : symbol.hashCode());
		result = prime * result + ((updatedTimestamp == null) ? 0 : updatedTimestamp.hashCode());
		result = prime * result + (int) (version ^ (version >>> 32));
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Exchange other = (Exchange) obj;
		if (id != other.id)
			return false;
		return true;
	}
}