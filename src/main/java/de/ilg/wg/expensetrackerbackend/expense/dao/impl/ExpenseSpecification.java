package de.ilg.wg.expensetrackerbackend.expense.dao.impl;

import java.util.Set;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import de.ilg.wg.expensetrackerbackend.expense.dao.entity.Expense;
import de.ilg.wg.expensetrackerbackend.expense.dao.entity.Expense_;
import de.ilg.wg.expensetrackerbackend.tag.dao.entity.Tag;

@SuppressWarnings("serial")
public class ExpenseSpecification {
	
	public static Specification<Expense> matchesOneReason(Set<String> reasons) {
	    return new Specification<Expense>() {
	    	@Override
	    	public Predicate toPredicate(Root<Expense> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
	    		Predicate[] reasonPredicates = reasons.stream()
	    				.map(reason -> builder.equal(root.get(Expense_.reason), reason))
	    				.toArray(Predicate[]::new);
	    		return builder.or(reasonPredicates);
	    	}
	    };
	}
	
	public static Specification<Expense> matchesMonth(Integer month) {
	    return new Specification<Expense>() {
	    	@Override
	    	public Predicate toPredicate(Root<Expense> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
	    		Expression<Integer> monthExpression = builder.function("month", Integer.class, root.get(Expense_.date));
	    		if (month != null) {
	    			return builder.equal(monthExpression, month);
	    		} else {
	    			return builder.isNotNull(monthExpression);
	    		}
	    	}
	    };
	}

	  public static Specification<Expense> matchesAtLeastOneTag(Set<String> tagNames) {
	    return new Specification<Expense>() {
	    	@Override
	    	public Predicate toPredicate(Root<Expense> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
	    		Predicate[] tagPredicates = tagNames.stream()
	    				.map(tagName -> new Tag(tagName))
	    				.map(tag -> builder.equal(root.get(Expense_.utilizedTags), tag))
	    				.toArray(Predicate[]::new);
	    		return builder.or(tagPredicates);
	    	}
	    };
	  }
}
