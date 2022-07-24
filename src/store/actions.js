/*
通过mutations间接更新state多个方法的对象
*/


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
 from './mutations-types.js'

//  引入api
 import {
    reqAddress,
    reqFoodCategories,
    reqShops,
    reqUserInfo,
    reqLogout,
    reqShopGoods,
    reqShopRatings,
    reqShopInfo,
    reqSearchShop
}from '../api'
import { call } from 'file-loader'

export default {
    // 异步获取地址
    async getAddress({commit, state}) {
      // 发送异步ajax请求
      const geohash = state.latitude + ',' + state.longitude
      const result = await reqAddress(geohash)
      // 提交一个mutation
      if (result.code === 0) {
        // 将返回的data对象赋值给address,之后在mutations中传参的时候用解构赋值解构出来
        const address = result.data
        commit(RECEIVE_ADDRESS, {address})
      }
    },
    // 异步获取食品分类列表
    async getCategories({commit}){
        //发送异步ajax请求
        const result = await reqFoodCategories()
        // 提交一个mutation
        if(result.code===0){
            const categories = result.data
            commit(RECEIVE_CATEGRORIES,{categories})
        }
    },
    // 异步获取商家列表
    async getShops({commit,state}){
      // 发送异步ajax请求
      const {longitude ,latitude} = state   //从state中解构赋值出latitude,longitude
      const result = await reqShops(longitude,latitude)
      // 提交一个mutation
      if(result.code===0){
        const shops = result.data
        commit(RECEIVE_SHOPS,{shops})
      }
    },
    // 同步记录用户信息
    recodeUser({commit},userInfo){
     commit(RECEIVE_USER_INFO,{userInfo})
    },

    // 异步获取用户信息
    async getUserInfo({commit}){
      const result = await reqUserInfo()
      if(result.code===0){
        const userInfo = result.data
        commit(RECEIVE_USER_INFO,{userInfo})
      }
    },

    // 异步退出
    async logout({commit}){
      const result = await reqLogout()
      if(result.code===0){
        // 重置用户名
        commit(RESET_USER_INFO)
      }
    },

    // 异步获取商品列表
    async getShopGoods({commit},callback){
      const result = await reqShopGoods()
      if(result.code===0){
        const goods = result.data
        commit(RECEIVE_GOODS,{goods})
        // 数据更新了，通知一下组件
        callback && callback()
      }
      
    },
    // 异步获取商家评价列表
    async getShopRatings({commit},callback){
      const result = await reqShopRatings()
      if(result.code===0){
        const ratings = result.data
        commit(RECEIVE_RATINGS,{ratings})
        // 数据更新完通知组件
        callback && callback()
      }
    },
    // 异步获取商家信息
    async getShopInfo({commit},callback){
      const result = await reqShopInfo()
      if(result.code===0){
        const info = result.data
        commit(RECEIVE_INFO,{info})
        callback && callback()
      }
    },



  // 同步更新food中的count值
  updateFoodCount({commit}, {isAdd, food}) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT, {food})
    } else {
      commit(DECREMENT_FOOD_COUNT, {food})
    }
  },

  // 同步清空购物车
  clearCart({commit}){
      commit(CLEAR_CART)
  },

  // 异步根据关键字获取商家信息
  async searchShops({commit,state},keyword){
    const geohash =state.latitude +',' +state.longitude
    const result = await reqSearchShop(geohash ,keyword)
    if(result.code===0){
      const searchShops = result.data
      commit(RECEIVE_SEARCH_SHOPS,{searchShops})

    }
  }
    
}