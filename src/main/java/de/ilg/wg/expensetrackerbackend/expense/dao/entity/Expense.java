package de.ilg.wg.expensetrackerbackend.expense.dao.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Version;

import de.ilg.wg.expensetrackerbackend.tag.dao.entity.Tag;

@Entity(name="expense")
@Table(name="EXPENSE", schema="EXPENSE_TRACKER")
public class Expense {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="EXPENSE_ID", nullable=false, unique=true)
	private long id;
	
	@Version
	@Column(name="EXPENSE_VERSION", nullable=false, unique=false)
	private long version;
	
	@Column(name="EXPENSE_VALUE", nullable=false, unique=false)
	private BigDecimal value;
	
	@Column(name="EXPENSE_DESCRIPTION", length=100, nullable=false, unique=false)
	private String description;
	
	@Column(name="EXPENSE_DATE", nullable=false, unique=false)
	private LocalDate date;

	@Column(name="EXPENSE_ORIGINAL_VALUE", nullable=true, unique=false)
	private BigDecimal originalValue;
	
	@Column(name="EXPENSE_ORIGINAL_CURRENCYE", length=3, nullable=true, unique=false)
	private String originalCurrency;
	
	@Column(name="EXPENSE_EXCHANGE_RATE", nullable=true, unique=false)
	private BigDecimal exchangeRate;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="EXPENSE_TAG_ID")
	private Tag tag;

	@Column(name="EXPENSE_CREATED_TIMESTAMP", nullable=false, unique=false)
    private LocalDate createdTimestamp;
    
	@Column(name="EXPENSE_UPDATED_TIMESTAMP", nullable=true, unique=false)
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

	public final BigDecimal getValue() {
		return value;
	}

	public final void setValue(BigDecimal value) {
		this.value = value;
	}

	public final String getDescription() {
		return description;
	}

	public final void setDescription(String description) {
		this.description = description;
	}

	public final LocalDate getDate() {
		return date;
	}

	public final void setDate(LocalDate date) {
		this.date = date;
	}

	public final BigDecimal getOriginalValue() {
		return originalValue;
	}

	public final void setOriginalValue(BigDecimal originalValue) {
		this.originalValue = originalValue;
	}

	public final String getOriginalCurrency() {
		return originalCurrency;
	}

	public final void setOriginalCurrency(String originalCurrency) {
		this.originalCurrency = originalCurrency;
	}

	public final BigDecimal getExchangeRate() {
		return exchangeRate;
	}

	public final void setExchangeRate(BigDecimal exchangeRate) {
		this.exchangeRate = exchangeRate;
	}

	public final Tag getTag() {
		return tag;
	}

	public final void setTag(Tag tag) {
		this.tag = tag;
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