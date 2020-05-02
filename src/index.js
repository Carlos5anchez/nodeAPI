const express=require('express');
const app=express();
const morgan=require('morgan');

app.set('port', 3000);



app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use(require("./routes/index"));
app.use('/json',require("./routes/inmuebles"));

//Iniciar servidor
app.listen(3000,()=>{
    console.log(`Server en: ${app.get('port')}`);
})