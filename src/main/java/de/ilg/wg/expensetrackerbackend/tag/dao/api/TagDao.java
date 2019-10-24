package de.ilg.wg.expensetrackerbackend.tag.dao.api;

import org.springframework.data.jpa.repository.JpaRepository;

import de.ilg.wg.expensetrackerbackend.tag.dao.entity.Tag;

public interface TagDao extends JpaRepository<Tag, Long> { }