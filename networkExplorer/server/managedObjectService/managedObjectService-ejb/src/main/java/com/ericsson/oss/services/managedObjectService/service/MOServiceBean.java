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

package com.ericsson.oss.services.managedObjectService.service;

import javax.inject.Inject;
import javax.inject.Named;

import com.ericsson.oss.services.managedObjectService.api.ManagedObjectDTO;
import com.ericsson.oss.services.managedObjectService.dao.api.MODAO;
import com.ericsson.oss.services.managedObjectService.service.api.MOService;

/**
 * @author eramkoh
 * 
 */

@Named
public class MOServiceBean implements MOService {
	@Inject
	private MODAO moDao;

	@Override
	public <T extends ManagedObjectDTO> T getMOByFDN(String fdn) {
		return moDao.getMoByFDN(fdn);
	}

}
