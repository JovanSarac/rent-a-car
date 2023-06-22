Vue.component("kupac-menu", {
  template: `
    <div>
      <ul class="menu-bar">
        <li><button v-on:click="pocetnaClick">Pocetna</button</li>
        <li class="right"><button v-on:click="logOutClick">Odjava</button></li>
        <li class="right"><button v-on:click="profileClick">Nalog</button></li>
        <li class="right"><p>{{korisnik.ime}} {{korisnik.prezime}}</p></li>
      </ul>
    </div>
  `,
  props: ['korisnik'],
  methods: {
    pocetnaClick() {
     this.$router.push('/pocetna-kupac');
    },
    profileClick(){
		this.$router.push('/profil-kupac');
	},
	logOutClick(){
		this.$router.push('/');
	}
  }
});
