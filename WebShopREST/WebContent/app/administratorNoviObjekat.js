Vue.component("novi-objekat", {
  data: function() {
    return {
      korisnik: { id: null, korisnickoIme: null, lozinka: null, ime: null, prezime: null, uloga: null, pol: null, datumRodjenja: null, vrstaKupca: null },
      objekat: {
        id: null,
        naziv: null,
        vozila: [],
        radnoVremeOd: null,
        radnoVremeDo: null,
        status: true,
        lokacija: {
          geografskaDuzina: null,
          geografskaSirina: null,
          mjesto: null,
          postanskiBroj: null,
          ulica: null,
          broj: null
        },
        logoUrl: null,
        ocena: 0,
        menadzer: null
      },
      slobodniMenadzeri: [], 
      prikaziFormuZaNovogMenadzera: false,
      noviKorisnik:{id: null, korisnickoIme: null, lozinka:null, ime:null, prezime:null, pol:null, datumRodjenja:null, uloga: 'menadzer',  vrstaKupca: { tipKupca: 'Bronzani', procenat: 0, brojBodova: 0} }
      
    }
  },

  template: `
  <div>
   <administrator-menu :korisnik="korisnik"></administrator-menu>
    <div class="registracija-objekta">
      <h1>Registracija novog objekta</h1>
      
      <form v-on:submit.prevent="kreirajNoviObjekat">
        <label>Naziv:</label>
        <input type="text" v-model="objekat.naziv" required>
                
        <label>Radno vreme od:</label>
        <input type="time" v-model="objekat.radnoVremeOd" required>
        
        <label>Radno vreme do:</label>
        <input type="time" v-model="objekat.radnoVremeDo" required>
        
        <label>Odaberite lokaciju: </label>
	    		<div id="map" ref="map"></div>

        
        <label>Logo URL:</label>
        <input type="text" v-model="objekat.logoUrl" required>
        
      <label>Menadžer:</label>
        <select v-model="objekat.menadzer" required>
          <option v-for="menadzer in slobodniMenadzeri" :value="menadzer">{{ menadzer.ime }} {{menadzer.prezime}}</option>
        </select> 
        
        <button type="submit">Kreiraj objekat</button>
      </form>
       <div v-if="slobodniMenadzeri.length === 0">
       <p>Nemate slobodnih menadžera, registrujte jednog</p>
         <a href="#" v-on:click.prevent="prikaziFormuZaNovogMenadzera = true">Registrujte menadžera</a>
          <div v-if="prikaziFormuZaNovogMenadzera">
       <form action="/WebShopREST/rest/korisnici/registruj" method="post" v-on:submit="validacija">
            <table>
                <tr>
                    <td align="left">
                        <label>*Korisnicko ime: </label>
                    </td>
                    <td align="left">
                        <input name="korIme" type="text" v-model="noviKorisnik.korisnickoIme">
                    </td>
                </tr>
                <tr>
                    <td align="left">
                        <label>*Lozinka: </label>
                    </td>
                    <td align="left">
                        <input name="loz1" type="password" v-model="noviKorisnik.lozinka" >
                    </td>
                </tr>
                <tr>
                    <td align="left">
                        <label>*Ponovi lozinku: </label>
                    </td>
                    <td align="left">
                        <input name="loz2" type="password" >                        
                    </td>
                    <td>
                        <p name="provloz" hidden style="color:red">Ponovljena lozinka nije ista</p>
                    </td>
                </tr>
                <tr>
                    <td align="left">
                        <label>*Ime: </label>
                    </td>
                    <td align="left">
                        <input name="ime" type="text" v-model="noviKorisnik.ime"  >
                    </td>
                </tr>
                <tr>
                    <td align="left">
                        <label>*Prezime: </label>
                    </td>
                    <td align="left">
                        <input name="prezime" type="text" v-model="noviKorisnik.prezime"  >
                    </td>
                </tr>
                <tr>
                    <td align="left">
                        <label>Pol: </label>
                    </td>
                    <td align="left">
                        <select name="pol" v-model="noviKorisnik.pol" >
                            <option disabled selected value=""></option>
                            <option value="Musko">Musko</option>
                            <option value="Zensko">Zensko</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td align="left">
                        <label>*Datum rodjenja: </label>
                    </td>
                    <td align="left">
                        <input name="datumrodj" type="date" v-model="noviKorisnik.datumRodjenja"  >
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td align="right">
                        <input type="submit" value="Registruj novog menadžera"></button>
                    </td>
                </tr>
            </table>
       </form>
    </div>
     </div>
     </div>
    </div>
  `,
    mounted() {
		axios.get('rest/korisnici/prijava')
      .then(response => (this.korisnik = response.data));
      
      const map = new ol.Map({
		  target: 'map',
		  layers: [
		    new ol.layer.Tile({
		      source: new ol.source.OSM(),
		    })
		  ],
		  view: new ol.View({
		    center: ol.proj.fromLonLat([0, 0]),
		    zoom: 2,
		  })
		});
		
		const marker = new ol.layer.Vector({
			source: new ol.source.Vector({
				features: [
					new ol.Feature({
						geometry: new ol.geom.Point(
							ol.proj.fromLonLat([0, 0])
						)
					})
				]
			}),
			style: new ol.style.Style({
				image: new ol.style.Icon({
					src: 'https://docs.maptiler.com/openlayers/default-marker/marker-icon.png',
					anchor: [0.5,1]
				})
			})
		})
		
		map.addLayer(marker);
  		
  		this.mapObject = map;
  		this.markerObject = marker;
  		
  		const vec = new ol.layer.Vector({
		  source: new ol.source.Vector(),
		});
		  		
  		map.on('click', (event) => {
			  var cor = ol.proj.toLonLat(event.coordinate);
			  this.convertToMyCoordinates(cor);
			  this.objekat.lokacija.geografskaDuzina = cor[0];
			  this.objekat.lokacija.geografskaSirina = cor[1];
			  
			  vec.getSource().clear();
			  
			  var mapMarker = new ol.Feature({
				  geometry: new ol.geom.Point(event.coordinate),
			  });
			  
			  vec.getSource().addFeature(mapMarker);
			  
			  this.moveMarker(event.coordinate);
		  });

      
	
        
    this.ucitajSlobodneMenadzere();
  },
  methods: {
	 convertToMyCoordinates : function(lonLatCoordinates){
			fetch(
				"http://nominatim.openstreetmap.org/reverse?format=json&lon=" + lonLatCoordinates[0] + "&lat=" + lonLatCoordinates[1]
	      		).then(response => { return response.json(); }).then(json => 
			  	{
				  let adresa = json.address;
				  this.objekat.lokacija.mjesto = adresa.village || adresa.town || adresa.city;
				  this.objekat.lokacija.postanskiBroj = adresa.postcode;
				  this.objekat.lokacija.broj = adresa.house_number;
				  this.objekat.lokacija.ulica = adresa.road;
				  
				  let boundingbox = json.boundingbox;
				  let length = Math.abs(parseFloat(boundingbox[3]) - parseFloat(boundingbox[1]));
			   	  let width = Math.abs(parseFloat(boundingbox[2]) - parseFloat(boundingbox[0]));
					
				  
			  	})
		},
		
		moveMarker: function (lonLatCoordinates) {
		    const markerSource = this.markerObject.getSource();
		    markerSource.clear();
		
		    const mapMarker = new ol.Feature({
		      geometry: new ol.geom.Point(lonLatCoordinates)
		    });
		
		    markerSource.addFeature(mapMarker);
		  },
 
	  
	  
	  
    ucitajSlobodneMenadzere() {
       axios
      .get("rest/korisnici/traziSlobodne")
      .then(response => {
        this.slobodniMenadzeri = response.data;
    });
    },
   kreirajNoviObjekat() {
      toast('Usao je u registraciju rent a car objekta');
   this.objekat.lokacija.postanskiBroj = parseInt(this.objekat.lokacija.postanskiBroj);
   this.objekat.lokacija.geografskaDuzina = parseFloat(this.objekat.lokacija.geografskaDuzina);
   this.objekat.lokacija.geografskaSirina = parseFloat(this.objekat.lokacija.geografskaSirina);
  axios.post('rest/objekti/registruj', this.objekat)
  .then(response => {
    if (response.data === true) {
      console.log('SVE ok uspijesno je registrovan')
      
      
       this.objekat = {
          id: null,
          naziv: null,
          vozila: [],
          radnoVremeOd: null,
          radnoVremeDo: null,
          status: true,
          lokacija: {
            geografskaDuzina: null,
            geografskaSirina: null,
            mjesto: null,
            postanskiBroj: null,
            ulica: null,
            broj: null
          },
          logoUrl: null,
          ocena: 0,
          menadzer: null
        };
        
          setTimeout(() => {
          this.ucitajSlobodneMenadzere();
        }, 1000); 
        
        this.noviKorisnik = {
         id: null,
         korisnickoIme: null,
         lozinka: null,
         ime: null,
         prezime: null,
         pol: null,
         datumRodjenja: null,
         uloga: 'menadzer',
         vrstaKupca: { tipKupca: 'Bronzani', procenat: 0, brojBodova: 0 }
         };
      
    } else {
		console.log('NESTO NIJE U REDU ')
      toast('GRESKA');
    }
  });
   },
   validacija:function(event){
			let uspjeh =  true;
			
			let korisnickoIme = document.getElementsByName("korIme")[0];
			korisnickoIme.style.background = "white";
			if(!korisnickoIme.value){
				korisnickoIme.style.background = "red";
				uspjeh = false;
			}
			
			let lozinka = document.getElementsByName("loz1")[0];
			lozinka.style.background = "white";
			if(!lozinka.value){
				lozinka.style.background = "red";
				uspjeh = false;
			}
			
			let lozinkaponovo = document.getElementsByName("loz2")[0];
			lozinkaponovo.style.background = "white";
			if(!lozinkaponovo.value){
				lozinkaponovo.style.background = "red";
				uspjeh = false;
			}			
			
			let ime = document.getElementsByName("ime")[0];
			ime.style.background = "white";
			if(!ime.value){
				ime.style.background = "red";
				uspjeh = false;
			}
			let prezime = document.getElementsByName("prezime")[0];
			prezime.style.background = "white";
			if(!prezime.value){
				prezime.style.background = "red";
				uspjeh = false;
			}
			let pol = document.getElementsByName("pol")[0];
			pol.style.background = "white";
			if(!pol.value){
				pol.style.background = "red";
				uspjeh = false;
			}
			let datumrodjenja = document.getElementsByName("datumrodj")[0];
			datumrodjenja.style.background = "white";
			if(!datumrodjenja.value){
				datumrodjenja.style.background = "red";
				uspjeh = false;
			}
			
			let ploz = document.getElementsByTagName('p')[0];
			if(lozinkaponovo.value != lozinka.value){
				ploz.hidden=false;
				uspjeh = false;
			}else{
				ploz.hidden = true;	
			}
			
			if(!uspjeh){
				event.preventDefault();
				return false;
			}
			if(uspjeh){
				event.preventDefault();
				console.log("usao u if");
				axios.post('rest/korisnici/registruj', this.noviKorisnik)
				.then(response=>{
					if (response.data === true) {
						 this.ucitajSlobodneMenadzere();
      					toast('Korisnik ' + this.noviKorisnik.korisnickoIme + ' je uspješno registrovan');
   				    }else{
						toast('Korisnik sa korisnickim imenom ' + this.noviKorisnik.korisnickoIme + ' vec postoji, pa nije moguce izvrsiti registraciju!');	 
					}
				}).catch(error => {
                        console.error(error);
                    });
            }
			
			return uspjeh;
		}
    }
  
});