import Vue from 'vue'
import Notification from './../../views/Components/Notification'

const NotificationComponent = Vue.extend(Notification);

const openNotification = (propsData = {
    title: '',
    message: '',
    type: '',
    direction: '',
    duration: 5500,
    container: '.notifications'
}) => {
    return new NotificationComponent({
        el: document.createElement('div'),
        propsData
    })
};


var notificationMixin = {
    components: {
        Notification
    },
    methods: {
        openNotificationWithType (type, title, message) {
            openNotification({
                title: title,
                message: message,
                type: type
            })
        }
    }
};

export default notificationMixin;