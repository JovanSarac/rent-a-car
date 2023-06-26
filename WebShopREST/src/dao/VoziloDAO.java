package dao;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;


import beans.Vozilo;

public class VoziloDAO {
	private List<Vozilo> vozila;
	private final ObjectMapper objectMapper;
	private final File file;
	
	public VoziloDAO(String CtxPath){

		objectMapper = new ObjectMapper();
		vozila = new ArrayList<Vozilo>();
		
		String putanjaFajla = CtxPath + "\\resources\\Vozila.JSON";
		System.out.println(putanjaFajla);
		file = new File(putanjaFajla);

		readFromFileJSON();
	}
	
	public Vozilo Sacuvaj(Vozilo vozilo){
		System.out.println("Usao u cuvanje");

        vozilo.setId(nextId().toString());
        System.out.println(vozilo.getId());
        //vozilo.setObjekat(objekat.getId());
        vozila.add(vozilo);
        System.out.println("odradjeno dodvanje u listu vozila");
        writeToFileJSON();
        return vozilo;
    }
	
	 public List<Vozilo> nadjiSvaVozila() {
	        return vozila;
	 }
	 
	 public Vozilo nadjiVozilopoId(String id) {
	    	for(Vozilo v : vozila) {
	    		if(v.getId().equals(id)) {
	    			return v;
	    		}
	    	}
	    	return null;
	 }
	 
	 private Integer nextId(){
			return vozila.size()+1;
	}
	 
	 public String nadjiIdPoslednjegVozila() {
		 System.out.println(vozila.get(vozila.size()-1).getId());
		 return vozila.get(vozila.size()-1).getId();
	 }
	 
	 public boolean izmeniVozilo(Vozilo novoVozilo) {
	    	Vozilo staroVozilo = nadjiVozilopoId(novoVozilo.getId());
	    	int index = vozila.indexOf(staroVozilo);
	    	System.out.println(staroVozilo);
	    	System.out.println(novoVozilo);
	    	staroVozilo = novoVozilo;
	    	vozila.set(index,staroVozilo);
	    	writeToFileJSON();
			return true;
	 	
	    }

	private void writeToFileJSON()
	{
		System.out.println("Pocetak pisanja u fajl");
		try {
			createFile();
			objectMapper.writerWithDefaultPrettyPrinter().writeValue(new FileOutputStream(file), vozila);
		}catch(IOException e){
		    e.printStackTrace();
		}
	}	

	private void readFromFileJSON()
	{
		try{
		    JavaType type = objectMapper.getTypeFactory().constructCollectionType(List.class,Vozilo.class);
		    vozila = objectMapper.readValue(file, type);
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
