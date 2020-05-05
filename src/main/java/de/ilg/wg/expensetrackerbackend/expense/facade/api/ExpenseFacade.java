package de.ilg.wg.expensetrackerbackend.expense.facade.api;

import java.math.BigDecimal;
import java.util.List;

public interface ExpenseFacade {
	
	public ExpenseDto addExpense(ExpenseDto newExpense);
	
	public ExpenseDto updateExpense(ExpenseDto updatedExpense);
	
	public void deleteExpense(long id);
	
	public List<ExpenseDto> getExpensesByFilterCriteria(ExpenseFilterCriteriaTo filter);
	
	public BigDecimal calculateTotalExpense(List<ExpenseDto> displayedExpenses);

}
