package beans;


public class Komentar {
    public String id;
    public int kupacId;
    public int rentacarId;
    public String komentar;
    public int ocjena;

    public Komentar() {}

    public Komentar(int kupacId, int rentacarId, String komentar, int ocjena) {
        this.kupacId = kupacId;
        this.rentacarId = rentacarId;
        this.komentar = komentar;
        this.ocjena = ocjena;
    }

    public int getKupacId() {
        return kupacId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setKupacId(int kupacId) {
        this.kupacId = kupacId;
    }

    public int getRentacarId() {
        return rentacarId;
    }

    public void setRentacarId(int rentacarId) {
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
