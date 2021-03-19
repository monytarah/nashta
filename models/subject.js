'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Subject.belongsTo(models.Student, { foreignKey: 'student_id', targetKey: 'id'})
      Subject.belongsToMany(models.Student, {
        through: models.Score,
        foreignKey: 'subject_id'
      })
    }
  };
  Subject.init({
    subject_name: DataTypes.STRING,
    student_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Subject',
  });
  return Subject;
};