/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Route', {
    from_long: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    to_alt: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    days: {
      type: DataTypes.STRING(13),
      allowNull: true
    },
    driverId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Car',
        key: 'driverId'
      }
    },
    groupId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'DriverGroup',
        key: 'groupId'
      }
    },
    start_time: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    carNumber: {
      type: DataTypes.STRING(8),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Car',
        key: 'carNumber'
      }
    },
    ModelId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Car',
        key: 'ModelId'
      }
    },
    from_alt: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    to_long: {
      type: DataTypes.STRING(64),
      allowNull: true
    }
  }, {
    tableName: 'Route'
  });
};
