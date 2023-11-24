import {register_path_router} from 'lib'
import {hono} from 'dep'

Deno.test('register_path_router', async () => {
  const res = await register_path_router(new hono.Hono(), import.meta)
})

export default () => {}
