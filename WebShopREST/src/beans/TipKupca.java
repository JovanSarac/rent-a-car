package beans;

public class TipKupca {
	public enum Tip { Zlatni, Srebrni, Bronzani};
	
	public Tip tipKupca;
	public double procenat;
	public double brojBodova;
	
	public TipKupca () {}
	
	public TipKupca(Tip tipKupca, double procenat, double brojBodova) {
		super();
		this.tipKupca = tipKupca;
		this.procenat = procenat;
		this.brojBodova = brojBodova;
	}

	public Tip getTipKupca() {
		return tipKupca;
	}

	public void setTipKupca(Tip tipKupca) {
		this.tipKupca = tipKupca;
	}

	public double getProcenat() {
		return procenat;
	}

	public void setProcenat(double procenat) {
		this.procenat = procenat;
	}

	public double getBrojBodova() {
		return brojBodova;
	}

	public void setBrojBodova(double brojBodova) {
		this.brojBodova = brojBodova;
	}

	@Override
	public String toString() {
		return "TipKupca [tipKupca=" + tipKupca + ", procenat=" + procenat + ", brojBodova=" + brojBodova + "]";
	} 
	
}
