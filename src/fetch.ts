import isEmpty from './isEmpty.js'
import merge from './merge.js'

interface GlobalConfigs {
  prefix: string
  headers: Record<string, unknown>
  responseFields: {
    code: string
    data: string
    msg: string
  }
}

const globalConfigs: GlobalConfigs = {
  prefix: '/api',
  headers: {},
  responseFields: {
    code: 'code',
    data: 'data',
    msg: 'msg',
  },
}

export const ERROR_CODES = {
  USER_EXIST: 101,
  VERIFY_CODE_INVALID: 102,
  VERIFY_CODE_EXPIRED: 103,
  IDENTITY_PASSWORD_INVALID: 104,
  NO_SESSION: 105,
  OLD_PASSWORD_INVALID: 106,
  IDENTITY_INVALID: 107,
  EMAIL_INVALID: 108,
  PHONE_INVALID: 109,
  USERNAME_INVALID: 110,
  EMAIL_NOT_BOUND: 111,
  PHONE_NOT_BOUND: 112,
  SIGN_IN_LOCKED: 113,
  PERMISSION_INSUFFICIENT: 114,
  RESEND_VERIFY_CODE: 115,
  EMAIL_BOUND: 116,
  PHONE_BOUND: 117,
  REQUEST_TIMEOUT: 200,
  REQUEST_FAILED: 201,
  SERVER_NOT_STARTED: 202,
  SYSTEM_ERROR: 203,
  OBJECT_NOT_FOUND: 204,
  OBJECT_EXIST: 205,
  PARAM_ILLEGAL: 206,
  PARAM_EMPTY: 207,
  SIGNATURE_INVALID: 208,
  API_PRIVATE: 209,
  DATA_PARSE_FAILED: 210,
  OBJECT_TOO_LARGE: 211,
  REQUEST_LIMITED: 212,
  OBJECT_CREATE_FAILED: 213,
  OBJECT_READ_FAILED: 214,
  OBJECT_UPDATE_FAILED: 215,
  OBJECT_DELETE_FAILED: 216,
  REQUEST_HIGH_FREQUENCY: 217,
  ACCESS_DENIED: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  INTERVAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  HTTP_REQUEST_TIMEOUT: 504,
}

export const errorMessages = {
  [ERROR_CODES.USER_EXIST]: '该用户已存在',
  [ERROR_CODES.VERIFY_CODE_INVALID]: '验证码错误',
  [ERROR_CODES.VERIFY_CODE_EXPIRED]: '验证码已过期',
  [ERROR_CODES.IDENTITY_PASSWORD_INVALID]: '无效的用户或密码',
  [ERROR_CODES.NO_SESSION]: '用户未登录',
  [ERROR_CODES.OLD_PASSWORD_INVALID]: '原密码错误',
  [ERROR_CODES.IDENTITY_INVALID]: '无效的用户',
  [ERROR_CODES.EMAIL_INVALID]: '无效的邮箱地址',
  [ERROR_CODES.PHONE_INVALID]: '无效的手机号',
  [ERROR_CODES.USERNAME_INVALID]: '无效的用户名',
  [ERROR_CODES.EMAIL_NOT_BOUND]: '邮箱地址未绑定',
  [ERROR_CODES.PHONE_NOT_BOUND]: '手机号未绑定',
  [ERROR_CODES.SIGN_IN_LOCKED]: '用户登录失败次数过多，已被锁定',
  [ERROR_CODES.PERMISSION_INSUFFICIENT]: '用户权限不足',
  [ERROR_CODES.RESEND_VERIFY_CODE]: '验证失败次数过多，请重新发送验证码',
  [ERROR_CODES.EMAIL_BOUND]: '邮箱地址已绑定',
  [ERROR_CODES.PHONE_BOUND]: '手机号已绑定',
  [ERROR_CODES.REQUEST_TIMEOUT]: '请求超时',
  [ERROR_CODES.REQUEST_FAILED]: '请求发送失败',
  [ERROR_CODES.SERVER_NOT_STARTED]: '后台服务未启动',
  [ERROR_CODES.SYSTEM_ERROR]: '系统错误',
  [ERROR_CODES.OBJECT_NOT_FOUND]: '对象不存在',
  [ERROR_CODES.OBJECT_EXIST]: '对象已存在',
  [ERROR_CODES.PARAM_ILLEGAL]: '非法参数',
  [ERROR_CODES.PARAM_EMPTY]: '必选参数不能为空',
  [ERROR_CODES.SIGNATURE_INVALID]: '签名不匹配',
  [ERROR_CODES.API_PRIVATE]: '非开放API',
  [ERROR_CODES.DATA_PARSE_FAILED]: '数据解析失败',
  [ERROR_CODES.OBJECT_TOO_LARGE]: '要存储的对象超过了大小限制',
  [ERROR_CODES.REQUEST_LIMITED]: 'API请求次数超过限制',
  [ERROR_CODES.OBJECT_CREATE_FAILED]: '创建对象失败',
  [ERROR_CODES.OBJECT_READ_FAILED]: '查询对象失败',
  [ERROR_CODES.OBJECT_UPDATE_FAILED]: '更新对象失败',
  [ERROR_CODES.OBJECT_DELETE_FAILED]: '删除对象失败',
  [ERROR_CODES.REQUEST_HIGH_FREQUENCY]: '请求过于频繁',
  /* HTTP Status Code */
  [ERROR_CODES.ACCESS_DENIED]: '拒绝访问',
  [ERROR_CODES.NOT_FOUND]: 'API不存在',
  [ERROR_CODES.METHOD_NOT_ALLOWED]: '请求方法不允许',
  [ERROR_CODES.INTERVAL_SERVER_ERROR]: '内部服务器发生错误',
  [ERROR_CODES.BAD_GATEWAY]: '后台服务未启动',
  [ERROR_CODES.HTTP_REQUEST_TIMEOUT]: '请求超时，请重试',
  /* End HTTP Status Code */
}

function startRequest<T>(method: string, url: string, params?: Record<string, unknown> | FormData): Promise<T> {
  const options: RequestInit = {
    method,
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      ...globalConfigs.headers,
    },
  }

  if (params) {
    if (params instanceof FormData) {
      options.body = params
    } else {
      options.headers['Content-Type'] = 'application/json'
      options.body = JSON.stringify(params)
    }
  }

  const _url = (url.startsWith('/') || url.startsWith('http')) ? url : `${globalConfigs.prefix}/${url}`

  const request = new Request(_url, options)

  return new Promise((resolve, reject) => {
    globalThis
      .fetch(request)
      .then((response) => {
        if (![200, 201].includes(response.status)) {
          response.text().then((text) => {
            reject({
              status: response.status,
              method: request.method,
              msg: text,
            })
          })

          return
        }

        return response.json()
      })
      .then((body) => {
        if (body === undefined) return
        const responseCode = body[globalConfigs.responseFields.code]
        if (responseCode === undefined) {
          reject(body)
          return
        }

        if (responseCode !== 0) {
          reject({
            status: 200,
            [globalConfigs.responseFields.code]: responseCode,
            [globalConfigs.responseFields.msg]: errorMessages[responseCode] || body[globalConfigs.responseFields.msg] || 'Unknown Error',
          })
          return
        }

        resolve(body[globalConfigs.responseFields.data])
      })
  })
}

export default {
  setConfigs(options: GlobalConfigs) {
    merge((globalConfigs as unknown as Record<string, unknown>), (options as unknown as Record<string, unknown>))
  },
  setErrorMessages(codes: Record<string | number, string>) {
    for (const key in codes) {
      errorMessages[key] = codes[key]
    }
  },
  get<T>(url: string, params?: Record<string, unknown>) {
    if (params) {
      const query = Object.entries(params)
        .filter(([key, value]) => !isEmpty(value))
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
      url += `?${query}`
    }
    return startRequest<T>('get', url)
  },
  post<T>(url: string, params?: Record<string, unknown> | FormData) {
    return startRequest<T>('post', url, params)
  },
  put<T>(url: string, params?: Record<string, unknown> | FormData) {
    return startRequest<T>('put', url, params)
  },
  patch<T>(url: string, params?: Record<string, unknown> | FormData) {
    return startRequest<T>('patch', url, params)
  },
  delete<T>(url: string) {
    return startRequest<T>('delete', url)
  },
}
