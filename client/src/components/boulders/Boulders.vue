<template>
  <v-container>
    <v-layout row wrap  v-for="boulder in boulders" :key="boulder._id" class="mb-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm3 md3>
                <v-card-media
                  :src="baseServerImageUrl + boulder.image"
                  height="130px">
                </v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">{{ boulder.name }}</h3>
                    <div>{{ boulder.description }}</div>
                    <div> Avg rating: {{ boulder.avgRating }}</div>
                    <div> Author: {{ boulder.creatorId }}</div>
                  </div>
                </v-card-title>
                 <v-card-actions>
                  <v-btn flat 
                    :to="'/boulder/' + boulder._id"
                    ><v-icon left>arrow_forward</v-icon>
                    View boulder
                  </v-btn>
                  <v-btn flat @click="deleteBoulder(boulder)" v-if="userIsCreator(boulder)">Delete</v-btn>
                  <v-btn flat @click="addRemoveBoulderToClimbed(boulder._id)" v-if="userIsAuthenticated">
                        {{ !userClimbed(boulder._id) ? 'Add to climbed' : 'Remove from climbed' }}
                    </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    boulders () {
      console.log(this.$store.getters.loadedBoulders)
      return this.$store.getters.loadedBoulders
    },
    baseServerImageUrl () {
      return this.$store.getters.baseServerImageUrl
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  methods: {
    deleteBoulder (boulder) {
      this.$store.dispatch('deleteBoulder', boulder)
      this.$router.push('/boulders')
    },
    addRemoveBoulderToClimbed (boulderId) {
      this.$store.dispatch('addRemoveBoulderToClimbed', boulderId)
    },
    userIsCreator (boulder) {
      if (!this.userIsAuthenticated) {
        return false
      }
      return this.$store.getters.user.id === boulder.creatorId
    },
    userClimbed (id) {
      // check if boulderId is in the arrray (value is -1 if not)
      if (!this.userIsAuthenticated) {
        return false
      }
      return this.$store.getters.user.climbedBoulders.findIndex(boulderId => {
        return boulderId === id
      }) >= 0
    }
  }
}
</script>

<style>

</style>
