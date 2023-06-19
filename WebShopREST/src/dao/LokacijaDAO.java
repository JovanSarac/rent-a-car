package dao;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Korisnik;
import beans.Lokacija;


public class LokacijaDAO {	
	private List<Lokacija> lokacije;
	private final ObjectMapper objectMapper;
	private final File file;

	public LokacijaDAO(String CtxPath){

		objectMapper = new ObjectMapper();
		lokacije = new ArrayList<Lokacija>();
		
		String putanjaFajla = CtxPath + "\\resources\\Lokacije.JSON";
		System.out.println(putanjaFajla);
		file = new File(putanjaFajla);

		readFromFileJSON();
	}
	
/*	public Korisnik Sacuvaj(Korisnik korisnik){
		System.out.println("Usao u cuvanje");
		System.out.println("Korisnicko ime:" + korisnik.getKorisnickoIme());
        if(!korisnickoImeJedinstveno(korisnik)) return null;

        korisnik.setId(nextId().toString());
        System.out.println(korisnik.getId());
        lokacije.add(korisnik);
        System.out.println("odradjeno dodvanje u listu korisnika");
        writeToFileJSON();
        return korisnik;
    }   */

    
    public Lokacija nadjiLokaciju(String id) {
    	for(Lokacija k : lokacije) {
    		if(k.getId().equals(id)) {
    			return k;
    		}
    	}
    	return null;
    }
    
    public List<Lokacija> nadjiSveLokacije() {
        return lokacije;
    }
    

	private Integer nextId(){
		return lokacije.size()+1;
	}

	private void writeToFileJSON()
	{
		System.out.println("Pocetak pisanja u fajl");
		try {
			createFile();
			objectMapper.writerWithDefaultPrettyPrinter().writeValue(new FileOutputStream(file), lokacije);
	    }catch(IOException e){
	        e.printStackTrace();
	    }
	}	

	private void readFromFileJSON()
	{
	    try{
	        JavaType type = objectMapper.getTypeFactory().constructCollectionType(List.class,Lokacija.class);
	        lokacije = objectMapper.readValue(file, type);
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
