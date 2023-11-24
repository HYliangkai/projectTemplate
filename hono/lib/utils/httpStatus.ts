/** 从AnyError继承,表示HTTP的错误码 */

import {AnyError} from '@dep/fpsystem.ts'

export class HTTPError extends AnyError {
  public code: number
  public message: string
  public data: any
  constructor(code: number, message: string, data: any) {
    super('Error', 'htttp error', 'HTTP')
    this.code = code
    this.message = message
    this.data = data
  }

  take() {
    return {
      code: this.code,
      data: this.data,
      message: this.message,
    }
  }
}

/** 客户端请求的语法错误，服务器无法理解 */
export const BadRequest = new HTTPError(400, '客户端错误', null)
/** 客户端必须对自身进行身份验证才能获得请求的响应 */
export const Unauthorized = new HTTPError(401, '未授权', null)
/** 服务器知道客户端的身份,但是未经授权 */
export const Forbidden = new HTTPError(403, '权限不足,禁止访问', null)
/** 服务器找不到请求的资源 */
export const NotFound = new HTTPError(404, '404 Not Found', null)
/** 服务器知道请求方法，但目标资源不支持该方法。例如，API 可能不允许调用DELETE来删除资源。 */
export const MethodNotAllowed = new HTTPError(405, '不支持的方法', null)
/** 我是个茶壶 */
export const ImATeapot = new HTTPError(418, '我是个茶壶', null)
/** 请求格式正确，但由于语义错误而无法遵循。 */
export const NoParams = new HTTPError(422, '参数错误', null)
/** 服务器遇到了不知道如何处理的情况 */
export const InternalServerError = new HTTPError(500, '服务器内部错误', null)
/** 服务器不支持请求的功能 */
export const NotImplemented = new HTTPError(501, '服务器不支持请求的功能', null)
/** 服务器无法完成请求 */
export const BadGateway = new HTTPError(502, '服务器无法完成请求', null)
/** 服务器暂时不可用 */
export const ServiceUnavailable = new HTTPError(503, '服务器暂时不可用', null)
