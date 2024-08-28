package com.ericsson.nms.pres.ui.networkExplorer.test.pages;

import com.ericsson.cifwk.taf.ui.UiComponent;
import com.ericsson.cifwk.taf.ui.UiComponentMapping;
import com.ericsson.cifwk.taf.ui.UiMediator;
import com.ericsson.cifwk.taf.ui.sdk.*;

import java.util.List;

public class NetworkExplorerView extends ViewModel {

//    @UiComponentMapping(lookupAs="<<css>>input.eaNetworkExplorer-rSearch-searchInput")
//    private TextBox searchInput;

    @UiComponentMapping("input.eaNetworkExplorer-rSearch-searchInput")
    private TextBox searchInput;

    @UiComponentMapping(".eaNetworkExplorer-rSearch-searchBtn")
    private Button searchButton;

    @UiComponentMapping(".ebTableRow")
    private List<UiComponent> resultRows;

    public NetworkExplorerView(UiMediator mediator, UiComponentAutowirer componentAutowirer) {
        super(mediator, componentAutowirer);
    }

    public String performSearch(String query) {
        searchInput.setText(query);
        searchButton.click();

        UI.pause(2000);
        // TODO: arrange to return current URL / or false / true
        return "mickeyMouse";
    }

    public List<UiComponent> getResultsRows(){
        return resultRows;
    }




}
