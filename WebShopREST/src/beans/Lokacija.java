package beans;

public class Lokacija {
	public String id;
	public double geografskaDuzina;
	public double geografskaSirina;
	public String mjesto;
	public int postanskiBroj;
	public String ulica;
	public String broj;
	
	
	public Lokacija() {
		
	}


	public Lokacija(String id, double geografskaDuzina, double geografskaSirina, String mjesto, int postanskiBroj,
			String ulica, String broj) {
		super();
		this.id = id;
		this.geografskaDuzina = geografskaDuzina;
		this.geografskaSirina = geografskaSirina;
		this.mjesto = mjesto;
		this.postanskiBroj = postanskiBroj;
		this.ulica = ulica;
		this.broj = broj;
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


	public String getMjesto() {
		return mjesto;
	}


	public void setMjesto(String mjesto) {
		this.mjesto = mjesto;
	}


	public int getPostanskiBroj() {
		return postanskiBroj;
	}


	public void setPostanskiBroj(int postanskiBroj) {
		this.postanskiBroj = postanskiBroj;
	}


	public String getUlica() {
		return ulica;
	}


	public void setUlica(String ulica) {
		this.ulica = ulica;
	}


	public String getBroj() {
		return broj;
	}


	public void setBroj(String broj) {
		this.broj = broj;
	}


	@Override
	public String toString() {
		return "Lokacija [id=" + id + ", geografskaDuzina=" + geografskaDuzina + ", geografskaSirina="
				+ geografskaSirina + ", mjesto=" + mjesto + ", postanskiBroj=" + postanskiBroj + ", ulica=" + ulica
				+ ", broj=" + broj + "]";
	}

	
}