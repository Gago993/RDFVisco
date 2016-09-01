
package finki.ukim.mk.wbs.service;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.InputStream;
import java.util.Iterator;
import java.util.Set;

import org.apache.jena.atlas.json.JSON;
import org.apache.jena.atlas.json.JsonObject;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Service;

public class JsonModifier {

	private String json;
	private String sparqlParameter;

	public JsonModifier(String json, String sparqlParameter) {
		this.json = json;
		this.sparqlParameter = sparqlParameter;
	}

	public String getJson() {
		return json;
	}

	public void setJson(String json) {
		this.json = json;
	}

	public String modifyAndGetLocationOfModifiedJson() throws FileNotFoundException {

		JSONParser parser = new JSONParser();
		try {

			Object obj = parser.parse(json);

			JSONArray resultArray = new JSONArray();
			JSONObject jsonObject = (JSONObject) obj;
			if (!jsonObject.isEmpty()) {
				JSONObject children = (JSONObject) jsonObject.get(sparqlParameter);
				if (!children.isEmpty()) {
					Set<?> keys = children.keySet();
					Iterator<?> it = keys.iterator();
					while (it.hasNext()) {
						String key = (String) it.next();
						System.out.println(key);
						JSONObject tempObj = new JSONObject();
						tempObj.put("name", key);
						tempObj.put("label", getLabelFromUrl(key));
						JSONArray oldInsideArray = (JSONArray) children.get(key);

						JSONObject oldJobj = (JSONObject) oldInsideArray.get(0);

						JSONArray tempArray = new JSONArray();
						JSONObject objInTemp = new JSONObject();
						objInTemp.put("name", oldJobj.get("value"));
						objInTemp.put("size", "1000");
						objInTemp.put("parent", key);
						objInTemp.put("label", oldJobj.get("value"));
						tempArray.add(objInTemp);
						tempObj.put("children", tempArray);
						resultArray.add(tempObj);
					}

				}
			}

			JSONObject resultObj = new JSONObject();
			resultObj.put("name", sparqlParameter);
			resultObj.put("children", resultArray);

			return resultObj.toJSONString();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

	private String getLabelFromUrl(String key) {
		String[] array = key.split("/");
		if (array.length > 0)
			return array[array.length - 1];
		else return key;
	}

}