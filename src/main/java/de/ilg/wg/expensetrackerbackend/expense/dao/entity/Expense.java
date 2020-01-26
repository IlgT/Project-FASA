package de.ilg.wg.expensetrackerbackend.expense.dao.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
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
	
	@Column(name="EXPENSE_AMOUNT", nullable=false, unique=false)
	private BigDecimal amount;
	
	@Column(name="EXPENSE_REASON", length=100, nullable=false, unique=false)
	private String reason;
	
	@Column(name="EXPENSE_DATE", nullable=false, unique=false)
	private LocalDate date;

	@Column(name="EXPENSE_ORIGINAL_VALUE", nullable=true, unique=false)
	private BigDecimal originalValue;
	
	@Column(name="EXPENSE_ORIGINAL_CURRENCYE", length=3, nullable=true, unique=false)
	private String originalCurrency;
	
	@Column(name="EXPENSE_EXCHANGE_RATE", nullable=true, unique=false)
	private BigDecimal exchangeRate;
	
	@ManyToMany
	@JoinTable(
	  name = "EXPENSE_TAGS", 
	  joinColumns = @JoinColumn(name = "EXPENSE_ID"), 
	  inverseJoinColumns = @JoinColumn(name = "TAG_ID"))
	private Set<Tag> utilizedTags;

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
		return amount;
	}

	public final void setValue(BigDecimal value) {
		this.amount = value;
	}

	public final String getDescription() {
		return reason;
	}

	public final void setDescription(String description) {
		this.reason = description;
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

	public final Set<Tag> getUtilizedTags() {
		return utilizedTags;
	}

	public final void setUtilizedTags(Set<Tag> utilizedTags) {
		this.utilizedTags = utilizedTags;
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
		result = prime * result + ((createdTimestamp == null) ? 0 : createdTimestamp.hashCode());
		result = prime * result + ((date == null) ? 0 : date.hashCode());
		result = prime * result + ((reason == null) ? 0 : reason.hashCode());
		result = prime * result + ((exchangeRate == null) ? 0 : exchangeRate.hashCode());
		result = prime * result + (int) (id ^ (id >>> 32));
		result = prime * result + ((originalCurrency == null) ? 0 : originalCurrency.hashCode());
		result = prime * result + ((originalValue == null) ? 0 : originalValue.hashCode());
		result = prime * result + ((updatedTimestamp == null) ? 0 : updatedTimestamp.hashCode());
		result = prime * result + ((utilizedTags == null) ? 0 : utilizedTags.hashCode());
		result = prime * result + ((amount == null) ? 0 : amount.hashCode());
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
		Expense other = (Expense) obj;
		if (id != other.id)
			return false;
		return true;
	}
}