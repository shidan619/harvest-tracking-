import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import harvestRoutes from './routes/harvest.routes'
import newsRoutes from './routes/news.routes'
import demandRoutes from './routes/demand.routes'
import devBundle  from "./devBundle"
import  path from 'path'
const app = express()
//devBundle
devBundle.compile(app)
// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
// secure apps by setting various HTTP headers
app.use(helmet())
// enable CORS - Cross Origin Resource Sharing
app.use(cors())

//serve static files
const CURRENT_WORKING_DIR = process.cwd();
app.use('/dist',express.static(path.join(CURRENT_WORKING_DIR,'dist')))
app.get('/', (req, res) => {
  res.status(200).send(Template())
})

// mount routes
app.use('/', userRoutes)
app.use('/', authRoutes)
app.use('/',harvestRoutes)
app.use('/api/news/',newsRoutes)
app.use('/api/demand',demandRoutes)
// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({"error" : err.name + ": " + err.message})
  }
})

export default app
