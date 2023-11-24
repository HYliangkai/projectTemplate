import {Def, match, match_error} from '@dep/fpsystem.ts'
import {colors, dotenv} from '@dep/std.ts'
import {Hono} from '@dep/hono.ts'
import run from '@/routes/mod.tsx'

const app = new Hono()
try {
  run(app)
  await dotenv.load({export: true})
  Deno.serve({port: Number(Deno.env.get('SERVER_PORT') || 7890)}, app.fetch)
} catch (err) {
  match_error(err).handle(
    err => {
      match(
        err.type,
        [
          'Panic',
          () => {
            console.log(colors.bgRed('不可恢复错误!'))
            err.log()
            console.log(colors.bgRed('程序已退出!'))
            Deno.exit()
          },
        ],
        [Def, err.log]
      )()
    },
    err => {
      console.log(colors.bgRed('未知错误:'))
      console.error(err)
    }
  )
}
