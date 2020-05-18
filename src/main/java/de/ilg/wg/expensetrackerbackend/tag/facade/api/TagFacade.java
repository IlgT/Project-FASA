package de.ilg.wg.expensetrackerbackend.tag.facade.api;

import java.util.Set;

import de.ilg.wg.expensetrackerbackend.tag.dao.entity.Tag;

public interface TagFacade {
	
	public TagDto addTag(TagDto newTag);
	
	public TagDto editTag(TagDto updatedTag);
	
	public void deleteTag(long id);
	
	public Set<TagDto> getAllTags();
	
	public Tag findTagByNameIgnoreCase(String tagName);
}
