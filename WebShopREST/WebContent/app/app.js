const Login = { template: '<login></login>'}
const Reqistracija = { template: '<registracija></registracija>' }
const Neulogovani = {template: '<neulogovani></neulogovani>'}
//const PocetnaStranica = { template: '<pocetna-stranica></pocetna-stranica>' }

const router = new VueRouter({
	mode: 'hash',
	routes: [
		{ path: '/', component: Neulogovani},
		{ path: '/login', component: Login},
		{ path: '/registracija', component: Reqistracija},
		//{ path: '/pocetna/:korisnickoIme', component: PocetnaStranica},
	] 
}	
);

var app = new Vue({
	router,
	el: '#pagecontent'
});