<template>
  <div class="forum">
      <h1>Groupomania</h1>
      <router-link to="/forum">
        <button type="button" class="btn btn-success" id="return"> Forum </button>
      </router-link>
             <!-- afficher le post sélectionné -->
      <!-- <div class="posted">
            <p class="name">{{post.userId}}</p>  
            <p class="title">{{post.title}}</p>  
            <p class="content">{{post.content}}</p>
            <p class="date">{{post.dateAdd}}</p>
      </div>   -->

             <div id='show_update'>
                <form method="POST">
                  <div class="form-group col-lg-3 col-sm-6">
                    <input v-model='title' type='title' placeholder="Modidiez votre titre !" size="50" required aria-label="titre du post a mofidier"> <br>
                  </div>
                  <div class="form-group col-lg-3 col-sm-6">
                    <input v-model='content' type='text' placeholder="Modidiez votre post !" size="50" required aria-label="contenu du post a mofidier"> <br>
                  </div>
        
                  <button @click="updatePost()" type="button" class="btn btn-secondary" id='login'>Modifier votre post !</button>
                </form>
              </div>

     
    
      
  </div>    

</template>



<script>

import axios from 'axios'

export default {
    name: 'update',
    data() {
        return {
           data:JSON.parse(this.$localStorage.get('user')),
           posts:[],
           isAdmin:'',
           user:'',
           username:'',
           title:'',
           content:'',
           dateAdd:'',
           id:this.$route.params.id,
           token:'',
           userId: JSON.parse(this.$localStorage.get('userId')),
           id_param: this.$route.params.id,
           
        }
    },
    mounted() {
        
    },
    watch:{
			'$route' (to) {
				this.id = to.params.id
			}
		},
    components: {
         
    },
    // mounted() {
    //     axios.get('http://localhost:8080/api/posts/getOne') 
    //     .then(response =>{
    //         console.log(response.data)
    //         this.posts = response.data
            
            
    //     })
    //     .catch(error => console.log(error))
    // },
    methods: {
        updatePost: function (){
        let token =localStorage.getItem('token');
        axios.put('http://localhost:8080/api/posts/update',
        {
          id: this.id ,
          title: this.title,
          content:this.content,
        },{
                   headers: {
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + token
                  }
         }
        ).then(()=>{
            console.log('post modifié !')
            this.post ==="";
            alert('Votre message a bien été modifié !')
            // location.reload(true);
            this.$router.push('/forum')

        })
        .catch((error) => {
                    console.log(error);
                    console.log("Votre message n'a pas pu etre modifié !");
                });
      },
    }
}

</script>

<style lang="scss" scoped>
.forum{
background-color: #b2b2b2;
}



</style>
