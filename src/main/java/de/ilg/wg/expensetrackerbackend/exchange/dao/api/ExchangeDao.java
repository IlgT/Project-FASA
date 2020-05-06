package de.ilg.wg.expensetrackerbackend.exchange.dao.api;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import de.ilg.wg.expensetrackerbackend.exchange.dao.entity.Exchange;

@Repository
public interface ExchangeDao extends JpaRepository<Exchange, Long> {
	
	Exchange findByBaseAndTargetAndDate(String base, String target, LocalDate date);
}
