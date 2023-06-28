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
      aktivanIndex: -1
    };
  },
   template: `
   <div>
      <kupac-menu :korisnik="korisnik"></kupac-menu>
      <div class="porudzbine-container">
        <h2>Prikaz vaših porudžbina:</h2>
        <div v-for="porudzbina in porudzbine" :key="porudzbina.idNarudzbe" class="porudzbina-card">
          <h3 class="narudzba-id">Narudžba ID: {{ porudzbina.idNarudzbe }}</h3>
          <div v-for="(vozilo, index) in porudzbina.iznajmljenaVozila" :key="vozilo.id" class="vozilo-card" @click="prikaziDatume(index)">
            <div class="vozilo-image">
              <img :src="vozilo.slika" alt="Vozilo slika" />
            </div>
            <div class="vozilo-info">
              <p class="marka-model">Marka: {{ vozilo.marka }}</p>
              <p class="marka-model">Model: {{ vozilo.model }}</p>
              <p v-if="aktivanIndex === index">Datum iznajmljivanja: {{ porudzbina.datumIznajmljivanja }}</p>
              <p v-if="aktivanIndex === index">Datum vraćanja: {{ porudzbina.datumVracanja }}</p>
              <button v-if="porudzbina.status === 'Vraceno' && aktivanIndex === index" class="buttonOceniObjekat" style="font-size: 13px; padding: 12px 24px;">Ocijeni objekat</button>
            </div>
          </div>
          <p class="cena-narudzbe">Cena narudžbe: {{ porudzbina.cena }}</p>
          <p class="status-narudzbe">Status narudžbe: {{ porudzbina.status }}</p>
          <button v-on:click="otkaziNarudzbinu(porudzbina)" class="buttonAddVehicle" style="font-size: 13px; padding: 12px 24px;">Otkaži</button>
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
	  prikaziDatume(index) {
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
  }
});