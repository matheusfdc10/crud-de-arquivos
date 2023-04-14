import * as express from 'express'
import * as fileUpload from 'express-fileupload'
import * as cors from 'cors'
import * as logger from 'morgan'

import { uploadRouter } from './routes/upload'
import { downloadRouter } from './routes/download'
import { getFileRouter } from './routes/getFile'
import { deleteFile } from './routes/deleteFile'
import { updateFileRouter } from './routes/updateFile'
import { teste } from './routes/teste'

export const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(fileUpload())

app.use('/upload', uploadRouter)
app.use('/download', downloadRouter)
app.use('/getfile', getFileRouter)
app.use('/deletefile', deleteFile)
app.use('/updatefile', updateFileRouter)

app.disable('etag')
app.use('/teste', teste)