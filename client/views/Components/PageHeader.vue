<template>
	<div class="app-header" :class="{marketplaceDetails: marketplaceDetails}">
		<div class="app-header__wrapper" v-if="marketplaceDetails"  @click="navLeft(dashboard)">
			<svg class="icon color-white"><use href="icons/icons.svg#icon-navigation-left-circle-1-alternate-1" xlink:href="icons/icons.svg#icon-navigation-left-circle-1-alternate-1"/></svg>
			<h1>Offer Details</h1>
		</div> 
		<div class="app-header__wrapper" v-if="!marketplaceDetails">

			<div v-if="dashboard"  @click="navLeft(dashboard)" class="top-nav-item ml-10">
				<svg id="tutorial" class="icon color-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path fill="currentColor" d="M12 0a12 12 0 1 0 12 12A12.013 12.013 0 0 0 12 0zm.25 5a1.5 1.5 0 1 1-1.5 1.5 1.5 1.5 0 0 1 1.5-1.5zm2.25 13.5h-4a1 1 0 0 1 0-2h.75a.25.25 0 0 0 .25-.25v-4.5a.25.25 0 0 0-.25-.25h-.75a1 1 0 0 1 0-2h1a2 2 0 0 1 2 2v4.75a.25.25 0 0 0 .25.25h.75a1 1 0 1 1 0 2z" />
				</svg>
			</div>
			
			<div v-if="!dashboard" @click="navLeft(dashboard)" class="top-nav-item ml-10">
				<svg  class="icon color-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<g class="nc-icon-wrapper" fill="currentColor">
						<path d="M12 0a12 12 0 1 0 12 12A12.013 12.013 0 0 0 12 0zm0 2A10 10 0 1 1 2 12 10.011 10.011 0 0 1 12 2z" />
						<path d="M11.882 8.383l-1.939 1.94a.25.25 0 0 0 .177.427H18a1.25 1.25 0 0 1 0 2.5h-7.88a.25.25 0 0 0-.177.426l1.939 1.94a1.249 1.249 0 0 1-1.767 1.767l-4.5-4.5a1.247 1.247 0 0 1 0-1.767l4.5-4.5a1.249 1.249 0 0 1 1.767 1.767z" />
					</g>
				</svg>
			</div>

			<!-- this is the optimal solution, please make it work -->
			<!-- <div @click="navLeft(dashboard)" class="top-nav-item ml-10">
				<svg  id="tutorial" class="icon color-white"><use :href="'icons/icons.svg#'+iconType(dashboard)" :xlink:href="'icons/icons.svg#'+iconType(dashboard)"/></svg>
			</div> -->

			<router-link id="root" :to="{name: 'Dashboard'}">
				<img class="app-header__logo" src="images/exit_logo_header.png" alt="logo">
			</router-link>

			<div class="top-nav-item right mr-10">
				<router-link id="settings" :to="{name: 'Settings'}">
					<svg class="icon color-white"><use href="icons/icons.svg#icon-cog-1" xlink:href="icons/icons.svg#icon-cog-1"/></svg>
				</router-link>
				<div >
					<svg class="icon color-white"><use href="icons/icons.svg#icon-alarm-bell-1" xlink:href="icons/icons.svg#icon-alarm-bell-1"/></svg>
				</div>
				<div @click="showNav">
					<svg class="icon color-white"><use href="icons/icons.svg#icon-navigation-menu-vertical" xlink:href="icons/icons.svg#icon-navigation-menu-vertical"/></svg>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'PageHeader',
	props: [],
	components: {},
	data () {
		return {

		}
	},
	methods: {
		showNav(){
			this.$store.commit('sideNav')	
		},
		show_tutorial(){
			console.log('click tutorial show');
			console.log(this.$store.state.show_tutorial);

			this.$store.commit('showTutorial', {
				show: 0
			})

			console.log(this.$store.state.show_tutorial);
			
		},
		iconType(dashboard){
			if(dashboard){
				return  'icon-information-circle'
			} else {
				return 'icon-navigation-left-circle-1-alternate-1'
			}	
		}, 
		navLeft(dashboard){
			if(dashboard){
				this.show_tutorial()
			} else {
				this.$router.go(-1);
			}
		},
	},
	computed: {
		dashboard() {
			return this.$route.name == 'Dashboard';
		},
		marketplaceDetails(){
			return this.$route.name == 'MarketplaceDetails';
		},
		open(){
			return this.$store.state.sideNav;
		}
	},
	watch : {},
	mounted () {
		console.log(this.$route.name);
		
	},
}

</script>
