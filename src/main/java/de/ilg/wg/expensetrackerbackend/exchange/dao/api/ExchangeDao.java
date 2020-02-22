package de.ilg.wg.expensetrackerbackend.exchange.dao.api;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import de.ilg.wg.expensetrackerbackend.exchange.dao.entity.Exchange;

public interface ExchangeDao extends JpaRepository<Exchange, Long> {
	
	List<Exchange> findByBaseAndSymbolAndDate(String base, String symbol, LocalDate date);
}
