import Vue from 'vue'

Vue.directive('format-input',
function (el, binding) {
  el.value = el.value.replace(binding.value.pattern, binding.value.replace);
  var customEvent = document.createEvent('Event');
  customEvent.initEvent('input', true, true);
  el.dispatchEvent(customEvent);
})
