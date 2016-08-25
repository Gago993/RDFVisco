package finki.ukim.mk.wbs.web;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.OutputStream;

import javax.servlet.http.HttpServletResponse;

import org.apache.jena.query.Query;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.QueryFactory;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.util.FileManager;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import finki.ukim.mk.wbs.service.JsonModifier;

@Controller
public class HomeController {

	Model model;

	@RequestMapping(value = "/first", method = RequestMethod.GET)
	public ModelAndView getFirst() {
		ModelAndView m = new ModelAndView("first");
		return m;
	}

	@RequestMapping(value = "/main", method = RequestMethod.GET)
	public ModelAndView getMain() {
		ModelAndView m = new ModelAndView("index");
		return m;
	}

	@RequestMapping(value = "/createJson", method = RequestMethod.GET)
	public String createJson() throws FileNotFoundException {
		Model m = RdfGraph.getModel("http://dbpedia.org/resource/Cristiano_Ronaldo");
		OutputStream output = new FileOutputStream("C:\\Users\\Grozdan.Madjarov\\Desktop\\rdfJson.txt");
		m.write(output, "RDF/JSON");
		JsonModifier jsonModifier = new JsonModifier("C:\\Users\\Grozdan.Madjarov\\Desktop\\rdfJson.txt",graph.changeURI("http://dbpedia.org/page/Cristiano_Ronaldo"));
		String modifiedJsonLocation = jsonModifier.modifyAndGetLocationOfModifiedJson();
		return "first";
	}

	

}
