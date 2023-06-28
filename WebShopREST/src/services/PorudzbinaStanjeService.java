package services;
import java.util.ArrayList;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
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
	 
	 @GET
	 @Path("/nadjisvaStanjaPorudzbinazaRentAcar/{id}")
	 @Produces(MediaType.APPLICATION_JSON)
	 public ArrayList<PorudzbinaStanje> nadjisvaStanjaPorudzbina(@PathParam("id") String id) {	
		 PorudzbinaStanjeDAO repo = (PorudzbinaStanjeDAO) ctx.getAttribute("porudzbinastanjeDao");	
		 System.out.println("id rentacar je:" + id);
		 return (ArrayList<PorudzbinaStanje>)repo.nadjiSvePorudzbinezaRentaCar(id);
	 }
	 
	 @GET
	 @Path("/nadjiPorudzbinuStanje")
	 @Produces(MediaType.APPLICATION_JSON)
	 public PorudzbinaStanje nadjiStanjePorudzbine(@QueryParam("porudzbinaId") String porudzbinaId, @QueryParam("objekatId") String objekatId) {	
		 PorudzbinaStanjeDAO repo = (PorudzbinaStanjeDAO) ctx.getAttribute("porudzbinastanjeDao");	
		 return repo.nadjiStanjePorudzbine(porudzbinaId,objekatId);
	 }
	 
	 @GET
	 @Path("/nadjiPorudzbinuStanja/{porudzbinaId}")
	 @Produces(MediaType.APPLICATION_JSON)
	 public ArrayList<PorudzbinaStanje> nadjiStanjePorudzbine(@PathParam("porudzbinaId") String porudzbinaId) {	
		 PorudzbinaStanjeDAO repo = (PorudzbinaStanjeDAO) ctx.getAttribute("porudzbinastanjeDao");	
		 return (ArrayList<PorudzbinaStanje>) repo.nadjiPorudzbineSpramidPorudzbine(porudzbinaId);
	 }
	 
	 @PUT
	 @Path("/izmenistanjeporudzbine")
	 @Produces(MediaType.APPLICATION_JSON)
	 @Consumes(MediaType.APPLICATION_JSON)
	 public boolean izmeniStanjrPorudzbine(PorudzbinaStanje p)
	 {
		 PorudzbinaStanjeDAO repo = (PorudzbinaStanjeDAO) ctx.getAttribute("porudzbinastanjeDao");
	     return repo.izmeniStanjePorudzbine(p);
	 }
}
