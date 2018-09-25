<template>

<div>
    <div class="loader_container" v-if="main">

        <div class="flex_center">

            <img src="images/ExitApp_logo.png" alt="">

        </div>
    </div>
    
    <div class="spinner_overlay" v-if="spinner">
        <div class="relative_container">
            <div class="spinner_container">
                <div class="spinner"></div>
            </div>
        </div>
    </div>

</div>

</template>

<script>

    export default {
        name: 'Loader',
        props: ['main','spinner'],
        components: {},
        computed: {},
        data () {
            return {}
        },
        methods: {},
        watch: {},
        mounted (){}
    }

</script>
