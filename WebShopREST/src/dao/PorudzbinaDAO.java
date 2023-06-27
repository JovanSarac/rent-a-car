package dao;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Korisnik;
import beans.Porudzbina;
import beans.RentaCar;
import beans.Vozilo;
import beans.Korisnik.Uloga;

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
}
