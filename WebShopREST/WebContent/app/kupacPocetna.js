Vue.component("pocetna-kupac", {
  data: function () {
    return {
      korisnik: { id: null, korisnickoIme: null, lozinka: null, ime: null, prezime: null, uloga: null, pol: null, datumRodjenja: null, vrstaKupca: null },
    }
  },
  template: `
    <div>
      <kupac-menu :korisnik="korisnik"></kupac-menu>
      <div class="profile">
        <h2>Profil korisnika</h2>
        <div class="profile-info">
          <p><strong>Korisničko ime:</strong> {{ korisnik.korisnickoIme }}</p>
          <p><strong>Ime:</strong> {{ korisnik.ime }}</p>
          <p><strong>Prezime:</strong> {{ korisnik.prezime }}</p>
          <p><strong>Uloga:</strong> {{ korisnik.uloga }}</p>
          <p><strong>Pol:</strong> {{ korisnik.pol }}</p>
          <p><strong>Datum rođenja:</strong> {{ korisnik.datumRodjenja }}</p>
        </div>
      </div>
    </div>
  `,
  mounted() {
    console.log('rest/korisnici/prijava');
    axios.get('rest/korisnici/prijava')
      .then(response => (this.korisnik = response.data));
  }
});
