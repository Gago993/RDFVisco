package finki.ukim.mk.wbs.web;

import org.apache.jena.query.Query;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.QueryFactory;
import org.apache.jena.rdf.model.*;
import org.apache.jena.util.FileManager;


public class RdfGraph {
	
	public static Model getModel(String URI){
		URI = changeURI(URI);
		FileManager fm = FileManager.get();
		String uri = changeURI("http://dbpedia.org/resource/Cristiano_Ronaldo");
		Model m = fm.loadModel(uri);
		return m;
	}

	public static String changeURI(String URI) {
		String [] uriSplit = URI.split("/");
		int resourceNameIndex = uriSplit.length - 1;
		return "http://dbpedia.org/data/" + uriSplit[resourceNameIndex] + ".rdf";
	}

}