<template>

    <div class="app-footer" style="z-index: 1;">

        <div class="bottom_bar" style="background-color: rgb(0, 140, 154);">

            <router-link :to="{name: 'Support'}">
                <div id="support_footer" class="bottom_bar_icon" >
                    <!-- <i class="far fa-question-circle" style="font-size: 20px;"></i> -->
                    <svg class="icon color-white"><use href="icons/icons.svg#icon-headphones-customer-support-question" xlink:href="icons/icons.svg#icon-headphones-customer-support-question"/></svg>
                </div>
            </router-link>

            <router-link :to="{name: 'News'}">
                <div  id="news_footer" class="bottom_bar_icon tooltip">
                    <!-- <i class="fas fa-rss" style="font-size: 20px;"></i> -->
                    <svg class="icon color-white"><use href="icons/icons.svg#icon-app-window-rss" xlink:href="icons/icons.svg#icon-app-window-rss"/></svg>
                </div>
            </router-link>

            <!-- <router-link :to="{name: 'AllExit'}">
                <div id="allExit_footer" class="bottom_bar_icon" >
                    <div style="font-size: 20px; font-weight: 200; margin-left: -10px; margin-right: -10px;">EXIT</div>
                </div>
            </router-link> -->

            <router-link :to="{name: 'Notifications'}">
                <div id="notifications_footer" class="bottom_bar_icon tooltip" >
                    <!-- <i class="far fa-bell" style="font-size: 20px;"></i> -->
                    <svg class="icon color-white"><use href="icons/icons.svg#icon-alarm-bell-1" xlink:href="icons/icons.svg#icon-alarm-bell-1"/></svg>
                </div>
            </router-link>
                
            <router-link :to="{name: 'MyProfile'}">
                <div id="profile_footer" class="bottom_bar_icon"  >
                    <!-- <div class="user_photo" :style="'background-image:url(' + userData.UserPhotoURL + ');'"></div> -->
                    <svg class="icon color-white"><use href="icons/icons.svg#icon-single-neutral-circle-alternate" xlink:href="icons/icons.svg#icon-single-neutral-circle-alternate"/></svg>
                </div>
            </router-link>
        </div>

    </div>

</template>

<script>

import Vue from 'vue'

    export default {
        name: 'PageFooter',
        components: {},

        data () {
            return {
                // show_notification: true,
                // modal: {
                //   title: 'SORRY',
                //   content: "This section is still in development."
                // }
            }
        },
        methods: {
            // hide_notification: function(){
            //     var scope = this;

            //     $('.close_pop_up').on('click', function(){
            //         scope.show_notification = false;
            //     })
            // },
            // sorryModal(){
            //   Vue.eventBus.$emit('showModalDefault', this.modal);

            // }
        },
        computed: {
            userData () {
                return this.$store.state.user;
            }
        },
        mounted () {
            // this.hide_notification()
        }
    }

</script>
