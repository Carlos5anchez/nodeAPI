const { Router }= require('express');
const router=Router();
const con=require('../funcionesBD');



    //Login
    router.post('/login',async(req,res) => {
        try {
           const errorJson={'status': 404,'message':'No se pudo encontrar'}
           const {usuario,contraseña}=req.body;
           const QUERY=  `SELECT * from usuario WHERE username = Lower('${usuario}') AND userpassword='${contraseña}'`;
           let ResQuery= await con.query(QUERY);
   

           
           if(ResQuery.rows.length!=0){
               console.log("Usuario encontrado");
               ResQuery['status']=200;
               res.send(ResQuery);
           }else{
               console.log("Usuario o password incorrectos");
               res.send(errorJson);
           }
         
   
        
       } catch (error) {
           console.log(error);
       }      
          
    });

    //Registro
    router.post('/registro',async(req,res) => {
        try {
           const {usuario,colonia,foto,contrasena}=req.body;
            const usuarioLower= usuario.toLowerCase();
           const QUERY=  `INSERT INTO usuario (USERNAME, COLONIA, FOTOUSUARIO, TIPO, USERPASSWORD) 
                 VALUES ('${usuarioLower}','${colonia}','${foto}',1,'${contrasena}')`;
                
                 let ResQuery= await con.Insert(QUERY);

                 console.log(ResQuery);
        
                 if(ResQuery=='Error'){
                    const errorJson={'status': 500,'message':'No se pudo registrar'}
                    console.log("No se registro Correctamente");
                    res.send(errorJson);
                 }
                 else if (ResQuery=='OK'){
                    const OkJson={'status': 250,'message':'Se registro Correctamente'}
                    console.log("Usuario Registrado Correctamente");
                    res.send(OkJson);
                 }
     
       } catch (error) {
           console.log(error);
       }      
          
    });
    
  
    module.exports=router;