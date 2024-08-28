package test.integration;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ericsson.oss.itpf.sdk.config.provider.*;

public class JEETestConfigurationPropertyProvider implements
		ConfigurationPropertyProvider {

	private static final Logger LOGGER = LoggerFactory
			.getLogger(JEETestConfigurationPropertyProvider.class);
	private final static Map<String, String> VALUES = new HashMap<String, String>();
	private final static Map<String, Class<?>> TYPE_MAP = new HashMap<String, Class<?>>();

	static {

		VALUES.put("testNumber", "12345");
		TYPE_MAP.put("testNumber", int.class);

		LOGGER.info("prepared static propery map! size={}", VALUES.size());
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.ericsson.oss.services.sdk.config.provider.ConfigurationPropertyProvider
	 * #resolveProperty(java.lang.String)
	 */
	@Override
	public ProvidedProperty resolveProperty(final String propertyName) {
		LOGGER.debug("resolveProperty() propertyName={}", propertyName);
		if (VALUES.containsKey(propertyName)
				&& TYPE_MAP.containsKey(propertyName)) {
			return new ProvidedProperty(propertyName, PropertyScope.GLOBAL,
					VALUES.get(propertyName), TYPE_MAP.get(propertyName));
		}
		if (VALUES.containsKey(propertyName)) {
			LOGGER.debug("resolveProperty() propertyName={} returning={}",
					propertyName, VALUES.get(propertyName));
			final ProvidedProperty property = new ProvidedProperty(
					propertyName, PropertyScope.GLOBAL,
					VALUES.get(propertyName), String.class);
			return property;
		} else {
			LOGGER.debug("resolveProperty() propertyName={} returning null",
					propertyName);
			return null;
		}
	}

	public static void updateProperty(final String name, final String value) {
		VALUES.put(name, value);
	}
}
