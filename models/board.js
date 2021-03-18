module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define(
    "Board",
    {
      subject: {
        type: DataTypes.STRING(30),
        allowNull: true,
        unique: true,
      },
      writer: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      content: {
        type: DataTypes.STRING(1000),
        allowNull: true,
      },
      count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  Board.associate = (db) => {
    db.Board.belongsTo(db.User, { sourceKey: "id" });
  };
  return Board;
};
