const { Router }= require('express');
const router=Router();
const con=require('../conexion');



//Todos los usuarios
router.get('/Usuarios',(reg,res) => {
    let QUERY=  `SELECT * FROM Usuario`;
    try{
        ;(async () => {
            //Abrimos la conexion
            const conexion = await con.openSession();
            //mandamos el select
            const result = await conexion.execute(QUERY);
            res.send(result);
        })()  
    }
        catch(err) {
            res.send(err);
          }
});
//Todos los Libros
router.get('/Libros',(reg,res) => {
    let QUERY=  `SELECT * FROM Libro`;
    try{
        ;(async () => {
            //Abrimos la conexion
            const conexion = await con.openSession();
            //mandamos el select
            const result = await conexion.execute(QUERY);
            res.send(result);
        })()  
    }
        catch(err) {
            res.send(err);
          }
});
//Todos los Prestamos
router.get('/Pestamos',(reg,res) => {
    let QUERY=  `SELECT * FROM Prestamo`;
    try{
        ;(async () => {
            //Abrimos la conexion
            const conexion = await con.openSession();
            //mandamos el select
            const result = await conexion.execute(QUERY);
            res.send(result);
        })()  
    }
        catch(err) {
            res.send(err);
          }
});


//Inserts
router.post('/Usuarios',(req,res) => {
    //Llamada a los datos del cliente
        (async () => {
            try {
                 const {nombre,apellido,direccion,foto,tipo}=req.body;
                 const QUERY=  `INSERT INTO Usuario (Nombre,Apellido,Direccion,FotoUsuario,Tipo) 
                 VALUES ('${nombre}','${apellido}','${direccion}','${foto}',${tipo})`;
                
                    const conexion = await con.openSession();
                    await conexion.execute(QUERY);

                    //Confirmamos el query en la transaccion
                    conexion.commit();
                    conexion.close();
                    res.send("Usuario Insertado");
                    
            } catch (error) {
                conexion.close()
                console.log(error);
            }      
        })()  
 });
 router.post('/Libros',(req,res) => {
    //Llamada a los datos del cliente
        (async () => {
            try {
                 const {Titulo,Autor,Categoria,FotoLibro,Tipo}=req.body;
                 const QUERY=  `INSERT INTO Libro (Titulo,Autor,Categoria,FotoLibro,Tipo) 
                 VALUES ('${Titulo}','${Autor}','${Categoria}','${FotoLibro}',${Tipo})`;
                
                    const conexion = await con.openSession();
                    await conexion.execute(QUERY);

                    //Confirmamos el query en la transaccion
                    conexion.commit();
                    conexion.close();
                    res.send("Libro Insertado");
                    
            } catch (error) {
                conexion.close()
                console.log(error);
            }      
        })()  
 });

module.exports=router;