'use strict'
module.exports = (sequelize, DataTypes) => {
    const OrderSaleDetail = sequelize.define(
        'OrderSaleDetail',
        {
            cantidad: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            unit_price: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
            discount: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {},
    )

    OrderSaleDetail.associate = function (models) {
        OrderSaleDetail.belongsTo(models.OrderSale, {
            foreignKey: 'order_sale_id',
            as: 'order_sales',
        })
        OrderSaleDetail.belongsTo(models.Product, {
            foreignKey: 'product_id',
            as: 'products',
        })
    }

    return OrderSaleDetail
}
