
const express = require('express');
const app = express()
const handleFormulario = require(".\\src\\handleFormulario.js");
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs');
app.set('views', __dirname + '\\views');
app.use(express.static(__dirname+ '\\public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.post("/enviar", (req, res) =>{
  handleFormulario(req.body);
});

app.use((req,res, next)=>{
  res.status(404);
  res.redirect("/");
});


app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});