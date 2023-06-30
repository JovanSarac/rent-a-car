Vue.component("pregled-korisnika", {
	data: function () {
		    return {
				korisnik: { id: null, korisnickoIme: null, lozinka: null, ime: null, prezime: null, uloga: null, pol: null, datumRodjenja: null, vrstaKupca: null,blokiran:null },
				objekti: [],
			    pretragaIme: '',
                pretragaPrezime: '',
                pretragaKorisnickoIme: '',
                sortiranjeKriterijum: '',
                filtriranjeUloga: ''
				
			}
			
	},
	template: ` 
  <div>
       <administrator-menu :korisnik="korisnik"></administrator-menu>
        <div class="pretraga-container">
        <input v-model="pretragaIme" type="text" placeholder="Pretraga po imenu">
        <input v-model="pretragaPrezime" type="text" placeholder="Pretraga po prezimenu">
        <input v-model="pretragaKorisnickoIme" type="text" placeholder="Pretraga po korisničkom imenu">
        &#8595;
          <select v-model="sortiranjeKriterijum" >
          <option value="" disabled selected>Sortiraj po parametru</option>
          <option value="imee">ime</option>
          <option value="prezimee">prezime</option>
          <option value="korisničko-imee">korisničko ime</option>
  </select>
         <select v-model="filtriranjeUloga">
         <option value="" disabled selected>Filtriraj po ulozi</option>
          <option value="kupac">Kupac</option>
          <option value="menadzer">Menadžer</option>
          <option value="administrator">Administrator</option>
  </select>
  <button v-on:click="pretraziObjekte">Traži</button>
      </div>
    <div class="objects-container">
      <div v-for="objekat in objekti" :key="objekat.id" class="object-card">
        <div class="object-details">
          <h3>{{ objekat.ime }} {{ objekat.prezime }}</h3>
          <p>Korisničko ime:  {{objekat.korisnickoIme}}</p>
          <h4>{{objekat.uloga}}</h4>
           <button
              class="comment-button"
              :class="{ 'comment-button-right': true }"
              :style="{ backgroundColor: objekat.blokiran ? 'red' : 'green' }"
              v-on:click="onClickButton(objekat)"
              v-if="objekat.uloga !== 'administrator'"
            >
              {{ objekat.blokiran ? 'Blokiran' : 'Odblokiran' }}
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
        filterUloga: this.filtriranjeUloga
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
    

  },		
			
		
});