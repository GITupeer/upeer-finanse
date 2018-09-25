import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'

import LayoutFront from '../views/Layouts/LayoutFront'
import LayoutApp from '../views/Layouts/LayoutApp'


import Store from '../store/index'
// import Synchronization from './../assets/js/synchronization'

import Login from '../views/auth/Login.vue'
import News from '../views/News.vue'
import Dashboard from '../views/Dashboard.vue'
import ToDo from '../views/ToDo.vue'
import OfficeDirectory from '../views/OfficeDirectory.vue'
import QuickLead from '../views/QuickLead.vue'
import SendMBC from '../views/SendMBC.vue'
import PotentialBauer from '../views/PotentialBauer.vue'
import PotentialSeller from '../views/PotentialSeller.vue'
import SponsorRecruit from '../views/SponsorRecruit.vue'
import LeadStream from '../views/LeadStream.vue'
import Notifications from '../views/Notifications.vue'
import Properties from '../views/Properties.vue'
import Training from '../views/Training.vue'
import Promote from '../views/Promote.vue'
import SendProperty from '../views/SendProperty.vue'
import MBC from '../views/MBC.vue'
import Contacts from '../views/Contacts.vue'
import Support from '../views/Support.vue'
import AllExit from '../views/AllExit.vue'
import Marketplace from '../views/Marketplace.vue'
import MyProfile from '../views/MyProfile.vue'
import Calenadar from '../views/Calendar.vue'
import Documents from '../views/Documents.vue'
import Convention from '../views/Convention.vue'
import MapPin from '../views/MapPin.vue'
import Settings from '../views/Settings.vue'
import eManuals from '../views/eManuals.vue'
import ReportAProblem from '../views/ReportAProblem.vue'
import MarketplaceDetails from '../views/MarketplaceDetails.vue'

console.log('Store:',Store);

if(Store.getters.getUserToken == null)
{
  Store.dispatch('loadUserFromStorage');
}

Vue.use(Router);
Vue.use(VueResource);

const router = new Router({
    mode: 'hash',
    routes: [
        {
            path: '/app',
            component: LayoutApp,
            children: [
                {
                    name: 'Dashboard',
                    path: '/',
                    component: Dashboard,
                    meta: { auth: true}

                },
                {
                    name: 'ToDo',
                    path: 'ToDo',
                    component: ToDo,
                    meta: { auth: true}

                },
                {
                    name: 'OfficeDirectory',
                    path: 'OfficeDirectory',
                    component: OfficeDirectory,
                    meta: { auth: true}

                },
                {
                    name: 'QuickLead',
                    path: 'quick-lead',
                    component: QuickLead,
                    meta: { auth: true}
                },
                {
                    name: 'SendMBC',
                    path: 'quick-lead/send-mbc',
                    component: SendMBC,
                    meta: { auth: true}
                },
                {
                    name: 'News',
                    path: 'news',
                    component: News,
                    meta: { auth: true}
                },
                {
                    name: 'PotentialBauer',
                    path: 'quick-lead/potential-bauer',
                    component: PotentialBauer,
                    meta: { auth: true}
                },
                {
                    name: 'PotentialSeller',
                    path: 'quick-lead/potential-seller',
                    component: PotentialSeller,
                    meta: { auth: true}
                },
                {
                    name: 'SponsorRecruit',
                    path: 'quick-lead/sponsor-a-recruit',
                    component: SponsorRecruit,
                    meta: { auth: true}
                },
                {
                    name: 'LeadStream',
                    path: 'quick-lead/lead-stream',
                    component: LeadStream,
                    meta: { auth: true}
                },
                {
                    name: 'Notifications',
                    path: 'quick-lead/notifications',
                    component: Notifications,
                    meta: { auth: true}
                },
                {
                    name: 'Properties',
                    path: 'properties',
                    component: Properties,
                    meta: { auth: true}
                },
                {
                    name: 'Training',
                    path: 'training',
                    component: Training,
                    meta: { auth: true}
                },
                {
                    name: 'Promote',
                    path: 'properties/promote/:id/:bearer',
                    component: Promote,
                    meta: { auth: true}
                },
                {
                    name: 'MapPin',
                    path: 'properties/gps/:id',
                    component: MapPin,
                    meta: { auth: true}
                },
                {
                    name: 'SendProperty',
                    path: 'SendProperty/:orgId/:mlsNumber',
                    component: SendProperty ,
                    meta: { auth: true}
                },
                {
                    name: 'ReportAProblem',
                    path: 'ReportAProblem/:id',
                    component: ReportAProblem ,
                    meta: { auth: true}
                },
                {
                    name: 'MBC',
                    path: 'mobile-business-card',
                    component: MBC,
                    meta: { auth: true}
                },
                {
                    name: 'Contacts',
                    path: 'contacts',
                    component: Contacts,
                    meta: { auth: true}
                },
                {
                    name: 'Support',
                    path: 'support',
                    component: Support,
                    meta: { auth: true}
                },
                {
                    name: 'AllExit',
                    path: 'all-exit',
                    component: AllExit,
                    meta: { auth: true}
                },
                {
                    name: 'Marketplace',
                    path: 'marketplace',
                    component: Marketplace,
                    meta: { auth: true}
                },
                {
                    name: 'MyProfile',
                    path: 'my-profile',
                    component: MyProfile,
                    meta: { auth: true}
                },
                {
                    name: 'Settings',
                    path: 'settings',
                    component: Settings,
                    meta: { auth: true}
                },
                {
                    name: 'eManuals',
                    path: 'eManuals',
                    component: eManuals,
                    meta: { auth: true }
                },
                {
                    name: 'Calendar', //not used 
                    path: 'calendar',
                    component: Calenadar,
                    meta: { auth: true,}
                },
                {
                    name: 'Documents',
                    path: 'dosuments',
                    component: Documents,
                    meta: { auth: true,}
                },
                {
                    name: 'Convention',
                    path: 'convention',
                    component: Convention,
                    meta: { auth: true}
                },
                {
                    name: 'MarketplaceDetails',
                    path: 'marketplace-details',
                    component: MarketplaceDetails,
                    meta: { auth: true}
                },


            ]
        },
        {
          path: '/',
          component: LayoutFront,
          children: [
            {
              name: 'Login',
              path: 'auth/login',
              component: Login,
              meta: { auth: false, authRedirect: true}
            },
              { path: '*', redirect: 'auth/login' }
          ]
        }

    ],
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})



router.beforeEach((to, from, next) => {

    Vue.eventBus.$emit('closeModal');

    if (to.matched.some(record => record.meta.auth)) {
        console.log('tets');

        //google tag manager - gta - SCREEN event
        dataLayer.push({
            'screenPath': to.path,
            'screenName': to.name, 
            'sessionID': Store.state.user ? Store.state.user.UserName : 'notLogged'
        });
        dataLayer.push({'event': 'appScreenView'});

        if (Store.getters.getUserToken == null) {
            next({
                name: 'Login'
            })
        }
        else {
            next()
        }
    }
    else if (to.matched.some(record => record.meta.authRedirect)) {
        if (Store.getters.getUserToken != null) {
            next({
                name: 'Dashboard'
            })
        }
        else {
            next()
        }
    }
    else {
        next() // make sure to always call next()!
    }
})

router.afterEach((to, from, ) => {


});


export default router
