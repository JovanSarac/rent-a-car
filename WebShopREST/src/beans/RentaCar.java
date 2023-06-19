package beans;

import java.util.List;

public class RentaCar {
	public String id;
	public String naziv;
	public List<Vozilo> vozila;
	public String radnoVreme;
	public boolean status;
	public Lokacija lokacija;
	public String logoUrl;
	public double ocena;
	
	public RentaCar() {
	}

	public RentaCar(String id, String naziv, List<Vozilo> vozila, String radnoVreme, boolean status, Lokacija lokacija,
			String logoUrl, double ocena) {
		super();
		this.id = id;
		this.naziv = naziv;
		this.vozila = vozila;
		this.radnoVreme = radnoVreme;
		this.status = status;
		this.lokacija = lokacija;
		this.logoUrl = logoUrl;
		this.ocena = ocena;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public List<Vozilo> getVozila() {
		return vozila;
	}

	public void setVozila(List<Vozilo> vozila) {
		this.vozila = vozila;
	}

	public String getRadnoVreme() {
		return radnoVreme;
	}

	public void setRadnoVreme(String radnoVreme) {
		this.radnoVreme = radnoVreme;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public Lokacija getLokacija() {
		return lokacija;
	}

	public void setLokacija(Lokacija lokacija) {
		this.lokacija = lokacija;
	}

	public String getLogoUrl() {
		return logoUrl;
	}

	public void setLogoUrl(String logoUrl) {
		this.logoUrl = logoUrl;
	}

	public double getOcena() {
		return ocena;
	}

	public void setOcena(double ocena) {
		this.ocena = ocena;
	}

   
}
