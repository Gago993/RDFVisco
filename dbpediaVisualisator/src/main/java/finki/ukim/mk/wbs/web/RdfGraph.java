package finki.ukim.mk.wbs.web;

import java.io.FileNotFoundException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

import org.apache.jena.query.Query;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.QueryFactory;
import org.apache.jena.rdf.model.*;
import org.apache.jena.util.FileManager;


public class RdfGraph {
	
	public static Model getModel(String URI) throws FileNotFoundException{
		String uri = changeURI(URI);
		Model model = ModelFactory.createDefaultModel();
		FileManager fm = FileManager.get();		
		Model m = fm.loadModel(uri);
		
		/*Model resultModel = ModelFactory.createDefaultModel();
		StmtIterator iter = m.listStatements();
		int counter = 0;
		while(iter.hasNext()){
			Statement s = iter.next();
			resultModel.add(s);
			counter++;
			if(counter >= 50){
				break;
			}
		}*/

		return m;
	}

	public static String changeURI(String URI) {
		String [] uriSplit = URI.split("/");
		int resourceNameIndex = uriSplit.length - 1;
		return "http://dbpedia.org/data/" + uriSplit[resourceNameIndex] + ".rdf";
	}

}