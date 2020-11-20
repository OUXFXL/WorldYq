import { PrivilegeFindAll, findAll, saveOrUpdate } from '@/api/set/rolse'
import { Notification } from 'element-ui';
export default {
    namespaced: true,
    state: {
        allData: [],
        //所有权限信息
        totalData: []
    },
    getters: {

    },
    mutations: {
        changeallData(state, data) {
            state.allData = data
        },
        changetotalData(state, data) {
            state.totalData = data
        }
    },
    actions: {
        async PrivilegeFindAll({ commit }, payload) {
            let res = await PrivilegeFindAll(payload)
            commit('changeallData', res.data)
        },
        //所有权限信息
        async findAll({ commit }, payload) {
            let res = await findAll(payload)
            commit('changetotalData', res.data)
        },
        //保存或更新
        async saveOrUpdate({ dispatch }, payload) {
            let res = await saveOrUpdate(payload.form);
            if (res.status === 200) {
                Notification({
                    type: 'success',
                    title: '成功',
                    message: '保存成功'
                })
                dispatch('findAll');

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