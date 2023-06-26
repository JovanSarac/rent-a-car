package dao;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Korisnik;
import beans.RentaCar;
import beans.Korisnik.Uloga;


public class KorisnikDAO {	
	private List<Korisnik> korisnici;
	private final ObjectMapper objectMapper;
	private final File file;

	public KorisnikDAO(String CtxPath){

		objectMapper = new ObjectMapper();
		korisnici = new ArrayList<Korisnik>();
		
		String putanjaFajla = CtxPath + "\\resources\\Korisnici.JSON";
		System.out.println(putanjaFajla);
		file = new File(putanjaFajla);

		readFromFileJSON();
	}
	
	public Korisnik Sacuvaj(Korisnik korisnik){
		System.out.println("Usao u cuvanje");
		System.out.println("Korisnicko ime:" + korisnik.getKorisnickoIme());
        if(!korisnickoImeJedinstveno(korisnik)) return null;

        korisnik.setId(nextId().toString());
        System.out.println(korisnik.getId());
        korisnici.add(korisnik);
        System.out.println("odradjeno dodvanje u listu korisnika");
        writeToFileJSON();
        return korisnik;
    }
	
	 public List<Korisnik> nadjiSveKorisnike(Korisnik korisnik) {
		 ArrayList<Korisnik> korisnici2 = new ArrayList<Korisnik>(korisnici);
	       korisnici2.remove(korisnik);
	       return korisnici2;
	    }

    private boolean korisnickoImeJedinstveno(Korisnik korisnik){
    	System.out.println("ime jedinstveno");
        for(Korisnik k:korisnici)
        {
        	System.out.println(k);
            if(k.getKorisnickoIme().equals(korisnik.getKorisnickoIme())) return false;
        }
        System.out.println("nema nijedan");
        return true;
    }
    
    public Korisnik nadjiKorisnika(String id) {
    	for(Korisnik k : korisnici) {
    		if(k.getId().equals(id)) {
    			return k;
    		}
    	}
    	return null;
    }
    
    public Korisnik nadjiKorisnikaKorIme(String korisnickoIme) {
    	for(Korisnik k : korisnici) {
    		if(k.getKorisnickoIme().equals(korisnickoIme)) {
    			return k;
    		}
    	}
    	return null;
    	
    }
    
    public Korisnik izmeniKorisnika(Korisnik korisnik) {
        try {
            int index = -1;
            for (int i = 0; i < korisnici.size(); i++) {
                if (korisnici.get(i).getId().equals(korisnik.getId())) {
                    index = i;
                    break;
                }
            }

            if (index != -1) {
                korisnici.set(index, korisnik);
                writeToFileJSON();
                return korisnik;
            } else {
                throw new IllegalArgumentException("Korisnik nije pronađen.");
            }
        } catch (Exception e) {
            return null;
        }
    }


	private Integer nextId(){
		return korisnici.size()+1;
	}

	private void writeToFileJSON()
	{
		System.out.println("Pocetak pisanja u fajl");
		try {
			createFile();
			objectMapper.writerWithDefaultPrettyPrinter().writeValue(new FileOutputStream(file), korisnici);
	    }catch(IOException e){
	        e.printStackTrace();
	    }
	}	

	private void readFromFileJSON()
	{
	    try{
	        JavaType type = objectMapper.getTypeFactory().constructCollectionType(List.class,Korisnik.class);
	        korisnici = objectMapper.readValue(file, type);
	    }catch(IOException e){
	        e.printStackTrace();
	    }
	
	}

	private void createFile() throws IOException{
		System.out.println("kreiranje fajla ako ga nema");
	    if(!file.exists()) {
	    	//System.out.println(file.getPath());
	    	//System.out.println(file.getAbsolutePath());
	    	//System.out.println(file.getCanonicalPath());
	    	boolean uspjesno = file.createNewFile();
	    	System.out.println(uspjesno);
	    	System.out.println("kreira novi");
	    }else {
	    	System.out.println("ne kreira");
	    }
	}
	
	public ArrayList<Korisnik> pretrazi(String ime, String prezime, String korIme, String filterUloga) {
	    ArrayList<Korisnik> pretrazeni = new ArrayList<Korisnik>(); 
	    for (Korisnik object : korisnici) {
	        boolean nameCondition = ime == null || ime.isEmpty() || object.getIme().toLowerCase().contains(ime.toLowerCase());
	        boolean cityCondition = prezime == null || prezime.isEmpty() || object.getPrezime().toLowerCase().contains(prezime.toLowerCase());
	        boolean korImeCondition = korIme == null || korIme.isEmpty() || object.getKorisnickoIme().toLowerCase().contains(korIme.toLowerCase());
	        
	        if (nameCondition && cityCondition && korImeCondition) {
	            pretrazeni.add(object);
	        }
	    }
	    
	    if (!filterUloga.isEmpty()) {
	        ArrayList<Korisnik> filtrirani = new ArrayList<Korisnik>();
	        for (Korisnik odabran : pretrazeni) {
	            if (odabran.getUloga().toString().equals(filterUloga)) {
	                filtrirani.add(odabran);
	            }
	        }
	        return filtrirani;
	    }
	    
	    return pretrazeni;
	}

	
	public List<Korisnik> nadjiMenadzere(List<RentaCar> objekti) {
		readFromFileJSON();
	    List<Korisnik> pretrazeni = new ArrayList<>();
	    for (Korisnik korisnik : korisnici) {
	        if (korisnik.getUloga() == Uloga.menadzer) {
	            boolean slobodan = true;
	            for (RentaCar objekat : objekti) {
	                if (objekat.getMenadzer() != null && objekat.getMenadzer().getId().equals(korisnik.getId())) {
	                	System.out.println("NADJEN JEDAN KOJI NIJE SLOBODAN");
	                    slobodan = false;
	                    break;
	                }
	            }
	            if (slobodan) {
	                pretrazeni.add(korisnik);
	            }
	        }
	    }
	    System.out.println("Pronađeno je: " + pretrazeni.size() + " slobodnih menadžera");
	    return pretrazeni;
	}


	
}
	
	
	
	
	
	
	
	

