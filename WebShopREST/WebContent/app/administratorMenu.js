Vue.component("administrator-menu", {
  template: `
    <div>
      <ul class="menu-bar">
        <li><button v-on:click="pocetnaClick">Početna</a></li>
        <li><button v-on:click="listaKorisnikaClick">Korisnici</a></li>
        <li class="right"><a href="/WebShopREST/#/">Odjava</a></li>
        <li class="right"><button v-on:click="profileClick">Nalog</a></li>
        <li class="right"><p>{{korisnik.ime}} {{korisnik.prezime}}</p></li>
      </ul>
    </div>
  `,
  props: ['korisnik'],
  methods: {
	pocetnaClick() {
     this.$router.push('/pocetna-administrator');
    },
    profileClick() {
      this.$router.push('/profil-administrator');
    },
    listaKorisnikaClick() {
	  this.$router.push('/pregled-korisnika');
	}
    
  }
});
