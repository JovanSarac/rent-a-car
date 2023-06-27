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
		  vrstaKupca: null,
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
		   datumIznajmljivanja: null,
		   datumVracanja: null,
		   cena: null,
		   kupacId: null,
		   status: 'Obrada'
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
	  <button v-on:click="poruci()">Poruci</button>
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
		  this.korisnik.korpa.cena -= vozilo.cena; 
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
			  axios
	          .post("rest/porudzbine/registruj", this.Porudzbina)
	    	  .then((response) => {                                            
	        
	                    if (response.data === true) {
	      					toast('Uspijesna porudzbina');
	   				    }else{
							toast('Neuspijesna porudzbina ')
						}
						
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
							
			   }).catch(error => {
	                        console.error(error);
	           });
          }
	  }
	   
 }
});
