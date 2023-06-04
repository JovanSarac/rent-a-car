package beans;

public class Adresa {
	public String ulica;
	public int broj;
	public String grad;
	public int postanskiBroj;
	
	public Adresa() {
		
	}
	public Adresa(String ulica, int broj, String grad, int postanskiBroj) {
		super();
		this.ulica = ulica;
		this.broj = broj;
		this.grad = grad;
		this.postanskiBroj = postanskiBroj;
	}
	public String getUlica() {
		return ulica;
	}
	public void setUlica(String ulica) {
		this.ulica = ulica;
	}
	public int getBroj() {
		return broj;
	}
	public void setBroj(int broj) {
		this.broj = broj;
	}
	public String getGrad() {
		return grad;
	}
	public void setGrad(String grad) {
		this.grad = grad;
	}
	public int getPostanskiBroj() {
		return postanskiBroj;
	}
	public void setPostanskiBroj(int postanskiBroj) {
		this.postanskiBroj = postanskiBroj;
	}
}
