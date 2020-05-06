package de.ilg.wg.expensetrackerbackend.expense.facade.api;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

public interface ExpenseFacade {
	
	public ExpenseDto addExpense(ExpenseDto newExpense);
	
	public ExpenseDto updateExpense(ExpenseDto updatedExpense);
	
	public void deleteExpense(long id);
	
	public List<ExpenseDto> getExpensesBySearchCriteria(ExpenseSearchCriteriaTo filter);
	
	public BigDecimal calculateTotalExpense(List<ExpenseDto> displayedExpenses);
	
	public Set<String> getUtilizedReasons();

	public Set<Integer> getUtilizedMonths();

}
