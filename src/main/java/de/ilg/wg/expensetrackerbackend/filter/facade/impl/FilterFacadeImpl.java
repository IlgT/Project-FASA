package de.ilg.wg.expensetrackerbackend.filter.facade.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import de.ilg.wg.expensetrackerbackend.filter.facade.api.FilterFacade;
import de.ilg.wg.expensetrackerbackend.filter.facade.api.UtilizedFilterDto;
import de.ilg.wg.expensetrackerbackend.filter.service.api.FilterService;

@Component
public class FilterFacadeImpl implements FilterFacade {
	
	@Autowired
	private FilterService filterService;

	@Override
	public UtilizedFilterDto getAllUtilizedFilter() {
		return filterService.getAllUtilizedFilter();
	}

}
