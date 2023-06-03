Vue.component("registracija", {
	data: function () {
		    return{
				noviKorisnik:{id: null, korisnickoIme: null, lozinka:null, ime:null, prezime:null, pol:null, datumRodjenja:null}
			}
	},
	template: ` 
<div>
	<h1>Registracija korisnika</h1>
	<form action="/WebShopREST/rest/korisnici/registruj" method="post" v-on:submit="validacija">
            <table>
                <tr>
                    <td align="left">
                        <label>*Korisnicko ime: </label>
                    </td>
                    <td align="left">
                        <input name="korIme" type="text" v-model="noviKorisnik.korisnickoIme">
                    </td>
                </tr>
                <tr>
                    <td align="left">
                        <label>*Lozinka: </label>
                    </td>
                    <td align="left">
                        <input name="loz1" type="password" v-model="noviKorisnik.lozinka" >
                    </td>
                </tr>
                <tr>
                    <td align="left">
                        <label>*Ponovi lozinku: </label>
                    </td>
                    <td align="left">
                        <input name="loz2" type="password" >                        
                    </td>
                    <td>
                        <p name="provloz" hidden style="color:red">Ponovljena lozinka nije ista</p>
                    </td>
                </tr>
                <tr>
                    <td align="left">
                        <label>*Ime: </label>
                    </td>
                    <td align="left">
                        <input name="ime" type="text" v-model="noviKorisnik.ime"  >
                    </td>
                </tr>
                <tr>
                    <td align="left">
                        <label>*Prezime: </label>
                    </td>
                    <td align="left">
                        <input name="prezime" type="text" v-model="noviKorisnik.prezime"  >
                    </td>
                </tr>
                <tr>
                    <td align="left">
                        <label>Pol: </label>
                    </td>
                    <td align="left">
                        <select name="pol" v-model="noviKorisnik.pol" >
                            <option disabled selected value=""></option>
                            <option value="Musko">Musko</option>
                            <option value="Zensko">Zensko</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td align="left">
                        <label>*Datum rodjenja: </label>
                    </td>
                    <td align="left">
                        <input name="datumrodj" type="date" v-model="noviKorisnik.datumRodjenja"  >
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td align="right">
                        <input type="submit" value="Registruj se"></button>
                    </td>
                </tr>
            </table>
       </form>
</div>		  
`
	, 
	methods : {
		validacija:function(event){
			let uspjeh =  true;
			
			let korisnickoIme = document.getElementsByName("korIme")[0];
			korisnickoIme.style.background = "white";
			if(!korisnickoIme.value){
				korisnickoIme.style.background = "red";
				uspjeh = false;
			}
			
			let lozinka = document.getElementsByName("loz1")[0];
			lozinka.style.background = "white";
			if(!lozinka.value){
				lozinka.style.background = "red";
				uspjeh = false;
			}
			
			let lozinkaponovo = document.getElementsByName("loz2")[0];
			lozinkaponovo.style.background = "white";
			if(!lozinkaponovo.value){
				lozinkaponovo.style.background = "red";
				uspjeh = false;
			}			
			
			let ime = document.getElementsByName("ime")[0];
			ime.style.background = "white";
			if(!ime.value){
				ime.style.background = "red";
				uspjeh = false;
			}
			let prezime = document.getElementsByName("prezime")[0];
			prezime.style.background = "white";
			if(!prezime.value){
				prezime.style.background = "red";
				uspjeh = false;
			}
			let pol = document.getElementsByName("pol")[0];
			pol.style.background = "white";
			if(!pol.value){
				pol.style.background = "red";
				uspjeh = false;
			}
			let datumrodjenja = document.getElementsByName("datumrodj")[0];
			datumrodjenja.style.background = "white";
			if(!datumrodjenja.value){
				datumrodjenja.style.background = "red";
				uspjeh = false;
			}
			
			let ploz = document.getElementsByTagName('p')[0];
			if(lozinkaponovo.value != lozinka.value){
				ploz.hidden=false;
				uspjeh = false;
			}else{
				ploz.hidden = true;	
			}
			
			if(!uspjeh){
				event.preventDefault();
				return false;
			}
			if(uspjeh){
				event.preventDefault();
				console.log("usao u if");
				axios.post('rest/korisnici/registruj', this.noviKorisnik)
				.then(response=>{
					if (response.data === true) {
      					toast('Korisnik ' + this.noviKorisnik.korisnickoIme + ' je uspješno registrovan');
   				    }else{
						toast('Korisnik sa korisnickim imenom ' + this.noviKorisnik.korisnickoIme + ' vec postoji, pa nije moguce izvrsiti registraciju!');	 
					}
				}).catch(error => {
                        console.error(error);
                    });
            }
			
			return uspjeh;
		}
	}
});