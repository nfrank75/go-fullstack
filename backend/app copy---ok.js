const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Thing = require('../models/thing');

app = express();

dotenv.config();
const PORT = process.env.PORT;

const MONGODB_URL = process.env.MONGODB_URL;


//connect to db

mongoose.connect(MONGODB_URL,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log(`Connexion à MongoDB réussie ! ${PORT}`))
  
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(express.json());



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.post('/api/stuff', async (req, res, next) => {
delete req.body._id;
const thing = new Thing({
  ...req.body  // L'opérateur spread ... est utilisé pour faire une copie de tous les éléments de req.body // is equal to req.body.name, req.body.price ... and so on 
  });
  thing.save()
  .then(() => res.status(201).json({message: 'created succesfully !'}))
  .catch((error) => res.status(400).json({error}));
});

app.get('/api/stuff', async (req, res, next) => {
    Thing.find()
      .then((things => res.status(200).json(things)))
      .catch(error => res.status(400).json({error}));
  });

app.get('/api/stuff/:id', (req, res, next) => {
  Thing.findOne({_id: req.params.id})
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(200).json({error}));
});


app.put('/api/stuff/:id', (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});

app.delete('/api/stuff/:id', (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet Supprimée !'}))
    .catch(error => res.status(400).json({ error }));
});



  
module.exports = app;