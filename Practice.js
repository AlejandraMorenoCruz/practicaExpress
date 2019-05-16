const express = require('express');
const app = express();
const path = require('path')

app.all('/hello', function(req, res){
  res.send('Hello Wordl!');
});

app.all('/bye', function(req, res){
  res.send('Bye bye!');
});

app.use('/assets', express.static(path.join(__dirname,'assets')));

app.listen(3000,function(){
  console.log('La app de ejemplo está escuchando en el puerto 3000');
});
