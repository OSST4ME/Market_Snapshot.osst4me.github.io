module.exports = function (sequelize, DataTypes) {
    var Housing = sequelize.define("Housing", {
        Zip: DataTypes.STRING,
        Zip_Concat: DataTypes.STRING,
        House_Units: DataTypes.INTEGER,
        House_Price: DataTypes.INTEGER,
        House_Percent: DataTypes.INTEGER,
        Condo_Units: DataTypes.INTEGER,
        Condo_Price: DataTypes.INTEGER,
        Condo_Percent: DataTypes.INTEGER,
        Square_Feet: DataTypes.INTEGER,
        Month: DataTypes.STRING
    });
    return Housing;
};