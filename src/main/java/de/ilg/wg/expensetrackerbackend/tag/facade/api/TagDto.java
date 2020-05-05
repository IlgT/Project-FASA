package de.ilg.wg.expensetrackerbackend.tag.facade.api;

import lombok.NonNull;
import lombok.ToString;
import lombok.Value;

@Value
public class TagDto {

	@ToString.Exclude
	private Long id;

	@ToString.Exclude
	private Long version;
	
	@NonNull private String name;
}
