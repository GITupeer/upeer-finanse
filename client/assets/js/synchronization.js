import Store from '../../store/index';
import Network from './network';

const Synchronization = {

  getUser : () => {
    return new Promise((resolve, reject) => {
      Network.post(
        Network.action.getUserData,
        null,
        {
          successCallback: (response) => {
            Store.commit('updateUser', response);
            resolve('Success');
          },
          errorCallback: (response) => {
            reject(response);
          }
        }
      );
    })
  },

  allUsers : () => {
    return new Promise((resolve, reject) => {
      Network.post(
        Network.action.allUsers,
        null,
        {
          successCallback: (response) => {
            Store.commit('updatePeople', response);
            resolve('Success');
          },
          errorCallback: (response) => {
            reject(response);
          }
        }
      );
    })
  },

  newestMessage : () => {
    return new Promise((resolve, reject) => {
      Network.post(
        Network.action.newestMessage,
        null,
        {
          successCallback: (response) => {
            Store.commit('updateMessageStatus', {
              messageStatus: response.response
            })
            resolve('Success');
          },
          errorCallback: (response) => {
            reject(response);
          }
        }
      );
    }) },

    userConnections : () => {
      return new Promise((resolve, reject) => {
        Network.post(
          Network.action.userConnections,
          null,
          {
            successCallback: (response) => {
              Store.commit('updateConnections', {
                connections: response.response
              });
              resolve('Success');
            },
            errorCallback: (response) => {
              reject(response);
            }
          }
        );
      }) },

      userFollowers : () => {
        return new Promise((resolve, reject) => {
          Network.post(
            Network.action.userFollowers,
            null,
            {
              successCallback: (response) => {
                Store.commit('updateFollowers', {
                  followers: response.response
                });
                resolve('Success');
              },
              errorCallback: (response) => {
                reject(response);
              }
            }
          );
        })
      },

      userNotifications : () => {
        return new Promise((resolve, reject) => {
          Network.post(
            Network.action.userNotReadedNotifications,
            null,
            {
              successCallback: (response) => {
                Store.commit('updateNotificationTable', {
                  notificationTable: response.response
                });
                resolve('Success');
              },
              errorCallback: (response) => {
                reject(response);
              }
            }
          );
        })
      },

      runAllUpdates: (success,error) => {
        Promise.all([
          Synchronization.getUser(),
          Synchronization.newestMessage(),
          Synchronization.userConnections(),
          Synchronization.userFollowers()
        ]).then(values => {
          success(values);
        }).catch(reason => {
          error(reason);
        });
      }
    }

    export default Synchronization
