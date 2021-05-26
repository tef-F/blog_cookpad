const db = require('../../config/db');

class Step {
    // getAllFood = (callback) => {
    //     let sql = 'SELECT * FROM food';
    //     return db.query(sql, callback);
    // };

    getStepByIdFood = (id, callback) => {
        let sql =
            'SELECT * FROM food_steps WHERE id_food = ? ORDER BY food_steps.step ASC';
        return db.query(sql, [id], callback);
    };

    addStep = (data, callback) => {
        let sql = 'INSERT INTO `food_steps` SET ?';
        return db.query(sql, data, callback);
    };
}

module.exports = new Step();
