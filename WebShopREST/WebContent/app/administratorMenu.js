Vue.component("administrator-menu", {
  template: `
    <div>
      <ul class="menu-bar">
        <li><a v-on:click="profileClick">Početna</a></li>
        <li><a v-on:click="listaKorisnikaClick">Korisnici</a></li>
        <li class="right"><a href="/WebShopREST/#/">Odjava</a></li>
        <li class="right"><p>{{korisnik.ime}} {{korisnik.prezime}}</p></li>
      </ul>
    </div>
  `,
  props: ['korisnik'],
  methods: {
    profileClick() {
      this.$router.push('/pocetna-administrator');
    },
    listaKorisnikaClick() {
	  this.$router.push('/pregled-korisnika');
	}
    
  }
});
