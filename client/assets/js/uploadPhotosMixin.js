import _ from 'lodash'
import Network from './network'
import Vue from 'vue'

var uploadPhotosMixin = {
  data: function () {
    return {
      photos: [],
      removedPhotos: [],
      maxWidthHeight: 1000,
      counter: 0,
      options: {
        directly: false,
        type: '',
        link: '',
      },
      newPhotos: [],
    }
  },
  methods: {
    // add photos functions
    savePhotos (options, evt) {
      this.options = options;

      if (evt != null) {
        let files = evt.target.files;
        if (this.options.maxPhotos != null) {
            var available_space = this.options.maxPhotos - this.photos.length;
            if (available_space < files.length) {
              var message;
              if (available_space <= 0) {
                message = 'You cannot add any additional photos.';
              } else if (available_space == 1) {
                message = 'You can add only ' + available_space + ' additional photo.';
              } else {
                message = 'You can add only ' + available_space + ' additional photos.';
              }
              this.openNotificationWithType('warning', 'Oops!', message);
              return
            };
        };

        this.convertFilesToBase64(files).then(() => {
          if (options.directly) {
            this.$root.startLoader('Uploading data');
            this.savePhotosToDB();
          } else {
            if (this.$refs.slider) {
              this.$refs.slider.currentPhoto = (this.photos.length - 1);
            }
            this.$root.stopLoader()
          }
        });
      } else {
        this.$root.startLoader('Uploading data');
        this.savePhotosToDB()
      }

    },
    convertFilesToBase64 (files) {
      this.$root.startLoader('Converting photos');

      let count = files.length;
      let i = 0;

      return new Promise((resolve, reject) => {
        var length = files.length;
        for (let fileIndex = 0; fileIndex < length; fileIndex++) {
          let reader = new FileReader();
          let file = files[fileIndex];

          reader.onload = (event) => {
            let img = new Image();

            img.onload = () => {
              let ratio = Math.min(this.maxWidthHeight / img.naturalWidth, this.maxWidthHeight / img.naturalHeight);
              let currentWidth = ratio * img.naturalWidth;
              let currentHeight = ratio * img.naturalHeight;
              let cropCanvas = document.createElement('canvas');
              cropCanvas.setAttribute('width', currentWidth);
              cropCanvas.setAttribute('height', currentHeight);
              cropCanvas.getContext("2d").drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, currentWidth, currentHeight);

              if (this.photos.length === 0) {
                this.photos.push({
                  photo: cropCanvas.toDataURL('image/jpeg', 1.0),
                  type: 'AVATAR',
                  isNew: true
                });
              } else {
                this.photos.push({
                  photo: cropCanvas.toDataURL('image/jpeg', 1.0),
                  type: 'PHOTO',
                  isNew: true
                });
              }

              ++i;

              if (count === i) {
                resolve();
              }
            };

            img.src = event.target.result;
          };
          reader.onerror = (e) => {
          };
          reader.readAsDataURL(file);
        }
      });
    },
    savePhotosToDB () {
      this.newPhotos = _.filter(this.photos, (photo) => {
        return (typeof photo.id === 'undefined' || photo.isNew || photo.crop);
      });

      let numberOfImages = this.newPhotos.length - 1;

      if (this.counter <= numberOfImages && numberOfImages >= 0) {
        let image = this.newPhotos[this.counter];
        let data = this.prepareDataObject(image);
        this.saveSinglePhoto(data);
        this.counter++
      } else {
        this.counter = 0;

        _.remove(this.photos, (photo) => {
          return (photo.id == null || photo.isNew || photo.crop)
        });

        if (this.$refs.slider) {
          this.$refs.slider.currentPhoto = (this.photos.length - 1)
        }

        this.$root.stopLoader()
        if (this.options.redirect != null) {
          this.$router.push({name: this.options.redirect.name, params: this.options.redirect.params});
        }

        if (this.options.notification == null) {
          this.openNotificationWithType('success', 'Success!', 'Your photos was succesfully uploaded.');
        } else {
          this.openNotificationWithType('success', 'Success!', 'Your event was succesfully added.');
        }
        this.clearOptions();
      }
    },
    saveSinglePhoto(data) {
      Network.post(
        Network.action[this.options.link],
        data,
        {
          successCallback: (response) => {
            this.elaborateResponse(response);
            this.savePhotosToDB();
          },
          errorCallback: (response) => {
            this.formMutex = true;
            this.$root.stopLoader()
            this.openNotificationWithType('warning', 'Oops!', 'Something went wrong.');
          }
        }
      )
    },
    prepareDataObject (image)
    {

      let data = new FormData();

      data.append('data', image.photo);

      if (image.id)
      {
        data.append('photo_id', image.id);
      }

      if (image.type)
      {
        data.append('type', image.type);
      }

      switch (this.options.type)
      {
        case 'event' :
          data.append('event_id', this.$route.params.id || this.options.redirect.params.id);
        break;

        case 'memories' :
        case 'memoriesUpdate' :
          data.append('event_id', this.$route.params.event_id);
        break;
      }

      return data;
    },
    elaborateResponse (response) {
      switch(this.options.type)
      {
        case 'event' :
          this.photos.push(response.response);
        break;

        case 'user' :
          if (this.counter > this.newPhotos.length - 1) {
            this.updateUser(response.response)
          }
        break;

        case 'memories':
          this.$parent.item.memories.push(response.response);
        break;

        case 'memoriesUpdate' :
          this.updateMemories(response.response);
          this.startComponent();
        break;
      }
    },

    // remove photo function
    removePhoto (options) {
      this.options = options;
      let i = this.currentPhoto;
      let photo = this.photos[i];

      if (photo != null) {
        if (photo.type !== 'AVATAR') {
          this.executeRemove({photoIds: [photo.id]}, i);
        } else {
          this.openNotificationWithType('warning', 'Oops!', 'Sorry this photo is already avatar. You mustn\'t remove this photo.');
        }
      } else {
        this.executeRemove({photoIds: [this.photos[0].id]}, 0);
      }
    },
    executeRemove (data, i) {

      if (this.options.directly) {
        Network.post(
          Network.action[this.options.link],
          data,
          {
            successCallback: (response) => {
              this.elaborateRemoveResponse(response.response, i);
            },
            errorCallback: (response) => {
              this.clearOptions();
              this.openNotificationWithType('warning', 'Oops!', 'Something went wrong.');
            }
          }
        )
      } else {
        this.photos.splice(i, 1);
        this.$refs.slider.currentPhoto = (this.photos.length - 1);
      }
    },
    elaborateRemoveResponse (response, i) {
      if (this.options.type == 'event') {
        this.item = response;
        this.photos.splice(i, 1);
      }
      if (this.options.type == 'user') {
        this.updateUser(response)
      }


      this.$refs.slider.currentPhoto = (this.photos.length - 1)
      this.$root.stopLoader()
      this.clearOptions();
      this.openNotificationWithType('success', 'Success!', 'Your photos was successfully removed.');
    },


    // change photo type functions
    changeMain (options) {
      let i = this.currentPhoto;
      if (this.photos[i].type !== 'AVATAR') {
        this.options = options;

        if (this.options.directly) {
          this.executeChangeMain({photo_id: this.photos[i].id, type: 'AVATAR'})
        } else {
          var avatar = _.find(this.photos, {type: 'AVATAR'});
          avatar.type = 'PHOTO';
          this.photos[i].type = 'AVATAR';
        }
      } else {
        this.openNotificationWithType('warning', 'Oops!', 'Sorry this photo is already avatar. Choose other, please.');
      }
    },
    executeChangeMain (data) {
      Network.post(
        Network.action[this.options.link],
        data,
        {
          successCallback: (response) => {
            this.elaborateChangeMainResponse(response, data)
          },
          errorCallback: (response) => {
            this.clearOptions();
            this.openNotificationWithType('warning', 'Oops!', 'Something went wrong.');
          }
        }
      )
    },
    elaborateChangeMainResponse (response, data) {
      if (this.options.type === 'event') {
        var obj = this.item.photos;
        var old_avatar = _.find(obj, {id: response.old_id});
        var avatar = _.find(obj, {id: data.photo_id});
        if (old_avatar != null) {
          old_avatar.type = 'PHOTO';
        }
        if (avatar != null) {
          avatar.type = 'AVATAR';
        }
        this.tryGetPhotos();

      }

      if (this.options.type === 'user') {
          this.updateUser(response.response)
      }

      this.clearOptions();
      this.$root.stopLoader()
    },

    // helper functions
    tryGetPhotos () {
      if (this.item != null) {
        this.photos = _.cloneDeep(this.item.photos);
      }
      if (this.user != null) {
        this.photos = _.cloneDeep(this.user.photos);
      }
    },
    clearOptions () {
      this.options = {
        directly: false,
        type: '',
        link: ''
      };
    },
    updateUser (response) {
      this.$store.commit('updateUser', {user: response});
      this.user = response.response;
      this.tryGetPhotos()
    },
    updateMemories (response) {
      response.comments.reverse();
      this.$store.commit('updateMemoriesDetail', {
        memories: response
      });
    }
  }
};

export default uploadPhotosMixin;
