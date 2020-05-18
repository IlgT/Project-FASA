package de.ilg.wg.expensetrackerbackend.tag.dao.entity;

import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Version;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import de.ilg.wg.expensetrackerbackend.expense.dao.entity.Expense;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Entity(name="tag")
@Table(name="TAG", schema="EXPENSE_TRACKER")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class Tag {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="TAG_ID", nullable=false, unique=true, insertable = false)
	@ToString.Exclude
	private long id;
	
	@Version
	@Column(name="TAG_VERSION", nullable=false, unique=false)
	@ToString.Exclude
	private long version;
	
    @Column(name="TAG_NAME", length=50, nullable=false, unique=true)
    @NonNull private String name;
    
    @ManyToMany(mappedBy = "tags")
	@ToString.Exclude
	@EqualsAndHashCode.Exclude
    private Set<Expense> expenses;
    
	@Column(name="TAG_CREATED_TIMESTAMP", nullable=false, unique=false)
	@CreationTimestamp
	@ToString.Exclude
    private LocalDateTime createdTimestamp;
    
	@Column(name="TAG_UPDATED_TIMESTAMP", nullable=true, unique=false, insertable = false)
	@UpdateTimestamp
	@ToString.Exclude
    private LocalDateTime updatedTimestamp;
	
	@Override
	public String toString() {
		return this.name;
	}
}
