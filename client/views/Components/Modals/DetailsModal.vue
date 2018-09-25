<template>
    <div class="modal-window contact-details" v-if="detailsModal">
        <div class="modal-header">
        <div style="display: flex; flex-direction: inherit; justify-content: space-between; flex: 0 0 100%; justify-content: space-between;">
            <div style="width: 80%">
                <div class="header-wrapper">
                    <h2 class="name" >
                        <span v-show="LeadContact_editActive == false">{{LeadContact_editObject.FirstName}} {{LeadContact_editObject.LastName}}</span>
                        <div v-show="LeadContact_editActive == true" class="editMode" >
                            <div class="inputWrap">
                                <span class="editLabel" :class="{'animate': LeadContact_editActive}">First Name</span>
                                <input class="editInput header" type="text" v-model.lazy="customData.FirstName" v-model="LeadContact_editObject.FirstName">
                            </div>
                            <div class="inputWrap">
                                <span class="editLabel" :class="{'animate': LeadContact_editActive}" >Last Name</span>
                                <input class="editInput header" type="text" v-model.lazy="customData.LastName" v-model="LeadContact_editObject.LastName">
                            </div>
                        </div>
                    </h2>

                    <div class="phone" v-if="customData.PrimaryPhone">
                        <svg class="icon icon--xs"><use href="icons/icons.svg#icon-phone" xlink:href="icons/icons.svg#icon-phone"/></svg>
                        <p><a :href="`tel:${customData.PrimaryPhone}`"><span>{{customData.PrimaryPhone | phoneFilter}}</span></a></p>
                    </div>
                    <div class="phone" v-if="customData.PrimaryEmail">
                        <svg class="icon icon--xs"><use href="icons/icons.svg#icon-email-action-unread" xlink:href="icons/icons.svg#icon-email-action-unread"/></svg>
                        <p><a :href="`mailto:${customData.PrimaryEmail}`"><span>{{customData.PrimaryEmail}}</span></a></p>
                    </div>
                </div>	
            </div>
            <div style="display: flex;">
                <!-- <i v-if="LeadContact_editActive == false && contactsModal == true" class="far fa-edit"  @click="LeadContact_editActiveMethod()"></i> -->
                <svg class="icon" style="margin-right: 10px;" v-if="LeadContact_editActive == false && contactsModal == true" @click="LeadContact_editActiveMethod()">
                    <use href="icons/icons.svg#icon-pencil-write-alternate" xlink:href="icons/icons.svg#icon-pencil-write-alternate"/>
                </svg>

                <svg class="icon"  v-if="LeadContact_editActive == true" style="margin-right: 10px" @click="LeadContact_editInActiveMethod()"><use href="icons/icons.svg#icon-floppy-disk-1" xlink:href="icons/icons.svg#icon-floppy-disk-1"/></svg>
                <svg class="icon"  @click="closeModal()"><use href="icons/icons.svg#icon-remove-circle-alternate" xlink:href="icons/icons.svg#icon-remove-circle-alternate"/></svg>
            </div>										
            </div>

        </div>
        <div class="modal-content">
            <input id="tab1" type="radio" name="grp" class="tab-input" checked="checked"/>
            <label for="tab1" class="tab-label">General</label>
            <div class="tab-content">
                <!-- <p><span class="label">Phone: </span><span v-if="customData.PrimaryPhone">{{customData.PrimaryPhone | phoneFilter}}</span> <span v-else>-</span></p> -->
                <p>
                    <span class="label">Email: </span>
                    <span v-if="customData.PrimaryEmailGeneral" style="margin-left: -3px;"><a :href="`mailto:${customData.PrimaryEmailGeneral}`">{{customData.PrimaryEmailGeneral}}</a></span> 
                    <span style="margin-left: -3px;" v-else>-</span>
                </p>

                <p>
                    <span class="label">Phone: </span>
                    <span v-if="customData.PrimaryPhoneGeneral" style="margin-left: -3px;"><a :href="`tel:${customData.PrimaryPhoneGeneral}`">{{customData.PrimaryPhoneGeneral | phoneFilter}}</a></span> 
                    <span style="margin-left: -3px;" v-else>-</span>
                </p>

                <p><span class="label">Address: </span><span v-if="customData.Address">{{customData.Address}}</span> <span v-else>-</span></p>
                <p><span class="label">Company: </span><span v-if="customData.CompanyName">{{customData.CompanyName}}</span> <span v-else>-</span></p>

                <p v-if="LeadContact_editActive == false">
                    <span class="label">Title: </span>
                    <span v-if="LeadContact_editObject.Title" style="margin-left: -3px;">{{LeadContact_editObject.Title}}</span> 
                    <span style="margin-left: -3px;" v-else>-</span>
                </p>
                <p v-else class="editMode arrow" >
                    <span class="label">Title: </span>
                    <input type="text" class="editInput content" v-model="LeadContact_editObject.Title">
                </p>

                <p><span class="label">Contact Type: </span><span v-if="customData.ContactClassificationName">{{customData.ContactClassificationName}}</span> <span v-else>-</span></p>
                <p>
                    <div style="display: flex;">
                        <div style="width: 85px; font-weight: 700; line-height: 170%;"> Tags: </div>
                        <div style="line-height: 170%;">
                            <div v-for="tag in customData.Tags" style="line-height: 170%;">{{tag.Tag}}</div>
                        </div>
                    </div>
                </p>
            </div>

            <input id="tab2" type="radio" name="grp" class="tab-input"/>
            <label for="tab2" class="tab-label">Details</label>
<<<<<<< HEAD
=======

>>>>>>> bober
            <div class="tab-content" style="padding: 0px; padding-top: 15px;" v-if="LeadContact_editDetailsActive == false">
                <div v-for="(method, $index) in customData.ContactMethods" :key="$index">
                    <p>

                        <div style="display: flex; line-height: 170%;">
                            <div style="flex: 0 0 5%;">
                                <!-- <i :class="iconClass(method.ContactMethodCategoryName)" class="icon"></i> -->
                                <svg class="icon icon--xs"><use :href="'icons/icons.svg#'+iconType(method.ContactMethodCategoryName)" :xlink:href="'icons/icons.svg#'+iconType(method.ContactMethodCategoryName)"/></svg>
                            </div>
                            <div style="flex: 0 0 22%;">
                                {{method.ContactMethodLabel | UpperCase}}
                            </div>
                            <div style="flex: 0 0 55%; word-break: break-all;">


                                <div>
                                    <span v-if="method.ContactMethodCategoryName == 'Email'" style="font-weight: 700;"><a :href="`mailto:${method.ContactMethodValue}`">{{method.ContactMethodValue}}</a></span> 
                                    <span v-if="method.ContactMethodCategoryName == 'Phone'" style="font-weight: 700;"><a :href="`tel:${method.ContactMethodValue}`">{{method.ContactMethodValue | phoneFilter}} </a></span> 
                                    <!-- <i v-show="method.ContactMethodIsPrimary" class="fas fa-check"></i>  -->
                                </div>
                                
                            </div>	
                            <div style="flex: 0 0 15%; justify-content: flex-end; align-items: center; display: flex;">
                            <div>
                                <!-- <i class="far fa-edit" style="font-size: 17px;" @click="LeadContact_editDetailActiveMethod($index)" v-if="contactsModal == true"></i> -->
                                <svg class="icon icon--xs" v-if="contactsModal == true" @click="LeadContact_editDetailActiveMethod($index)">
                                    <use href="icons/icons.svg#icon-pencil-write-alternate" xlink:href="icons/icons.svg#icon-pencil-write-alternate"/>
                                </svg>
                            </div>
                                

                            </div>																	
                        </div>	
                    </p>
                </div>
<<<<<<< HEAD
                <div v-if="customData.ContactMethods.length === 0" style="padding-top: 5px; text-align: center;" class="row">This contact does not have any history</div>
=======
                <div v-if="customData.ContactMethods.length === 0" style="padding-top: 20px; text-align: center;">This contact does not have any history</div>
>>>>>>> bober
                <div class="edit-button" @click="LeadContact_editDetailActiveMethod('addnew')" v-if="contactsModal == true">
                    Add New
                </div>
            </div>
            <div class="tab-content" style="padding: 0px; padding-top: 15px;" v-if="LeadContact_editDetailsActive == true">
                <div>
                    <div style="display: flex;" class="edit-Details">
                            <div class="editDetails-categoryName">
                                Contact Category*
                            </div>
                            <div class="editDetails-categoryOption">
                                <select class="select-editDetails" v-on:change="clickable_select" v-model="model_editDetails.ContactMethodCategoryName">
                                    <option value="" hidden>Select Category</option>
                                    <option value="Phone">Phone</option>
                                    <option value="Email">Email</option>
                                </select>
                            </div>
                    </div>
                    <div style="display: flex;" class="edit-Details">
                            <div class="editDetails-categoryName">
                                Contact Type*
                            </div>
                            <div class="editDetails-categoryOption">
                                <select class="select-editDetails" :class="{select_editDetails_error : LeadContact_errors.ContactMethodCategory == true, disable_pointer_events : model_editDetails.clickable_select}" v-model="model_editDetails.LeadContact_methodType">
                                        <option value="0" hidden>Select Type</option>
                                        <option v-if="model_editDetails.ContactMethodCategoryName == 'Phone'" value="2">Mobile</option>
                                        <option v-if="model_editDetails.ContactMethodCategoryName == 'Phone'" value="3">Business</option>
                                        <option v-if="model_editDetails.ContactMethodCategoryName == 'Phone'" value="4">Fax</option>
                                        <option v-if="model_editDetails.ContactMethodCategoryName == 'Phone'" value="1">Home</option>
                                        <option v-if="model_editDetails.ContactMethodCategoryName == 'Phone'" value="5">Other</option>
                                        <option v-if="model_editDetails.ContactMethodCategoryName == 'Email'" value="8">Other</option>
                                        <option v-if="model_editDetails.ContactMethodCategoryName == 'Email'" value="6">Home</option>
                                        <option v-if="model_editDetails.ContactMethodCategoryName == 'Email'" value="7">Business</option>

                                </select>
                            </div>
                    </div>
                    <div style="display: flex;" class="edit-Details">
                            <div class="editDetails-categoryName">
                                Is Primary?
                            </div>
                            <div class="editDetails-categoryOption">
                                <div class="checkbox">
                                    <input id="featured" type="checkbox" class="checkbox-input" v-model="model_editDetails.ContactMethodIsPrimary">
                                    <label for="featured" class="checkbox-label"></label>
                                </div>
                            </div>
                    </div>
                    <div style="display: flex;" class="edit-Details">
                            <div class="editDetails-categoryName">
                                Contact Value*
                            </div>
                            <div class="editDetails-categoryOption-input editMode arrow" :class="{input_error : LeadContact_errors.ContactMethodValue == true}"  style="margin-left: 2px;">
                                <input v-if="model_editDetails.ContactMethodCategoryName == 'Phone'" type="tel" style="width: 100%;" class="editInput content" :class="{input_error : LeadContact_errors.ContactMethodValue == true}" v-model="model_editDetails.ContactMethodValue">	
                                <input v-if="model_editDetails.ContactMethodCategoryName == 'Email'" type="email" style="width: 100%;" class="editInput content" :class="{input_error : LeadContact_errors.ContactMethodValue == true}" v-model="model_editDetails.ContactMethodValue">	
                                <input v-if="model_editDetails.ContactMethodCategoryName != 'Phone' && model_editDetails.ContactMethodCategoryName != 'Email'" type="email" style="width: 100%;" class="editInput content" :class="{input_error : LeadContact_errors.ContactMethodValue == true}" v-model="model_editDetails.ContactMethodValue">	
                            </div>
                    </div>																					
                </div>
                <div v-if="LeadContact_update_btn == true" class="edit-button" style="margin-left: 10px;" @click="LeadContact_updateContact()">
                    <span v-if="currentIndexID != 'addnew'">Update</span>
                    <span v-else>Add New</span>
                </div>
                <div v-if="LeadContact_update_btn == false" class="edit-button disabled" style="margin-left: 10px;">
                    <span v-if="currentIndexID != 'addnew'">Update</span>
                    <span v-else>Add New!</span>
                </div>
                <div class="edit-button" style="margin-left: 10px;" @click="LeadContact_editDetailInActiveMethod()">
                    Cancel
                </div>
                <div class="edit-button delete-button" @click="LeadContact_deleteContact(model_editDetails.ID)">
                    <!-- <i class="far fa-trash-alt"></i> -->
                    <svg class="icon icon--xs"><use href="icons/icons.svg#icon-bin" xlink:href="icons/icons.svg#icon-bin"/></svg>
                </div>
            </div>

            <input id="tab3" type="radio" name="grp" class="tab-input"/>
            <label for="tab3" class="tab-label">History</label>
            <div class="tab-content contact-history">
                <div v-if="customData.ContactHistory.length === 0" style="padding-top: 20px; text-align: center;">This contact does not have any history</div>
                <div v-for="(history, $index) in customData.ContactHistory" :key="$index" class="row">
                    <!-- <i :class="iconClass(history.ContactHistoryType)" class="icon"></i> -->
                    <svg class="icon icon--xs"><use :href="'icons/icons.svg#'+iconType(history.ContactHistoryType)" :xlink:href="'icons/icons.svg#'+iconType(history.ContactHistoryType)"/></svg>
                    <span>{{history.Comment}}</span>
                    <span class="inline-block"> {{history.HistoryDate}}</span>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

import Vue from 'vue'
import Network from './../../../assets/js/network'

export default {
    name: 'DetailsModal',
    components: {},
    props: ['show', 'detailsModal', 'customDataProp'],
    data () {
        return {
            spinner: false,
			customData: '', 
			contactsModal: '',
			spinner: false,
			// data: '',
			LeadContact_editDetailsActive: false,
			LeadContact_editActive: false,
			LeadContact_editObject: {
				FirstName: '',
				ID: '',
				LastName: '',
				RecordVersion: '',
				Title: ''
			},
			currentSelected: -1,
			currentIndexID: -1,
			model_editDetails: {
				ContactMethodCategoryName: "",
				ContactMethodIsPrimary: "",
				ContactMethodLabel: "",
				ContactMethodValue: "",
				ID: "",
				ContactMethodCategoryID: '',
                LeadContact_methodType: 0,
                clickable_select: true
            },
			LeadContact_update_btn: false,
			LeadContact_errors: {},
        }
    },
    methods: {
        clickable_select (){
            if(this.ContactMethodCategoryName != ''){
                this.model_editDetails.clickable_select = false;
            }
        },
        LeadContact_deleteContact (id){
		    // https://alpha-appapi.exitrealty.com/API/Contact/WebAPI_DeleteContactMethod?contMethodID=408135

            var sendData = {
                contMethodID: id
            }

            Network.get(Network.exitUrl, Network.action.WebAPI_DeleteContactMethod, sendData, {
                requestType: Network.requestType.json,
                successCallback : (response) => {
                    this.LeadContact_getNewContact();	
                    this.LeadContact_editDetailInActiveMethod();
                },
                errorCallback : (response) => {
                    this.LeadContact_getNewContact();
                    this.LeadContact_editDetailInActiveMethod();
                }
            })
		},
		LeadContact_getNewContact() {
            var sendData = {
                ContactID: ''+this.customData.ID+'',
                ContactMethodCategoryID: ''+this.model_editDetails.ContactMethodCategoryID+'',
                ContactMethodId: ''+this.model_editDetails.LeadContact_methodType+'',
                ContactMethodIsPrimary: this.model_editDetails.ContactMethodIsPrimary,
                ContactMethodLabel: this.model_editDetails.ContactMethodLabel,
                ContactMethodValue: this.model_editDetails.ContactMethodValue,
                ID: this.model_editDetails.ID,
            }

            Network.post(Network.exitUrl, Network.action.WebAPI_InsUpdContactMethod, sendData, {
                requestType: Network.requestType.json,
                successCallback : (response) => {

                    var sendData = {
                        contID: this.customData.ID
                    };

                    Network.get(Network.exitUrl, Network.action.leadContactsDetail,sendData, {
                        successCallback : (response) => { 
                            this.customData = response[0]; 
                            this.phoneEmailGeneral();
                            this.$store.state.contactLead[this.currentSelected].primary_phone = this.customData['PrimaryPhone'];
                        },
                        errorCallback : (response) => {
                        }
                    })
                    this.LeadContact_editDetailInActiveMethod();
                },
                errorCallback : (response) => {
                    this.LeadContact_editDetailInActiveMethod();
                }
            })
		},
		LeadContact_updateContact () {
            console.log('asdsd');
            

            if (this.model_editDetails.ContactMethodCategoryName == 'Phone'){
                if (this.model_editDetails.LeadContact_methodType == 5){ this.model_editDetails.ContactMethodLabel = 'Other' }
                else if (this.model_editDetails.LeadContact_methodType == 1){ this.model_editDetails.ContactMethodLabel = 'Home' }
                else if (this.model_editDetails.LeadContact_methodType == 4){ this.model_editDetails.ContactMethodLabel = 'Fax' }
                else if (this.model_editDetails.LeadContact_methodType == 3){ this.model_editDetails.ContactMethodLabel = 'Business' }
                else if (this.model_editDetails.LeadContact_methodType == 2){ this.model_editDetails.ContactMethodLabel ='Mobile' }
            }
            if (this.model_editDetails.ContactMethodCategoryName == 'Email'){
                if (this.model_editDetails.LeadContact_methodType == 8){ this.model_editDetails.ContactMethodLabel = 'Other' }
                else if (this.model_editDetails.LeadContact_methodType == 6){ this.model_editDetails.ContactMethodLabel = 'Home' }
                else if (this.model_editDetails.LeadContact_methodType == 7){ this.model_editDetails.ContactMethodLabel = 'Business' }
            }

            this.LeadContact_getNewContact();
		},
		LeadContact_editDetailActiveMethod (id){
			if (id != 'addnew'){
				var data = this.customData.ContactMethods[id];
				this.currentIndexID = id;
				this.model_editDetails.ContactMethodCategoryName = data.ContactMethodCategoryName
				this.model_editDetails.ContactMethodIsPrimary = data.ContactMethodIsPrimary
				this.model_editDetails.ContactMethodLabel = data.ContactMethodLabel
				this.model_editDetails.ContactMethodValue = data.ContactMethodValue
				this.model_editDetails.ID = data.ID

				if (this.model_editDetails.ContactMethodCategoryName == 'Phone') {
					this.model_editDetails.ContactMethodCategoryID = 1;
				} else {
					this.model_editDetails.ContactMethodCategoryID = 2;
				}

				if (this.model_editDetails.ContactMethodCategoryName == 'Phone'){
					if (this.model_editDetails.ContactMethodLabel == 'Mobile'){ this.model_editDetails.LeadContact_methodType = 2 }
					else if (this.model_editDetails.ContactMethodLabel == 'Business'){ this.model_editDetails.LeadContact_methodType = 3 }
					else if (this.model_editDetails.ContactMethodLabel == 'Fax'){ this.model_editDetails.LeadContact_methodType = 4 }
					else if (this.model_editDetails.ContactMethodLabel == 'Home'){ this.model_editDetails.LeadContact_methodType = 1 }
					else if (this.model_editDetails.ContactMethodLabel == 'Other'){ this.model_editDetails.LeadContact_methodType = 5 }
				}
				if (this.model_editDetails.ContactMethodCategoryName == 'Email'){
					if (this.model_editDetails.ContactMethodLabel == 'Business'){ this.model_editDetails.LeadContact_methodType = 7 }
					else if (this.model_editDetails.ContactMethodLabel == 'Home'){ this.model_editDetails.LeadContact_methodType = 6 }
					else if (this.model_editDetails.ContactMethodLabel == 'Other'){ this.model_editDetails.LeadContact_methodType = 8 }
				}
			} else {
				this.currentIndexID = id;
				this.model_editDetails.ContactMethodCategoryName = '';
				this.model_editDetails.ContactMethodIsPrimary = '';
				this.model_editDetails.ContactMethodLabel = '';
				this.model_editDetails.ContactMethodValue = '';
				this.model_editDetails.LeadContact_methodType = 0;
				this.model_editDetails.ID = 0;
			}
			this.LeadContact_editDetailsActive = true;
		},
		LeadContact_editDetailInActiveMethod (){
			this.LeadContact_editDetailsActive = false;
		},
		LeadContact_editActiveMethod() {
			this.LeadContact_editActive = true;
		},
		LeadContact_editInActiveMethod() {
			this.LeadContact_editActive = false;
			this.$store.state.contactLead[this.currentSelected].first_name = this.LeadContact_editObject.FirstName;
			this.$store.state.contactLead[this.currentSelected].last_name = this.LeadContact_editObject.LastName;

				Network.post(
					Network.exitUrl,
					Network.action.updateContact,
					this.LeadContact_editObject,
					{
					requestType: Network.requestType.json,
						successCallback : (response) => {

						},
						errorCallback : (response) => {
						}
					}
				)
	


		},
		iconType(type){
			if(type === 'Text') {
				return 'icon-messages-bubble-square-alternate'
			} else if (type === 'Phone') {
				return 'icon-phone'
			} else if (type === 'Email') {
				return 'icon-email-action-unread'
			}
		},
		filterContactEditForm() {
			this.LeadContact_errors = {
				ContactMethodValue: false,
				ContactMethodCategory: false
        };
			this.LeadContact_update_btn = true;
			if (this.model_editDetails.ContactMethodValue == '' && this.model_editDetails.LeadContact_methodType != 0){
				this.LeadContact_update_btn = false;
				this.LeadContact_errors['ContactMethodValue'] = true;					
			} 

			if (this.model_editDetails.ContactMethodCategoryName == 'Phone' && (this.model_editDetails.LeadContact_methodType == 6 || this.model_editDetails.LeadContact_methodType == 7 || this.model_editDetails.LeadContact_methodType == 8)){
				this.LeadContact_update_btn = false;
				this.LeadContact_errors['ContactMethodCategory'] = true;				
			} 

			if (this.model_editDetails.ContactMethodCategoryName == 'Email' && (this.model_editDetails.LeadContact_methodType == 1 || this.model_editDetails.LeadContact_methodType == 2 || this.model_editDetails.LeadContact_methodType == 3 || this.model_editDetails.LeadContact_methodType == 4 || this.model_editDetails.LeadContact_methodType == 5)){
				this.LeadContact_update_btn = false;
				this.LeadContact_errors['ContactMethodCategory'] = true;				
			} 

			if (this.model_editDetails.ContactMethodCategoryName == 'Phone' && this.model_editDetails.ContactMethodValue.length != 10 && this.model_editDetails.LeadContact_methodType != 0){
				this.LeadContact_update_btn = false;
				this.LeadContact_errors['ContactMethodValue'] = true;
			}


			if (this.model_editDetails.LeadContact_methodType == 0){
				this.LeadContact_update_btn = false;
			}

			if (this.model_editDetails.ContactMethodCategoryName == 'Email' && this.validate(this.model_editDetails.ContactMethodValue) == false && this.model_editDetails.LeadContact_methodType != 0){
				this.LeadContact_update_btn = false;
				this.LeadContact_errors['ContactMethodValue'] = true;
			}
			
			if (this.model_editDetails.ContactMethodCategoryName == 'Phone' && /^[0-9]+$/.test(this.model_editDetails.ContactMethodValue) == false && this.model_editDetails.LeadContact_methodType != 0) {
				this.LeadContact_update_btn = false;
				this.LeadContact_errors['ContactMethodValue'] = true;		
			}

		},
		validateEmail(email) {
  			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		},
		validate(email) {
			if (this.validateEmail(email)) {
				return true;
			} else {
				return false;
			}
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
            this.LeadContact_editActive = false;
			this.LeadContact_editDetailsActive = false;
        },
    }, 
    computed: {},
    filters: {
		phoneFilter (val){
			var str = "" + val;
			str = str.replace(/[^\d]/g,"");
			return str.replace(/\d?(\d{3})(\d{3})(\d{4})/,'($1) $2-$3');
		},
		UpperCase (val){
			return val.charAt(0).toUpperCase() + val.slice(1);
		}
	},
    watch: {
		model_editDetails: {
			handler: function(val){
				this.filterContactEditForm();
			}, 
			deep: true
		}
    },
    mounted () {
        this.customData = this.customDataProp.response
        console.log(this.customData);
        
        this.phoneEmailGeneral();

        this.contactsModal = this.customDataProp.contacts;
		this.currentSelected = this.customDataProp.currentSelected;

		this.LeadContact_editObject.FirstName = this.customData.FirstName;
		this.LeadContact_editObject.ID = this.customData.ID;
		this.LeadContact_editObject.LastName = this.customData.LastName;
		this.LeadContact_editObject.RecordVersion = this.customData.RecordVersion;
		this.LeadContact_editObject.Title = this.customData.Title;
    },
}

</script>