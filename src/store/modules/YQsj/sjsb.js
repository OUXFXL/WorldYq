import { saveOrUpdate } from '@/api/YQsj/sjsb'
import { Notification } from 'element-ui';
export default {
    namespaced: true,
    state: {},
    getters: {

    },
    mutations: {},
    actions: {
        //保存或更新数据
        async saveOrUpdate() {
            let res = await saveOrUpdate();
            if (res.status === 200) {
                Notification({
                    type: 'success',
                    title: '成功',
                    message: '保存成功'
                })
                // dispatch('saveOrUpdate');

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