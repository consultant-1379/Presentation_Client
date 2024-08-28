/*------------------------------------------------------------------------------
 *******************************************************************************
 * COPYRIGHT Ericsson 2012
 *
 * The copyright to the computer program(s) herein is the property of
 * Ericsson Inc. The programs may be used and/or copied only with written
 * permission from Ericsson Inc. or in accordance with the terms and
 * conditions stipulated in the agreement/contract under which the
 * program(s) have been supplied.
 *******************************************************************************
 *----------------------------------------------------------------------------*/

package test.integration;

import java.io.File;

import org.jboss.shrinkwrap.resolver.api.DependencyResolvers;
import org.jboss.shrinkwrap.resolver.api.maven.MavenDependencyResolver;

/**
 * Maven artifact constants
 * 
 * @author emaomic
 * 
 */
public class Artifact {
	/**
     * 
     */
	public static final String ORG_SLF4J___SLF4J_API_JAR = "org.slf4j:slf4j-api:jar";
	public static final String COM_ERICSSON_OSS_ITPF_SDK___SERVICES_CORE_JAR = "com.ericsson.oss.itpf.sdk:sdk-services-core:jar";
	public static final String COM_ERICSSON_OSS_ITPF_SDK___CONFIG_API_JAR = "com.ericsson.oss.itpf.sdk:sdk-config-api:jar";
	public static final String COM_ERICSSON_OSS_ITPF_SDK___CONFIG_CORE_JAR = "com.ericsson.oss.itpf.sdk:sdk-config-core:jar";
	public static final String COM_ERICSSON_OSS_ITPF_SDK___CONFIG_CACHE_NON_CDI_JAR = "com.ericsson.oss.itpf.sdk:sdk-config-cache-non-cdi:jar";
	public static final String BEAN_UTILS = "commons-beanutils:commons-beanutils:1.8.3";
	public static final String COM_ERICSSON_OSS_ITPF_DATALAYER_DPS___DPS_API_JAR = "com.ericsson.oss.itpf.datalayer.dps:dps-api:1.0.100";

	public static final File BEANS_XML_FILE = new File(
			"src/test/resources/META-INF/beans.xml");

	public static final File MANIFEST_MF_FILE = new File(
			"src/test/resources/META-INF/MANIFEST.MF");

	public static final File JAR_MANIFEST_MF_FILE = new File(
			"src/test/java/MANIFEST.MF");

	public static final File DEPLOYMENT_STRUCTURE = new File(
			"src/test/resources/META-INF/jboss-deployment-structure.xml");

	/**
	 * 
	 * @return
	 */
	public static MavenDependencyResolver getMavenResolver() {
		return DependencyResolvers.use(MavenDependencyResolver.class)
				.loadMetadataFromPom("pom.xml");
	}
}
