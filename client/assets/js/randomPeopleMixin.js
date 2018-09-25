import Network from './network'
import notificationMixin  from './notificationMixin';

var randomPeopleMixin = {
    methods: {
        getNextPerson(direction) {
            var person = this.$store.state.discoverPerson;
            var sendData = {};

            if(person == null)
            {
              sendData = {
                user_id : 0,
                direction: 'left'
              };
            }
            else if(typeof direction !== "undefined")
            {
              sendData = {
                user_id : person.id,
                direction: direction
              };
            }
            else
            {
              return this.$router.push({name: 'discover', params: {id: person.id}});
            }

            return this.getuserDataFromServer(sendData);
        },
        getuserDataFromServer(sendData,reload){
          this.$root.startLoader('Loading data');
          Network.post(
            Network.action.getUserData,
            sendData,
            {
              successCallback: (response) => {
                this.$store.commit('updateDiscoverPerson', {
                  user: response.user
                })

                this.$root.stopLoader();
                if(reload != undefined)
                {
                  this.startComponent();
                }
                else
                {
                  this.$router.push({name: 'discover', params: {id: response.user.id}});
                }
              },
              errorCallback: (response) => {
                this.$root.stopLoader();
                this.openNotificationWithType('warning', 'Oops!', response[Object.keys(response)[0]][0]);
                this.$root.back();
              }
            }
          )
        }
    }
};

export default randomPeopleMixin;
