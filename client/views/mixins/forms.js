export default {
    data () {
        return {
            phone: '',
            email: ''
        }
    },
    methods: {
        //NOT USED PROBABLY => CONFIRM AND DELETE
        validate: function(){
            $('.valid_info').fadeOut()
            if(this.phone == '' && this.email == ''){
                $('.valid_info').fadeIn()
                return false
            }else{

                this.$validator.validateAll().then( success => {
                    if (!success) {
                        // handle error
                        return;
                    }

                    this.send() //in modal mixin

                }).catch(() => {
                    // fail stuff

                });

            }
        }
    },
    computed: function () {
    },
    mounted () {
        //$('#phone').mask('(999) 999-9999');
    },
}
