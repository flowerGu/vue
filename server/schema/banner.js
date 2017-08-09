/* jshint indent: 2 */

export default function (sequelize, DataTypes) {
  return sequelize.define('banner', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    banner_url: {
      type: DataTypes.CHAR(100),
      allowNull: false
    },
    title: {
      type: DataTypes.CHAR(20),
      allowNull: false
    }
  }, {
    tableName: 'banner'
  })
};
