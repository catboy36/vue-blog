// 统一管理用户相关的接口
import request from '@/utils/request'
// 统一管理接口
enum API {
  LOGIN_URL = '/login',
}
// 暴露请求函数
// 登录接口方法
export const reqLogin = (data: any) => request.post(API.LOGIN_URL, data)
