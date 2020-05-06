package de.ilg.wg.expensetrackerbackend.expense.facade.api;

import java.io.IOException;
import java.util.Set;

import de.ilg.wg.expensetrackerbackend.common.exception.BusinessException;

public class ExpenseSearchCriteriaTo {

	private Set<String> reasons;
	
	private Integer month;
	
	private Set<String> tagNames;

	public final Set<String> getReasons() {
		return reasons;
	}

	public final void setReasons(Set<String> reasons) {
		this.reasons = reasons;
	}

	public final Integer getMonth() {
		return month;
	}

	public final void setMonth(Integer month) throws IOException {
		if(month > 12 || month < 0) {
			throw new BusinessException("Not a valid month!", null);
		}
		this.month = month;
	}

	public final Set<String> getTagNames() {
		return tagNames;
	}

	public final void setTagNames(Set<String> tagNames) {
		this.tagNames = tagNames;
	}
}
