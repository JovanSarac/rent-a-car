package dao;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.ParseException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;


import beans.Porudzbina;
import beans.Porudzbina.Status;


public class PorudzbinaDAO {
	private List<Porudzbina> porudzbine;
	private final ObjectMapper objectMapper;
	private final File file;

	public PorudzbinaDAO(String CtxPath){

		objectMapper = new ObjectMapper();
		porudzbine = new ArrayList<Porudzbina>();
		
		String putanjaFajla = CtxPath + "\\resources\\Porudzbine.JSON";
		System.out.println(putanjaFajla);
		file = new File(putanjaFajla);

		readFromFileJSON();
	}
	
	public Porudzbina Sacuvaj(Porudzbina p){
        p.setIdNarudzbe(nextId());
        System.out.println(p.getIdNarudzbe());
        porudzbine.add(p);
        System.out.println("odradjeno dodvanje u listu porudzbina");
        writeToFileJSON();
        return p;
    }   
	
	 public boolean izmeniPorudzbinu(Porudzbina p) {
	    	Porudzbina stara = nadjiPorudzbinu(p.getIdNarudzbe());
	    	int index = porudzbine.indexOf(stara);
	    	stara = p;
	    	porudzbine.set(index,stara);
	    	writeToFileJSON();
			return true;
	    }

    
    public Porudzbina nadjiPorudzbinu(String id) {
    	for(Porudzbina p : porudzbine) {
    		if(p.getIdNarudzbe().equals(id)) {
    			return p;
    		}
    	}
    	return null;
    }
    
    public List<Porudzbina> nadjiSvePorudzbine() {
        return porudzbine;
    }
    
    public String nadjiIdPoslednjePorudzbine() {
		 System.out.println(porudzbine.get(porudzbine.size()-1).getIdNarudzbe());
		 return porudzbine.get(porudzbine.size()-1).getIdNarudzbe();
	 }

    private String generateRandomId() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        StringBuilder sb = new StringBuilder(10);

        for (int i = 0; i < 10; i++) {
            int index = random.nextInt(characters.length());
            sb.append(characters.charAt(index));
        }

        return sb.toString();
    }

    private String nextId() {
        return generateRandomId();
    }

	private void writeToFileJSON()
	{
		System.out.println("Pocetak pisanja u fajl");
		try {
			createFile();
			objectMapper.writerWithDefaultPrettyPrinter().writeValue(new FileOutputStream(file), porudzbine);
	    }catch(IOException e){
	        e.printStackTrace();
	    }
	}	

	private void readFromFileJSON()
	{
	    try{
	        JavaType type = objectMapper.getTypeFactory().constructCollectionType(List.class,Porudzbina.class);
	        porudzbine = objectMapper.readValue(file, type);
	    }catch(IOException e){
	        e.printStackTrace();
	    }
	
	}

	private void createFile() throws IOException{
		System.out.println("kreiranje fajla ako ga nema");
	    if(!file.exists()) {
	    	boolean uspjesno = file.createNewFile();
	    	System.out.println(uspjesno);
	    	System.out.println("kreira novi");
	    }else {
	    	System.out.println("ne kreira");
	    }
	}
	
	public List<Porudzbina> nadjiPorudzbineZaKupca(String KupacId) {
		readFromFileJSON();
	    List<Porudzbina> pretrazeni = new ArrayList<>();
	    for (Porudzbina p : porudzbine) {
	        if (p.getKupacId().equals(KupacId) && !p.isDeleted()) {
	        	 pretrazeni.add(p);
	        }
	    }

	     System.out.println("Pronađeno je: " + pretrazeni.size() + " porudzbina za ulogovanog kupca");
	    return pretrazeni;
	}
	
	public List<Porudzbina> nadjiPorudzbinezaRentaCar(String rentaCarId){
		List<Porudzbina> pretrazeni = new ArrayList<>();
	    for (Porudzbina p : porudzbine) {
	        if (p.rentaCarIds.contains(rentaCarId)) {
	        	 pretrazeni.add(p);
	        }
	    }

	    System.out.println("Pronađeno je: " + pretrazeni.size() + " porudzbina za rentacar objekat sa idom:" + rentaCarId);
	    return pretrazeni;
	}

	public List<Porudzbina> nadjiPorudzbinezaIzmedjuDvaDatuma(String pocetniDatum, String krajnjiDatum) {
		List<Porudzbina> pronadjene = new ArrayList<>();
        
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate datumIznajmljivanja;
        LocalDate datumVracanja;
        LocalDate pDatum;
        LocalDate kDatum;
		for (Porudzbina p : porudzbine) {
	        if(p.getStatus().equals(Status.Obrada) || p.getStatus().equals(Status.Odobreno)) {
	    	        pDatum = LocalDate.parse(pocetniDatum);
	    	        kDatum = LocalDate.parse(krajnjiDatum);
	    	        datumIznajmljivanja = LocalDate.parse(p.datumIznajmljivanja);
	    	    	datumVracanja = LocalDate.parse(p.datumVracanja);
	    	    	if( proveriPreklapanjeDatuma(datumIznajmljivanja, datumVracanja, pDatum, kDatum) ) {
		        		pronadjene.add(p);		        		
		        	}
	        	
	        }
	    }
		System.out.println("#####################################");
		return pronadjene;
	}
	
	public static boolean proveriPreklapanjeDatuma(LocalDate datumIznajmljivanja, LocalDate datumVracanja, LocalDate pDatum, LocalDate kDatum) {
        boolean prviSlucaj = (pDatum.isBefore(datumIznajmljivanja) || pDatum.isEqual(datumIznajmljivanja)) &&
                ((kDatum.isBefore(datumVracanja) || kDatum.isEqual(datumVracanja)) && kDatum.isAfter(datumIznajmljivanja));

        boolean drugiSlucaj =((pDatum.isAfter(datumIznajmljivanja) || pDatum.isEqual(datumIznajmljivanja)) && pDatum.isBefore(datumVracanja)) &&
        		((kDatum.isBefore(datumVracanja) || kDatum.isEqual(datumVracanja)) && kDatum.isAfter(datumIznajmljivanja));
        
        boolean treciSlucaj =((pDatum.isAfter(datumIznajmljivanja) || pDatum.isEqual(datumIznajmljivanja)) && pDatum.isBefore(datumVracanja)) &&
        		(kDatum.isAfter(datumVracanja) || kDatum.isEqual(datumVracanja));
        
        boolean cetvrtiSlucaj =(pDatum.isBefore(datumIznajmljivanja) || pDatum.isEqual(datumIznajmljivanja)) &&
        		(kDatum.isAfter(datumVracanja) || kDatum.isEqual(datumVracanja));
        
        System.out.println("prvi slucaj=" + prviSlucaj);
        System.out.println("drugi slucaj=" + drugiSlucaj);
        System.out.println("treci slucaj=" + treciSlucaj);
        System.out.println("cetvrti slucaj=" + cetvrtiSlucaj);
        

        return prviSlucaj || drugiSlucaj || treciSlucaj || cetvrtiSlucaj;
    }
}
