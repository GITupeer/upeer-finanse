import Vue from 'vue'
import Vuex from 'vuex'
import Router from '../router/index';
import _ from 'lodash';

Vue.use(Vuex)

const state = {
	httpServer: "http://mymobileadmin.com/exitportal/msapi/",
	exitHttpServer: "https://alpha-appapi.exitrealty.com/",
	docLink: 'https://alpha-be.exitrealty.com',
	// httpServer: 'http://api.enjoinit.dev',
	// webSocketServer: 'http://127.0.0.1:6001',
	firstLoad : true,
	firstTimeLogged: false,
	user: null,
	mbcInfo: null,
	user_token: null,
	deviceReady: false,
	internetOnline : false,
	routeInfo : null,
	exploreQuery: null,
	show_tutorial : 0,
	properties: null,
	totalListings: 0,
	lastNotification: null,
	notificationToken: null,
	HWID: null,
	leadsNo : null, 
	versionPath: 'http://alpha-app.exitrealty.com/',
	// versionPath: 'http://localhost/',
	LeadCounter: {
		new_contact_count: null,
		new_lead_count: null,
		new_property_count: null
	},
	userDB: {},
	network: 'online',
	contactLead: {},
	esterEgg_1: 0,
	esterEgg_2: 0,
	todolist: [],
	todoSpiner: false, 
	blankPageData: '',
	documentsObj: [],
	verifyPage: false,
	verifyTime: '',
	sideNav: false
}

const mutations = {
	sideNav(state){
		state.sideNav = !state.sideNav;
		console.log(state.sideNav);
	},
	updateUser(state, payload) {
			state.user = payload.user;
			localStorage['user'] = JSON.stringify(payload.user);
			if (payload.user.hasOwnProperty('AccessToken') && payload.user.AccessToken != '') {
			state.user_token = payload.user.AccessToken;
			localStorage['user_token'] = payload.user.AccessToken;
		}
	},
	loadUserFromStorage(state) {
		if (localStorage.hasOwnProperty('user')) {
			state.user = JSON.parse(localStorage['user']);
		}

		if (localStorage.hasOwnProperty('user_token')) {
			state.user_token = localStorage['user_token'];
		}

		if (localStorage.hasOwnProperty('firebase_token')) {
			state.notificationToken = localStorage['firebase_token'];
		}

		if (localStorage.hasOwnProperty('show_tutorial')) {
			state.show_tutorial = JSON.parse(localStorage['show_tutorial']);
		}

		if (localStorage.hasOwnProperty('mbc_info')) {
			state.mbcInfo = JSON.parse(localStorage['mbc_info']);
		}
	},
	logOutUser(state) {

		state.firstLoad = true;
		state.firstTimeLogged = false;
		state.user = null;
		state.mbcInfo = null;
		state.user_token = null;
		state.deviceReady = false;
		state.internetOnline = false;
		state.routeInfo = null;
		state.exploreQuery = null;
		state.show_tutorial = 0;
		state.properties = null;

		for(var index in localStorage){
			delete localStorage[index];
		}

		Router.push({name: 'Login'});
	},
	updateNetwork(state, payload) {
		state.network = payload.network;
	},
	updateVerifyPage(state, payload) {
		state.verifyPage = payload.verifyPage;
	},
	updateVerifyTime(state, payload) {
		state.verifyTime = payload.verifyTime;
	},

	updateDocuments(state, payload) {
		state.documentsObj = payload.documentsObj;
	},
	updateToDoSpiner(state, payload) {
		state.todoSpiner = payload.todoSpiner;
	},
	updatetodolist(state, payload) {
		state.todolist = payload.todolist;
	},
	updatetodolistItem(state, payload) {
		state.todolist[payload.index].ID = payload.ID;
	},
	updateEsterEGG1(state, payload) {
		state.esterEgg_1 = payload.esterEgg_1;
	},
	updateEsterEGG2(state, payload) {
		state.esterEgg_2 = payload.esterEgg_2;
	},	
	updateContactLeadList(state, payload) {
		state.contactLead = payload.contactLead;
	},
	updateAppCopy(state, payload) {
		state.app_copy = payload.app_copy;
	},
	updateUserDB(state, payload) {
		state.userDB = payload.userDB;
	},
	updateMbc(state, payload) {
		state.mbcInfo = payload.mbc;
		localStorage['mbc_info'] = JSON.stringify(payload.mbc);
	},
	firstTimeLogged(state) {
		state.firstTimeLogged = false;
	},
	showTutorial(state, payload) {
		localStorage['show_tutorial'] = payload.show;
		state.show_tutorial = payload.show;
	},
	updateProperties(state, payload) {
		state.properties = payload.properties;
	},
	updateTotalListings(state, payload) {
		state.totalListings = payload.totalListings;
	},
	updateDeviceReady (state){
		state.deviceReady = true;
	},
	updateBlankPageData (state, payload){
		state.blankPageData = payload.customData
	},
	internetStatus (state,payload) {
		state.internetOnline = payload.status
	},
	updateLastNotification(state,payload) {
		state.lastNotification = payload.last
	},
	updateNotificationToken(state,payload) {
		localStorage['firebase_token'] = payload.token;
		state.notificationToken = payload.token
	},
	updateLeadCounter(state,payload) {
		state.LeadCounter.new_contact_count = payload.new_contact_count + state.LeadCounter.new_contact_count
		state.LeadCounter.new_lead_count = payload.new_lead_count + state.LeadCounter.new_lead_count
		state.LeadCounter.new_property_count = payload.new_property_count + state.LeadCounter.new_property_count
	},
	updateLeadCounterpLeadStream(state,payload) {
		state.LeadCounter.new_lead_count = 0
	},
	updateLeadCounterpContact(state,payload) {
		state.LeadCounter.new_contact_count = 0
	}
}

const actions = {
	loadUserFromStorage (context){
		context.commit('loadUserFromStorage')
	},
	logOutUser(context){
		context.commit('logOutUser')
	},
	updateDeviceReady(context){
		context.commit('updateDeviceReady')
	},
	internetStatus(context, payload){
		context.commit('internetStatus',payload)
	},
	updateLastNotification(context, payload){
		context.commit('updateLastNotification',payload)
	},
	updateNotificationToken(context, payload){
		context.commit('updateNotificationToken',payload)
	},
};

const getters = {
	getUserToken() {
		return state.user_token;
	}
}

const store = new Vuex.Store({
	state,
	mutations,
	getters,
	actions
})

//===================== CORDOVA HOOKS asociated with STORE ================//

document.addEventListener("deviceready", () => {

//============== change status to device ready ======//
	store.dispatch('updateDeviceReady');

	cordova.plugin.http.acceptAllCerts(true, function() {
		}, function() {
	});

});

//============== change Internet status offline ======//

document.addEventListener("offline", () => {
	store.dispatch('internetStatus', {
		status: false
	});
}, false);

//============== change Internet status online ======//

document.addEventListener("online", () => {
	store.dispatch('internetStatus', {
		status: true
	});
}, false);

export default store
