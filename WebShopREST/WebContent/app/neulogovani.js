Vue.component("neulogovani", {
	data: function () {
		    return {
				objekti: [],
				prikaziPretragu: false,
			    pretragaNaziv: '',
                pretragaLokacija: '',
                pretragaOcena: '',
				
			}
			
	},
	template: ` 
  <div>
    <ul class="menu-bar">
      <li><a @click="navigateToComponent">Prijavi se</a></li>
        <li>
          <button @click="togglePretraga">Pretraži</button>
        </li>
      </ul>
      <div v-if="prikaziPretragu" class="pretraga-container">
        <input v-model="pretragaNaziv" type="text" placeholder="Pretraga po nazivu">
        <input v-model="pretragaLokacija" type="text" placeholder="Pretraga po lokaciji">
        <input v-model="pretragaOcena" type="text" placeholder="Pretraga po oceni">
        <button @click="pretraziObjekte">Traži</button>
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
    navigateToComponent() {
      this.$router.push('/login');
    },
     togglePretraga() {
      this.prikaziPretragu = !this.prikaziPretragu;
    },
  },		
			
		
});