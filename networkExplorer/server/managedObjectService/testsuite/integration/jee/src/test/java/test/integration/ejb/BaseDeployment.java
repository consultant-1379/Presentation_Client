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
package test.integration.ejb;

import java.io.File;

import org.jboss.shrinkwrap.api.Archive;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.spec.EnterpriseArchive;
import org.jboss.shrinkwrap.api.spec.JavaArchive;
import org.jboss.shrinkwrap.resolver.api.DependencyResolvers;
import org.jboss.shrinkwrap.resolver.api.maven.MavenDependencyResolver;

import test.integration.Artifact;

import com.ericsson.oss.services.managedObjectService.api.ManagedObjectDTO;
import com.ericsson.oss.services.managedObjectService.dao.MODAOBean;
import com.ericsson.oss.services.managedObjectService.dao.api.MODAO;
import com.ericsson.oss.services.managedObjectService.utils.ManagedObjectUtility;

/**
 * @author eramkoh
 * 
 */
public class BaseDeployment {

	public static final File BEANS_XML_FILE = new File(
			"src/test/resources/META-INF/beans.xml");

	public static final File MANIFEST_MF_FILE = new File(
			"src/test/resources/META-INF/MANIFEST.MF");

	public static final File JAR_MANIFEST_MF_FILE = new File(
			"src/test/java/MANIFEST.MF");

	public static final File DEPLOYMENT_STRUCTURE = new File(
			"src/test/resources/META-INF/jboss-deployment-structure.xml");

	public static EnterpriseArchive createDeployment(Class klass) {

		final MavenDependencyResolver resolver = DependencyResolvers.use(
				MavenDependencyResolver.class).loadMetadataFromPom("pom.xml");
		final EnterpriseArchive archive = ShrinkWrap
				.create(EnterpriseArchive.class, klass.toString() + ".ear")
				.addAsModule(createModuleArchive())
				.addAsLibraries(
						resolver.artifact(
								Artifact.COM_ERICSSON_OSS_ITPF_SDK___SERVICES_CORE_JAR)
								.resolveAsFiles())
				.addAsLibraries(
						resolver.artifact(
								Artifact.COM_ERICSSON_OSS_ITPF_SDK___CONFIG_API_JAR)
								.resolveAsFiles())
				.addAsLibraries(
						resolver.artifact(
								Artifact.COM_ERICSSON_OSS_ITPF_SDK___CONFIG_CORE_JAR)
								.resolveAsFiles())
				.addAsLibraries(
						resolver.artifact(
								Artifact.COM_ERICSSON_OSS_ITPF_SDK___CONFIG_CACHE_NON_CDI_JAR)
								.resolveAsFiles())
				.addAsLibraries(
						resolver.artifact(Artifact.BEAN_UTILS).resolveAsFiles())

				.addAsLibrary(createLibraryArchive(klass))
				.setManifest(Artifact.MANIFEST_MF_FILE)
				.addAsManifestResource(DEPLOYMENT_STRUCTURE)

		;
		return archive;

	}

	private static Archive<?> createModuleArchive() {
		JavaArchive archive = ShrinkWrap
				.create(JavaArchive.class, "service-bean-test-ejb.jar")
				.addAsResource("META-INF/beans.xml", "META-INF/beans.xml")
				.addPackage(MODAO.class.getPackage()).addClass(MODAO.class)
				.addPackage(MODAOBean.class.getPackage())
				.addClass(MODAOBean.class).addClass(ManagedObjectUtility.class)
				.addClass(ManagedObjectDTO.class)

		;
		// .setManifest(JAR_MANIFEST_MF_FILE);

		return archive;
	}

	private static JavaArchive createLibraryArchive(Class klass) {

		return ShrinkWrap
				.create(JavaArchive.class, "application-service-test.jar")

				.addAsResource("META-INF/beans.xml")

				.addClasses(klass).addClasses(ToplogyCreator.class)

		;

	}

}
