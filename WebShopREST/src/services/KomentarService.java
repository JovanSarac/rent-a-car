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
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Komentar;
import beans.Korisnik;
import beans.Porudzbina;
import dao.KomentarDAO;
import dao.KorisnikDAO;
import dao.PorudzbinaDAO;
import dao.RentaCarDAO;

@Path ("/komentari")
public class KomentarService {
	
	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;
	
	public KomentarService() {
		
	}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("komentariDAO")==null) {
			String contextPath = ctx.getRealPath("");
        	ctx.setAttribute("komentariDAO", new KomentarDAO(contextPath));
		}
	}

	@PUT
	@Path("/izmenikomentar")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
	public boolean izmeniKomentar(Komentar k)
    {
		KomentarDAO repo = (KomentarDAO) ctx.getAttribute("komentariDAO");
        return repo.IzmeniKomentar(k);
    }
	
	
	 
	 @POST
	 @Path("/registruj")
	 @Produces(MediaType.APPLICATION_JSON)
	 @Consumes(MediaType.APPLICATION_JSON)
	 public boolean registruj(Komentar k)
	 {
	     System.out.println("Usao u funkciju za registrovanje porudzbine");
	     KomentarDAO repo = (KomentarDAO) ctx.getAttribute("komentariDAO");
	     return (repo.Sacuvaj(k) != null);
	 }
	
}

