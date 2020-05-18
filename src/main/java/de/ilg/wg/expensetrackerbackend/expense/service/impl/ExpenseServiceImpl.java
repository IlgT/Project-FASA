package de.ilg.wg.expensetrackerbackend.expense.service.impl;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.ilg.wg.expensetrackerbackend.common.entity.Money;
import de.ilg.wg.expensetrackerbackend.common.exception.BusinessException;
import de.ilg.wg.expensetrackerbackend.common.exception.IdNotExistException;
import de.ilg.wg.expensetrackerbackend.exchange.facade.api.ExchangeFacade;
import de.ilg.wg.expensetrackerbackend.expense.dao.api.ExpenseDao;
import de.ilg.wg.expensetrackerbackend.expense.dao.api.ExpenseDatesProjection;
import de.ilg.wg.expensetrackerbackend.expense.dao.api.ExpenseReasonsProjection;
import de.ilg.wg.expensetrackerbackend.expense.dao.entity.Expense;
import de.ilg.wg.expensetrackerbackend.expense.dao.impl.ExpenseSpecification;
import de.ilg.wg.expensetrackerbackend.expense.facade.api.ExpenseSearchCriteriaTo;
import de.ilg.wg.expensetrackerbackend.expense.service.api.ExpenseService;

@Service
public class ExpenseServiceImpl implements ExpenseService {

	@Autowired
	private ExpenseDao expenseDao;

	@Autowired
	private ExchangeFacade exchangeFacade;

	@Override
	public Expense addExpense(Expense newExpense) {
		newExpense = updateExchangeValues(newExpense);
		return expenseDao.save(newExpense);
	}

	@Override
	public Expense updateExpense(Expense updatedExpense) {
		updatedExpense = updateExchangeValues(updatedExpense);
		return expenseDao.save(updatedExpense);
	}

	@Override
	public void deleteExpense(long id) {
		expenseDao.deleteById(id);
	}

	@Override
	public Expense findExpenseById(long id) {
		return expenseDao.findById(id).orElseThrow(() -> new BusinessException("No expense for the given id was found",
				new IdNotExistException("Provided id does not exist")));
	}

	@Override
	public List<Expense> getExpensesBySearchCriteria(ExpenseSearchCriteriaTo filter) {
		return expenseDao.findAll(ExpenseSpecification.matchesMonth(filter.getMonth()));
	}

	@Override
	public BigDecimal calculateTotalExpense(List<Expense> displayedExpenses) {
		return displayedExpenses.stream().map(expense -> expense.getAmount().getValue()).reduce(BigDecimal.ZERO,
				(a, b) -> a.add(b));
	}

	public Set<String> getUtilizedReasons() {
		return expenseDao.findBy(ExpenseReasonsProjection.class).stream().map(ExpenseReasonsProjection::getReason)
				.collect(Collectors.toSet());
	}

	public Set<Integer> getUtilizedMonths() {
		Set<ExpenseDatesProjection> dates = expenseDao.findBy(ExpenseDatesProjection.class).stream()
				.collect(Collectors.toSet());
		return dates.stream().map(ExpenseDatesProjection::getDate).map(LocalDate::getMonthValue)
				.collect(Collectors.toSet());
	}

	private Expense updateExchangeValues(Expense expense) {
		BigDecimal exchangeRate = getExchangeRate(expense.getDate(), expense.getOriginalAmount().getCurrency());
		expense.setExchangeRate(exchangeRate);
		expense.setAmount(calculateAmountWithExchangeRate(expense.getOriginalAmount().getValue(), exchangeRate));
		return expense;
	}

	private BigDecimal getExchangeRate(LocalDate date, String baseCurrency) {
		return exchangeFacade.getExchangeRateToDefaultCurrency(date, baseCurrency);
	}

	private Money calculateAmountWithExchangeRate(BigDecimal expenseOriginalValue, BigDecimal exchangeRate) {
		BigDecimal expenseValue = expenseOriginalValue.multiply(exchangeRate);
		expenseValue.setScale(2, RoundingMode.HALF_UP);
		String defaultCurrency = getDefaultCurrency();
		return new Money(expenseValue, defaultCurrency);
	}

	private String getDefaultCurrency() {
		return exchangeFacade.getDefaultCurrency();
	}
}
