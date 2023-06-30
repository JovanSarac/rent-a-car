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
      prikaziFormu: []
    };
  },
  template: `
   <div>
    <kupac-menu :korisnik="korisnik"></kupac-menu>
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
        <p class="cena-narudzbe">Cena narudžbe: {{ porudzbina.cena }}</p>
        <p class="status-narudzbe">Status narudžbe: {{ porudzbina.status }}</p>
        <button v-on:click="otkaziNarudzbinu(porudzbina)" class="buttonAddVehicle">Otkaži</button>
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
              const index = this.porudzbine.indexOf(porudzbina);
              if (index !== -1) {
                this.porudzbine.splice(index, 1);
              }
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
}
}); 
