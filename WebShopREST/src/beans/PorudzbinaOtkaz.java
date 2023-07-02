package beans;

public class PorudzbinaOtkaz {
	
	public String kupacId;
	public String datum;
	
	public PorudzbinaOtkaz() {
		
	}

	public PorudzbinaOtkaz(String kupacId, String date) {
		super();
		this.kupacId = kupacId;
		datum = date;
	}

	public String getKupacId() {
		return kupacId;
	}

	public void setKupacId(String kupacId) {
		this.kupacId = kupacId;
	}

	public String getDatum() {
		return datum;
	}

	public void setDatum(String datum) {
		this.datum = datum;
	}
	

}
