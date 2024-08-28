
package com.ericsson.nms.pres.testWare.operators;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;

import com.ericsson.cifwk.taf.GenericOperator;
import com.ericsson.cifwk.taf.data.DataHandler;
import com.ericsson.cifwk.taf.data.Host;
import com.ericsson.nms.pres.testWare.operators.api.RemoteFileHandlerApiOperator;
/**
 *
 *	Operator for executing Test Cases for RemoteFileHandler
 */
public class RemoteFileHandlerOperator implements GenericOperator{

	RemoteFileHandlerApiOperator apiOperator = new RemoteFileHandlerApiOperator();

	public boolean compareRemoteFiles(Host host1, Host host2, String filepath1, String filepath2){
		return apiOperator.compareRemoteFiles(host1, host2, filepath1, filepath2);
	}

	public boolean copyRemoteFile(Host host, String file){
		return apiOperator.copyRemoteFile(host, file);
	}

	/**
	 * Return the correct expected result for each grouping of data.
	 * File 1 and 2 are the same and file 3 is different.
	 * @param host1
	 * @param host2
	 * @param filepath1
	 * @param filepath2
	 * @return
	 */
	public boolean expectedCompareRemoteFilesResult(Host host1, Host host2, String filepath1, String filepath2){

		if(filepath1.contains("3")&&filepath2.contains("3"))
			return true;
		else if (filepath1.contains("3")||filepath2.contains("3"))
			return false;
		else
			return true;
	}

	/**
	 * Check the home directory of the local machine for the copied file.
	 * @param file
	 * @return
	 */
	public boolean expectedCopyRemoteFileResult(String file){
		String homeDirectoryPath = DataHandler.getAttribute("user.home").toString();
		File homeDir = new File(homeDirectoryPath);
		file = file.split("/")[1];
		ArrayList<String> files = new ArrayList<String>(Arrays.asList(homeDir.list()));
		return files.contains(file);
	}
}