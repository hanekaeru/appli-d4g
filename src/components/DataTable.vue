<template>
    <div class="data-table row" ref="content">
        <table id="tabAgregat" style="text-align:center">
            <thead>
                <tr id="titreTab">
                    <th v-on:click="sortPosts()" scope="col">Commune</th>
                    <th scope="col">Iris</th>                    
                    <th scope="col">Région</th>
                    <th scope="col">Département</th>
                    <th scope="col">Population</th>
                    <th scope="col">Score Global</th>
                    <th class="displayInterfaceNum" scope="col">Accès aux interfaces numériques</th>
                    <th class="displayInfo" scope="col">Accès à l'Information</th>
                    <th class="displayCompAdmin" scope="col">Compétences administratives</th>
                    <th class="displayCompNum" scope="col">Compétences numériques / scolaires</th>
                    <th class="displayGlobAccess" scope="col">Global access</th>
                    <th class="displayGlobComp" scope="col">Global competences</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="q in displayedPosts" :key="q.id" v-on:click="showInformationsOfRow(q)">
                    <td>{{ q.nom_com }}</td>                    
                    <td>{{ q.nom_iris }}</td>
                    <td>{{ q.nom_reg }}</td>
                    <td>{{ q.nom_dep }}</td>
                    <td>{{ q.population }}</td>
                    <td>{{ q.score_global_reg }}</td>
                    <td class="displayInterfaceNum">{{ q.access_inter_num_reg }}</td>
                    <td class="displayInfo">{{ q.access_info_reg }}</td>
                    <td class="displayCompAdmin">{{ q.comp_admin_reg }}</td>
                    <td class="displayCompNum">{{ q.comp_num_scol_reg }}</td>
                    <td class="displayGlobAccess">{{ q.global_access_reg }}</td>
                    <td class="displayGlobComp">{{ q.global_comp_reg }}</td>
                </tr>
            </tbody>
        </table>
        <div class="row">
            <label class="three columns"><input v-on:change="displayInterfaceNum" type="checkbox"/><span class="label-body">Accès aux interfaces numériques </span></label>
            <label class="three columns"><input v-on:change="displayInfo" type="checkbox"/><span class="label-body">Accès à l'information </span></label>
            <label class="three columns"><input v-on:change="displayCompInfo" type="checkbox"/><span class="label-body">Compétences Numériques</span></label>
            <label class="three columns"><input v-on:change="displayCompAdmin" type="checkbox"/><span class="label-body">Compétences Administratives</span></label>
        </div>
        <div class="row">
            <label class="three columns"><input v-on:change="displayIris" type="checkbox"/><span class="label-body">Données IRIS</span></label>
            <label class="three columns"><input v-on:change="displayScoreAcces" type="checkbox"/><span class="label-body">Score Global Accès </span></label>
            <label class="three columns"><input v-on:change="displayScoreComp" type="checkbox"/><span class="label-body">Score Global Compétences </span></label>
        </div>
        <button class="button-primary" @click="download">Télécharger en PDF</button>
        <div class="row" style="text-align:center">
            <nav aria-label="Page navigation example">
                <button type="button" class="two columns" v-if="page != 1" @click="page--"> Previous </button>
                <button type="button" class="one column" :key="pageNumber" v-for="pageNumber in pages.slice(page-1, page+5)" @click="page = pageNumber"> {{pageNumber}} </button>
                <button type="button" @click="page++" v-if="page < pages.length" class="two columns"> Next </button>
            </nav>  
        </div>

        <div id="myModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="close" v-on:click="closeInformationsOfRow()">&times;</span>
                    <h2>{{ clicLigne.nom_com }}</h2>
                </div>
                <div v-if="indicateur === 'region'">
                    <div class="modal-body">
                        <p>Score global region : {{ clicLigne.score_global_reg }}</p>
                        <p>Accès aux interfaces numériques : {{ clicLigne.access_inter_num_reg }}</p>
                        <p>Accès à l'information : {{ clicLigne.access_info_reg }}</p>
                        <p>Compétences administratives : {{ clicLigne.comp_admin_reg }}</p>
                        <p>Compétences numériques et scolaires : {{ clicLigne.comp_num_scol_reg }}</p>
                        <p>Accès global : {{ clicLigne.global_access_reg }}</p>
                        <p>Compétences globale : {{ clicLigne.global_comp_reg }}</p>
                    </div>
                </div>
                <div v-else>
                    <div class="modal-body">
                        <p>Score global département : {{ clicLigne.score_global_dp }}</p>
                        <p>Accès aux interfaces numériques : {{ clicLigne.access_inter_num_dp }}</p>
                        <p>Accès à l'information : {{ clicLigne.access_info_dp }}</p>
                        <p>Compétences administratives : {{ clicLigne.comp_admin_dp }}</p>
                        <p>Compétences numériques et scolaires : {{ clicLigne.comp_num_scol_dep }}</p>
                        <p>Accès global : {{ clicLigne.global_access_dep }}</p>
                        <p>Compétences globale : {{ clicLigne.global_comp_dep }}</p>
                    </div>
                </div>
                
                <div class="modal-footer">
                    <h3>Modal Footer</h3>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
import { EventBus } from '../event-bus.js';
import axios from "axios";
import jsPDF from 'jspdf';
import 'jspdf-autotable'

export default {
  name: 'DataTable',
  data() {
    return {
        posts : [],
        page: 1,
        perPage: 10,
        pages: [],
        irisitems: [],
        tri: 'croissant',
        clicLigne: [],
        indicateur: "region"
    }
  },
  methods:{
      showInformationsOfRow(laDonnee) {
          console.log(laDonnee)
          this.clicLigne = laDonnee;
          document.getElementById("myModal").style.display = "block";
      },

      closeInformationsOfRow() {
          document.getElementById("myModal").style.display = "none";
      },

      allRecords(){
        this.irisitems = [] 
        let self = this
        axios.get('http://146.59.196.35:3000/api.php')
        .then(function (response) {
            self.irisitems = response.data;
            self.getPosts();
        })
        .catch(function (error) {
            console.log(error);
        });
      },
      getPosts(){
          this.posts = this.irisitems;
      },
      setPages(){
          let numberOfPages = Math.ceil(this.posts.length/this.perPage);
          for(let index=1; index <= numberOfPages; index++){
              this.pages.push(index);
          }
      },
      paginate (posts){
          let page = this.page;
          let perPage = this.perPage;
          let from = (page * perPage)-perPage;
          let to = (page * perPage);
          return posts.slice(from,to);
      },
      displayInterfaceNum(event){
          if(event.target.checked){
            document.getElementsByClassName("displayInterfaceNum").forEach(element => {
                element.style.display="table-cell"
            });
          }else{
            document.getElementsByClassName("displayInterfaceNum").forEach(element => {
                element.style.display="none"
            });          
          }
      },
      displayInfo(event){
          if(event.target.checked){
            document.getElementsByClassName("displayInfo").forEach(element => {
                element.style.display="table-cell";
            });
          }else{
            document.getElementsByClassName("displayInfo").forEach(element => {
                element.style.display="none";
            });          
        }
      },
      displayCompInfo(event){
          if(event.target.checked){
            document.getElementsByClassName("displayCompNum").forEach(element => {
                element.style.display="table-cell";
            });
          }else{
            document.getElementsByClassName("displayCompNum").forEach(element => {
                element.style.display="none";
            });          
        }
      },
      displayCompAdmin(event){
          if(event.target.checked){
            document.getElementsByClassName("displayCompAdmin").forEach(element =>{
                element.style.display="table-cell";
            });
          }else{
            document.getElementsByClassName("displayCompAdmin").forEach(element =>{
                element.style.display="none";
            });              
          }
      },
      displayIris(event){
          if(event.target.checked){
            document.getElementsByClassName("displayIris").forEach(element => {
                element.style.display="table-cell";
            });
          }else{
            document.getElementsByClassName("displayIris").forEach(element => {
                element.style.display="none";
            });
        }
      },
      displayScoreAcces(event){
          if(event.target.checked){
            document.getElementsByClassName("displayGlobAccess").forEach(element => {
                element.style.display="table-cell"
            });
          }else{
            document.getElementsByClassName("displayGlobAccess").forEach(element => {
                element.style.display="none"
            });          
        }
      },
      displayScoreComp(event){
          if(event.target.checked){
            document.getElementsByClassName("displayGlobComp").forEach(element => {
                element.style.display="table-cell"
            });
          }else{
            document.getElementsByClassName("displayGlobComp").forEach(element => {
                element.style.display="none"
            });          
        }
      },
      sortPosts(){
          this.posts.sort((a,b)=>{
              if(this.tri=="croissant"){
                if(a.nom_com < b.nom_com){
                    return -1;
                }else if(a.nom_com > b.nom_com){
                    return 1;
                }else return 0;
              }else{
                if(a.nom_com > b.nom_com){
                    return -1;
                }else if(a.nom_com < b.nom_com){
                    return 1;
                }else return 0;
              }
          });
          if(this.tri=="croissant"){
              this.tri="decroissant";
          }else{
              this.tri="croissant";
          }
      },
      applyListenerFilters() {
            EventBus.$on('filter-by-region', region => {
                if(region!=0){
                    this.posts=[];
                    for(let i = 0; i < this.irisitems.length; i++){
                        if(this.irisitems[i].nom_reg==region){
                            this.posts.push(this.irisitems[i]);
                        }
                    }
                }else{
                    this.posts=this.irisitems;
                }
            });
            EventBus.$on('filter-by-dpt', dpt => {
                if(dpt!=0){
                    this.posts=[];
                    for(let i = 0; i < this.irisitems.length; i++){
                        if(this.irisitems[i].nom_dep==dpt){
                            this.posts.push(this.irisitems[i]);
                        }
                    }
                }else{
                    this.posts=this.irisitems;
                }
            });
            EventBus.$on('filter-by-ville', ville => {
                this.posts=[];
                for(let i = 0; i < this.irisitems.length; i++){
                    if(this.irisitems[i].nom_com.indexOf(ville)==0){
                        this.posts.push(this.irisitems[i]);
                    }
                }
            });
            EventBus.$on('change-reference-point', reference =>{
                this.indicateur=reference;
            })
      },
      download(){
        const doc = new jsPDF();
        //doc.autoTable({ html: '#tabAgregat' });
        let tab = [];
        for(let i=0; i<this.posts.length;i++){
            let post = this.posts[i];
            tab.push([post.nom_com,post.nom_iris, post.nom_reg, post.nom_dep, post.population, post.score_global_reg, post.access_inter_num_reg, post.access_info_reg, post.global_access_reg]);
        }
        tab.sort((a,b)=>{
            if(a.nom_com < b.nom_com){
                return -1;
            }else if(a.nom_com > b.nom_com){
                return 1;
            }else return 0;
        });
        doc.autoTable({
            head:[["Commune","Iris", "Région", "Département", "Population", "Score Global", "Accès Numérique", "Accès Information", "Score d'accès"]],
            body:tab
        });
        
        doc.save('table_acces.pdf');
        const doc2 = new jsPDF();
        let tab2 = [];
        for(let i=0; i<this.posts.length;i++){
            let post = this.posts[i];
            tab2.push([post.nom_com,post.nom_iris, post.nom_reg, post.nom_dep, post.population, post.score_global_reg, post.comp_admin_reg, post.comp_num_scol_reg, post.global_comp_reg]);
        }
        tab2[0].sort((a,b)=>{
            if(a.nom_com < b.nom_com){
                return -1;
            }else if(a.nom_com > b.nom_com){
                return 1;
            }else return 0;
        });
        doc2.autoTable({
            head:[["Commune","Iris", "Région", "Département", "Population", "Score Global", "Compétences Administratives", "Compétences numériques", "Score de Compétences"]],
            body:tab2
        })
        doc2.save('table_competences.pdf');
      }

  },

  computed: {
      displayedPosts(){
          return this.paginate(this.posts);
      }
  },
  watch: {
      posts(){
          this.setPages();
      }
  },
  created(){
        this.allRecords();
        this.applyListenerFilters();
  },
  filters: {
      trimWords(value){
          return value.split(" ").splice(0,20).join(" ") + '...';
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .dataTable {
        margin-left: auto;
        margin-right: auto;
        width: 75%;
        text-align: center;
    }
    button.page-link {
        display: inline-block;
    }
    button.page-link {
        font-size: 20px;
        color: #29b3ed;
        font-weight: 500;
    }
    .offset {
        width: 500px !important;
        margin: 20px auto;
    }
    .displayIris,.displayInterfaceNum,.displayInfo,.displayCompAdmin,.displayCompNum, .displayGlobAccess, .displayGlobComp {
        display: none;
    }
    .data-table {
        text-align: center;
    }
    table {
        margin-right: auto;
        margin-left: auto;
    }

    .modal {
        display: none;
        position: fixed;
        z-index: 1; 
        padding-top: 100px; 
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0,0,0);
        background-color: rgba(0,0,0,0.4);
    }

    .modal-content {
        position: relative;
        background-color: #fefefe;
        margin: auto;
        padding: 0;
        border: 1px solid #888;
        width: 80%;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
        -webkit-animation-name: animatetop;
        -webkit-animation-duration: 0.4s;
        animation-name: animatetop;
        animation-duration: 0.4s
    }

    @-webkit-keyframes animatetop {
        from {top:-300px; opacity:0} 
        to {top:0; opacity:1}
    }

    @keyframes animatetop {
        from {top:-300px; opacity:0}
        to {top:0; opacity:1}
    }

    .close {
        color: white;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }

    .close:hover,
    .close:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }

    .modal-header {
        padding: 2px 16px;
        padding-top: 16px;
        background-color: #0a3e65;
        color: white;
    }

    .modal-body {padding: 2px 16px;}

    .modal-footer {
        padding: 2px 16px;
        background-color: #0a3e65;
        color: white;
    }
</style>
