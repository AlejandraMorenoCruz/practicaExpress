const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const path = require('path')

const app = express()

const noDigas = 'verdeAzul'
let libros = [];

app.use (bodyParser.json())
app.use(cookieParser())
app.use('/assets', express.static(path.join(__dirname,'assets')));

app.all('/hello', (req, res)=>{
  res.send('Hello Wordl!');
});
app.all('/bye', (req, res)=>{
  res.send('Bye bye!');
});

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
  console.log(req.cookies)
})

app.post('/libros',(req, res)=>{
  if(req.body.autor && req.body.titulo){
    libros.push(req.body)
    res.status(201).send('libro agregado')
  } else{
    res.status(400).send('los datos están incompletos')
  }
})

jwt.sign({ user: req.body.user, theme: 'green' }, noDigas, function(err, token) {
  if(err) {
    res.send(500).end();
  } else {
    res.status(200).send({token: token})
    }
});

app.post('/auth/check',(req, res)=>{
  console.log(req.headers)

  jwt.verify(req.headers.authorization,noDigas,function(err, decoded){
    if(err){
      res.status(500).end()
    }else{
      console.lod(decoded)
      res.status(200).end()
    }
  })
})

  app.use((req,res,next)=>{
    jwt.verify(req.headers.authorization, noDigas, function(err, decoded) {
      if(err) {
        res.status(500).end('Terrible error')
      } else {
        console.log(decoded)
        // checar ese usuario en la base datos a ver si existe
        //poner next
        next
      }
    });
  })

  app.get('/colores',(req,res)=>{
    res.send('bienvenido a los colores')
  })

app.listen(3000,function(){ console.log('La app de ejemplo está escuchando en el puerto 3000');});
