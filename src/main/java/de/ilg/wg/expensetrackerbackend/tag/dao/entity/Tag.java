package de.ilg.wg.expensetrackerbackend.tag.dao.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Version;

@Entity(name="tag")
@Table(name="TAG", schema="EXPENSE_TRACKER")
public class Tag {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name="TAG_ID", nullable=false, unique=true)
	private long id;
	
	@Version
	@Column(name="TAG_VERSION", nullable=false, unique=false)
	private long version;
	
    @Column(name="TAG_NAME", length=50, nullable=false, unique=true)
	private String name;
    
	@Column(name="TAG_CREATED_TIMESTAMP", nullable=false, unique=false)
    private LocalDate createdTimestamp;
    
	@Column(name="TAG_UPDATED_TIMESTAMP", nullable=true, unique=false)
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

	public final String getName() {
		return name;
	}

	public final void setName(String name) {
		this.name = name;
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
