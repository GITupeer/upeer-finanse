export default {
    methods: {
        expand: function(){

            $('.details').on('click',function(){
                $(this).parent().parent().toggleClass('expanded')
            })

        }
    },
    mounted () {
        this.expand();
    },
}
