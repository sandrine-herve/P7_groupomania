<template>
<!--Mur-->
    <div id="mur">
      <div class='bienvenue' >
        <h2>Bienvenue sur ton forum d'entreprise  !</h2>
        <router-link to="/">
          <button v-on:click.prevent='logout()' type="button" class="btn btn-secondary " > Se déconnecter !</button>
        </router-link>
      </div>

      <!-- Creation d'un nouveau post -->
      <form method="POST" ENCTYPE="multipart/form-data">
        
        <div class="form-group col-lg-3 col-sm-6">
          <input v-model='title' type='title' placeholder="Le titre de votre post !" size="50" required aria-label="Titre du post "> <br>
        </div>
        <div class="form-group col-lg-3 col-sm-6">
          <input v-model='content' type='text' placeholder="Dites nous tout !" size="50" required aria-label="Contenu du post"> <br>
        </div>
        <div>

           <div v-if="media">
              <img :src="media" alt="Image du post" class="file">
            </div>
             <div class="form-group col-lg-3 col-sm-6">
              <div class="form-group col-lg-3 col-sm-6">
              <input type="file" accept=".jpeg, .jpg, .png, .webp, .gif" v-on:change="uploadFile" id="file" class="input-file" name='image' aria-label="Image du post">
              <label v-if="!media" for="file" class="label-file" aria-label="Choisir une photo pour ce post"></label>
              <!-- <button v-else @click="deletefile()" class="label-file btnDelete" aria-label="Supprimer cette photo du post"><i class="far fa-trash-alt"></i> Supprimer image</button> -->
            </div>
            </div>  
        </div> 
        
          <button v-on:click='newPost()' type="button" class="btn btn-secondary" id='login'>Partager votre post !</button>
        
      </form>
      <!--  -->


      <!-- Les posts -->
      <div class="forum">
        <h3 >Voici les derniers posts de notre communauté :</h3>
        <div class="posted">
          <div id="postdiv" class="post"  v-for="post in posts" :key="post.id">
            <p class="name">{{post.userId}}</p> 
            <p class="title">{{post.title}}</p>  
            <p class="content">{{post.content}}</p>
            <p class="date">{{post.dateAdd}}</p>
            
             <!-- <img class="rounded-circle" width="45" :src="loadImage(post.media)" > -->
            <p class='id'>{{post.id}}</p>
              
              <button @click="getOne()" v-if="post.userId == userId"  type="button" class="btn btn-success btn-sm" :id="post.id"> Modifier </button> 
              <button @click="DeletePost()" v-if="post.userId == userId || isAdmin == true" type="button" class="btn btn-danger btn-sm"> Supprimer </button>
              <button @click="showForm()" type="button" class="btn btn-info btn-sm"> Répondre </button>
              <button @click ="showComment()" type="button" class="btn btn-warning btn-sm"> Voir les commentaires </button>

              <!-- Partie modif post -->
              <!-- <div v-show ='showUpdate' id='show_update'>
                <form method="POST">
                  <div class="form-group col-lg-3 col-sm-6">
                    <input v-model='title' type='title' placeholder="Modidiez votre titre !" size="50" required aria-label="titre du post a mofidier"> <br>
                  </div>
                  <div class="form-group col-lg-3 col-sm-6">
                    <input v-model='content' type='text' placeholder="Modidiez votre post !" size="50" required aria-label="contenu du post a mofidier"> <br>
                  </div>
        
                  <button @click="updatePost()" type="button" class="btn btn-secondary" id='login'>Modifier votre post !</button>
                </form>
              </div> -->
              <!-- Partie voir les posts -->
              <div v-show ='showComment' id='show_comment'>
                <div id="commentdiv" class="comment" v-for="comment in comments" :key="comment.id">
                  
                  <p class="content">{{comment.content}}</p>
                  <p class="date">{{comment.createdAt}}</p>
                  
                </div>
              </div>
              <!-- Partie réponse posts -->
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
    img:'',
    data() {
      
        return {
           
           data:JSON.parse(this.$localStorage.get('user')),
           isAdmin:JSON.parse(this.$localStorage.get('isAdmin')), 
           userId: JSON.parse(this.$localStorage.get('userId')),
           posts:[],
           title:'',
           content:'',
           dateAdd:'',
           id:'',
           comments: [],
           name: '',
           token:'',
           media:'',
           id_param: this.$route.params.id,
           
           
           
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

      getOne: function () {
        let token =localStorage.getItem('token');
        const params = new URLSearchParams(window.location.search)
        const postId = params.get('id');
        axios.get(`http://localhost:8080/api/posts/getOne/` + postId,
        {
                   headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token
                  }
         }
        ).then(()=>{
            
             console.log(this.post)
            this.post ==="";
            location.reload(true);
            this.$router.push('/update');

        })
        .catch((error) => {
                    console.log(error);
                    console.log("Votre message n'a pas pu etre récupéré!");
                });
      },

      

     uploadFile(e) {
      // this.img = e.target.files[0];
       this.img = e.target.files[0];
       const file = e.target.files[0];

       if (file) {
            let reader = new FileReader();
            reader.addEventListener('load', function(){
                let preview = document.getElementById('file');
                preview.setAttribute("src",this.result);
            })
            reader.onload = (event) => {
                this.preview = event.target.result
                this.media = event.target.result
            }
            reader.readAsDataURL(file)
                     
                  
         }
      },
     
       newPost: function () {
        let token =localStorage.getItem('token');
        const post = {
          title: this.title,
          content: this.content,
          //fileName: file,
          //img: this.media,
          // img=base64
          media: this.img.name,
          // nom fichier url
          userId: this.userId,
          
        }

        var formData = new FormData()
        formData.append('media', this.img)
        // formData.append('media', this.media);
        formData.append('post', JSON.stringify(post));

        axios.post('http://localhost:8080/api/posts/new',
        formData ,{
                  headers: {
                    
                  'Authorization': 'Bearer ' + token
                  }
         }
        ).then(() => { 
                  console.log('post envoyé !')
                  console.log( post )
                  this.post ==="";
                  alert('Votre message a bien été envoyé !')
                  location.reload(true);
                })
                .catch((error) => {
                    console.log(error);
                    console.log("Votre message n'a pas pu etre posté !");
                })


        // var formData = new FormData()
        // formData.append('img', this.media)
        // // formData.append('media', this.media);
        // formData.append('post', JSON.stringify(post));
        // axios.post('http://localhost:8080/api/posts/image',formData,
        // {  
        //              headers : {
        //                'Content-Type': 'multipart/form-data',
        //                "Authorization": 'Bearer ' + token
        //                }
        // })
        //  .then((resp) => {
        //      console.log(resp)
        //    })
        //  .catch((err) => {
        //      console.log(err.response)
        //    })
        
    },

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
    

      DeletePost: function() {
        let token =localStorage.getItem('token')
        if(confirm('Voulez vous vraiment supprimer le message ?')){
        axios.delete(`http://localhost:8080/api/posts/${this.id_param}`,
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

     

   


      
    
      
      logout: function () {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      localStorage.removeItem('isAdmin');
      this.$router.push('/');
      },
      
    }   
}

</script>

<style scoped lang="scss">
.media {
  height: 20%;
  width: 80% ;
}
#show_comment, #show_update,#form_resp{
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