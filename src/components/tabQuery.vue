A component to render the Query tab

<template>
    <h3>Query tab</h3>
    
    <div class="demo-tab">
        <select-patient></select-patient>

        <list-observations> </list-observations>

    </div>
</template>

<script>
  import ListObservations from './ListObservations.vue'
  import SelectPatient from './SelectPatient.vue'

export default {
    name: 'tabQuery',
    components : {
        ListObservations,SelectPatient
    }

}
</script>