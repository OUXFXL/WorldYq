import { pageQuery, saveOrUpdate, findAll, saveOrUpdate2 } from '@/api/YQgl/zixu'
import { Notification } from 'element-ui';
export default {
    namespaced: true,
    state: {
        allDatas: {},
        totalDatas: []
    },
    getters: {
        total: state => state.allDatas.total,
        listData: state => state.allDatas.list


    },
    mutations: {
        changeallDatas(state, data) {
            state.allDatas = data
        },
        //查询所有资讯分类
        changetotalDatas(state, data) {
            state.totalDatas = data
        }
    },
    actions: {
        //查询所有资讯分类
        async findAll({ commit }, payload) {
            let res = await findAll(payload)
            commit('changetotalDatas', res.data)
        },
        async pageQuery({ commit }, payload) {
            let res = await pageQuery(payload)
            commit('changeallDatas', res.data)
        },
        //保存或更新消息信息
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

        },
        //保存或更资讯分类信息
        async saveOrUpdate2({ dispatch }, payload) {
            let res = await saveOrUpdate2(payload.form);
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