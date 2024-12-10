'use strict'
module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define(
        'Customer',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            contact_email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            contact_phone: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            address: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {},
    )

    Customer.associate = function (models) {
        Customer.hasMany(models.OrderSale, {
            foreignKey: 'customer_id',
            as: 'order_sales',
        })
    }

    return Customer
}
