package de.ilg.wg.expensetrackerbackend.income.dao.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Version;

import de.ilg.wg.expensetrackerbackend.expense.dao.entity.Expense;

@Entity(name="income")
@Table(name="INCOME", schema="EXPENSE_TRACKER")
public class Income {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="INCOME_ID", nullable=false, unique=true)
	private long id;
	
	@Version
	@Column(name="INCOME_VERSION", nullable=false, unique=false)
	private long version;
	
	@Column(name="INCOME_YEARLY_GROSS_INCOME", nullable=false, unique=false)
	private BigDecimal yearlyGrossIncome;

	@Column(name="INCOME_YEARLY_NET_INCOME", nullable=false, unique=false)
	private BigDecimal yearlyNetIncome;
	
	@Column(name="INCOME_MONTHLY_GROSS_INCOME", nullable=false, unique=false)
	private BigDecimal monthlyGrossIncome;

	@Column(name="INCOME_MONTHLY_NET_INCOME", nullable=false, unique=false)
	private BigDecimal monthlyNetIncome;
	
	@Column(name="INCOME_CREATED_TIMESTAMP", nullable=false, unique=false)
    private LocalDate createdTimestamp;
    
	@Column(name="INCOME_UPDATED_TIMESTAMP", nullable=true, unique=false)
    private LocalDate updatedTimestamp;
    
    @OneToMany(mappedBy = "tag")
    private List<Expense> expenses;

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

	public final BigDecimal getYearlyGrossIncome() {
		return yearlyGrossIncome;
	}

	public final void setYearlyGrossIncome(BigDecimal yearlyGrossIncome) {
		this.yearlyGrossIncome = yearlyGrossIncome;
	}

	public final BigDecimal getYearlyNetIncome() {
		return yearlyNetIncome;
	}

	public final void setYearlyNetIncome(BigDecimal yearlyNetIncome) {
		this.yearlyNetIncome = yearlyNetIncome;
	}

	public final BigDecimal getMonthlyGrossIncome() {
		return monthlyGrossIncome;
	}

	public final void setMonthlyGrossIncome(BigDecimal monthlyGrossIncome) {
		this.monthlyGrossIncome = monthlyGrossIncome;
	}

	public final BigDecimal getMonthlyNetIncome() {
		return monthlyNetIncome;
	}

	public final void setMonthlyNetIncome(BigDecimal monthlyNetIncome) {
		this.monthlyNetIncome = monthlyNetIncome;
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

	public final List<Expense> getExpenses() {
		return expenses;
	}

	public final void setExpenses(List<Expense> expenses) {
		this.expenses = expenses;
	}
}
