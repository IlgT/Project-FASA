package de.ilg.wg.expensetrackerbackend.expense.service.impl;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.ilg.wg.expensetrackerbackend.expense.dao.api.ExpenseDao;
import de.ilg.wg.expensetrackerbackend.expense.dao.entity.Expense;
import de.ilg.wg.expensetrackerbackend.expense.facade.api.ExpenseFilterCriteriaTo;
import de.ilg.wg.expensetrackerbackend.expense.service.api.ExpenseService;

@Service
public class ExpenseServiceImpl implements ExpenseService {

	@Autowired
	private ExpenseDao expenseDao;

	@Override
	public Expense addExpense(Expense newExpense) {
		return expenseDao.save(newExpense);
	}

	@Override
	public Expense updateExpense(Expense updatedExpense) {
		return expenseDao.save(updatedExpense);
	}

	@Override
	public void deleteExpense(long id) {
		expenseDao.deleteById(id);
	}
	
	@Override
	public Expense findExpenseById(long id) {
		return expenseDao.findById(id).orElse(null);
	}

	@Override
	public List<Expense> getExpensesByFilterCriteria(ExpenseFilterCriteriaTo filter) {
		return expenseDao.findAll();
	}

	@Override
	public BigDecimal calculateTotalExpense(List<Expense> displayedExpenses) {
		return displayedExpenses.stream().map(expense -> expense.getAmount()).reduce(BigDecimal.ZERO,
				(a, b) -> a.add(b));
	}
}
