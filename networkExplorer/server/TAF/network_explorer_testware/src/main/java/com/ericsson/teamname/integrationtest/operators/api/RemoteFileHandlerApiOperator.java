package com.ericsson.nms.pres.testWare.operators.api;

import org.apache.log4j.Logger;

import com.ericsson.cifwk.taf.ApiOperator;
import com.ericsson.cifwk.taf.data.Host;
import com.ericsson.cifwk.taf.exceptions.InvalidHostException;
import com.ericsson.cifwk.taf.handlers.RemoteFileHandler;
import com.ericsson.nms.pres.testWare.getters.api.RemoteFileHandlerApiGetter;

public class RemoteFileHandlerApiOperator implements ApiOperator{

    private final Logger logger = Logger.getLogger(RemoteFileHandlerApiOperator.class);
    RemoteFileHandlerApiGetter rfhServiceGetter = new RemoteFileHandlerApiGetter();


	public boolean compareRemoteFiles(Host host1, Host host2, String filepath1, String filepath2){
		if (  !(host1 instanceof Host)   ||   !(host2 instanceof Host) ){
			throw new InvalidHostException("null");
		}
		return rfhServiceGetter.getTestedService().compareRemoteFiles(host1, filepath1, host2, filepath2);
	}

	public boolean copyRemoteFile(Host host, String file){
		if (! (host instanceof Host)){
			throw new InvalidHostException("null");
		}
		RemoteFileHandler handler = rfhServiceGetter.getTestedService(host);

		String newFile = file.split("/")[1];
		return handler.copyRemoteFileToLocal(file, newFile);
	}
}
