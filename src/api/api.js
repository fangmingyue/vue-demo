import axios from 'axios'
import router from '@/router'

// 添加攔截器
axios.interceptors.request.use(
  function (config) {
    // 發送之前
    return config
  },
  function (error) {
    // 請求錯誤
    return Promise.reject(error)
  },
)

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 響應之後
    return response
  },
  function (error) {
    // 響應錯誤
    return Promise.reject(error)
  },
)

// get 請求
function get_data(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, params)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// post 請求
function post_data(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export { get_data, post_data }
