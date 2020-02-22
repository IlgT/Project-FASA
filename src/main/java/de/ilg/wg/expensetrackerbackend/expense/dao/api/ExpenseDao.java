package de.ilg.wg.expensetrackerbackend.expense.dao.api;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import de.ilg.wg.expensetrackerbackend.expense.dao.entity.Expense;

public interface ExpenseDao extends JpaRepository<Expense, Long> {
	
	List<Expense> findById(long Id);
}
