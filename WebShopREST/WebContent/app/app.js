const Login = { template: '<login></login>'}
const Reqistracija = { template: '<registracija></registracija>' }

const router = new VueRouter({
	mode: 'hash',
	routes: [
		{ path: '/', component: Login},
		{ path: '/registracija', component: Reqistracija}
	] 
}	
);

var app = new Vue({
	router,
	el: '#pagecontent'
});