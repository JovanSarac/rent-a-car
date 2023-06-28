package beans;

public class PorudzbinaStanje {
	public enum Status{Obrada, Odobreno, Preuzeto, Vraceno, Odbijeno, Otkazano};
	
	public String porudzbinaId;
	public String rentaCarId;
	public Status statusPorudzbine;
	
	public PorudzbinaStanje() {
		
	}

	public PorudzbinaStanje(String porudzbinaId, String rentaCarId, Status statusPorudzbine) {
		super();
		this.porudzbinaId = porudzbinaId;
		this.rentaCarId = rentaCarId;
		this.statusPorudzbine = statusPorudzbine;
	}

	public String getPorudzbinaId() {
		return porudzbinaId;
	}

	public void setPorudzbinaId(String porudzbinaId) {
		this.porudzbinaId = porudzbinaId;
	}

	public String getRentaCarId() {
		return rentaCarId;
	}

	public void setRentaCarId(String rentaCarId) {
		this.rentaCarId = rentaCarId;
	}

	public Status getStatusPorudzbine() {
		return statusPorudzbine;
	}

	public void setStatusPorudzbine(Status statusPorudzbine) {
		this.statusPorudzbine = statusPorudzbine;
	}

	@Override
	public String toString() {
		return "PorudzbinaStanje [porudzbinaId=" + porudzbinaId + ", rentaCarId=" + rentaCarId + ", statusPorudzbine="
				+ statusPorudzbine + "]";
	}
	
	

}
