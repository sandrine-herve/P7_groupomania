<template>
  <div class="forum">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
      <mur/>
  </div>    

</template>



<script>

import mur from '@/components/mur.vue'

export default {
    name: 'Forum',
    components: {
         mur,
    }
}

</script>

<style lang="scss" scoped>
.forum{
background-color: #b2b2b2;
}



</style>


