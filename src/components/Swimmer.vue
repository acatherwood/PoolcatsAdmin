<template>
  <div v-if="currentSwimmer" class="edit-form">
    <h4>Swimmer</h4>
    <form>
      <div class="form-group">
        <label for="first_name">first name</label>
        <input type="text" class="form-control" id="first_name"
          v-model="currentSwimmer.first_name"
        />
      </div>
      <div class="form-group">
        <label for="last_name">last_name</label>
        <input type="text" class="form-control" id="last_name"
          v-model="currentSwimmer.last_name"
        />
      </div>

      <div class="form-group">
         <label for="birthdate">Date Of Birth!</label>
        <input type="text"  class="form-control" id="birthdate" v-prettyDate="currentSwimmer.birthdate"
          v-model="currentSwimmer.birthdate"
        />
        </div>
    </form>

    <!-- <button class="badge badge-primary mr-2"
      v-if="currentSwimmer.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button> -->
    <!-- <button v-else class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button> -->

    <button class="m-3 btn btn-sm btn-danger"
      @click="deleteSwimmer"
    >
      Delete
    </button>

    <button type="submit" class="m-3 btn btn-sm btn-warning"
      @click="updateSwimmer"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Swimmer...</p>
  </div>
</template>

<script>
import SwimmerDataService from "../services/SwimmerDataService";

export default {
  name: "swimmer",
  data() {
    return {
      currentSwimmer: null,
      message: ''
    };
  },
  methods: {
    getSwimmer(id) {
      SwimmerDataService.get(id)
        .then(response => {
          this.currentSwimmer = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentSwimmer.id,
        first_name: this.currentSwimmer.first_name,
        last_name: this.currentSwimmer.last_name,
        published: status
      };

      SwimmerDataService.update(this.currentSwimmer.id, data)
        .then(response => {
          this.currentSwimmer.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateSwimmer() {
      SwimmerDataService.update(this.currentSwimmer.id, this.currentSwimmer)
        .then(response => {
          console.log(response.data);
          this.message = 'The swimmer was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteSwimmer() {
      if(confirm("Do you really want to delete " + this.currentSwimmer.first_name + " " + this.currentSwimmer.last_name + " ?")){
        SwimmerDataService.delete(this.currentSwimmer.id)
          .then(response => {
            console.log(response.data);
            this.$router.push({ name: "swimmers" });
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  },
  mounted() {
    this.message = '';
    this.getSwimmer(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>