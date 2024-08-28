package com.ericsson.nms.pres.ui.networkExplorer.test.pages;

import com.ericsson.cifwk.taf.ui.UiComponentMapping;
import com.ericsson.cifwk.taf.ui.UiMediator;
import com.ericsson.cifwk.taf.ui.sdk.Button;
import com.ericsson.cifwk.taf.ui.sdk.TextBox;
import com.ericsson.cifwk.taf.ui.sdk.UI;
import com.ericsson.cifwk.taf.ui.sdk.UiComponentAutowirer;
import com.ericsson.cifwk.taf.ui.sdk.ViewModel;

public class LoginView extends ViewModel {

    @UiComponentMapping(id="loginUsername")
	private TextBox usernameInput;

	@UiComponentMapping(id="loginPassword")
	private TextBox passwordInput;

	@UiComponentMapping(id="submit")
	private Button submitButton;

	public LoginView(UiMediator mediator, UiComponentAutowirer componentInitializer) {
		super(mediator, componentInitializer);
	}

	public String login(String username, String password) {
		usernameInput.setText(username);
		passwordInput.setText(password);
		submitButton.click();

		UI.pause(1000);      // currently no possibility to wait and verify redirect

        // TODO: arrange to return current URL / or false / true
		return "mickeyMouse";
	}
}
