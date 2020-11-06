<template>
  <header class="access">
    <div>
      <h3 class="title">Fragility Index</h3>
    </div>
    <div class="logos">
      <img id="logo-green" src="../assets/logo-d4g.jpg" v-on:click="openTab('https://design4green.org')"/>
      <img id="logo-inr" src="../assets/logo-inr.jpg"  v-on:click="openTab('https://institutnr.org')"/>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    openTab: function (path) {   
      window.open(path, "_blank");    
    }
  }
}
</script>

<style scoped>
  .access {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: .5em 0 .5em 0;
    background-color: #0a3e65;
    width: 100%;
  }
  .title {
    margin: auto;
    padding: .23em;
    float: left;
    color: whitesmoke;
  }
  .logos {
    padding: .3em 2rem .3em .3em;
    width: 230px;
    background-color: white;
    transition: transform .3s;
    display: flex;
    border: 1px solid #d2d2d2;
  }
  .logos:hover {
    transform: scale(1.21);
    cursor: pointer;
  }
  #logo-green {
    margin: auto;
    width: 60px;
  }
  #logo-inr {
    margin: auto auto auto 1em;
    height: 45px;
  }
</style>