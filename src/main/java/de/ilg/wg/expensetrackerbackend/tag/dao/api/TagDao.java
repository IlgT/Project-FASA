package de.ilg.wg.expensetrackerbackend.tag.dao.api;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import de.ilg.wg.expensetrackerbackend.tag.dao.entity.Tag;

@Repository
public interface TagDao extends JpaRepository<Tag, Long> {}