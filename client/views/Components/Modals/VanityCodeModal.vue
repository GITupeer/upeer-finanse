<template>
    <div class="modal-window">
        <div class="sending_info_container_inner">
            <div class="modal-header">
                <svg class="icon"  @click="closeModal()"><use href="icons/icons.svg#icon-remove-circle-alternate" xlink:href="icons/icons.svg#icon-remove-circle-alternate"/></svg>
            </div>
            <div class="modal-content">
                <div style="font-size: 13px; margin-bottom: 3px;"> Choose a Custom Text Code </div>
                <form action="" @submit.prevent='sendChangeVanity' novalidate class="form">
                    <div class="form__group">
                        <input type="text" style="padding-left: 0;" class="input" placeholder="Vanity Code" id="vanity_code" name="vanity_code" v-model="vanityCode">
                        <span class="input__border"></span>
                    </div>
                    <button style="margin-top: 4px; color: rgb(0, 163, 180); font-size: 11px; padding: 7px 32px; border: 0.05rem solid rgb(90, 178, 187); border-radius: 16px; font-weight: bold; background-color: rgb(255, 255, 255); transition: all .1s;" type="submit">
                        <span v-if="!spinner">Change</span>
                        <svg v-if="spinner" class="icon icon--xs spinning"><use href="icons/icons.svg#icon-loading-circle" xlink:href="icons/icons.svg#icon-loading-circle"/></svg>
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import Vue from 'vue'
import Network from './../../../assets/js/network'

export default {
    name: 'VanityCodeModal',
    components: {},
    props: ['show', 'vanityCodeModal', 'customData'],
    data () {
        return {
            spinner: false,
            vanityCode: ''
        }
    },
    methods: {
        sendChangeVanity() {
            this.spinner = true;
            
            let data = {
                vanityCode: this.vanityCode,
                rosterCode: this.userData.UserName
            }
            this.$http.post(this.pathVersionLink+'api/mbc/changeVanity', data).then(res => {
                this.data = res.data

                var modal = {
                    'title': res.data.message_title,
                    'content': res.data.message_body
                }

                if (res.data['status'] == 'success'){
                    this.$store.state.mbcInfo.keyword = this.vanityCode;
                }

                this.spinner = false;

                this.closeModal();

                Vue.eventBus.$emit('showModalDefault', modal);

            }).catch(error => {
                this.spinner = false
                Vue.eventBus.$emit('showModalDefault', modal);
            })
		},
        closeModal(){
            this.$emit('close')
        },
    }, 
    computed: {
        userData (){
			return this.$store.state.user;
        }, 
        mbcInfo (){
			return this.$store.state.mbcInfo;
        }, 
        pathVersionLink(){
			return this.$store.state.versionPath;
		},
    },
    mounted () {
        this.vanityCode = this.customData;
    },
}

</script>