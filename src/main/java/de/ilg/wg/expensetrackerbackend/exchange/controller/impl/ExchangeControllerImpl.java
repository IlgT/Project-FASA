package de.ilg.wg.expensetrackerbackend.exchange.controller.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import de.ilg.wg.expensetrackerbackend.exchange.controller.api.ExchangeController;
import de.ilg.wg.expensetrackerbackend.exchange.facade.api.ExchangeFacade;

@RestController
@RequestMapping("/exchange")
public class ExchangeControllerImpl implements ExchangeController {

	@Autowired
	private ExchangeFacade exchangeFacade;

	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	@Override
	public Set<String> getAllCurrencies() {
		return exchangeFacade.getAllCurrencies();
	}

	@RequestMapping(
			path = "/default",
			method = RequestMethod.GET
			)
	@ResponseBody
	@Override
	public String getDefaultCurrency() {
		return exchangeFacade.getDefaultCurrency();
	}

}
