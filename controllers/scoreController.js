const { Score, Student } = require('../models')

class ScoreController {
  static addScore (req, res, next) {
    const input = {
      student_id: +req.body.student_id,
      subject_id: +req.body.subject_id,
      score: +req.body.score,
      notes: req.body.notes
    }
    Score.create(input)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Internal Server Error' })
      })
  }

  static editScore (req, res, next) {
    let id = +req.params.id
    const input = {
      student_id: +req.body.student_id,
      subject_id: +req.body.subject_id,
      score: +req.body.score,
      notes: req.body.notes
    }
    Score.update(input, { 
      where: { id }, 
      returning: true
    })
      .then(data => {
        res.status(200).json(data[1])
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Internal Server Error' })
      })
  }

  static deleteScore (req, res, next) {
    let id = req.params.id
    Score.destroy({
      where: { id } 
    })
      .then(result => {
        if (result == '0') {
          res.status(404).json({ message: 'Data Not Found'})
        } else {
          res.status(200).json({ message: 'Score has been deleted'})
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'Internal Server Error' })
      })
  }

  static averageScore (req, res, next) {
    Score.findAll()
      .then(data => {
        // res.send(data)
        // console.log(data.length)
        if (data.length == 0) {
          return res.status(200).json(data)
        }
        let newData = []
        for (let i = 0; i < data.length; i++) {
          if (newData.length > 0) {
            let same = false
            for (let j = 0; j < newData.length; j++) {
              if (newData[j].student_id === data[i].student_id) {
                same = true
                newData[j]['total_score'] += data[i].score
                newData[j]['total_subject'] += 1
              } 
            }
            if (same == false) {
              newData.push({
                'student_id': data[i].student_id,
                'total_score': data[i].score,
                'total_subject': 1
              })
            }
          } else {
            newData.push({
              'student_id': data[i].student_id,
              'total_score': data[i].score,
              'total_subject': 1
            })
          }
        }

        let output = []
        for (let i = 0; i < newData.length; i++) {
          output.push({
            student_id: newData[i].student_id,
            average_score: newData[i].total_score / newData[i].total_subject
          })
        }

        res.status(200).json(output)

      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Internal Server Error' })
      })
  }
}

module.exports = ScoreController