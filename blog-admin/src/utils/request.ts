// 进行axios二次封装：使用请求与相应拦截器
import axios from 'axios'
import { ElMessage } from 'element-plus'
// 第一步：利用axios对象的create方法，去创建axios实例(其他的配置：基础路径、超过请求时间)
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})
// 第二步：request实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
  // config配置对象，headers属性请求头，经常给服务器端携带公共参数
  // 返回配置对象
  return config
})
// 第三步：相应拦截器
request.interceptors.response.use(
  (response) => {
    // 成功回调
    return response
  },
  (err) => {
    // 失败的回调：处理http网络错误
    // 定义一个变量：存储网络错误信息
    let message = ''
    // http状态码
    let status = err.response.status
    switch (status) {
      case 401:
        message = 'TOKEN过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '网络错误'
        break
    }
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(err)
  },
)
export default {}
