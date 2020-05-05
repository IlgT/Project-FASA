package de.ilg.wg.expensetrackerbackend.expense.controller.impl;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import de.ilg.wg.expensetrackerbackend.expense.controller.api.ExpenseController;
import de.ilg.wg.expensetrackerbackend.expense.dao.entity.Expense;

@RestController
@RequestMapping("/expenseTracker")
public class ExpenseControllerImpl implements ExpenseController{
	
	//Create Responsehandler with Exceptions which holds ResponseStatus
	
	@GetMapping(value = "/{id}")
    public void findById(@PathVariable("id") Long id) {
    }
 
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@RequestBody Expense expense) {
    }
 
    @PutMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void update(@PathVariable( "id" ) Long id, @RequestBody Expense expense) {
    }
 
    @DeleteMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable("id") Long id) {
    }

}
