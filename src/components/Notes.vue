<script>

import Note from '@/components/Note'

export default {
    name: 'Notes',
    data() {
        return {
            notes: [
                {id: 0, title: 'Design', backcolor: '#92c6db', text: [
                    'test', 
                    'dfgsdfhfghfdgh',
                    'zerazerazerzer',
                    'zersdfgsdfgsdfg'
                ]},
                {id: 1, title: 'Prototype', backcolor: '#92dbb3', text: [
                    'azerzaefeaz joezaij sfdqkj qsmdjfk qsmldjkql skfjqlsmfj kqslkfjqslkdj qslkdf s', 
                ]},
                {id: 2, title: 'Test', backcolor: '#dadb92', text: [
                    'dsfsfd', 
                    'gddsdgsdgsdfg', 
                    'erzfsdfg'
                ]},
                {id: 3, title: 'Final', backcolor: '#dbad92', text: [
                    'sfsdfds', 
                    'ksdfklsmfd'
                ]}
            ], 
            loaded: false
        }
    }, 
    methods: {
        addEntry: function(id) {
            let newValue = this.getStorage();
            for(let i = 0; i < newValue.length; i++){
                if(newValue[i].id == id) {
                    newValue[i]['text'].push('New note');
                }
            }
            window.localStorage.setItem('notes', JSON.stringify(newValue));
            this.$forceUpdate();
        }, 
        newNote: function() {
            let color1 = Math.floor(Math.random() * Math.floor(256));
            let color2 = Math.floor(Math.random() * Math.floor(256));
            let color3 = Math.floor(Math.random() * Math.floor(256));
            let randomColor = 'rgb(' + color1 +', ' + color2 + ', ' + color3 +')';
            let newValue = this.getStorage();
            
            let newId = newValue[newValue.length-1].id + 1;
            newValue.push({id: newId, title: 'New note - ' + newId, backcolor: randomColor, text: [
                  'New note'
              ]});
            window.localStorage.setItem('notes', JSON.stringify(newValue));
            this.$forceUpdate();

        }, 
        store: function() {
            let array = [];
            for(let i = 0; i < this.notes.length; i++) {
                array.push(this.notes[i]);
            }
            window.localStorage.setItem('notes', JSON.stringify(array));

        }, 
        update: function(id, index, className) {
            var selector = '';
            if(className == "main") {
                selector = '#note-block' + id + ' #textArea' +index;
            } else {
                selector = '#note' + index + ' #textAreaDialog' + index;
            }
            const textarea = document.querySelector(selector);
            let newValue = this.getStorage();
            for(let i = 0; i < newValue.length; i++){
                if(newValue[i].id == id) {
                    newValue[i]['text'][index] = textarea.value;
                }
            }
            window.localStorage.setItem('notes', JSON.stringify(newValue));
        }, 
        updateTitle: function(id, className) {
            let prefixe = '';
            if(className == "main") {
                prefixe = '#h2-';
            } else {
                prefixe = '#h2_';
            }
            const textarea = document.querySelector(prefixe + id);
            let newValue = this.getStorage();
            for(let i = 0; i < newValue.length; i++){
                if(newValue[i].id == id) {
                    newValue[i]['title'] = textarea.value;
                }
            }
            window.localStorage.setItem('notes', JSON.stringify(newValue));
        }, 
        textAreaResize: function(block, textArea) {
            const element = document.querySelector('#' + block + ' #' + textArea);
            element.style.height = '1px';
            element.style.height = (10 + element.scrollHeight) + 'px';
        }, 
        getStorage: function() {
            let storage = window.localStorage;
            return JSON.parse(storage['notes']);
         }
    },
    components: {
        Note
    }, 
    mounted() {this.loaded = true}
}

</script>

<template>

        <div class="p-3 d-flex list-note">
            <!-- {{store()}}  -->
            <div class="d-flex" v-for="note in getStorage()" :key="note.title">
                <div class="note-block" :id="'note-block' + note.id" :style="'background-color:' + note.backcolor">
                    <div class="d-flex justify-content-between main">
                        <h2><input :id="'h2-'+note.id" v-on:change="updateTitle(note.id, 'main')" :value="note.title"></h2>
                        <router-link :to="'note/' + note.id">
                            <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-three-dots" fill="black" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                            </svg>
                        </router-link>
                    </div>  
                    <div v-for="(entry, index) in note.text" :key="index">
                        <textarea class="note" :id="'textArea'+index" :value="entry" v-on:change="update(note.id, index, 'main')" v-on:keyup="textAreaResize('note-block' + note.id, 'textArea' + index)"></textarea>
                        <span v-if="loaded">
                            {{textAreaResize('note-block' + note.id, 'textArea' + index)}}
                        </span>
                    </div>
                    <button v-on:click="addEntry(note.id)" class="btn btn-primary">Add a new Entry</button>
                </div>
                
                <div v-if="$route.params.id == note.id">
                    
                    <Note 
                        :id="note.id"
                        :title="note.title"
                        :backcolor="note.backcolor" 
                        :text="note.text"
                        @update-title="updateTitle"
                        @update="update"
                        @text-area-resize="textAreaResize"

                    />
                </div> 
            </div>
            <span class="d-none"> {{loaded = false}} </span>
            <div class="add align-self-start mt-3" v-on:click="newNote()">
                <div class="add-text">+ Add new note</div>
            </div>
        </div>
</template>



<style>
    .list-note {
        overflow-x: scroll;
    }
    .note-block {
        width: 300px;
        border: 1px solid #818181;
        margin: 10px;
        border-radius: 10px;
        padding: 10px;
        opacity: 80%;
    }
    .note {
        margin: 10px 0px;
        border: 1px solid #818181;
        border-radius: 10px;
        padding: 5px;
        resize: none;
        overflow: hidden;
    }
    .add {
        cursor: pointer;
        border: 2px dotted #818181;
    }
    .add-text {
        width: 300px;
    }
    h2 input{
        width: 100%;
        background-color: transparent;
        border: none;
    }
    h2 {
        text-align: left;
    }

</style>