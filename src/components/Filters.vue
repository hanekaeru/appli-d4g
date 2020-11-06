<template>
    <div class="filters">
        <button class="accordion">Filtres</button>
        <div class="panel">
            <div class="row">
                <select id="selectReg" class="columns" v-on:change="filterByRegion">
                    <option value="0">Région (Toutes)</option>
                    <option v-for="region in regions" :key="region" :value="region">{{region}}</option>
                </select>
                <select id="selectDpt" style="display: none" class="columns" v-on:change="filterByDepartment">
                </select>
                <input class="columns" v-on:keyup="filterByVille" type="text" placeholder="Ville"/>
                <input class="columns" v-on:keyup="filterByCodePostal" maxlength="5" type="text" placeholder="Code Postal"/>
                <select class="columns" v-on:change="changeReferencePoint">
                    <option value="region">Point référence (défaut Région)</option>
                    <option value="departement">Département</option>
                    <option value="region">Région</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
import { EventBus } from '../event-bus.js';
import axios from "axios";

export default {

  name: 'Filters',
  data() {
    return {
      quartiers : []
    }
  },
  computed: {
      regions : function(){
          let listRegion = []
          for(var quartier in this.quartiers){
              if(listRegion.includes(this.quartiers[quartier].nom_reg));
              else{
                  listRegion.push(this.quartiers[quartier].nom_reg);
              }
          }
          return listRegion;
      }
  },
  methods: {
    allRecords() {
        this.quartiers = [];
        let self = this;
        axios.get('http://146.59.196.35:3000/api.php')
        .then(function (response) {
            self.quartiers = response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    filterByRegion: function (event) {
        let select = document.getElementById("selectDpt");   
        let departements = this.getDepartmentByRegion(event.target.value);                
        select.innerHTML = "<option value=\"0\">Département</option>";
        for (let i in departements) {
            select.innerHTML += "<option value =\"" + departements[i] + "\">" + departements[i] + "</option>";
        }
        select.style.display="block";
        EventBus.$emit('filter-by-region', event.target.value);
    },
    filterByDepartment: function(event) {
        EventBus.$emit('filter-by-dpt', event.target.value);        
    },
    filterByVille: function(event) {
        EventBus.$emit('filter-by-ville', event.target.value);        
    },
    filterByCodePostal: function(event) {
        EventBus.$emit('filter-by-postal-code', event.target.value);
    },
    changeReferencePoint: function(event) {
        EventBus.$emit('change-reference-point',event.target.value);
    },
    getDepartmentByRegion: function(region) {
        let listDepartment = [];
        for (let i in this.quartiers) {
            if (this.quartiers[i].nom_reg==region) {
                if(!listDepartment.includes(this.quartiers[i].nom_dep)) {
                    listDepartment.push(this.quartiers[i].nom_dep);
                }
            }
        }
        return listDepartment;
    }
  },
  mounted() {
      this.allRecords();
  }
}
</script>

<style scoped>
    .filtre {
        margin-right: auto;
        margin-left: auto;
    }
    .accordion {
        margin: 1.5em 0 1.5em 0;
        background-color: #eee;
        color: #444;
        cursor: pointer;
        width: 100%;
        text-align: left;
        border: none;
        outline: none;
    }
    .active, .accordion:hover {
        background-color: #ccc;
    }
    .panel {
        display: none;
        overflow: hidden;
        width: 100%;
    }
    .filters {
        margin: 0 auto 0 auto;
        width: 75%;
    }
    .row select, .row input {
        margin-left: 0;
        height: auto;
    }
</style>