package finki.ukim.mk.wbs.web;

import org.apache.jena.query.Query;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.QueryFactory;
import org.apache.jena.rdf.model.*;


public class RdfGraph {
	private Model model;
	
	public RdfGraph(){
		model = ModelFactory.createDefaultModel();
	}
	
	public Model getModel(String URI){
		URI = changeURI(URI);
		
		String query = "CONSTRUCT {"
				+ "<" + URI + "> ?p ?o" 
				+ "}"
				+ "WHERE {"
				+ "<" + URI + "> ?p ?o"
				+ "}"
				+ "LIMIT 10000";
		
		Query sparqlQuery = QueryFactory.create(query);
		QueryExecution exec = QueryExecutionFactory.sparqlService("http://dbpedia.org/sparql", sparqlQuery);
		model = exec.execConstruct();
		
		return model;
	}

	public String changeURI(String URI) {
		String [] uriSplit = URI.split("/");
		return "http://dbpedia.org/resource/" + uriSplit[uriSplit.length-1];
	}

}