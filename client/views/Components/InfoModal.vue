<template>
	<transition name="modal">
		<div class="modal-overlay" v-show="show" @click="hideModal">

			<DetailsModal v-if="detailsModal" :show="show" :detailsModal="detailsModal" :customDataProp="customDataProp" @close="closeModal"></DetailsModal>

			<DefaultModal v-if="defaultModal" :show="show" :defaultModal="defaultModal" :customData="customData" @close="closeModal"></DefaultModal>

			<NewContactModal v-if="newContactModal" :show="show" :newContactModal="newContactModal" :customData="customData" @close="closeModal"></NewContactModal>

			<VanityCodeModal v-if="vanityCodeModal" :show="show" :vanityCodeModal="vanityCodeModal" :customData="customData" @close="closeModal"></VanityCodeModal>

			<OfferDetailsModal v-if="offerDetailsModal" :show="show" :offerDetailsModal="offerDetailsModal" :customData="customData" @close="closeModal"></OfferDetailsModal>

			<AgentDetailsModal v-if="agentDetailsModal" :show="show" :agentDetailsModal="agentDetailsModal" :customData="customData" @close="closeModal" ></AgentDetailsModal>

			<SupportModal v-if="supportModal" :show="show" :supportModal="supportModal" :customData="customData" @close="closeModal"></SupportModal>

			<ToDoModal v-if="toDoModal" :show="show" :toDoModal="toDoModal" @close="closeModal"></ToDoModal>

		</div>
	</transition>
</template>

<script>

import Vue from 'vue';
import Network from './../../assets/js/network'

import DefaultModal from './Modals/DefaultModal'
import ToDoModal from './Modals/ToDoModal'
import SupportModal from './Modals/SupportModal'
import AgentDetailsModal from './Modals/AgentDetailsModal'
import OfferDetailsModal from './Modals/OfferDetailsModal'
import VanityCodeModal from './Modals/VanityCodeModal'
import NewContactModal from './Modals/NewContactModal'
import DetailsModal from './Modals/DetailsModal'


export default {
	name: 'Modal',
	props: ['infoonly'], //?? needed?
	components: {
		DefaultModal, ToDoModal, SupportModal, AgentDetailsModal, OfferDetailsModal, VanityCodeModal, NewContactModal,  DetailsModal
	},
	data () {
		return {
			//modals:
			show: false,
			defaultModal: '',
			toDoModal: false,
			supportModal: false, 
			agentDetailsModal: false,
			offerDetailsModal: false,
			vanityCodeModal: false,
			newContactModal: false,
			detailsModal: false,

			//other

			infoState:false, //??
			customData: '', 
			customDataProp: '',
			spinner: false,

			// contactsModal: '',
			// data: '',//?
			// LeadContact_editDetailsActive: false,
			// LeadContact_editActive: false,
			// LeadContact_editObject: {
			// 	FirstName: '',
			// 	ID: '',
			// 	LastName: '',
			// 	RecordVersion: '',
			// 	Title: ''
			// },
			// currentSelected: -1,
			// currentIndexID: -1,
			// model_editDetails: {
			// 	ContactMethodCategoryName: "",
			// 	ContactMethodIsPrimary: "",
			// 	ContactMethodLabel: "",
			// 	ContactMethodValue: "",
			// 	ID: "",
			// 	ContactMethodCategoryID: '',
			// 	LeadContact_methodType: 0,
			// },
			// LeadContact_update_btn: false,
			// LeadContact_errors: {},
		}
	},
	methods: {
		closeModal(){
			this.show = false; 
			this.defaultModal = false;
			this.toDoModal = false;
			this.supportModal = false;
			this.agentDetailsModal = false;
			this.offerDetailsModal = false;
			this.vanityCodeModal = false;
			this.newContactModal = false;
			this.detailsModal = false;
			this.customData = '';
		},
		hideModal(e){ 
			if (e.target.className === 'modal-overlay'){
				this.closeModal()
			}
		},
		showModalDefault(modal) {
			this.show = true;
			this.defaultModal = true
			this.customData = modal;
		},
		showToDoModal(){
			this.show = true;
			this.toDoModal = true
		},
		showSupportModal(val){
			this.show = true; 
			this.supportModal = true;
			this.customData = val;
		},
		showAgentDetailsModal(val){
			this.show = true; 
			this.agentDetailsModal = true; 
			this.customData = val;
		},
		showOfferDetailsModal(val){
			this.show=true
			this.offerDetailsModal = true
			this.customData = val
		},
		hideOfferDetailsModal(){ //sprawdzic to jeszcze przed skasowaniem
			this.$store.commit('updateBlankPageData', {
                    customData: this.customData //???
                })
			this.show = false
			this.offerDetailsModal = false
			this.customData = ''
		},
		showVanityCodeModal(vanityCode){
			this.show = true;
			this.vanityCodeModal = true
			this.customData = vanityCode;
		},
		showNewContactModal() {
			this.show = true
			this.newContactModal = true
		},

		showModalDetails(val){
			this.show = true; 
			this.detailsModal = true;
			this.customDataProp = val;
			// this.customData = val.response;

			// this.phoneEmailGeneral(); //???
			
			// //move to mounted?
			// this.contactsModal = val.contacts;
			// this.currentSelected = val.currentSelected;

			// this.LeadContact_editObject.FirstName = this.customData.FirstName;
			// this.LeadContact_editObject.ID = this.customData.ID;
			// this.LeadContact_editObject.LastName = this.customData.LastName;
			// this.LeadContact_editObject.RecordVersion = this.customData.RecordVersion;
			// this.LeadContact_editObject.Title = this.customData.Title;

		},

		// LeadContact_deleteContact (id){
			// 	// https://alpha-appapi.exitrealty.com/API/Contact/WebAPI_DeleteContactMethod?contMethodID=408135

			// 		var sendData = {
			// 			contMethodID: id
			// 		}

			// 		Network.get(
			// 			Network.exitUrl,
			// 			Network.action.WebAPI_DeleteContactMethod,
			// 			sendData,
			// 			{
			// 			requestType: Network.requestType.json,
			// 				successCallback : (response) => {
			// 					this.LeadContact_getNewContact();	
			// 					this.LeadContact_editDetailInActiveMethod();
		
			// 				},
			// 				errorCallback : (response) => {
			// 					this.LeadContact_getNewContact();
			// 					this.LeadContact_editDetailInActiveMethod();
			// 				}
			// 			}
			// 		)
			// },
			// LeadContact_getNewContact() {
			// 		var sendData = {
			// 			ContactID: ''+this.customData.ID+'',
			// 			ContactMethodCategoryID: ''+this.model_editDetails.ContactMethodCategoryID+'',
			// 			ContactMethodId: ''+this.model_editDetails.LeadContact_methodType+'',
			// 			ContactMethodIsPrimary: this.model_editDetails.ContactMethodIsPrimary,
			// 			ContactMethodLabel: this.model_editDetails.ContactMethodLabel,
			// 			ContactMethodValue: this.model_editDetails.ContactMethodValue,
			// 			ID: this.model_editDetails.ID,
			// 		}

			// 		Network.post(
			// 			Network.exitUrl,
			// 			Network.action.WebAPI_InsUpdContactMethod,
			// 			sendData,
			// 			{
			// 			requestType: Network.requestType.json,
			// 				successCallback : (response) => {
			// 					var sendData = {
			// 						contID: this.customData.ID
			// 					};

			// 					Network.get(Network.exitUrl, Network.action.leadContactsDetail,sendData, {
			// 						successCallback : (response) => {
			// 							this.customData = response[0]; 
			// 							this.phoneEmailGeneral();
			// 							this.$store.state.contactLead[this.currentSelected].primary_phone = this.customData['PrimaryPhone'];
			// 						},
			// 						errorCallback : (response) => {
			// 						}
			// 					})
								
			// 					this.LeadContact_editDetailInActiveMethod();

			// 				},
			// 				errorCallback : (response) => {
			// 					this.LeadContact_editDetailInActiveMethod();
			// 				}
			// 			}
			// 		)

					
			// },
			// LeadContact_updateContact () {

			// 			if (this.model_editDetails.ContactMethodCategoryName == 'Phone'){
			// 				if (this.model_editDetails.LeadContact_methodType == 5){ this.model_editDetails.ContactMethodLabel = 'Other' }
			// 				else if (this.model_editDetails.LeadContact_methodType == 1){ this.model_editDetails.ContactMethodLabel = 'Home' }
			// 				else if (this.model_editDetails.LeadContact_methodType == 4){ this.model_editDetails.ContactMethodLabel = 'Fax' }
			// 				else if (this.model_editDetails.LeadContact_methodType == 3){ this.model_editDetails.ContactMethodLabel = 'Business' }
			// 				else if (this.model_editDetails.LeadContact_methodType == 2){ this.model_editDetails.ContactMethodLabel ='Mobile' }
			// 			}
			// 			if (this.model_editDetails.ContactMethodCategoryName == 'Email'){
			// 				if (this.model_editDetails.LeadContact_methodType == 8){ this.model_editDetails.ContactMethodLabel = 'Other' }
			// 				else if (this.model_editDetails.LeadContact_methodType == 6){ this.model_editDetails.ContactMethodLabel = 'Home' }
			// 				else if (this.model_editDetails.LeadContact_methodType == 7){ this.model_editDetails.ContactMethodLabel = 'Business' }
			// 			}


			// 			this.LeadContact_getNewContact();

			// },
			// LeadContact_editDetailActiveMethod (id){
			// 	if (id != 'addnew'){
			// 		var data = this.customData.ContactMethods[id];
			// 		this.currentIndexID = id;
			// 		this.model_editDetails.ContactMethodCategoryName = data.ContactMethodCategoryName
			// 		this.model_editDetails.ContactMethodIsPrimary = data.ContactMethodIsPrimary
			// 		this.model_editDetails.ContactMethodLabel = data.ContactMethodLabel
			// 		this.model_editDetails.ContactMethodValue = data.ContactMethodValue
			// 		this.model_editDetails.ID = data.ID

			// 		if (this.model_editDetails.ContactMethodCategoryName == 'Phone') {
			// 			this.model_editDetails.ContactMethodCategoryID = 1;
			// 		} else {
			// 			this.model_editDetails.ContactMethodCategoryID = 2;
			// 		}


			// 		if (this.model_editDetails.ContactMethodCategoryName == 'Phone'){
			// 			if (this.model_editDetails.ContactMethodLabel == 'Mobile'){ this.model_editDetails.LeadContact_methodType = 2 }
			// 			else if (this.model_editDetails.ContactMethodLabel == 'Business'){ this.model_editDetails.LeadContact_methodType = 3 }
			// 			else if (this.model_editDetails.ContactMethodLabel == 'Fax'){ this.model_editDetails.LeadContact_methodType = 4 }
			// 			else if (this.model_editDetails.ContactMethodLabel == 'Home'){ this.model_editDetails.LeadContact_methodType = 1 }
			// 			else if (this.model_editDetails.ContactMethodLabel == 'Other'){ this.model_editDetails.LeadContact_methodType = 5 }
			// 		}
			// 		if (this.model_editDetails.ContactMethodCategoryName == 'Email'){
			// 			if (this.model_editDetails.ContactMethodLabel == 'Business'){ this.model_editDetails.LeadContact_methodType = 7 }
			// 			else if (this.model_editDetails.ContactMethodLabel == 'Home'){ this.model_editDetails.LeadContact_methodType = 6 }
			// 			else if (this.model_editDetails.ContactMethodLabel == 'Other'){ this.model_editDetails.LeadContact_methodType = 8 }
			// 		}
			// 	} else {
			// 		this.currentIndexID = id;
			// 		this.model_editDetails.ContactMethodCategoryName = '';
			// 		this.model_editDetails.ContactMethodIsPrimary = '';
			// 		this.model_editDetails.ContactMethodLabel = '';
			// 		this.model_editDetails.ContactMethodValue = '';
			// 		this.model_editDetails.LeadContact_methodType = 0;
			// 		this.model_editDetails.ID = 0;
			// 	}
			// 	this.LeadContact_editDetailsActive = true;
			// },
			// LeadContact_editDetailInActiveMethod (){
			// 	this.LeadContact_editDetailsActive = false;
			// },
			// LeadContact_editActiveMethod() {
			// 	this.LeadContact_editActive = true;
			// },
			// LeadContact_editInActiveMethod() {
			// 	this.LeadContact_editActive = false;
			// 	this.$store.state.contactLead[this.currentSelected].first_name = this.LeadContact_editObject.FirstName;
			// 	this.$store.state.contactLead[this.currentSelected].last_name = this.LeadContact_editObject.LastName;

			// 		Network.post(
			// 			Network.exitUrl,
			// 			Network.action.updateContact,
			// 			this.LeadContact_editObject,
			// 			{
			// 			requestType: Network.requestType.json,
			// 				successCallback : (response) => {

			// 				},
			// 				errorCallback : (response) => {
			// 				}
			// 			}
			// 		)
		


			// },
			// iconType(type){
			// 	if(type === 'Text') {
			// 		return 'icon-messages-bubble-square-alternate'
			// 	} else if (type === 'Phone') {
			// 		return 'icon-phone'
			// 	} else if (type === 'Email') {
			// 		return 'icon-email-action-unread'
			// 	}
			// },
			// filterContactEditForm() {
			// 	this.LeadContact_errors = {
			// 		ContactMethodValue: false,
			// 		ContactMethodCategory: false
			// 	};
			// 	this.LeadContact_update_btn = true;
			// 	if (this.model_editDetails.ContactMethodValue == '' && this.model_editDetails.LeadContact_methodType != 0){
			// 		this.LeadContact_update_btn = false;
			// 		this.LeadContact_errors['ContactMethodValue'] = true;					
			// 	} 

			// 	if (this.model_editDetails.ContactMethodCategoryName == 'Phone' && (this.model_editDetails.LeadContact_methodType == 6 || this.model_editDetails.LeadContact_methodType == 7 || this.model_editDetails.LeadContact_methodType == 8)){
			// 		this.LeadContact_update_btn = false;
			// 		this.LeadContact_errors['ContactMethodCategory'] = true;				
			// 	} 

			// 	if (this.model_editDetails.ContactMethodCategoryName == 'Email' && (this.model_editDetails.LeadContact_methodType == 1 || this.model_editDetails.LeadContact_methodType == 2 || this.model_editDetails.LeadContact_methodType == 3 || this.model_editDetails.LeadContact_methodType == 4 || this.model_editDetails.LeadContact_methodType == 5)){
			// 		this.LeadContact_update_btn = false;
			// 		this.LeadContact_errors['ContactMethodCategory'] = true;				
			// 	} 

			// 	if (this.model_editDetails.ContactMethodCategoryName == 'Phone' && this.model_editDetails.ContactMethodValue.length != 10 && this.model_editDetails.LeadContact_methodType != 0){
			// 		this.LeadContact_update_btn = false;
			// 		this.LeadContact_errors['ContactMethodValue'] = true;
			// 	}


			// 	if (this.model_editDetails.LeadContact_methodType == 0){
			// 		this.LeadContact_update_btn = false;
			// 	}

			// 	if (this.model_editDetails.ContactMethodCategoryName == 'Email' && this.validate(this.model_editDetails.ContactMethodValue) == false && this.model_editDetails.LeadContact_methodType != 0){
			// 		this.LeadContact_update_btn = false;
			// 		this.LeadContact_errors['ContactMethodValue'] = true;
			// 	}
				
			// 	if (this.model_editDetails.ContactMethodCategoryName == 'Phone' && /^[0-9]+$/.test(this.model_editDetails.ContactMethodValue) == false && this.model_editDetails.LeadContact_methodType != 0) {
			// 		this.LeadContact_update_btn = false;
			// 		this.LeadContact_errors['ContactMethodValue'] = true;		
			// 	}

			// },
			// validateEmail(email) {
			// 	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			// 	return re.test(email);
			// },
			// validate(email) {
			// 	if (this.validateEmail(email)) {
			// 		return true;
			// 	} else {
			// 		return false;
			// 	}
			// }, 
			// phoneEmailGeneral(){

			// 	// if (this.customData.PrimaryEmail  == ''){
			// 	// 	var emailCounter = 0;
			// 	// 	for(var ContactMethods in this.customData.ContactMethods){
			// 	// 		console.log(this.customData.ContactMethods[ContactMethods].ContactMethodCategoryName);
			// 	// 		if (this.customData.ContactMethods[ContactMethods].ContactMethodCategoryName == 'Email' && this.customData.ContactMethods[ContactMethods].ContactMethodLabel == 'Home'){
			// 	// 			this.customData.PrimaryEmailGeneral = this.customData.ContactMethods[ContactMethods].ContactMethodValue;
			// 	// 			emailCounter++;
			// 	// 		}
			// 	// 	}
			// 	// } else {
			// 	// 	this.PrimaryEmailGeneral = this.customData.PrimaryEmail;
			// 	// }


			// 	// if (this.customData.PrimaryPhone == ''){
			// 	// 	var phoneCounter = 0;
			// 	// 	for(var ContactMethods in this.customData.ContactMethods){
			// 	// 		console.log(this.customData.ContactMethods[ContactMethods].ContactMethodCategoryName);
			// 	// 		if (this.customData.ContactMethods[ContactMethods].ContactMethodCategoryName == 'Phone' && this.customData.ContactMethods[ContactMethods].ContactMethodLabel == 'Mobile'){
			// 	// 			this.customData.PrimaryPhoneGeneral = this.customData.ContactMethods[ContactMethods].ContactMethodValue;
							
			// 	// 		}
			// 	// 		if(phoneCounter>1){
			// 	// 			this.customData.PrimaryPhoneGeneral = '';
			// 	// 		}
			// 	// 		phoneCounter++;
			// 	// 	}
			// 	// } else {
			// 	// 	this.PrimaryPhoneGeneral = this.customData.PrimaryPhone;
			// 	// }
		// },

	},
	computed: {
		// mbcInfo (){
		// 	return this.$store.state.mbcInfo;
		// }, 
		// userData (){
		// 	return this.$store.state.user;
		// }, 
		// pathVersionLink(){
		// 	return this.$store.state.versionPath;
		// },
	},
	created () {
		Vue.eventBus.$on('showModalDefault', this.showModalDefault);
		Vue.eventBus.$on('showNewContactModal', this.showNewContactModal);
		Vue.eventBus.$on('showVanityCodeModal', this.showVanityCodeModal);
		// Vue.eventBus.$on('hideOfferDetailsModal', this.hideOfferDetailsModal);
		Vue.eventBus.$on('showOfferDetailsModal', this.showOfferDetailsModal);
		Vue.eventBus.$on('showAgentDetailsModal', this.showAgentDetailsModal);
		Vue.eventBus.$on('showSupportModal', this.showSupportModal);
		Vue.eventBus.$on('showToDoModal', this.showToDoModal);
		Vue.eventBus.$on('showModalDetails', this.showModalDetails);
		Vue.eventBus.$on('closeModal', this.closeModal);
	},
	destroyed() {
		Vue.eventBus.$off('showModalDefault', this.showModalDefault);
		Vue.eventBus.$off('showNewContactModal', this.showNewContactModal);
		Vue.eventBus.$off('showVanityCodeModal', this.showVanityCodeModal);
		// Vue.eventBus.$off('hideOfferDetailsModal', this.hideOfferDetailsModal);
		Vue.eventBus.$off('showOfferDetailsModal', this.showOfferDetailsModal);
		Vue.eventBus.$off('showAgentDetailsModal', this.showAgentDetailsModal);
		Vue.eventBus.$off('showSupportModal', this.showSupportModal);
		Vue.eventBus.$off('showToDoModal', this.showToDoModal);
		Vue.eventBus.$off('showModalDetails', this.showModalDetails);
		Vue.eventBus.$off('closeModal', this.closeModal);
	},
	mounted () {
		if(this.infoonly && this.infoonly == true){ //what is this, archeology site?
			this.infoState = true; //??
		}
	},
	// watch: {
	// 	model_editDetails: {
	// 		handler: function(val){
	// 			this.filterContactEditForm();
	// 		}, 
	// 		deep: true
	// 	}
	// },

}

</script>
