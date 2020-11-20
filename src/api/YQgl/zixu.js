import { get, post } from '@/http/axios'
//分页多条件获取新闻资讯信息
export function pageQuery(params) {
    return get('/article/pageQuery', params)
}
//保存或更新消息信息
export function saveOrUpdate(params) {
    return post('/article/saveOrUpdate', params)
}
//查询所有资讯分类
export function findAll(params) {
    return get('/category/findAll', params)
}
//通过id删除
export function deleteById(params) {
    return get('/article/deleteById', params)
}
//保存或更新资讯分类
export function saveOrUpdate2(params) {
    return post('/category/saveOrUpdate', params)
}
//通过id删除资讯分类
export function deleteById2(params) {
    return get('/category/deleteById', params)
}