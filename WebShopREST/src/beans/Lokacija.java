package beans;

public class Lokacija {
	public String id;
	public double geografskaDuzina;
	public double geografskaSirina;
	public String adresa;
	
	public Lokacija() {
		
	}

	public Lokacija(String id, double geografskaDuzina, double geografskaSirina, String adresa) {
		super();
		this.id = id;
		this.geografskaDuzina = geografskaDuzina;
		this.geografskaSirina = geografskaSirina;
		this.adresa = adresa;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public double getGeografskaDuzina() {
		return geografskaDuzina;
	}

	public void setGeografskaDuzina(double geografskaDuzina) {
		this.geografskaDuzina = geografskaDuzina;
	}

	public double getGeografskaSirina() {
		return geografskaSirina;
	}

	public void setGeografskaSirina(double geografskaSirina) {
		this.geografskaSirina = geografskaSirina;
	}

	public String getAdresa() {
		return adresa;
	}

	public void setAdresa(String adresa) {
		this.adresa = adresa;
	}

	@Override
	public String toString() {
		return "Lokacija [id=" + id + ", geografskaDuzina=" + geografskaDuzina + ", geografskaSirina="
				+ geografskaSirina + ", adresa=" + adresa + "]";
	}
	
}