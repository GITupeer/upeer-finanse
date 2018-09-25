<template>
    <div class="modal-window offer-details" >
        <div class="modal-header">
            <h2>{{customData.supplier_group}}</h2>
            <h3>{{customData.offer_heading}}</h3>
            <svg class="icon"  @click="closeModal()"><use href="icons/icons.svg#icon-remove-circle-alternate" xlink:href="icons/icons.svg#icon-remove-circle-alternate"/></svg>
        </div>
        <section class="modal-content">
            <img :src="customData.logo" v-if="customData.logo" class="logo-img">
            <div v-else class="supplier-name">{{customData.supplier_name}}</div>
            <div class="offer-description"> {{customData.offer_description}}</div>
            <div class="img-wrapper">
                <img :src="customData.offer_picture_url" alt="">
            </div>
            <div class="btn-wrapper">
                <router-link :to="{name: 'MarketplaceDetails'}" class="btn item__link" @click.native="closeModal()">DETAILS</router-link>
                <a :href="customData.offer_url" target="_system" class="btn item__link" @click="closeModal()">GET STARTED</a>
            </div>
        </section>
    </div>
</template>

<script>

import Vue from 'vue'
import Network from './../../../assets/js/network'

export default {
    name: 'OfferDetailsModal',
    components: {},
    props: ['show', 'offerDetailsModal', 'customData'],
    data () {
        return {
            spinner: false,
        }
    },
    methods: {
        closeModal(){
            this.$emit('close')
        },
    }, 
    computed: {},
    watch: {},
    mounted () {},
}

</script>