package beans;


public class Komentar {
    public String id;
    public String korisnickoIme;
    public String kupacId;
    public String rentacarId;
    public String komentar;
    public int ocjena;
    public boolean odobreno;

    public Komentar() {}

    public Komentar(String korisnickoIme, String kupacId, String rentacarId, String komentar, int ocjena) {
        this.korisnickoIme = korisnickoIme;
    	this.kupacId = kupacId;
        this.rentacarId = rentacarId;
        this.komentar = komentar;
        this.ocjena = ocjena;
        this.odobreno = false;
    }

    public String getKorisnickoIme() {
		return korisnickoIme;
	}

	public void setKorisnickoIme(String korisnickoIme) {
		this.korisnickoIme = korisnickoIme;
	}

	public boolean isOdobreno() {
		return odobreno;
	}

	public void setOdobreno(boolean odobreno) {
		this.odobreno = odobreno;
	}

	public String getKupacId() {
        return kupacId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setKupacId(String kupacId) {
        this.kupacId = kupacId;
    }

    public String getRentacarId() {
        return rentacarId;
    }

    public void setRentacarId(String rentacarId) {
        this.rentacarId = rentacarId;
    }

    public String getKomentar() {
        return komentar;
    }

    public void setKomentar(String komentar) {
        this.komentar = komentar;
    }

    public int getOcjena() {
        return ocjena;
    }

    public void setOcjena(int ocjena) {
        this.ocjena = ocjena;
    }
}
