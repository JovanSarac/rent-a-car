Vue.component("korpa-kupac", {
  data: function () {
    return {
      korisnik: { 
		  id: null, 
		  korisnickoIme: null, 
		  lozinka: null, 
		  ime: null, 
		  prezime: null, 
		  uloga: null, 
		  pol: null, 
		  datumRodjenja: null, 
		  vrstaKupca: { tipKupca: 'Bronzani', procenat: 0, brojBodova: 0},
		  korpa :{
				vozilauKorpi:[],
				vlasnikKorpeId: null,
				cena: null,
				pocetniDatum : null,
				krajnjiDatum : null
		  }
	  },
	   Porudzbina: {
		   idNarudzbe: null,
		   iznajmljenaVozila: [],
		   rentaCarIds: [],
		   datumIznajmljivanja: null,
		   datumVracanja: null,
		   cena: null,
		   kupacId: null,
		   status: 'Obrada'
	   },
	   porudzbinaStanje: {
		   porudzbinaId : null,
		   rentaCarId : null,
		   statusPorudzbine: 'Obrada',
		   razlogOdbijanja : null
	   }
      
    }
  },
  template: `
    <div>
      <kupac-menu :korisnik="korisnik"></kupac-menu>
      
      <div vehicle-container>
      <h2>Prikaz stanja vase korpe:</h2>
	  <div v-for="vozilo in korisnik.korpa.vozilauKorpi" :key="vozilo.id" class="vehicle-card">
        <img :src="vozilo.slika" class="vehicle-image">
        <div class="vehicle-details">
          <h3 class="markaimodelVozila">{{ vozilo.marka }} {{vozilo.model}}</h3>
          <p>-Tip vozila: {{ vozilo.tipVozila }} </p>
          <p>-Vrsta mjenjaca: {{ vozilo.vrsta }}</p>
          <p>-Tip goriva: {{ vozilo.tipGoriva }}</p>
          <p>-Potrosnja: {{ vozilo.potrosnja }}
          <p>-Opis vozila: {{ vozilo.opis }}</p>
          <p>-Broj vrata: {{ vozilo.brojVrata }}; Broj osoba:{{ vozilo.brojOsoba }}</p>
          <h3>-Cena: {{ vozilo.cena }} €</h3>
          <h4 class="right" v-on:click="IzbaciizKorpe(vozilo)">Izbaci iz korpe</h4>
        </div>
      </div>
	  <h3>Ukupna cena porudzbine je: {{ korisnik.korpa.cena }} €</h3>
	  <button v-on:click="poruci()" class="buttonAddVehicle" style="font-size: 18px; padding: 12px 24px;" >Poruči</button>
	  </div>
	  
    </div>
  `,
  mounted() {
    console.log('rest/korisnici/prijava');
    axios.get('rest/korisnici/prijava')
      .then(response => (this.korisnik = response.data));
      
    
  },
  methods: {
	  IzbaciizKorpe : function(vozilo){
		  this.korisnik.korpa.vozilauKorpi = this.korisnik.korpa.vozilauKorpi.filter(v => v.id !== vozilo.id); // Izbacuje vozilo iz liste
		  let novaUkupnaCijena = 0;
          for (let v of this.korisnik.korpa.vozilauKorpi) {
          novaUkupnaCijena += v.cena;
           } 
           
          let popust = this.korisnik.vrstaKupca.procenat;
          if (popust > 0) {
          let iznosPopusta = novaUkupnaCijena * popust;
          let novaCijena = novaUkupnaCijena - iznosPopusta;
          this.korisnik.korpa.cena = novaCijena;
          }
          
          else {
			  this.korisnik.korpa.cena = novaUkupnaCijena;
		  } 
		  console.log(this.korisnik.korpa.vozilauKorpi);
		  if(this.korisnik.korpa.vozilauKorpi.length === 0){
			  this.korisnik.korpa.pocetniDatum = null;
			  this.korisnik.korpa.krajnjiDatum = null;
		  }
		  axios.put('rest/korisnici/izmjena', this.korisnik)
	      .then(response => {
			this.korisnik = response.data;
	      })
	      .catch(error => {
	        console.error(error);
	      });
	  },
	  poruci() {

           this.Porudzbina.iznajmljenaVozila = this.korisnik.korpa.vozilauKorpi;
           this.Porudzbina.datumIznajmljivanja = this.korisnik.korpa.pocetniDatum;
           this.Porudzbina.datumVracanja = this.korisnik.korpa.krajnjiDatum;
           this.Porudzbina.cena = this.korisnik.korpa.cena;
           this.Porudzbina.kupacId = this.korisnik.id;
           
           
          
          if(this.Porudzbina.iznajmljenaVozila.length != 0){
			  for(let v of this.korisnik.korpa.vozilauKorpi){
				  if (!this.Porudzbina.rentaCarIds.includes(v.objekatId)) {
				    this.Porudzbina.rentaCarIds.push(v.objekatId);
				  }
			  }
			  axios
	          .post("rest/porudzbine/registruj", this.Porudzbina)
	    	  .then((response) => {                                            
	        
	                    if (response.data === true) {
	      					toast('Uspijesna porudzbina');
	      					
	      					
	      					axios.get('rest/porudzbine/nadjiIdPorudzbine')
	      					.then(response => {
								  if(response.data!=null){
									  //pronalazak i postavljanje prvo id porudzbine
									  this.porudzbinaStanje.porudzbinaId = response.data;
									  
									  //prolazak kroz rentaCarIds i kreiranje toliko stanja porudzbina
									  for(let rentacar of this.Porudzbina.rentaCarIds){
										  let porudzbinaStanje = {}; // Stvaranje nove instance porudzbinaStanje unutar petlje
										  porudzbinaStanje.porudzbinaId = this.porudzbinaStanje.porudzbinaId;
										  porudzbinaStanje.statusPorudzbine = "Obrada";
										  porudzbinaStanje.rentaCarId = rentacar;
										  axios.post('rest/porudzbinestanje/registruj',porudzbinaStanje)
										  .then(response => {
											  if(response.data === true){
												  console.log("Uspjesno registrovano stanje porudzbine.");
											  }
										  }).catch(error => {console.error(error);});
									  }
								  }
							  })
	      					
	      					
	      					const ukupnaCena = this.Porudzbina.cena;
                            const brojBodova = ukupnaCena / 1000 * 133;
                            axios.put(`rest/korisnici/azurirajBodove/` + brojBodova)
                           .then((response) => {
							  this.korisnik = response.data; 
                             this.korisnik.korpa.vozilauKorpi = [];
						    this.korisnik.korpa.pocetniDatum = null;
						    this.korisnik.korpa.krajnjiDatum = null;
						    this.korisnik.korpa.cena = 0;
					      
                             
                             
                             axios.put('rest/korisnici/izmjena', this.korisnik)
					      .then(response => {
							this.korisnik = response.data;
					      })
					      .catch(error => {
					        console.error(error);
					      });
                              })
                          .catch((error) => {
                           console.error(error);
                           });
	   				    }else{
							toast('Neuspijesna porudzbina ')
						}
					     
							
			   }).catch(error => {
	                        console.error(error);
	           });
	           
	           
          }
	  }
	   
 }
});
