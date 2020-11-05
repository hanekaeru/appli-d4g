<template>
  <div class="home" v-bind:style="{ fontSize: fontSize + 'px' }">
    <header class="access">
      <h2 class="title">Indice Fragilité</h2>
      <div class="logos">
        <img id="logo-green" src="../assets/logo-d4g.jpg"/>
        <img id="logo-inr" src="../assets/logo-inr.jpg"/>
      </div>
    </header>
    <div class="toolbar">
      <button v-on:click="changeFontSize" class="btn-size"><div class="size-content"><span class="small">T</span><span class="large">T</span></div></button>
    </div>
    <div class="site-content">
      <Filters />
      <DataTable />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import DataTable from '@/components/DataTable.vue'
import Filters from '@/components/Filters.vue'

export default {
  name: 'Home',
  data() {
    return {
        fontSize: 16,
        testData: []
    }
  },
  components: {
    DataTable,
    Filters
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
    }
  }/*,
  mounted() {
    this.readDb();
  }*/
}
</script>

<style scoped>
  .home {
    display: flex;
    flex-wrap: wrap;
  }

  .title {
    margin: auto;
    padding: .3em;
    float: left;
    color: whitesmoke;
  }

  .logos {
    padding: .5em;
    float: right;
    background-color: white;
    width: 250px;
    display: flex;
  }

  #logo-green {
    margin: auto;
    width: 60px;
  }

  #logo-inr {
    margin: auto;
    height: 45px;
  }
  
  .access {
    padding: .5em 0 .5em 0;
    background-color: #0a3e65;
    width: 100%;
    float: left;
  }

  .toolbar {
    position: fixed;
    z-index: 99999;
    top: 43%;
  }
  
  .btn-size {
    margin: 0;
    height: auto;
    width: auto;
    padding: .5em 0 .5em 0;
    background: #e2e2e2;
    border: 1px solid #d2d2d2;
    border-radius: 3px;
  }
  
  .size-content {
    margin: 0;
    padding: .9em .5em 0 .5em;
  }
  
  .small {
    font-size: 20px !important;
    font-weight: bold;
  }
  
  .large {
    font-size: 40px !important;
  }

  .site-content {
    width: 95%;
    margin: 0 auto 0 auto;
  }
</style>