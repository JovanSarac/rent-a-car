Vue.component("add-vehicle-manager", {
	data: function () {
		    return {
				 korisnik: { id: null, korisnickoIme: null, lozinka: null, ime: null, prezime: null, uloga: null, pol: null, datumRodjenja: null, vrstaKupca: null },
				 objekat: { id: null, naziv: null, vozila: [], radnoVremeOd: null, radnoVremeDo: null, status: null, lokacija: null, logoUrl: null, ocena: null, menadzer: null},
				 vozilo: {id: null, marka:null, model:null, cena:null, tipVozila:null, vrsta:null, objekatId:null, tipGoriva:null, potrosnja:null, brojVrata:null, brojOsoba:null, slika:null, opis:null, status:"Dostupljeno", deleted:false}
				 
			}
	},
	template: `
	 <div>
	  <menadzer-menu :korisnik="korisnik"></menadzer-menu> 
	  <p v-on:click="BackClick" style="text-decoration: underline; color: #3498db; cursor: pointer;">Vrati se nazad na prikaz objekta</p>
	  
	  <h1>Popunite formu za dodavanje novog vozila u vas Rent a car objekat! </h1>
	  <div class="formaVozilo">
	    <form v-on:submit="validacija">
	      <label for="marka">Marka vozila:</label>  
	      <input type="text" id="marka" name="marka" v-model="vozilo.marka">
	
	      <label for="model">Model vozila:</label>      
	      <input type="text" id="model" name="model"  v-model="vozilo.model">
	        
	      <label for="cena">Cena vozila:</label>
	      <input type="number" step="any" id="cena" name="cena" v-model="vozilo.cena">
	      
	      <label for="tip">Tip vozila:</label>
	      <input type="text" id="tip" name="tip" v-model="vozilo.tipVozila">
	      
	      <label for="mjenjac">Vrsta mjenjača:</label>
	      <select name="mjenjac" id="mjenjac" v-model="vozilo.vrsta">
	        <option disabled selected value=""></option>
	        <option value="manuelni">manuelni</option>
	        <option value="automatik">automatik</option>
	      </select>
	      
	      <label for="gorivo">Tip goriva:</label>
	      <select name="gorivo" id="gorivo" v-model="vozilo.tipGoriva">
	        <option disabled selected value=""></option>
	        <option value="dizel">dizel</option>
	        <option value="benzin">benzin</option>
	        <option value="hibrid">hibrid</option>
	        <option value="elektricni">elektricni</option>
	      </select>
	      
	      <label for="potrosnja">Potrošnja:</label>
	      <input type="number" step="any" id="potrosnja" name="potrosnja" v-model="vozilo.potrosnja">
	      
	      <label for="vrata">Broj vrata:</label>
	      <input type="number" id="vrata" name="vrata" v-model="vozilo.brojVrata">
	      
	      <label for="osobe">Broj osoba:</label>
	      <input type="number" id="osobe" name="osobe" v-model="vozilo.brojOsoba">
	      
	      <label for="slika">Slika vozila:</label>
	      <input type="text" id="slika" name="slika" v-model="vozilo.slika">
	      
	      <label for="opis">Opis vozila:</label>
	      <textarea id="opis" name="opis" v-model="vozilo.opis"></textarea>
	
	      <div class="dugmad">
	        <button v-on:click="BackClick">Odustani</button>
	        <input type="submit" value="Dodaj vozilo"></button>
	      </div>
      
    	</form>
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
		})
    .catch((error) => {
      console.error(error);
    });
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
			if(!cena.value || cena.value <= 0){
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
			if(!potrosnja.value || potrosnja.value <0){
				potrosnja.style.background = "red";
				uspjeh = false;
			}
			
			let vrata = document.getElementsByName('vrata')[0];
			vrata.style.background = "white";
			if(!vrata.value || vrata.value < 0){
				vrata.style.background = "red";
				uspjeh = false;
			}
			let osobe = document.getElementsByName('osobe')[0];
			osobe.style.background = "white";
			if(!osobe.value || osobe.value <= 0){
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
				this.vozilo.objekatId = this.objekat.id;
				axios.post('rest/vozila/kreirajvozilo',  this.vozilo)
				.then(response=>{
					if (response.data === true) {
      					console.log('Vozilo ' + this.vozilo.marka + this.vozilo.model + ' je uspješno registrovan');
      					
      					//postavljanje id na trenutno dodano vozilo da bi se posle azurirala lista vozila unutar objekta
      					axios.get('rest/vozila/nadjiIdVozila')
      					.then(response=>{
							  console.log(response.data);
							  if(response.data != null){
								  this.vozilo.id = response.data;
								  console.log(this.vozilo);
      							  this.objekat.vozila.push(this.vozilo);
      							  
      							  axios.post('rest/objekti/izmeniobjekat',  this.objekat)
      							  .then(response=>{
								  console.log(response.data);
								  if (response.data === true) {
									  console.log("Upjesno dodato vozilo u listu vozila rent a car objekta");
									  this.$router.push('/renta-car-menadzer');
								  }
      							  }).catch(error => {console.error(error);});
							  }
						 }).catch(error=>{console.error(error);});
						
      					
      				
   				    }else{
						console.log('Greska prilikom cuvanja vozila ' );	 
					}
				}).catch(error => {
                        console.error(error);
                    });
                   

            }
			
			return uspjeh;
		}
	}
});