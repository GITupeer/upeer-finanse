// define a mixin object
var modalMixin = {
    data () {
      return {
          show: false
      }
    },
    methods: {
        close () {
            this.show = false;
        }
    },
    ready () {
        document.addEventListener("keydown", (e) => {
            if (this.show && e.keyCode == 27) {
                this.show = false;
            }
        });
    },
    watch: {
        show () {
            if (this.show == true) {
                document.body.classList.add('modal-open')
            } else {
                document.body.classList.remove('modal-open')
            }
        }
    }
}

export default modalMixin;