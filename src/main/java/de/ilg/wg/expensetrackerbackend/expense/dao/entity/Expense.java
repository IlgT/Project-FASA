package de.ilg.wg.expensetrackerbackend.expense.dao.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Version;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import de.ilg.wg.expensetrackerbackend.common.entity.Money;
import de.ilg.wg.expensetrackerbackend.tag.dao.entity.Tag;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Entity(name="expense")
@Table(name="EXPENSE", schema="EXPENSE_TRACKER")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class Expense {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="EXPENSE_ID", nullable=false, unique=true, insertable = false)
	@ToString.Exclude
	private Long id;
	
	@Version
	@Column(name="EXPENSE_VERSION", nullable=false, unique=false)
	@ToString.Exclude
	private Long version;
	
	@AttributeOverrides({
        @AttributeOverride(name="value", column=@Column(name="EXPENSE_VALUE")),
        @AttributeOverride(name="currency", column=@Column(name="EXPENSE_CURRENCY"))
    })
	@Embedded
	@NonNull private Money amount;
	
	@Column(name="EXPENSE_REASON", length=100, nullable=false, unique=false)
	@NonNull private String reason;
	
	@Column(name="EXPENSE_DATE", nullable=false, unique=false)
	@NonNull private LocalDate date;

	@AttributeOverrides({
        @AttributeOverride(name="value", column=@Column(name="EXPENSE_ORIGINAL_VALUE")),
        @AttributeOverride(name="currency", column=@Column(name="EXPENSE_ORIGINAL_CURRENCY"))
    })
	@Embedded
	@NonNull private Money originalAmount;
	
	@Column(name="EXPENSE_EXCHANGE_RATE", nullable=true, unique=false)
	private BigDecimal exchangeRate;
	
	@ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
	@JoinTable(
	  name = "EXPENSE_TAGS", schema="EXPENSE_TRACKER",
	  joinColumns = @JoinColumn(name = "EXPENSE_ID"), 
	  inverseJoinColumns = @JoinColumn(name = "TAG_ID"))
	@NonNull private Set<Tag> tags;

	@Column(name="EXPENSE_CREATED_TIMESTAMP", nullable=false, unique=false)
	@CreationTimestamp
	@ToString.Exclude
    private LocalDateTime createdTimestamp;
    
	@Column(name="EXPENSE_UPDATED_TIMESTAMP", nullable=true, unique=false, insertable = false)
	@UpdateTimestamp
	@ToString.Exclude
    private LocalDateTime updatedTimestamp;

}