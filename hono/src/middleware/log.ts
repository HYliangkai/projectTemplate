import {relative_to_absolute} from 'lib'
import {Def, match} from '@dep/fpsystem.ts'
import dayjs from '@dep/day.ts'

/** @log日志中间件 */
export const log = (
  option: {
    col: boolean
    write: boolean
    sync: boolean
  } = {col: true, write: true, sync: true}
) =>
  match(
    option,
    [
      ({col, write, sync}) => col && write && sync,
      (val: string) => {
        if (val.includes('OPTIONS')) return void 0
        console.log(
          val.includes('<--') ? '🔥' : '🧊',
          val.replace('<--', '').replace('-->', '').trim()
        )
        const nowtime = dayjs().format('YYYY_MM_DD')
        Deno.writeTextFileSync(
          relative_to_absolute(`../../logs/${nowtime}.log`, import.meta),
          val + '\n',
          {append: true, create: true}
        )
        return void 0
      },
    ],
    [
      ({col, write, sync}) => !col && write && sync,
      (val: string) => {
        if (val.includes('OPTIONS')) return void 0
        const nowtime = dayjs().format('YYYY_MM_DD')
        Deno.writeTextFileSync(
          relative_to_absolute(`../../logs/${nowtime}.log`, import.meta),
          val + '\n',
          {append: true, create: true}
        )
        return void 0
      },
    ],
    [
      ({col, write, sync}) => !col && write && !sync,
      (val: string) => {
        if (val.includes('OPTIONS')) return void 0
        const nowtime = dayjs().format('YYYY_MM_DD')
        Deno.writeTextFile(
          relative_to_absolute(`../../logs/${nowtime}.log`, import.meta),
          val + '\n',
          {
            append: true,
            create: true,
          }
        )
        return void 0
      },
    ],
    [
      ({col, write}) => col && !write,
      (val: string) => {
        if (val.includes('OPTIONS')) return void 0
        console.log(
          val.includes('<--') ? '🔥' : '🧊',
          val.replace('<--', '').replace('-->', '').trim()
        )
        return void 0
      },
    ],
    [Def, () => void 0]
  )
