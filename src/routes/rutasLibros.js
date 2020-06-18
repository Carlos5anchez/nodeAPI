const { Router }= require('express');
const router=Router();
const con=require('../funcionesBD');



//Todos los Libros
router.get('/Libros',async (reg,res) => {
    try{
        
        let QUERY=  `SELECT * FROM Libro where status='1'`;
        let ResQuery= await con.query(QUERY);
       
           if(ResQuery.rows.length!=0){
               console.log("Libros encontrados");
               ResQuery['status']=200;
               res.send(ResQuery);
           }else{
               console.log("Libros no encontrados");
               res.send(errorJson);
           }
         

    }
        catch(err) {
            res.send(err);
          }
});
//Categoria de libro
router.get('/Libros/categoria/:name',async(reg,res) => {
    try{
        
        let QUERY=  `SELECT * FROM Libro WHERE categoria='${reg.params.name}' AND status='1' `;
        let ResQuery= await con.query(QUERY);
   
           if(ResQuery.rows.length!=0){
               console.log("Categoria encontrada");
               ResQuery['status']=200;
               res.send(ResQuery);
           }else{
               console.log("Libros no encontrados");
               res.send(errorJson);
           }
         

    }
        catch(err) {
            res.send(err);
          }
});
router.get('/Libros/nombre/:name',async(reg,res) => {
    try{
        
        let QUERY=  `SELECT * FROM Libro WHERE titulo LIKE '%${reg.params.name}%' AND status='1' `;
        let ResQuery= await con.query(QUERY);
   
           if(ResQuery.rows.length!=0){
               console.log("Titulo encontrado");
               ResQuery['status']=200;
               res.send(ResQuery);
           }else{
               console.log("Libros no encontrados");
               res.send(errorJson);
           }
         

    }
        catch(err) {
            res.send(err);
          }
});
router.get('/Libros/id/:id',async(reg,res) => {
    try{
        
        let QUERY=  `SELECT * FROM Libro WHERE creador = '${reg.params.id}' `;
        let ResQuery= await con.query(QUERY);
   
           if(ResQuery.rows.length!=0){
               console.log("Titulo encontrado");
               ResQuery['status']=200;
               res.send(ResQuery);
           }else{
               console.log("Libros no encontrados");
               res.send(errorJson);
           }
         

    }
        catch(err) {
            res.send(err);
          }
});
router.get('/Libros/busqueda/:id',async(reg,res) => {
    try{
        
        let QUERY=  `SELECT * FROM Libro WHERE idLibro = ${reg.params.id} `;
        let ResQuery= await con.query(QUERY);
   
           if(ResQuery.rows.length!=0){
               console.log("Titulo encontrado");
               ResQuery['status']=200;
               res.send(ResQuery);
           }else{
               console.log("Libros no encontrados");
               res.send(errorJson);
           }
         

    }
        catch(err) {
            res.send(err);
          }
});
router.get('/Libros/delete/:id',async(reg,res) => {
    try{
        
        let QUERY=  `DELETE FROM Libro WHERE idLibro = '${reg.params.id}' `;
        let ResQuery= await con.Insert(QUERY);
   
        
        if(ResQuery=='Error'){
            const errorJson={'status': 500,'message':'No se pudo eliminar'}
            console.log("No se elimino Correctamente");
            res.send(errorJson);
         }
         else if (ResQuery=='OK'){
            const OkJson={'status': 250,'message':'Se elimino Correctamente'}
            console.log("Libro eliminado Correctamente");
            res.send(OkJson);
         }
         

    }
        catch(err) {
            res.send(err);
          }
});
router.post('/insert/libro',async(req,res) => {
    try {
       var {titulo,autor,categoria,fotoLibro,tipo,creador,pdf}=req.body;

       categoria = categoria.toLowerCase();

       
       const QUERY=  `INSERT INTO libro (titulo, autor, categoria, fotolibro, tipo,creador,status,libropdf) 
             VALUES ('${titulo}','${autor}','${categoria}','${fotoLibro}','${tipo}', '${creador}','1','${pdf}')`;
            
             let ResQuery= await con.Insert(QUERY);

             console.log(ResQuery);
    
             if(ResQuery=='Error'){
                const errorJson={'status': 500,'message':'No se pudo insertar'}
                console.log("No se inserto Correctamente");
                res.send(errorJson);
             }
             else if (ResQuery=='OK'){
                const OkJson={'status': 250,'message':'Se inserto Correctamente'}
                console.log("Libro INSERTADO Correctamente");
                res.send(OkJson);
             }
 
   } catch (error) {
       console.log(error);
   }      
      
});


// Prestamos
router.post('/insert/prestamo',async(req,res) => {
    try {
       var {usuario,libro,fechaPrestamo,fechaEntrega,telefono}=req.body;

       
       const QUERY=  `INSERT INTO prestamos ("idUsuario", "idLibro", "fechaPresamo", "fechaEntrega", ACTIVO, TELEFONO) 
             VALUES ('${usuario}','${libro}','${fechaPrestamo}', '${fechaEntrega}','1','${telefono}')`;
            
             let ResQuery= await con.Insert(QUERY);

             console.log(ResQuery);
    
             if(ResQuery=='Error'){
                const errorJson={'status': 500,'message':'No se pudo insertar'}
                console.log("No se inserto el prestamo Correctamente");
                res.send(errorJson);
             }
             else if (ResQuery=='OK'){
                const OkJson={'status': 250,'message':'Se inserto Correctamente'}
                console.log("Prestamo INSERTADO Correctamente");
                res.send(OkJson);
             }
 
   } catch (error) {
       console.log(error);
   }      
      
});
// UPDATE DESPUES DEL PRESTAMO
router.post('/update/libro',async(req,res) => {
    try {
       var {libro}=req.body;

       
       const QUERY=  `UPDATE libro
        SET status = '0' WHERE idLibro='${libro}'`;
            
             let ResQuery= await con.Insert(QUERY);

             console.log(ResQuery);
    
             if(ResQuery=='Error'){
                const errorJson={'status': 500,'message':'No se pudo insertar'}
                console.log("No se actualizo el libro Correctamente");
                res.send(errorJson);
             }
             else if (ResQuery=='OK'){
                const OkJson={'status': 250,'message':'Se inserto Correctamente'}
                console.log("Se actualizo el libro Correctamente");
                res.send(OkJson);
             }
 
   } catch (error) {
       console.log(error);
   }      
      
});


router.get('/Prestamos/usuario/:id',async (reg,res) => {
try{
          
            let QUERY=  `select l.titulo,l.categoria,l.fotoLibro,l.libropdf from libro l, prestamos p where l.idlibro=p."idLibro" and p."idUsuario"= '${reg.params.id}' and l.tipo='0'`;

            let ResQuery= await con.query(QUERY);
           
            console.log(ResQuery)
               if(ResQuery.rows.length!=0){
                   console.log("Libros de prestamo encontrados");
                   ResQuery['status']=200;
                   res.send(ResQuery);
               }else{
                   console.log("Libros de prestamo no encontrados");
                   res.send(errorJson);
               }
             
    
        }
            catch(err) {
                res.send(err);
              }
    });

module.exports=router;