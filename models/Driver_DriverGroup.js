/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Driver_DriverGroup', {
    driverId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Driver',
        key: 'driverId'
      }
    },
    groupId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'DriverGroup',
        key: 'groupId'
      }
    }
  }, {
    tableName: 'Driver_DriverGroup'
  });
};
