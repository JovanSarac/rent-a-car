package dao;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;


import beans.RentaCar;

public class RentaCarDAO {

	private List<RentaCar> objekti;
	private final ObjectMapper objectMapper;
	private final File file;

	public RentaCarDAO(String CtxPath){

		objectMapper = new ObjectMapper();
		objekti = new ArrayList<RentaCar>();

		String putanjaFajla = CtxPath + "\\resources\\RentACar.JSON";
		System.out.println(putanjaFajla);
		file = new File(putanjaFajla);

		readFromFileJSON();
	}
	
	public RentaCar Sacuvaj(RentaCar objekat){

        objekat.setId(nextId().toString());
        System.out.println(objekat.getId());
        objekti.add(objekat);
        writeToFileJSON();
        return objekat;
    }  
	
	public boolean izmeniRentaCar(RentaCar noviObjekat) {
    	RentaCar stariObjekat = nadjiObjekat(noviObjekat.getId());
    	int index = objekti.indexOf(stariObjekat);
    	System.out.println(stariObjekat);
    	System.out.println(noviObjekat);
    	stariObjekat = noviObjekat;
    	objekti.set(index,stariObjekat);
    	writeToFileJSON();
		return true;
 	
    }

    
    public RentaCar nadjiObjekat(String id) {
    	for(RentaCar k : objekti) {
    		if(k.getId().equals(id)) {
    			return k;
    		}
    	}
    	return null;
    }
    
    public RentaCar nadjiMenadzerovObjekat(String korisnikId) {
    	for(RentaCar r : objekti) {
    		if(r.menadzer.getId().equals(korisnikId)) {
    			return r;
    		}
    	}
    	return null;
    }
    
    public List<RentaCar> nadjiSveObjekte() {
    	readFromFileJSON();
        return objekti;
    }
    

	private Integer nextId(){
		return objekti.size()+1;
	}

	private void writeToFileJSON()
	{
		System.out.println("Pocetak pisanja u fajl");
		try {
			createFile();
			objectMapper.writerWithDefaultPrettyPrinter().writeValue(new FileOutputStream(file), objekti);
	    }catch(IOException e){
	        e.printStackTrace();
	    }
	}	

	private void readFromFileJSON()
	{
	    try{
	        JavaType type = objectMapper.getTypeFactory().constructCollectionType(List.class,RentaCar.class);
	        objekti = objectMapper.readValue(file, type);
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
	
	public ArrayList<RentaCar> pretrazi(String naziv, String lokacija, double ocjena) {
	    ArrayList<RentaCar> pretrazeni = new ArrayList<RentaCar>(); 
	    for (RentaCar object : objekti) {
	        boolean nameCondition = naziv == null || naziv.isEmpty() || object.getNaziv().toLowerCase().contains(naziv.toLowerCase());
	        boolean cityCondition = lokacija == null || lokacija.isEmpty() || object.getLokacija().getMjesto().toLowerCase().contains(lokacija.toLowerCase());
	        boolean vece = false;
	        if (ocjena == 0) vece = true;
	        else if (object.getOcena() > ocjena) vece = true;

	        if (nameCondition && cityCondition && vece) {
	            pretrazeni.add(object);
	        }
	    }
	    return pretrazeni;
	}

}

