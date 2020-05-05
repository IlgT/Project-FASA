package de.ilg.wg.expensetrackerbackend.tag.service.api;

import java.util.List;

import de.ilg.wg.expensetrackerbackend.tag.facade.api.TagDto;

public interface TagService {
	
	public TagDto addTag(String TagName);
	
	public TagDto editTag(String TagName, String newTagName);
	
	public TagDto deleteTag(String TagName);
	
	public List<String> getAllTags();
}