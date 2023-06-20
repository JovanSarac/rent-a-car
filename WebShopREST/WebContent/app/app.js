const Login = { template: '<login></login>'}
const Reqistracija = { template: '<registracija></registracija>' }
const Neulogovani = {template: '<neulogovani></neulogovani>'}
const PocetnaKupac = {template: '<pocetna-kupac></pocetna-kupac>'}
const Profil = {template: "<profil></profil>"}
const PocetnaAdministrator = {template: "<pocetna-administrator></pocetna-administrator>"}
const SviKorisnici = { template: "<pregled-korisnika></pregled-korisnika>" }

const router = new VueRouter({
	mode: 'hash',
	routes: [
		{ path: '/', component: Neulogovani},
		{ path: '/login', component: Login},
		{ path: '/registracija', component: Reqistracija},
		{ path: '/pocetna-kupac', component: PocetnaKupac},
		{ path: '/pocetna-administrator', component: PocetnaAdministrator},
		{ path: '/profil', component: Profil},
		{ path:  '/pregled-korisnika', component: SviKorisnici}
		
		
	] 
}	
);

var app = new Vue({
	router,
	el: '#pagecontent'
});