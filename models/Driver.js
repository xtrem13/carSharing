/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Driver', {
    driverId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    licenceNum: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    drivingExperience: {
      type: DataTypes.INTEGER(2),
      allowNull: true
    },
    gender: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    tableName: 'Driver',
    timestamps:false
  });
};
