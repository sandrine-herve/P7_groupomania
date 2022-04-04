<template>
  <div class="signup">
    <h1>Rejoins notre communauté GROUPOMANIA !</h1>

      <form>
        <div class="form-group col-lg-3 col-sm-6">
          <input v-model='name' type='name' placeholder="name" size="50" required >
        </div>
        <div class="form-group col-lg-3 col-sm-6">
          <input v-model='email' type='email' placeholder="email" size="50" required aria-label="Email de connection">
        </div>
        <div class="form-group col-lg-3 col-sm-6">
          <input v-model='password' type='password' placeholder="password" size="50" required>
        </div>
      </form>  
      <router-link to="/">
        <button @click="signup()" type="submit" class="btn btn-secondary" aria-label="S'inscrire" formaction="" formenctype="application/x-www-form-urlencoded">S'inscrire</button>
      </router-link>
     
  </div>
</template>

<script>
export default {
  name: 'signup',
  
  data() {
      return {
          name:'',
          email:'',
          password:'',
      }
  },
  methods: {
    signup() {
        const data = {
              name: this.name,
              email: this.email,
              password: this.password
          };

          fetch("http://localhost:8080/users/signUp", {
              method: "POST",
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          })
           .then( response => {
        if(response.ok) {
          return response.json()
        } else {
          return response.text()
          .then((text) => {
            throw new Error(text)}
          )
        }
      })  
        
      .then((value) => {
        // const token = JSON.stringify(value.token);
        const userId = JSON.stringify(value.userId);
        //const role = JSON.stringify(value.role);
        // localStorage.setItem("userToken", token);
        localStorage.setItem("userId", userId);
        //localStorage.setItem("role", role);
        
      })
      .catch(alert)
       
      }
  }
}
  
  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1 {
  padding: 50px;
  
}
.signup {
  background-color: #b2b2b2;
  margin: 20%
}
.form-group {
  margin-left: 20%;
}

button {
  margin: 50px;
}

</style>