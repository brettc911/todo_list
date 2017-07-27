const express = require('express');
const mustacheExpress = require('mustache-Express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator')
const app = express()

// Configure view
app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')
// Configure statc files/ directory
app.use(express.static('Public'))
// Configure parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressValidator())


// Home Directory
var list = []
var list2 = []

app.get("/", function (req, res) {
  res.render('home', {todo: list, done: list2});
});

app.post("/", function (req, res) {
  list.push(req.body.newTodo);
  res.redirect('/');
})

app.post("/:item", function (req, res) {
  let listItem = req.params.item

  for (let i in list)

    list[i] === listItem ? list.splice(i, 1) && list2.push(list[i]) : ++i

  res.redirect('/')
})



// Port config
app.listen(3000, function() {
  console.log("listening on port 3000...")
})
