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

import java.util.*;

import javax.ejb.EJB;
import javax.inject.Inject;
import javax.transaction.*;

import com.ericsson.oss.itpf.datalayer.dps.DataBucket;
import com.ericsson.oss.itpf.datalayer.dps.DataPersistenceService;
import com.ericsson.oss.itpf.datalayer.dps.persistence.ManagedObject;
import com.ericsson.oss.itpf.datalayer.dps.persistence.PersistenceObject;
import com.ericsson.oss.itpf.datalayer.dps.query.TypeQueryCriteria;

/**
 * @author eramkoh
 * 
 */
public class ToplogyCreator {

	@EJB(lookup = "java:global/data-persistence-service-runtime/dps-ejb/DataPersistenceServiceBean!com.ericsson.oss.itpf.datalayer.dps.DataPersistenceService")
	protected DataPersistenceService dps;

	@Inject
	protected UserTransaction userTransaction;

	public void rollbackTransactionIfActive() throws Exception {
		if (isActive(userTransaction) || isMarkedForRollback(userTransaction)) {
			userTransaction.rollback();
		}
	}

	private boolean isMarkedForRollback(final UserTransaction utx) {
		try {
			final int status = utx.getStatus();
			return status == Status.STATUS_MARKED_ROLLBACK;
		} catch (final SystemException e) {
			return false;
		}
	}

	private boolean isActive(final UserTransaction utx) {
		try {
			final int status = utx.getStatus();
			return status == Status.STATUS_ACTIVE;
		} catch (final SystemException e) {
			return false;
		}
	}

	protected void createNode(final String nodeName) throws Exception {
		userTransaction.begin();
		final DataBucket liveBucket = dps.getLiveBucket();
		// PArent
		final ManagedObject parentMo = liveBucket.createMibRoot(
				"ERBS_NODE_MODEL_D", "MeContext", null, null, nodeName, null);
		// 2nd
		final ManagedObject managedElementMo = liveBucket.createMo("1",
				"ManagedElement", parentMo, null);

		// 3rd
		final ManagedObject eNodeMo = liveBucket.createMo("1",
				"ENodeBFunction", managedElementMo, null);
		// 4th
		final Map<String, Object> cell1MoAtts = new HashMap<String, Object>();
		cell1MoAtts.put("physicalLayerCellIdGroup", new Long(161));
		cell1MoAtts.put("physicalLayerSubCellId", new Long(0));
		cell1MoAtts.put("earfcndl", new Long(2175));
		cell1MoAtts.put("earfcnul", new Long(20175));
		cell1MoAtts.put("cellId", new Long(23));
		final ManagedObject cell1Mo = liveBucket.createMo("Cell1",
				"EUtranCellFDD", eNodeMo, cell1MoAtts);
		final Map<String, Object> cell2MoAtts = new HashMap<String, Object>();
		cell2MoAtts.put("physicalLayerCellIdGroup", new Long(160));
		cell2MoAtts.put("physicalLayerSubCellId", new Long(0));
		cell2MoAtts.put("earfcndl", new Long(2175));
		cell2MoAtts.put("earfcnul", new Long(20175));
		cell2MoAtts.put("cellId", new Long(23));

		final ManagedObject cell2Mo = liveBucket.createMo("Cell2",
				"EUtranCellFDD", eNodeMo, cell2MoAtts);
		// 5th AdminState MO for checking restriction thing
		// final Map<String, Object> adminStateAttr = new HashMap<String,
		// Object>();
		// adminStateAttr.put("UNLOCKED", 1);
		// final ManagedObject adminSate = liveBucket.createMo("adminState",
		// "AdminState", cell2Mo, adminStateAttr);

		userTransaction.commit();
	}

	protected void deleteAllNodes() throws Exception {
		userTransaction.begin();

		final TypeQueryCriteria query = dps.getQueryCriteriaBuilder()
				.createTypeQueryCriteria("ERBS_NODE_MODEL_D", "MeContext");
		final Iterator<PersistenceObject> iterator = dps.getLiveBucket()
				.getQueryExecutor().execute(query);
		while (iterator.hasNext()) {
			final PersistenceObject po = iterator.next();
			dps.getLiveBucket().deletePo(po);
		}
		userTransaction.commit();
	}

}
