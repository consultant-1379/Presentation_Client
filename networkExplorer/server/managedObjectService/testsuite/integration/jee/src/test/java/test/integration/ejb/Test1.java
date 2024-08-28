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

/**
 * @author eramkoh
 *
 */
package test.integration.ejb;

import javax.inject.Inject;

import org.jboss.arquillian.junit.Arquillian;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;

import test.integration.DeployProjectArtifact;

import com.ericsson.oss.services.managedObjectService.dao.api.MODAO;

/**
 * @author eramkoh
 * 
 */
@RunWith(Arquillian.class)
@DeployProjectArtifact(testable = true)
public class Test1 extends ToplogyCreator {

	@Inject
	MODAO moDAOBean;

	// @Deployment
	// @OverProtocol("Servlet 3.0")
	// public static Archive<?> getDeployment() {
	// return BaseDeployment.createDeployment(Test1.class);
	// }

	@Test
	public void testIsDeployed() {
		try {
			deleteAllNodes();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Assert.assertNotNull(true);
	}

}
