/*
直接更新state多个方法的对象
*/
import Vue from 'vue'
// 引入mutations-types.js的常量
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGRORIES,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO,
    RESET_USER_INFO,
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    RECEIVE_INFO,
    INCREMENT_FOOD_COUNT,
    DECREMENT_FOOD_COUNT,
    CLEAR_CART,
    RECEIVE_SEARCH_SHOPS

}
    from './mutations-types'


export default {
    [RECEIVE_ADDRESS](state, { address }) {
        state.address = address
        console.log([RECEIVE_ADDRESS]);
    },
    [RECEIVE_CATEGRORIES](state, { categories }) {
        state.categories = categories
    },
    [RECEIVE_SHOPS](state, { shops }) {
        state.shops = shops
    },
    [RECEIVE_USER_INFO](state, { userInfo }) {
        state.userInfo = userInfo
    },
    [RESET_USER_INFO](state) {
        // 退出登录后，用户信息清空
        state.userInfo = {}
    },

    // mock数据里的三个数据
    [RECEIVE_GOODS](state, { goods }) {
        state.goods = goods
    },
    [RECEIVE_RATINGS](state, { ratings }) {
        state.ratings = ratings
    },
    [RECEIVE_INFO](state, { info }) {
        state.info = info
    },

    
    [INCREMENT_FOOD_COUNT](state, { food }) {
      if(!food.count){ //第一次增加
        // food.count=1    //新增属性（没有数据绑定）
        // 对象、属性名、属性值
        Vue.set(food,'count',1)  //让新增的属性也有数据绑定
        // 将food添加到cartFoods中
        state.cartFoods.push(food)
      }else{
        food.count++
      }
    },
    [DECREMENT_FOOD_COUNT](state, { food }) {
     if(food.count){  //只有有值才去减
        food.count--
        if(food.count===0){
            // 将food从cartFoods中移除
            state.cartFoods.splice(state.cartFoods.indexOf(food),1)
        }
     }
    },
    [CLEAR_CART](state){

        //清除food中的count
        state.cartFoods.forEach(food=>food.count=0)

        // 清除购物车中的所有购物项
        state.cartFoods = []
        
    },
    [RECEIVE_SEARCH_SHOPS](state, { searchShops }) {
        state.searchShops = searchShops
    },

}