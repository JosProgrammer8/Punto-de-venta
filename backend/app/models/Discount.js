'use strict'
module.exports = (sequelize, DataTypes) => {
    const Discount = sequelize.define(
        'Discount',
        {
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            value: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
        },
        {},
    )
    Discount.associate = function (_models) {}
    return Discount
}
