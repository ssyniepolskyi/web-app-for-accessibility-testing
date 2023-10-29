const {Router} = require('express')
const Task = require('../models/Task')
const router = Router()


router.post('/complete', async (req, res) => {
  try {

    const task = await Task.findOne({ _id: req.params._id })

    if (task) {
      task.completed = !(task.completed)
      await task.save()
      return res.redirect('/tasks')
    }

    res.status(404).json('Ссылка не найдена')

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})


module.exports = router
