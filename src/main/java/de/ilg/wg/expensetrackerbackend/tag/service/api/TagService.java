package de.ilg.wg.expensetrackerbackend.tag.service.api;

import java.util.Set;

import de.ilg.wg.expensetrackerbackend.tag.dao.entity.Tag;

public interface TagService {
	
	public Tag addTag(Tag newTag);
	
	public Tag editTag(Tag updatedTag);
	
	public void deleteTag(long id);
	
	public Set<Tag> getAllTags();
	
	public Tag findTagById(long id);
	
	public Tag findTagByNameIgnoreCase(String tagName);
}