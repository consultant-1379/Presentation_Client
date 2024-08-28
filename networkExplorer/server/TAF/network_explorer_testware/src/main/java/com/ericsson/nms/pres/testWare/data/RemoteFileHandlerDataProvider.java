
package com.ericsson.nms.pres.testWare.data;
import java.util.ArrayList;
import java.util.List;

import com.ericsson.cifwk.taf.DataProvider;
import com.ericsson.cifwk.taf.data.DataHandler;
import com.ericsson.cifwk.taf.data.Host;

/**
 *
 *	DataProvider for executing Test Cases for RemoteFileHandler
 */
public class RemoteFileHandlerDataProvider implements DataProvider{

	List<String> filePaths;

	public List<String> getFilePaths(){

		filePaths = new ArrayList<String>();

		filePaths.add("remotefilehandlerfolderthomas/compareFile1.txt");
		filePaths.add("remotefilehandlerfolderthomas/compareFile2.txt");
		filePaths.add("remotefilehandlerfolderthomas/compareFile3.txt");

		return filePaths;
	}

	/**
	 * Get the host object to use for these tests
	 * @return the vm9 host object
	 */
	public List<Host> getAllValidHosts(){
		List<Host> result = new ArrayList<Host>();
		result.add(DataHandler.getHostByName("exampleHost"));
		return result;
	}
}