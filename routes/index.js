exports.index = function(req, res) {
    var message = '';
    res.render('index', { name: '', message: 0 })
};