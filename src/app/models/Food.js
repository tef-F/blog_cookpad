const db = require('../../config/db');

class Food {
    getAllFood = (callback) => {
        let sql = 'SELECT * FROM food';
        return db.query(sql, callback);
    };

    getAllFoodOfUser = (callback) => {
        let sql =
            'SELECT food.id_food, food.image, food.title, food.description, users.id, users.user_name, users.name, users.avt, users.role ' +
            ' FROM food INNER JOIN users ON food.id_user = users.id';
        return db.query(sql, callback);
    };

    getFoodOfUserById = (id, callback) => {
        let sql =
            'SELECT food.id_food, food.image, food.title, food.description, food.time, food.ingredient, food.createdAt, food.id_category,' +
            ' users.id, users.user_name, users.name, users.avt, users.role, users.address ' +
            'FROM food INNER JOIN users ON food.id_user = users.id WHERE id_food = ?';
        return db.query(sql, [id], callback);
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

    findFoodByTitle = (title, callback) => {
        let sql =
            `SELECT food.id_food, food.image, food.title, food.description, users.id, users.user_name, users.name, users.avt, users.role ` +
            `FROM food INNER JOIN users  ON food.id_user = users.id  WHERE food.title LIKE '%${title}%'`;
        return db.query(sql, [title], callback);
    };
}

module.exports = new Food();
