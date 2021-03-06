package finki.ukim.mk.wbs.web;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpRequest;
import org.apache.jena.query.Query;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.QueryFactory;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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
	@ResponseBody
	public String createJson(@RequestParam(value = "url") String url, @RequestParam(value = "page")int page) throws FileNotFoundException, UnsupportedEncodingException {

		String decodedUrl = URLDecoder.decode(url, "UTF-8");
		RdfGraph graph = new RdfGraph();
		Model m = graph.getModel(decodedUrl);
		StringWriter out = new StringWriter();
		m.write(out, "RDF/JSON");
		String result = out.toString();

		JsonModifier jsonModifier = new JsonModifier(result, decodedUrl,page);
		String modifiedJsonLocation = jsonModifier.modifyAndGetLocationOfModifiedJson();
		return modifiedJsonLocation;
	}

	
	

}