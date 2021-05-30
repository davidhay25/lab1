<template>
    <table class="table is-bordered">
        <thead>
            <tr><th>Source Code</th><th>Target code</th></tr>
        </thead>
    <tbody>
        <tr v-for = "map in mapList" :key="map.key">
            <td>{{map.key}}</td>
            <td>{{map.map}}</td>
        </tr>
    </tbody>
    </table>
</template>

<script>

    import {state} from "../store.js"

    export default {
        name: 'ConceptMap',
        data() {
            return {
                mapList : [] 
            }
        },
        created()  {
            //on component create, get the map list - download the conceptmap and create list
            let that = this;
            state.loadMap().then(
                function(data) {
                    that.mapList = data
                    console.log(data)
                }
            )
            
        }
    }
</script>