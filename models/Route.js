/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Route', {
    routeId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true
    },
    routeName: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    from_long: {
      type: DataTypes.FLOAT(0),
      allowNull: true
    },
    to_alt: {
      type: DataTypes.FLOAT(0),
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
      allowNull: true,
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
      type: DataTypes.FLOAT(0),
      allowNull: true
    },
    to_long: {
      type: DataTypes.FLOAT(64),
      allowNull: true
    }
  }, {
    tableName: 'Route',
    timestamps:false
  });
};
