module.exports = function (sequelize, DataTypes) {
    var Comment = sequelize.define("Comment", {
        zipConcat: DataTypes.STRING,
        Comment_Text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        Email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        }
    });
    Comment.associate = function(models){
        Comment.belongsTo(models.Housing, {
            //a comment should belong to a Housing
           foreignKey: {
               allowNull: false
           }
        });
    }

    return Comment;
};