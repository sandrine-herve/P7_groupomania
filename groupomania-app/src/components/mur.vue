<template>
<!--Mur-->
    <div id="mur">
      <div class='bienvenue' >
        <h2>Bienvenue sur ton forum d'entreprise !</h2>
        <router-link to="/">
          <button v-on:click.prevent='logout()' type="button" class="btn btn-secondary " > Se déconnecter !</button>
        </router-link>
      </div>
      <form>
        <div class="form-group col-lg-3 col-sm-6">
          <input v-model='name' type='name' placeholder="Votre pseudo ! " size="50" required aria-label="Email de connection"> <br>
        </div>
        <div class="form-group col-lg-3 col-sm-6">
          <input v-model='title' type='title' placeholder="Le titre de votre post !" size="50" required aria-label="Email de connection"> <br>
        </div>
        <div class="form-group col-lg-3 col-sm-6">
          <input v-model='content' type='content' placeholder="Dites nous tous !" size="50" required aria-label="Email de connection"> <br>
        </div>
        <router-link to="/forum">
          <button v-on:click.prevent='newPost()' type="button" class="btn btn-secondary" id='login'>Partager votre post !</button>
        </router-link>
      </form>
      <div class="getPost">
        <h3 id="post">Voici les derniers posts de notre communauté :</h3>
        <div id="postdiv" class="post"  v-for="post in post" :key="post.id">
          <p class="name">{{post.name}}</p>
          <p class="title">{{post.title}}</p>  
          <p class="content">{{post.content}}</p>
          <p class="date">{{post.dateAdd}}</p>
          <button type="button" class="btn btn-success btn-sm"> Modifier </button>
          <button type="button" class="btn btn-danger btn-sm"> Supprimer </button>
          <button type="button" class="btn btn-info btn-sm"> Répondre </button>
          <button type="button" class="btn btn-warning btn-sm"> Voir les commentaires </button>
          <!-- <button @click= "updatemess(mess.idMESSAGES)" v-if="data.username == mess.username || data.status =='admin'" type="button" class="btn btn-success btn-sm mod">modifier</button> -->
          <!-- <button  @click= "deletemess(mess.idMESSAGES)"  v-if="data.username == mess.username || data.status =='admin'" type="button" class="btn btn-danger btn-sm sup"><font-awesome-icon icon="trash"/></button>  -->
          <!-- <button @click= "response(mess.idMESSAGES)" class="btn btn-info btn-circle text-uppercase bt" id="reply"><span class="glyphicon glyphicon-share-alt"></span>Repondre</button> -->
          <!-- <button @click= "view(mess.idMESSAGES)" class="btn btn-warning btn-circle text-uppercase bt" id="voir" data-toggle="collapse" href="#/viewresponse"><span class="glyphicon glyphicon-comment"></span>Voir les réponses</button> -->
        </div>
      </div>
      <!-- <h5>Écriver votre message</h5>
      <form id="formtog" method="POST" class="from-group" @submit.prevent= "sendMessage" >
        <div class="form-group">
          <label for="message">
            <textarea  class="form-control" name="message" id="message" cols="50" rows="5" v-model= "message"></textarea>
          </label>
        </div>
        <button  type="submit" id="envoi" class="btn btn-primary">Envoyer</button>
      </form>  -->
    </div> 
</template>


<script>

import axios from 'axios'

export default {
    name:'mur',
    data() {
        return {
           data:JSON.parse(this.$localStorage.get('user')),
           post:'',
           title:'',
           content:'',
           dateAdd:'',
           user:'',
           id:'',
           name:'',
        }
    },
    mounted() {
        axios.get('http://localhost:8080/api/posts/getAll') 
        .then(response =>{
            console.log(response.data)
            this.post = response.data
        })
        .catch(error => console.log(error))
    },
    methods : {
      newPost: function () {
        

    },
      
      logout: function () {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      this.$router.push('/');
      },
      
    }
}

</script>

<style scoped lang="scss">
.form-group {
  margin-left: 25%;
  margin-top: 50px;
}
form {
  width: 80%;
  border: 2px solid #808080 ;
  border-radius: 25% 5%;
}

h2,h3,p {
  color: black
}

.post {
  width: 80%;
  border: 2px solid #808080 ;
  border-radius: 25% 5%;
  margin: 5px;
  margin-left: 10%;
  padding: 10px;
}

button{
  margin: 5px;
}

</style>