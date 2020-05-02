const { Router }= require('express');
const router=Router();
const fs = require('fs');

router.get('/',(reg,res) => {
    
        res.send("Bienvenido: /json or /xml ");
  
});


router.get('/xml',(reg,res) => {
    let rawdata = fs.readFileSync('C:\\Users\\carlo\\Desktop\\TestAPI\\src\\xml\\test.xml');
    res.send(rawdata);

});

module.exports=router;