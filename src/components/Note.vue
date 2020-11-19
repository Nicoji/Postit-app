<script>

export default {
    name: 'Note',
    props: {
        id: {
            type: Number,
            required: true
        },
        title : 
        {
            type: String, 
            required: true
        }, 
        backcolor : 
        {   
            type: String, 
            required: true
        }, 
        text: {
            type: Array,
            required: true
        }
    },
    methods: {
         
        deleteNote: function(id, index, name) {
            let storage = window.localStorage;
            let newValue = JSON.parse(storage['notes']);
            for(let i = 0; i < newValue.length; i++){
                if(newValue[i].id == id) {
                    newValue[i].text.splice(name, 1);
                }
            }
            window.localStorage.setItem('notes', JSON.stringify(newValue));
            const div = document.querySelector('#dialog' + id + ' #' +name);
            div.remove();
        },
        deleteNoteGroup: function(id) {
            let storage = window.localStorage;
            let newValue = JSON.parse(storage['notes']);
            for(let i = 0; i < newValue.length; i++){
                if(newValue[i].id == id) {
                    newValue.splice(i, 1);
                }
            }
            window.localStorage.setItem('notes', JSON.stringify(newValue));
            this.$forceUpdate();
            this.$router.push({ name: 'Notes' });
        }
    }, 
        
}
</script>

<template>
    <dialog open :style="'background-color:' + backcolor" :id="'dialog'+id">
        <div class="d-flex justify-content-between second">
            <h2><input :id="'h2_'+id" v-on:change="$emit('update-title', id, 'second')" :value="title"></h2>
            <router-link to="/">
                <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-x-octagon-fill" fill="black" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                </svg>
            </router-link>
        </div>
        <div v-for="(entry, index) in text" :key="index" :id="'note'+index" class="d-flex justify-content-center aBlock">
            <textarea class="note dialogNote mt-3" v-on:change="$emit('update', id, index, 'second')" :value="entry" :id="'textAreaDialog'+index" v-on:keyup="$emit('text-area-resize', 'note'+index, 'textAreaDialog'+index)"></textarea>
            <svg v-on:click="deleteNote(id, index, 'note'+index)" width="2em" height="2em" viewBox="0 0 16 16" class="align-self-center" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
            <!-- <span v-if="mounted()">
                {{$emit('text-area-resize', 'note'+index, 'textAreaDialog'+index)}}
            </span> -->

        </div>
        <div class="text-center mt-4">
            <button v-on:click="deleteNoteGroup(id)" class="btn btn-danger">Remove this note</button>
        </div>
    </dialog>
</template>

<style>
    dialog {
        width: 450px;
        opacity: 100%;
        position: absolute;
        z-index: 99999;
    }
    .dialogNote {
        padding: 10px;
        margin-right: 10px;
        border-radius: 10px;
        border: 1px solid grey;
    }
    .aBlock {
        padding: 5px;
    }
    .aBlock textarea {
         width: 90%;
    }
    svg {
        cursor: pointer;
    }
</style>