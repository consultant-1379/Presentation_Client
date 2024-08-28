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
package com.ericsson.nms.pres.rest.networkExplorer.test.cases;

import com.ericsson.cifwk.taf.TestCase;
import com.ericsson.cifwk.taf.TorTestCaseHelper;
import com.ericsson.cifwk.taf.annotations.VUsers;
import com.ericsson.cifwk.taf.data.Host;
import com.ericsson.nms.pres.rest.networkExplorer.test.data.AuthorisationTestData;
import com.ericsson.nms.pres.rest.testWare.operators.NetworkExplorerOperator;
import org.json.simple.JSONArray;
import org.json.simple.JSONValue;
import org.testng.annotations.Test;

import java.util.HashMap;
import java.util.List;

import static com.ericsson.nms.pres.rest.testWare.util.ManagedObjectHelper.isValidMO;

/*
 * Test Case content should be mainly generated from AVS service!
 * Added part should be as minimal as possible and should contain:
 * - interaction between test cases
 * - usage of test data
 * - verification and reporting logic
 * 
 *  Shape of this class determines output on test report.
 * 
 * Please note superclass is TorTestCaseHelper that provides reporting utilities
 * and it is marked with TestCase interface used as a marker only  
 */
public class NetworkExplorerRestTest extends TorTestCaseHelper implements TestCase {
	/*
	 * Operator is the point of contact to "operate" - execute business actions on the tested functionality
	 * It also provides expected results
	 */
	NetworkExplorerOperator networkExplorerOperator = new NetworkExplorerOperator();
	
	/*
	 * Please note that both VUsers and Context are accepting arrays. It means that test case will be executed in all combinations of all
	 * values. Exception is UI context as it can be used with 1 parallel user only 
	 * Groups is a powerful mechanism allowing to tag test cases for reuse and isolated execution
	 * Test Case below will be part of smoke tests, but also used in R&V workflow and GAT executions
	 * 
	 * The test method should be short and simple - usually below 4 lines of non-reporting code (with optimum of one comparison line)
	 */

    //Search by FDN returns the MO's name in UI.
    @VUsers(vusers = {1})
    @Test(groups={"Acceptance"},dataProvider = "AuthorisationTestData", dataProviderClass = AuthorisationTestData.class)
    public void searchFdnReturnName(Host restServer, String userName, String password) {    // take as many params as data provider will try to pass
		/*
		 *Good practice is to improve default reporting by adding the test data parameters to setTestCase description
		 */
        setTestCase("TORF-2277_Func_1", "Search by FDN returns the MO's name in UI. On " + restServer + " using user: " + userName + " and pass: " + password );
        setTestStep("EXECUTE: User provides a valid FDN.");
        List<String> responseContent = networkExplorerOperator.executeRestCall(restServer, "MeContext=ERBS1");

        Object obj=JSONValue.parse(responseContent.get(0));
        JSONArray array=(JSONArray)obj;
        HashMap responseMap = (HashMap)array.get(0);

        setTestStep("VERIFY: Name of the MO matching the FDN is displayed.");
        assertEquals(responseMap.get("name"), "ERBS1");
    }


    @VUsers(vusers = {1})
	@Test(groups={"Acceptance"},dataProvider = "AuthorisationTestData", dataProviderClass = AuthorisationTestData.class)
	public void authorisedRestCall(Host restServer, String userName, String password) {

		setTestCase("TORF-2277_Func_2", "Single user accesses REST link representing \"search by FDN\" query. On " + restServer + " using user: " + userName + " and pass: " + password);

        setTestStep("Execute: get Managed Object by FDN");
        List<String> responseContent = networkExplorerOperator.executeRestCall(restServer, "MeContext=ERBS1");

        setTestStep("Verify: valid Managed Object is returned");

        String reportHeader = "Valid MO Returned = ";

        assertEquals(reportHeader + isValidMO(responseContent.get(0)), reportHeader + true);      // remove \n character when testing on a live server
	}
}