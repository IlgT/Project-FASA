package de.ilg.wg.expensetrackerbackend.income.dao.api;

import org.springframework.data.jpa.repository.JpaRepository;

import de.ilg.wg.expensetrackerbackend.income.dao.entity.Income;

public interface IncomeDao extends JpaRepository<Income, Long> { }
