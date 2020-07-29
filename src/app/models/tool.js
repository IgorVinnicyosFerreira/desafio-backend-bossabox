'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tool = sequelize.define(
    'Tool',
    {
      title: DataTypes.STRING(100),
      link: DataTypes.STRING,
      description: DataTypes.TEXT,
      tags: DataTypes.ARRAY(DataTypes.STRING),
      userId: DataTypes.INTEGER
    },
    {}
  );
  Tool.associate = function(models) {
    Tool.belongsTo(models.User, {
      foreignKey: 'user_id',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  };
  return Tool;
};
