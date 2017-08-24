/* jshint indent: 2 */

export default function (sequelize, DataTypes) {
  return sequelize.define('icon', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    icon_url: {
      type: DataTypes.CHAR(100),
      allowNull: false
    },
    text: {
      type: DataTypes.CHAR(20),
      allowNull: false
    }
  }, {
    tableName: 'icon'
  })
};
