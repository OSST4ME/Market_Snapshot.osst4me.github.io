module.exports = function (sequelize, DataTypes) {
    var Housing = sequelize.define("Housing", {
        City: DataTypes.STRING,
        Zip: DataTypes.STRING,
        zipConcat: DataTypes.STRING,
        houseUnits: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        housePrice: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        houseChange: {
            type: DataTypes.DECIMAL(10,2),
            defaultValue: 0.000
        },
        houseFoot: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        condoUnits: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        condoPrice: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        condoChange: {
            type: DataTypes.DECIMAL(10,2),
            defaultValue: 0.000
        },
        
        Month: DataTypes.STRING
    });
    Housing.associate = function(models) {
        //associating a housing record with a comment
        Housing.hasMany(models.Comment, {
           foreignKey: "HousingId"
        })
    }
    return Housing;
};