'use strict'
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
        'Product',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            unit_price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            stock: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
        },
        {},
    )

    Product.associate = function (models) {
        Product.belongsTo(models.Discount, {
            foreignKey: 'discount_id',
            as: 'discount',
        })
        Product.hasMany(models.OrderSaleDetail, {
            foreignKey: 'product_id',
            as: 'order_sale_details',
        })
    }

    return Product
}
