Vue.component("pregled-korisnika", {
	data: function () {
		    return {
				korisnik: { id: null, korisnickoIme: null, lozinka: null, ime: null, prezime: null, uloga: null, pol: null, datumRodjenja: null, vrstaKupca: { tipKupca: 'Bronzani', procenat: 0, brojBodova: 0}, blokiran:null, sumnjiv: null },
				objekti: [],
			    pretragaIme: '',
                pretragaPrezime: '',
                pretragaKorisnickoIme: '',
                sortiranjeKriterijum: '',
                filtriranjeUloga: '',
                filtriranjeTipKorisnika: '',
                sortiranjeSmjer: '',
				
			}
			
	},
	template: ` 
  <div>
       <administrator-menu :korisnik="korisnik"></administrator-menu>
        <div class="pretraga-container">
        <input v-model="pretragaIme" type="text" placeholder="Pretraga po imenu">
        <input v-model="pretragaPrezime" type="text" placeholder="Pretraga po prezimenu">
        <input v-model="pretragaKorisnickoIme" type="text" placeholder="Pretraga po korisničkom imenu">
          <button v-on:click="promeniSortiranjeSmjer" style="height: 40px;">
          {{ sortiranjeSmjer === 'asc' ? '▼' : '▲' }}
          </button>
          <select v-model="sortiranjeKriterijum" >
          <option value="" disabled selected>Sortiraj po parametru</option>
          <option value="imee">ime</option>
          <option value="prezimee">prezime</option>
          <option value="korisničko-imee">korisničko ime</option>
          <option value="brojBodova">broj bodova</option>
  </select>
         <select v-model="filtriranjeUloga">
         <option value="" disabled selected>Filtriraj po ulozi</option>
          <option value="kupac">Kupac</option>
          <option value="menadzer">Menadžer</option>
          <option value="administrator">Administrator</option>
  </select>
   <select v-model="filtriranjeTipKorisnika">
          <option value="" disabled selected>Filtriraj po tipu korisnika</option>
          <option value="Bronzani">Bronzani</option>
          <option value="Srebreni">Srebrni</option>
          <option value="Zlatni">Zlatni</option>
   </select>
  <button v-on:click="pretraziObjekte">Traži</button>
      </div>
    <div class="objects-container">
      <div v-for="objekat in objekti" :key="objekat.id" class="object-card">
        <div class="object-details">
          <h3>{{ objekat.ime }} {{ objekat.prezime }}</h3> <p v-if="objekat.sumnjiv" style="color: red;">Sumnjiv korisnik</p>
          <p>Korisničko ime:  {{objekat.korisnickoIme}}</p>
          <h4>{{objekat.uloga}}</h4>
           <button
              class="comment-button"
              :class="{ 'comment-button-right': true }"
              :style="{ backgroundColor: objekat.blokiran ? 'red' : 'green' }"
              v-on:click="onClickButton(objekat)"
              v-if="objekat.uloga !== 'administrator'"
            >
              {{ objekat.blokiran ? 'Blokiran' : 'Aktivan' }}
            </button>
        </div>
      </div>
    </div>
  </div>
  `,

      mounted() {
		  
      console.log('rest/korisnici/prijava');
       axios.get('rest/korisnici/prijava')
      .then(response => (this.korisnik = response.data))
      .catch(error => {
        console.error(error);
      });
		  
		  
    axios
      .get("rest/korisnici/")
      .then(response => {
        this.objekti = response.data;
      })
      .catch(error => {
        console.error(error);
      });
	},
	  methods: {

      pretraziObjekte() {
      axios
      .get("rest/korisnici/trazi", {
       params: {
        ime: this.pretragaIme,
        prezime: this.pretragaPrezime,
        korisnickoIme: this.pretragaKorisnickoIme,
        filterUloga: this.filtriranjeUloga,
        filterTipKorisnika: this.filtriranjeTipKorisnika
      }
    })
    .then((response) => {                                            
      let rezultati = response.data;

      if (this.sortiranjeKriterijum === 'imee') {
            rezultati.sort((a, b) => a.ime.localeCompare(b.ime));
          } else if (this.sortiranjeKriterijum === 'prezimee') {
            rezultati.sort((a, b) => a.prezime.localeCompare(b.prezime));
          } else if (this.sortiranjeKriterijum === 'korisničko-imee') {
            rezultati.sort((a, b) => a.korisnickoIme.localeCompare(b.korisnickoIme));
          }
             else if (this.sortiranjeKriterijum === "brojBodova") {
            rezultati.sort((a, b) => a.vrstaKupca.brojBodova - b.vrstaKupca.brojBodova);
          }

          if (this.sortiranjeSmjer === 'desc') {
            rezultati.reverse();
          }

      this.objekti = rezultati;
    })
    .catch((error) => {
      console.error(error);
    });
},
    onClickButton(objekat) {
      if (objekat.blokiran) {
           objekat.blokiran = false; 
         axios.put('rest/korisnici/izmjena', objekat)
                .then(response => {
                  console.log("Odblokiran korisnik");
                })
                .catch(error => {
                  console.error(error);
                });
      } else {
		  objekat.blokiran = true
        axios.put('rest/korisnici/izmjena', objekat)
                .then(response => {
                 console.log("Blokiran korisnik");
                })
                .catch(error => {
                  console.error(error);
                });
      }
    },
    promeniSortiranjeSmjer() {
      if (this.sortiranjeSmjer === "asc") {
        this.sortiranjeSmjer = "desc";
      } else {
        this.sortiranjeSmjer = "asc";
      }
      }
    

  },		
			
		
});