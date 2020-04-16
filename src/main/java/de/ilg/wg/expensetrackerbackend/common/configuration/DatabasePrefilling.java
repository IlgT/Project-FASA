package de.ilg.wg.expensetrackerbackend.common.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import de.ilg.wg.expensetrackerbackend.tag.dao.api.TagDao;
import de.ilg.wg.expensetrackerbackend.tag.dao.entity.Tag;

@Configuration
public class DatabasePrefilling implements CommandLineRunner {

    @Autowired
    private TagDao tagDao;

    @Override
    public void run(String... args) throws Exception {
    	tagDao.save(new Tag("MONATLICH"));
    	tagDao.save(new Tag("QUARTALSWEISE"));
    	tagDao.save(new Tag("HALBJÄHRLICH"));
    	tagDao.save(new Tag("JÄHRLICH"));
    	tagDao.save(new Tag("WOHNEN"));
    	tagDao.save(new Tag("WOCHENEINKAUF"));
    	tagDao.save(new Tag("ESSEN"));
    	tagDao.save(new Tag("MOBILITÄT"));
    	tagDao.save(new Tag("MEDIEN"));
    	tagDao.save(new Tag("VERSICHERUNG"));
    	tagDao.save(new Tag("AUSGEHEN"));
    	tagDao.save(new Tag("SONSTIGES"));
    }
}