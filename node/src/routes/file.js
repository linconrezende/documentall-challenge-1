
const express = require('express')
const router = express.Router()
const Render = require('../controllers/resultController')
const fileController = require('../controllers/fileController')

/* POST - Listar */
router.post('/list', (req, res, next) => {
  fileController._list(req.body).then(lst => {
    Render.Res(res, 200, 'Listed', lst)
  }).catch(error => {
    next(error)
  })
})
router.post('/create', (req, res, next) => {
  fileController._create(req.body).then(obj => {
    Render.Res(res, 200, 'Created', obj)
  }).catch(error => {
    next(error)
  })
})
router.put('/update', (req, res, next) => {
  fileController._update(req.body).then(obj => {
    Render.Res(res, 200, 'Updated', obj)
  }).catch(error => {
    next(error)
  })
})
router.delete('/delete', (req, res, next) => {
  fileController._delete(req.body).then(obj => {
    Render.Res(res, 200, 'Deleted', obj)
  }).catch(error => {
    next(error)
  })
})

module.exports = router