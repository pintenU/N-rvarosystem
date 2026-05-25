import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

import pupilsRouter from './routes/pupils.js'
import teachersRouter from './routes/teachers.js'
import attendanceRouter from './routes/attendance.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cors())
app.use(express.json())

// // Servera frontend-mappen som statiska filer
// app.use(express.static(path.join(__dirname, '../frontend')))

app.use(express.static(path.join(__dirname, '../')))
app.use(express.static(path.join(__dirname, '../frontend')))

// Rooten pekar på index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'))
})

// API Routes
app.use('/api/pupils', pupilsRouter)
app.use('/api/teachers', teachersRouter)
app.use('/api/attendance', attendanceRouter)

app.listen(PORT, () => {
  console.log(`Server körs på http://localhost:${PORT}`)
})