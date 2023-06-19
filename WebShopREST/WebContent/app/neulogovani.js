Vue.component("neulogovani", {
	data: function () {
		    return {
				objekti: [],
				prikaziPretragu: false,
			    pretragaNaziv: '',
                pretragaLokacija: '',
                pretragaOcena: 0,
				
			}
			
	},
	template: ` 
  <div>
    <ul class="menu-bar">
      <li class="right"><a v-on:click="prijava()">Prijavi se</a></li>
        <li>
          <button v-on:click="togglePretraga">Pretraži</button>
        </li>
      </ul>
      <div v-if="prikaziPretragu" class="pretraga-container">
        <input v-model="pretragaNaziv" type="text" placeholder="Pretraga po nazivu">
        <input v-model="pretragaLokacija" type="text" placeholder="Pretraga po lokaciji">
        <input v-model="pretragaOcena" type="number" placeholder="Pretraga po oceni(veći od)">
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
            ocena: this.pretragaOcena
          }
        })
        .then((response) => {
          this.objekti = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },		
			
		
});