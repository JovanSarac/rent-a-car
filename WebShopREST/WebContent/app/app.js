const Login = { template: '<login></login>'}
const Reqistracija = { template: '<registracija></registracija>' }
const PocetnaStranica = { template: '<pocetna-stranica></pocetna-stranica>' }

const router = new VueRouter({
	mode: 'hash',
	routes: [
		{ path: '/', component: Login},
		{ path: '/registracija', component: Reqistracija},
		{ path: '/pocetna', component: PocetnaStranica}
	] 
}	
);

var app = new Vue({
	router,
	el: '#pagecontent'
});