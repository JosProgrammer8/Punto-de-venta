'use strict'
module.exports = (sequelize, DataTypes) => {
    const OrderSale = sequelize.define(
        'OrderSale',
        {
            date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            total: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
        },
        {},
    )

    OrderSale.associate = function (models) {
        OrderSale.belongsTo(models.Customer, {
            foreignKey: 'customer_id',
            as: 'customer',
        })
        OrderSale.hasMany(models.OrderSaleDetail, {
            foreignKey: 'order_sale_id',
            as: 'order_sale_details',
        })
    }

    return OrderSale
}
