<template>
  <footer>
    <p>Ce site utilise des cookies pour assurer le bon fonctionnement du site.</p>
    <button id="button-cookies" class="button-primary" v-on:click="gotIt()">J'ai compris</button>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  methods: {
    gotIt: function () {
      document.getElementById("button-cookies").remove();
    }
  }
}
</script>

<style scoped>
  footer {
    margin: 0;
    padding: 1em;
    background-color: #0a3e65;
    width: 100%;
    text-align: center;
  }
  footer p {
    color: white;
  }
  footer p, footer button {
    margin: 1em;
    display: inline-block;
  }
</style>