const ScoreController = require('../controllers/scoreController')
const StudentController = require('../controllers/studentController')

const router = require('express').Router()

router.post('/score', ScoreController.addScore)
router.put('/score/:id', ScoreController.editScore)
router.delete('/score/:id', ScoreController.deleteScore)
router.get('/score/average', ScoreController.averageScore)

router.get('/students', StudentController.getAllStudents)
// router.post('/students', StudentController.addStudents)

module.exports = router