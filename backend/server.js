import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import pupilsRouter from './routes/pupils.js'
import teachersRouter from './routes/teachers.js'
import attendanceRouter from './routes/attendance.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/pupils', pupilsRouter)
app.use('/api/teachers', teachersRouter)
app.use('/api/attendance', attendanceRouter)

app.listen(PORT, () => {
  console.log(`Server körs på http://localhost:${PORT}`)
})