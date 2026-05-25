import express from 'express'
import supabase from '../supabase.js'

const router = express.Router()

// GET närvaro per datum
router.get('/:date', async (req, res) => {
  const { date } = req.params

  const { data, error } = await supabase
    .from('attendance')
    .select('*, pupils(full_name, class)')
    .eq('date', date)

  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

// POST registrera närvaro
router.post('/', async (req, res) => {
  const { pupil_id, teacher_id, date, status, minutes_late } = req.body

  const { data, error } = await supabase
    .from('attendance')
    .upsert(
      { pupil_id, teacher_id, date, status, minutes_late: status === 'late' ? minutes_late : null },
      { onConflict: 'pupil_id,date' }
    )
    .select()
    .single()

  if (error) return res.status(500).json({ error: error.message })
  res.status(201).json(data)
})

// GET statistik per elev
router.get('/stats/all', async (req, res) => {
  const { data, error } = await supabase
    .from('attendance')
    .select('status, minutes_late, pupils(full_name, class)')

  if (error) return res.status(500).json({ error: error.message })

  const stats = {}
  for (const row of data) {
    const name = row.pupils.full_name
    if (!stats[name]) {
      stats[name] = { name, class: row.pupils.class, present: 0, absent: 0, late: 0, total: 0, total_minutes_late: 0 }
    }
    stats[name][row.status]++
    stats[name].total++
    if (row.status === 'late' && row.minutes_late) {
      stats[name].total_minutes_late += row.minutes_late
    }
  }

  res.json(Object.values(stats))
})

export default router