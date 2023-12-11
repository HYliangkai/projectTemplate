
/** @jsx jsx */
/** @jsxFrag Fragment */

import { FC } from '@hono/jsx/index.ts'
import { middle ,Hono} from '@dep/hono.ts'
const { jsx, Fragment, } = middle

const LayOut: FC = (props) => {
  return (
    <html>
    <body>{props.children}</body>
    </html>
  )
}

const Top: FC<{ messages: string[] }> = (props: { messages: string[] }) => {
  return (
    <LayOut>
      <h1>Hello Chzky!</h1>
      <ul>
        {props.messages.map((message) => {
          return <li>{message}!!</li>
        })}
      </ul>
    </LayOut>
  )
}





export default (app: Hono) => {
  app.get('/', (ctx) => 
    ctx.html(<Top messages={ ['Good Morning', 'Good Evening', 'Good Night']} />)
  )
}