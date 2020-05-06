package de.ilg.wg.expensetrackerbackend.filter.controller.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import de.ilg.wg.expensetrackerbackend.filter.controller.api.FilterController;
import de.ilg.wg.expensetrackerbackend.filter.facade.api.FilterFacade;
import de.ilg.wg.expensetrackerbackend.filter.facade.api.UtilizedFilterDto;

@RestController
@RequestMapping("/filter")
public class FilterControllerImpl implements FilterController {
	
	@Autowired
	private FilterFacade filterFacade;

	@RequestMapping(
			method = RequestMethod.GET)
	@ResponseBody
	@Override
	public UtilizedFilterDto getUtilizedFilters() {
		return filterFacade.getAllUtilizedFilter();
	}

}
