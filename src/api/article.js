import request from '@/utils/request'

const getArticleList = (params) => {
  return request({
    url: 'article',
    method: 'get',
    params
  })
}
const addArticle = (data) => {
  return request({
    url: `article`,
    method: 'post',
    data
  })
}
const editArticle = (id, data) => {
  return request({
    url: `article/${id}`,
    method: 'put',
    data
  })
}

const deleteArticle = (id) => {
  return request({
    url: `article/${id}`,
    method: 'delete'
  })
}

const getCategoryList = (params) => {
  return request({
    url: 'category',
    method: 'get',
    params
  })
}
const addCategory = (data) => {
  return request({
    url: 'category',
    method: 'post',
    data
  })
}

const editCategory = (id, data) => {
  return request({
    url: `category/${id}`,
    method: 'put',
    data
  })
}
const deleteCategory = (id) => {
  return request({
    url: `category/${id}`,
    method: 'delete'
  })
}

const getSeriesList = (params) => {
  return request({
    url: 'series',
    method: 'get',
    params
  })
}
const addSeries = (data) => {
  return request({
    url: 'series',
    method: 'post',
    data
  })
}

const editSeries = (id, data) => {
  return request({
    url: `series/${id}`,
    method: 'put',
    data
  })
}
const deleteSeries = (id) => {
  return request({
    url: `series/${id}`,
    method: 'delete'
  })
}

const getTagList = (params) => {
  return request({
    url: 'tag',
    method: 'get',
    params
  })
}
const addTag = (data) => {
  return request({
    url: 'tag',
    method: 'post',
    data
  })
}

const editTag = (id, data) => {
  return request({
    url: `tag/${id}`,
    method: 'put',
    data
  })
}
const deleteTag = (id) => {
  return request({
    url: `tag/${id}`,
    method: 'delete'
  })
}
const Api = {
  getArticleList,
  addArticle,
  editArticle,
  deleteArticle,
  getCategoryList,
  addCategory,
  editCategory,
  deleteCategory,
  getSeriesList,
  addSeries,
  editSeries,
  deleteSeries,
  getTagList,
  addTag,
  editTag,
  deleteTag
}

export default Api

