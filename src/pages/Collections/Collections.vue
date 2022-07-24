<template>
  <div> 
    <HeaderTop/>
    <div class="collections">收藏</div>
    <div v-for="(item,index) in categories" :key="index">
      <h1>{{item.description}}</h1>
      <p>{{item.id}}</p>
      <span></span>
      <img :src="baseImageUrl+item.image_url" alt="">
      <p>{{item.title}}</p>
      
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {reqFoodCategories}from '../../api'
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
export default {
    components:{HeaderTop},
    data(){
      return{
        arr:[],
         baseImageUrl: 'https://fuss10.elemecdn.com'
      }
    },
    methods:{
         async getShops(){
          const result = await reqFoodCategories()
        //   console.log(result);
        if(result.code===0){
            this.arr=result.data
        }
          
        }

    },
    computed:{
        ...mapState(['categories'])
    },
    mounted(){
    //   this.getShops()
    this.$store.dispatch('getCategories')
    }


}
</script>

<style lang="stylus" rel="stylesheet/stylus">

.collections 
    padding-top:45px

</style>