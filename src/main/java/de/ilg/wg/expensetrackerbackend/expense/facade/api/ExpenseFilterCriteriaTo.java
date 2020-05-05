package de.ilg.wg.expensetrackerbackend.expense.facade.api;

import java.io.IOException;

import de.ilg.wg.expensetrackerbackend.common.exception.BusinessException;

public class ExpenseFilterCriteriaTo {

	private String[] reasons;
	
	private int month;
	
	private String[] tagNames;

	public final String[] getReasons() {
		return reasons;
	}

	public final void setReasons(String[] reasons) {
		this.reasons = reasons;
	}

	public final int getMonth() {
		return month;
	}

	public final void setMonth(int month) throws IOException {
		if(month > 12 || month < 0) {
			throw new BusinessException("Not a valid month!", null);
		}
		this.month = month;
	}

	public final String[] getTagName() {
		return tagNames;
	}

	public final void setTagName(String[] tagNames) {
		this.tagNames = tagNames;
	}
}
