package de.ilg.wg.expensetrackerbackend.tag.controller.api;

import java.util.List;

import de.ilg.wg.expensetrackerbackend.tag.facade.api.TagDto;

public interface TagController {
	
	public TagDto createNewTag(TagDto newTag);
	
	public TagDto updateTag(TagDto updatedTag);
	
	public List<TagDto> getAllTags();
	
	public void deleteTag(long id);
}