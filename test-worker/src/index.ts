import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { createRepo, getAllRepo, getdemoIssues, subscribeRepo, unsubscribeRepo } from './repo'
import { getLatestNotification, getNotification } from './notification'
import { login, signup } from './auth'
import { cronJob } from './cron'
import type { ScheduledEvent, ExecutionContext } from '@cloudflare/workers-types'
import { cors } from 'hono/cors'

export type Env = {
  Bindings: {
    DATABASE_URL: string;
    GITHUB_TOKEN: string;
  };
};


const app = new Hono<Env>()

app.use(logger())

// CORS middleware - moved before routes and with better configuration
app.use(
  '*',
  cors({
    origin: '*',
    allowHeaders: ['Content-Type', 'content-type'],
    allowMethods: ['GET', 'POST', 'OPTIONS'],
  })
);

// Routes
app.get("/", (c) => {
    return c.text("welcome to github notifier")
})

// Remove the manual OPTIONS handler since CORS middleware handles it
// app.options('/repos', (c) => {
//   return c.text('OK')
// })

app.post('/login', login)
app.post('/signup', signup)
app.post('/repo/create', createRepo)
app.post('/repos', getAllRepo)

app.post('/repo/subscribe', subscribeRepo)
app.post('/repo/unsubscribe', unsubscribeRepo)

// testing 
app.post('/getIssues', getdemoIssues)

app.post('/user/notification', getNotification)
app.post('/user/notification/new', getLatestNotification)

export default {
  fetch: app.fetch,
  async scheduled(event: ScheduledEvent, env: any, ctx: ExecutionContext) {
    console.log("Cron job triggered")
    await cronJob(env)
  },
}