package com.ericsson.nms.pres.ui.networkExplorer.test.cases;

import com.ericsson.cifwk.taf.TestCase;
import com.ericsson.cifwk.taf.TorTestCaseHelper;
import com.ericsson.cifwk.taf.annotations.*;
import com.ericsson.nms.pres.rest.testWare.operators.rest.ManagedObjectRestOperator;
import com.ericsson.nms.pres.ui.networkExplorer.test.helpers.OperatorHelper;
import com.ericsson.nms.pres.ui.testWare.operators.NetworkExplorerUiOperator;
import org.testng.Assert;
import org.testng.annotations.Test;

public class DisplayMultipleResults extends TorTestCaseHelper implements TestCase {
	private NetworkExplorerUiOperator operator;
	private ManagedObjectRestOperator restOperator;

	@VUsers(vusers = {1})
    @TestId(id = "taftest12-func-1", title = "Verify ..... as expected")
	@Context(context = {Context.UI})
	@Test(enabled = true)
    @DataDriven(name = "login")
	public void searchByFdn(
            @Input("username") String username,
            @Input("password") String password,
            @Output("expected") String expected) {

		operator = new NetworkExplorerUiOperator(OperatorHelper.getTestUrl());
        operator.login(username, password);
        Assert.assertEquals(operator.isOnNetworkExplorerPage(OperatorHelper.getTestUrl()), true);

        setTestStep("PRE: More than one object of searched type is returned from REST layer.");



        setTestStep("EXECUTE: Search for a type.");
        operator.performSearch("types/EUtranCellFDD");


        setTestStep("VERIFY: Search for a type.");
        Assert.assertEquals(operator.getNumberOfResultRows()>1, true);

        setTestStep("VERIFY: Multiple rows are returned (same amount as from the REST");


	}
}
