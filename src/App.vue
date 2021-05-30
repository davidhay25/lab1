<template>
 <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.2/css/bulma.min.css">


 <nav class="navbar is-link" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
      <a class="navbar-item" >
          <strong>Lab Viewer</strong> 
        </a>
    
  </div>
</nav>
  
  <!--
  <select-patient/>

  <list-observations/>

-->

   <div class="demo">
      <button
          v-for="tab in tabs"
          v-bind:key="tab"
          v-bind:class="['tab-button', { active: currentTab === tab }]"
          v-on:click="currentTab = tab">
          {{ tab }}
      </button>

      <keep-alive>
          <component v-bind:is="currentTabComponent"></component>
      </keep-alive>
  </div>
  
</template>

<script>
  import ListObservations from './components/ListObservations.vue'
  import SelectPatient from './components/SelectPatient.vue'

  //tab components
  import tabQuery from './components/tabQuery.vue'
  import tabMap from './components/tabMap.vue'
  
  export default {
    name: 'App',
    components: 
      {
        SelectPatient:SelectPatient,
        ListObservations:ListObservations,
        tabQuery : tabQuery,
        tabMap : tabMap         
      },
      data() {
        return {
          currentTab: 'Query',
          tabs: ['Query', 'Map']
        }
      },
      computed: {
        currentTabComponent() {
          return 'tab-' + this.currentTab.toLowerCase()
        }
      },
    created()  {
     
      //listen to all events through the event bus so they can be logged...
      this.emitter.on('*', (name, e) => console.log("Event:" + name, e) )

      }
  }
</script>


<style>

.demo {
    font-family: sans-serif;
    border: 1px solid #eee;
    border-radius: 2px;
    padding: 20px 30px;
    margin-top: 1em;
    margin-bottom: 40px;
    user-select: none;
    overflow-x: auto;
  }
  
  .tab-button {
    padding: 6px 10px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border: 1px solid #ccc;
    cursor: pointer;
    background: #f0f0f0;
    margin-bottom: -1px;
    margin-right: -1px;
  }
  .tab-button:hover {
    background: #e0e0e0;
  }
  .tab-button.active {
    background: #e0e0e0;
  }
  .demo-tab {
    border: 1px solid #ccc;
    padding: 10px;
  }


  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
