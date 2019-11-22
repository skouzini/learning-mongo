const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true
});

const ticketSchema = new mongoose.Schema({
  name: String,
  problem: String
});

ticketSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });
  
ticketSchema.set('toJSON', {
  virtuals: true
});

const Ticket = mongoose.model('Ticket', ticketSchema);

app.get('/api/tickets', async(req, res) => {
  console.log("Get");
  try {
    let tickets = await Ticket.find();
    res.send(tickets);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/tickets', async(req, res) => {
  console.log("Post");
  const ticket = new Ticket({
    name: req.body.name,
    problem: req.body.problem
  });
  try {
    await ticket.save();
    res.send(ticket);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/tickets/:id', async(req, res) => {
  console.log("Delete");
  try {
    await Ticket.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
