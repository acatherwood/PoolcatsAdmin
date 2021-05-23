  
<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="first_name">First Name</label>
        <input
          type="text"
          class="form-control"
          id="first_name"
          required
          v-model="swimmer.first_name"
          name="first_name"
        />
      </div>

      <div class="form-group">
        <label for="last_name">Last Name</label>
        <input
          class="form-control"
          id="last_name"
          required
          v-model="swimmer.last_name"
          name="last_name"
        />
      </div>

      <div class="form-group">
        <label for="birthdate">Date of Birth</label>
        <input
          class="form-control"
          id="birthdate"
          v-model="swimmer.birthdate"
          name="birthdate"
        />
      </div>

      
      <div class="form-group">
        <label for="suitSize">Suit SIze</label>
        <input
          class="form-control"
          id="suitSize"
          v-model="swimmerStats.suitSize"
          name="suitSize"
        />
      </div>

      

      <button @click="saveSwimmer" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newSwimmer">Add</button>
    </div>
  </div>
</template>

<script>
import SwimmerDataService from "../services/SwimmerDataService";
export default {
  name: "add-swimmer",
  data() {
    return {
      swimmer: {
        id: null,
        first_name: "",
        last_name: "",
        birthdate: ""
      },
      swimmerStats: {
        swimmerId: "",
        suitSize: ""
      },
      submitted: false
    };
  },
  methods: {
    saveSwimmer() {
      var data = {
        first_name: this.swimmer.first_name,
        last_name: this.swimmer.last_name,
        birthdate: this.swimmer.birthdate,
        suitSize: this.swimmerStats.suitSize
      };
      SwimmerDataService.create(data)
        .then(response => {
          this.swimmer.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newSwimmer() {
      this.submitted = false;
      this.swimmer = {};
      this.swimmerStats = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>