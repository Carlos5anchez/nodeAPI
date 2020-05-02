const { Router }= require('express');
const router=Router();
const fs = require('fs');

let rawdata = fs.readFileSync('C:\\Users\\carlo\\Desktop\\TestAPI\\src\\json\\test.json');
let json = JSON.parse(rawdata);

router.get('/',(reg,res) => {
    try{
   

        res.send(json)

        
    }
        catch(err) {
            res.send(err);
          }
});

router.get('/:id',(reg,res) => {
    try{
    
        res.send(json[reg.params.id]);
        
    }
        catch(err) {
            res.send(err);
          }
});



//Busquedas
router.get('/tipo/:name',(reg,res) => {
    try{
  
        let json1=json.filter((el)=>{
            return el.Tipo == reg.params.name
        });
            res.send(json1)
    
    }
        catch(err) {
            res.send(err);
          }
});
router.get('/vendedor/:name',(reg,res) => {
    try{
  
        let json1=json.filter((el)=>{
            return el.Vendedor == reg.params.name
        });
            res.send(json1)
    
    }
        catch(err) {
            res.send(err);
          }
});
router.get('/precio/:numero',(reg,res) => {
    try{
  
        let json1=json.filter((el)=>{
            return el.PrecioVenta == reg.params.numero
        });
            res.send(json1)
    
    }
        catch(err) {
            res.send(err);
          }
});
router.get('/superficie/:name',(reg,res) => {
    try{
  
        let json1=json.filter((el)=>{
            return el.Superficie == reg.params.name
        });
            res.send(json1)
    
    }
        catch(err) {
            res.send(err);
          }
});
module.exports=router;