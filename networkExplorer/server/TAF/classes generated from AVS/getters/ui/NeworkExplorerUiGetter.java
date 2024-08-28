
package dummy.getters.ui;
import com.ericsson.cifwk.taf.UiGetter;
import com.ericsson.cifwk.taf.data.DataHandler;
/**
 *
 *	UI Context Getter for executing Test Cases for Nework Explorer.
 */
public class NeworkExplorerUiGetter implements UiGetter{

                  // Dummy Test Code Generated to show inter-workings of TAF Classes 
                  private static List<String> printedStrings;
                  Logger logger = Logger.getLogger(this.getClass());

                  public List<String> getPrintedStrings(){
                      if (printedStrings == null)
                          printedStrings = new ArrayList<String>();
                      return printedStrings;
                  };
                  public void print(String stringToPrint){
                      logger.info(stringToPrint);
                      getPrintedStrings().add(stringToPrint);        
                  };

                  public Nework Explorer.Getter getTestedService(){
                      return this;
                  };
};		
