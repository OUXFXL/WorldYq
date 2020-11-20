import { get, post } from '@/http/axios'
//分页多条件获取疫情信息
export function pageQuery(params) {
    return get('/epidemic/pageQuery', params)
}
//保存或更新疫情信息
export function saveOrUpdate(params) {
    return post('/epidemic/saveOrUpdate', params)
}