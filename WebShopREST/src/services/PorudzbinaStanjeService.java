package services;


import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.PorudzbinaStanje;
import dao.PorudzbinaStanjeDAO;
@Path ("/porudzbinestanje")
public class PorudzbinaStanjeService {
	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;
	
	public PorudzbinaStanjeService() {
		
	}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("porudzbinastanjeDao")==null) {
			String contextPath = ctx.getRealPath("");
        	ctx.setAttribute("porudzbinastanjeDao", new PorudzbinaStanjeDAO(contextPath));
		}
	}
	 
	 @POST
	 @Path("/registruj")
	 @Produces(MediaType.APPLICATION_JSON)
	 @Consumes(MediaType.APPLICATION_JSON)
	 public boolean registruj(PorudzbinaStanje porudzbina)
	 {
	     System.out.println("Usao u funkciju za registrovanje stanja porudzbine");
	     PorudzbinaStanjeDAO repo = (PorudzbinaStanjeDAO) ctx.getAttribute("porudzbinastanjeDao");
	     return (repo.Sacuvaj(porudzbina) != null);
	 }
}
