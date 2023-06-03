package beans;


public class Korisnik {
	public String id;
	public String korisnickoIme;
	public String lozinka;
	public String ime;
	public String prezime;
	public String pol;
	public String datumRodjenja;
	
	public Korisnik() {
		super();
	}

	public Korisnik(String id,String korisnickoIme, String lozinka, String ime, String prezime, String pol,
			String datumRodjenja) {
		super();
		this.id = id;
		this.korisnickoIme = korisnickoIme;
		this.lozinka = lozinka;
		this.ime = ime;
		this.prezime = prezime;
		this.pol = pol;
		this.datumRodjenja = datumRodjenja;
	}

	public String getId() {
		return id;
	}

	@Override
	public String toString() {
		return "Korisnik [id=" + id + ", korisnickoIme=" + korisnickoIme + ", lozinka=" + lozinka + ", ime=" + ime
				+ ", prezime=" + prezime + ", pol=" + pol + ", datumRodjenja=" + datumRodjenja + "]";
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getKorisnickoIme() {
		return korisnickoIme;
	}

	public void setKorisnickoIme(String korisnickoIme) {
		this.korisnickoIme = korisnickoIme;
	}

	public String getLozinka() {
		return lozinka;
	}

	public void setLozinka(String lozinka) {
		this.lozinka = lozinka;
	}

	public String getIme() {
		return ime;
	}

	public void setIme(String ime) {
		this.ime = ime;
	}

	public String getPrezime() {
		return prezime;
	}

	public void setPrezime(String prezime) {
		this.prezime = prezime;
	}

	public String getPol() {
		return pol;
	}

	public void setPol(String pol) {
		this.pol = pol;
	}

	public String getDatumRodjenja() {
		return datumRodjenja;
	}

	public void setDatumRodjenja(String datumRodjenja) {
		this.datumRodjenja = datumRodjenja;
	}
	
	
	
}
