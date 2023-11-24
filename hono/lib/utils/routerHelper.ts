import {call_file_name, relative_to_absolute} from 'lib'
import {AnyErr, AnyResult, Def, Ok, match, option} from '@dep/fpsystem.ts'
import {path} from '@dep/std.ts'
import {Hono} from '@dep/hono.ts'

const judge_file_name = (name: string): AnyResult<void> => {
  const suffix = option(name.split('.')?.at(-1))
  if (suffix.is_none) return AnyErr('Warn', '路由文件夹包含非相关文件: ' + name, 'RouteWarn')
  return match(
    suffix.unwarp(),
    ['ts', Ok()],
    ['tsx', Ok()],
    ['js', Ok()],
    ['jsx', Ok()],
    [Def, AnyErr('Warn', '路由文件夹包含非相关文件: ' + name, 'RouteWarn')]
  )
}

/** 自动注册子路由,路由项目地址即路由节点名称 */
export const register_path_router = async (
  router: Hono,
  meta: ImportMeta
): Promise<AnyResult<void, 'Warn'>> => {
  const call_name = call_file_name(meta)
  if (!call_name.includes('mod'))
    return AnyErr('Error', '请在mod文件调用register_path_router', 'RouteError')
  /** 注册规则: 1.直接的文件 2.文件夹下的mod.ts */
  const abs_path = relative_to_absolute('./', meta)
  const dir = Deno.readDirSync(abs_path)
  for await (const list of dir) {
    if (call_name == list.name) continue
    if (list.isFile) {
      const jn = judge_file_name(list.name)
      if (jn.is_err) return jn
      /** 注册file路由 */
      const fn: {default: Function | undefined} = await import(path.join(abs_path, list.name))
      if (typeof fn.default != 'function')
        return AnyErr('Warn', '路由模块导出错误: ' + list.name, 'RouteWarn')
      const route = new Hono()
      fn.default.call(route, route)
      router.route('/' + list.name.split('.').slice(0, -1).join('.'), route)
    } else if (list.isDirectory) {
      /** 注册文件夹路由 */
      console.log(path.join(abs_path, list.name))
      const child_dir = Deno.readDirSync(path.join(abs_path, list.name))
      let flag = true
      for await (const child_list of child_dir) {
        if (child_list.isFile && (child_list.name == 'mod.ts' || child_list.name == 'mod.tsx')) {
          const fn: {default: Function | undefined} = await import(
            path.join(abs_path, list.name, child_list.name)
          )
          if (typeof fn.default != 'function')
            return AnyErr('Warn', '路由模块导出错误: ' + list.name, 'RouteWarn')
          const route = new Hono()
          router.route('/' + list.name, route)
          flag = false
          break
        }
      }
      if (flag) return AnyErr('Warn', '子目录未包含mod文件: ' + list.name, 'RouteWarn')
    } else {
      return AnyErr('Warn', '路由包含多余文件: ' + list.name, 'RouteWarn')
    }
  }
  return Ok()
}

/** 批量注册Restful接口 */
