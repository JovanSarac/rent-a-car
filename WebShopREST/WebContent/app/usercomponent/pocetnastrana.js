Vue.component("pocetna-stranica", {
	data: function () {
		    return {
				korisnik :{id: null, korisnickoIme: null, lozinka:null, ime:null, prezime:null, pol:null, datumRodjenja:null},
			}
	},
	template: ` 
<div >
    <h1>Dobro dosli na pocetnu stranicu</h1>
</div>
`,
	
	methods : {
			
	}
});