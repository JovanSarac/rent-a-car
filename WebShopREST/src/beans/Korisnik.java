package beans;


public class Korisnik {
	
	public enum Uloga { administrator, menadzer, kupac};
	
	public String id;
	public String korisnickoIme;
	public String lozinka;
	public String ime;
	public String prezime;
	public Uloga uloga;
	public String pol;
	public String datumRodjenja;
	public TipKupca vrstaKupca;
	public boolean blokiran;
	public boolean sumnjiv;
	public Korpa korpa;
	
	public Korisnik() {
		super();
	}

	public Korisnik(String korisnickoIme, String lozinka, String ime, String prezime, String pol,
			String datumRodjenja, Uloga ulog, TipKupca tip, Korpa korpa) {
		super();
		this.korisnickoIme = korisnickoIme;
		this.lozinka = lozinka;
		this.ime = ime;
		this.prezime = prezime;
		this.pol = pol;
		this.datumRodjenja = datumRodjenja;
		this.uloga = ulog;
		this.vrstaKupca = tip;
		this.blokiran = false;
		this.sumnjiv = false;
		this.korpa = korpa;
	 		
	}

	public Korisnik(String korisnickoIme, String ime, String prezime, String pol,
			String datumRodjenja) {
		super();
		this.korisnickoIme = korisnickoIme;
		this.ime = ime;
		this.prezime = prezime;
		this.pol = pol;
		this.datumRodjenja = datumRodjenja;
	}

	public String getId() {
		return id;
	}

	public boolean isSumnjiv() {
		return sumnjiv;
	}

	public void setSumnjiv(boolean sumnjiv) {
		this.sumnjiv = sumnjiv;
	}

	@Override
	public String toString() {
		return "Korisnik [id=" + id + ", korisnickoIme=" + korisnickoIme + ", lozinka=" + lozinka + ", ime=" + ime
				+ ", prezime=" + prezime + ", pol=" + pol + ", datumRodjenja=" + datumRodjenja + "]";
	}

	public Uloga getUloga() {
		return uloga;
	}

	public void setUloga(Uloga uloga) {
		this.uloga = uloga;
	}

	public TipKupca getVrstaKupca() {
		return vrstaKupca;
	}

	public void setVrstaKupca(TipKupca vrstaKupca) {
		this.vrstaKupca = vrstaKupca;
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

	public Korpa getKorpa() {
		return korpa;
	}

	public void setKorpa(Korpa korpa) {
		this.korpa = korpa;
	}
	
	public boolean isBlokiran() {
		return blokiran;
	}

	public void setBlokiran(boolean blokiran) {
		this.blokiran = blokiran;
	}
	
}
