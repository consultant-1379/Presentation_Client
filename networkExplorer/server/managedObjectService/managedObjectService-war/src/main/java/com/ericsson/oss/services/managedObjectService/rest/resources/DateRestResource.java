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
import javax.ws.rs.Path;

import org.slf4j.Logger;

/*
 * Rest Services 
 *  
 * Resources are served relative to the servlet path specified in the {@link ApplicationPath}
 * annotation.
 * 
 */
@Path("/resource")
@RequestScoped
public class DateRestResource {

	@Inject
	private Logger logger;

}