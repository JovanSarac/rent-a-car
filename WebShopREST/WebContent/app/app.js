const Reqistracija = { template: '<registracija></registracija>' }

const router = new VueRouter({
	mode: 'hash',
	routes: [
		{ path: '/', component: Reqistracija},
	] 
}	
);

var app = new Vue({
	router,
	el: '#pagecontent'
});