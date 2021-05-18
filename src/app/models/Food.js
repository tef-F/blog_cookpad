const db = require('../../config/db');

class Food {
    getAllFood = (callback) => {
        let sql = 'SELECT * FROM food';
        return db.query(sql, callback);
    };

    getAllFoodOfUser = (callback) => {
        let sql =
            'SELECT food.id_food, food.image, food.title, food.description, users.id, users.user_name, users.name, users.avt, users.role ' +
            ' FROM food INNER JOIN users  ON food.id_user = users.id';
        return db.query(sql, callback);
    };

    getFoodById = (id, callback) => {
        let sql = 'SELECT * FROM food WHERE id_food = ?';
        return db.query(sql, [id], callback);
    };

    getFoodByUser = (id, callback) => {
        let sql = 'SELECT * FROM food WHERE id_user = ?';
        return db.query(sql, [id], callback);
    };

    addFood = (data, callback) => {
        let sql = 'INSERT INTO `food` SET ?';
        return db.query(sql, data, callback);
    };
}

module.exports = new Food();
