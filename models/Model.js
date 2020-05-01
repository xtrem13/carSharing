/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Model', {
    ModelId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true
    },
    petrolConsumption: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    manufacturer: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    engineVolume: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: true
    }
  }, {
    tableName: 'Model'
  });
};
