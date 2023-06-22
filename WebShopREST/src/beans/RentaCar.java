package beans;

import java.util.List;

public class RentaCar {
	public String id;
	public String naziv;
	public List<Vozilo> vozila;
	public String radnoVremeOd;
	public String radnoVremeDo;
	public boolean status;
	public Lokacija lokacija;
	public String logoUrl;
	public double ocena;
	public Korisnik menadzer;
	
	public RentaCar() {
	}
	
	public RentaCar(String naziv, List<Vozilo> vozila, String radnoVremeOd, String radnoVremeDo,
			boolean status, Lokacija lokacija, String logoUrl, double ocena, Korisnik menadzer) {
		super();
		this.naziv = naziv;
		this.vozila = vozila;
		this.radnoVremeOd = radnoVremeOd;
		this.radnoVremeDo = radnoVremeDo;
		this.status = status;
		this.lokacija = lokacija;
		this.logoUrl = logoUrl;
		this.ocena = ocena;
		this.menadzer = menadzer;
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

	public String getRadnoVremeOd() {
		return radnoVremeOd;
	}

	public void setRadnoVremeOd(String radnoVremeOd) {
		this.radnoVremeOd = radnoVremeOd;
	}

	public String getRadnoVremeDo() {
		return radnoVremeDo;
	}

	public void setRadnoVremeDo(String radnoVremeDo) {
		this.radnoVremeDo = radnoVremeDo;
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

	public Korisnik getMenadzer() {
		return menadzer;
	}

	public void setMenadzer(Korisnik menadzer) {
		this.menadzer = menadzer;
	}

	

	
}