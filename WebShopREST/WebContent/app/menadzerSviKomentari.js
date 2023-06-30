Vue.component("all-comments-manager", {
  data: function () {
    return {
      korisnik: { id: null, korisnickoIme: null, lozinka: null, ime: null, prezime: null, uloga: null, pol: null, datumRodjenja: null, vrstaKupca: null },
      objekat: { id: null, naziv: null, vozila: [], radnoVremeOd: null, radnoVremeDo: null, status: null, lokacija: null, logoUrl: null, ocena: null, menadzer: null },
      komentari: []
    }
  },

  template: `
    <div>
      <menadzer-menu :korisnik="korisnik"></menadzer-menu> 
      <p v-on:click="BackClick" style="text-decoration: underline; color: #3498db; cursor: pointer;">Vrati se nazad na prikaz objekta</p>

      <div class="objects-container">
        <div v-for="komentar in komentari" :key="komentar.id" class="object-card">
          <div class="object-details">
            <h3>{{ komentar.korisnickoIme }}</h3>
            <p>Komentar: {{ komentar.komentar }}</p>
            <p>Ocjena: {{ komentar.ocjena }}</p>
            <button
              class="comment-button"
              :class="{ 'comment-button-right': true }"
              :style="{ backgroundColor: komentar.odobreno ? 'red' : 'green' }"
              v-on:click="onClickButton(komentar)"
            >
              {{ komentar.odobreno ? 'Sakrij' : 'Odobri' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,

  mounted() {
    axios.get('rest/korisnici/prijava')
      .then(response => {
        this.korisnik = response.data;
        axios.get('rest/objekti/nadjiMenadzerov', {
          params: {
            korisnikId: this.korisnik.id
          }
        })
          .then(response => {
            this.objekat = response.data;
            axios.get('rest/komentari/' + this.objekat.id)
              .then(response => {
                this.komentari = response.data;
              })
              .catch(error => {
                console.error(error);
              });
          })
          .catch((error) => {
            console.error(error);
          });
      });
  },

  methods: {
    onClickButton(komentar) {
      if (komentar.odobreno) {
           komentar.odobreno = false; 
         axios.put('rest/komentari/izmenikomentar', komentar)
                .then(response => {
                  console.log("Sakriven je");
                })
                .catch(error => {
                  console.error(error);
                });
        console.log("Sakriven je");
      } else {
		  komentar.odobreno = true;
        axios.put('rest/komentari/izmenikomentar', komentar)
                .then(response => {
                 console.log("Odobreno");
                })
                .catch(error => {
                  console.error(error);
                });
        console.log("Odobreno");
      }
    },

    BackClick() {
      this.$router.push('/renta-car-menadzer');
    }
  }
});
