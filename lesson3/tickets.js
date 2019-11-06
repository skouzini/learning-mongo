const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

let tickets = []
let id = 0

app.use(express.static('public'));

app.get('/api/tickets', async(req, res) => {
  console.log("Get");
  res.send(tickets);
});

app.post('/api/tickets', async(req, res) => {
  console.log("Post");
  var newticket = {
    name: req.body.name,
    problem: req.body.problem,
    id: id
  };
  id++;
  tickets.push(newticket);
  res.send(newticket);
});

app.delete('/api/tickets/:id', async(req, res) => {
  console.log("Post");
  let searchid = parseInt(req.params.id);
  let found = 0;
  for (var i = 0; i < tickets.length; i++) {
    if (tickets[i].id == searchid) {
      found = i;
    }
  }
  tickets.splice(found, 1);
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
