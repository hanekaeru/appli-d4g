<template>
  <div id="page">
    <Header />
    <div id="home" v-bind:style="{ fontSize: fontSize + 'px' }">
      <div class="toolbar">
        <button v-on:click="changeFontSize"><div class="size-content"><span class="small">T</span><span class="large">T</span></div></button>
        <button v-on:click="darkMode"><img id="logo-green" src="../assets/logo-night.png"/></button>
      </div>
      <div class="site-content">
        <Filters />
        <DataTable />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Filters from '@/components/Filters.vue'
import DataTable from '@/components/DataTable.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  data() {
    return {
        fontSize: 16,
        testData: []
    }
  },
  components: {
    Header,
    Filters,
    DataTable,
    Footer
  },
  methods: {
    /*readDb() {
      this.testData = [];
      db.collection("joueurs")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.testData.push({
            nom: doc.nom
          });
            console.log(doc.id, " => ", doc.data());
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },*/
    changeFontSize(event) {
      if (event) {
        if (this.fontSize===16) {
          this.fontSize*=2;
        } else {
          this.fontSize=16;
        }
      }
    },
    darkMode() {
      var element = document.getElementById("home");
      element.classList.toggle("dark-mode");
    }
  }/*,
  mounted() {
    this.readDb();
  }*/
}
</script>

<style scoped>
  #page, #home {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .toolbar {
    position: fixed;
    z-index: 99999;
    top: 43%;
    width: 40px;
    flex-direction: column;
  }
  
  .toolbar button {
    margin: 0;
    height: 60px;
    width: 40px;
    padding: .5em 0 .5em 0;
    background: #e2e2e2;
    border: 1px solid #d2d2d2;
    border-radius: 3px;
  }

  .toolbar button:hover img {
    filter: brightness(.7);
  }
  
  .size-content {
    margin: 0;
    padding: .5em .5em 0 .5em;
  }
  
  .small {
    font-size: 15px !important;
    font-weight: bold;
  }
  
  .large {
    font-size: 30px !important;
  }

  .site-content {
    width: 95%;
    margin: 0 auto 0 auto;
  }

  #logo-green {
    margin-top: .5em;
    width: 32px;
  }

  .dark-mode {
    background-color: #303030;
    color: #d2d2d2;
  }
</style>