package dao;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Korisnik;


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
}
