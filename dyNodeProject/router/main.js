'use strict';

var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
    if(req.session.key) {
        //  res.redirect('/admin'); 
        res.render('index.html');
    } else {
        res.render('index.html');
    }
});

router.post('/login',function(req,res){
    // 로그인 시 key값을 email로 session 저장
    if(req.session.key) {
        req.session.key=req.body.email;
        res.send('session valid'); 
    } else {
        req.session.key=req.body.email;
        res.send('done with saving session');
    }
});



router.get('/logout',function(req,res){
    // 로그아웃 시 세션 삭제
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;