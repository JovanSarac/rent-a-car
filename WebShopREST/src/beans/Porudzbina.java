package beans;

import java.util.List;

public class Porudzbina {
	public enum Status{Obrada, Odobreno, Preuzeto, Vraceno, Odbijeno, Otkazano};	
	
	public String idNarudzbe;
	public List<Vozilo> iznajmljenaVozila;
	public String datumIznajmljivanja;
	public String datumVracanja;
	public double cena;
	public String kupacId;
	public Status status;
	
	public Porudzbina() {
		
	}

	public Porudzbina(String idNarudzbe, List<Vozilo> iznajmljenaVozila, String datumIznajmljivanja,
			String datumVracanja, double cena, String kupacid, Status status) {
		super();
		this.idNarudzbe = idNarudzbe;
		this.iznajmljenaVozila = iznajmljenaVozila;
		this.datumIznajmljivanja = datumIznajmljivanja;
		this.datumVracanja = datumVracanja;
		this.cena = cena;
		this.kupacId = kupacid;
		this.status = status;
	}

	public String getIdNarudzbe() {
		return idNarudzbe;
	}

	public void setIdNarudzbe(String idNarudzbe) {
		this.idNarudzbe = idNarudzbe;
	}

	public List<Vozilo> getIznajmljenaVozila() {
		return iznajmljenaVozila;
	}

	public void setIznajmljenaVozila(List<Vozilo> iznajmljenaVozila) {
		this.iznajmljenaVozila = iznajmljenaVozila;
	}

	public String getDatumIznajmljivanja() {
		return datumIznajmljivanja;
	}

	public void setDatumIznajmljivanja(String datumIznajmljivanja) {
		this.datumIznajmljivanja = datumIznajmljivanja;
	}

	public String getDatumVracanja() {
		return datumVracanja;
	}

	public void setDatumVracanja(String datumVracanja) {
		this.datumVracanja = datumVracanja;
	}

	public double getCena() {
		return cena;
	}

	public void setCena(double cena) {
		this.cena = cena;
	}

	public String getKupacId() {
		return kupacId;
	}

	public void setKupacId(String kupacId) {
		this.kupacId = kupacId;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}
}
