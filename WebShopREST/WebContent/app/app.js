const Login = { template: '<login></login>'}
const Reqistracija = { template: '<registracija></registracija>' }
const Neulogovani = {template: '<neulogovani></neulogovani>'}
const PocetnaKupac = {template: '<pocetna-kupac></pocetna-kupac>'}
const ProfilKupac = {template: "<profil-kupac></profil-kupac>"}
const PocetnaAdministrator = {template: "<pocetna-administrator></pocetna-administrator>"}
const ProfilAdministrator = {template: "<profil-administrator></profil-administrator>"}
const PocetnaMenadzer = {template: '<pocetna-menadzer></pocetna-menadzer>'}
const ProfilMenadzer = {template: "<profil-menadzer></profil-menadzer>"}
const RentACarMenadzer = {template: "<renta-car-menadzer></renta-car-menadzer>"}
const SviKorisnici = { template: "<pregled-korisnika></pregled-korisnika>" }

const router = new VueRouter({
	mode: 'hash',
	routes: [
		{ path: '/', component: Neulogovani},
		{ path: '/login', component: Login},
		{ path: '/registracija', component: Reqistracija},
		{ path: '/pocetna-kupac', component: PocetnaKupac},
		{ path: '/pocetna-administrator', component: PocetnaAdministrator},
		{ path: '/profil-kupac', component: ProfilKupac},
		{ path: '/profil-administrator', component: ProfilAdministrator},
		{ path: '/pocetna-menadzer', component: PocetnaMenadzer},
		{ path: '/profil-menadzer', component: ProfilMenadzer},
		{ path: '/renta-car-menadzer', component: RentACarMenadzer},
		{ path:  '/pregled-korisnika', component: SviKorisnici}
		
		
	] 
}	
);

var app = new Vue({
	router,
	el: '#pagecontent'
});