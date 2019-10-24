package de.ilg.wg.expensetrackerbackend.exchange.dao.api;

import org.springframework.data.jpa.repository.JpaRepository;

import de.ilg.wg.expensetrackerbackend.exchange.dao.entity.Exchange;

public interface ExchangeDao extends JpaRepository<Exchange, Long> { }