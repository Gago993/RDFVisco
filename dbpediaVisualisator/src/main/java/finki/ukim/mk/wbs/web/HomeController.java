package finki.ukim.mk.wbs.web;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomeController {

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
	
	
}
