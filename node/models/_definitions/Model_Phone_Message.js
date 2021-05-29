
const SEQL = require('sequelize')
module.exports = {
  id: { type: SEQL.INTEGER(11), allowNull: false, autoIncrement: true, primaryKey: true },
  file_id: { type: SEQL.INTEGER(11), references: { model: 'files', key: 'id', }, onUpdate: 'CASCADE', onDelete: 'SET NULL' },
  phone: SEQL.STRING(11),
  message: SEQL.STRING(160),
  valid: SEQL.BOOLEAN,
  createdAt: { type: SEQL.DATE, field: 'created_at' },
  updatedAt: { type: SEQL.DATE, field: 'updated_at' }
}