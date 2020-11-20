import { get, post } from '@/http/axios'
//查询角色所有权限
export function PrivilegeFindAll(params) {
    return get('/role/cascadePrivilegeFindAll', params)
}
//查询所有权限
export function findAll(params) {
    return get('/privilege/findAll', params)
}
//保存或更新
export function saveOrUpdate(params) {
    return post('/privilege/saveOrUpdate', params)
}
//根据id删除权限
export function deleteById(params) {
    return delete ('/privilege/deleteById', params)
}
