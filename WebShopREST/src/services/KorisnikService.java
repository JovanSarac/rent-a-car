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
import javax.ws.rs.core.Response;

import beans.Korisnik;
import beans.Korisnik.Uloga;
import dao.KorisnikDAO;
import dao.RentaCarDAO;
import dto.KorisnikDTO;
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
		if(ctx.getAttribute("rentaCarDao")==null) {
			String contextPath = ctx.getRealPath("");
        	ctx.setAttribute("rentaCarDao", new RentaCarDAO(contextPath));
		}

	}

	@GET
	@Path("/test")
	@Produces(MediaType.TEXT_PLAIN)
	public String test() {
		return "Proba da li radi";
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Korisnik> nadjiSveKorisnike() {
		 KorisnikDAO dao = (KorisnikDAO) ctx.getAttribute("korisnikDao");	
		 Korisnik ulogovaniKorisnik = (Korisnik) request.getSession().getAttribute("ulogovaniKorisnik");
		 System.out.println("IMA UKUONO " + dao.nadjiSveKorisnike(ulogovaniKorisnik).size() + "korisnika");
		 return (ArrayList<Korisnik>) dao.nadjiSveKorisnike(ulogovaniKorisnik);
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
	
	@PUT
	@Path("/izmjena")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response izmijeniProfil(Korisnik korisnik) {
	    try {
	    	KorisnikDAO dao = (KorisnikDAO) ctx.getAttribute("korisnikDao");
	        Korisnik azuriraniKorisnik = dao.izmeniKorisnika(korisnik);
	        return Response.ok(azuriraniKorisnik).build();
	    } catch (Exception e) {
	        return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
	    }
	}
	
	 @POST
	 @Path("/prijava")
	 @Produces(MediaType.TEXT_HTML)
	 @Consumes(MediaType.APPLICATION_JSON)
	 public Response prijavljivanje(KorisnikDTO korisnikDTO)
	    {
	        System.out.println("Zapoceta prijava");
	        KorisnikDAO dao = (KorisnikDAO) ctx.getAttribute("korisnikDao");
	        Korisnik korisnik = dao.nadjiKorisnikaKorIme(korisnikDTO.korisnickoIme);
	        
	        if(korisnik == null)
	        {
	            System.out.println("Pogresno korisnicko ime");
	            return Response.status(Response.Status.BAD_REQUEST)
	                    .entity("{\"error\": \"Pogresno korisnicko ime\"}")
	                    .build();
	        }
	        if(!korisnik.getLozinka().equals(korisnikDTO.lozinka))
	        {
	            System.out.println("Pogresna lozinka");
	            return Response.status(Response.Status.BAD_REQUEST)
	                    .entity("{\"error\": \"Pogresna lozinka\"}")
	                    .build();
	        }
	        
	        request.getSession().setAttribute("ulogovaniKorisnik", korisnik);
	        System.out.println(request.getSession().getAttribute("ulogovaniKorisnik"));
	        //System.out.println("Uspjesna prijava");
	        if (korisnik.getUloga().equals(Uloga.kupac)) {
	        	System.out.println("NADJEN KUPAC EZ");
	            return Response.status(Response.Status.OK).entity("1").build();
	        } else if (korisnik.getUloga().equals(Uloga.administrator)) {
	            return Response.status(Response.Status.OK).entity("2").build();
	        } else  
	            return Response.status(Response.Status.OK).entity("3").build();
	    }
	 
	 @GET
	 @Path("/prijava/{korisnickoIme}")
	 @Produces(MediaType.APPLICATION_JSON)
	 public Korisnik vratiKorisnika(@PathParam("korisnickoIme") String korisnickoIme) {
		 KorisnikDAO dao = (KorisnikDAO) ctx.getAttribute("korisnikDao");
		 System.out.println("Pronadjeni korisnik je :\n" + dao.nadjiKorisnikaKorIme(korisnickoIme));
		 return dao.nadjiKorisnikaKorIme(korisnickoIme);
	 }
	 @GET
	 @Path("/prijava")
	 @Produces(MediaType.APPLICATION_JSON)
	 public Korisnik pronadjKorisnika() {
		 KorisnikDAO dao = (KorisnikDAO) ctx.getAttribute("korisnikDao");
		 Korisnik ulogovaniKorisnik = (Korisnik) request.getSession().getAttribute("ulogovaniKorisnik");
		 System.out.println("Pronadjeni korisnik je :\n" + dao.nadjiKorisnikaKorIme(ulogovaniKorisnik.getKorisnickoIme()));
		 return dao.nadjiKorisnikaKorIme(ulogovaniKorisnik.getKorisnickoIme());
	 }
	 
	 @GET
	 @Path("/trazi")
	 @Produces(MediaType.APPLICATION_JSON)
	 public ArrayList<Korisnik> pretraziKorisnike(@QueryParam("ime") String ime, @QueryParam("prezime") String prezime, @QueryParam("korisnickoIme") String korisnickoIme, @QueryParam("filterUloga") String filterUloga) {
		 KorisnikDAO dao = (KorisnikDAO) ctx.getAttribute("korisnikDao");
		 return dao.pretrazi(ime, prezime, korisnickoIme,filterUloga);
		}
	 
	 @GET
	 @Path("/traziSlobodne")
	 @Produces(MediaType.APPLICATION_JSON)
	 public ArrayList<Korisnik> traziMenadzere() {
		 KorisnikDAO dao = (KorisnikDAO) ctx.getAttribute("korisnikDao");
		 RentaCarDAO daoObjekat = (RentaCarDAO) ctx.getAttribute("rentaCarDao");
		 return (ArrayList<Korisnik>) dao.nadjiMenadzere(daoObjekat.nadjiSveObjekte());
		 
	}

	 @GET
		@Path("/nadjiIdPoslednjegKorisnika")
		@Produces(MediaType.TEXT_PLAIN)
		public String nadjiId() {
		 	KorisnikDAO dao = (KorisnikDAO) ctx.getAttribute("korisnikDao");
			return dao.nadjiIdPoslednjegKorisnika();
		}
	 
	 @PUT
	 @Path("/azurirajBodove/{brojBodova}")
	 @Consumes(MediaType.APPLICATION_JSON)
	 @Produces(MediaType.APPLICATION_JSON)
	 public Response azurirajBrojBodova(@PathParam("brojBodova") double brojBodova) {
		 KorisnikDAO dao = (KorisnikDAO) ctx.getAttribute("korisnikDao");
		 Korisnik ulogovaniKorisnik = (Korisnik) request.getSession().getAttribute("ulogovaniKorisnik");
		 System.out.println("broj bodova: " + brojBodova);
		 if (brojBodova > 0) {
			 System.out.println("broj bodova za koji treba uvecati trenutne bodove je " + brojBodova);
		 }
		 ulogovaniKorisnik.getVrstaKupca().setBrojBodova(ulogovaniKorisnik.getVrstaKupca().getBrojBodova()+brojBodova);
         System.out.println("broj bodova je " + ulogovaniKorisnik.getVrstaKupca().getBrojBodova());
		 Korisnik azuriraniKorisnik = dao.izmeniKorisnika(ulogovaniKorisnik);
		 System.out.println("broj bodova azuriranog " + azuriraniKorisnik.getVrstaKupca().getBrojBodova());
	     return Response.ok(azuriraniKorisnik).build();
	 }

}
