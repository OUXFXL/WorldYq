import { get, post } from '@/http/axios'
//根据用户名角色名分页查询用户信息
export function pageQuery(params) {
    return get('/baseUser/pageQuery', params)
}
//保存或更新
export function saveOrUpdate(params) {
    return post('/baseUser/saveOrUpdate', params)
}
//通过id删除
export function deleteById(params) {
    return get('/baseUser/deleteById', params)
}