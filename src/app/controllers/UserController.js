const User = require('../models/User');
const jwt = require('jsonwebtoken');

class UserController {
    //[GET] /me
    index(req, res, next) {
        res.render('users/login');
    }
    //[POST] /me/login
    login(req, res, next) {
        var username = req.body.username;
        var password = req.body.password;
        //eq.session.user = username;
        User.checkLogin([username, password], (err, data) => {
            try {
                if (err) res.send(err);
                var token = jwt.sign(
                    {
                        id: data[0].id,
                    },
                    'mk',
                );
                res.cookie('userId', token, {
                    maxAge: 24 * 60 * 60 * 1000,
                    httpOnly: true,
                });
                return res.json({
                    message: 'Đăng nhập thành công',
                    data: data,
                    token: token,
                });
            } catch (error) {
                return res.send({
                    message: `Đăng nhập thất bại, ERROR: ${error}`,
                });
            }
        });
    }
    //[GET] /me/logout
    logout(req, res, next) {
        try {
            res.status(200).clearCookie('userId', {
                path: '/',
            });
            res.redirect('/home');
        } catch (error) {
            return res.send(error);
        }
    }
    //CheckLogin
    checkLogin(req, res, next) {
        var user;

        try {
            var token = req.cookies.userId;
            var result = jwt.verify(token, 'mk');

            if (result) {
                next();
            }
        } catch (error) {
            // res.send({
            //     message: 'Ban chua dang nhap',
            // })
            res.redirect('/home');
        }
    }
    //[GET] /me/signup
    signup(req, res, next) {
        res.render('users/signup');
    }
    //[POST] /me/register
    register(req, res, next) {
        var formData = req.body;
        formData.avt =
            'https://cdn.website-editor.net/f2ca29451d69499dabe83517661addca/dms3rep/multi/profil+leer.jpg';
        formData.role = 1;

        if (formData.password != formData.re_password) {
            return res.json({ message: 'Mật khẩu đã nhập không khớp.' });
        } else {
            delete formData.re_password;
            // res.json(formData);
            User.setUser(formData, (err, data) => {
                if (err) next();
                if (data) {
                    return res.json({
                        message: 'Đăng kí thành công.',
                        data: 'Thành công',
                    });
                } else {
                    return res.json({
                        message: 'Lỗi',
                    });
                }
            });
        }
    }
    //[GEt] /me/api
    show(req, res, next) {
        User.getAllUser((err, data) => {
            if (err) next();
            // data.map((data) => {
            //     console.log(data.id);
            // })

            res.json(data);
        });
    }
    //[GET] me/api
    showById(req, res, next) {
        try {
            var token = req.cookies.userId;
            var result = jwt.verify(token, 'mk');
            User.getUserById(result.id, (err, data) => {
                if (err) next();
                res.json(data);
            });
        } catch (error) {
            res.send({ message: 'Lỗi: ' + error });
        }
    }
    //[POST] me/api/login
    apiLogin(req, res, next) {
        var username = req.body.username;
        var password = req.body.password;
        //eq.session.user = username;

        User.checkLogin([username, password], (err, data) => {
            try {
                if (err) res.send(err);
                var token = jwt.sign(
                    {
                        id: data[0].id,
                    },
                    'mk',
                );
                res.cookie('userId', token, {
                    maxAge: 24 * 60 * 60 * 1000,
                    httpOnly: true,
                });

                return res.json({
                    message: 'Đăng nhập thành công',
                    data: data,
                    token: token,
                    //session: req.session.user
                });
            } catch (error) {
                return res.send({
                    message: `Đăng nhập thất bại, ERROR: ${error}`,
                });
            }
        });
    }
}

module.exports = new UserController();
