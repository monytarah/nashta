'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Score extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Score.belongsTo(models.Student, { foreignKey: 'student_id' })
      Score.belongsTo(models.Subject, { foreignKey: 'subject_id' })
    }
  };
  Score.init({
    student_id: DataTypes.INTEGER,
    subject_id: DataTypes.INTEGER,
    score: DataTypes.FLOAT,
    notes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Score',
  });
  return Score;
};