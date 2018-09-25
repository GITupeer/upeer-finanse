<template>
    <div class="modal-window support-modal">
        <div class="modal-header">
            <svg class="icon" @click="closeModal()"><use href="icons/icons.svg#icon-remove-circle-alternate" xlink:href="icons/icons.svg#icon-remove-circle-alternate"/></svg>
        </div>
        <div class="modal-content">
            <svg v-if="spinner" class="icon icon-xs spinning"><use href="icons/icons.svg#icon-loading-circle" xlink:href="icons/icons.svg#icon-loading-circle"/></svg>
            <iframe id="editProfile_iframe" :src="customData" scrolling="yes" ></iframe>
        </div>
    </div>
</template>

<script>

import Vue from 'vue'
import Network from './../../../assets/js/network'

export default {
    name: 'SupportModal',
    components: {},
    props: ['show', 'supportModal', 'customData'],
    data () {
        return {
            spinner: true,
        }
    },
    methods: {
        closeModal(){
            this.$emit('close')
        },
    }, 
    computed: {},
    watch: {},
    mounted () {
        document.querySelector('iframe').onload = () => this.spinner = false;
    },
}

</script>