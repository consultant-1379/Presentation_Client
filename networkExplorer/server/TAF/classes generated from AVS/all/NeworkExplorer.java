
	package dummy.test.cases;
	import org.testng.annotations.Test;
	import com.ericsson.cifwk.taf.TorTestCaseHelper;
	import com.ericsson.cifwk.taf.TestCase;
	import se.ericsson.jcat.fw.annotations.Setup;
	import java.util.Map;
	import org.testng.annotations.AfterSuite;
	import com.ericsson.cifwk.taf.annotations.Context;
	import com.ericsson.cifwk.taf.annotations.VUsers;

	import dummy.operators.NeworkExplorerOperator;
	import dummy.test.data.NeworkExplorerTestDataProvider;

	/**
	*
	*	Class to execute tests against Nework Explorer.
	**/
	public class NeworkExplorer extends TorTestCaseHelper implements TestCase{

		NeworkExplorerOperator neworkExplorerOperator = new NeworkExplorerOperator();

		@Setup 
		void prepareTestCaseForTORF2277_Func_1(){
			//TODO User arrived at Network Explorer's url.
		} 

			/**
			* Dummy Test Case to show the interworkings of TAF classes
			*/
			@VUsers(vusers = { 1, 10, 100})
			@Test(dataProvider = "dummyTestData", dataProviderClass = NeworkExplorerTestDataProvider.class)
			public void dummyTestCase(String stringToPrint) {
			setTestcase("TC-DUMMY", "Dummy Test Case");
			setTestInfo("Testing " + stringToPrint);
			assertEquals(neworkExplorerOperator.operate(stringToPrint),
				neworkExplorerOperator.expected());
			}


		}


		@Setup 
		void prepareTestCaseForTORF2277_Func_2(){
			//TODO Valid FDN means one for which data and model exists.
		} 

			/**
			* Dummy Test Case to show the interworkings of TAF classes
			*/
			@VUsers(vusers = { 1, 10, 100})
			@Test(dataProvider = "dummyTestData", dataProviderClass = NeworkExplorerTestDataProvider.class)
			public void dummyTestCase(String stringToPrint) {
			setTestcase("TC-DUMMY", "Dummy Test Case");
			setTestInfo("Testing " + stringToPrint);
			assertEquals(neworkExplorerOperator.operate(stringToPrint),
				neworkExplorerOperator.expected());
			}


		}


}
