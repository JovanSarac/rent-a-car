Vue.component("iznajmi-kupac", {
  data: function () {
    return {
      objekti: [],
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
      vozila: [],
      pocetniDatum: '',
      krajnjiDatum: '',
      porudzbinesaUkrstenimDatumima: []
    }
  },
  template: `
    <div>
      <kupac-menu :korisnik="korisnik"></kupac-menu>
      <div class="pretraga-container">
        <h2>Da bi ste iznajmili neko vozilo prvo morate unijeti pocetni pa krajnji datum za koji Vam je potrebno vozilo:</h2>
        <input v-model="pocetniDatum" name="pocetni" type="date" placeholder="Pocetni datum">
        <input v-model="krajnjiDatum" name="krajnji" type="date" placeholder="Krajnji datum" :disabled="!pocetniDatum" :min="pocetniDatum">       
        <button v-on:click="traziVozila" class="dugmePretrage">Traži</button>
      </div>
      
      <div vehicle-container>
	  <div v-for="vozilo in vozila" :key="vozilo.id" class="vehicle-card">
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
          <h4 class="right" v-on:click="dodajuKorpu(vozilo)">Dodaj u korpu</h4>
        </div>
      </div>
	  
	  </div>
    </div>
  `,
  mounted() {
    console.log('rest/korisnici/prijava');
    axios.get('rest/korisnici/prijava')
      .then(response => {
		  this.korisnik = response.data;
		  if(this.korisnik.korpa.pocetniDatum != null){
				this.pocetniDatum = this.korisnik.korpa.pocetniDatum;
				this.krajnjiDatum = this.korisnik.korpa.krajnjiDatum;
				/*let pocetak = document.getElementsByName('pocetni')[0];
				if(!pocetak.disabled){
			  		pocetak.disabled = true;
		  		}
		  	    let kraj = document.getElementsByName('krajnji')[0];		  
		  		if(!kraj.disabled){
			 		kraj.disabled = true;
		  		}*/
				
		
		  }
	  });
   
   
    axios
      .get("rest/objekti/")
      .then(response => {
        this.objekti = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  },
  methods: {
	  traziVozila(){
		  let uspjeh =  true;
		  
		  let pocetniDatum = document.getElementsByName("pocetni")[0];
		  pocetniDatum.style.background = "white";
		  if(!pocetniDatum.value){
				pocetniDatum.style.background = "red";
				uspjeh = false;
		  }
		  let krajnjiDatum = document.getElementsByName("krajnji")[0];
		  krajnjiDatum.style.background = "white";
		  if(!krajnjiDatum.value){
				krajnjiDatum.style.background = "red";
				uspjeh = false;
		  }
		  
		  if(uspjeh){
			  console.log("usao u if");
			  axios.get('rest/vozila/nadjiDostupnaVozila')
			  .then(response=>{
				  this.vozila = response.data;
				  for(let v of this.korisnik.korpa.vozilauKorpi){
					  this.vozila = this.vozila.filter(voz => voz.id !== v.id);
				  }
				  console.log(this.vozila);
				  
				  
				  axios.get('rest/porudzbine/nadjiPorudzbinezaIzmedjuDvaDatuma', {
					  params: {
				        pocetniDatum: this.pocetniDatum,
				        krajnjiDatum: this.krajnjiDatum,
				      }
    			  }).then(response =>{
					  this.porudzbinesaUkrstenimDatumima = response.data;
					  console.log(this.porudzbinesaUkrstenimDatumima);
					  for(let p of this.porudzbinesaUkrstenimDatumima){
						  for(let v of p.iznajmljenaVozila){
							  this.vozila = this.vozila.filter(voz => voz.id !== v.id);
						  }
					  }
				  }).catch(error=>{console.error(error);});
				  
				  
				  
			  }).catch(error=>{console.error(error);});
		  }
	  },
	  
	  dodajuKorpu : function(vozilo){
		  let pocetak = document.getElementsByName('pocetni')[0];
		  let kraj = document.getElementsByName('krajnji')[0];
		  if(!pocetak.disabled){
			  pocetak.disabled = true;
		  }		  
		  if(!kraj.disabled){
			  kraj.disabled = true;
		  }
		  this.vozila = this.vozila.filter(v => v.id !== vozilo.id); // Izbacuje vozilo iz liste
		  this.korisnik.korpa.vozilauKorpi.push(vozilo);
		  let ukupnaCijena = 0;
          for (let vozilo of this.korisnik.korpa.vozilauKorpi) {
            ukupnaCijena += vozilo.cena;
            }
          
          
          let popust = this.korisnik.vrstaKupca.procenat;
          if (popust > 0) {
          let iznosPopusta = ukupnaCijena * popust;
          let novaCijena = ukupnaCijena - iznosPopusta;
          this.korisnik.korpa.cena = novaCijena;
          }
          
          else {
			  this.korisnik.korpa.cena = ukupnaCijena;
		  }
		  this.korisnik.korpa.pocetniDatum = this.pocetniDatum;
		  this.korisnik.korpa.krajnjiDatum = this.krajnjiDatum;
		  
		  axios.put('rest/korisnici/izmjena', this.korisnik)
	      .then(response => {
			this.korisnik = response.data;
	      })
	      .catch(error => {
	        console.error(error);
	      });
	  }
 }
});
