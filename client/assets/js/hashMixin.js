// define a mixin object
var hashMixin = {
  methods: {
    makeHash (evt) {
      var str = evt.target.value;
      if (str.length > 0 && str[str.length -1] != ' ') {
        str = str.replace(/  +/g, ' ');
        str = str.replace(/\s(?!#)/g, ' #');
        if (str[0] != '#') {
          evt.target.value = '#' + str;
        } else {
          evt.target.value = str;
        }
      }
    },
    getHashesFromText (arrayPointer,textTags) {
      var pattern = /#([a-z\d-]+)/ig;
      var match = null;
      while (match = pattern.exec(textTags)) {
        arrayPointer.push(match[1]);
      }
      return arrayPointer;
    }
  }
}

export default hashMixin;
