Vue.component("show-rentacar-manager", {
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
					 vrstaKupca: null 
				 },
				 objekat: { 
					 id: null, 
					 naziv: null, 
					 vozila: [], 
					 radnoVremeOd: null, 
					 radnoVremeDo: null, 
					 status: null, 
					 lokacija:{
					    id : null,
					    geografskaDuzina : null,
					    geografskaSirina : null,
					    mjesto : null,
					    postanskiBroj : null,
					    ulica : null,
					    broj : null
					 }, 
					 logoUrl: null, 
					 ocena: null, 
					 menadzer: {
					    id : null,
					    korisnickoIme : null,
					    lozinka : null,
					    ime : null,
					    prezime : null,
					    uloga : null,
					    pol : null,
					    datumRodjenja : null,
					    vrstaKupca : {
					      tipKupca : null,
					      procenat : null,
					      brojBodova : null
					    },
					    blokiran : null,
					    korpa : null
					 }
				 },
				 status:null,
				 komentari: []
				 
			}
	},
	template: `
	 <div>
	  <menadzer-menu :korisnik="korisnik"></menadzer-menu> 
	   <p v-on:click="BackClick" style="text-decoration: underline; color: #3498db; cursor: pointer;">Vrati se nazad na prikaz svih rent a car objekata</p>
	  <h1>Prikaz rent a car objekta </h1>
 		
 	
	  <div class="rentacar-box">
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
      </div>
      
       <div id="map"></div>

	  <div class="rentacar-comments-container">
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
               this.komentari = response.data;
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
			const map = new ol.Map({
			  target: 'map',
			  layers: [
			    new ol.layer.Tile({
			      source: new ol.source.OSM(),
			    })
			  ],
			  view: new ol.View({
			    center: ol.proj.fromLonLat([this.objekat.lokacija.geografskaDuzina, this.objekat.lokacija.geografskaSirina]),
			    zoom: 17,
			  })
			});
			
			const marker = new ol.layer.Vector({
		          source: new ol.source.Vector({
		            features: [
		              new ol.Feature({
		                geometry: new ol.geom.Point(
		                  ol.proj.fromLonLat([this.objekat.lokacija.geografskaDuzina, this.objekat.lokacija.geografskaSirina])
		                )
		              })
		            ]
		          }),
		          style: new ol.style.Style({
		            image: new ol.style.Icon({
		              src: 'https://docs.maptiler.com/openlayers/default-marker/marker-icon.png',
		              anchor: [0.5, 1]
		            })
		          })
		        });
		        map.addLayer(marker);
			
			
			console.log(this.objekat);
		})
	    
	 	    
    },
		
	methods : {		
	BackClick(){
		this.$router.push('/pocetna-menadzer');
	},
	
			
	}
});