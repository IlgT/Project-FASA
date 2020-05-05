package de.ilg.wg.expensetrackerbackend.expense.service.api;

import java.math.BigDecimal;
import java.util.List;

import de.ilg.wg.expensetrackerbackend.expense.dao.entity.Expense;
import de.ilg.wg.expensetrackerbackend.expense.facade.api.ExpenseFilterCriteriaTo;

public interface ExpenseService {
	
	public Expense addExpense(Expense newExpense);
	
	public Expense updateExpense(Expense updatedExpense);
	
	public void deleteExpense(long id);
	
	public Expense findExpenseById(long id);
	
	public List<Expense> getExpensesByFilterCriteria(ExpenseFilterCriteriaTo filter);
	
	public BigDecimal calculateTotalExpense(List<Expense> displayedExpenses);
}
