import express from 'express'
import supabase from '../supabase.js'

const router = express.Router()

// GET alla lärare
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('teachers')
    .select('*')
    .order('full_name')

  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

export default router