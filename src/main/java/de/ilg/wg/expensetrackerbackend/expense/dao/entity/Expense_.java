package de.ilg.wg.expensetrackerbackend.expense.dao.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

import de.ilg.wg.expensetrackerbackend.common.entity.Money;
import de.ilg.wg.expensetrackerbackend.tag.dao.entity.Tag;

@StaticMetamodel(Expense.class)
public class Expense_ {

	public static volatile SingularAttribute<Expense, Long> id;
	public static volatile SingularAttribute<Expense, Long> version;
	public static volatile SingularAttribute<Expense, Money> amount;
	public static volatile SingularAttribute<Expense, String> reason;
	public static volatile SingularAttribute<Expense, LocalDate> date;
	public static volatile SingularAttribute<Expense, Money> originalAmount;
	public static volatile SingularAttribute<Expense, String> originalCurrency;
	public static volatile SingularAttribute<Expense, BigDecimal> exchangeRate;
	public static volatile SetAttribute<Expense, Tag> utilizedTags;
	public static volatile SingularAttribute<Expense, LocalDate> createdTimestamp;
	public static volatile SingularAttribute<Expense, LocalDate> updatedTimestamp;

}
