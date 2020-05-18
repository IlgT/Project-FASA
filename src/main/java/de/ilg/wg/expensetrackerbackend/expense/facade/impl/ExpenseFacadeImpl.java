package de.ilg.wg.expensetrackerbackend.expense.facade.impl;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import de.ilg.wg.expensetrackerbackend.expense.dao.entity.Expense;
import de.ilg.wg.expensetrackerbackend.expense.facade.api.ExpenseDto;
import de.ilg.wg.expensetrackerbackend.expense.facade.api.ExpenseFacade;
import de.ilg.wg.expensetrackerbackend.expense.facade.api.ExpenseSearchCriteriaTo;
import de.ilg.wg.expensetrackerbackend.expense.service.api.ExpenseService;
import de.ilg.wg.expensetrackerbackend.tag.dao.entity.Tag;
import de.ilg.wg.expensetrackerbackend.tag.facade.api.TagFacade;

@Component
public class ExpenseFacadeImpl implements ExpenseFacade {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private ExpenseService expenseService;
	
	@Autowired
	private TagFacade tagFacade;
	
	public ExpenseDto addExpense(ExpenseDto newExpense) {
		Expense newExpenseEntity = mapToExpense(newExpense);
		Set<Tag> tags = mapExistingTags(newExpense.getTags());
		newExpenseEntity.setTags(tags);
		newExpenseEntity = expenseService.addExpense(newExpenseEntity);
		return modelMapper.map(newExpenseEntity, ExpenseDto.class);
	}

	public ExpenseDto updateExpense(ExpenseDto updatedExpense) {
		Expense updatedExpenseEntity = mapToExpense(updatedExpense);
		Set<Tag> tags = mapExistingTags(updatedExpense.getTags());
		updatedExpenseEntity.setTags(tags);
		updatedExpenseEntity = expenseService.updateExpense(updatedExpenseEntity);
		return modelMapper.map(updatedExpenseEntity, ExpenseDto.class);
	}

	public void deleteExpense(long id) {
		expenseService.deleteExpense(id);
	}

	public List<ExpenseDto> getExpensesBySearchCriteria(ExpenseSearchCriteriaTo filter) {
		List<Expense> matchingExpenses = expenseService.getExpensesBySearchCriteria(filter);
		return matchingExpenses.stream().map(expense -> modelMapper.map(expense, ExpenseDto.class))
				.collect(Collectors.toList());
	}

	public BigDecimal calculateTotalExpense(List<ExpenseDto> displayedExpenses) {
		return displayedExpenses.stream().map(expense -> expense.getAmount().getValue()).reduce(BigDecimal.ZERO,
				(a, b) -> a.add(b));
	}

	public Set<String> getUtilizedReasons() {
		return expenseService.getUtilizedReasons();
	}

	public Set<Integer> getUtilizedMonths() {
		return expenseService.getUtilizedMonths();
	}

	private Set<Tag> mapExistingTags(Set<String> tagNames) {
		Set<Tag> tags = new HashSet<>();
		for(String tagName : tagNames) {
			Tag tag =  tagFacade.findTagByNameIgnoreCase(tagName);
			if(tag  == null) {
				tag = new Tag();
				tag.setName(tagName);
			}
			tags.add(tag);
		}
		return tags;
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
