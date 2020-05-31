const oracledb = require('oracledb');
var fs = require('fs');

//Lectura de usuario en Base de Datos
fs.readFile('./src/database.txt',"utf-8",(err, fd)=>{
    var fl=fd.toString();
    fl= fl.split('-');
    var user=fl[0];
    var pass=fl[1];
});
  

//Creamos la sesion y retona el objeto de sesion
const openSession=async(req, res) =>{
    var con= await oracledb.getConnection(  {
        user          : "cmsmcmsm",
        password      : "cmsmcmsm230598",
    });
    console.log('Connection DB successful!');
    return con;

}


module.exports = {
  openSession
}