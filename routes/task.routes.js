const { Router } = require('express')
const config = require('config')
const shortid = require('shortid')
const Task = require('../models/Task')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', auth, async (req, res) => {
  try {
    const { from } = req.body
    const task = new Task({
      from, owner: req.user.userId
    })

    await task.save()

    res.status(201).json({ task })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user.userId })
    res.json(tasks)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    res.json(task)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.delete('/delete_task', auth, async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.body.id)
    res.status(200).json({ message: 'OK' })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.put('/complete', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.body.id)
    task.completed = !task.completed
    await task.save()
    res.status(201).json({ message: 'OK' })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }

})

module.exports = router
