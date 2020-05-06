package de.ilg.wg.expensetrackerbackend.filter.facade.api;

import java.util.Set;

import lombok.NonNull;
import lombok.Value;

@Value
public class UtilizedFilterDto {
	
	@NonNull private Set<String> reasons;
	
	@NonNull private Set<Integer> months;
	
	@NonNull private Set<String> tags;
	
	@NonNull private Set<String> currencies;

}
