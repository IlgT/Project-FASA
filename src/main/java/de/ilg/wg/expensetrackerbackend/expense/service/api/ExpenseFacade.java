package de.ilg.wg.expensetrackerbackend.expense.service.api;

import java.math.BigDecimal;
import java.util.List;

public interface ExpenseFacade {
	
	public ExpenseDto addExpense(ExpenseDto expenseDto);
	
	public ExpenseDto updateExpense(ExpenseDto expenseDto);
	
	public ExpenseDto deleteExpense(ExpenseDto expenseDto);
	
	public List<ExpenseDto> getExpensesByFilterCriteria(ExpenseFilterCriteriaTo filter);
	
	public BigDecimal calculateTotalExpense(ExpenseFilterCriteriaTo filter);
}
