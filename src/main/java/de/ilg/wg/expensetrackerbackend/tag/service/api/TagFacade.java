package de.ilg.wg.expensetrackerbackend.tag.service.api;

import java.util.List;

public interface TagFacade {
	
	public TagDto addTag(String TagName);
	
	public TagDto editTag(String TagName, String newTagName);
	
	public TagDto deleteTag(String TagName);
	
	public List<String> getAllTags();
}