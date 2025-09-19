import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import { createClient } from 'redis'
import { orders } from './lib/orders'
 
const port = parseInt(process.env.PORT || '4000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
 
app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true)
    handle(req, res, parsedUrl)
  }).listen(port)
 
  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`
  )
})

Promise.all([
  createClient(),
  createClient(),
]).then(
  ([client, subscriber]) => {
    subscriber.pSubscribe('orders:*', (message,channel) => {
      switch(channel) {
        case 'orders:list': {
          client.publish('orders:list>', JSON.stringify(orders));
          return;
        }
      }
    })
  }
)

