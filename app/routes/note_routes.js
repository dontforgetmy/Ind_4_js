var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {
  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('truck').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  }); 
  app.put('/notes/:id', (req, res) => {
     const id = req.params.id;
     const details = { '_id': new ObjectID(id) };
     const note = { text: req.body.model, title: req.body.mileage };
  db.collection('truck').update(details, note, (err, result) => {
  if (err) {
      res.send({'error':'An error has occurred'});
  } else {
      res.send(note);
  } 
});
}); 
  app.delete('/notes/:id', (req, res) => {
   const id = req.params.id;
   const details = { '_id': new ObjectID(id) };
  db.collection('truck').remove(details, (err, item) => {
  if (err) {
    res.send({'error':'An error has occurred'});
    } else {
      res.send('Note ' + id + ' deleted!');
    } 
    });
    });
  app.post('/notes', (req, res) => {
    const note = { model: req.body.model, mileage: req.body.mileage };
    db.collection('truck').insert(note, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};