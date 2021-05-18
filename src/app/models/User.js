const db = require('../../config/db');

class User {
    getAllUser = (callback) => {
        let sql = 'SELECT * FROM users';
        return db.query(sql, callback);
    };

    getUserById = (id, callback) => {
        let sql = 'SELECT * FROM users WHERE id = ?';
        return db.query(sql, [id], callback);
    };

    setUser = (formData, callback) => {
        let sql = 'INSERT INTO users SET ?';
        return db.query(sql, formData, callback);
    };

    checkLogin = ([username, password], callback) => {
        let sql = 'SELECT * FROM users WHERE user_name= ? AND password = ?';
        return db.query(sql, [username, password], callback);
    };
}

module.exports = new User();
