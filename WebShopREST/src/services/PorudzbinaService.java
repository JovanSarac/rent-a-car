package services;

import beans.Vozilo;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

import beans.Korisnik;
import beans.Porudzbina;
import beans.RentaCar;
import beans.Porudzbina.Status;
import dao.KorisnikDAO;
import dao.PorudzbinaDAO;
import dao.RentaCarDAO;
@Path ("/porudzbine")
public class PorudzbinaService {
	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;
	
	public PorudzbinaService() {
		
	}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("porudzbinaDao")==null) {
			String contextPath = ctx.getRealPath("");
        	ctx.setAttribute("porudzbinaDao", new PorudzbinaDAO(contextPath));
		}
		if(ctx.getAttribute("korisnikDao")==null) {
			String contextPath = ctx.getRealPath("");
        	ctx.setAttribute("korisnikDao", new KorisnikDAO(contextPath));
		}

	}

	@PUT
	@Path("/izmeniporudzbinu")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
	public boolean izmeniPorudzbinur(Porudzbina p)
    {
		PorudzbinaDAO repo = (PorudzbinaDAO) ctx.getAttribute("porudzbinaDao");
        return repo.izmeniPorudzbinu(p);
    }
	
	
	
	 @GET
	 @Path("/{id}")
	 @Produces(MediaType.APPLICATION_JSON)
	 public ArrayList<Porudzbina> nadjiSvePorudzbine(@PathParam("id") String id) {
		 KorisnikDAO korDAO = (KorisnikDAO) ctx.getAttribute("korisnikDao");	
		 PorudzbinaDAO dao = (PorudzbinaDAO) ctx.getAttribute("porudzbinaDao");		
		 Korisnik ulogovan = korDAO.nadjiKorisnika(id);
		 return (ArrayList<Porudzbina>) dao.nadjiPorudzbineZaKupca(ulogovan.id);
	 }
	 
	 @POST
	 @Path("/registruj")
	 @Produces(MediaType.APPLICATION_JSON)
	 @Consumes(MediaType.APPLICATION_JSON)
	 public boolean registruj(Porudzbina porudzbina)
	 {
	     System.out.println("Usao u funkciju za registrovanje porudzbine");
	     PorudzbinaDAO repo = (PorudzbinaDAO) ctx.getAttribute("porudzbinaDao");
	     return (repo.Sacuvaj(porudzbina) != null);
	 }
	
}
