
package com.ericsson.nms.pres.testWare.test.data;

import java.util.List;

import org.testng.annotations.DataProvider;

import com.ericsson.cifwk.taf.TestData;
import com.ericsson.cifwk.taf.data.Host;
import com.ericsson.nms.pres.testWare.data.RemoteFileHandlerDataProvider;
/**
 *
 *	Test DataProvider for executing Test Cases for RemoteFileHandler
 */
public class RemoteFileHandlerTestDataProvider implements TestData{

	static RemoteFileHandlerDataProvider dataProvider = new RemoteFileHandlerDataProvider();


	@DataProvider(name="remoteHostData")
	public static Object[][] RemoteFileHandlerTestData(){

		List<String> allFilePaths = dataProvider.getFilePaths();
		List<Host> allValidHosts = dataProvider.getAllValidHosts();

		Object[][] result = new Object[3][];

		Object[] line = new Object[4];

		for(int i=0;i<allFilePaths.size();i++){
			line[0] = allValidHosts.get(0);
			line[1] = allValidHosts.get(0);
			line[2] = allFilePaths.get(i);
			line[3] = allFilePaths.get(0);

			result[i] = line;
		}

		return result;
	}

	@DataProvider(name="remoteFileData")
	public static Object[][] RemoteFileHandlerTestFileData(){

		List<String> allFilePaths = dataProvider.getFilePaths();
		List<Host> allValidHosts = dataProvider.getAllValidHosts();

		Object[][] result = new Object[3][];

		Object[] line = new Object[2];

		for(int i=0;i<allFilePaths.size();i++){
			line[0] = allValidHosts.get(0);
			line[1] = allFilePaths.get(i);
			result[i] = line;
		}

		return result;
	}
}