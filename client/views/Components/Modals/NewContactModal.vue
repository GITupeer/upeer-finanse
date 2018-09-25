<template>
    <div class="modal-window">
        <div class="sending_info_container_inner">
            <div class="modal-header">
                <svg class="icon"  @click="closeModal()"><use href="icons/icons.svg#icon-remove-circle-alternate" xlink:href="icons/icons.svg#icon-remove-circle-alternate"/></svg>
            </div>
                <div style="font-size: 13px; margin-bottom: 3px;"> Add new contact </div>
                <form action="" @submit.prevent='sendNewContact' novalidate class="form">

                    <div class="form__group">
                        <svg class="icon input__icon"><use href="icons/icons.svg#icon-single-neutral-actions" xlink:href="icons/icons.svg#icon-single-neutral-actions"/></svg>
                        <input type="text" class="input" placeholder="Recipient First Name" name="first_name" v-model='formData.first_name' 
                        v-validate="'required'" :class="{ 'has-errors': errors.has('first_name')}">
                    </div>

                    <div class="form__group" style="margin-top: -10px;">
                        <svg class="icon input__icon"><use href="icons/icons.svg#icon-single-neutral-actions" xlink:href="icons/icons.svg#icon-single-neutral-actions"/></svg>
                        <input type="text" class="input" placeholder="Recipient Last Name" name="last_name" v-model='formData.last_name' 
                        v-validate="'required'" :class="{ 'has-errors': errors.has('last_name')}">
                    </div>

                    <div class="form__group" style="margin-top: -10px;">
                        <svg class="icon input__icon"><use href="icons/icons.svg#icon-email-action-unread" xlink:href="icons/icons.svg#icon-email-action-unread"/></svg>
                        <input type="text" class="input" placeholder="Recipient Email" name="email" v-model='formData.email' 
                        :class="{'has-errors': errors.has('email')}"
                        v-validate="{rules: {email: true}}">
                    </div>

                    <div class="form__group" style="margin-top: -10px;">
                        <svg class="icon input__icon"><use href="icons/icons.svg#icon-phone" xlink:href="icons/icons.svg#icon-phone"/></svg>
                        <input type="tel" class="input" placeholder="Recipient Phone" id="phone" name="phone" pattern="[0-9]*" v-model='formData.phone'
                            :class="{ 'has-errors': errors.has('phone')}"
                            v-cursor-end 
                            v-mask="'(###) ###-####'"
                            v-validate="{ rules: { regex: /^(\([0-9]{3}\)) ([0-9]{3})-([0-9]){4}$/,} }">
                        <span class="input__border"></span>
                    </div>

                    <div class="form__group">
                        <svg class="icon input__icon"><use href="icons/icons.svg#icon-pencil-2" xlink:href="icons/icons.svg#icon-pencil-2"/></svg>
                        <textarea type="text" class="textarea" name="notes" v-validate="'max:1000'" id="notes" placeholder="Message" v-model='formData.notes'></textarea>
                    </div>

                    <button class="btn btn-call" type="submit">
                        <span v-if="!spinner">Send</span>
                        <svg v-if="spinner" class="icon icon-xs spinning"><use href="icons/icons.svg#icon-loading-circle" xlink:href="icons/icons.svg#icon-loading-circle"/></svg>
                    </button>
                </form>
        </div>
    </div>
</template>

<script>

import Vue from 'vue'
import Network from './../../../assets/js/network'

export default {
    name: 'NewContactModal',
    components: {},
    props: ['show', 'newContactModal', 'customData'],
    data () {
        return {
            spinner: false,
            formData: {
				first_name: '',
				last_name: '',
				email: '',
				notes: '',
				phone: '',
			}
        }
    },
    methods: {
        sendNewContact() {
			this.spinner = true

			this.$validator.validateAll().then(success => {

				if (!success) {
					this.spinner = false;
					return;
				}

				let data = {
					rosterCode: this.userData.UserName,
					recipientFirstName: this.formData.first_name,
					recipientLastName: this.formData.last_name,
					notes: this.formData.notes,
					phoneNumber: this.formData.phone,
                }
                
				this.$http.post(this.pathVersionLink+'api/addNewContact', data).then(res => {

                    this.getContacts();	//???
                    
                    this.closeModal();
                    
					this.spinner = false
				}).catch(error => {
					this.spinner = false
					Vue.eventBus.$emit('showModalDefault', modal);
				})
			}).catch((e) => {
				console.log(e);
			});
        },
        getContacts(){

			var sendData = {
				recsPerPage : 10,
				tags: '',
				pageNum: 1,
				contType: 'all'
			};

			Network.get(Network.exitUrl, Network.action.leadContacts, sendData,	{
                successCallback : (response) => {

                    var buffer = response.filter( 
                        (element) => element.last_name.localeCompare("Lead") != 0
                    );

                    if(this.contactList.length > 0){ //w infomodal nie ma contactlist
                        response = this.contactList.concat(response)	
                    }
                    this.phoneEmailGeneral(); //huh?
                    this.$store.commit('updateContactLeadList', {
                        contactLead: response,
                    })

                    this.filteredContacts = this.contactList; ///??
                    this.phoneEmailGeneral();
                    //this.$root.stopLoader();
                },
                errorCallback : (response) => {
                    //this.$root.stopLoader();
                }
			})
        },
        phoneEmailGeneral(){
			// if (this.customData.PrimaryEmail  == ''){
			// 	var emailCounter = 0;
			// 	for(var ContactMethods in this.customData.ContactMethods){
			// 		console.log(this.customData.ContactMethods[ContactMethods].ContactMethodCategoryName);
			// 		if (this.customData.ContactMethods[ContactMethods].ContactMethodCategoryName == 'Email' && this.customData.ContactMethods[ContactMethods].ContactMethodLabel == 'Home'){
			// 			this.customData.PrimaryEmailGeneral = this.customData.ContactMethods[ContactMethods].ContactMethodValue;
			// 			emailCounter++;
			// 		}
			// 	}
			// } else {
			// 	this.PrimaryEmailGeneral = this.customData.PrimaryEmail;
			// }


			// if (this.customData.PrimaryPhone == ''){
			// 	var phoneCounter = 0;
			// 	for(var ContactMethods in this.customData.ContactMethods){
			// 		console.log(this.customData.ContactMethods[ContactMethods].ContactMethodCategoryName);
			// 		if (this.customData.ContactMethods[ContactMethods].ContactMethodCategoryName == 'Phone' && this.customData.ContactMethods[ContactMethods].ContactMethodLabel == 'Mobile'){
			// 			this.customData.PrimaryPhoneGeneral = this.customData.ContactMethods[ContactMethods].ContactMethodValue;
						
			// 		}
			// 		if(phoneCounter>1){
			// 			this.customData.PrimaryPhoneGeneral = '';
			// 		}
			// 		phoneCounter++;
			// 	}
			// } else {
			// 	this.PrimaryPhoneGeneral = this.customData.PrimaryPhone;
			// }
		},
        closeModal(){
            this.$emit('close')
        },
    }, 
    computed: {
        phoneDualValidate (){
			if (this.formData.phone === ''){
				return true 
			} else {
				return false
			}
		},
		emailDualValidate (){
			if (this.formData.email === ''){
				return true 
			} else {
				return false
			}
		},
    },
    watch: {},
    mounted () {},
}

</script>