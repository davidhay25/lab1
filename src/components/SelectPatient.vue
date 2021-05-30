<template>
    <span>
        <input v-model="identifier" />
    </span>
    <button @click="select">Load</button>
</template>

<script>


import {state} from "../store.js"

console.log(state)

export default {
name: 'SelectPatient',
emits : ['selectpatient'],
    data() {
        return {
            identifier : state.identifier // "ABC1234"
        }
    },
    methods: {
        select(){
            console.log('select')
           this.emitter.emit('selectpatient',this.identifier)
        }
    }
}
</script>