package beans;

import java.util.List;

public class RentaCar {
	public String naziv;
	public List<Vozilo> vozila;
	public String radnoVreme;
	public boolean status;
	public Lokacija lokacija;
	public String logoUrl;
	public double ocena;
	
	public RentaCar() {
	}
	public RentaCar(String naziv, List<Vozilo> vozila, String radnoVreme, boolean status, Lokacija lokacija,
			String logoUrl, double ocena) {
		super();
		this.naziv = naziv;
		this.vozila = vozila;
		this.radnoVreme = radnoVreme;
		this.status = status;
		this.lokacija = lokacija;
		this.logoUrl = logoUrl;
		this.ocena = ocena;
	}
	
	

}
