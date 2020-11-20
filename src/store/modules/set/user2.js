import { pageQuery, saveOrUpdate } from '@/api/set/user2'
import { Notification } from 'element-ui';
export default {
    namespaced: true,
    state: {
        AllDatas: {}
    },
    getters: {
        total: state => state.AllDatas.total,
        listDatas: state => state.AllDatas.list
    },
    mutations: {
        changeAllDatas(state, data) {
            state.AllDatas = data;
        }
    },
    actions: {
        async pageQuery({ commit }, payload) {
            let res = await pageQuery(payload)
            commit('changeAllDatas', res.data)
        },
        //保存或更新数据
        async saveOrUpdate({ dispatch }, payload) {
            let res = await saveOrUpdate(payload.form);
            if (res.status === 200) {
                Notification({
                    type: 'success',
                    title: '成功',
                    message: '保存成功'
                })
                dispatch('pageQuery');

            } else {
                Notification({
                    type: 'error',
                    title: '失败',
                    message: '保存失败'
                });
            }

        }
    }
}