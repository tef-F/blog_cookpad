const db = require('../../config/db');

class Step {
    // getAllFood = (callback) => {
    //     let sql = 'SELECT * FROM food';
    //     return db.query(sql, callback);
    // };

    getStepByIdFood = (id, callback) => {
        let sql = 'SELECT * FROM food_steps WHERE id_food = ?';
        return db.query(sql, [id], callback);
    };

    // addFood = (data, callback) => {
    //     let sql = 'INSERT INTO `food` SET ?';
    //     return db.query(sql, data, callback);
    // };
}

module.exports = new Step();
