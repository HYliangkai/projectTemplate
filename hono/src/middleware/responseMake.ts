/** 统一前端JSON返回形式 */
import {Def, match, match_error} from '@dep/fpsystem.ts'
import {HTTPError, InternalServerError, ResponseFE} from 'lib'
import {MiddlewareHandler} from '@dep/hono.ts'

export const response_make = (): MiddlewareHandler => {
  return async (ctx, next) => {
    try {
      await next()
      const content_type = ctx.res.headers.get('Content-Type')
      if (content_type?.startsWith('application/json') || content_type?.startsWith('text/plain')) {
        ctx.res = ctx.json<ResponseFE<JSON>>({
          code: 200,
          message: 'ok',
          data: await (content_type?.startsWith('application/json')
            ? ctx.res.json()
            : ctx.res.text()),
        })
      }
    } catch (err) {
      return match_error(err).handle_throw(err =>
        match(
          err.type,
          ['Panic', err.throw],
          [
            Def,
            () => {
              err instanceof HTTPError ? null : err.log()
              return ctx.json<ResponseFE<JSON>>(
                err instanceof HTTPError ? err.take() : InternalServerError.take()
              )
            },
          ]
        )()
      )
    }
  }
}
