const con=require('./conexion');

async function query(QUERY){
    const conexion = await con.openSession();
    const result = await conexion.execute(QUERY);
    return result;
}

async function Insert(QUERY){
  
try {
  const conexion = await con.openSession();
    const result = await conexion.execute(QUERY);
      //Confirmamos el query en la transaccion
    await conexion.commit();
    await conexion.close();
    return 'OK';
} catch (error) {
  console.log(error);
    return 'No se inserto correctamente';
}


    
}

module.exports = {
    Insert,
    query
  }