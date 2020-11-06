<template>
    <div class="data-table row" ref="content">
        <div id="tabContent">
            <table id="tabAgregat">
                <thead>
                    <tr id="titreTab">
                        <th scope="col">Commune</th>
                        <th scope="col">Iris</th>                    
                        <th scope="col">Région</th>
                        <th scope="col">Département</th>
                        <th scope="col">Population</th>
                        <th scope="col">Score Global</th>
                        <th class="displayInterfaceNum titreCol" scope="col">Accès aux interfaces numériques</th>
                        <th class="displayInfo titreCol" scope="col">Accès à l'Information</th>
                        <th class="displayCompAdmin titreCol" scope="col">Compétences administratives</th>
                        <th class="displayCompNum titreCol" scope="col">Compétences numériques / scolaires</th>
                        <th class="displayGlobAccess titreCol" scope="col">Global access</th>
                        <th class="displayGlobComp titreCol" scope="col">Global competences</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="q in displayedPosts" :key="q.id" v-on:click="showInformationsOfRow(q)">
                        <td>{{ q.nom_com }}</td>                    
                        <td>{{ q.nom_iris }}</td>
                        <td>{{ q.nom_reg }}</td>
                        <td>{{ q.nom_dep }}</td>
                        <td>{{ q.population }}</td>
                        <td class="displayScoreGlobal region">{{ q.score_global_reg }}</td>
                        <td class="displayInterfaceNum region">{{ q.access_inter_num_reg }}</td>
                        <td class="displayInfo region">{{ q.access_info_reg }}</td>
                        <td class="displayCompAdmin region">{{ q.comp_admin_reg }}</td>
                        <td class="displayCompNum region">{{ q.comp_num_scol_reg }}</td>
                        <td class="displayGlobAccess region">{{ q.global_access_reg }}</td>
                        <td class="displayGlobComp region">{{ q.global_comp_reg }}</td>
                        <td class="displayScoreGlobal departement">{{ q.score_global_dp }}</td>
                        <td class="displayInterfaceNum departement">{{ q.access_inter_num_dp }}</td>
                        <td class="displayInfo departement">{{ q.access_info_dp }}</td>
                        <td class="displayCompAdmin departement">{{ q.comp_admin_dp }}</td>
                        <td class="displayCompNum departement">{{ q.comp_num_scol_dep }}</td>
                        <td class="displayGlobAccess departement">{{ q.global_access_dep }}</td>
                        <td class="displayGlobComp departement">{{ q.global_comp_dep }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="pagination">
            <div class="row">
                <span v-if="page !== 1">
                    <button type="button" class="previous" @click="page--">&lt;</button>
                </span>
                <span v-if="page === 1 && pages.length !== 1">
                    <button type="button" class="previous" disabled>&lt;</button>
                    <button type="button" class="page-number button-primary">1</button>
                    <button type="button" class="page-number" :key="pageNumber" v-for="pageNumber in pages.slice(page, page+4)" @click="page = pageNumber">{{ pageNumber }}</button>
                </span>
                <span v-if="page === 1 && pages.length === 1">
                    <button type="button" class="previous" disabled>&lt;</button>
                    <button type="button" class="page-number button-primary">1</button>
                    <button type="button" class="next" disabled>&gt;</button>
                </span>
                <span v-if="page === 2 && page !== pages.length">
                    <button type="button" class="page-number" @click="page = 1">1</button>
                    <button type="button" class="page-number button-primary">2</button>
                    <button type="button" class="page-number" :key="pageNumber" v-for="pageNumber in pages.slice(page, page+3)" @click="page = pageNumber">{{ pageNumber }}</button>
                </span>
                <span v-if="page === pages.length-1 && page > 2">
                    <button type="button" class="page-number" :key="pageNumber" v-for="pageNumber in pages.slice(page-4, page-1)" @click="page = pageNumber">{{ pageNumber }}</button>
                    <button type="button" class="page-number button-primary">{{ page }}</button>
                    <button type="button" class="page-number" :key="pages.length" @click="page = pages.length">{{ pages.length }}</button>
                </span>
                <span v-if="page === pages.length && page !== 1">
                    <button type="button" class="page-number" :key="pageNumber" v-for="pageNumber in pages.slice(page-5, page-1)" @click="page = pageNumber">{{ pageNumber }}</button>
                    <button type="button" class="page-number button-primary">{{ page }}</button>
                    <button type="button" class="next" disabled>&gt;</button>
                </span>
                <span v-if="page >= 3 && page < pages.length-1">
                    <button type="button" class="page-number" :key="pageNumber" v-for="pageNumber in pages.slice(page-3, page-1)" @click="page = pageNumber">{{ pageNumber }}</button>
                    <button type="button" class="page-number button-primary">{{ page }}</button>
                </span>
                <span v-if="page >= 3 && page <= pages.length-2">
                    <button type="button" class="page-number" :key="pageNumber" v-for="pageNumber in pages.slice(page, page+2)" @click="page = pageNumber">{{ pageNumber }}</button>
                </span>
                <span v-if="page !== pages.length">
                    <button type="button" class="next" @click="page++">&gt;</button>
                </span>
            </div>
            <div class="row add-raws">
                <label><input type="checkbox" class="ajoutCol" v-on:change="displayInterfaceNum"/><span class="label-body">Accès aux interfaces numériques</span></label>
                <label><input type="checkbox" class="ajoutCol" v-on:change="displayInfo"/><span class="label-body">Accès à l'information</span></label>
                <label><input type="checkbox" class="ajoutCol" v-on:change="displayScoreAcces"/><span class="label-body">Score Global Accès</span></label>
                <label><input type="checkbox" class="ajoutCol" v-on:change="displayCompInfo"/><span class="label-body">Compétences Numériques</span></label>
                <label><input type="checkbox" class="ajoutCol" v-on:change="displayCompAdmin"/><span class="label-body">Compétences Administratives</span></label>
                <label><input type="checkbox" class="ajoutCol" v-on:change="displayScoreComp"/><span class="label-body">Score Global Compétences</span></label>
            </div>
            <div class="row">
                <button class="button-primary" @click="download">Télécharger en PDF</button>
            </div>
        </div>

        <div id="myModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="close" v-on:click="closeInformationsOfRow()">&times;</span>
                    <h2>{{ clicLigne.nom_com }}</h2>
                </div>
                <div v-if="indicateur === 'region'">
                    <div class="modal-body">
                        <h3>Mode région</h3>
                        <div class="row">
                            <div class="six columns">
                                <h4>Accès</h4>
                                <p>Accès aux interfaces numériques : <span class="bold">{{ clicLigne.access_inter_num_reg }}</span></p>
                                <p>Accès à l'information : <span class="bold">{{ clicLigne.access_info_reg }}</span></p>
                                <p>Accès global : <span class="bold">{{ clicLigne.global_access_reg }}</span></p>
                            </div>
                            <div class="six columns">
                                <h4>Compétences</h4>
                                <p>Compétences administratives : <span class="bold">{{ clicLigne.comp_admin_reg }}</span></p>
                                <p>Compétences numériques et scolaires : <span class="bold">{{ clicLigne.comp_num_scol_reg }}</span></p>
                                <p>Compétences globales : <span class="bold">{{ clicLigne.global_comp_reg }}</span></p>
                            </div>
                        </div>
                        <p>Score global ({{ clicLigne.nom_reg }}) : <span class="bold">{{ clicLigne.score_global_reg }}</span></p>
                    </div>
                </div>
                <div v-else>
                    <div class="modal-body">
                        <h3>Mode département</h3>
                        <div class="row">
                            <div class="six columns">
                                <h4>Accès</h4>
                                <p>Accès aux interfaces numériques : <span class="bold">{{ clicLigne.access_inter_num_dp }}</span></p>
                                <p>Accès à l'information : <span class="bold">{{ clicLigne.access_info_dp }}</span></p>
                                <p>Accès global : <span class="bold">{{ clicLigne.global_access_dep }}</span></p>
                            </div>
                            <div class="six columns">
                                <h4>Compétences</h4>
                                <p>Compétences administratives : <span class="bold">{{ clicLigne.comp_admin_dp }}</span></p>
                                <p>Compétences numériques et scolaires : <span class="bold">{{ clicLigne.comp_num_scol_dep }}</span></p>
                                <p>Compétences globales : <span class="bold">{{ clicLigne.global_comp_dep }}</span></p>
                            </div>
                        </div>
                        <p>Score global ({{ clicLigne.nom_dep }}) : <span class="bold">{{ clicLigne.score_global_dp }}</span></p>
                    </div>
                </div>
                <div class="modal-footer">
                    <p>L'<span class="bold">indice de fragilité numérique</span>, par sa représentation graphique, révèle les zones <br>
                        d'exclusion numérique sur un territoire donné. Cet outil permet, que vous soyez une <br>
                        commune, un département ou une région de comparer votre indice de fragilité numérique avec <br>
                        les autres territoires.</p>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
import { EventBus } from '../event-bus.js'
import axios from "axios"
import jsPDF from 'jspdf'
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
        indicateur: "region",
        interfaceNum: false,
        information: false,
        globalAcces: false,
        competenceNum: false,
        competenceAdmin: false,
        globalComp: false,
    }
  },
  methods:{
      showInformationsOfRow(laDonnee) {
          this.clicLigne = laDonnee;
          document.getElementById("myModal").style.display = "block";
      },

      closeInformationsOfRow() {
          document.getElementById("myModal").style.display = "none";
      },

      allRecords() {
        this.irisitems = [] 
        let self = this
        axios.get('http://146.59.196.35:3000/api.php')
        .then(function (response) {
            self.irisitems = response.data;
            self.getPosts();
            self.sortPosts();
        })
        .catch(function (error) {
            console.log(error);
        });
      },
      getPosts() {
          this.posts = this.irisitems;
      },
      setPages() {
          let numberOfPages = Math.ceil(this.posts.length/this.perPage);
          this.pages = [];
          for (let index = 1; index <= numberOfPages; index++) {
              this.pages.push(index);
          }
      },
      paginate (posts) {
          let page = this.page;
          let perPage = this.perPage;
          let from = (page * perPage)-perPage;
          let to = (page * perPage);
          return posts.slice(from,to);
      },
      displayInterfaceNum(event) {
          if (event.target.checked) {
            this.interfaceNum = true;
            document.getElementsByClassName("displayInterfaceNum").forEach(element => {
                if (element.className.includes(this.indicateur) || element.className.includes('titreCol')) {
                    element.style.display = "table-cell";
                }            
            });
          } else {
            this.interfaceNum = false;
            document.getElementsByClassName("displayInterfaceNum").forEach(element => {
                element.style.display = "none";
            });          
          }
      },
      displayInfo(event) {
          if (event.target.checked) {
            this.information = true;
            document.getElementsByClassName("displayInfo").forEach(element => {
                if (element.className.includes(this.indicateur) || element.className.includes('titreCol')) {
                    element.style.display = "table-cell";
                }        
            });
          } else {
            this.information = false;
            document.getElementsByClassName("displayInfo").forEach(element => {
                element.style.display = "none";
            });          
        }
      },
      displayCompInfo(event) {
          if (event.target.checked) {
            this.competenceNum = true;
            document.getElementsByClassName("displayCompNum").forEach(element => {
                if (element.className.includes(this.indicateur) || element.className.includes('titreCol')) {
                    element.style.display = "table-cell";
                }            
            });
          } else {
            this.competenceNum = false;
            document.getElementsByClassName("displayCompNum").forEach(element => {
                element.style.display = "none";
            });          
        }
      },
      displayCompAdmin(event) {
          if (event.target.checked) {
            this.competenceAdmin = true;
            document.getElementsByClassName("displayCompAdmin").forEach(element =>{
                if (element.className.includes(this.indicateur) || element.className.includes('titreCol')) {
                    element.style.display = "table-cell";
                }           
            });
          } else {
            this.competenceAdmin=false;
            document.getElementsByClassName("displayCompAdmin").forEach(element =>{
                element.style.display = "none";
            });              
          }
      },
      displayScoreAcces(event) {
          if (event.target.checked) {
            this.globalAcces = true;
            document.getElementsByClassName("displayGlobAccess").forEach(element => {
                if (element.className.includes(this.indicateur) || element.className.includes('titreCol')) {
                    element.style.display = "table-cell";
                }
            });
          } else {
            this.globalAcces = false;
            document.getElementsByClassName("displayGlobAccess").forEach(element => {
                element.style.display = "none";
            });          
        }
      },
      displayScoreComp(event) {
          if (event.target.checked) {
            this.globalComp = true;
            document.getElementsByClassName("displayGlobComp").forEach(element => {
                if (element.className.includes(this.indicateur) || element.className.includes('titreCol')) {
                    element.style.display = "table-cell";
                }
            });
          } else {
            this.globalComp = false;
            document.getElementsByClassName("displayGlobComp").forEach(element => {
                element.style.display = "none";
            });          
        }
      },
      sortPosts() {
          this.posts.sort((a,b) => {
            if (a.nom_com < b.nom_com) {
                return -1;
            } else if(a.nom_com > b.nom_com) {
                return 1;
            } else {
                return 0;
            }
          });

      },
      applyListenerFilters() {
            EventBus.$on('filter-by-region', region => {
                if (region != 0) {
                    this.posts = [];
                    for (let i = 0; i < this.irisitems.length; i++) {
                        if (this.irisitems[i].nom_reg == region) {
                            this.posts.push(this.irisitems[i]);
                        }
                    }
                } else {
                    this.posts=this.irisitems;
                }
                this.setPages();
                this.page = 1;
                this.sortPosts();
                this.deselectAll();
            });
            EventBus.$on('filter-by-dpt', dpt => {
                if (dpt != 0) {
                    this.posts = [];
                    for (let i = 0; i < this.irisitems.length; i++) {
                        if (this.irisitems[i].nom_dep == dpt) {
                            this.posts.push(this.irisitems[i]);
                        }
                    }
                } else {
                    this.posts=this.irisitems;
                }
                this.setPages();
                this.page = 1;
                this.sortPosts();
                this.deselectAll();
            });
            EventBus.$on('filter-by-ville', ville => {
                this.posts = [];
                for (let i = 0; i < this.irisitems.length; i++) {
                    if (this.irisitems[i].nom_com.indexOf(ville) == 0) {
                        this.posts.push(this.irisitems[i]);
                    }
                }
                this.setPages();
                this.page = 1;
                this.sortPosts();
                this.deselectAll();
            });
            EventBus.$on('change-reference-point', reference => {
                this.indicateur = reference;
                if (reference == 'region') {
                    let champs = document.getElementsByClassName('region');
                    champs.forEach(element => {
                        if ((element.className.includes('displayInterfaceNum') && this.interfaceNum)||
                            (element.className.includes('displayInfo') && this.information)||
                            (element.className.includes('displayCompNum') && this.competenceNum)||
                            (element.className.includes('displayCompAdmin') && this.competenceAdmin)||
                            (element.className.includes('displayGlobAccess') && this.globalAcces)||
                            (element.className.includes('displayGlobComp') && this.globalComp)||
                            (element.className.includes('displayScoreGlobal'))) {
                            element.style.display = 'table-cell';
                        } else {
                            element.style.display = 'none';
                        }
                    });
                    document.getElementsByClassName('departement').forEach(element => {
                        element.style.display = 'none';
                    });
                } else {
                    let champs = document.getElementsByClassName('departement');
                    champs.forEach(element => {
                        if ((element.className.includes('displayInterfaceNum') && this.interfaceNum)||
                            (element.className.includes('displayInfo') && this.information)||
                            (element.className.includes('displayCompNum') && this.competenceNum)||
                            (element.className.includes('displayCompAdmin') && this.competenceAdmin)||
                            (element.className.includes('displayGlobAccess') && this.globalAcces)||
                            (element.className.includes('displayGlobComp') && this.globalComp)||
                            (element.className.includes('displayScoreGlobal'))) {
                            element.style.display = 'table-cell'
                        } else {
                            element.style.display = 'none';
                        }
                    });
                    document.getElementsByClassName('region').forEach(element => {
                        element.style.display = 'none';
                    });
                }
            })
            EventBus.$on('filter-by-postal-code', codePostal => {
                this.posts = [];
                for (let i = 0; i< this.irisitems.length; i++) {
                    if (this.irisitems[i].code_postal.length==5) {
                        if (this.irisitems[i].code_postal.indexOf(codePostal) == 0) {
                            this.posts.push(this.irisitems[i]);
                        }  
                    } else {
                        if ("0".concat(this.irisitems[i].code_postal).indexOf(codePostal) == 0) {
                            this.posts.push(this.irisitems[i]);
                        }
                    }
                }
                this.setPages();
                this.page = 1;
                this.sortPosts();
                this.deselectAll();
            });
      },
      deselectAll() {
          document.getElementsByClassName("ajoutCol").forEach(element => {
              element.checked = false;
          });
          document.getElementsByClassName("titreCol").forEach(element => {
              element.style.display = "none";
          })
      },
      download() {
        const doc = new jsPDF();
        let tab = [];
        for (let i = 0; i < this.posts.length; i++) {
            let post = this.posts[i];
            tab.push([post.nom_com,post.nom_iris, post.nom_reg, post.nom_dep, post.population, post.score_global_reg, post.access_inter_num_reg, post.access_info_reg, post.global_access_reg]);
        }
        doc.autoTable({
            head:[["Commune","Iris", "Région", "Département", "Population", "Score Global", "Accès Numérique", "Accès Information", "Score d'accès"]],
            body:tab
        });
        
        doc.save('table_acces.pdf');
        const doc2 = new jsPDF();
        let tab2 = [];
        for (let i = 0; i < this.posts.length; i++) {
            let post = this.posts[i];
            tab2.push([post.nom_com,post.nom_iris, post.nom_reg, post.nom_dep, post.population, post.score_global_reg, post.comp_admin_reg, post.comp_num_scol_reg, post.global_comp_reg]);
        }
        doc2.autoTable({
            head:[["Commune","Iris", "Région", "Département", "Population", "Score Global", "Compétences Administratives", "Compétences numériques", "Score de Compétences"]],
            body:tab2
        })
        doc2.save('table_competences.pdf');
      }
  },
  computed: {
      displayedPosts() {
          this.deselectAll();
          return this.paginate(this.posts);
      }
  },
  watch: {
      posts() {
          this.setPages();
      }
  },
  created() {
        this.allRecords();
        this.applyListenerFilters();
  },
  filters: {
      trimWords(value) {
          return value.split(" ").splice(0,20).join(" ") + '...';
      }
  }
}
</script>

<style scoped>
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
    .displayIris, .displayInterfaceNum, .displayInfo, .displayCompAdmin, .displayCompNum, .displayGlobAccess, .displayGlobComp {
        display: none;
    }
    .data-table {
        text-align: center;
    }
    #tabAgregat {
        text-align: center;
    }
    #tabContent {
        overflow-x: auto;
    }
    .truc {
        display: flex;
        flex-wrap: wrap;
    }
    table {
        margin-right: auto;
        margin-left: auto;
    }
    .pagination .row {
        text-align: center;
        width: 100%;
    }
    .page-number {
        border-right: none;
        border-radius: 0px;
    }
    .previous {
        border-right: none;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
    }
    .next {
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
    }
    .add-raws {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
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
    .departement {
        display:none;
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
    .modal-body {
        padding: 2px 16px;
    }
    .modal-footer {
        padding: 2px 16px;
        padding-top: 16px;
        background-color: #0a3e65;
        color: white;
    }
</style>
