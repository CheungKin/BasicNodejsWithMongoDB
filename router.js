var express = require('express');
var router = express.Router();
var user = require('./user');
const path = require('path');

//List User
router.get('/users', (req, res) => {
    user.findAll().then(users => {
        res.render('index', { 'users': users });
    });
});

//Create user
router.get('/users/create', (req, res) => {
    res.render('create', { 'error': '' });
});

router.post('/users/create', async (req, res) => {
    var result = await user.findByName(req.body.name);
    if (result === null) {
        user.insert(req.body).then(() => {
            res.redirect('/users');
        });
    } else {
        res.render('create', { 'error': 'User is existing!' });
    }

});

//Update user
router.get('/users/update/:_id', (req, res) => {
    console.log(req.params._id);
    user.findById(req.params._id).then(user => {
        res.render('update', { 'user': user });
    });
});

router.post('/users/update/:_id', (req, res) => {
    user.update(req.params._id, req.body).then(() => {
        res.redirect('/users');
    });
});

//Delete user
router.get('/users/delete/:_id', (req, res) => {
    user.delete(req.params._id).then(() => {
        res.redirect('/users');
    });
});

//Error page
router.get('*', function (req, res) {
    res.status(404).sendFile(path.join(__dirname, './views/error.html'));

});

module.exports = router;