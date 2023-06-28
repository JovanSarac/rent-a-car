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
		 	PorudzbinaStanje stara = nadjiPorudzbinu(p.getPorudzbinaId());
	    	int index = porudzbine.indexOf(stara);
	    	stara = p;
	    	porudzbine.set(index,stara);
	    	writeToFileJSON();
			return true;
	    }

    
    public PorudzbinaStanje nadjiPorudzbinu(String id) {
    	for(PorudzbinaStanje p : porudzbine) {
    		if(p.getPorudzbinaId().equals(id)) {
    			return p;
    		}
    	}
    	return null;
    }
    
    public List<PorudzbinaStanje> nadjiSvePorudzbine() {
        return porudzbine;
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
}
