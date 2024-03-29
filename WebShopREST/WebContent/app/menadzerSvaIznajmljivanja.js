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
		  statusPorudzbine : null,
		  razlogOdbijanja : null
	  },
	  svaStanjaPorudzbina :[],
	  razlogOdbijanja:null,
      cenaOd: 0,
      cenaDo: 0,
      datumOd: '',
      datumDo: '',
      sortiranjeKriterijum : '',
      strelica : "&#8595;"
    };
  },
  template: `
    <div>
      <menadzer-menu :korisnik="korisnik"></menadzer-menu>
      <div class="pretragaiznajmljivanja-container">
	    
	    <div class="cena">
		    <label for="cena_od">Cena (od):</label>
		    <input v-model="cenaOd" type="number" id="cena_od" name="cena_od" placeholder="Unesite minimalnu cenu"><br><br>
		    <label for="cena_do">Cena (do):</label>
		    <input v-model="cenaDo" type="number" id="cena_do" name="cena_do" placeholder="Unesite maksimalnu cenu"><br><br>
	    </div>
	    
	    <div class="datumi">
		    <label for="datum_od">Datum iznajmljivanja (od):</label>
		    <input v-model="datumOd" type="date" id="datum_od" name="datum_od"><br><br>
		    
		    <label for="datum_do">Datum iznajmljivanja (do):</label>
		    <input v-model="datumDo" type="date" id="datum_do" name="datum_do"><br><br>
	    </div>
	    
	    <div class="sortiranja">
	        <button v-on:click="dugmeZaPromjenuSortiranja"><span id="strelica" v-html="strelica"></span></button>
	        <select v-model="sortiranjeKriterijum" >
	          <option value="" disabled selected>Sortiraj po parametru</option>
	          <option value="cena">Ceni</option>
	          <option value="datum">Datumu iznajmljivanja</option>
	  		</select>
  		</div>
        <button v-on:click="pretraziIznajmljivanja">Traži</button>
      </div>
      
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
	          <button :id="'potvrdi-'+ porudzbina.idNarudzbe" v-on:click="potvrdiNarudzbinu(porudzbina)" class="buttonAddVehicle" style="font-size: 13px; padding: 12px 24px;" v-bind:disabled="svaStanjaPorudzbina.find(p => p.porudzbinaId === porudzbina.idNarudzbe)?.statusPorudzbine === 'Odbijeno' || svaStanjaPorudzbina.find(p => p.porudzbinaId === porudzbina.idNarudzbe)?.statusPorudzbine === 'Preuzeto' || svaStanjaPorudzbina.find(p => p.porudzbinaId === porudzbina.idNarudzbe)?.statusPorudzbine === 'Vraceno' || svaStanjaPorudzbina.find(p => p.porudzbinaId === porudzbina.idNarudzbe)?.statusPorudzbine === 'Odobreno'">Odobri</button>
			  <button :id="'odbij-'+ porudzbina.idNarudzbe" v-on:click="prikaziOdbijenicu(porudzbina)" class="buttonAddVehicle" style="font-size: 13px; padding: 12px 24px;" v-bind:disabled="svaStanjaPorudzbina.find(p => p.porudzbinaId === porudzbina.idNarudzbe)?.statusPorudzbine === 'Odbijeno' || svaStanjaPorudzbina.find(p => p.porudzbinaId === porudzbina.idNarudzbe)?.statusPorudzbine === 'Preuzeto' || svaStanjaPorudzbina.find(p => p.porudzbinaId === porudzbina.idNarudzbe)?.statusPorudzbine === 'Vraceno' || svaStanjaPorudzbina.find(p => p.porudzbinaId === porudzbina.idNarudzbe)?.statusPorudzbine === 'Odobreno'">Odbij</button>
			  <button v-on:click="preuzmiNarudzbinu(porudzbina)" class="buttonAddVehicle" style="font-size: 13px; padding: 12px 24px;"  v-bind:disabled="!(new Date(porudzbina.datumIznajmljivanja) <= new Date()  && svaStanjaPorudzbina.find(p => p.porudzbinaId === porudzbina.idNarudzbe)?.statusPorudzbine === 'Odobreno' && porudzbina.status === 'Odobreno')">Preuzeto</button>
			  <button v-on:click="vratiNarudzbinu(porudzbina)" class="buttonAddVehicle" style="font-size: 13px; padding: 12px 24px;" v-bind:disabled="!(svaStanjaPorudzbina.find(p => p.porudzbinaId === porudzbina.idNarudzbe)?.statusPorudzbine === 'Preuzeto' && porudzbina.status === 'Preuzeto')">Vraceno</button>
			  <div :id="'porudzbina-' + porudzbina.idNarudzbe" hidden="true" style=" border: 1px solid #ccc; border-radius: 5px; padding: 10px;margin-bottom: 10px; width:500px;">
			  	  <button v-on:click="skloniOdbijenicu(porudzbina)"><span>x</span></button>
				  <p>Morate napisati razlog odbijanja:</p>
				  <textarea :id="'textarea-' + porudzbina.idNarudzbe" style="width:300px ; height:150px" v-model="razlogOdbijanja"></textarea>
				  <button v-on:click="odbij(porudzbina)" class="buttonAddVehicle" style="font-size: 13px; padding: 12px 24px;">Odbij</button>
			  </div>
			  
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
				
				//console.log(new Date(this.danasnjiDatum));
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
		
	},
	
	prikaziOdbijenicu(porudzbina){
		let odbijenica = document.getElementById('porudzbina-' + porudzbina.idNarudzbe);
		odbijenica.hidden = false;
		let dugmePotvrda = document.getElementById('potvrdi-'+ porudzbina.idNarudzbe);
		dugmePotvrda.disabled = true;
		let dugmeOdbij = document.getElementById('odbij-'+ porudzbina.idNarudzbe);
		dugmeOdbij.disabled = true;		
	},
	skloniOdbijenicu(porudzbina){
		let odbijenica = document.getElementById('porudzbina-' + porudzbina.idNarudzbe);
		odbijenica.hidden = true;
		let dugmePotvrda = document.getElementById('potvrdi-'+ porudzbina.idNarudzbe);
		dugmePotvrda.disabled = false;
		let dugmeOdbij = document.getElementById('odbij-'+ porudzbina.idNarudzbe);
		dugmeOdbij.disabled = false;
	},
	
	
	odbij(porudzbina){		
		if(this.razlogOdbijanja === null){
			let textarea = document.getElementById('textarea-' + porudzbina.idNarudzbe);
			textarea.style.background = "red";
		}else{
			let textarea = document.getElementById('textarea-' + porudzbina.idNarudzbe);
			textarea.style.background = "white";
			porudzbina.status = 'Odbijeno';
			axios.put('rest/porudzbine/izmeniporudzbinu', porudzbina)
			.then(response =>{
				if(response.data===true){
					console.log("uspjesno promjenjen status porudzbine u Odbijeno");
					
					axios.get('rest/porudzbinestanje/nadjiPorudzbinuStanja/' + porudzbina.idNarudzbe)
					.then(response =>{
							let porudz = response.data;
							
							console.log(porudz);
							for(let p of porudz){
								p.statusPorudzbine = 'Odbijeno';
								p.razlogOdbijanja = this.razlogOdbijanja;
								axios.put('rest/porudzbinestanje/izmenistanjeporudzbine',p)
								.then(response => {
									if(response.data === true){
										console.log("uspjesno ste izmjenili stanje kod porudzbinaStanje u odobreno ");
									}
								});
							}
							
							axios.get('rest/porudzbinestanje/nadjisvaStanjaPorudzbinazaRentAcar/' + this.objekat.id)
							.then(response =>{
								this.svaStanjaPorudzbina = response.data;
							});
							
							let odbijenica = document.getElementById('porudzbina-' + porudzbina.idNarudzbe);
							odbijenica.hidden = true;
							
					});
				}
			});
		
		}
		
	},
	
	preuzmiNarudzbinu(porudzbina){
		axios
	    .get("rest/porudzbinestanje/nadjiPorudzbinuStanje", {
	      params: {
	        porudzbinaId: porudzbina.idNarudzbe,
	        objekatId: this.objekat.id
	      }
    	}).then(response =>{
			this.porudzbinaStanje = response.data;
			console.log(this.porudzbinaStanje);
			this.porudzbinaStanje.statusPorudzbine = 'Preuzeto';
			
			axios.put('rest/porudzbinestanje/izmenistanjeporudzbine',this.porudzbinaStanje)
				.then(response => {
				if(response.data === true){
					console.log("uspjesno ste izmjenili stanje kod porudzbinaStanje u preuzeto");
					
					axios.get('rest/porudzbinestanje/nadjiPorudzbinuStanja/' + porudzbina.idNarudzbe)
					.then(response =>{
						let porudz = response.data;
						let br = 0;
						console.log(porudz);
						for(let p of porudz){
							if(p.statusPorudzbine === 'Preuzeto'){
								br++;
							}
						}

						if(br === porudzbina.rentaCarIds.length){
							porudzbina.status = 'Preuzeto';
							for(let v of porudzbina.iznajmljenaVozila){
								v.status = 'Iznajmljeno';
								axios.post('rest/vozila/izmenivozilo',v);
							}
							axios.put('rest/porudzbine/izmeniporudzbinu', porudzbina)
							.then(response =>{
								if(response.data===true){
									console.log("uspjesno promjenjen status porudzbine u Preuzeto");
									
								}
							});
						}else{
							console.log("nije jos vrijeme za promjenu,ima jos nepreuzetih dijelova.");
						}
					})
					
					axios.get('rest/porudzbinestanje/nadjisvaStanjaPorudzbinazaRentAcar/' + this.objekat.id)
		    		.then(response =>{
					this.svaStanjaPorudzbina = response.data;
				});
				}else{
					console.log("niste promjenili stanje u preuzeto kod porudzbinaStanje");
				}
			  });

		});
	},
	
	vratiNarudzbinu(porudzbina){
		axios
	    .get("rest/porudzbinestanje/nadjiPorudzbinuStanje", {
	      params: {
	        porudzbinaId: porudzbina.idNarudzbe,
	        objekatId: this.objekat.id
	      }
    	}).then(response =>{
			this.porudzbinaStanje = response.data;
			console.log(this.porudzbinaStanje);
			this.porudzbinaStanje.statusPorudzbine = 'Vraceno';
			
			axios.put('rest/porudzbinestanje/izmenistanjeporudzbine',this.porudzbinaStanje)
				.then(response => {
				if(response.data === true){
					console.log("uspjesno ste izmjenili stanje kod porudzbinaStanje u vraceno");
					
					axios.get('rest/porudzbinestanje/nadjiPorudzbinuStanja/' + porudzbina.idNarudzbe)
					.then(response =>{
						let porudz = response.data;
						let br = 0;
						console.log(porudz);
						for(let p of porudz){
							if(p.statusPorudzbine === 'Vraceno'){
								br++;
							}
						}

						if(br === porudzbina.rentaCarIds.length){
							porudzbina.status = 'Vraceno';
							for(let v of porudzbina.iznajmljenaVozila){
								v.status = 'Dostupljeno';
								axios.post('rest/vozila/izmenivozilo',v);
							}
							axios.put('rest/porudzbine/izmeniporudzbinu', porudzbina)
							.then(response =>{
								if(response.data===true){
									console.log("uspjesno promjenjen status porudzbine u Vraceno");
									
								}
							});
						}else{
							console.log("nije jos vrijeme za promjenu,ima jos nevracenih dijelova.");
						}
					})
					
					axios.get('rest/porudzbinestanje/nadjisvaStanjaPorudzbinazaRentAcar/' + this.objekat.id)
		    		.then(response =>{
					this.svaStanjaPorudzbina = response.data;
				});
				}else{
					console.log("niste promjenili stanje u vraceno kod porudzbinaStanje");
				}
			  });

		});
	},
	
	
	pretraziIznajmljivanja(){
	  axios.get('rest/porudzbine/traziZaMenadzera', {
		  params :{
	        cenaOd: this.cenaOd,
	        cenaDo: this.cenaDo,
	        datumOd: this.datumOd,
	        datumDo: this.datumDo,
	        objekatId: this.objekat.id
	  	  }
	  }).then(response =>{
		  let rezultati = response.data;
		  if(this.strelica === "&#8595;"){
			  if (this.sortiranjeKriterijum === 'cena') {
		        rezultati.sort((a, b) => b.cena - a.cena);
		      } else if (this.sortiranjeKriterijum === 'datum') {
		        rezultati.sort((a, b) => b.datumIznajmljivanja.localeCompare(a.datumIznajmljivanja));
		      }
		  }else{
			  if (this.sortiranjeKriterijum === 'cena') {
		        rezultati.sort((a, b) => a.cena - b.cena);
		      } else if (this.sortiranjeKriterijum === 'datum') {
		        rezultati.sort((a, b) => a.datumIznajmljivanja.localeCompare(b.datumIznajmljivanja));
		      }
		  }
		  this.porudzbine = rezultati;
	  }).catch((error) => {console.error(error);});
  },
  
  dugmeZaPromjenuSortiranja(){	  
	    if (this.strelica === "&#8595;") {
	      this.strelica = "&#8593;";
	    } else if (this.strelica === "&#8593;") {
	      this.strelica = "&#8595;";
	    }
	  	
  }
	
	
  }
  
  
});