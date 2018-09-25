import Vue from 'vue'

Vue.directive('cursor-end',
function (el) {
  if(typeof device !== "undefined" && device.platform == 'Android')
  {
    window.setTimeout(()=>{el.setSelectionRange(el.value.length,el.value.length);},10);
  }
});
