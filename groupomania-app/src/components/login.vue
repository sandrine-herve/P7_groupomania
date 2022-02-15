<template>
  <div class="login">
      <form >
          <div class="form-group col-lg-3 col-sm-6">
            <input v-model='email' type='email' placeholder="email" size="50" required aria-label="Email de connection"> <br>
          </div>
          <div class="form-group col-lg-3 col-sm-6">
            <input v-model='password' type='password' placeholder="password" size="50" required> <br>
          </div>
          <router-link to="/mur">
          <button v-on:click.prevent='login()' type="button" class="btn btn-secondary" id='login'>Se connecter</button>
          </router-link>
          <router-link to="/signup">
          <p>Pas encore inscrit ? <a href="/signup">Inscrivez-vous</a></p>
          </router-link>
      </form> 
  </div>
</template>



<script>

import axios from 'axios'




export default {
  
  name: 'login',
  components: {
  },
  
  data() {
      return {
          email:'',
          password:'',
          userId:'',
      }
  },
  methods: {
    

      login : function () {
          let token = "";
              axios.post('http://localhost:8080/api/users/login', {
                  email: this.email,
                  password: this.password,
                  name: this.name,
              },
              {
                  headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  }
              }).then((response) => {
                  localStorage.setItem("token",response.data.token);
                  localStorage.setItem("userId", response.data.userId);
                  localStorage.setItem("name", response.data.name);
                  this.$router.push('/forum')
                });


            }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.form-group {

  margin-left: 25%;
}
button {
  margin: 50px;
}
p{
  padding-bottom: 50px;
}


</style>
