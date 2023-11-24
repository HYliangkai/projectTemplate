import {hono} from 'dep'

export default (app: hono.Hono) => {
  app.get('/', ({text}) => {
    return text('1221')
  })
}
