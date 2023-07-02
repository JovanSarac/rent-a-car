Vue.component("neulogovani", {
	data: function () {
		    return {
				objekti: [],
				prikaziPretragu: false,
			    pretragaNaziv: '',
                pretragaLokacija: '',
                pretragaOcena: 0,
                pretragaTipVozila: '',
                sortiranjeKriterijum: '',
                sortiranjeSmjer: '',
                filterVrstaVozila: '',
                filterTipGoriva: '',
                filterStatus: ''
				
			}
			
	},
	template: ` 
  <div>
    <ul class="menu-bar">
      <li class="right"><button v-on:click="prijava()">Prijavi se</button></li>
        <li>
          <button v-on:click="togglePretraga">Pretraži</button>
        </li>
      </ul>
      <div v-if="prikaziPretragu" class="pretraga-container">
        <input v-model="pretragaNaziv" type="text" placeholder="Pretraga po nazivu">
        <input v-model="pretragaLokacija" type="text" placeholder="Pretraga po lokaciji">
        <input v-model="pretragaTipVozila" type="text" placeholder="Pretraga po tipu vozila">
        <input v-model="pretragaOcena" type="number" placeholder="Pretraga po oceni(veći od)">
        <button v-on:click="promeniSortiranjeSmjer" style="height: 40px;">
          {{ sortiranjeSmjer === 'asc' ? '▼' : '▲' }}
          </button>
          <select v-model="sortiranjeKriterijum" >
          <option value="" disabled selected>Sortiraj po parametru</option>
          <option value="naziv">Naziv objekta</option>
          <option value="lokacija">Lokacija</option>
          <option value="ocena">Prosječna ocena</option>
  </select>
        <select v-model="filterVrstaVozila">
          <option value="">Filtriraj po vrsti vozila</option>
          <option value="manuelni">Manuelni</option>
          <option value="automatik">automatik</option>
         </select>
         <select v-model="filterTipGoriva">
          <option value="">Filtriraj po tipu goriva</option>
          <option value="dizel">Dizel</option>
          <option value="benzin">Benzin</option>
          <option value="elektricni">Električni</option>
         </select>
          <select v-model="filterStatus">
          <option value="">Filtriraj po statusu</option>
          <option value="true">Otvoreni objekti</option>
          <option value="false">Zatvoreni objekti</option>
         </select>
        <button v-on:click="pretraziObjekte">Traži</button>
      </div>
    <div class="objects-container">
      <div v-for="objekat in objekti" :key="objekat.id" class="object-card">
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
     console.log('rest/objekti')
    axios
      .get('rest/objekti/')
      .then(response => {
        this.objekti = response.data;
      })
      .catch(error => {
        console.error(error);
      });
	},
	  methods: {
    prijava() {
      this.$router.push('/login');
    },
     togglePretraga() {
      this.prikaziPretragu = !this.prikaziPretragu;
      
    },
 pretraziObjekte() {
  axios
    .get("rest/objekti/trazi", {
      params: {
        naziv: this.pretragaNaziv,
        lokacija: this.pretragaLokacija,
        ocena: this.pretragaOcena,
        tipVozila: this.pretragaTipVozila,
        filterVrVozila: this.filterVrstaVozila,
        filterGorivo: this.filterTipGoriva,
        filterStatusObjekta: this.filterStatus
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
      
       if (this.sortiranjeSmjer === 'desc') {
            rezultati.reverse();
          }

      this.objekti = rezultati;
    })
    .catch((error) => {
      console.error(error);
    });
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