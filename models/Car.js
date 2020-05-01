/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Car', {
    carNumber: {
      type: DataTypes.STRING(8),
      allowNull: false,
      primaryKey: true
    },
    driverId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Driver',
        key: 'driverId'
      }
    },
    ModelId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Model',
        key: 'ModelId'
      }
    },
    year_of_production: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    color: {
      type: DataTypes.STRING(30),
      allowNull: true
    }
  }, {
    tableName: 'Car'
  });
};
