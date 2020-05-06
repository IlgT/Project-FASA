package de.ilg.wg.expensetrackerbackend.expense.controller.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import de.ilg.wg.expensetrackerbackend.expense.controller.api.ExpenseController;
import de.ilg.wg.expensetrackerbackend.expense.facade.api.ExpenseDto;
import de.ilg.wg.expensetrackerbackend.expense.facade.api.ExpenseFacade;
import de.ilg.wg.expensetrackerbackend.expense.facade.api.ExpenseSearchCriteriaTo;

@RestController
@RequestMapping("/expenses")
public class ExpenseControllerImpl implements ExpenseController{
	
	@Autowired
	private ExpenseFacade expenseFacade;
	
	@RequestMapping(
			method = RequestMethod.POST)
	@ResponseBody
	public ExpenseDto createNewExpense(@RequestBody ExpenseDto newTag) {
		return expenseFacade.addExpense(newTag);
	}
	
	@RequestMapping(
			method = RequestMethod.PUT)
	@ResponseBody
	public ExpenseDto updateExpense(@RequestBody ExpenseDto updatedTag) {
		return expenseFacade.addExpense(updatedTag);
	}
	
	@RequestMapping(
			method = RequestMethod.GET)
	@ResponseBody
	public List<ExpenseDto> getExpensesBySearchCriteria(@RequestBody ExpenseSearchCriteriaTo filter) {
		return expenseFacade.getExpensesBySearchCriteria(filter);
	}
	
	@RequestMapping(
			path = "/{id}",
			method = RequestMethod.DELETE
			)
	@ResponseBody
	public void deleteExpense(@PathVariable long id) {
		expenseFacade.deleteExpense(id);
	}
	
}
