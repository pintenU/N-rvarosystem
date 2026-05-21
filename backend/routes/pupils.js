import express from 'express'
import supabase from '../supabase.js'

const router = express.Router()

// GET alla elever
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('pupils')
    .select('*')
    .order('class')
    .order('full_name')

  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

// POST lägg till elev
router.post('/', async (req, res) => {
  const { full_name, class: className } = req.body

  const { data, error } = await supabase
    .from('pupils')
    .insert({ full_name, class: className })
    .select()
    .single()

  if (error) return res.status(500).json({ error: error.message })
  res.status(201).json(data)
})

// DELETE ta bort elev
router.delete('/:id', async (req, res) => {
  const { id } = req.params

  const { error } = await supabase
    .from('pupils')
    .delete()
    .eq('id', id)

  if (error) return res.status(500).json({ error: error.message })
  res.json({ message: 'Elev borttagen' })
})

export default router