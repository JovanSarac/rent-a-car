package beans;

public class Lokacija {
	public double geografskaDuzina;
	public double geografskaSirina;
	public Adresa adresa;
	
	public Lokacija() {
		
	}

	public Lokacija(double geografskaDuzina, double geografskaSirina, Adresa adresa) {
		super();
		this.geografskaDuzina = geografskaDuzina;
		this.geografskaSirina = geografskaSirina;
		this.adresa = adresa;
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

	public Adresa getAdresa() {
		return adresa;
	}

	public void setAdresa(Adresa adresa) {
		this.adresa = adresa;
	}

	@Override
	public String toString() {
		return "Lokacija [geografskaDuzina=" + geografskaDuzina + ", geografskaSirina=" + geografskaSirina + ", adresa="
				+ adresa + "]";
	}
}
