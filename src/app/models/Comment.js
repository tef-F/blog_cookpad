const db = require('../../config/db');

class Comment {
    // getAllFood = (callback) => {
    //     let sql = 'SELECT * FROM food';
    //     return db.query(sql, callback);
    // };
    getCommentByIdFood = (id, callback) => {
        let sql =
            'SELECT comment.id_cmt, comment.id_food, comment.time, comment.content, users.id, users.name, users.avt, users.role ' +
            ' FROM comment INNER JOIN users ON comment.id_user =  users.id WHERE id_food = ?';
        return db.query(sql, [id], callback);
    };

    addComment = (data, callback) => {
        let sql = 'INSERT INTO `comment` SET ?';
        return db.query(sql, data, callback);
    };
}

module.exports = new Comment();
