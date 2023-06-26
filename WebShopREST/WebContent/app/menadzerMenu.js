Vue.component("menadzer-menu", {
  template: `
    <div>
      <ul class="menu-bar">
        <li><button v-on:click="pocetnaClick">Pocetna</button</li>
        <li><button v-on:click="rentACarClick">Vas objekat</button</li>
        <li class="right"><button v-on:click="logOutClick">Odjava</button></li>
        <li class="right"><button v-on:click="profileClick">Nalog</button></li>
        <li class="right"><p>{{korisnik.ime}} {{korisnik.prezime}}</p></li>
      </ul>
    </div>
  `,
  props: ['korisnik'],
  methods: {
    pocetnaClick() {
     this.$router.push('/pocetna-menadzer');
    },
    profileClick(){
		this.$router.push('/profil-menadzer');
	},
	logOutClick(){
		this.$router.push('/');
	},
	rentACarClick(){
		this.$router.push('/renta-car-menadzer');
	}
  }
});
