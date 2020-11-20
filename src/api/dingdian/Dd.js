import { get, post } from '@/http/axios'
//分页多条件获定点医院信息
export function pageQuery(params) {
    return get('/hospital/pageQuery', params)
}
//保存或更新定点医院信息
export function saveOrUpdate(params) {
    return post('/hospital/saveOrUpdate', params)
}
//删除定点医院信息
export function deleteById(params) {
    return get('/hospital/deleteById', params)
}