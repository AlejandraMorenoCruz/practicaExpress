const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
const path = require('path')

let libros = [];

app.use (bodyParser.json())
app.use(cookieParser())
app.use('/assets', express.static(path.join(__dirname,'assets')));

app.all('/hello', (req, res)=>{
  res.send('Hello Wordl!');
});
app.all('/bye', function(req, res){ res.send('Bye bye!');});

app.get ('/nada',(req, res)=>{
  res.status(266).send('si hay')
})

app.post('/algo',(req, res)=>{
  res.status(404).send({foo:"bar"})
})

app.patch('/pues',(req, res)=>{
  res.status(401)
})

app.get('/hola',(req, res)=>{
  res.send('hoooooooooooooooolis');
})
app.get('/hola',(req, res)=>{
  res.send('hola');
})
app.get('/adios',(req, res)=>{
  res.send('nos vemos');
})

//no tengo mucha idea de que estoy haciendo, pero salió bien :)
app.get ('/libros',(req, res)=>{
  res.status(200).send({data:libros})
  console.log(req.body)
})

app.post('/libros',(req, res)=>{
  if(req.body.autor && req.body.titulo){
    libros.push(req.body)
    res.status(201).send('libro agregado')
  } else{
    res.status(400).send('los datos están incompletos')
  }
})



app.listen(3000,function(){ console.log('La app de ejemplo está escuchando en el puerto 3000');});
