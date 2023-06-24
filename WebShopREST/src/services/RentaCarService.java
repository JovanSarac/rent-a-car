package services;

import java.util.ArrayList;

import javax.annotation.PostConstruct;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.Korisnik;
import beans.Lokacija;
import beans.RentaCar;
import dao.KorisnikDAO;
import dao.LokacijaDAO;
import dao.RentaCarDAO;
import dto.KorisnikDTO;
@Path ("/objekti")
public class RentaCarService {
	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;
	
	public RentaCarService() {
		
	}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("objectDAO")==null) {
			String contextPath = ctx.getRealPath("");
        	ctx.setAttribute("objectDAO", new RentaCarDAO(contextPath));
		}

	}

	
	 @GET
	 @Path("/")
	 @Produces(MediaType.APPLICATION_JSON)
	 public ArrayList<RentaCar> nadjiSveObjekte() {
		 RentaCarDAO dao = (RentaCarDAO) ctx.getAttribute("objectDAO");		
		 System.out.println("IMA UKUONO " + dao.nadjiSveObjekte().size() + "objekata");
		 return (ArrayList<RentaCar>) dao.nadjiSveObjekte();
	 }
	
	
	@POST
    @Path("/registruj")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public boolean registruj(RentaCar noviObjekat)
    {
		RentaCarDAO repo = (RentaCarDAO) ctx.getAttribute("objectDAO");
        return (repo.Sacuvaj(noviObjekat) != null);
    }
	
	@GET
	@Path("/trazi")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<RentaCar> pretraziObjekte(@QueryParam("naziv") String naziv, @QueryParam("lokacija") String lokacija, @QueryParam("ocena") double ocena) {
	  RentaCarDAO dao = (RentaCarDAO) ctx.getAttribute("objectDAO");
	  return dao.pretrazi(naziv, lokacija, ocena);
	}
	
	@GET
	@Path("/nadjiMenadzerov")
	@Produces(MediaType.APPLICATION_JSON)
	public RentaCar nadjiMenadzerovObjekat(@QueryParam("korisnikId") String korisnikId) {
	  RentaCarDAO dao = (RentaCarDAO) ctx.getAttribute("objectDAO");
	  return dao.nadjiMenadzerovObjekat(korisnikId);
	}
	
	@POST
	@Path("/izmeniobjekat")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
	public boolean izmeniRentaCar(RentaCar noviObjekat)
    {
		RentaCarDAO repo = (RentaCarDAO) ctx.getAttribute("objectDAO");
        return repo.izmeniRentaCar(noviObjekat);
    }
	

}
