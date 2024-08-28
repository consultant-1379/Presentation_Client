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

package com.ericsson.nms.pres.rest.testWare.util;

import org.json.simple.JSONArray;
import org.json.simple.JSONValue;

import java.util.HashMap;

public class ManagedObjectHelper {

    // Verifies that string represents a valid ManagedObject in a JSON format
    public static boolean isValidMO(String data) {

        Object obj= JSONValue.parse(data);
        JSONArray array=(JSONArray)obj;
        HashMap responseMap = (HashMap)array.get(0);

        if (responseMap.get("name") == null)  return false;
        if (responseMap.get("poId") == null)  return false;
        if (responseMap.get("type") == null)  return false;
        if (responseMap.get("namespace") == null)  return false;
        if (responseMap.get("fdn") == null)  return false;

        else {
            return true;
        }
    }
}
