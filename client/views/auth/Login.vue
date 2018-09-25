<template>
	

<form @submit.prevent='loginUser'  novalidate="" id="loginForm" style="display: flex; flex-flow: column; flex: 1;">
	<div style="display: flex; display: flex; justify-content: flex-start; flex: 1; padding-top: 20%; flex-direction: column; align-items: center;">
		<div>
			<img class="exit_logo" src="images/exit_logo_header.png">
		</div>
		<div style="font-family: 'Roboto', sans-serif; font-weight: 400; box-shadow: 0px 3px 1px -2px rgb(127, 212, 218); font-size: 17px; text-align: center;  margin-top: 18%; color: rgb(226, 246, 247); padding-bottom: 10px; width: 81%; margin-bottom: 15px;"> 
			Login
		</div>
		<div class="input-login-div"> 

			<div class="icon-input"> 
				<!-- <i class="fas fa-sign-in-alt" style="padding-top: 6px;"></i>  -->
				<svg class="icon"><use href="icons/icons.svg#icon-single-neutral-actions" xlink:href="icons/icons.svg#icon-single-neutral-actions"/></svg>
			</div>
			<input type="TEXT" name='roster_code' id='roster_code' placeholder="Roster Code" data-vv-as="roster code" v-validate="'required'" v-model='user.roster' required autocomplete="off" class="input-login">			
			<div v-show="errors.has('roster_code')" class="error-class">{{ errors.first('roster_code') }}</div>
		</div>
		<div class="input-login-div">


			<div class="icon-input"> 
				<svg class="icon"><use href="icons/icons.svg#icon-lock-5" xlink:href="icons/icons.svg#icon-lock-5"/></svg>
			</div>
			<input type="password" name='password' id='password' placeholder="Password" v-validate="'required'" v-model='user.password' required autocomplete="off" class="input-login">
			<div v-show="errors.has('password')" class="error-class change-margin">{{ errors.first('password') }}</div>
		</div>
		<div>
			<button type="submit" class="login-button">Log In</button>
		</div>

		<div class="link-box"> 
			<div style="flex: 0 0 50%; "><a style="color: rgb(255, 255, 255);" href="https://memo.exitrealty.com/MEMO/jsp/misc/SMP_HavingTrouble.jsp?source=erc">Recover Password</a></div>
			<div style="flex: 0 0 2%; border-left: 1px solid rgb(127, 200, 210); height: 35px;"></div>
			<div style="flex: 0 0 47%; text-align: right;"> Need Help? </div>
		</div>


	<div class="box">
		<div class="menu-box">

			<a href="http://exitrealty.com/agentsearch">
				<div class="circle-box"> 
					<div class="circle">
						<svg class="icon"><use href="icons/icons.svg#icon-multiple-actions-view" xlink:href="icons/icons.svg#icon-multiple-actions-view"/></svg>
					</div>
					<div class="circle-text">
						Find an Agent/Office
					</div>
				</div>
			</a>


			<div class="border-right"></div>

			<a href="http://exitrealty.com/homesearch">
				<div class="circle-box"> 
					<div class="circle">
						<svg class="icon"><use href="icons/icons.svg#icon-real-estate-search-house-1" xlink:href="icons/icons.svg#icon-real-estate-search-house-1"/></svg>
					</div>
					<div class="circle-text">
						Find a Home
					</div>
				</div>
			</a>

			<div class="border-right"></div>

			<a href="http://exitrealty.com/formula">
				<div class="circle-box"> 
					<div class="circle">
						<svg class="icon"><use href="icons/icons.svg#icon-monitor-heart-beat-search" xlink:href="icons/icons.svg#icon-monitor-heart-beat-search"/></svg>
					</div>
					<div class="circle-text">
						The EXIT Formula
					</div>
				</div>
			</a>

			<div class="border-right"></div>

			<a href="https://joinexitrealty.com">
				<div class="circle-box"> 
					<div class="circle">
						<svg class="icon"><use href="icons/icons.svg#icon-job-seach-team-woman" xlink:href="icons/icons.svg#icon-job-seach-team-woman"/></svg>
					</div>
					<div class="circle-text">
						Join EXIT Realty
					</div>
				</div>
			</a>

		</div>
	</div>

	</div>
</form>










</template>

<script>

import Network from './../../assets/js/network'
import Vue from 'vue'
//import Modal from '../views/Components/InfoModal.vue'

export default {
	name: 'Login',
	mixins: [],
	components: {},
	computed: {},
	data () {
		return {
			responseError: null,
			user: {
				roster: "",
				password: ""
			},
			formMutex: true
		}
	},
	methods: {
		loginUser (){
			if(!this.formMutex)
			return;

			this.formMutex = false;

			this.$validator.validateAll().then( success => {
				if (!success) {
					this.formMutex = true;
					return;
				}

				
				// this.$root.startLoader();

				Network.get(
					Network.exitUrl,
					Network.action.login,
				this.user,
				{
					successCallback : (response) => {
						this.$store.commit('updateUser', {
							user: response
						})
						this.$store.commit('updateVerifyPage', {
							verifyPage: false
						})

						let date = new Date().getTime();	
						this.$store.commit('updateVerifyTime', {
							verifyTime: date
						})

						// this.$root.stopLoader();
						this.$router.push({ name: 'Dashboard'});
					},
					errorCallback : (error) => {
						this.responseError = error;
						this.formMutex = true;
						// this.$root.stopLoader();
					}
				})
			}).catch((e) => {
				console.log(e);
			});
		},
		showPass(e){
			e.stopPropagation()
			let input = document.querySelector('#password')
			input.type === 'password' ? input.type = 'text' : input.type = 'password'
		}
	}, 
	mounted () {
		$(document).ready(function(){

			$("#slideLogin").click(function(){
				$("#loginForm").slideToggle(400);
			});
			
		});

		// window.addEventListener('keyboardWillHide', function () {
		// 	console.log('keyboard will hide');
		// 	$('.app-footer').css('display','block') 
		// })
	}
}

</script>
