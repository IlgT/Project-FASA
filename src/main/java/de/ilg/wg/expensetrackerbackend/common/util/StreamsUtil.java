package de.ilg.wg.expensetrackerbackend.common.util;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Stream;

public class StreamsUtil {

	public static <T> Stream<T> getNullableStream(Set<T> list) {
	    return Optional.ofNullable(list).map(Set::stream).orElseGet(Stream::empty);
	}
}
