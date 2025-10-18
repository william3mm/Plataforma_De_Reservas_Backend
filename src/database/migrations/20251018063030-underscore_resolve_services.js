"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      "services",
      "prestador_id",
      "prestadorId"
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      "services",
      "prestadorId",
      "prestador_id"
    );
  },
};
