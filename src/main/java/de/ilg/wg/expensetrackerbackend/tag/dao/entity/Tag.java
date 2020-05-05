package de.ilg.wg.expensetrackerbackend.tag.dao.entity;

import java.time.LocalDate;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Version;

import de.ilg.wg.expensetrackerbackend.expense.dao.entity.Expense;
import lombok.Data;
import lombok.NonNull;
import lombok.ToString;

@Entity(name="tag")
@Table(name="TAG", schema="EXPENSE_TRACKER")
@Data
public class Tag {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="TAG_ID", nullable=false, unique=true)
	@ToString.Exclude
	private long id;
	
	@Version
	@Column(name="TAG_VERSION", nullable=false, unique=false)
	@ToString.Exclude
	private long version;
	
    @Column(name="TAG_NAME", length=50, nullable=false, unique=true)
    @NonNull private String name;
    
    @ManyToMany(mappedBy = "utilizedTags")
	@ToString.Exclude
    private Set<Expense> expenses;
    
	@Column(name="TAG_CREATED_TIMESTAMP", nullable=false, unique=false)
	@ToString.Exclude
    private LocalDate createdTimestamp;
    
	@Column(name="TAG_UPDATED_TIMESTAMP", nullable=true, unique=false)
	@ToString.Exclude
    private LocalDate updatedTimestamp;
}
