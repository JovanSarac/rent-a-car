package dao;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Komentar;
import beans.PorudzbinaOtkaz;

public class PorudzbinaOtkazDAO {

	private List<PorudzbinaOtkaz> otkazi;
	private final ObjectMapper objectMapper;
	private final File file;

	public PorudzbinaOtkazDAO(String CtxPath){

		objectMapper = new ObjectMapper();
		otkazi = new ArrayList<PorudzbinaOtkaz>();
		
		String putanjaFajla = CtxPath + "\\resources\\Otkazi.JSON";
		System.out.println(putanjaFajla);
		file = new File(putanjaFajla);

		readFromFileJSON();
	}
	
	public PorudzbinaOtkaz Sacuvaj(PorudzbinaOtkaz k){
        otkazi.add(k);
        writeToFileJSON();
        return k;
    }   
	
    
    public List<PorudzbinaOtkaz> nadjiSveOtkaze() {
        return otkazi;
    }

	private void writeToFileJSON()
	{
		System.out.println("Pocetak pisanja u fajl");
		try {
			createFile();
			objectMapper.writerWithDefaultPrettyPrinter().writeValue(new FileOutputStream(file), otkazi);
	    }catch(IOException e){
	        e.printStackTrace();
	    }
	}	

	private void readFromFileJSON()
	{
	    try{
	        JavaType type = objectMapper.getTypeFactory().constructCollectionType(List.class,PorudzbinaOtkaz.class);
	        otkazi = objectMapper.readValue(file, type);
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
