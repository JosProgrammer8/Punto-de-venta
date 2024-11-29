module.exports = (sequelize, DataTypes) => {
    const Purchase = sequelize.define('Purchase', {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      purchaseDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    });
  
    Purchase.associate = function(models) {
      Purchase.belongsTo(models.User);
      Purchase.belongsTo(models.Product);
    };
  
    return Purchase;
  };
  