import {Err, Ok, Option, option, Result} from '@dep/fpsystem.ts'
import {path} from '@dep/std.ts'
type Path = {__dirname: Option<string>; __filename: Option<string>}
const pat = (path: string): Result<Path, string> => {
  const url = new URL(path)
  if (url.protocol === 'file:') {
    return Ok({
      __dirname: option(url.pathname.split('/').slice(0, -1).join('/')),
      __filename: option(url.pathname.split('/').at(-1)),
    })
  } else {
    return Err('No Local documents')
  }
}

/** 将文件位置的相对路径转为绝对路径 */
export const relative_to_absolute = (relative: string, meta: ImportMeta) => {
  const {__dirname} = pat(meta.url).unwarp()
  const dirname = __dirname.unwarp()
  return path.join(dirname, relative)
}

/** 获取调用文件的文件名 */
export const call_file_name = (meta: ImportMeta) =>
  path.parse(meta.url).name + path.parse(meta.url).ext
