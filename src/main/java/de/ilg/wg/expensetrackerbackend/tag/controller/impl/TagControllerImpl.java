package de.ilg.wg.expensetrackerbackend.tag.controller.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import de.ilg.wg.expensetrackerbackend.tag.controller.api.TagController;
import de.ilg.wg.expensetrackerbackend.tag.facade.api.TagDto;
import de.ilg.wg.expensetrackerbackend.tag.facade.api.TagFacade;

@RestController
@RequestMapping("/tags")
public class TagControllerImpl implements TagController{
	
	@Autowired
	private TagFacade tagFacade;
	
	@RequestMapping(
			method = RequestMethod.POST)
	@ResponseBody
	public TagDto createNewTag(@RequestBody TagDto newTag) {
		return tagFacade.addTag(newTag);
	}
	
	@RequestMapping(
			method = RequestMethod.PUT)
	@ResponseBody
	public TagDto updateTag(@RequestBody TagDto updatedTag) {
		return tagFacade.addTag(updatedTag);
	}
	
	@RequestMapping(
			method = RequestMethod.GET)
	@ResponseBody
	public Set<TagDto> getAllTags() {
		return tagFacade.getAllTags();
	}
	
	@RequestMapping(
			path = "/{id}",
			method = RequestMethod.DELETE
			)
	@ResponseBody
	public void deleteTag(@PathVariable long id) {
		tagFacade.deleteTag(id);
	}
	
}
