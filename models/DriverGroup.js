/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DriverGroup', {
    groupId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true
    },
    common_start_longtitude: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    common_start_altitude: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    roadLength: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    days: {
      type: DataTypes.STRING(13),
      allowNull: true
    },
    common_finish_longtitude: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    common_finish_altitude: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    common_start_time: {
      type: DataTypes.STRING(5),
      allowNull: true
    }
  }, {
    tableName: 'DriverGroup',
    timestamps:false
  });
};
