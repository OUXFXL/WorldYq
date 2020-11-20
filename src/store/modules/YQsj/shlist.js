import { pageQuery, saveOrUpdate } from '@/api/YQsj/shlist'
import { Notification } from 'element-ui';
export default {
    namespaced: true,
    state: {
        allData: []
    },
    getters: {
        total: state => state.allData.total,
        listData: state => state.allData.list
    },
    mutations: {
        changeallData(state, data) {
            state.allData = data
        }
    },
    actions: {
        async pageQuery({ commit }, payload) {
            let res = await pageQuery(payload)
            commit('changeallData', res.data)
        },
        //保存或更新疫情数据
        async saveOrUpdate({ dispatch }, payload) {
            let res = await saveOrUpdate(payload.form);
            if (res.status === 200) {
                Notification({
                    type: 'success',
                    title: '成功',
                    message: '保存成功'
                })
                dispatch('saveOrUpdate');

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