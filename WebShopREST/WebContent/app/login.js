Vue.component("login", {
	data: function () {
		    return {
				korisnik : {korisnickoIme:null, lozinka:null}
			}
	},
	template: ` 
<div class="container">
    <h2>Prijava</h2>
    <form  v-on:submit="prijava"> 
      <label for="koriscnikoIme">Korisničko ime:</label>
      <input type="text" name="korisnickoIme" v-model="korisnik.korisnickoIme">
      
      <label for="lozinka">Lozinka:</label>
      <input type="password" name="lozinka" v-model="korisnik.lozinka">
      
      <input type="submit" value="Prijavi se">
    </form>
    <p>Nemate nalog? <a href="#/Registracija">Registracija</a></p>
    <p hidden style="color:red" name="porukagreska">Ne postoji nalog sa unijetim podacima!</p>
</div>
`
	, 
	methods : {
		prijava:function(event){
			let uspjeh =  true;
			
			let korisnickoIme = document.getElementsByName("korisnickoIme")[0];
			korisnickoIme.style.background = "white";
			if(!korisnickoIme.value){
				korisnickoIme.style.background = "red";
				uspjeh = false;
			}
			
			let lozinka = document.getElementsByName("lozinka")[0];
			lozinka.style.background = "white";
			if(!lozinka.value){
				lozinka.style.background = "red";
				uspjeh = false;
			}
			if(!uspjeh){
				event.preventDefault();
				return false;
			}
			if(uspjeh){
				event.preventDefault();
				console.log('usao u prijavu')
				axios.post('/WebShopREST/rest/korisnici/prijava/' , this.korisnik)
				.then(response => {
					//if(response.status === 200){						
						//document.getElementsByName('porukagreska')[0].hidden = false;
						//router.push(`pocetna/`+ this.korisnik.korisnickoIme);	
						console.log(response);
                        window.alert(["Uspjesna prijava"]);
                        window.location.href = response.data;
                        console.log(window.location.href);			
					//}else{
						//document.getElementsByName('porukagreska')[0].hidden = false;
					//}
					})
		            .catch(error => {
						console.error(error);
						});
			}
			return uspjeh;
		}
	}	
			
			
		
});