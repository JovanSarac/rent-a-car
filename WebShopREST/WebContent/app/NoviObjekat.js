Vue.component("novi-objekat", {
  data: function() {
    return {
      korisnik: { id: null, korisnickoIme: null, lozinka: null, ime: null, prezime: null, uloga: null, pol: null, datumRodjenja: null, vrstaKupca: null },
      objekat: {
        id: null,
        naziv: null,
        vozila: [],
        radnoVremeOd: null,
        radnoVremeDo: null,
        status: true,
        lokacija: {
          geografskaDuzina: null,
          geografskaSirina: null,
          mjesto: null,
          postanskiBroj: null,
          ulica: null,
          broj: null
        },
        logoUrl: null,
        ocena: 0,
        menadzer: null
      },
      slobodniMenadzeri: [] // Lista slobodnih menadžera
      
    }
  },

  template: `
  <div>
   <administrator-menu :korisnik="korisnik"></administrator-menu>
    <div class="registracija-objekta">
      <h1>Registracija novog objekta</h1>
      
      <form v-on:submit="kreirajNoviObjekat">
        <label>Naziv:</label>
        <input type="text" v-model="objekat.naziv" required>
                
        <label>Radno vreme od:</label>
        <input type="time" v-model="objekat.radnoVremeOd" required>
        
        <label>Radno vreme do:</label>
        <input type="time" v-model="objekat.radnoVremeDo" required>
        
        <label>Geografska dužina:</label>
        <input type="text" v-model="objekat.lokacija.geografskaDuzina" required>
        
        <label>Geografska širina:</label>
        <input type="text" v-model="objekat.lokacija.geografskaSirina" required>
        
        <label>Mjesto:</label>
        <input type="text" v-model="objekat.lokacija.mjesto" required>
        
        <label>Poštanski broj:</label>
        <input type="number" v-model="objekat.lokacija.postanskiBroj" required>
        
        <label>Ulica:</label>
        <input type="text" v-model="objekat.lokacija.ulica" required>
        
        <label>Broj:</label>
        <input type="text" v-model="objekat.lokacija.broj" required>
        
        <label>Logo URL:</label>
        <input type="text" v-model="objekat.logoUrl" required>
        
      <label>Menadžer:</label>
        <select v-model="objekat.menadzer" required>
          <option v-for="menadzer in slobodniMenadzeri" :value="menadzer">{{ menadzer.ime }}</option>
        </select> 
        
        <button type="submit">Kreiraj objekat</button>
      </form>
    </div>
    </div>
  `,
    mounted() {
		axios.get('rest/korisnici/prijava')
      .then(response => (this.korisnik = response.data));
	
        
    this.ucitajSlobodneMenadzere(); // Pozivamo metodu za učitavanje slobodnih menadžera prilikom inicijalizacije komponente
  },
  methods: {
    ucitajSlobodneMenadzere() {
       axios
      .get("rest/korisnici/traziSlobodne")
      .then(response => {
        this.slobodniMenadzeri = response.data;
    });
    },
   kreirajNoviObjekat() {
      toast('Usao je u registraciju rent a car objekta');
   this.objekat.lokacija.postanskiBroj = parseInt(this.objekat.lokacija.postanskiBroj);
   this.objekat.lokacija.geografskaDuzina = parseFloat(this.objekat.lokacija.geografskaDuzina);
   this.objekat.lokacija.geografskaSirina = parseFloat(this.objekat.lokacija.geografskaSirina);
  axios.post('rest/objekti/registruj', this.objekat)
  .then(response => {
    if (response.data === true) {
		toast('USPIJEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEH');
      console.log('SVE ok uspijesno je registrovan')
    } else {
		console.log('NESTO NIJE U REDU ')
      toast('GRESKA');
    }
  });
   }
    }
  
});