package com.ericsson.nms.pres.testWare.getters.api;

import com.ericsson.cifwk.taf.ApiGetter;
import com.ericsson.cifwk.taf.data.Host;
import com.ericsson.cifwk.taf.handlers.RemoteFileHandler;
/**
 *
 *	API Context Getter for executing Test Cases for RemoteFileHandler
 */
public class RemoteFileHandlerApiGetter implements ApiGetter{

	public RemoteFileHandler getTestedService(Host host){
		return new RemoteFileHandler(host);
	}

	public RemoteFileHandler getTestedService(){
		return new RemoteFileHandler();
	}
}