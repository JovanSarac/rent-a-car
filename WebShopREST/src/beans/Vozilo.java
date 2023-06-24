package beans;

public class Vozilo {
	public enum VrstaMjenjaca{manuelni,automatik};
	public enum TipGoriva {dizel,benzin,hibrid,elektricni}
	public enum Status {Dostupljeno,Iznajmljeno}
	
	public String id;
	public String marka;
	public String model;
	public double cena;
	public String tipVozila;
	public VrstaMjenjaca vrsta;
	public String objekatId;
	public TipGoriva tipGoriva;
	public double potrosnja;
	public int brojVrata;
	public int brojOsoba;
	public String opis;
	public String slika;
	public Status status;
	
	public Vozilo() {
		
	}

	public Vozilo(String marka, String model, double cena, String tipVozila, VrstaMjenjaca vrsta, String objekatId,
			TipGoriva tipGoriva, double potrosnja, int brojVrata, int brojOsoba, String opis, String slika,
			Status status) {
		super();
		this.marka = marka;
		this.model = model;
		this.cena = cena;
		this.tipVozila = tipVozila;
		this.vrsta = vrsta;
		this.objekatId = objekatId;
		this.tipGoriva = tipGoriva;
		this.potrosnja = potrosnja;
		this.brojVrata = brojVrata;
		this.brojOsoba = brojOsoba;
		this.opis = opis;
		this.slika = slika;
		this.status = status;
	}
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	public String getMarka() {
		return marka;
	}

	public void setMarka(String marka) {
		this.marka = marka;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public double getCena() {
		return cena;
	}

	public void setCena(double cena) {
		this.cena = cena;
	}

	public String getTipVozila() {
		return tipVozila;
	}

	public void setTipVozila(String tipVozila) {
		this.tipVozila = tipVozila;
	}

	public VrstaMjenjaca getVrsta() {
		return vrsta;
	}

	public void setVrsta(VrstaMjenjaca vrsta) {
		this.vrsta = vrsta;
	}

	public String getObjekatId() {
		return objekatId;
	}

	public void setObjekat(String objekatId) {
		this.objekatId = objekatId;
	}

	public TipGoriva getTipGoriva() {
		return tipGoriva;
	}

	public void setTipGoriva(TipGoriva tipGoriva) {
		this.tipGoriva = tipGoriva;
	}

	public double getPotrosnja() {
		return potrosnja;
	}

	public void setPotrosnja(double potrosnja) {
		this.potrosnja = potrosnja;
	}

	public int getBrojVrata() {
		return brojVrata;
	}

	public void setBrojVrata(int brojVrata) {
		this.brojVrata = brojVrata;
	}

	public int getBrojOsoba() {
		return brojOsoba;
	}

	public void setBrojOsoba(int brojOsoba) {
		this.brojOsoba = brojOsoba;
	}

	public String getOpis() {
		return opis;
	}

	public void setOpis(String opis) {
		this.opis = opis;
	}

	public String getSlika() {
		return slika;
	}

	public void setSlika(String slika) {
		this.slika = slika;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "Vozilo [marka=" + marka + ", model=" + model + ", cena=" + cena + ", tipVozila=" + tipVozila
				+ ", vrsta=" + vrsta + ", objekatId=" + objekatId + ", tipGoriva=" + tipGoriva + ", potrosnja=" + potrosnja
				+ ", brojVrata=" + brojVrata + ", brojOsoba=" + brojOsoba + ", opis=" + opis + ", slika=" + slika
				+ ", status=" + status + "]";
	}
	
	
	
	
	
}
