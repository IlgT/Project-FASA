package de.ilg.wg.expensetrackerbackend.tag.facade.api;

import java.util.List;

public interface TagFacade {
	
	public TagDto addTag(TagDto newTag);
	
	public TagDto editTag(TagDto updatedTag);
	
	public void deleteTag(long id);
	
	public List<TagDto> getAllTags();

}
