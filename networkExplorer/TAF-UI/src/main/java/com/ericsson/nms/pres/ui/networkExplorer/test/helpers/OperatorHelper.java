package com.ericsson.nms.pres.ui.networkExplorer.test.helpers;

import com.ericsson.cifwk.taf.data.DataHandler;
import com.ericsson.cifwk.taf.data.Host;

public abstract class OperatorHelper {

    public static String getTestUrl() {
        Host testHost = DataHandler.getHostByName("networkExplorer");

        return testHost.getIp();  // no support for getUri
    }
}
