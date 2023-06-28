package dao;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.PorudzbinaStanje;

public class PorudzbinaStanjeDAO {
	private List<PorudzbinaStanje> porudzbine;
	private final ObjectMapper objectMapper;
	private final File file;

	public PorudzbinaStanjeDAO(String CtxPath){

		objectMapper = new ObjectMapper();
		porudzbine = new ArrayList<PorudzbinaStanje>();
		
		String putanjaFajla = CtxPath + "\\resources\\PorudzbinaStanje.JSON";
		System.out.println(putanjaFajla);
		file = new File(putanjaFajla);

		readFromFileJSON();
	}
	
	public PorudzbinaStanje Sacuvaj(PorudzbinaStanje ps){
        porudzbine.add(ps);
        writeToFileJSON();
        return ps;
    }   
	
	 public boolean izmeniStanjePorudzbine(PorudzbinaStanje p) {
		 	PorudzbinaStanje stara = nadjiStanjePorudzbine(p.getPorudzbinaId(),p.getRentaCarId());
	    	int index = porudzbine.indexOf(stara);
	    	stara = p;
	    	porudzbine.set(index,stara);
	    	writeToFileJSON();
			return true;
	 }

    
    /*public PorudzbinaStanje nadjiPorudzbinu(String porudzbinaId,String rentaCarId) {
    	for(PorudzbinaStanje p : porudzbine) {
    		if(p.getPorudzbinaId().equals(porudzbinaId) ) {
    			return p;
    		}
    	}
    	return null;
    }*/
    
    public List<PorudzbinaStanje> nadjiSvePorudzbine() {
        return porudzbine;
    }
    
    public List<PorudzbinaStanje> nadjiSvePorudzbinezaRentaCar(String objekatId){
    	ArrayList<PorudzbinaStanje> por = new ArrayList<PorudzbinaStanje>();
    	for(PorudzbinaStanje p : porudzbine) {
    		if(p.getRentaCarId().equals(objekatId)) {
    			por.add(p);
    		}
    	}
    	return por;
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
	        JavaType type = objectMapper.getTypeFactory().constructCollectionType(List.class,PorudzbinaStanje.class);
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

	public PorudzbinaStanje nadjiStanjePorudzbine(String porudzbinaId, String objekatId) {
		for(PorudzbinaStanje p : porudzbine) {
    		if(p.getPorudzbinaId().equals(porudzbinaId) && p.getRentaCarId().equals(objekatId)) {
    			return p;
    		}
    	}
    	return null;
		
	}

	public ArrayList<PorudzbinaStanje> nadjiPorudzbineSpramidPorudzbine(String porudzbinaId) {
		ArrayList<PorudzbinaStanje> por = new ArrayList<PorudzbinaStanje>();
		for(PorudzbinaStanje p : porudzbine) {
    		if(p.getPorudzbinaId().equals(porudzbinaId) ) {
    			por.add(p);
    		}
    	}
		return por;
	}
}
