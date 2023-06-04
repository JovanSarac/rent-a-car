package services;

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
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.TEXT_HTML)
	public String prikazNaloga(@PathParam("id") String id) {
		System.out.println("Prikaz naloga");
		KorisnikDAO dao = (KorisnikDAO) ctx.getAttribute("korisnikDao");
		Korisnik korisnik = dao.nadjiKorisnika(id);
		if(korisnik == null) {
			return "<html><head></head><body><h1>Korisnik sa trazenim id-om ne postoji.</h1></body></html>";
		}
		String stringhtml = "<html>\r\n"
				+ "    <head>\r\n"
				+ "\r\n"
				+ "    </head>\r\n"
				+ "    <body>\r\n"
				+ "        <h1>Pofil</h1>\r\n"
				+ "        <table>\r\n"
				+ "            <tr>\r\n"
				+ "                <td align=\"left\">\r\n"
				+ "                    <label>Korisnicko ime: </label>\r\n"
				+ "                </td>\r\n"
				+ "                <td align=\"left\">\r\n"
				+ "                    <input name=\"korIme\" type=\"text\" value=\"" + korisnik.getKorisnickoIme() + "\">\r\n"
				+ "                </td>\r\n"
				+ "            </tr>\r\n"
				+ "            <tr>\r\n"
				+ "                <td align=\"left\">\r\n"
				+ "                    <label>Ime: </label>\r\n"
				+ "                </td>\r\n"
				+ "                <td align=\"left\">\r\n"
				+ "                    <input name=\"ime\" type=\"text\" value=\"" + korisnik.getIme() + "\">\r\n"
				+ "                </td>\r\n"
				+ "            </tr>\r\n"
				+ "            <tr>\r\n"
				+ "                <td align=\"left\">\r\n"
				+ "                    <label>Prezime: </label>\r\n"
				+ "                </td>\r\n"
				+ "                <td align=\"left\">\r\n"
				+ "                    <input name=\"prezime\" type=\"text\" value=\"" + korisnik.getPrezime() + "\">\r\n"
				+ "                </td>\r\n"
				+ "            </tr>\r\n"
				+ "            <tr>\r\n"
				+ "                <td align=\"left\">\r\n"
				+ "                    <label>Pol: </label>\r\n"
				+ "                </td>\r\n"
				+ "                <td align=\"left\">\r\n"
				+ "                    <input type=\"pol\" type=\"text\" value=\"" + korisnik.getPol() + "\">\r\n"
				+ "                </td>\r\n"
				+ "            </tr>\r\n"
				+ "            <tr>\r\n"
				+ "                <td align=\"left\">\r\n"
				+ "                    <label>Datum rodjenja: </label>\r\n"
				+ "                </td>\r\n"
				+ "                <td align=\"left\">\r\n"
				+ "                    <input name=\"datumrodj\" type=\"text\" value=\"" + korisnik.getDatumRodjenja() + "\">\r\n"
				+ "                </td>\r\n"
				+ "            </tr>\r\n"
				+ "        </table>\r\n"
				+ "    </body>\r\n"
				+ "</html>";
		
		return stringhtml;
		
	}

}
