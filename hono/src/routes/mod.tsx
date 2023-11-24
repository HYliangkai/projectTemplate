
/** @jsx jsx */
/** @jsxFrag Fragment */
import { log ,response_make} from '@/middleware/mod.ts'
import { register_path_router } from 'lib'
import { middle,Hono} from '@dep/hono.ts'
const { jsx, Fragment, logger, cors  } = middle
const log_handle=log()

export default async (app: Hono) => {
  /** @middle_register must return MiddlewareHandler */
  app.use('*', response_make(), logger(log_handle),cors())
  
  app.get('/', ctx => ctx.text('🚀 Hello Hono 🔥'))
  
  ; (await register_path_router(app, import.meta)).unwarp()

  /** 批量注册router */
}
