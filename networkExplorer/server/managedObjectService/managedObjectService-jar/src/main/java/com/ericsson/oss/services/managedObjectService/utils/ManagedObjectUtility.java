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

package com.ericsson.oss.services.managedObjectService.utils;

import java.lang.reflect.InvocationTargetException;
import java.util.*;

import org.apache.commons.beanutils.BeanUtils;

import com.ericsson.oss.itpf.datalayer.dps.persistence.ManagedObject;
import com.ericsson.oss.itpf.datalayer.dps.persistence.PersistenceObject;
import com.ericsson.oss.services.managedObjectService.api.ManagedObjectDTO;
import com.ericsson.oss.services.managedObjectService.api.PersistenceObjectDTO;

/**
 * @author eramkoh
 * 
 */
public class ManagedObjectUtility {

	public static ManagedObjectDTO copyBeanUtils(ManagedObject mo) {
		ManagedObjectDTO moDto = new ManagedObjectDTO();

		try {
			BeanUtils.copyProperties(moDto, mo);
		} catch (IllegalAccessException | InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return moDto;
	}

	// TODO: try using cglib proxy here
	public static ManagedObjectDTO copy(ManagedObject moInstance) {

		// TODO:BAD BAD WAY... try changing dps version n getAttributes(),
		// available in latest version of dps
		List<String> attributeList = new ArrayList<>();
		attributeList.add("physicalLayerCellIdGroup");
		attributeList.add("physicalLayerSubCellId");
		attributeList.add("earfcndl");
		attributeList.add("earfcnul");
		attributeList.add("cellId");

		ManagedObjectDTO dtoInstance = new ManagedObjectDTO();

		if (moInstance.getType().equals("EUtranCellFDD")) {
			dtoInstance.setAttributes(moInstance.getAttributes(attributeList));
		}

		List<ManagedObjectDTO> childrenList = new ArrayList<>();

		for (ManagedObject childMo : moInstance.getChildren()) {
			childrenList.add(copy(childMo));
		}
		dtoInstance.setChildren(childrenList);
		Map<String, Collection<PersistenceObjectDTO>> associationMap = new HashMap<>();

		for (Map.Entry<String, Collection<PersistenceObject>> entry : moInstance
				.getAssociations().entrySet()) {

			associationMap.put(entry.getKey(),
					copyPOCollection(entry.getValue()));
		}

		dtoInstance.setAssociations(associationMap);

		dtoInstance.setName(moInstance.getName());
		dtoInstance.setType(moInstance.getType());
		dtoInstance.setFdn(moInstance.getFdn());

		if (moInstance.getEntityAddressInfo() != null) {
			dtoInstance.setEntityAddressInfo(copyPO(moInstance
					.getEntityAddressInfo()));
		}
		dtoInstance.setLevel(moInstance.getLevel());
		dtoInstance.setPoId(moInstance.getPoId());
		dtoInstance.setVersion(moInstance.getVersion());
		// dtoInstance.

		return dtoInstance;
	}

	public static PersistenceObjectDTO copyPO(PersistenceObject po) {
		return new PersistenceObjectDTO();
	}

	public static Collection<PersistenceObjectDTO> copyPOCollection(
			Collection<PersistenceObject> poCollection) {
		Collection<PersistenceObjectDTO> poDTOColection = new ArrayList<>();
		return poDTOColection;
	}

}
