const Pocetnastranica = {template: "<pocetna-stranica></pocetna-stranica>"}
const Profil = {template: "<profil></profil>"}

const router = new VueRouter({
    mode: 'hash',
    routes: [
        { path: '/', component: Pocetnastranica},
        {path: '/profil', component: Profil}
    ]
});


var app = new Vue({
    router,
    el: "#maincontent"
});