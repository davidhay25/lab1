<template>
    <table class="table is-bordered">
        <thead>
            <tr><th>Date</th><th>Name</th><th>Value</th><th>Source Code</th><th>Mapped Code</th></tr>
        </thead>
        <tbody>
            <tr v-for = "observation in observations" :key="observation.id">
                <td>{{observation.date}}</td>
                <td>{{observation.name}}</td>
                <td>{{observation.valueDisplay}}</td>
                <td>{{observation.sourceCode}}</td>
                <td>{{observation.code}}</td>
                
            </tr>
        </tbody>
    </table>
</template>

<script>
import {state} from "../store.js"

console.log(state)

export default {
    name: 'ListObservations',
    data() {
        return {
            observations:  []
        }
    },
    methods : {
        load(identifier) {
            this.observations.length = 0
            let that = this;
            state.loadData(identifier).then(function(data) {
                console.log(data)
                that.observations = data;                
            })
        }
    }, 
    created()  {
        this.emitter.on('selectpatient',(identifier) => {
            console.log('selectpatient event in list',identifier)
            this.load(identifier)
        })
    }
}
</script>
