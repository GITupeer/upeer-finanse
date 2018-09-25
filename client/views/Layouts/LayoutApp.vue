		<template>

	<div class="app-container">

			<div id="auto-log-off" v-if="verifyPage == true && user != null" style="position: fixed; z-index: 10000; background-color: white; width: 100%; height: 100vh; background-image: url('images/nointernet.png'); background-size: cover;">

				<div style="display: flex; justify-content: center;">
					<div style="color: rgb(0, 140, 154); font-weight: 200; font-size: 45px; margin-top: 20%;">
						Verification
					</div>
				</div>
				<div style="display: flex; justify-content: center;">
					<div style="color: #212121; font-weight: 300; font-size: 15px; margin-top: 20px; text-align: center; padding: 0 45px;">
					Verify your identity. Please enter your roster code
					</div>
				</div>


				<div style="display: flex; align-items: center; margin-top: 14%; justify-content: center;"> 
					<img :src="userData.UserPhotoURL" style="border-radius: 50%; height: 115px;">
				</div>
				<div style="display: flex; align-items: center; margin-top: 10px; font-weight: 400; justify-content: center; margin-bottom: 31px;">
					{{userData.FirstName}} {{userData.LastName}}
				</div>
				
			

				<div style="display: flex; align-items: center; justify-content: center; flex-direction: column;">
					<div style="flex: 0 0 51%;"> 
					<input type="text" name="roster" placeholder="" v-model="RosterCode" style="background-color: unset; border: unset; color: rgb(117, 117, 117); text-align: center; font-size: 18px; border-bottom: solid; border-width: 0.08em; padding-bottom: 1px; border-bottom-color: rgb(0, 140, 154);">
					</div>
					<div v-if="counterVerify < 3" style="font-size: 12px; margin-top: 7px; color: #D32F2F; text-align: center;" > 
					Entered roster code is incorrect.<br>You have {{ counterVerify }} attempts left.
					</div>
					<div style="flex: 0 0 51%; margin-top: 3px;"> 
					<button @click="checkRoster()" type="button" class="btn btn__more" style="font-size: 11px; background-color: unset;"> Continue</button>
					</div> 
					<div @click="logout()" style="margin-top: 6px; font-size: 13px; color: rgb(0, 140, 154); font-weight: 300;">
					Logout of the app
					</div>

				</div>
			</div>


		<PageHeader></PageHeader>

		<router-view></router-view>

		<PageFooter></PageFooter>

		<Modal></Modal>

		<SideNav></SideNav>

	</div>
</template>

<script>
//import Network from '../../assets/js/network';
//import Synchronization from '../../assets/js/synchronization';
//import Echo from "laravel-echo"
require('jquery-touchswipe');

import PageFooter from '../../views/Components/PageFooter'
import PageHeader from '../../views/Components/PageHeader'
import Modal from '../../views/Components/InfoModal'
import SideNav from '../../views/Components/SideNav'
import Network from '../../assets/js/network'

export default {
	name: 'LayoutApp',
	components: {
		PageFooter,PageHeader, Modal, SideNav
	},
	data () {
		return {
			RosterCode: '',
      		counterVerify: 3
			// loader: true,
		}
	},
	computed: {
		userData () {
			return this.$store.state.user
		},
		deviceReady () {
			return this.$store.state.deviceReady;
		},
		notificationToken () {
			return this.$store.state.notificationToken;
		},
		lastNotification () {
			return this.$store.state.lastNotification;
		},
		verifyPage() {
				return this.$store.state.verifyPage;
		},
		pathVersionLink(){
				return this.$store.state.versionPath;
		},
		user(){
		return this.$store.state.user
		}
	},
	methods: {
		    checkRoster() {
				var rosterCode = this.$store.state.user.UserName;

				if (rosterCode == this.RosterCode){
					this.counterVerify = 3;
					console.log('correct');
					this.$store.commit('updateVerifyPage', {
                  		verifyPage: false
					})

					let date = new Date().getTime();	
					this.$store.commit('updateVerifyTime', {
						verifyTime: date
					})
					this.RosterCode = '';
				} else {
					this.counterVerify = this.counterVerify -1;
					if (this.counterVerify == 0){
						this.logout();
					}
				}
			},
		    logout(){

			let data = {
				rosterCode: this.$store.state.user.UserName,
			}			

			this.$http.post(this.pathVersionLink+'api/logout', data).then(res => {
			}).catch(error => {
			})


			this.$root.startLoader();
			Network.get(
				Network.exitUrl,
				Network.action.logout,
				null,
				{
				successCallback : (response) => {
					this.$store.commit('logOutUser');
					this.$root.stopLoader();
				},
				errorCallback : (response) => {
					this.$store.commit('logOutUser');
					this.$root.stopLoader();
				}
				}
			)
		},
		initFirebase(){
			console.log('ddd');
			this.readyCheckPointer = window.setInterval(() => {
					window.clearInterval(this.readyCheckPointer);
					this.runPushWoosh();
			},500);
			console.log('initFirebase');

		},
		runPushWoosh(){
			console.log('runPushWoosh');
			var pushNotification = cordova.require("pushwoosh-cordova-plugin.PushNotification");

			pushNotification.setEnableLED(true);
			pushNotification.setColorLED(0x00FF00);
			//pushNotification.setVibrateType(1); // android no vibration
			pushNotification.onDeviceReady({
				projectid: "312615420784",
				appid: "2F5AE-9FDCF",
				serviceName: ""
			});

			pushNotification.getPushwooshHWID(
				function(token) {
					console.log(this.$store.state.HWID, 'before hwid');
					this.$store.state.HWID = token //commit/displatch to store?
					console.log(this.$store.state.HWID, 'after hwid');
					console.log(token, 'token hwid');
				}
			)

			//register for push notifications
			pushNotification.registerDevice(
				(token) => {
					if(token == null || token == undefined || token == "")
					return;

					if(!token.pushToken)
					return;

					// save this in JEFF EXIT ENDPOINT
					// if(this.notificationToken == null)
					// {
					//   this.addFirebaseToken(token.pushToken);
					// }
					// else if(token.pushToken != this.notificationToken)
					// {
					//   this.refreshFirebaseToken(token.pushToken);
					// }
					

					this.$store.dispatch('updateNotificationToken', {
						token: token.pushToken
					});

					let formData = this.prepareNotificationData();
					this.sendNotificationData(formData); 

				},
				(token) => {
					alert(JSON.stringify(token));
				}
			);

			pushNotification.getLaunchNotification((notification) => {
				this.$store.dispatch('updateLastNotification', {
					last: notification
				});
			});
		},
		prepareNotificationData(){
			let formData = new FormData();
				// formData.append('timezone', jstz.determine().name());
				formData.append('timezone', 'Europe/Warsaw');
				formData.append('pushwoosh_hardware_device_token', this.$store.state.HWID);
				formData.append('pushWoosh_token', this.$store.state.notificationToken); 
				formData.append('rosterCode', this.$store.state.user.UserName); 
			return formData; 
		}, 
		sendNotificationData(formData){

			console.log('sendNotificationData');
				
			this.$http.post(this.$store.state.versionPath + 'api/pushwoosh/registerDevice', formData, {
				headers: {
					// Authorization: 'Bearer ' + this.$store.state.userData.api_token
				}
			}).then(success => {
					console.log(success.data, 'PUSHWOOSH SUCCESS');
			}, error => {
					console.log(error, 'PUSHWOOSH ERROR');
			})
		},
	}, 
	watch: {}, 
	mounted () {
		document.addEventListener('deviceready', () => {
			// if(isPhoneGap()){
				this.initFirebase();
			// }
		})


		window.addEventListener('keyboardWillShow', function () {
			console.log('keyboard will show');
			$('.app-footer').css('display','none') 
			$('.app-container').classList.add('keyboardOn');

		})
		window.addEventListener('keyboardWillHide', function () {
			console.log('keyboard will hide');
			$('.app-footer').css('display','block') 
			$('.app-container').classList.remove('keyboardOn');
		})

		//gtm - google tag manager - CLICK event
		document.addEventListener('click', (e)=>{

			
			let verifyTime = this.$store.state.verifyTime;
			let date = new Date().getTime();


			if (verifyTime == ''){
				this.$store.commit('updateVerifyTime', {
                  verifyTime: date
				})
			} else {
				let checkDate = Math.round((date-verifyTime)/1000);

				if (checkDate > 1800){
					this.$store.commit('updateVerifyPage', {
                  		verifyPage: true
					})			
				} else {
					let date = new Date().getTime();	
					this.$store.commit('updateVerifyTime', {
					verifyTime: date
					})				
				}
			}


			dataLayer.push({
			'appEventCategory': this.$store.state.route.name,
			'appEventAction': 'click',
			'appEventLabel':e.target.closest('[class]').className, 
			'sessionID': this.$store.state.user ? this.$store.state.user.UserName : 'notLogged'
			});
			dataLayer.push({'event': 'appEvent'});
		})


		let scope = this;
		function move(direction, startPos, sideNav){
			
			if (direction === 'right' && !sideNav && startPos < 10) {
				return true;
			}
			if (direction === 'left' && sideNav){
				return true
			}
			return false;
		}

		$(".app-container").swipe( {
			//Generic swipe handler for all directions
			swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
				if(move(direction, fingerData[0].start.x, scope.$store.state.sideNav)){
					scope.$store.commit('sideNav')
				}
			}
		});


	}
}

</script>
