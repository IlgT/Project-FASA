package de.ilg.wg.expensetrackerbackend.expense.service.api;

import java.io.IOException;
import java.time.LocalDate;

public class ExpenseFilterCriteriaTo {

	private LocalDate date;
	
	private int month;
	
	private String tagName;

	public final LocalDate getDate() {
		return date;
	}

	public final void setDate(LocalDate date) {
		this.date = date;
	}

	public final int getMonth() {
		return month;
	}

	public final void setMonth(int month) throws IOException {
		if(month >12 || month < 0) {
			throw new IOException("Not a valid month!");
		}
		this.month = month;
	}

	public final String getTagName() {
		return tagName;
	}

	public final void setTagName(String tagName) {
		this.tagName = tagName;
	}
}
