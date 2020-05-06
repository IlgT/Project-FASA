package de.ilg.wg.expensetrackerbackend.filter.service.impl;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.ilg.wg.expensetrackerbackend.exchange.facade.api.ExchangeFacade;
import de.ilg.wg.expensetrackerbackend.expense.facade.api.ExpenseFacade;
import de.ilg.wg.expensetrackerbackend.filter.facade.api.UtilizedFilterDto;
import de.ilg.wg.expensetrackerbackend.filter.service.api.FilterService;
import de.ilg.wg.expensetrackerbackend.tag.facade.api.TagFacade;

@Service
public class FilterServiceImpl implements FilterService {
	
	@Autowired
	private ExpenseFacade expenseFacade;
	
	@Autowired
	private ExchangeFacade exchangeFacade;
	
	@Autowired
	private TagFacade tagFacade;

	@Override
	public UtilizedFilterDto getAllUtilizedFilter() {
		Set<String> reasons = expenseFacade.getUtilizedReasons();
		Set<Integer> months = expenseFacade.getUtilizedMonths();
		Set<String> tags = tagFacade.getAllTags().stream().map(tag -> tag.getName()).collect(Collectors.toSet());
		Set<String> currencies = exchangeFacade.getAllCurrencies();
		return new UtilizedFilterDto(reasons, months, tags, currencies);
	}

}
