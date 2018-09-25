<template>
    <div class="modal-window">
        <div class="sending_info_container_inner">
            <div class="modal-header">
                <svg class="icon"  @click="closeModal()"><use href="icons/icons.svg#icon-remove-circle-alternate" xlink:href="icons/icons.svg#icon-remove-circle-alternate"/></svg>
            </div>
            <div class="modal-content">
                <h2 v-text="title"></h2>
                <p v-text="content"></p>
                <button class="green" @click="closeModal()">OK </button>
            </div>
        </div>
    </div>

</template>

<script>

import Vue from 'vue'
import Network from './../../../assets/js/network'

export default {
    name: 'DefaultModal',
    components: {},
    props: ['show', 'defaultModal', 'customData'],
    data () {
        return {
            spinner: false,
            title: '',
            content: ''
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
        this.title = this.customData.title; 
        this.content = this.customData.content; 
    },
}

</script>