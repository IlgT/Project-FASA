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
    	tagDao.save(new Tag("Monatlich"));
    	tagDao.save(new Tag("Quartalsweise"));
    	tagDao.save(new Tag("Halbjährlich"));
    	tagDao.save(new Tag("Jährlich"));
    	tagDao.save(new Tag("Wohnen"));
    	tagDao.save(new Tag("Wocheneinkauf"));
    	tagDao.save(new Tag("Essen"));
    	tagDao.save(new Tag("Mobilität"));
    	tagDao.save(new Tag("Medien"));
    	tagDao.save(new Tag("Versicherung"));
    	tagDao.save(new Tag("Ausgehen"));
    	tagDao.save(new Tag("Sonstiges"));
    }
}