
const SEQL = require('sequelize')
module.exports = {
  id: { type: SEQL.INTEGER(11), allowNull: false, autoIncrement: true, primaryKey: true },
  name: SEQL.STRING,
  createdAt: { type: SEQL.DATE, field: 'created_at' },
  updatedAt: { type: SEQL.DATE, field: 'updated_at' }
}