package services;

import java.util.ArrayList;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;


import beans.Vozilo;
import dao.VoziloDAO;
@Path ("/vozila")
public class VoziloService {
	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;
	
	public VoziloService() {
		
	}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("voziloDao")==null) {
			String contextPath = ctx.getRealPath("");
        	ctx.setAttribute("voziloDao", new VoziloDAO(contextPath));
		}

	}
	
	@GET
	@Path("/test")
	@Produces(MediaType.TEXT_PLAIN)
	public String test() {
		return "Provjera da li servis prepoznaje";
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Vozilo> nadjiSvaVozila() {
		 VoziloDAO dao = (VoziloDAO) ctx.getAttribute("voziloDao");	
		 return (ArrayList<Vozilo>) dao.nadjiSvaVozila();
	}
	
	@GET
	@Path("/nadjiDostupnaVozila")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Vozilo> nadjiSvaDostupnaVozila() {
		 VoziloDAO dao = (VoziloDAO) ctx.getAttribute("voziloDao");	
		 return (ArrayList<Vozilo>) dao.nadjiSvaDostupnaVozila();
	}
	
	@GET
	@Path("/nadjiVozilopoIdu/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Vozilo nadjiVozilopoIdu(@PathParam("id") String id) {
		 VoziloDAO dao = (VoziloDAO) ctx.getAttribute("voziloDao");	
		 return dao.nadjiVozilopoId(id);
	}
	
	@POST
    @Path("/kreirajvozilo")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
    public boolean dodajvozilo(Vozilo vozilo)
    {
        System.out.println("Zapoceto dodavanje vozila");
        VoziloDAO repo = (VoziloDAO) ctx.getAttribute("voziloDao");
        return (repo.Sacuvaj(vozilo) != null);
    }
	
	@GET
	@Path("/nadjiIdVozila")
	@Produces(MediaType.TEXT_PLAIN)
	public String nadjiId() {
		VoziloDAO repo = (VoziloDAO) ctx.getAttribute("voziloDao");
		return repo.nadjiIdPoslednjegVozila();
	}
	
	@POST
	@Path("/izmenivozilo")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
	public boolean izmeniVozilo(Vozilo vozilo)
    {
		VoziloDAO repo = (VoziloDAO) ctx.getAttribute("voziloDao");
        return repo.izmeniVozilo(vozilo);
    }
	
	
	
	
}
