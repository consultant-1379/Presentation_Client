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

import javax.inject.Inject;
import javax.transaction.*;

import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.container.test.api.OverProtocol;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.shrinkwrap.api.Archive;
import org.junit.*;
import org.junit.runner.RunWith;
import org.slf4j.Logger;

import com.ericsson.oss.services.managedObjectService.api.ManagedObjectDTO;
import com.ericsson.oss.services.managedObjectService.dao.api.MODAO;

/**
 * @author eramkoh
 * 
 */
@RunWith(Arquillian.class)
public class MODAOBeanTest extends ToplogyCreator

{

	@Inject
	private Logger logger;

	@Inject
	private MODAO moDAOBean;

	@Deployment
	@OverProtocol("Servlet 3.0")
	public static Archive<?> getDeployment() {
		return BaseDeployment.createDeployment(MODAOBeanTest.class);
	}

	@Before
	public void insertData() throws Exception {
		createNode("ERBS1");
		// createNode("ERBS2");
		// createNode("ERBS3");
	}

	@Test
	public void getMOByFDN() {
		try {
			userTransaction.begin();
			ManagedObjectDTO moDTO = moDAOBean
					.getMoByFDN("MeContext=ERBS1,ManagedElement=1,ENodeBFunction=1,EUtranCellFDD=Cell1");
			logger.info("****************************************************************************************************************");
			logger.info("\n");
			logger.info("\n");

			logger.info(moDTO.getType());

			logger.info("\n");
			logger.info("\n");
			logger.info("****************************************************************************************************************");
			Assert.assertNotNull(moDTO.getType());
			Assert.assertNotNull(true);
			userTransaction.commit();
		} catch (SystemException | SecurityException | IllegalStateException
				| RollbackException | HeuristicMixedException
				| HeuristicRollbackException | NotSupportedException e) {
			e.printStackTrace();
		}

	}

	@After
	public void cleanUp() throws Exception {
		try {
			// deleteAllNodes();
		} finally {
			rollbackTransactionIfActive();
		}

	}

}
