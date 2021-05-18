class NewsControllers {
    //[GET] /news
    index(req, res, next) {
        res.render('news');
    }
    // [GET] /news/:slug
    show(req, res, next) {
        res.send('news DETAILS');
    }
}

module.exports = new NewsControllers();
