/** 返回给前端的数据格式 */
export interface ResponseFE<T> {
  code: number
  data: T
  message: string
}
