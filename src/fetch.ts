interface ResponseFields {
  code: string
  data: string
  msg: string
}

let prefix = '/api'
const headers = {}
const errorCodes = {
  101: '该用户已存在',
  102: '验证码错误',
  103: '验证码已过期',
  104: '用户名或密码错误',
  105: '用户未登录',
  106: '用户已登录，请刷新页面',
  107: '原密码错误',
  108: '无效的邮箱地址',
  109: '无效的手机号',
  110: '无效的用户名',
  111: '邮箱地址未绑定',
  112: '手机号未绑定',
  113: '用户登录失败次数大于4次，已被锁定，请1小时后再试',
  114: '用户权限不足',
  115: '验证失败次数过多，请重新发送验证码',
  116: '邮箱地址已绑定',
  117: '手机号已绑定',
  200: '请求超时',
  201: '请求发送失败',
  202: '后台服务未启动',
  203: '系统错误',
  204: '对象不存在',
  205: '对象已存在',
  206: '非法参数',
  207: '必选参数不能为空',
  208: '签名不匹配',
  209: '非开放API',
  210: '数据解析失败',
  211: '要存储的对象超过了大小限制',
  212: 'API请求次数超过限制',
  213: '创建对象失败',
  214: '查询对象失败',
  215: '更新对象失败',
  216: '删除对象失败',
  217: '请求过于频繁',
  /* HTTP Status Code */
  403: '拒绝访问',
  404: 'API不存在',
  405: '请求方法不允许',
  500: '内部服务器发生错误',
  502: '后台服务未启动',
  504: '请求超时，请重试'
  /* End HTTP Status Code */
}
const responseFields: ResponseFields = {
  code: 'code',
  data: 'data',
  msg: 'msg'
}

function startRequest (method: string, url: string, params?: Record<string, unknown> | FormData) {
  const options: RequestInit = {
    method,
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      ...headers
    }
  }

  if (params instanceof FormData) {
    options.body = params
  } else {
    options.headers['Content-Type'] = 'application/json'
    options.body = JSON.stringify(params)
  }

  const _url = url.startsWith('/') || url.startsWith('http') ? url : `${prefix}/${url}`

  const request = new Request(_url, options)

  return new Promise((resolve, reject) => {
    globalThis.fetch(request).then(response => response.json()).then(body => {
      const responseCode = body[responseFields.code]
      if (responseCode === undefined) {
        reject(body)
        return
      }

      if (responseCode !== 0) {
        reject({
          status: 200,
          [responseFields.code]: responseCode,
          [responseFields.msg]: errorCodes[responseCode] || body[responseFields.msg] || 'Unknown Error'
        })
        return
      }

      resolve(body[responseFields.data])
    })
  })
}

export default {
  prefix (_prefix: string) {
    prefix = _prefix
  },
  setHeader (key: string, value: unknown) {
    headers[key] = value
  },
  setErrorCodes (codes: Record<string| number, string>) {
    for (const key in codes) {
      errorCodes[key] = codes[key]
    }
  },
  setResponseFields (config: ResponseFields) {
    for (const key in config) {
      if (config[key]) responseFields[key] = config[key]
    }
  },
  get (url: string) {
    return startRequest('get', url)
  },
  post (url: string, params: Record<string, unknown> | FormData) {
    return startRequest('post', url, params)
  },
  put (url: string, params: Record<string, unknown> | FormData) {
    return startRequest('put', url, params)
  },
  patch (url: string, params: Record<string, unknown> | FormData) {
    return startRequest('patch', url, params)
  },
  delete (url: string) {
    return startRequest('delete', url)
  }
}
