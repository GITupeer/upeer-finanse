<template>
    <div class="modal-window">
        <div class="sending_info_container_inner">
            <div class="modal-header">
                <svg class="icon"  @click="closeModal()"><use href="icons/icons.svg#icon-remove-circle-alternate" xlink:href="icons/icons.svg#icon-remove-circle-alternate"/></svg>
            </div>
            <div class="modal-content">
                <div style="font-size: 13px; margin-bottom: 3px;"> Add New Item </div>
                <form action="" @submit.prevent='addNewItemToDo()' novalidate class="form">
                    <div class="form__group">
                        <input type="text" class="input" style="padding-left: 0;" placeholder="To do..." id="newItemToDoValue" name="newItemToDoValue" v-model="newItemToDoValue">
                        <span class="input__border"></span>
                    </div>
                        <button v-if="newItemToDoValue != ''" 
                            style="margin-top: 4px; color: rgb(0, 163, 180); font-size: 11px; padding: 7px 32px; border: 0.05rem solid rgb(90, 178, 187); border-radius: 16px; font-weight: bold; background-color: rgb(255, 255, 255); transition: all .1s;" type="submit">
                            <span v-if="!spinner">Add new</span>
                            <svg v-if="spinner" class="icon icon-xs spinning"><use href="icons/icons.svg#icon-loading-circle" xlink:href="icons/icons.svg#icon-loading-circle"/></svg>
                        </button>
                        <button v-if="newItemToDoValue == ''" style="background-color: rgb(238, 238, 238); color: rgb(117, 117, 117); border: 0.05rem solid rgb(189, 189, 189); margin-top: 4px; font-size: 11px; padding: 7px 32px; border-radius: 16px; font-weight: bold; transition: all .1s;" type="submit" disabled>
                            <span v-if="!spinner">Add new</span>
                            <svg v-if="spinner" class="icon icon-xs spinning"><use href="icons/icons.svg#icon-loading-circle" xlink:href="icons/icons.svg#icon-loading-circle"/></svg>
                        </button>
                </form>
            </div>
        </div>
    </div>

</template>

<script>

import Vue from 'vue'
import Network from './../../../assets/js/network'

export default {
    name: 'ToDoModal',
    components: {},
    props: ['show', 'toDoModal'],
    data () {
        return {
            newItemToDoValue: '',
            spinner: false
        }
    },
    methods: {
        addNewItemToDo() {

            this.$store.commit('updateToDoSpiner', {
                todoSpiner: true,
            })

            var sendData = {
                HubToDo: this.newItemToDoValue, 
            }

            Network.post(Network.exitUrl, Network.action.AddToDoItem, sendData,	{
                requestType: Network.requestType.json,
                successCallback : (response) => {
                    this.$store.commit('updatetodolist', {
                        todolist: this.getToDoList() //what?
                    })
                    this.closeModal()
                },
                errorCallback : (response) => {
                    this.$store.commit('updatetodolist', {
                        todolist: this.getToDoList() //??
                    })
                    this.closeModal()
                }
            })
        },
        getToDoList() {
            var sendData = {
                hubType: 'User',
                id: '',
                otherID: ''
            };

            Network.get(Network.exitUrl, Network.action.GetToDoGridList, sendData,{
                successCallback : (response) => {

                    console.log('response', response[0]);
                    this.$store.commit('updatetodolist', {  
                        todolist: response
                    })

                    this.$store.commit('updateToDoSpiner', {
                        todoSpiner: false,
                    })
                },
                errorCallback : (response) => {
                    console.log('error calback');
                }
            })
        },
        closeModal(){
            this.$emit('close')
        },
        // closeModal2(){
        //     Vue.eventBus.$emit('closeModal');
        // }
    }, 
    computed: {},
    watch: {},
    mounted () {},
}

</script>