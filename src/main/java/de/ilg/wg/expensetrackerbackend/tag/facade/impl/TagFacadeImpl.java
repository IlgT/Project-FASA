package de.ilg.wg.expensetrackerbackend.tag.facade.impl;

import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import de.ilg.wg.expensetrackerbackend.tag.dao.entity.Tag;
import de.ilg.wg.expensetrackerbackend.tag.facade.api.TagDto;
import de.ilg.wg.expensetrackerbackend.tag.facade.api.TagFacade;
import de.ilg.wg.expensetrackerbackend.tag.service.api.TagService;

@Component
public class TagFacadeImpl implements TagFacade {
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private TagService tagService;

	@Override
	public TagDto addTag(TagDto newTag) {
		Tag newTagEntity = mapToTag(newTag);
		newTagEntity = tagService.addTag(newTagEntity);
		return modelMapper.map(newTagEntity, TagDto.class);
	}

	@Override
	public TagDto editTag(TagDto updatedTag) {
		Tag updatedTagEntity = mapToTag(updatedTag);
		updatedTagEntity = tagService.editTag(updatedTagEntity);
		return modelMapper.map(updatedTagEntity, TagDto.class);
	}

	@Override
	public void deleteTag(long id) {
		tagService.deleteTag(id);
	}

	@Override
	public Set<TagDto> getAllTags() {
		Set<Tag> availableTags = tagService.getAllTags();
		return availableTags.stream()
                .map(tag -> modelMapper.map(tag, TagDto.class))
                .collect(Collectors.toSet());
	}

	private Tag mapToTag(TagDto updatedTag) {
		Tag updatedTagEntity = modelMapper.map(updatedTag, Tag.class);
		if (updatedTag.getId() != null) {
	        Tag oldTag = tagService.findTagById(updatedTag.getId());
	        updatedTagEntity.setVersion(oldTag.getVersion());
	        updatedTagEntity.setExpenses(oldTag.getExpenses());
	        updatedTagEntity.setCreatedTimestamp(oldTag.getCreatedTimestamp());
	        updatedTagEntity.setUpdatedTimestamp(oldTag.getUpdatedTimestamp());
	    }
		return updatedTagEntity;
	}

}
