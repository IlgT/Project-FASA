package de.ilg.wg.expensetrackerbackend.tag.facade.api;

import java.util.Set;

public interface TagFacade {
	
	public TagDto addTag(TagDto newTag);
	
	public TagDto editTag(TagDto updatedTag);
	
	public void deleteTag(long id);
	
	public Set<TagDto> getAllTags();

}
