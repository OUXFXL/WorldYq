import { post } from '@/http/axios'
//保存或更新疫情信息
export function saveOrUpdate(params) {
    return post('/epidemic/saveOrUpdate', params)
}