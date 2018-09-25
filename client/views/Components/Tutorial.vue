<template>

    <div id="tutorial-tooltip" class="tutorial-tooltip">

        <div class="relative-container">
            <div class="triangle" :class="activeTutorial.triangle"></div>
            <div class="tooltip-content">
                <p class="tooltip-title">{{activeTutorial.title}}</p>
                <p class="tooltip-text">{{activeTutorial.text}}</p>
            </div>

            <div class="tooltip-nav">
                <div @click="hideTutorial()">
                    <!-- <i class="far fa-times-circle icon"></i> -->
                    <svg class="icon color-exit"><use href="icons/icons.svg#icon-remove-circle-alternate" xlink:href="icons/icons.svg#icon-remove-circle-alternate"/></svg>
                </div>
                <div @click="nextTooltip()" v-if="activeTutorial.next">
                    
                    <!-- <i class="fas fa-angle-double-right icon"></i> -->
                    <svg class="icon color-exit"><use href="icons/icons.svg#icon-navigation-arrows-right-1" xlink:href="icons/icons.svg#icon-navigation-arrows-right-1"/></svg>
                </div>
            </div>

        </div>
    </div>

</template>

<script>

    export default {
        name: 'Tutorial',
        props: [],
        components: {},
        data () {
            return {
                activeTutorial: {},
                tutorials: {
                    tutorial:{
                        id: 'tutorial',
                        next: 'settings',
                        position: 'below-left',
                        triangle: 'top-left',
                        title: 'Help',
                        text: this.$store.state.userDB.app_copy.tutorial.tutorial.value
                    },
                    settings: {
                        id: 'settings',
                        next: 'profile',
                        position: 'below-right',
                        triangle: 'top-right',
                        title: 'Settings',
                        text: this.$store.state.userDB.app_copy.tutorial.settings.value
                    },
                    profile:{
                        id: 'profile',
                        next: 'quickLead',
                        position: 'below-middle',
                        triangle: 'top-middle',
                        title: 'Profile',
                        text: this.$store.state.userDB.app_copy.tutorial.profile.value
                    },
                    quickLead:{
                        id: 'quickLead',
                        next: 'leadStream',
                        position: 'below-left',
                        triangle: 'top-left',
                        title: 'Quick Lead',
                        text: this.$store.state.userDB.app_copy.tutorial.quick_lead.value
                    },
                    leadStream:{
                        id: 'leadStream',
                        next: 'properties',
                        position: 'below-middle',
                        triangle: 'top-middle',
                        title: 'Lead Stream',
                        text: this.$store.state.userDB.app_copy.tutorial.lead_stream.value
                    },
                    properties:{
                        id: 'properties',
                        next: 'contacts',
                        position: 'below-right',
                        triangle: 'top-right',
                        title: 'Properties',
                        text: this.$store.state.userDB.app_copy.tutorial.properties.value
                    },
                    contacts:{
                        id: 'contacts',
                        next: 'marketplace',
                        position: 'above-left',
                        triangle: 'bottom-left',
                        title: 'Contacts',
                        text: this.$store.state.userDB.app_copy.tutorial.contacts.value
                    },
                    marketplace:{
                        id: 'marketplace',
                        next: 'training',
                        position: 'above-middle',
                        triangle: 'bottom-middle',
                        title: 'Marketplace',
                        text: this.$store.state.userDB.app_copy.tutorial.marketplace.value
                    },
                    training:{
                        id: 'training',
                        next: 'documents',
                        position: 'above-right',
                        triangle: 'bottom-right',
                        title: 'Training',
                        text: this.$store.state.userDB.app_copy.tutorial.training.value
                    },
                    documents:{
                        id: 'documents',
                        next: 'mbc',
                        position: 'above-left',
                        triangle: 'bottom-left',
                        title: 'Documents',
                        text: this.$store.state.userDB.app_copy.tutorial.documents.value
                    },
                    mbc:{
                        id: 'mbc',
                        next: 'convention',
                        position: 'above-middle',
                        triangle: 'bottom-middle',
                        title: 'My Business Card',
                        text: this.$store.state.userDB.app_copy.tutorial.my_business_card.value
                    },
                    convention:{
                        id: 'convention',
                        next: 'support_footer',
                        position: 'above-right',
                        triangle: 'bottom-right',
                        title: 'Convention',
                        text: this.$store.state.userDB.app_copy.tutorial.convention.value
                    },
                    support_footer:{
                        id: 'support_footer',
                        next: 'news_footer',
                        position: 'above-left',
                        triangle: 'bottom-left',
                        title: 'Support',
                        text: this.$store.state.userDB.app_copy.tutorial.support_footer.value
                    },
                    news_footer:{
                        id: 'news_footer',
                        next: 'allExit_footer',
                        position: 'above-left',
                        triangle: 'bottom-left',
                        title: 'News',
                        text: this.$store.state.userDB.app_copy.tutorial.news.value
                        //  text: this.$store.state.userDB.app_copy.tutorial.support_footer.value
                    },
                    allExit_footer:{
                        id: 'allExit_footer',
                        next: 'notifications_footer',
                        position: 'above-middle',
                        triangle: 'bottom-middle',
                        title: 'All Exit',
                        text: this.$store.state.userDB.app_copy.tutorial.all_exit.value
                    },
                    notifications_footer:{
                        id: 'notifications_footer',
                        next: 'profile_footer',
                        position: 'above-right',
                        triangle: 'bottom-right',
                        title: 'Notifications',
                        text: this.$store.state.userDB.app_copy.tutorial.notifications.value
                    },
                    profile_footer:{
                        id: 'profile_footer',
                        next: false,
                        position: 'above-right',
                        triangle: 'bottom-right',
                        title: 'Profile',
                        text: this.$store.state.userDB.app_copy.tutorial.profile_footer.value
                    }
                }
            }
        },
        methods: {
            setTooltip: function(el){
                console.log('1');
                
                let element = document.getElementById(this.tutorials[el].id);
                console.log(element);
                
                let elementPos = element.getBoundingClientRect();
                
                let tooltip = document.getElementById('tutorial-tooltip');
                let tooltipWidth = tooltip.offsetWidth
                let tooltipHeight = tooltip.offsetHeight

                // tooltip.style.opacity = '0'
                // tooltip.style.left = 'inherit'
                // tooltip.style.right = 'inherit'
                // tooltip.style.top = 'inherit'
                // tooltip.style.bottom = 'inherit'
                
                //change this to switch statement
                if(this.tutorials[el].position === 'below-left'){
                    tooltip.style.left = elementPos.left + elementPos.width / 2 + 'px'; 
                    tooltip.style.top = elementPos.top + elementPos.height + 10 + 'px'
                }
                else if(this.tutorials[el].position === 'below-middle'){
                    tooltip.style.left = elementPos.left + (elementPos.width / 2) - (tooltipWidth / 2) + 'px'
                    tooltip.style.top = elementPos.top + elementPos.height + 10 + 'px'
                }
                else if(this.tutorials[el].position === 'below-right'){
                    tooltip.style.left = (elementPos.left + elementPos.width / 2) - tooltipWidth  + 'px'; 
                    tooltip.style.top = elementPos.top + elementPos.height + 10 + 'px'
                }
                else if (this.tutorials[el].position === 'above-left'){
                    tooltip.style.left = elementPos.left + elementPos.width / 2 + 'px'; 
                    tooltip.style.top = elementPos.top - tooltipHeight - 10 + 'px'
                }
                else if (this.tutorials[el].position === 'above-middle'){
                    tooltip.style.left = elementPos.left + (elementPos.width / 2) - (tooltipWidth / 2) + 'px'
                    tooltip.style.top = elementPos.top - tooltipHeight - 10 + 'px'
                }
                else if (this.tutorials[el].position === 'above-right'){
                    tooltip.style.left = (elementPos.left + elementPos.width / 2) - tooltipWidth  + 'px'; 
                    tooltip.style.top = elementPos.top - tooltipHeight - 10 + 'px'
                }

                tooltip.style.opacity = '1'

            },
            nextTooltip: function(){
                this.activeTutorial = this.tutorials[this.activeTutorial.next];
                setTimeout(() => { //needed to position tooltip AFTER content changes. Cleaner solution is welcomed tho :D                                        
                    this.setTooltip(this.activeTutorial.id);
                }, 100); 
            },
            hideTutorial: function(){
                this.$store.commit('showTutorial', {
                    show: 1
                })
            }
        }, 
        computed: {
            showTutorial(){
                return this.$store.state.show_tutorial;
            }
        },
        mounted (){
            this.activeTutorial = this.tutorials.tutorial;
            this.setTooltip(this.activeTutorial.id);
        },
    }

</script>
