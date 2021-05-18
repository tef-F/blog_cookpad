const Food = require('../models/Food');

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
        res.render('home', { data: 'ABC' });
    }
}

module.exports = new SiteController();
