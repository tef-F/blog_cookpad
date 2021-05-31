const db = require('../../config/db');

class Like {
    // getAllFood = (callback) => {
    //     let sql = 'SELECT * FROM food';
    //     return db.query(sql, callback);
    // };

    // getLikeByIdFood = (id, callback) => {
    //     let sql =
    //         'SELECT * FROM like_info WHERE id_food = ?';
    //     return db.query(sql, [id], callback);
    // };
    addLike = (data, callback) => {
        let sql = 'INSERT INTO `like_info` SET ?';
        return db.query(sql, data, callback);
    };
    countLike = (id, callback) => {
        let sql = `SELECT COUNT(id) AS count_like FROM like_info WHERE id_food =${id}  AND  isLike = 1`;
        return db.query(sql, [id], callback);
    };

    getListLike = (id, callback) => {
        let sql = `SELECT * FROM like_info WHERE id_food =${id}  AND  isLike = 1`;
        return db.query(sql, [id], callback);
    };

    deleteLike = ([id, id_user], callback) => {
        let sql = `DELETE FROM like_info WHERE (like_info.id_food, like_info.id_user) IN ((${id}, ${id_user}))`;
        console.log(sql);
        return db.query(sql, [id, id_user], callback);
    };
}

module.exports = new Like();
