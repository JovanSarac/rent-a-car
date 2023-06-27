package dao;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Porudzbina;

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
}
