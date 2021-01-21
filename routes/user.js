//everything works but sometime dosen t work

//-------------------------------------Registering new User-------------------------------
const e = require("express");

exports.reg = function(req, res) {
    //message = '';//uncomment ths to show message in html
    //console.log(req.method); if not working then try this testing purpose

    if (req.method == "POST") {
        var post = req.body;
        var name = post.name;
        var email = post.email;
        var pass = post.pass;

        //sql query
        var sql = "INSERT INTO users(u_name,email,password) VALUES ('" + name + "','" + email + "','" + pass + "')";

        var query = db.query(sql, function(err, result) {

            // message = "Succesfully! Your account has been created.";
            console.log(result); //dosent need to show the result but testing purpose only
            res.render('signin.ejs');
        });

    } else {
        console.log('not getting post method');
        res.render('reg.ejs');
    }
};








//-----------------------------------------------login page call------------------------------------------------------
exports.login = function(req, res) {
    var message = '';
    var sess = req.session;

    if (req.method == "POST") {
        var post = req.body;
        var email = post.email;
        var pass = post.pass;

        var sql = "SELECT u_id ,u_name, email FROM users WHERE email='" + email + "' and password = '" + pass + "' ";
        db.query(sql, function(err, rows) {
            if (err) { console.log(err); }
            //console.log(rows[0].u_name);
            if (rows.length) {
                req.session.userId = rows[0].u_id;
                req.session.user = rows[0].u_name;
                console.log(req.session.userId); //showing session id here
                var name = rows[0].u_name;
                res.render("index.ejs", { name: name, message: 10 })
            } else {
                console.log("error signin in if");
                res.render('signin.ejs');
            }

        });
    } else {
        res.render('signin.ejs');
    }

};


//--------------------------------------------------Writer page call---------------------
exports.write = function(req, res) {
    if (req.method == "POST") {
        var post = req.body;
        var title = post.title;
        var head = post.subhead;
        var blog = post.blogtxt;
        var userId = req.session.userId;
        var s_name = req.session.user;
        console.log(userId);
        if (userId == null) {
            //try to set alrt here
            res.render('./signin');
        } else {

            var sql = "INSERT INTO posts(title,sub_title,blog_txt,u_id) VALUES ('" + title + "','" + head + "','" + blog + "','" + userId + "')";

            var query = db.query(sql, function(err, result) {
                //show message to user that blog has been posted successfully
                // message = "Succesfully! Your account has been created.";
                console.log(result + "blog report");
                res.render('index.ejs', { name: s_name, message: 10 });
            });
        }

    } else {
        console.log('fail to post blog');
        res.render('write.ejs');
    }
};

//--------------------------------------------logout---------------------------
exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect("/");
    })
};


//-----------------dashboard---------
exports.dashboard = function(req, res, next) {

    var user = req.session.user;
    var userId = req.session.userId;
    console.log('ddd=' + userId);
    if (userId == null) {

        res.render("./signin");
    }

    var sql = "SELECT * FROM posts WHERE `u_id`='" + userId + "'";

    db.query(sql, function(err, results) {
        console.log(results)
        res.render('dashboard.ejs', { result: results });
    });
};


//user profile
exports.profile = function(req, res) {

    var userId = req.session.userId;
    if (userId == null) {
        res.redirect("/signin");
        return;
    }

    var sql = "SELECT * FROM users WHERE `u_id`='" + userId + "'";
    db.query(sql, function(err, rows) {
        var name = rows[0].u_name;
        var emai = rows[0].email;
        res.render('profile.ejs', { name: name, email: emai });
    });
};

