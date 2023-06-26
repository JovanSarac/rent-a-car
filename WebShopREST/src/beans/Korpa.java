package beans;

import java.util.List;

public class Korpa {
	public List<Vozilo> vozilauKorpi;
	public String vlasnikKorpeId;
	public double cena;
	public String pocetniDatum;
	public String krajnjiDatum;
	
	public Korpa() {
		
	}
	
	public Korpa(List<Vozilo> vozilauKorpi, String vlasnikKorpeid, double cena, String pocetni, String krajnji) {
		super();
		this.vozilauKorpi = vozilauKorpi;
		this.vlasnikKorpeId = vlasnikKorpeid;
		this.cena = cena;
		this.pocetniDatum = pocetni;
		this.krajnjiDatum = krajnji;
	}
	
	public List<Vozilo> getVozilauKorpi() {
		return vozilauKorpi;
	}
	public void setVozilauKorpi(List<Vozilo> vozilauKorpi) {
		this.vozilauKorpi = vozilauKorpi;
	}
	public String getVlasnikKorpeId() {
		return vlasnikKorpeId;
	}
	public void setVlasnikKorpeId(String vlasnikKorpeId) {
		this.vlasnikKorpeId = vlasnikKorpeId;
	}
	public double getCena() {
		return cena;
	}
	public void setCena(double cena) {
		this.cena = cena;
	}

	
	public String getPocetniDatum() {
		return pocetniDatum;
	}

	public void setPocetniDatum(String pocetniDatum) {
		this.pocetniDatum = pocetniDatum;
	}

	public String getKrajnjiDatum() {
		return krajnjiDatum;
	}

	public void setKrajnjiDatum(String krajnjiDatum) {
		this.krajnjiDatum = krajnjiDatum;
	}

	@Override
	public String toString() {
		return "Korpa [vozilauKorpi=" + vozilauKorpi + ", vlasnikKorpeId=" + vlasnikKorpeId + ", ukupnaCena=" + cena + "]";
	}
	
	
	
}
