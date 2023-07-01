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
import beans.PorudzbinaOtkaz;
import beans.TipKupca.Tip;
import dao.KorisnikDAO;
import dao.PorudzbinaDAO;
import dao.PorudzbinaOtkazDAO;
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
		if(ctx.getAttribute("otkazDAO")==null) {
			String contextPath = ctx.getRealPath("");
        	ctx.setAttribute("otkazDAO", new PorudzbinaOtkazDAO(contextPath));
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
		 PorudzbinaOtkazDAO repo = (PorudzbinaOtkazDAO) ctx.getAttribute("otkazDAO");
		 Korisnik ulogovaniKorisnik = (Korisnik) request.getSession().getAttribute("ulogovaniKorisnik");
		 return (ArrayList<Korisnik>) dao.nadjiSveKorisnike(ulogovaniKorisnik, repo.nadjiSveOtkaze());
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
	        if (korisnik.isBlokiran()) return Response.status(Response.Status.OK).entity("4").build();
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
	 public ArrayList<Korisnik> pretraziKorisnike(@QueryParam("ime") String ime, @QueryParam("prezime") String prezime, @QueryParam("korisnickoIme") String korisnickoIme, @QueryParam("filterUloga") String filterUloga,  @QueryParam("filterTipKorisnika") String filterTipKorisnika) {
		 KorisnikDAO dao = (KorisnikDAO) ctx.getAttribute("korisnikDao");
		 return dao.pretrazi(ime, prezime, korisnickoIme,filterUloga,filterTipKorisnika);
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
		 ulogovaniKorisnik.getVrstaKupca().setBrojBodova(ulogovaniKorisnik.getVrstaKupca().getBrojBodova()+brojBodova);
	     	if (ulogovaniKorisnik.getVrstaKupca().getBrojBodova() < 200) {
	     		ulogovaniKorisnik.getVrstaKupca().setTipKupca(Tip.Bronzani);
	     		ulogovaniKorisnik.getVrstaKupca().setProcenat(0);
		        	}
	     	else if (ulogovaniKorisnik.getVrstaKupca().getBrojBodova() > 200 && ulogovaniKorisnik.getVrstaKupca().getBrojBodova() < 1500) {
			 ulogovaniKorisnik.getVrstaKupca().setTipKupca(Tip.Srebrni);
			 ulogovaniKorisnik.getVrstaKupca().setProcenat(0.05);
	        	}
	     	else  {
	     		ulogovaniKorisnik.getVrstaKupca().setTipKupca(Tip.Zlatni);
	     		 ulogovaniKorisnik.getVrstaKupca().setProcenat(0.1);
	     	}
		 Korisnik azuriraniKorisnik = dao.izmeniKorisnika(ulogovaniKorisnik);
	     return Response.ok(azuriraniKorisnik).build();
	 }
	 
	    @POST
	    @Path("/otkazi")
	    @Produces(MediaType.APPLICATION_JSON)
	    @Consumes(MediaType.APPLICATION_JSON)
	    public boolean otkazi(PorudzbinaOtkaz otkaz)
	    {
	        System.out.println("Zapoceta registracija");
	        PorudzbinaOtkazDAO repo = (PorudzbinaOtkazDAO) ctx.getAttribute("otkazDAO");
	        return (repo.Sacuvaj(otkaz) != null);
	    }

}
