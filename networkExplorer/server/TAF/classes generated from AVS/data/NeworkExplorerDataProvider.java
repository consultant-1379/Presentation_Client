
package dummy.data;
import com.ericsson.cifwk.taf.DataProvider;
import com.ericsson.cifwk.taf.data.DataHandler;
import com.ericsson.cifwk.taf.data.Host;
import java.util.HashMap;
import java.util.Map;
import com.ericsson.cifwk.taf.utils.csv.CsvReader;  

/**
 *	DataProvider for executing Test Cases for Nework Explorer.
 */
public class NeworkExplorerDataProvider implements DataProvider{


	// Dummy Data Provider Code Generated to show interworkings of TAF Classes
	NeworkExplorerUiGetter testedService = new NeworkExplorerUiGetter().getTestedService();

   	public List<String> getPrintedStrings(){
   	    return testedService.getPrintedStrings();
   	}

}