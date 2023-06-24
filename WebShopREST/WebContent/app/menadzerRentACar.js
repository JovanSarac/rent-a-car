Vue.component("renta-car-menadzer", {
	data: function () {
		    return {
				 korisnik: { id: null, korisnickoIme: null, lozinka: null, ime: null, prezime: null, uloga: null, pol: null, datumRodjenja: null, vrstaKupca: null },
				 objekat: { id: null, naziv: null, vozila: [], radnoVremeOd: null, radnoVremeDo: null, status: null, lokacija:null, logoUrl: null, ocena: null, menadzer: null},
				 
			}
	},
	template: `
	 <div>
	  <menadzer-menu :korisnik="korisnik"></menadzer-menu> 
	  <h1 class="rentacar-title">Podaci o Vašem rent a car objektu:</h1>
	  
	  <div class="maininfo">
	  <div class="rentacar-box">
	    <div class="rentacar-container">
	      <img class="logo" :src="objekat.logoUrl" alt="Logo Rent-a-Car objekta">
	    <div class="rentacar-details">
	      <h2>{{ objekat.naziv }}</h2>
	      <p>Lokacija: {{objekat.lokacija.ulica}} {{objekat.lokacija.broj}}, {{objekat.lokacija.mjesto}} {{objekat.lokacija.postanskiBroj}}</p>
          <p>Koordinate: {{ objekat.lokacija.geografskaDuzina }}, {{objekat.lokacija.geografskaSirina}}</p>
          <p>Ocjena: {{ objekat.ocena }}</p>
          <p>Radno vrijeme: {{ objekat.radnoVremeOd }} - {{ objekat.radnoVremeDo }}</p>
          <p>Menadzer: {{ objekat.menadzer.ime }}  {{ objekat.menadzer.prezime }}</p>
	    </div>
	   </div>
	  </div>
	  <div class="add-vehicle">
	  	<h2>Neke od funkcionalnosti vezane za Vas objekat</h2>
	  	<p>Ukoliko zelite da dodate novo vozilo u ponudu pritisnite: <button class="buttonAddVehicle" v-on:click="AddVehicle">dodaj vozilo</button></p>
	  </div>
	  </div>
	  
	  <h1 class="vehicle-title">Vozila koja su u ponudi:</h1>	  
	  <div vehicle-container>
	  <div v-for="vozilo in objekat.vozila" :key="vozilo.id" class="vehicle-card">
        <img :src="vozilo.slika" class="vehicle-image">
        <div class="vehicle-details">
          <h3>{{ vozilo.marka }} {{vozilo.model}}</h3>
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
		console.log('rest/korisnici/prijava')
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
	AddVehicle(){
		this.$router.push('/add-vehicle-manager');
	}
	}
});