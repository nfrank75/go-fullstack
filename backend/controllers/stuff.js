const Thing = require('../models/thing');


exports.createThing = async (req, res, next) => {
    delete req.body._id;  // supprimer _id venant du client lors du post
    const thing = new Thing({
      ...req.body,  // L'opérateur spread ... est utilisé pour faire une copie de tous les éléments de req.body // is equal to req.body.name, req.body.price ... and so on  
      // req.body.title,  
      // req.body.description,  
      // req.body.imageUrl,  
      // req.body.userId,  
      // req.body.price, 
      });
      thing.save()
      .then(() => res.status(201).json({message: 'created succesfully !'})) //promise
      .catch((error) => res.status(400).json({error}));
    }


exports.get_things = async (req, res, next) => {
    Thing.find()
      .then((things => res.status(200).json(things)))
      .catch(error => res.status(400).json({error}));
  }


exports.get_one_thing = (req, res, next) => {
    Thing.findOne({_id: req.params.id})
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(200).json({error}));
  }


exports.update_one_thing = (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  }


exports.delete_thing = (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet Supprimée !'}))
      .catch(error => res.status(400).json({ error }));
  }

  