package beans;

public class TipKupca {
	public enum Tip { Zlatni, Srebrni, Bronzani};
	
	public Tip tipKupca;
	public double procenat;
	public int brojBodova;
	
	public TipKupca(Tip tipKupca, double procenat, int brojBodova) {
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

	public int getBrojBodova() {
		return brojBodova;
	}

	public void setBrojBodova(int brojBodova) {
		this.brojBodova = brojBodova;
	}

	@Override
	public String toString() {
		return "TipKupca [tipKupca=" + tipKupca + ", procenat=" + procenat + ", brojBodova=" + brojBodova + "]";
	} 
	
}
