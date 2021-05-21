<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <!-- <input type="text" class="form-control" placeholder="Search by title"
          v-model="title"/> -->
        <div class="input-group-append">
          <!-- <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button> -->
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Swimmers List</h4>
      <p>Click on a swimmer to view details</p>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(swimmer, index) in swimmers"
          :key="index"
          @click="setActiveSwimmer(swimmer, index)"
        >
          {{ swimmer.first_name }} {{ swimmer.last_name }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllSwimmers">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentSwimmer">
        <h4>Swimmer</h4>
        <div>
          <label><strong>First Name:</strong></label> {{ currentSwimmer.first_name }}
        </div>
        <div>
          <label><strong>Last Name:</strong></label> {{ currentSwimmer.last_name }}
        </div>
        <div>
          <label><strong>Date of Birth:</strong></label> {{ currentSwimmer.birthdate | formatDate}}
        </div>
        <div>
          <label><strong>Age:</strong></label> {{ getAge(currentSwimmer.birthdate)}}
        </div>
        <div>
            <a class = "m-3 btn btn-sm btn-warning"
          :href="'/swimmers/' + currentSwimmer.id">
         Edit
        </a>
        </div>
      
      </div>
    </div>
  </div>
</template>

<script>
import SwimmerDataService from "../services/SwimmerDataService";


export default {
  name: "swimmers-list",
  data() {
    return {
      swimmers: [],
      currentSwimmer: null,
      currentIndex: -1,
      first_name: "",
      last_name: ""
    };
  },
  methods: { 
    getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            age--;
        }
        return age;
    },

    retrieveSwimmers() {
      SwimmerDataService.getAll()
        .then(response => {
          this.swimmers = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveSwimmers();
      this.currentSwimmer = null;
      this.currentIndex = -1;
    },

    setActiveSwimmer(swimmer, index) {
      this.currentSwimmer = swimmer;
      this.currentIndex = index;
    },

    removeAllSwimmers() {
      if(confirm("Do you really want to delete ALL swimmers?")){
        SwimmerDataService.deleteAll()
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
       }
    },
    
    // searchTitle() {
    //   SwimmerDataService.findByTitle(this.title)
    //     .then(response => {
    //       this.swimmers = response.data;
    //       console.log(response.data);
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
    // }
  },
  mounted() {
    this.retrieveSwimmers();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>