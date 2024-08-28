
package dummy.operators;

import com.ericsson.cifwk.taf.GenericOperator; 
import dummy.operators.ui.Nework Explorer.UiOperator;

/**
*
*Operator for executing Test Cases for Nework Explorer.
*/
public class NeworkExplorerOperator implements GenericOperator{

	 
		// Dummy Operator Code generated to show the interworkings of the TAF Classes
		String stringToOperate;
    
    	    NeworkExplorerUiGetter testedService = new NeworkExplorerUiGetter().getTestedService();
    	    
    	    public boolean operate(String stringToPrint) {
    	        this.stringToOperate = stringToPrint;
    	        testedService.print(stringToOperate);
    	        return true;
    	    }
    	
    	    public boolean expected() {
    	        return new NeworkExplorerDataProvider().getPrintedStrings().contains(stringToOperate);
    	    }
		
		// Dummy Operator Code generated to show the interworkings of the TAF Classes
		String stringToOperate;
    
    	    NeworkExplorerUiGetter testedService = new NeworkExplorerUiGetter().getTestedService();
    	    
    	    public boolean operate(String stringToPrint) {
    	        this.stringToOperate = stringToPrint;
    	        testedService.print(stringToOperate);
    	        return true;
    	    }
    	
    	    public boolean expected() {
    	        return new NeworkExplorerDataProvider().getPrintedStrings().contains(stringToOperate);
    	    }
		 
}
		