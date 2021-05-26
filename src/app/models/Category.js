const db = require('../../config/db');

class Category {
    // getAllFood = (callback) => {
    //     let sql = 'SELECT * FROM food';
    //     return db.query(sql, callback);
    // };

    getAllCategory = (callback) => {
        let sql = 'SELECT * FROM category';
        return db.query(sql, callback);
    };

    // addFood = (data, callback) => {
    //     let sql = 'INSERT INTO `food` SET ?';
    //     return db.query(sql, data, callback);
    // };
}

module.exports = new Category();
