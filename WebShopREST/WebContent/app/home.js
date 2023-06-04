Vue.component("pocetna-stranica", {
	data: function () {
		    return {
				korisnik :{id: null, korisnickoIme: null, lozinka:null, ime:null, prezime:null, pol:null, datumRodjenja:null},
			}
	},
	computed: {
    nalogURL() {
      return `/WebShopREST/rest/korisnici/${this.korisnik.id}`;
    }
  },
	template: ` 
<div >
    <ul class="menu-bar">
    	<li><a href="">Pocetna</a></li>
        <li><a :href="nalogURL">Nalog</a></li>
        <li class="right"><a href="/WebShopREST/#/">Odjava</a></li>
        <li class="right"><p>{{korisnik.ime}} {{korisnik.prezime}}</p></li>
    </ul>
</div>
`,
	mounted(){
		console.log('rest/korisnici/prijava/' + this.$route.params.korisnickoIme)
		axios.get('rest/korisnici/prijava/' + this.$route.params.korisnickoIme)
		.then(response=>(this.korisnik = response.data))},
	
	methods : {
			
	}
});