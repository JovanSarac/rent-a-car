Vue.component("iznajmlivanja-kupac", {
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
      porudzbine: [],
      aktivanIndex: -1,
      Komentar: {id:null, korisnickoIme: null, kupacId: null, rentacarId: null, komentar:null, ocjena: null},
      objekat: { id: null, naziv: null, vozila: [], radnoVremeOd: null, radnoVremeDo: null, status: null, lokacija:null, logoUrl: null, ocena: null, menadzer: null},
      prikaziFormu: [],
      otkazPorudzbine : {kupacId: null, datum: null},
      pretragaNaziv: '',
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
    <kupac-menu :korisnik="korisnik"></kupac-menu>
    <div class="pretragaiznajmljivanja-container">
    
    	<div class="nazivObjekta">
	        <label for="naziv">Naziv objekta:</label>
		    <input v-model="pretragaNaziv" type="text" id="naziv" name="naziv" placeholder="Unesite naziv objekta"><br><br>
	    </div>
	    
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
      <h2>Prikaz vaših porudžbina:</h2>
      <div v-for="porudzbina in porudzbine" :key="porudzbina.idNarudzbe" class="porudzbina-card">
        <h3 class="narudzba-id">Narudžba ID: {{ porudzbina.idNarudzbe }}</h3>
        <div v-for="(vozilo, index) in porudzbina.iznajmljenaVozila" :key="vozilo.id" class="vozilo-card">
          <div class="vozilo-image">
            <img :src="vozilo.slika" alt="Vozilo slika" />
          </div>
          <div class="vozilo-info">
            <p class="marka-model">Marka: {{ vozilo.marka }}</p>
            <p class="marka-model">Model: {{ vozilo.model }}</p>
            <button v-if="aktivanIndex !== index" @click="prikaziDetalje(index)" class="buttonDetalji">Detalji</button>
            <div v-if="aktivanIndex === index">
              <p>Datum iznajmljivanja: {{ porudzbina.datumIznajmljivanja }}</p>
              <p>Datum vraćanja: {{ porudzbina.datumVracanja }}</p>
              <button v-if="porudzbina.status === 'Vraceno'" v-on:click="prikaziFormuZaOcijenjivanje(index,vozilo,$event)" class="buttonOceniObjekat">Ocijeni objekat</button>
              <form v-if="prikaziFormu[index]" @submit.prevent="submitOcjenaKomentar(vozilo, index)">
                <div class="form-group">
                  <label for="komentar">Komentar:</label>
                  <textarea id="komentar" v-model="Komentar.komentar" required></textarea>
                </div>
                <div class="form-group">
                  <label for="ocjena">Ocjena:</label>
                  <input type="number" id="ocjena" v-model="Komentar.ocjena" min="1" max="5" required>
                </div>
                <button type="submit" class="submitButton">Submit</button>
              </form>
            </div>
          </div>

        </div>
        
        <p class="cena-narudzbe">Cena narudžbe: {{ porudzbina.cena }} €</p>
          <p class="status-narudzbe">Status narudžbe: {{ porudzbina.status }}</p>
          <button v-on:click="otkaziNarudzbinu(porudzbina)" v-if="porudzbina.status === 'Obrada'" class="buttonAddVehicle" style="font-size: 13px; padding: 12px 24px;">Otkaži</button>

      </div>
    </div>
  </div>
  `,
  mounted() {
    console.log('rest/korisnici/prijava');
    axios.get('rest/korisnici/prijava')
      .then(response => {
        this.korisnik = response.data;
        return axios.get('rest/porudzbine/' + this.korisnik.id);
      })
      .then(response => {
        this.porudzbine = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  },
  methods: {
    prikaziDetalje(index) {
      if (this.aktivanIndex === index) {
        this.aktivanIndex = -1;
      } else {
        this.aktivanIndex = index;
      }
    },
    otkaziNarudzbinu(porudzbina) {
      if (porudzbina.status === 'Obrada') {
        porudzbina.status = 'Otkazano';
        
        
       
      
       this.otkazPorudzbine.kupacId = this.korisnik.id,
       this.otkazPorudzbine.datum = new Date().toISOString().split('T')[0]
        axios.post('rest/korisnici/otkazi', this.otkazPorudzbine)
          .then(response => {
            console.log(response.data);
            if (response.data === true) {
              console.log("Uspješno otkazana porudzbina.");
              }
              });
        
        axios.put('rest/porudzbine/izmeniporudzbinu', porudzbina)
          .then(response => {
            console.log(response.data);
            if (response.data === true) {
              console.log("Upsješno otkazana porudzbina.");           
               
               
              const ukupnaCena = porudzbina.cena;
              const brojBodova = -(ukupnaCena / 1000 * 133 * 4);
              axios.put(`rest/korisnici/azurirajBodove/` + brojBodova)
                .then(response => {
                  this.korisnik.brojBodova = response.data.brojBodova;
                })
                .catch(error => {
                  console.error(error);
                });
            }
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
   prikaziFormuZaOcijenjivanje(index, vozilo,event) {
    axios.get('rest/komentari/VecKomentarisano/' + this.korisnik.id + '/' + vozilo.id)
    .then((response) => {
      if (response.data === false) {
      this.prikaziFormu = this.porudzbine.map(() => false);
      this.prikaziFormu[index] = true;
      this.aktivanIndex = index;
    } else {
      const paragraf = document.createElement("p");
      paragraf.innerText = "Već ste ocijenili objekat";
      paragraf.style.color = "red";
      const button = event.target;
      button.parentNode.insertBefore(paragraf, button.nextSibling);
      setTimeout(() => {
        paragraf.remove();
      }, 2000);
    }
     })
    .catch((error) => {
      console.error(error);
      return false;
    });
  },
    
    sakrijFormu(index) {
      this.prikaziFormu[index] = false;
    },

    submitOcjenaKomentar(vozilo, index) {
      if (!this.Komentar.komentar || !this.Komentar.ocjena) {
        alert("Molimo popunite sva polja za komentar i ocjenu.");
        return;
      }
      
      if(this.Komentar.ocjena > 5 && this.Komentar.ocjena < 1) {
		  alert("unesite ocjeno od 1 do 5");
		  return;
	  }
      
      axios.get('rest/objekti/nadjiRentaCarpoIduVozila/' + vozilo.id)
		.then(response=>{
			this.objekat = response.data;
			this.Komentar.rentacarId = this.objekat.id;
			console.log("nadjen rentacarid za komentar.", this.Komentar.rentacarId);
			 this.Komentar.korisnickoIme = this.korisnik.korisnickoIme;
			 this.Komentar.kupacId = this.korisnik.id;
			 
      console.log("nadjen citav komentar.", this.Komentar);
      axios
        .post("rest/komentari/registruj", this.Komentar)
        .then((response) => {
          if (response.data === true) {
            console.log("Uspješno ocijenjen objekat.", response.data);
            this.Komentar = { id: null, kupacId: null, rentacarId: null, komentar: null, ocjena: null };
            this.sakrijFormu(index); 
          } else {
            console.log("Greska u cuvanju.");
          }
        })
        .catch((error) => {
          console.error(error);
        });
		})
  },
  
  pretraziIznajmljivanja(){
	  axios.get('rest/porudzbine/trazi', {
		  params :{
		    pretragaNaziv: this.pretragaNaziv,
	        cenaOd: this.cenaOd,
	        cenaDo: this.cenaDo,
	        datumOd: this.datumOd,
	        datumDo: this.datumDo,
	        korisnikId: this.korisnik.id
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
