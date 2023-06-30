const Login = { template: '<login></login>'}
const Reqistracija = { template: '<registracija></registracija>' }
const Neulogovani = {template: '<neulogovani></neulogovani>'}
const PocetnaKupac = {template: '<pocetna-kupac></pocetna-kupac>'}
const ProfilKupac = {template: "<profil-kupac></profil-kupac>"}
const PrikazRentaCaraKupac = {template: "<show-rentacar-kupac></show-rentacar-kupac>"}
const IznajmljivanjeKupac = {template: "<iznajmi-kupac></iznajmi-kupac>"}
const KorpaKupac = {template: "<korpa-kupac></korpa-kupac>"}
const PocetnaAdministrator = {template: "<pocetna-administrator></pocetna-administrator>"}
const ProfilAdministrator = {template: "<profil-administrator></profil-administrator>"}
const PocetnaMenadzer = {template: '<pocetna-menadzer></pocetna-menadzer>'}
const ProfilMenadzer = {template: "<profil-menadzer></profil-menadzer>"}
const RentACarMenadzer = {template: "<renta-car-menadzer></renta-car-menadzer>"}
const DodajVoziloMenadzer = {template: "<add-vehicle-manager></add-vehicle-manager>"}
const PrikazVozilaMenadzer = {template: "<show-vehicle></show-vehicle>"}
const PrikazRentaCaraMenadzer = {template: "<show-rentacar-manager></show-rentacar-manager>"}
const SviKorisnici = { template: "<pregled-korisnika></pregled-korisnika>" }
const NoviObjekat = { template: '<novi-objekat></novi-objekat>' }
const SvaIznajmljivanja = {template: '<iznajmlivanja-kupac></iznajmlivanja-kupac>'}
const AllComments = {template: '<all-comments-manager></all-comments-manager>'}
const IznajmljivanjaMenadzer = {template: '<iznajmljivanja-menadzer></iznajmljivanja-menadzer>'}

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
		{ path: '/iznajmi-kupac', component: IznajmljivanjeKupac},
		{ path: '/korpa-kupac', component: KorpaKupac},
		{ path: '/profil-administrator', component: ProfilAdministrator},
		{ path:  '/pregled-korisnika', component: SviKorisnici},
		{ path:  '/novi-objekat', component: NoviObjekat},
		{ path: '/pocetna-menadzer', component: PocetnaMenadzer},
		{ path: '/profil-menadzer', component: ProfilMenadzer},
		{ path: '/all-comments-manager', component: AllComments},
		{ path: '/renta-car-menadzer', component: RentACarMenadzer},
		{ path: '/add-vehicle-manager', component: DodajVoziloMenadzer},
		{ path: '/show-vehicle/:vehicleId', name: 'show-vehicle', component: PrikazVozilaMenadzer},
		{ path: '/show-rentacar-manager/:objekatId', name: 'show-rentacar-manager', component: PrikazRentaCaraMenadzer},
		{ path:  '/pregled-korisnika', component: SviKorisnici},
		{ path:  '/iznajmlivanja-kupac', component: SvaIznajmljivanja},
		{ path:  '/iznajmljivanja-menadzer', component: IznajmljivanjaMenadzer}
		
		
		
	] 
}	
);

var app = new Vue({
	router,
	el: '#pagecontent'
});