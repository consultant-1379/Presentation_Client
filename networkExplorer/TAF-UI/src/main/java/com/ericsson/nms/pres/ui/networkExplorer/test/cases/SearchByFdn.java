package com.ericsson.nms.pres.ui.networkExplorer.test.cases;

import com.ericsson.cifwk.taf.annotations.*;
import com.ericsson.nms.pres.ui.networkExplorer.test.helpers.OperatorHelper;
import com.ericsson.nms.pres.ui.testWare.operators.NetworkExplorerUiOperator;
import org.testng.Assert;
import org.testng.annotations.Test;

import com.ericsson.cifwk.taf.TestCase;
import com.ericsson.cifwk.taf.TorTestCaseHelper;

public class SearchByFdn extends TorTestCaseHelper implements TestCase {
	private NetworkExplorerUiOperator operator;

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

        operator.performSearch("MeContext=ERBS001");
        Assert.assertEquals(operator.getNumberOfResultRows(), 1);
	}
}
