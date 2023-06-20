Vue.component("kupac-menu", {
  template: `
    <div>
      <ul class="menu-bar">
        <li><a v-on:click="profileClick">Nalog</a></li>
        <li class="right"><a href="/WebShopREST/#/">Odjava</a></li>
        <li class="right"><p>{{korisnik.ime}} {{korisnik.prezime}}</p></li>
      </ul>
    </div>
  `,
  props: ['korisnik'],
  methods: {
    profileClick() {
     this.router.push('/pocetna-kupac');
    },
  }
});
