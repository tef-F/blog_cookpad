const db = require('../../config/db');

class Food {
    getAllFood = (callback) => {
        let sql = 'SELECT * FROM food';
        return db.query(sql, callback);
    };

    getAllFoodByTime = (callback) => {
        let sql =
            'SELECT food.id_food, food.image, food.title, food.description, food.isSave, users.id, users.user_name, users.name, users.avt, users.role ' +
            'FROM food INNER JOIN users ON food.id_user = users.id ORDER BY `food`.`createdAt` DESC LIMIT 0, 3';
        return db.query(sql, callback);
    };

    getAllFoodOfUser = (callback) => {
        let sql =
            'SELECT food.id_food, food.image, food.title, food.description, food.isSave, users.id, users.user_name, users.name, users.avt, users.role ' +
            ' FROM food INNER JOIN users ON food.id_user = users.id';
        return db.query(sql, callback);
    };

    getFoodOfUserById = (id, callback) => {
        let sql =
            'SELECT food.id_food, food.image, food.title, food.description, food.isSave, food.time, food.ingredient, food.createdAt, food.id_category,' +
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
            `SELECT food.id_food, food.image, food.title, food.description, food.isSave, users.id, users.user_name, users.name, users.avt, users.role ` +
            `FROM food INNER JOIN users  ON food.id_user = users.id  WHERE food.title LIKE '%${title}%'`;
        return db.query(sql, [title], callback);
    };

    getAllFoodOfUserByIdUser = (id, callback) => {
        let sql =
            'SELECT food.id_food, food.image, food.title, food.description, food.isSave, users.id, users.user_name, users.name, users.avt, users.role ' +
            ' FROM food INNER JOIN users ON food.id_user = users.id WHERE users.id = ?';
        return db.query(sql, [id], callback);
    };

    updateFood = ([formData, idFood], callback) => {
        let sql = 'UPDATE `food` SET ? WHERE id_food = ?';
        // 'UPDATE `food` SET `image`='[value-2]',`title`='[value-3]',`time`='[value-4]',`description`='[value-5]',`createdAt`='[value-6]',`updatedAt`='[value-7]',`ingredient`='[value-8]',`isSave`='[value-9]',`id_category`='[value-10]',`id_cmt`='[value-11]',`id_user`='[value-12]' WHERE 1';
        return db.query(sql, [formData, idFood], callback);
    };

    deleteFoodById = (id, callback) => {
        let sql = 'DELETE FROM `food` WHERE id_food = ?';
        return db.query(sql, [id], callback);
    };
}

module.exports = new Food();
