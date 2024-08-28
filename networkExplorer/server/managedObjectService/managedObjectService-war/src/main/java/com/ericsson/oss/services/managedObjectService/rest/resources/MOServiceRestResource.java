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
package com.ericsson.oss.services.managedObjectService.rest.resources;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ericsson.oss.services.managedObjectService.service.api.MOService;

@Path("/moService")
@RequestScoped
public class MOServiceRestResource {

	@Inject
	private MOService moService;

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("nodes/{fdn}")
	public Response getNodeByFDN(@PathParam("fdn") final String fdn) {
		return Response.status(200).entity(moService.getMOByFDN(fdn)).build();
	}

}
