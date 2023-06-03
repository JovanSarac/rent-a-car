package services;

import javax.annotation.PostConstruct;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Korisnik;
import dao.KorisnikDAO;
@Path ("/korisnici")
public class KorisnikService {
	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;
	
	public KorisnikService() {
		
	}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("korisnikDao")==null) {
			String contextPath = ctx.getRealPath("");
        	ctx.setAttribute("korisnikDao", new KorisnikDAO(contextPath));
		}

	}

	@GET
	@Path("/test")
	@Produces(MediaType.TEXT_PLAIN)
	public String test() {
		return "Proba da li radi";
	}
	
	@POST
    @Path("/registruj")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public boolean registruj(Korisnik noviKorisnik)
    {
        System.out.println("Zapoceta registracija");
        KorisnikDAO repo = (KorisnikDAO) ctx.getAttribute("korisnikDao");
        return (repo.Sacuvaj(noviKorisnik) != null);
    }

}
