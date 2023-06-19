Vue.component("neulogovani", {
	data: function () {
		    return {
				lokacije: []
			}
			
	},
	template: ` 
<div >
   <ul class="menu-bar">
        <li><a @click="navigateToComponent">Prijavi se</a></li>
      </ul>
        <ul>
        <li v-for="lokacija in lokacije">
          {{ lokacija.id }} - {{ lokacija.adresa }} - {{ lokacija.geografskaDuzina }} - {{ lokacija.geografskaSirina }}
        </li>
      </ul>
      </div>
`, 

      mounted() {
    axios
      .get("rest/korisnici/lokacije")
      .then(response => {
        this.lokacije = response.data;
        console.log("nasao sam lokacije, to su: ");	
      })
      .catch(error => {
        console.error(error);
      });
	},
	  methods: {
    navigateToComponent() {
      this.$router.push('/login');
    }
  },		
			
		
});