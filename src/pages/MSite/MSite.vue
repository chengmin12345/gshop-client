<template>
    <div class="msite">
        <HeaderTop :title="address.name">
          <router-link class="header_search" slot="left" to="/search">
            <i class="iconfont icon-sousuo"></i>
          </router-link>
          <router-link class="header_login" slot="right" :to="userInfo._id?'/userinfo':'/login'" >
            <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
            
            <span class="header_login_text" v-else>
              <i class="iconfont icon-person"></i>
            </span>
          </router-link>
        </HeaderTop>
        <!--首页导航-->
        <nav class="msite_nav">
          <div class="swiper-container">
            <div class="swiper-wrapper" v-if="categories.length"> 
              <div class="swiper-slide" v-for="(categories,index) in categoriesArr" :key="index">
                <a href="javascript:" class="link_to_food" v-for="(category ,index) in categories" :key="index">
                  <div class="food_container">
                    <img :src="baseImageUrl+category.image_url">
                  </div>
                  <span>{{category.title}}</span>
                </a>
              </div>
            </div>
            <img src="./images/msite_back.svg" alt="back" v-else>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
        </nav>
        <!--首页附近商家-->
        <div class="msite_shop_list">
          <div class="shop_header">
            <i class="iconfont icon-xuanxiang"></i>
            <span class="shop_header_title">附近商家</span>
          </div>
          <ShopList></ShopList>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import ShopList from '../../components/ShopList/ShopList.vue'

export default {
  data(){
    return {
     baseImageUrl: 'https://fuss10.elemecdn.com'
    }
  },
  components:{
          HeaderTop,
          ShopList
  },
  mounted(){
    // 发送请求
    this.$store.dispatch('getCategories')
    this.$store.dispatch('getShops')

  },
  computed:{
      ...mapState(['address','categories','userInfo']),
      // 根据catagories一维数组生成二维数组，小数组中的元素最大为8
      categoriesArr () {
          const {categories} = this
          // 准备空的2维数组
          const arr = []
          // 准备一个小数组(最大长度为8)
          let minArr = []
          // 遍历categories
             categories.forEach(c => {
          // 如果当前小数组已经满了, 创建一个新的
          if(minArr.length===8) {
            
            minArr = []
          }
          // 如果minArr是空的, 将小数组保存到大数组中
          if(minArr.length===0) {
 
            arr.push(minArr)
           
          }
          // 将当前分类保存到小数组中
          minArr.push(c)
        })
          return arr
        }
    },
  watch:{
      categories(value){   //categories数组中有数据了，在异步执行之前执行
      // 使用setTimeout可以实现效果，但是不太好
        // setTimeout(()=>{
        //     // 创建一个Swiper实例对象，实现轮播
        //   new Swiper('.swiper-container',{
        //       loop: true, // 循环模式选项
            
        //       // 如果需要分页器
        //       pagination: {
        //         el: '.swiper-pagination',
        //       }
        //   })
        // },1)

        // 界面更新就立即创建Swiper对象
        this.$nextTick(()=>{  //一旦界面完成，理解调用（此条语句要防在数据更新之后）
              new Swiper('.swiper-container',{
              loop: true, // 循环模式选项
            
              // 如果需要分页器
              pagination: {
                el: '.swiper-pagination',
              }
          })
        })
      }
    }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
  .msite  //首页
          width 100%
          .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            height 200px
            background #fff
            .swiper-container
              width 100%
              height 100%
              .swiper-wrapper
                width 100%
                height 100%
                .swiper-slide
                  display flex
                  justify-content center
                  align-items flex-start
                  flex-wrap wrap
                  .link_to_food
                    width 25%
                    .food_container
                      display block
                      width 100%
                      text-align center
                      padding-bottom 10px
                      font-size 0
                      img
                        display inline-block
                        width 50px
                        height 50px
                    span
                      display block
                      width 100%
                      text-align center
                      font-size 13px
                      color #666
              .swiper-pagination
                >span.swiper-pagination-bullet-active
                  background #02a774
          .msite_shop_list
            top-border-1px(#e4e4e4)
            margin-top 10px
            background #fff
            .shop_header
              padding 10px 10px 0
              .shop_icon
                margin-left 5px
                color #999
              .shop_header_title
                color #999
                font-size 14px
                line-height 20px
            
</style>