package de.ilg.wg.expensetrackerbackend.tag.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.ilg.wg.expensetrackerbackend.tag.dao.api.TagDao;
import de.ilg.wg.expensetrackerbackend.tag.dao.entity.Tag;
import de.ilg.wg.expensetrackerbackend.tag.service.api.TagService;

@Service
public class TagServiceImpl implements TagService{
	
	@Autowired
	private TagDao tagDao;

	@Override
	public Tag addTag(Tag newTag) {
		return tagDao.save(newTag);
	}

	@Override
	public Tag editTag(Tag updatedTag) {
		return tagDao.save(updatedTag);

	}

	@Override
	public void deleteTag(long id) {
		tagDao.deleteById(id);
	}

	@Override
	public List<Tag> getAllTags() {
		return tagDao.findAll();
	}

	@Override
	public Tag findTagById(long id) {
		return tagDao.findById(id).orElse(null);
	}
	
}
