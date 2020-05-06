package de.ilg.wg.expensetrackerbackend.expense.dao.api;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import de.ilg.wg.expensetrackerbackend.expense.dao.entity.Expense;

@Repository
public interface ExpenseDao extends JpaRepository<Expense, Long>, JpaSpecificationExecutor<Expense>{
	
	<T> Set<T> findBy(Class<T> projection);
}
