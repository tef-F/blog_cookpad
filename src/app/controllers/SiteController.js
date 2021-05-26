const Food = require('../models/Food');
const Category = require('../models/Category');

class SiteController {
    //[GET] /home
    index(req, res, next) {
        Food.getAllFood((err, food) => {
            if (err) res.send(err);
            res.render('home', {
                foods: food,
            });
        });
    }
    // [GET] /search
    search(req, res, next) {
        Category.getAllCategory((err, data) => {
            if (err) res.send(err);
            return res.render('search', {
                cate: data,
            });
        });
    }
}

module.exports = new SiteController();
