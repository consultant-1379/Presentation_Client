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

package com.ericsson.oss.services.managedObjectService.dao;

import javax.ejb.*;
import javax.inject.Inject;

import org.slf4j.Logger;

import com.ericsson.oss.itpf.datalayer.dps.DataBucket;
import com.ericsson.oss.itpf.datalayer.dps.DataPersistenceService;
import com.ericsson.oss.itpf.datalayer.dps.persistence.ManagedObject;
import com.ericsson.oss.services.managedObjectService.api.ManagedObjectDTO;
import com.ericsson.oss.services.managedObjectService.dao.api.MODAO;
import com.ericsson.oss.services.managedObjectService.utils.ManagedObjectUtility;

/**
 * @author eramkoh
 * 
 */

@Stateless
@Local(MODAO.class)
public class MODAOBean implements MODAO {
	@Inject
	private Logger logger;

	@EJB(lookup = "java:global/data-persistence-service-runtime/dps-ejb/DataPersistenceServiceBean!com.ericsson.oss.itpf.datalayer.dps.DataPersistenceService")
	DataPersistenceService dataPersistenceService;

	@SuppressWarnings("unchecked")
	@Override
	public <T extends ManagedObjectDTO> T getMoByFDN(String fdn) {
		DataBucket dataBucket = dataPersistenceService.getLiveBucket();
		ManagedObject mo = dataBucket.findMoByFdn(fdn);
		return (T) ManagedObjectUtility.copy(mo);
		// return (T) ManagedObjectUtility.proxyMO(mo);
	}
}
