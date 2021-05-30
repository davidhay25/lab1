A component to render the the mapping tab...

<template>
    <h3>Map tab</h3>
        <div class="demo-tab">
            <concept-map> </concept-map>
        
        </div>
</template>

<script>
    import ConceptMap from "./ConceptMap.vue"

    export default {
        name: 'tabMap',
        components : {
            ConceptMap
        }

    }
</script>