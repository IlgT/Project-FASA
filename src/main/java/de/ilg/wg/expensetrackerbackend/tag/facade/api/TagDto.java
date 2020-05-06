package de.ilg.wg.expensetrackerbackend.tag.facade.api;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.ToString;

@Data
@NoArgsConstructor
public class TagDto {

	@ToString.Exclude
	private Long id;

	@ToString.Exclude
	private Long version;
	
	@NonNull private String name;
}
