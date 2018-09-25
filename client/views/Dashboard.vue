<template>
      
	<div class="dashboard" >

		<div class="dashboard-header">
			<router-link :to="{name: 'MyProfile'}">
				<div class="dashboard-picture" :style="'background-image:url(' + userData.UserPhotoURL + ');'" id='profile'></div>
			</router-link>
			<p class="name">
				<div style="color: white; font-size: 19px; margin-bottom: 5px; margin-top: -10px;">{{userData.FirstName}} {{userData.LastName}}</div>
				<div style="color: white; font-size: 14px; font-weight: 200;">{{mbcInfo.AgentTitle}} </div>
			</p>
				
			<!-- <div class="box box-3">
				<div class="box box-2">
					<div class="box box-1">
					</div>
				</div>
			</div> -->
		</div>

		
		
		<div class="dashboard-body">
			<router-link :to="{name: 'QuickLead'}" class="dashboard-item">
				<!-- <img src="images/exit_icons_activeNew/quick_lead.png" alt="" id="quickLead"> -->
				<svg class="icon icon--md"><use href="icons/icons.svg#icon-single-neutral-actions-star" xlink:href="icons/icons.svg#icon-single-neutral-actions-star" id="quickLead"/></svg>
				<p>Quick Lead</p>
			</router-link>
			<router-link :to="{name: 'LeadStream'}" class="dashboard-item">
				<div class="notification-count"><span>{{LeadCounter.new_lead_count}}</span></div>
				<!-- <img src="images/exit_icons_activeNew/lead_stream.png" alt="" id="leadStream"> -->
				<svg class="icon icon--md"><use href="icons/icons.svg#icon-fireworks-people-watch" xlink:href="icons/icons.svg#icon-fireworks-people-watch" id="leadStream"/></svg>
				<p>Lead Stream</p>
			</router-link>
			<router-link :to="{name: 'Properties'}" class="dashboard-item">
				<!-- <img src="images/exit_icons_activeNew/properties.png" alt="" id="properties"> -->
				<svg class="icon icon--md"><use href="icons/icons.svg#icon-real-estate-action-house-heart" xlink:href="icons/icons.svg#icon-real-estate-action-house-heart" id="properties"/></svg>
				<p>Properties</p>
			</router-link>
			<router-link :to="{name: 'Contacts'}" class="dashboard-item">
				<div class="notification-count"><span>{{LeadCounter.new_contact_count}}</span></div>
				<!-- <img src="images/exit_icons_activeNew/contacts.png" alt="" id="contacts"> -->
				<svg class="icon icon--md"><use href="icons/icons.svg#icon-phonebook" xlink:href="icons/icons.svg#icon-phonebook" id="contacts"/></svg>
				<p>Contacts</p>
			</router-link>
			<router-link :to="{name: 'Marketplace'}" class="dashboard-item">
				<!-- <img src="images/exit_icons_activeNew/marketplace.png" alt="" id="marketplace"> -->
				<svg class="icon icon--md"><use href="icons/icons.svg#icon-shop" xlink:href="icons/icons.svg#icon-shop" id="marketplace"/></svg>
				<p>Marketplace</p>
			</router-link>
			<router-link :to="{name: 'Training'}" class="dashboard-item">
				<!-- <img src="images/exit_icons_activeNew/training.png" alt="" id="training"> -->
				<svg class="icon icon--md"><use href="icons/icons.svg#icon-video-player-subtitle" xlink:href="icons/icons.svg#icon-video-player-subtitle" id="training"/></svg>
				<p>Media</p>
			</router-link>
			<router-link :to="{name: 'Documents'}" class="dashboard-item">
				<!-- <img src="images/exit_icons_activeNew/documents.png" alt="" id="documents"> -->
				<svg class="icon icon--md"><use href="icons/icons.svg#icon-folder-open" xlink:href="icons/icons.svg#icon-folder-open" id="documents"/></svg>
				<p>Documents</p>
			</router-link>
			<router-link :to="{name: 'MBC'}" class="dashboard-item">
				<!-- <img src="images/exit_icons_activeNew/my_business_card.png" alt="" id="mbc"> -->
				<svg class="icon icon--md"><use href="icons/icons.svg#icon-invitation" xlink:href="icons/icons.svg#icon-invitation" id="mbc"/></svg>
				<p>My Business Card</p>
			</router-link>
			<router-link :to="{name: 'Convention'}" class="dashboard-item">
				<!-- <img src="images/exit_icons_activeNew/convention.png" alt="" id="convention"> -->
				<svg class="icon icon--md"><use href="icons/icons.svg#icon-presentation" xlink:href="icons/icons.svg#icon-presentation" id="convention"/></svg>
				<p>Convention</p>
			</router-link>
			<router-link :to="{name: 'ToDo'}" class="dashboard-item">
				<!-- <i class="material-icons" style="color: rgb(0, 140, 154); font-size: 45px; font-weight: 200;"> format_list_bulleted </i> -->
				<svg class="icon icon--md"><use href="icons/icons.svg#icon-list-stars" xlink:href="icons/icons.svg#icon-list-stars" id="toDo"/></svg>
				<p>To Do</p>
			</router-link>
			<router-link :to="{name: 'OfficeDirectory'}" class="dashboard-item">
				<!-- <i class="material-icons" style="color: rgb(0, 140, 154); font-size: 45px; font-weight: 200;"> work_outline </i> -->
				<svg class="icon icon--md"><use href="icons/icons.svg#icon-building" xlink:href="icons/icons.svg#icon-building" id="officeDirectory"/></svg>
				<p>Office Directory</p>
			</router-link>
			<a :href="docLink+'/UserManagement/MyReports'" class="dashboard-item">
				<!-- <i class="material-icons" style="color: rgb(0, 140, 154); font-size: 45px; font-weight: 100;"> pie_chart </i> -->
				<svg class="icon icon--md"><use href="icons/icons.svg#icon-monitor-heart-beat-search" xlink:href="icons/icons.svg#icon-monitor-heart-beat-search" id="reports"/></svg>
				<p>Reports</p>
			</a>		


		</div>

		<Tutorial v-if="showTutorial == 0"></Tutorial>
	</div>

</template>

<script>

import PageHeader from '../views/Components/PageHeader'
import Tutorial from '../views/Components/Tutorial.vue'
import Network from './../assets/js/network'
// import Modal from '../views/Components/InfoModal.vue'
import Vue from 'vue'

export default {
  	name: 'Dashboard',
  	components: {
    	PageHeader, Tutorial
	},
	data () {
		return {
			// show_notification: true,
			// test: true, 
		}
	},
  	methods: {
		sorryModal(){
			Vue.eventBus.$emit('showModalDefault', this.modal);
		},
		getMbc(){
			var sendData = {
				method : 'getoffice',
				mode : 'androidmode',
				rolelimit: "agent",
				rosterCode : this.userData.UserName
			};

			Network.get(
				Network.lifeUrl,
				Network.action.empty,
				sendData,
				{
				requestType: Network.requestType.formUrlEncoded,
					successCallback : (response) => {

						var mbcInfo = response.agent ? response.agent : null;
						if(mbcInfo && mbcInfo.mbcURL)
						{
						mbcInfo.mbcURL = mbcInfo.mbcURL.replace('https','http');
						}

						this.$store.commit('updateMbc', {
						mbc: mbcInfo
						})

					},
					errorCallback : (response) => {
					}
				}
			)
		},
		getLeads(){
			this.$root.startLoader();
			var sendData = {
			};
			var scope = this;

			Network.get(Network.exitUrl,Network.action.GetLastLoginCounts,sendData,{
				successCallback : (response) => {
					scope.$root.stopLoader();
					this.$store.commit('updateLeadCounter', {
						new_contact_count: response[0].new_contact_count,
						new_lead_count: response[0].new_lead_count,
						new_property_count: response[0].new_property_count,
					})
				},
				errorCallback : (response) => {
					this.$root.stopLoader();
				}
			})
		}
	}, 
	computed: {
		docLink(){
			return this.$store.state.docLink;
		},
		LeadCounter () {
			return this.$store.state.LeadCounter;
		},
		userData () {
			return this.$store.state.user;
		},
		mbcInfo () {
			return this.$store.state.mbcInfo;
		},
		pathVersionLink(){
			return this.$store.state.versionPath;
		},
		iOS(){
			return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
		},
		showTutorial (){
			return this.$store.state.show_tutorial
		}
	},
	mounted () {

		this.$http.get(this.pathVersionLink+'api/user/'+this.$store.state.user.UserName).then(res => {
			this.$store.commit('updateUserDB', {
				userDB: res.data
			})
			this.$store.commit('updateAppCopy', {
				app_copy: res.data.app_copy
			})
			this.$store.commit('showTutorial', {
                show: res.data.tutorial
			})
			console.log('show tutorial');
			console.log(res.data.tutorial);
			

		}).catch(error => {
		})


		if(this.$store.state.mbcInfo == null) this.getMbc();
	
		this.getLeads();
	}
}

</script>
