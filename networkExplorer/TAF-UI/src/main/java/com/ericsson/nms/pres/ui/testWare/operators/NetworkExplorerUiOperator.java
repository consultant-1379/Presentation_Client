package com.ericsson.nms.pres.ui.testWare.operators;


import javax.inject.Singleton;

import com.ericsson.cifwk.taf.UiOperator;
import com.ericsson.cifwk.taf.annotations.Context;
import com.ericsson.cifwk.taf.annotations.Operator;
import com.ericsson.cifwk.taf.ui.UiComponent;
import com.ericsson.nms.pres.ui.networkExplorer.test.pages.LoginView;
import com.ericsson.cifwk.taf.ui.sdk.Browser;
import com.ericsson.cifwk.taf.ui.sdk.BrowserTab;
import com.ericsson.cifwk.taf.ui.sdk.BrowserType;
import com.ericsson.cifwk.taf.ui.sdk.UI;
import com.ericsson.nms.pres.ui.networkExplorer.test.pages.NetworkExplorerView;

@Operator(context = Context.UI)
@Singleton
public class NetworkExplorerUiOperator implements LoginOperator, UiOperator {
	private Browser browser;
	private BrowserTab browserTab;
	private LoginView loginView;          // instantiate Views, once elements are actually there
    private NetworkExplorerView networkExplorerView;
    private String url;

    // required default constructor.
    public NetworkExplorerUiOperator() {  }

	public NetworkExplorerUiOperator(String url) {
		this.url = url;
		this.browser = UI.newBrowser(BrowserType.FIREFOX);
		this.browserTab = browser.open(url);
	}

	public String login(String username, String password) {
        loginView = browserTab.getView(LoginView.class);
        loginView.login(username, password);
        return "";
	}

    // TODO: this belongs to loginOperator
    public boolean isOnLogin(String domain) {
        return browserTab.getCurrentUrl().indexOf(domain + "login/?goto=") ==0;
    }

    public boolean isOnNetworkExplorerPage(String domain) {
        return browserTab.getCurrentUrl().indexOf(domain) ==0;
    }

    public String performSearch(String fdn) {
        networkExplorerView = browserTab.getView(NetworkExplorerView.class);
        return networkExplorerView.performSearch(fdn);
    }

    public UiComponent getFirstResultsRow(){
        networkExplorerView = browserTab.getView(NetworkExplorerView.class);
        return networkExplorerView.getResultsRows().get(0);
    }

    public int getNumberOfResultRows(){
        networkExplorerView = browserTab.getView(NetworkExplorerView.class);
        return networkExplorerView.getResultsRows().size();
    }

    /**
     * Verification functionality may also be present in operators.
     */
}
