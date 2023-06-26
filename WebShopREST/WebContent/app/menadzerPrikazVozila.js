Vue.component("show-vehicle", {
	data: function () {
		    return {
				 korisnik: { id: null, korisnickoIme: null, lozinka: null, ime: null, prezime: null, uloga: null, pol: null, datumRodjenja: null, vrstaKupca: null },
				 objekat: { id: null, naziv: null, vozila: [], radnoVremeOd: null, radnoVremeDo: null, status: null, lokacija:null, logoUrl: null, ocena: null, menadzer: null},
				 vozilo: {id: null, marka:null, model:null, cena:null, tipVozila:null, vrsta:null, objekatId:null, tipGoriva:null, potrosnja:null, brojVrata:null, brojOsoba:null, slika:null, opis:null, status:null, deleted:null},
				 izmeneNapravljene: false
				 
			}
	},
	template: `
	 <div>
	  <menadzer-menu :korisnik="korisnik"></menadzer-menu> 
	   <p v-on:click="BackClick" style="text-decoration: underline; color: #3498db; cursor: pointer;">Vrati se nazad na prikaz svih vozila</p>
	  <h1>Prikaz informacija o vozilu</h1>	
	  <div vehicle-container>
	  <div class="vehicle-card" >
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
      
      <h1>Izmena informacija o vozilu:</h1>      
      <div class="formaVozilo">
	    <form v-on:submit="validacija">
	      <label for="marka">Marka vozila:</label>  
	      <input type="text" id="marka" name="marka" v-model="vozilo.marka" v-on:input="izmeneNapravljene = true">
	
	      <label for="model">Model vozila:</label>      
	      <input type="text" id="model" name="model"  v-model="vozilo.model" v-on:input="izmeneNapravljene = true">
	        
	      <label for="cena">Cena vozila:</label>
	      <input type="number" step="any" id="cena" name="cena" v-model="vozilo.cena" v-on:input="izmeneNapravljene = true">
	      
	      <label for="tip">Tip vozila:</label>
	      <input type="text" id="tip" name="tip" v-model="vozilo.tipVozila" v-on:input="izmeneNapravljene = true">
	      
	      <label for="mjenjac">Vrsta mjenjača:</label>
	      <select name="mjenjac" id="mjenjac" v-model="vozilo.vrsta" v-on:input="izmeneNapravljene = true">
	        <option disabled selected value=""></option>
	        <option value="manuelni">manuelni</option>
	        <option value="automatik">automatik</option>
	      </select>
	      
	      <label for="gorivo">Tip goriva:</label>
	      <select name="gorivo" id="gorivo" v-model="vozilo.tipGoriva" v-on:input="izmeneNapravljene = true">
	        <option disabled selected value=""></option>
	        <option value="dizel">dizel</option>
	        <option value="benzin">benzin</option>
	        <option value="hibrid">hibrid</option>
	        <option value="elektricni">elektricni</option>
	      </select>
	      
	      <label for="potrosnja">Potrošnja:</label>
	      <input type="number" step="any" id="potrosnja" name="potrosnja" v-model="vozilo.potrosnja" v-on:input="izmeneNapravljene = true">
	      
	      <label for="vrata">Broj vrata:</label>
	      <input type="number" id="vrata" name="vrata" v-model="vozilo.brojVrata" v-on:input="izmeneNapravljene = true">
	      
	      <label for="osobe">Broj osoba:</label>
	      <input type="number" id="osobe" name="osobe" v-model="vozilo.brojOsoba" v-on:input="izmeneNapravljene = true">
	      
	      <label for="slika">Slika vozila:</label>
	      <input type="text" id="slika" name="slika" v-model="vozilo.slika" v-on:input="izmeneNapravljene = true">
	      
	      <label for="status">Status:</label>
	      <select name="status" id="status" v-model="vozilo.status" v-on:input="izmeneNapravljene = true">
	        <option disabled selected value=""></option>
	        <option value="Dostupljeno">Dostupljeno</option>
	        <option value="iznajmljeno">Iznajmljeno</option>
	      </select>
	      
	      <label for="opis">Opis vozila:</label>
	      <textarea id="opis" name="opis" v-model="vozilo.opis" v-on:input="izmeneNapravljene = true"></textarea>
	
	      <div class="dugmad">
	        <button v-on:click="BackClick">Odustani</button>
	        <input type="submit" value="Izmjeni" :disabled="!izmeneNapravljene" :class="{ 'disabled-button': !izmeneNapravljene }">
	      </div>
    	</form>
    	<h1>Izbrisi vozilo iz rent a car objekta:</h1>
      	<button v-on:click="izbrisiClick" class="buttonAddVehicle">Izbrisi</button>
  </div>
 
  
	  
     </div>
`,
	mounted(){
		
		axios.get('rest/korisnici/prijava')
		.then(response=>{
			this.korisnik = response.data;
			axios.get('rest/objekti/nadjiMenadzerov', {
				params:{
					korisnikId: this.korisnik.id
				}
			})
			.then(response=>(this.objekat = response.data))
		}).catch((error) => {console.error(error);});
		
		const vehicleId = this.$route.params.vehicleId;
		console.log(vehicleId);
		
		axios.get('rest/vozila/nadjiVozilopoIdu/' + vehicleId)
		.then(response=>{
			this.vozilo = response.data;
			console.log(this.vozilo);
		})
	    	
	    
    },
		
	methods : {		
	BackClick(){
		this.$router.push('/renta-car-menadzer');
	},
	validacija:function(event){
			let uspjeh =  true;
			
			let marka = document.getElementsByName("marka")[0];
			marka.style.background = "white";
			if(!marka.value){
				marka.style.background = "red";
				uspjeh = false;
			}
			
			let model = document.getElementsByName("model")[0];
			model.style.background = "white";
			if(!model.value){
				model.style.background = "red";
				uspjeh = false;
			}
			let cena = document.getElementsByName("cena")[0];
			cena.style.background = "white";
			if(!cena.value){
				cena.style.background = "red";
				uspjeh = false;
			}
			
			let tip = document.getElementsByName("tip")[0];
			tip.style.background = "white";
			if(!tip.value){
				tip.style.background = "red";
				uspjeh = false;
			}
			
			let mjenjac = document.getElementsByName("mjenjac")[0];
			mjenjac.style.background = "white";
			if(!mjenjac.value){
				mjenjac.style.background = "red";
				uspjeh = false;
			}
			
			let gorivo = document.getElementsByName("gorivo")[0];
			gorivo.style.background = "white";
			if(!gorivo.value){
				gorivo.style.background = "red";
				uspjeh = false;
			}
			
			let potrosnja = document.getElementsByName('potrosnja')[0];
			potrosnja.style.background = "white";
			if(!potrosnja.value){
				potrosnja.style.background = "red";
				uspjeh = false;
			}
			
			let vrata = document.getElementsByName('vrata')[0];
			vrata.style.background = "white";
			if(!vrata.value){
				vrata.style.background = "red";
				uspjeh = false;
			}
			let osobe = document.getElementsByName('osobe')[0];
			osobe.style.background = "white";
			if(!osobe.value){
				osobe.style.background = "red";
				uspjeh = false;
			}
			let slika = document.getElementsByName('slika')[0];
			slika.style.background = "white";
			if(!slika.value){
				slika.style.background = "red";
				uspjeh = false;
			}
			
			if(!uspjeh){
				event.preventDefault();
				return false;
			}
			if(uspjeh){
				event.preventDefault();
				console.log("usao u if");
				axios.post('rest/vozila/izmenivozilo',this.vozilo)
				.then(response=>{
					console.log(response.data);
					if(response.data === true){
						console.log("Upsjesno je izmjenjeno vozilo.");
						const index = this.objekat.vozila.findIndex(v => v.id === this.vozilo.id);
						
						this.objekat.vozila.splice(index, 1, this.vozilo);
						axios.post('rest/objekti/izmeniobjekat',  this.objekat)
      							  .then(response=>{
								  console.log(response.data);
								  if (response.data === true) {
									  console.log("Upjesno dodato vozilo u listu vozila rent a car objekta");
									  this.$router.push('/renta-car-menadzer');
								  }
      							  }).catch(error => {console.error(error);});
						
					}
				}).catch((error) => {console.error(error);});
                   

            }
			
			return uspjeh;
		},
		izbrisiClick(){
			this.vozilo.deleted = true;
			axios.post('rest/vozila/izmenivozilo',this.vozilo)
			.then(response=>{
				console.log(response.data);
				if(response.data === true){
					console.log("Upsjesno je obrisano(izmjenjeno) vozilo.");
					const index = this.objekat.vozila.findIndex(v => v.id === this.vozilo.id);
						
					this.objekat.vozila.splice(index, 1);
					axios.post('rest/objekti/izmeniobjekat',  this.objekat)
      					.then(response=>{
							console.log(response.data);
							if (response.data === true) {
								console.log("Upjesno izbrisano vozilo iz liste vozila u rent a car objektu");
								this.$router.push('/renta-car-menadzer');
							}
      					}).catch(error => {console.error(error);});					
					}
			}).catch((error) => {console.error(error);});
		}	
	}
});