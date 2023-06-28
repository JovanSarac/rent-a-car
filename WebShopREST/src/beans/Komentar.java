package beans;

public class Komentar {
	
	public String id;
	public int KupacId;
	public int RentacarId;
	public String komentar;
	public int ocjena;
	
	public Komentar() {}

	public Komentar(int kupacId, int rentacarId, String komentar, int ocjena) {
		super();
		KupacId = kupacId;
		RentacarId = rentacarId;
		this.komentar = komentar;
		this.ocjena = ocjena;
	}

	public int getKupacId() {
		return KupacId;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setKupacId(int kupacId) {
		KupacId = kupacId;
	}

	public int getRentacarId() {
		return RentacarId;
	}

	public void setRentacarId(int rentacarId) {
		RentacarId = rentacarId;
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
