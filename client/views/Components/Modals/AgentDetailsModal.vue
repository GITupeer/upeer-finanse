<template>
    <div class="modal-window">
        <div class="otherAgentDetails-avatar">
            <div v-if="customData.Photo != 'photo/defaultAgentPhoto.jpg'" class="photo" :style="'background-image:url('+customData.Photo+');'"></div>
            <div v-else class="photo" :style="'background-image:url(https://memo.exitrealty.com/photos/no_image_icon.png);'"></div>
        </div>

        <div style="margin: 2px; margin-top: 10px;font-weight: 400; font-size: 20px;"> 
            {{ customData.FirstName }} {{ customData.LastName }}
        </div>

        <div style="margin-top: 1px; font-weight: 300; font-size: 13px;">
            <div style="">{{ customData.AgentTitle }}</div>
        </div>

        <div class="line-one"><div class="line-two"></div></div>

        <div class="profile-socials" :class="{noFriends:socialsArr.length < 4 }">
            <div class="social-item" v-if="customData.vCard">
                <a :href="customData.vCard" target="_blank">
                    <div class="circle-box">
                        <svg class="icon"><use href="icons/icons.svg#icon-v-card" xlink:href="icons/icons.svg#icon-v-card"/></svg>
                    </div>
                    <div class="circle-box-title">vCard</div>
                </a>
            </div>
            <div class="social-item" v-if="customData.FacebookURL">
                <a :href="customData.FacebookURL" target="_blank">
                    <div class="circle-box">
                        <!-- <i class="fab fa-facebook"></i> -->
                        <svg class="icon"><use href="icons/icons.svg#icon-facebook" xlink:href="icons/icons.svg#icon-facebook"/></svg>
                    </div>
                    <div class="circle-box-title">Facebook</div>
                </a>
            </div>
            <div class="social-item"  v-if="customData.TwitterURL">
                <a :href="customData.TwitterURL" target="_blank">
                    <div class="circle-box">
                        <!-- <i class="fab fa-twitter"></i> -->
                        <svg class="icon"><use href="icons/icons.svg#icon-twitter" xlink:href="icons/icons.svg#icon-twitter"/></svg>
                    </div>
                    <div class="circle-box-title">Twitter</div>
                </a>
            </div>
            <div class="social-item"  v-if="customData.YouTubeURL">
                <a :href="customData.YouTubeURL" target="_blank" >
                    <div class="circle-box">
                        <!-- <i class="fab fa-youtube"></i> -->
                        <svg class="icon"><use href="icons/icons.svg#icon-youtube" xlink:href="icons/icons.svg#icon-youtube"/></svg>
                    </div>
                    <div class="circle-box-title">Youtube</div>
                </a>
            </div>
            <div class="social-item"  v-if="customData.InstagramURL">
                <a :href="customData.InstagramURL" target="_blank" >
                    <div class="circle-box">
                        <!-- <i class="fab fa-instagram"></i> -->
                        <svg class="icon"><use href="icons/icons.svg#icon-instagram" xlink:href="icons/icons.svg#icon-instagram"/></svg>
                    </div>
                    <div class="circle-box-title">Instagram</div>
                </a>
            </div>
            <div class="social-item"  v-if="customData.LinkedInURL">
                <a :href="customData.LinkedInURL" target="_blank" >
                    <div class="circle-box">
                        <!-- <i class="fab fa-linkedin"></i> -->
                        <svg class="icon"><use href="icons/icons.svg#icon-linkedin" xlink:href="icons/icons.svg#icon-linkedin"/></svg>
                    </div>
                    <div class="circle-box-title">LinkedIn</div>
                </a>
            </div>
            <div class="social-item"  v-if="customData.PinterestURL">
                <a :href="customData.PinterestURL" target="_blank" >
                    <div class="circle-box">
                        <!-- <i class="fab fa-pinterest-square"></i> -->
                        <svg class="icon"><use href="icons/icons.svg#icon-pinterest" xlink:href="icons/icons.svg#icon-pinterest"/></svg>
                    </div>
                    <div class="circle-box-title">Pinterest</div>
                </a>
            </div>
            <div class="social-item"  v-if="customData.GooglePlusURL">
                <a :href="customData.GooglePlusURL" target="_blank" >
                    <div class="circle-box">
                        <!-- <i class="fab fa-google-plus-square"></i> -->
                        <svg class="icon"><use href="icons/icons.svg#icon-google-plus" xlink:href="icons/icons.svg#icon-google-plus"/></svg>
                    </div>
                    <div class="circle-box-title">Google Plus</div>
                </a>
            </div>								
            <div class="social-item"  v-if="customData.ActiveRainURL">
                <a :href="customData.ActiveRainURL" target="_blank" >
                    <div class="circle-box" style="font-weight: 400;">AR</div>
                    <div class="circle-box-title">Activerain</div>
                </a>
            </div>								
            <div class="social-item"  v-if="customData.WebSiteURL">
                <a :href="customData.WebSiteURL.indexOf('http') !== 0 ? '//'+customData.WebSiteURL : customData.WebSiteURL" target="_blank" >
                    <div class="circle-box">
                        <svg class="icon"><use href="icons/icons.svg#icon-hyperlink-3" xlink:href="icons/icons.svg#icon-hyperlink-3"/></svg>
                    </div>
                    <div class="circle-box-title">My website</div>
                </a>
            </div>
        </div>

        <div class="profile-body__bottom">
            <div class="profile-item">
                <svg class="icon icon-profile"><use href="icons/icons.svg#icon-phone" xlink:href="icons/icons.svg#icon-phone"/></svg>
                <div class="text-wrapper">
                    <p v-if="customData.AgentPhone">{{customData.AgentPhone}}</p>
                    <p v-if="!customData.AgentPhone">-</p>
                    <p class="label">Phone Number</p>
                </div>
            </div>
            <div class="profile-item">
                <svg class="icon icon-profile"><use href="icons/icons.svg#icon-email-action-unread" xlink:href="icons/icons.svg#icon-email-action-unread"/></svg>
                <div class="text-wrapper">
                    <p v-if="customData.AgentEmail">{{customData.AgentEmail}}</p>
                    <p v-if="!customData.AgentEmail">-</p>						
                    <p class="label">Email</p>
                </div>
            </div>
        </div>

        <div style="margin: 15px;">
            <a href="tel:8886683948" class="btn btn-call">
                <svg class="icon icon--xs"><use href="icons/icons.svg#icon-phone" xlink:href="icons/icons.svg#icon-phone"/></svg>  <span>Call</span></a>
            <span class="btn btn-close" @click="closeModal()">Close</span>
        </div>	
    </div>
</template>

<script>

import Vue from 'vue'
import Network from './../../../assets/js/network'

export default {
    name: 'AgendDetailsModal',
    components: {},
    props: ['show', 'agentDetailsModal', 'customData'],
    data () {
        return {
        }
    },
    methods: {
        closeModal(){
            this.$emit('close')
        },
    }, 
    computed: {
        socialsArr(){ //used to conditionally add noFriends class, which centers social icons if agent has less than 4 social profiles
			const platforms = ['ActiveRainURL', 'FacebookURL', 'GooglePlusURL', 'InstagramURL', 'LinkedInURL', 'PinterestURL', 'TwitterURL', 'WebSiteURL']
			let result = []
			
			for (let property in this.customData) {
				if (this.customData.hasOwnProperty(property)) {
					for(let i = 0; i < platforms.length; i++){
						if (property === platforms[i] && this.customData[property]){
							result.push(property)
						}
					}
				}
			}
			return result
		},
        pathVersionLink(){
			return this.$store.state.versionPath;
		},
    },
    watch: {},
    mounted () { },
}

</script>