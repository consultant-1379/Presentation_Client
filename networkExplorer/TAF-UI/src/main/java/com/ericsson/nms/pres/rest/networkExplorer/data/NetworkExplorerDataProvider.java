/*------------------------------------------------------------------------------
 *******************************************************************************
 * COPYRIGHT Ericsson 2012
 *
 * The copyright to the computer program(s) herein is the property of
 * Ericsson Inc. The programs may be used and/or copied only with written
 * permission from Ericsson Inc. or in accordance with the terms and
 * conditions stipulated in the agreement/contract under which the
 * program(s) have been supplied.
 *******************************************************************************
 *----------------------------------------------------------------------------*/
package com.ericsson.nms.pres.rest.networkExplorer.data;

import com.ericsson.cifwk.taf.DataProvider;
import com.ericsson.cifwk.taf.data.DataHandler;
import com.ericsson.cifwk.taf.data.Host;
import com.ericsson.cifwk.taf.utils.csv.CsvReader;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/*
 * Data Provider contains logic required to fetch data for test purposes.
 * It is containing all necessary sources,e.g. reading files from disk, databases
 * or Data Providers delivered by other teams
 * 
 *  Data Provider is used by Test Data class for providing data entries to test methods
 *  It is also contacted by Generic Operator to calculate expected results
 */
public class NetworkExplorerDataProvider implements DataProvider {

	public static final String DATA_FILE = "network_explorer_user_data.csv";
	public static final String HOST_NAME = "networkExplorer";
	public static final String VALID_USER_MARK = "TRUE";
	public static final int USER_COLUMN = 0;
	public static final int PASS_COLUMN = 1;
	public static final int VALID_COLUMN = 2;

	/*
	 * Host is fetched using generic mechanism, so it can be changed if changes
	 */
	public static Host getHost(){
		return DataHandler.getHostByName(HOST_NAME);
	}

	/*
	 * Test Data is fetched from a file that is an output of test analysis, but it may be a combination
	 * of test analysis data and dynamic reconciliation of data
	 */
	public static List<List<String>> getUserNamePassword(){
		String name;
		String pass;
		List<List<String>> result = new ArrayList<List<String>>();
		/*
		 * DataHandler should be the main entity accessed from Data Provider
		 */
		CsvReader testItems = DataHandler.readCsv(DATA_FILE);
		for (int i=1; i< testItems.getRowCount();i++){
			name = testItems.getCell(USER_COLUMN, i);
			pass = testItems.getCell(PASS_COLUMN, i);
			result.add(Arrays.asList(name,pass));
		}
		return result;
	}

	/*
	 * Data Provider contains logic required to categorize the data. In this case it is checking 
	 * if data is correct based on entry in file
	 */
	public boolean areValidCredentials(String userName, String password) {
		CsvReader testItems = DataHandler.readCsv(DATA_FILE);

        // iterate over csv files, to get multiple entries if present.
		for (int i=1; i< testItems.getRowCount();i++){
			if(userName.equals((testItems).getCell(USER_COLUMN,i)) && password.equals((testItems).getCell(PASS_COLUMN, i))){
				String isValidString =  (testItems.getCell(VALID_COLUMN,i)).trim();
				if(isValidString.equalsIgnoreCase(VALID_USER_MARK))
					return true;
			}
		}
		return false;
	}

}
