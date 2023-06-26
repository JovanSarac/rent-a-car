package beans;

import java.util.List;

public class Korpa {
	public List<Vozilo> vozilauKorpi;
	public Korisnik vlasnikKorpe;
	public double cena;
	
	public Korpa() {
		
	}
	
	public Korpa(List<Vozilo> vozilauKorpi, Korisnik vlasnikKorpe, double cena) {
		super();
		this.vozilauKorpi = vozilauKorpi;
		this.vlasnikKorpe = vlasnikKorpe;
		this.cena = cena;
	}

	public List<Vozilo> getVozilauKorpi() {
		return vozilauKorpi;
	}
	public void setVozilauKorpi(List<Vozilo> vozilauKorpi) {
		this.vozilauKorpi = vozilauKorpi;
	}
	public Korisnik getVlasnikKorpe() {
		return vlasnikKorpe;
	}
	public void setVlasnikKorpe(Korisnik vlasnikKorpe) {
		this.vlasnikKorpe = vlasnikKorpe;
	}
	public double getCena() {
		return cena;
	}
	public void setCena(double cena) {
		this.cena = cena;
	}

	@Override
	public String toString() {
		return "Korpa [vozilauKorpi=" + vozilauKorpi + ", vlasnikKorpe=" + vlasnikKorpe + ", cena=" + cena + "]";
	}
	
	
	
}
