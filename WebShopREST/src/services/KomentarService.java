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
import beans.RentaCar;
import beans.Korisnik;
import beans.Porudzbina;
import beans.Vozilo;
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
		if(ctx.getAttribute("objectDAO")==null) {
			String contextPath = ctx.getRealPath("");
        	ctx.setAttribute("objectDAO", new RentaCarDAO(contextPath));
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
	
	 @GET
	 @Path("/{id}")
	 @Produces(MediaType.APPLICATION_JSON)
	 public ArrayList<Komentar> nadjiSveKomentare(@PathParam("id") String id) {
		 KomentarDAO repo = (KomentarDAO) ctx.getAttribute("komentariDAO");	
		 
		 return (ArrayList<Komentar>) repo.nadjiKomentareZaMenadzera(id);
	 }
	 
	 @POST
	 @Path("/registruj")
	 @Produces(MediaType.APPLICATION_JSON)
	 @Consumes(MediaType.APPLICATION_JSON)
	 public boolean registruj(Komentar k)
	 {
		 RentaCarDAO carRepo = (RentaCarDAO) ctx.getAttribute("objectDAO");
		 RentaCar objekat = carRepo.nadjiObjekat(k.getRentacarId());
	     System.out.println("Usao u funkciju za registrovanje porudzbine");
	     KomentarDAO repo = (KomentarDAO) ctx.getAttribute("komentariDAO");
	     objekat.setOcena(repo.izracunajProsjecnuOcjenu(k.getRentacarId(), k.getOcjena()));
		 boolean izracunataOcjena = carRepo.izmeniRentaCar(objekat);
		 System.out.println("za objekat je uspjesno izracunata ocjena i ona iznosi: " + izracunataOcjena);
	     return (repo.Sacuvaj(k) != null);
	 }
	 
	 @GET
	 @Path("/VecKomentarisano/{kupacId}/{voziloId}")
	 @Produces(MediaType.APPLICATION_JSON)
	 @Consumes(MediaType.APPLICATION_JSON)
	 public boolean provjeriMogucenostKomentarisanja(@PathParam("kupacId") String kupacId, @PathParam("voziloId") String voziloId) {
	     RentaCarDAO repo = (RentaCarDAO) ctx.getAttribute("objectDAO");
	     RentaCar objekat = repo.nadjiObjekatPoVozilu(voziloId);
	     KomentarDAO komDAO = (KomentarDAO) ctx.getAttribute("komentariDAO");
	     return komDAO.ProvjeriJelKomentarisano(kupacId, objekat.getId());
	 }
	 
	
}

