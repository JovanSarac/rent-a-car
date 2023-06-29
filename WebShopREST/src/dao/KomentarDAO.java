package dao;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Komentar;
import beans.Lokacija;
import beans.RentaCar;

public class KomentarDAO {
	private List<Komentar> komentari;
	private final ObjectMapper objectMapper;
	private final File file;

	public KomentarDAO(String CtxPath){

		objectMapper = new ObjectMapper();
		komentari = new ArrayList<Komentar>();
		
		String putanjaFajla = CtxPath + "\\resources\\Komentari.JSON";
		System.out.println(putanjaFajla);
		file = new File(putanjaFajla);

		readFromFileJSON();
	}
	
	public Komentar Sacuvaj(Komentar k){

        k.setId(nextId().toString());
        System.out.println(k.getId());
        komentari.add(k);
        writeToFileJSON();
        return k;
    }   

 
    public Komentar nadjiKomentar(String id) {
    	for(Komentar k : komentari) {
    		if(k.getId().equals(id)) {
    			return k;
    		}
    	}
    	return null;
    }
    
    public List<Komentar> nadjiSveKomentare() {
        return komentari;
    }
    
    
    public boolean IzmeniKomentar(Komentar k) {
    	Komentar kk = nadjiKomentar(k.getId());
    	int index = komentari.indexOf(kk);
    	System.out.println(kk);
    	System.out.println(k);
    	kk = k;
    	komentari.set(index,kk);
    	writeToFileJSON();
		return true;
 	
    }
    

	private Integer nextId(){
		return komentari.size()+1;
	}

	private void writeToFileJSON()
	{
		System.out.println("Pocetak pisanja u fajl");
		try {
			createFile();
			objectMapper.writerWithDefaultPrettyPrinter().writeValue(new FileOutputStream(file), komentari);
	    }catch(IOException e){
	        e.printStackTrace();
	    }
	}	

	private void readFromFileJSON()
	{
	    try{
	        JavaType type = objectMapper.getTypeFactory().constructCollectionType(List.class,Komentar.class);
	        komentari = objectMapper.readValue(file, type);
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
	
	public boolean ProvjeriJelKomentarisano(String kupacId, String objekatId) {
		for (Komentar k : komentari) {
			System.out.println("nadjen id od kupca je: " + kupacId + " a nadjen id od rentacar je: " + objekatId);
			if (k.getKupacId().equals(kupacId) && k.getRentacarId().equals(objekatId)) {
				System.out.println("vec komentarisao");
				return true;
			}
		}
		System.out.println("nije komentarisao, znaci da moze da komentarise");
		return false;
	}
	
}

