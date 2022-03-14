<template>
<!--Mur-->
    <div id="mur">
      <div class='bienvenue' >
        <h2>Bienvenue sur ton forum d'entreprise !</h2>
        <router-link to="/">
          <button v-on:click.prevent='logout()' type="button" class="btn btn-secondary " > Se déconnecter !</button>
        </router-link>
      </div>
      <form method="POST">
        
        <div class="form-group col-lg-3 col-sm-6">
          <input v-model='title' type='title' placeholder="Le titre de votre post !" size="50" required aria-label="Email de connection"> <br>
        </div>
        <div class="form-group col-lg-3 col-sm-6">
          <input v-model='content' type='text' placeholder="Dites nous tout !" size="50" required aria-label="Email de connection"> <br>
        </div>
        
          <button v-on:click.prevent='newPost()' type="button" class="btn btn-secondary" id='login'>Partager votre post !</button>
        
      </form>
      
      <div class="forum">
        <h3 >Voici les derniers posts de notre communauté :</h3>
        <div class="posted">
          <div id="postdiv" class="post"  v-for="post in posts" :key="post.id">
            <!-- <p class="name">{{post.userId}}</p>  -->
            <p class="title">{{post.title}}</p>  
            <p class="content">{{post.content}}</p>
            <p class="date">{{post.dateAdd}}</p>
            <p class='id'>{{post.id}}</p>
              <button @click="getOne()" v-if="post.userId == userId"  type="button" class="btn btn-success btn-sm" :id="post.id"> Modifier </button> 
              <button @click="DeletePost()" v-if="post.userId == userId || isAdmin == true" type="button" class="btn btn-danger btn-sm"> Supprimer </button>
              <button @click="showForm()" type="button" class="btn btn-info btn-sm"> Répondre </button>
              <button @click ="showComment()" type="button" class="btn btn-warning btn-sm"> Voir les commentaires </button>
              <div v-show ='showComment' id='show_comment'>
                <div id="commentdiv" class="comment" v-for="comment in comments" :key="comment.id">
                  
                  <p class="content">{{comment.content}}</p>
                  <p class="date">{{comment.createdAt}}</p>
                  
                </div>
              </div>

              <div v-show ='showForm' class='form' id='form_resp'>
                <form>
                  <input type="text" id="comment" name="comment" placeholder="Laisse ton commentaire !" >
                  <button type="submit" id="btn_comment" class="btnLogin btn-primary btn-sm"> Envoyer ma réponse !</button>
                </form>
              </div>
          </div>
        </div>
          <!-- <button @click= "updatemess(mess.idMESSAGES)" v-if="data.username == mess.username || data.status =='admin'" type="button" class="btn btn-success btn-sm mod">modifier</button> -->
          <!-- <button  @click= "deletemess(mess.idMESSAGES)"  v-if="data.username == mess.username || data.status =='admin'" type="button" class="btn btn-danger btn-sm sup"><font-awesome-icon icon="trash"/></button>  -->
          <!-- <button @click= "response(mess.idMESSAGES)" class="btn btn-info btn-circle text-uppercase bt" id="reply"><span class="glyphicon glyphicon-share-alt"></span>Repondre</button> -->
          <!-- <button @click= "view(mess.idMESSAGES)" class="btn btn-warning btn-circle text-uppercase bt" id="voir" data-toggle="collapse" href="#/viewresponse"><span class="glyphicon glyphicon-comment"></span>Voir les réponses</button> -->
        
      </div>
    </div> 
</template>


<script>

import axios from 'axios'



export default {
    name:'mur',
    data() {
      
        return {
           
           data:JSON.parse(this.$localStorage.get('user')),
           posts:[],
           comments: [],
           isAdmin:JSON.parse(this.$localStorage.get('isAdmin')),
           user:'',
           title:'',
           content:'',
           dateAdd:'',
           id:'',
           token:'',
           userId: JSON.parse(this.$localStorage.get('userId')),
           
           
        }
    },
    mounted() {
        axios.get('http://localhost:8080/api/posts/getAll') 
        .then(response =>{
            console.log(response.data)
            this.posts = response.data
        })
        .catch(error => console.log(error));
    },
    watch:{
		'$route' (to) {
		this.id = to.params.id
		}
		},
    methods : {
      showComment: function() {
        let show_comment = document.getElementById('show_comment');
        if(getComputedStyle(show_comment).display != "none"){
        show_comment.style.display = "none"
        } else {
            show_comment.style.display = "block"
            axios.get('http://localhost:8080/api/comments/getAll')
            .then(response => {
              console.log(response.data)
              this.comments =response.data
            })
            .catch(error => console.log(error));
      }
      },
      showForm: function( ){
        let form_resp = document.getElementById('form_resp');
        if(getComputedStyle(form_resp).display != "none"){
        form_resp.style.display = "none"
        } else {
            form_resp.style.display = "block"   
  }
      },
     getOne: function() {
       
      axios.get(`http://localhost:8080/api/posts/getOne/${this.id}`)
      .then (response =>{
      localStorage.setItem('post',JSON.stringify(this.post)),
      this.$router.push('/update')
      console.log(this.post)
      console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
      },

      DeletePost: function() {
        let token =localStorage.getItem('token')
        if(confirm('Voulez vous vraiment supprimer le message ?')){
        axios.delete(`http://localhost:8080/api/posts/delete`,
        { id: this.id },
        {
          headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        })
        .then(()=> {
          alert('le message a bien été supprimé !')
        })
       } 
      },

      newPost: function () {
        let token =localStorage.getItem('token');
        axios.post('http://localhost:8080/api/posts/new',
        {
          
          title: this.title,
          content:this.content,
        } ,{
                   headers: {
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + token
                  }
         }
        ).then(() => { 
                  console.log('post envoyé !')
                  console.log(this.id,this.title,this.content)
                  this.post ==="";
                  alert('Votre message a bien été envoyé !')
                  location.reload(true);
                })
                .catch((error) => {
                    console.log(error);
                    console.log("Votre message n'a pas pu etre posté !");
                })
        

    },
      
      logout: function () {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('name');
      localStorage.removeItem('isAdmin');
      this.$router.push('/');
      },
      
    }   
}

</script>

<style scoped lang="scss">
#show_comment{
  display: none;
}
#form_resp {
  display: none;
}
.form-group {
  margin-left: 25%;
  margin-top: 50px;
}
form {
  width: 80%;
  border: 2px solid #808080 ;
 margin-left: 10%;
}

h2,h3,p {
  color: black
}

.post, .comment {
  width: 80%;
  border: 2px solid #808080 ;
  
  margin: 5px;
  margin-left: 10%;
  padding: 10px;
}

button{
  margin: 5px;
}

</style>