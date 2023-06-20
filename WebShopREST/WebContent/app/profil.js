Vue.component("profil", {
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
    <h1>Prikaz podataka vaseg profila:</h1>
    <table border="1">
        <tr>
            <th>Podaci</th>
            <th>Vrednost</th>
        </tr>
        <tr>
            <td>Ime</td>
            <td id="ime">{{korisnik.ime}}</td>
        </tr>
        <tr>
            <td>Prezime</td>
            <td id="prezime">{{korisnik.prezime}}</td>
        </tr>
        <tr>
            <td>Korisnicko ime</td>
            <td id="korisnicko-ime">{{korisnik.korisnickoIme}}</td>
        </tr>
        <tr>
            <td>Datum rodjenja</td>
            <td id="datum-rodjenja">{{korisnik.datumRodjenja}}</td>
        </tr>
        <tr>
            <td>Pol</td>
            <td id="pol">{{korisnik.pol}}</td>
        </tr>
    </table>
    <a :href="nalogURL">Izmeni podatke sa profila</a>
</div>
`,
	mounted(){
		console.log('rest/korisnici/prijava')
		axios.get('rest/korisnici/prijava')
		.then(response=>(this.korisnik = response.data))},
	methods : {		
	}
});