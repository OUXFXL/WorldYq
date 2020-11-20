import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import inventory from './modules/goods/inventory'
import nowyq from './modules/YQ/nowyq'
import WPTotal from './modules/YQTJ/WPTotal'
import ddyy from './modules/dingdian/ddyy'
import detail from './modules/dDetail/detail'
import user2 from './modules/set/user2'
import rolse from './modules/set/rolse'
import shlist from './modules/YQsj/shlist'
import sjsb from './modules/YQsj/sjsb'
import zizu from './modules/YQgl/zizu'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    inventory,
    nowyq,
    WPTotal,
    ddyy,
    detail,
    user2,
    rolse,
    shlist,
    sjsb,
    zizu
  },
  getters
})

export default store
