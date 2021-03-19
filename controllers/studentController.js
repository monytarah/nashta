const { Student, Subject, Score } = require('../models')

class StudentController {
  static getAllStudents (req, res, next) {
    Score.findAll({
      include: [ Student, Subject ]
    })
      .then(data => {
        let output = []
        if (data.length > 0) {
          for (let i = 0 ; i < data.length; i++) {
            output.push({
              student_id: data[i].student_id,
              name: data[i].Student.name, 
              subject_name: data[i].Subject.subject_name,
              score: data[i].score
            })
          }
        }
        res.status(200).json(output)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Internal Server Error' })
      })
  }

  static addStudents (req, res, next) {
    
  }
}

module.exports = StudentController