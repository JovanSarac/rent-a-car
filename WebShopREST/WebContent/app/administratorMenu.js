Vue.component("administrator-menu", {
  template: `
    <div>
      <ul class="menu-bar">
        <li><button v-on:click="pocetnaClick">Početna</button></li>
        <li><button v-on:click="listaKorisnikaClick">Korisnici</button></li>
        <li><button v-on:click="napraviObjekatClick">Otvori novi objekat</button></li>
        <li class="right"><button v-on:click="logOutClick">Odjava</button></li>
        <li class="right"><button v-on:click="profileClick">Nalog</button></li>
        <li class="right"><p>{{ korisnik.ime }} {{ korisnik.prezime }}</p></li>
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
    },
    napraviObjekatClick() {
      this.$router.push('/novi-objekat');
    },
    logOutClick(){
		this.$router.push('/');
	}
  }
});
