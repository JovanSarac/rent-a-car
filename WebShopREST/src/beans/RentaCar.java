package beans;

import java.util.ArrayList;
import java.util.List;

public class RentaCar {
	public String id;
	public String naziv;
	public ArrayList<Vozilo> vozila;
	public String radnoVremeOd;
	public String radnoVremeDo;
	public boolean status;
	public Lokacija lokacija;
	public String logoUrl;
	public double ocena;
	public Korisnik menadzer;
	
	public RentaCar() {
	}
	
	public RentaCar(String id, String naziv, ArrayList<Vozilo> vozila, String radnoVremeOd, String radnoVremeDo,
			boolean status, Lokacija lokacija, String logoUrl, double ocena, Korisnik menadzer) {
		super();
		this.id = id;
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

	public ArrayList<Vozilo> getVozila() {
		return vozila;
	}

	public void setVozila(ArrayList<Vozilo> vozila) {
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

	@Override
	public String toString() {
		return "RentaCar [id=" + id + ", naziv=" + naziv + ", vozila=" + vozila + ", radnoVremeOd=" + radnoVremeOd
				+ ", radnoVremeDo=" + radnoVremeDo + ", status=" + status + ", lokacija=" + lokacija + ", logoUrl="
				+ logoUrl + ", ocena=" + ocena + ", menadzer=" + menadzer + "]";
	}
	
}