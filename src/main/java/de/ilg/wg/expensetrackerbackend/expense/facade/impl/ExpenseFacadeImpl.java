package de.ilg.wg.expensetrackerbackend.expense.facade.impl;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import de.ilg.wg.expensetrackerbackend.expense.dao.entity.Expense;
import de.ilg.wg.expensetrackerbackend.expense.facade.api.ExpenseDto;
import de.ilg.wg.expensetrackerbackend.expense.facade.api.ExpenseFacade;
import de.ilg.wg.expensetrackerbackend.expense.facade.api.ExpenseFilterCriteriaTo;
import de.ilg.wg.expensetrackerbackend.expense.service.api.ExpenseService;

@Component
public class ExpenseFacadeImpl implements ExpenseFacade {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private ExpenseService expenseService;

	public ExpenseDto addExpense(ExpenseDto newExpense) {
		Expense newExpenseEntity = mapToExpense(newExpense);
		newExpenseEntity = expenseService.addExpense(newExpenseEntity);
		return modelMapper.map(newExpenseEntity, ExpenseDto.class);
	}

	public ExpenseDto updateExpense(ExpenseDto updatedExpense) {
		Expense updatedExpenseEntity = mapToExpense(updatedExpense);
		updatedExpenseEntity = expenseService.updateExpense(updatedExpenseEntity);
		return modelMapper.map(updatedExpenseEntity, ExpenseDto.class);
	}

	public void deleteExpense(long id) {
		expenseService.deleteExpense(id);
	}

	public List<ExpenseDto> getExpensesByFilterCriteria(ExpenseFilterCriteriaTo filter) {
		List<Expense> matchingExpenses = expenseService.getExpensesByFilterCriteria(filter);
		return matchingExpenses.stream()
                .map(expense -> modelMapper.map(expense, ExpenseDto.class))
                .collect(Collectors.toList());
	}

	public BigDecimal calculateTotalExpense(List<ExpenseDto> displayedExpenses) {
		return displayedExpenses.stream().map(expense -> expense.getAmount()).reduce(BigDecimal.ZERO,
				(a, b) -> a.add(b));
	}

	private Expense mapToExpense(ExpenseDto updatedExpense) {
		Expense updatedExpenseEntity = modelMapper.map(updatedExpense, Expense.class);
		if (updatedExpense.getId() != null) {
			Expense oldTag = expenseService.findExpenseById(updatedExpense.getId());
			updatedExpenseEntity.setVersion(oldTag.getVersion());
			updatedExpenseEntity.setCreatedTimestamp(oldTag.getCreatedTimestamp());
			updatedExpenseEntity.setUpdatedTimestamp(oldTag.getUpdatedTimestamp());
		}
		return updatedExpenseEntity;
	}

}
