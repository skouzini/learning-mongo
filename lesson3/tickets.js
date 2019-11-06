const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

let tickets = [];
let id = 0;

app.use(express.static('public'));

app.get('/api/tickets', async(req, res) => {
  console.log("Get");
  console.log(tickets);
  res.send(tickets);
});

app.post('/api/tickets', async(req, res) => {
  console.log("Post");
  console.log(tickets);
  var newticket = {
    name: req.body.name,
    problem: req.body.problem
  };
  tickets.push(newticket);
  console.log(tickets);
  res.send(newticket);
});

app.delete('/api/tickets/:id', async(req, res) => {
  console.log("Delete")
  console.log(id);
  tickets.splice(id, 1);
  console.log(tickets);
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
