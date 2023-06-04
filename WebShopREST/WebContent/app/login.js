Vue.component("login", {
	data: function () {
		    return {}
	},
	template: ` 
<div class="container">
    <h2>Prijava</h2>
    <form action="">
      <label for="koriscnikoIme">Korisničko ime:</label>
      <input type="text" name="korisnickoIme">
      
      <label for="lozinka">Lozinka:</label>
      <input type="password" name="lozinka">
      
      <input type="submit" value="Prijavi se">
    </form>
    <p>Nemate nalog? <a href="#/Registracija">Registracija</a></p>
</div>
`
	, 
	methods : {
		
	}
});