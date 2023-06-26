Vue.component("pocetna-menadzer", {
  data: function () {
    return {
      objekti: [],
      korisnik: { id: null, korisnickoIme: null, lozinka: null, ime: null, prezime: null, uloga: null, pol: null, datumRodjenja: null, vrstaKupca: null },
      pretragaNaziv: '',
      pretragaLokacija: '',
      pretragaOcena: 0,
      sortiranjeKriterijum: ''
    }
  },
  template: `
    <div>
      <menadzer-menu :korisnik="korisnik"></menadzer-menu>
      <div class="pretraga-container">
        <input v-model="pretragaNaziv" type="text" placeholder="Pretraga po nazivu">
        <input v-model="pretragaLokacija" type="text" placeholder="Pretraga po lokaciji">
        <input v-model="pretragaOcena" type="number" placeholder="Pretraga po oceni(veći od)">
        &#8595;
          <select v-model="sortiranjeKriterijum" >
          <option value="" disabled selected>Sortiraj po parametru</option>
          <option value="naziv">Naziv objekta</option>
          <option value="lokacija">Lokacija</option>
          <option value="ocena">Prosječna ocena</option>
  		  </select>
        <button v-on:click="pretraziObjekte">Traži</button>
      </div>
      <div class="objects-container">
      <div v-for="objekat in objekti" :key="objekat.id"  class="object-card" v-on:click="prikazRentaCara(objekat)">
        <img :src="objekat.logoUrl" class="object-image">
        <div class="object-details">
          <h3>{{ objekat.naziv }}</h3>
          <p>Lokacija: {{ objekat.lokacija.ulica }} {{objekat.lokacija.broj}}, {{objekat.lokacija.mjesto}} {{objekat.lokacija.postanskiBroj}}</p>
          <p>Koordinate: {{ objekat.lokacija.geografskaDuzina }}, {{objekat.lokacija.geografskaSirina}}</p>
          <p>Ocjena: {{ objekat.ocena }}</p>
        </div>
      </div>
     </div>
    </div>
  `,
  mounted() {
    console.log('rest/korisnici/prijava');
    axios.get('rest/korisnici/prijava')
      .then(response => (this.korisnik = response.data));
      
    axios
      .get("rest/objekti/")
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
    .get("rest/objekti/trazi", {
      params: {
        naziv: this.pretragaNaziv,
        lokacija: this.pretragaLokacija,
        ocena: this.pretragaOcena
      }
    })
    .then((response) => {                                            
      let rezultati = response.data;

      if (this.sortiranjeKriterijum === 'naziv') {
        rezultati.sort((a, b) => a.naziv.localeCompare(b.naziv));
      } else if (this.sortiranjeKriterijum === 'lokacija') {
        rezultati.sort((a, b) => a.lokacija.mjesto.localeCompare(b.lokacija.mjesto));
      } else if (this.sortiranjeKriterijum === 'ocena') {
        rezultati.sort((a, b) => b.ocena - a.ocena);
      }

      this.objekti = rezultati;
    })
    .catch((error) => {
      console.error(error);
    });
    },
    
    prikazRentaCara : function(objekat){
		this.$router.push({ name: 'show-rentacar-manager', params: { objekatId: objekat.id } });
	}
  
 }
});