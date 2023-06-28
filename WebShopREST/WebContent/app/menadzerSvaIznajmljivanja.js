Vue.component("iznajmljivanja-menadzer", {
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
        korpa: {
          vozilauKorpi: [],
          vlasnikKorpeId: null,
          cena: null,
          pocetniDatum: null,
          krajnjiDatum: null
        }
      },
      objekat: { 
		  id: null, 
		  naziv: null, 
		  vozila: [], 
		  radnoVremeOd: null, 
		  radnoVremeDo: null, 
		  status: null, 
		  lokacija:null, 
		  logoUrl: null, 
		  ocena: null, 
		  menadzer: null
	  },
      porudzbine: [],
      danasnjiDatum : null,
      porudzbinaStanje: {
		  porudzbinaId : null,
		  rentaCarId : null,
		  statusPorudzbine : null
	  },
	  svaStanjaPorudzbina :[]
    };
  },
  template: `
    <div>
      <menadzer-menu :korisnik="korisnik"></menadzer-menu>
      <div class="porudzbine-container">
        <h2>Prikaz porudžbina za Vas <i>{{objekat.naziv}}</i> objekat:</h2>
        <div v-for="porudzbina in porudzbine" :key="porudzbina.idNarudzbe" class="porudzbina-card">
          <h3 class="narudzba-id">Narudžba ID: {{ porudzbina.idNarudzbe }}</h3>
          <h4> {{porudzbina.datumIznajmljivanja}}  :  {{porudzbina.datumVracanja}}</h4>
          <h4> Status narudzbe vezano za vozila iz vaseg objekta: <i> {{svaStanjaPorudzbina.find(p => p.porudzbinaId === porudzbina.idNarudzbe)?.statusPorudzbine}} </i>. Vozila iz vaseg rent a car objekta:</h4>
          <div v-for="vozilo in porudzbina.iznajmljenaVozila" v-if="vozilo.objekatId === objekat.id"  :key="vozilo.id" class="vozilo-card">
            <div class="vozilo-image">
              <img :src="vozilo.slika" alt="Vozilo slika" />
            </div>
            <div class="vozilo-info">
              <p class="marka-model">Marka: {{ vozilo.marka }}  </p>
              <p class="marka-model">Model: {{ vozilo.model }}</p>
              <p class="marka-model">Cena: {{ vozilo.cena }}</p>
            </div>
          </div>
          <p class="cena-narudzbe">Ukupna cena narudžbe: {{ porudzbina.cena }} €</p>
          <p class="status-narudzbe">Status cjelokupne narudžbe: {{ porudzbina.status }}</p>
          <div v-if="porudzbina.status != 'Otkazano'">
	          <button v-on:click="potvrdiNarudzbinu(porudzbina)" class="buttonAddVehicle" style="font-size: 13px; padding: 12px 24px;" v-bind:disabled="svaStanjaPorudzbina.find(p => p.porudzbinaId === porudzbina.idNarudzbe)?.statusPorudzbine === 'Odbijeno' || svaStanjaPorudzbina.find(p => p.porudzbinaId === porudzbina.idNarudzbe)?.statusPorudzbine === 'Preuzeto' || svaStanjaPorudzbina.find(p => p.porudzbinaId === porudzbina.idNarudzbe)?.statusPorudzbine === 'Vraceno' || svaStanjaPorudzbina.find(p => p.porudzbinaId === porudzbina.idNarudzbe)?.statusPorudzbine === 'Odobreno'">Odobri</button>
			  <button class="buttonAddVehicle" style="font-size: 13px; padding: 12px 24px;" v-bind:disabled="svaStanjaPorudzbina.find(p => p.porudzbinaId === porudzbina.idNarudzbe)?.statusPorudzbine === 'Odbijeno' || svaStanjaPorudzbina.find(p => p.porudzbinaId === porudzbina.idNarudzbe)?.statusPorudzbine === 'Preuzeto' || svaStanjaPorudzbina.find(p => p.porudzbinaId === porudzbina.idNarudzbe)?.statusPorudzbine === 'Vraceno' || svaStanjaPorudzbina.find(p => p.porudzbinaId === porudzbina.idNarudzbe)?.statusPorudzbine === 'Odobreno'">Odbij</button>
			  <button class="buttonAddVehicle" style="font-size: 13px; padding: 12px 24px;"  v-bind:disabled="!(porudzbina.datumIznajmljivanja === danasnjiDatum  && svaStanjaPorudzbina.find(p => p.porudzbinaId === porudzbina.idNarudzbe)?.statusPorudzbine === 'Odobreno' && porudzbina.status === 'Odobreno')">Preuzeto</button>
			  <button class="buttonAddVehicle" style="font-size: 13px; padding: 12px 24px;" v-bind:disabled="!(svaStanjaPorudzbina.find(p => p.porudzbinaId === porudzbina.idNarudzbe)?.statusPorudzbine === 'Preuzeto')">Vraceno</button>
	      </div>
        </div>
      </div>
    </div>
  `,
  mounted() {
    axios.get('rest/korisnici/prijava')
		.then(response=>{
			this.korisnik = response.data;
		axios.get('rest/objekti/nadjiMenadzerov', {
			params:{
				korisnikId: this.korisnik.id
			}
		})
		.then(response=>{
			this.objekat = response.data;
			axios.get('rest/porudzbine/nadjiPorudzbinezaRentaCar/' + this.objekat.id)
			.then(response => {
				//ucitam porudzbine za menadzera preko objekta u kom je on menadzer
				this.porudzbine = response.data;
				
				
			 	let danasnjiDatum = new Date();
				let godina = danasnjiDatum.getFullYear();
				let mjesec = String(danasnjiDatum.getMonth() + 1).padStart(2, '0');
				let dan = String(danasnjiDatum.getDate()).padStart(2, '0');				
				this.danasnjiDatum = `${godina}-${mjesec}-${dan}`;
				
				axios.get('rest/porudzbinestanje/nadjisvaStanjaPorudzbinazaRentAcar/' + this.objekat.id)
		    	.then(response =>{
					this.svaStanjaPorudzbina = response.data;
				});

			}).catch((error) =>{console.error(error);});
		})
		})
    .catch((error) => {
      console.error(error);
    });
  },
  methods: {
    potvrdiNarudzbinu(porudzbina) {
		axios
	    .get("rest/porudzbinestanje/nadjiPorudzbinuStanje", {
	      params: {
	        porudzbinaId: porudzbina.idNarudzbe,
	        objekatId: this.objekat.id
	      }
    	}).then(response =>{
			this.porudzbinaStanje = response.data;
			console.log(this.porudzbinaStanje);
			this.porudzbinaStanje.statusPorudzbine = 'Odobreno';
			
			axios.put('rest/porudzbinestanje/izmenistanjeporudzbine',this.porudzbinaStanje)
				.then(response => {
				if(response.data === true){
					console.log("uspjesno ste izmjenili stanje kod porudzbinaStanje u odobreno");
					
					axios.get('rest/porudzbinestanje/nadjiPorudzbinuStanja/' + porudzbina.idNarudzbe)
					.then(response =>{
						let porudz = response.data;
						let br = 0;
						console.log(porudz);
						for(let p of porudz){
							if(p.statusPorudzbine === 'Odobreno'){
								br++;
							}
						}
						console.log(br);
						console.log(porudzbina.rentaCarIds.length);
						if(br === porudzbina.rentaCarIds.length){
							porudzbina.status = 'Odobreno';
							axios.put('rest/porudzbine/izmeniporudzbinu', porudzbina)
							.then(response =>{
								if(response.data===true){
									console.log("uspjesno promjenjen status porudzbine u Odobreno");
								}
							});
						}else{
							console.log("nije jos vrijeme za promjenu,ima jos neprihvacenih dijelova.");
						}
					})
					
					axios.get('rest/porudzbinestanje/nadjisvaStanjaPorudzbinazaRentAcar/' + this.objekat.id)
		    		.then(response =>{
					this.svaStanjaPorudzbina = response.data;
				});
				}else{
					console.log("niste promjenili stanje u odobreno");
				}
			  });

		});
		
	}
  }
  
});