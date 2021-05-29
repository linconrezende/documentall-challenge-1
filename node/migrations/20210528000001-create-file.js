'use strict';

module.exports = {
  up: async (queryInterface, SEQL) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('files', require('./../models/_definitions/Model_File'), { transaction })
      await queryInterface.createTable('phone_messages', require('./../models/_definitions/Model_Phone_Message'), { transaction })
      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },
  down: async (queryInterface, SEQL) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // Drop in the opposit order
      await queryInterface.dropTable('phone_messages', { transaction })
      await queryInterface.dropTable('files', { transaction })
      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  }
};
