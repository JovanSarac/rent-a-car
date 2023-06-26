const Login = { template: '<login></login>'}
const Reqistracija = { template: '<registracija></registracija>' }
const Neulogovani = {template: '<neulogovani></neulogovani>'}
const PocetnaKupac = {template: '<pocetna-kupac></pocetna-kupac>'}
const ProfilKupac = {template: "<profil-kupac></profil-kupac>"}
const PrikazRentaCaraKupac = {template: "<show-rentacar-kupac></show-rentacar-kupac>"}
const PocetnaAdministrator = {template: "<pocetna-administrator></pocetna-administrator>"}
const ProfilAdministrator = {template: "<profil-administrator></profil-administrator>"}
const PocetnaMenadzer = {template: '<pocetna-menadzer></pocetna-menadzer>'}
const ProfilMenadzer = {template: "<profil-menadzer></profil-menadzer>"}
const RentACarMenadzer = {template: "<renta-car-menadzer></renta-car-menadzer>"}
const DodajVoziloMenadzer = {template: "<add-vehicle-manager></add-vehicle-manager>"}
const PrikazVozilaMenadzer = {template: "<show-vehicle></show-vehicle>"}
const PrikazRentaCaraMenadzer = {template: "<show-rentacar-manager></show-rentacar-manager>"}
const SviKorisnici = { template: "<pregled-korisnika></pregled-korisnika>" }

const router = new VueRouter({
	mode: 'hash',
	routes: [
		{ path: '/', component: Neulogovani},
		{ path: '/login', component: Login},
		{ path: '/registracija', component: Reqistracija},
		{ path: '/pocetna-kupac', component: PocetnaKupac},
		{ path: '/show-rentacar-kupac/:objekatId', name: 'show-rentacar-kupac', component: PrikazRentaCaraKupac},
		{ path: '/pocetna-administrator', component: PocetnaAdministrator},
		{ path: '/profil-kupac', component: ProfilKupac},
		{ path: '/profil-administrator', component: ProfilAdministrator},
		{ path: '/pocetna-menadzer', component: PocetnaMenadzer},
		{ path: '/profil-menadzer', component: ProfilMenadzer},
		{ path: '/renta-car-menadzer', component: RentACarMenadzer},
		{ path: '/add-vehicle-manager', component: DodajVoziloMenadzer},
		{ path: '/show-vehicle/:vehicleId', name: 'show-vehicle', component: PrikazVozilaMenadzer},
		{ path: '/show-rentacar-manager/:objekatId', name: 'show-rentacar-manager', component: PrikazRentaCaraMenadzer},
		{ path:  '/pregled-korisnika', component: SviKorisnici}
		
		
	] 
}	
);

var app = new Vue({
	router,
	el: '#pagecontent'
});