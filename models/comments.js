module.exports = function (sequelize, DataTypes) {
    var Comment = sequelize.define("Comment", {
        Zip_Concat: DataTypes.STRING,
        CommentText: DataTypes.STRING,
        Email: DataTypes.STRING
    });
    return Comment;
};