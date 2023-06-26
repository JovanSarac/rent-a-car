package beans;


import java.time.LocalDateTime;
import java.util.List;



public class Porudzbina {
	public enum Status{Obrada, Odobreno, Preuzeto, Vraceno, Odbijeno, Otkazano};	
	
	public String idNarudzbe;
	public List<Vozilo> iznajmljenaVozila;
	public LocalDateTime datumIznajmljivanja;
	public int trajanjeNajma;
	public double cena;
	public String kupacImePrz;
	public Status status;
	
	public Porudzbina() {
		
	}

	public Porudzbina(String idNarudzbe, List<Vozilo> iznajmljenaVozila, LocalDateTime datumIznajmljivanja,
			int trajanjeNajma, double cena, String kupacImePrz, Status status) {
		super();
		this.idNarudzbe = idNarudzbe;
		this.iznajmljenaVozila = iznajmljenaVozila;
		this.datumIznajmljivanja = datumIznajmljivanja;
		this.trajanjeNajma = trajanjeNajma;
		this.cena = cena;
		this.kupacImePrz = kupacImePrz;
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

	public LocalDateTime getDatumIznajmljivanja() {
		return datumIznajmljivanja;
	}

	public void setDatumIznajmljivanja(LocalDateTime datumIznajmljivanja) {
		this.datumIznajmljivanja = datumIznajmljivanja;
	}

	public int getTrajanjeNajma() {
		return trajanjeNajma;
	}

	public void setTrajanjeNajma(int trajanjeNajma) {
		this.trajanjeNajma = trajanjeNajma;
	}

	public double getCena() {
		return cena;
	}

	public void setCena(double cena) {
		this.cena = cena;
	}

	public String getKupacImePrz() {
		return kupacImePrz;
	}

	public void setKupacImePrz(String kupacImePrz) {
		this.kupacImePrz = kupacImePrz;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "Porudzbina [idNarudzbe=" + idNarudzbe + ", iznajmljenaVozila=" + iznajmljenaVozila
				+ ", datumIznajmljivanja=" + datumIznajmljivanja + ", trajanjeNajma=" + trajanjeNajma + ", cena=" + cena
				+ ", kupacImePrz=" + kupacImePrz + ", status=" + status + "]";
	}

	
}
