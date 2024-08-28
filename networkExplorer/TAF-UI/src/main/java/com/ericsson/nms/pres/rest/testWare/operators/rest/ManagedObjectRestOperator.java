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
package com.ericsson.nms.pres.rest.testWare.operators.rest;

import com.ericsson.cifwk.taf.data.Host;
import com.ericsson.cifwk.taf.tal.rest.RestResponseCode;
import com.ericsson.cifwk.taf.tools.RestTool;
import com.ericsson.nms.pres.rest.testWare.getters.rest.ManagedObjectServiceGetter;
import com.ericsson.nms.pres.rest.testWare.operators.NetworkExplorerOperatorActions;
import org.apache.log4j.Logger;

import java.util.List;

/*
 * This class is "operating" on SUT in REST context. To do it it uses RestTool
 */
public class ManagedObjectRestOperator implements NetworkExplorerOperatorActions, com.ericsson.cifwk.taf.RestOperator {

	private final static Logger logger = Logger.getLogger(ManagedObjectRestOperator.class);

	private RestTool restTool;

    @Override
    public List<String> executeRestCall(Host restServer, String query) {

        restTool = new RestTool(restServer);
        /*
		 * URI is externalised and isolated in GETTER class, so when it changes, it will required effort in one place only
		 */
        final List<String> calResponseContent = restTool.get(ManagedObjectServiceGetter.getResourcePath() + query);
        printResponseTimes();
        return calResponseContent;
    }

	/*
	 * This is implementation of executeAuthorisedRestCall method in REST context
	 */
	@Override
	public List<String> executeAuthorisedRestCall(Host restServer, String userName, String password, String query) {
		restTool = new RestTool(restServer);
		restTool.setAuthenticationCredentails(userName, password);
        final List<String> calResponseContent = restTool.get(ManagedObjectServiceGetter.getResourcePath() + query);
		printResponseTimes();
		return calResponseContent;
	}

	/*
	 * This method is implementing verification of response codes 
	 */
	private boolean verifyResponseCodes(List<RestResponseCode> responseCodes){
		boolean result = true;
		for (RestResponseCode callResponseCode : responseCodes){
			/*
			 * Putting debug information is very helpful when test case is failing
			 */
			logger.debug("Processing response code " + callResponseCode);
			/*
			 * Expected content is externalised and isolated in GETTER class for maintenance purposes
			 */
			result = result && (callResponseCode == ManagedObjectServiceGetter.SUCCESSFUL_CALL_CODE);
		}
		/*
		 * Because method is returning boolean, it is good practice to put actual result on the test report
		 */
		logger.info("Result of response code verification: " + result);
		return result;
	}
	/*
	 * Optionally verification of content could be done in this operator
	 */

	/*
	 * This method is operating on response times programatically,
	 * The average response time is being logged by Tool Monitor if enabled
	 */
	private void printResponseTimes(){
		final List<Long> callResponseTimes = restTool.getLastExecutionTimes();
		for (Long time: callResponseTimes){
			logger.debug("Response time: " + time);
		}
		logger.debug("Average response time: " + restTool.getAverageExecutionTime());		
	}
}