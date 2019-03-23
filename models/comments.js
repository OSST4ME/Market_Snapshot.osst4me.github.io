module.exports = function (sequelize, DataTypes) {
    var Comment = sequelize.define("Comment", {
        Zip: DataTypes.STRING,
        Comment_Text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        Email: DataTypes.STRING
    });
    return Comment;
};