const bodyparser=require('body-parser');
const express=require('express');
const cors=require('cors');

const app=express();
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());



app.set('port', 3000);


//Lugar donde se encuentran las rutas 
app.use(require("./src/routes/rutasLibros"));
app.use(require("./src/routes/rutasUsuarios"));

//Iniciar servidor 
app.listen(3000,()=>{
    console.log(`Server en: ${app.get('port')}`);
});


