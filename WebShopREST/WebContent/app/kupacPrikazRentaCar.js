Vue.component("show-rentacar-kupac", {
	data: function () {
		    return {
				 korisnik: { id: null, korisnickoIme: null, lozinka: null, ime: null, prezime: null, uloga: null, pol: null, datumRodjenja: null, vrstaKupca: null },
				 objekat: { id: null, naziv: null, vozila: [], radnoVremeOd: null, radnoVremeDo: null, status: null, lokacija:null, logoUrl: null, ocena: null, menadzer: null},
				 status:null,
				 komentari: []
				 
			}
	},
	template: `
	 <div>
      <kupac-menu :korisnik="korisnik"></kupac-menu>
      <p v-on:click="BackClick" style="text-decoration: underline; color: #3498db; cursor: pointer;">Vrati se nazad na prikaz svih rent a car objekata</p>
      <h1>Prikaz rent a car objekta</h1>

      <div class="rentacar-comments-container">
        <div class="rentacar-container">
          <img class="logo" :src="objekat.logoUrl" alt="Logo Rent-a-Car objekta">
          <div class="rentacar-details">
            <h2>{{ objekat.naziv }}</h2>
            <p>Lokacija: {{objekat.lokacija.ulica}} {{objekat.lokacija.broj}}, {{objekat.lokacija.mjesto}} {{objekat.lokacija.postanskiBroj}}</p>
            <p>Koordinate: {{ objekat.lokacija.geografskaDuzina }}, {{objekat.lokacija.geografskaSirina}}</p>
            <p>Ocjena: {{ objekat.ocena }}</p>
            <p>Radno vrijeme: {{ objekat.radnoVremeOd }} - {{ objekat.radnoVremeDo }}</p>
            <p>Menadzer: {{ objekat.menadzer.ime }} {{ objekat.menadzer.prezime }}</p>
            <p>Status: {{ status }}</p>
            <h4>{{ objekat.ocena }}</h4>
          </div>
        </div>

        <div class="comments-container" v-if="komentari.length > 0">
          <h1>Komentari</h1>
           <div v-for="komentar in komentari" :key="komentar.id" class="comment-card">
          <p class="comment-user">Korisnik: {{ komentar.korisnickoIme }}</p>
          <p class="comment-text">Ostavljen komentar: {{ komentar.komentar }}</p>
          <p class="comment-rating">Ocjena: {{ komentar.ocjena }}</p>
        </div>
        </div>
      </div>

      <h1 class="vehicle-title">Vozila koja su u ponudi:</h1>
      <div vehicle-container>
        <div v-for="vozilo in objekat.vozila" :key="vozilo.id" class="vehicle-card">
          <img :src="vozilo.slika" class="vehicle-image">
          <div class="vehicle-details">
            <h3 class="markaimodelVozila">{{ vozilo.marka }} {{vozilo.model}}</h3>
            <p>-Tip vozila: {{ vozilo.tipVozila }} </p>
            <p>-Vrsta mjenjaca: {{ vozilo.vrsta }}</p>
            <p>-Tip goriva: {{ vozilo.tipGoriva }}</p>
            <p>-Opis vozila: {{ vozilo.opis }}</p>
            <p>-Broj vrata: {{ vozilo.brojVrata }}; Broj osoba:{{ vozilo.brojOsoba }}</p>
            <h4 class="right"> {{ vozilo.cena }} €</h4>
          </div>
        </div>
      </div>
    </div>
`,
	mounted(){
		
		axios.get('rest/korisnici/prijava')
		.then(response=>{
			this.korisnik = response.data;
		}).catch((error) => {console.error(error);});
		
		const objekatId = this.$route.params.objekatId;
		console.log(objekatId);
		
		axios.get('rest/komentari/' + objekatId)
              .then(response => {
               this.komentari = response.data.filter(komentar => komentar.odobreno);
              })
              .catch(error => {
                console.error(error);
              });
		
		axios.get('rest/objekti/nadjiRentaCarpoIdu/' + objekatId)
		.then(response=>{
			this.objekat = response.data;
			if(this.objekat.status === true){
				this.status = "Radi";
			}else{
				this.status = "Ne radi"
			}
			console.log(this.objekat);
		})
	    
	 	    
    },
		
	methods : {		
	BackClick(){
		this.$router.push('/pocetna-kupac');
	},
	
			
	}
});