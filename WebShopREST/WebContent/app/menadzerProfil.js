Vue.component("profil-menadzer", {
	data: function () {
		    return {
				 korisnik: { id: null, korisnickoIme: null, lozinka: null, ime: null, prezime: null, uloga: null, pol: null, datumRodjenja: null, vrstaKupca: null },
				 izmijeniProfil: false,
				 originalniKorisnik: {} 
			}
	},
	template: `
	 <div>
    <menadzer-menu :korisnik="korisnik"></menadzer-menu> 
   <div class="profile">
  <h2>Profil korisnika</h2>
  <div v-if="!izmijeniProfil" class="profile-info">
    <p><strong>Korisničko ime:</strong> {{ korisnik.korisnickoIme }}</p>
    <p><strong>Ime:</strong> {{ korisnik.ime }}</p>
    <p><strong>Prezime:</strong> {{ korisnik.prezime }}</p>
    <p><strong>Uloga:</strong> {{ korisnik.uloga }}</p>
    <p><strong>Pol:</strong> {{ korisnik.pol }}</p>
    <p><strong>Datum rođenja:</strong> {{ korisnik.datumRodjenja }}</p>
    <button v-on:click="izmijeniProfil = true">Izmijeni profil</button>
  </div>
  <div v-else>
    <h3>Izmjena profila</h3>
    <form v-on:submit.prevent="sacuvajIzmjene">
      <div class="form-group">
        <label>Korisničko ime:</label>
        <input type="text" v-model="korisnik.korisnickoIme" required>
      </div>

      <div class="form-group">
        <label>Ime:</label>
        <input type="text" v-model="korisnik.ime" required>
      </div>

      <div class="form-group">
        <label>Prezime:</label>
        <input type="text" v-model="korisnik.prezime" required>
      </div>

      <div class="form-group">
        <label>Pol:</label>
        <select v-model="korisnik.pol" required>
          <option disabled selected value=""></option>
          <option value="Musko">Musko</option>
          <option value="Zensko">Zensko</option>
        </select>
      </div>

      <div class="form-group">
        <label>Datum rođenja:</label>
        <input type="date" v-model="korisnik.datumRodjenja" required>
      </div>

      <div class="form-group">
        <button type="submit">Sačuvaj izmjene</button>
        <button v-on:click="resetujPodatke" class="cancel">Odustani</button>
      </div>
    </form>
  </div>
</div>
 </div>
 </div>
</template>
`,
	mounted(){
		console.log('rest/korisnici/prijava')
		axios.get('rest/korisnici/prijava')
		.then(response => {
      this.korisnik = response.data;
      this.originalniKorisnik = Object.assign({}, response.data);
      });
      },
	methods : {	
		 sacuvajIzmjene() {
    axios.put('rest/korisnici/izmjena', this.korisnik)
      .then(response => {
		this.korisnik = response.data
        this.izmijeniProfil = false; 
      })
      .catch(error => {
        console.error(error);
      });
  },
     resetujPodatke() {
    this.korisnik = Object.assign({}, this.originalniKorisnik);
    this.izmijeniProfil = false;
  }	
	}
});