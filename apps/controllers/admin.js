var express = require('express');
var router = express.Router();
var user_md = require("../models/users");
var post_md = require("../models/posts");
var helper = require("../helpers/helper")
var categoryCtrl = require('../controllers/categoryController');
router.get("/", function (req, res) {
  // res.writeHead(200,{"Content-Type":"text/html"});
  // res.write("<h1>AdminPage</h1>")
  // res.end();

  // res.json({"message":"This is admin page"});
  var data = post_md.getAllPost();
  data.then(function (post) {
    var data = {
      posts: posts,
      error: false
    };
    res.render("admin/dashboard", {
      data: data
    });
  }).catch(function (err) {
    res.render("admin/dashboard", {
      data: {
        error: "Get post error"
      }
    });
  });

});
router.get("/signup", function (req, res) {

  res.render("signup", {
    data: {}
  });
});

router.post("/signup", function (req, res) {
  var user = req.body;

  if (user.email.trim().length == 0) {
    res.render("signup", {
      data: {
        error: "Email is required"
      }
    });
  }
  if (user.passwd.trim().length != 0 && user.passwd != user.repasswd) {
    res.render("signup", {
      data: {
        error: "Pass is required"
      }
    });
  }
  var password = helper.hash_password();
  user = {
    email: user.email,
    password: password,
    //password :user.passwd,
    first_name: user.firstname,
    last_name: user.lastname
  };
  //Insert db
  var result = user_md.addUser(user);

  result.then(function (data) {
    res.redirect("/admin/signin");
  }).catch(function (error) {
    res.render("signup", {
      data: {
        error: "Error"
      }
    });
  });

});

router.get("/signin", function (req, res) {
  res.render("signin", {
    data: {}
  });
});

router.post("/signin", function (req, res) {
  var params = req.body;

  if (params.email.trim().length == 0) {
    res.render("signin", {
      data: {
        error: "Please enter an email"
      }
    });
  } else {
    var data = user_md.getUserByEmail(email);
    if (data) {
      data.then(function (users) {
        var user = users[0];

        var status = helper.compare_password(params.password, user.password);
        if (!status) {
          res.render("signin", {
            data: {
              error: "Password wrongs"
            }
          });
        } else {
          req.session.user = user;
          console.log(req.session.user)
          res.redirect("/admin/");
        }
      })
    } else {
      res.render("signin", {
        data: {
          error: "User not exits"
        }
      });
    }
  }

});

router.get("/post/new", function (req, res) {
  res.render("admin/post/new", {
    data: false
  });
});

router.post("/post/new", function (req, res) {
  var params = req.body;

  if (params.title.trim().length == 0) {
    var data = {
      error: "Please enter title"
    };
    res.render("admin/post/new", {
      data: data
    });
  } else {
    var now = new Date();
    params.created_at = now;
    params.updated_at = now;

    var data = post_md.addPost(params);

    data.then(function (result) {
      res.redirect("/admin");
    }).catch(function (err) {
      var data = {
        error: "Could not insert"
      };
      res.render("admin/post/new", {
        data: data
      });
    })
  }
});

router.get("/post/edit/:id", function (req, res) {
  var params = res.params;
  var id = params.id;

  var data = post_md.getPostByID(id);

  if (data) {
    data.then(function (posts) {
      var post = posts[0];
      var data = {
        post: post,
        error: false
      };
      res.render("admin/post/edit", {
        data: data
      });
    }).catch(function (err) {
      var data = {
        error: "Could not getPost By ID"
      };
      res.render("admin/post/edit", {
        data: data
      });
    })
  } else {
    var data = {
      error: "Could not getPost By ID"
    };
    res.render("admin/post/edit", {
      data: data
    });
  }
});

module.exports = router;