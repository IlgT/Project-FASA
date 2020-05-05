package de.ilg.wg.expensetrackerbackend.expense.controller.api;

import java.util.List;

import de.ilg.wg.expensetrackerbackend.expense.facade.api.ExpenseDto;
import de.ilg.wg.expensetrackerbackend.expense.facade.api.ExpenseFilterCriteriaTo;

public interface ExpenseController {
	
	public ExpenseDto createNewExpense(ExpenseDto newTag);
	
	public ExpenseDto updateExpense(ExpenseDto updatedTag);
	
	public List<ExpenseDto> getExpensesByFilterCriteria(ExpenseFilterCriteriaTo filter);
	
	public void deleteExpense(long id);
}
