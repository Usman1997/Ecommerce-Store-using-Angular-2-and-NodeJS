const express  = require('express');
const router = express.Router();

router.get('/register',(req,res,send)=>{
    res.send('Regsiter');
})

router.get('/authenticate',(req,res,send)=>{
res.send('Authenticate');

});

router.get('/profile',(req,res,send)=>{

res.send('Profile');
});

router.get('/validate',(req,res,send)=>{

res.send('validate');
});

module.exports = router;