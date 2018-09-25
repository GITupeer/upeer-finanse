<template>
    <div>

        <transition name='fade'>
            <div class="sidenav-overlay" v-show="open" @click="closeNav"></div>
        </transition>
        <transition name='slideIn'>
            <div v-show="open" class="sidenav"> 
                <div class="up">

                <div class="nav-picture" :style="'background-image:url(' + userData.UserPhotoURL + ');'" id='profile'></div>

                <div class="nav-agent-info">
                    <div class="agent-first-name"> 
                        {{userData.FirstName}} {{userData.LastName}} 
                    </div>
                    <div class="agent-title"> 
                        {{mbcInfo.AgentTitle}}
                    </div>
                </div>


                </div>
                <ul class="nav-list">
                    <router-link :to="{name: 'MyProfile'}">
                        <li class="nav-item" @click="closeMenu()"> 				
                            <svg class="icon icon--nav margin-nav-icon"><use href="icons/icons.svg#icon-single-neutral-circle-alternate" xlink:href="icons/icons.svg#icon-single-neutral-circle-alternate"/></svg>
                            <span>My Profile </span>
                        </li> 
                    </router-link>


                    <router-link :to="{name: 'OfficeDirectory'}">
                        <li class="nav-item" @click="closeNav()"> 				
                            <svg class="icon icon--nav margin-nav-icon"><use href="icons/icons.svg#icon-building" xlink:href="icons/icons.svg#icon-building"/></svg>
                            <span>Office Directory </span>
                        </li> 
                    </router-link>

                    <router-link :to="{name: ''}">
                        <li class="nav-item" @click="closeNav()"> 				
                            <svg class="icon icon--nav margin-nav-icon"><use href="icons/icons.svg#icon-real-estate-settings-house-wrench" xlink:href="icons/icons.svg#icon-real-estate-settings-house-wrench"/></svg>
                            <span>EXITize Me </span>
                        </li> 
                    </router-link>

                    <router-link :to="{name: 'Marketplace'}">
                        <li class="nav-item" @click="closeNav()"> 				
                            <svg class="icon icon--nav margin-nav-icon"><use href="icons/icons.svg#icon-shop" xlink:href="icons/icons.svg#icon-shop"/></svg>
                            <span>Marketplace</span>
                        </li> 
                    </router-link>


                   <router-link :to="{name: 'eManuals'}">
                        <li class="nav-item" @click="closeNav()"> 				
                            <svg class="icon icon--nav margin-nav-icon"><use href="icons/icons.svg#icon-book-open-bookmark" xlink:href="icons/icons.svg#icon-book-open-bookmark"/></svg>
                            <span>e-Manuals</span>
                        </li>   
                    </router-link>

                    <router-link :to="{name: 'Settings'}">
                        <li class="nav-item" @click="closeMenu()"> 				
                            <svg class="icon icon--nav margin-nav-icon"><use href="icons/icons.svg#icon-cog-1" xlink:href="icons/icons.svg#icon-cog-1"/></svg>
                            <span>Settings</span>
                        </li>   
                    </router-link>


                    <router-link :to="{name: 'News'}">
                        <li class="nav-item" @click="closeNav()"> 				
                            <svg class="icon icon--nav margin-nav-icon"><use href="icons/icons.svg#icon-app-window-rss" xlink:href="icons/icons.svg#icon-app-window-rss"/></svg>
                            <span>News</span>
                        </li>
                    </router-link>

                    <router-link :to="{name: 'Contacts'}">
                        <li class="nav-item" @click="closeNav()"> 				
                            <svg class="icon icon--nav margin-nav-icon"><use href="icons/icons.svg#icon-phonebook" xlink:href="icons/icons.svg#icon-phonebook"/></svg>
                            <span>Contacts</span>
                        </li>  
                    </router-link>

                    <router-link :to="{name: 'Settings'}">
                        <li class="nav-item" @click="closeNav()"> 				
                            <svg class="icon icon--nav margin-nav-icon"><use href="icons/icons.svg#icon-cog-1" xlink:href="icons/icons.svg#icon-cog-1"/></svg>
                            <span>Settings</span>
                        </li>   
                    </router-link>

                        <li class="nav-item" @click.prevent="logout"> 				
                            <svg class="icon icon--nav margin-nav-icon"><use href="icons/icons.svg#icon-power-button" xlink:href="icons/icons.svg#icon-power-button"/></svg>
                            <span>Logout </span>
                        </li>  


                </ul>
            </div>
        </transition>
    </div>
</template>

<script>

import Network from './../../assets/js/network'

export default {
    name: 'SideNav',
    components: {},
    data () {
        return {
            // isOpen: false,
        }
    },
    methods: {
        closeNav(){
            this.$store.commit('sideNav')
        },
		logout(){
            this.closeNav();
            
			let data = {
				rosterCode: this.$store.state.user.UserName,
			}			

			this.$http.post(this.pathVersionLink+'api/logout', data).then(res => {

			}).catch(error => {

			})

			this.$root.startLoader();
			
			Network.get(Network.exitUrl,Network.action.logout,null,	{
				successCallback : (response) => {
					this.$store.commit('logOutUser');
					this.$root.stopLoader();
				},
				errorCallback : (response) => {
					this.$store.commit('logOutUser');
					this.$root.stopLoader();
				}
			})
		},
    },
    computed: {
        open(){
            return this.$store.state.sideNav; 
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
    },
    mounted () {},
    watch: {
        open: function (open) {
            if (open) {
                document.documentElement.style.overflow = 'hidden' // document.documentElement === document.querySelector('#root')
            } else {
                document.documentElement.style.overflow = 'auto'
            }
        }
    }
}

</script>
