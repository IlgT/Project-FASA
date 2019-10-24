package de.ilg.wg.expensetrackerbackend.income.service.api;

import java.math.BigDecimal;

public interface IncomeFacade {

	public IncomeDto addIncome(BigDecimal yearlyGross, BigDecimal variablePart);
	
	public IncomeDto editIncome(BigDecimal yearlyGross, BigDecimal variablePart);
	
	public IncomeDto deleteIncome();
}
