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

	private String jsonLocationFile;
	private String sparqlParameter;

	public JsonModifier(String jsonLocation, String sparqlParameter) {
		this.jsonLocationFile = jsonLocation;
		this.sparqlParameter = sparqlParameter;
	}

	public String getJsonLocation() {
		return jsonLocationFile;
	}

	public void setJsonLocation(String jsonLocation) {
		this.jsonLocationFile = jsonLocation;
	}

	public String modifyAndGetLocationOfModifiedJson() throws FileNotFoundException {
		InputStream inputRdfJsonStream = new FileInputStream("C:\\Users\\Grozdan.Madjarov\\Desktop\\rdfJson.txt");
		JSONParser parser = new JSONParser();
		try {

			Object obj = parser.parse(new FileReader(jsonLocationFile));

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
						JSONArray oldInsideArray = (JSONArray) children.get(key);

						JSONObject oldJobj = (JSONObject) oldInsideArray.get(0);

						JSONArray tempArray = new JSONArray();
						JSONObject objInTemp = new JSONObject();
						objInTemp.put("name", oldJobj.get("value"));
						objInTemp.put("size", "1000");
						objInTemp.put("parent", key);
						tempArray.add(objInTemp);
						tempObj.put("children", tempArray);
						resultArray.add(tempObj);
					}

				}
			}

			JSONObject resultObj = new JSONObject();
			resultObj.put("name", sparqlParameter);
			resultObj.put("children", resultArray);

			JSONObject gagoObject = new JSONObject();
			gagoObject.put("name", "gago");
			gagoObject.put("children", resultObj);
			System.out.println(gagoObject.toString());

			FileWriter file = new FileWriter("C:\\Users\\Grozdan.Madjarov\\Desktop\\resultJson.txt");
			file.write(gagoObject.toJSONString());
			file.flush();
			file.close();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

}
