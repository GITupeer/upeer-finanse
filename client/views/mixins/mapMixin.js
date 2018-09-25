import _ from 'lodash';
import Store from '../../store/index';

// define a mixin object
var mapMixin = {
  data () {
    return {
      markerLastSelected: -1,
      map: null,
      place: '',
      markers: [],
      location: {
        Latitude: '',
        Longitude: ''
      },
      waitPointer: null
    }
  },
  computed: {
    googleInstance () {
      if (google != null) {
        return true;
      } else {
        return false;
      }
    }
  },
  updated () {
    if (google != null && this.map != null) {
      google.maps.event.trigger(this.map, 'resize');

      // if (location != null) {
      //   try {
      //     this.map.setCenter(this.location)
      //   }
      //   catch (e) {
      //     console.log(e);
      //   }
      // }
    }
  },
  methods: {
    setUpMap(obj)
    {
      var targetObject = null;
      var location = null;
      var zoom = null;

      if (obj != null) {
        targetObject = _.get(this, obj);
      }
      else {
        targetObject = this.location;
      }

      if (targetObject.Latitude != '') {
        zoom = 12;
        location = {lat: targetObject.Latitude, lng: targetObject.Longitude};
      }
      else {
        zoom = 4;
        location = {lat: 39.471314, lng: -100.577034};
      }

      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: zoom,
        center: location,
        scrollwheel: false
      });

    },
    initMap (obj) {
      return this.getUserPosition(obj).then(() => {
        this.setUpMap(obj);

      }).catch(() => {
        this.setUpMap(obj);
      });
    },
    getPosition(objectPointer, resolve, reject)
    {
      var checkNavigator = false;
      setTimeout( () => {
        if (!checkNavigator) {
          reject('We could not get your location. Mosz zdupiony GPS.');
        }
      }, 3000);
      navigator.geolocation.getCurrentPosition((position) => {
        checkNavigator = true;
        if (objectPointer != null) {
          var targetObject = _.get(this, objectPointer);

          this.$set(targetObject, 'Latitude', position.coords.latitude);
          this.$set(targetObject, 'Longitude', position.coords.longitude);
        }
        this.location = {Latitude: position.coords.latitude, Longitude: position.coords.longitude};
        resolve();
      }, (error) => {
        checkNavigator = true;
        reject('We could not get your location: ' + error.message);
      });
    },
    getUserPosition (objectPointer) {
      return new Promise((resolve, reject) => {
        if (isPhoneGap()) {
          if (Store.state.deviceReady == true) {
            this.getPosition(objectPointer, resolve, reject);
          } else {
            this.waitPointer = window.setInterval(() => {
              if (Store.state.deviceReady == true) {
                window.clearInterval(this.waitPointer);
                this.getPosition(objectPointer, resolve, reject);
              }
            }, 500);
          }
        } else {
          this.getPosition(objectPointer, resolve, reject);
        }
      });
    },
    useCurrentLocation(modelName) {
      this.getUserPosition(modelName).then(() => {
        this.addMarkerToMap(modelName)
      }).then(() => {
        this.geocodeLatLng(modelName)
      }).catch(() => {
      });
    },
    centerPosition(){
      if (this.map != null && this.markers.length > 0) {
        var bounds = this.markers.reduce((bounds, marker) => {
          return bounds.extend(marker.getPosition());
        }, new google.maps.LatLngBounds());

        this.map.setCenter(bounds.getCenter());
        this.map.fitBounds(bounds);
        if (this.map.getZoom() > 12) {
          this.map.setZoom(12);
        }
      }
    },
    geocodeLatLng(obj, precision) {
      if (obj != null) {
        var targetObject = _.get(this, obj);
      }

      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({
        'location': {
          lat: parseFloat(targetObject.Latitude),
          lng: parseFloat(targetObject.Longitude)
        }
      }, function (results, status) {
        if (status == 'OK') {
          this.fillPlaceData(obj, results[0], precision);
        } else {
          //alert('Geocode was not successful for the following reason: ' + status);
        }
      }.bind(this));
    },
    addDragableMarker(targetObject,callBack){

      if (this.markers != null)
      {
        _.forEach(this.markers, (marker) => {
          marker.setMap(null)
        })
        this.markers = [];
      }

      var currentLatLng = {lat: parseFloat(targetObject.Latitude), lng: parseFloat(targetObject.Longitude)};

      var marker = new google.maps.Marker({
        position: currentLatLng,
        map: this.map,
        draggable:true
      });

      marker.addListener('dragend', (event) => {
        callBack(event);
      });
      
      this.markers.push(marker);

      window.setTimeout(() => {
        this.centerPosition();
      }, 200);
    },
    addMarkerToMap(obj, targetArray, callBack) {
      if (this.markers != null) {
        _.forEach(this.markers, (marker) => {
          marker.setMap(null)
        })
        this.markers = [];
      }

      var icon = require('./../../../static/images/exit_icons_active/properties.png');
      var iconSelected = require('./../../../static/images/exit_icons_active/quick_lead.png');

      if (obj != null) {
        var targetObject = _.get(this, obj);
        addMarker.apply(this, [targetObject, callBack]);
      } else {
        _.forEach(targetArray, (target) => {
          addMarker.apply(this, [target, callBack])
        })
      }

      function addMarker(targetObject, callBack) {

        var currentLatLng = {lat: parseFloat(targetObject.Latitude), lng: parseFloat(targetObject.Longitude)};

        var marker = new google.maps.Marker({
          position: currentLatLng,
          map: this.map,
          icon: icon
        });

        marker.addListener('click', () => {

          marker.setAnimation(google.maps.Animation.BOUNCE);
          window.setTimeout(() => {
            marker.setAnimation(null);
          }, 1400);

          this.markers.forEach((element) => {
            element.setIcon(icon);
          });

          marker.setIcon(iconSelected);

          if (callBack != undefined) {
            callBack(targetObject.ID);
          }
        });

        this.markers.push(marker)
      }

      window.setTimeout(() => {
        this.centerPosition();
      }, 200);
    },
    addAutocompleteListener(el, obj, marker, precision) {
      var input = document.getElementById(el);
      var options = {
        types: ['address']
      };

      if (precision != null) {
          options.types = ['(cities)']
      } else {
          options.types = []
      }

      var autocomplete = new google.maps.places.Autocomplete(input, options);

      autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();

        if (!place.place_id) {
          alert("Please select an option from the dropdown list.");
          return;
        } else {
          if (obj != null) {
            this.fillPlaceData(obj, place);
          }
          if (this.map != null && marker) {
            this.addMarkerToMap(obj);
          }
        }
      }.bind(this));

      google.maps.event.addDomListener(input, 'keydown', function (e) {
        if (e.keyCode == 13) {
          e.preventDefault();
        }
      });
    },
    fillPlaceData(obj, place, precision) {
      var targetObject = _.get(this, obj);
      var address = place.address_components;

      var number = _.find(address, (component) => {
        return component.types[0] == 'street_number'
      });
      var street = _.find(address, (component) => {
        return component.types[0] == 'route'
      });
      var city = _.find(address, (component) => {
        return component.types[0] == 'locality'
      });
      var area = _.find(address, (component) => {
        return component.types[0] == 'administrative_area_level_1'
      });
      var postal = _.find(address, (component) => {
        return component.types[0] == 'postal_code'
      });

      // street, city i zip
      (postal != null && area != null) ? this.$set(targetObject, 'zip', area.short_name + ' ' + postal.long_name) : this.$set(targetObject, 'zip', ' ');
      (street != null && number != null) ? this.$set(targetObject, 'street', street.long_name + ' ' + number.long_name) : this.$set(targetObject, 'street', ' ');
      (city != null) ? this.$set(targetObject, 'city', city.long_name) : this.$set(targetObject, 'city', ' ');

      if (precision != null && street != null) {
        var new_place = place.formatted_address.split(',').slice(1).join(', ')
        this.$set(targetObject, 'location', new_place);
      } else {
        this.$set(targetObject, 'location', place.formatted_address);
      }

      this.$set(targetObject, 'Latitude', place.geometry.location.lat());
      this.$set(targetObject, 'Longitude', place.geometry.location.lng());
    },
    addAutocompleteListenerForUserFields (input, output) {

      var options = {
        types: ['(cities)'],
      }

      var autocomplete = new google.maps.places.Autocomplete(input, options);

      autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();

        if (!place.place_id) {
          alert("Please select an option from the dropdown list.");
          return;
        } else {
          this.user[output] = place.formatted_address
        }
      }.bind(this));
    },
    setMapCenter (lat, lng) {
      this.map.setCenter({lat: lat, lng: lng});
    }
  }
};

export default mapMixin;
