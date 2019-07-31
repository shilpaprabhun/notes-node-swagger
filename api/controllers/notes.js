'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');

/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
  getNoteById: getNoteById,
  getNotes: getNotes,
  postNote: postNote,
  deleteNote: deleteNote,
  putNote: putNote
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
var db = [];

function getNotes(req, res) {
  res.set('Content-Type', 'application/json');
  res.status(200).send(db);
}

function getNoteById(req, res) {
  var id = req.swagger.params.id.value;

  var item = (db.find(p => p.id == id));
  if (item) {
    res.set('Content-Type', 'application/json');
    res.status(200).send(item);
  } else {
    console.log('not defined');
    res.status(400).send({ message: 'There is no note with the id: ' + id });
  }
}

function postNote(req, res) {
  var body = req.swagger.params.item.value;
  if (body && body.title && body.desc) {
    let item = body;
    item.id = db.length + 1;
    db.push(item);
    res.set('Content-Type', 'application/json');
    res.status(201).send(item);
  }
  else {
    res.status(400).send({ message: 'Saving note failed' });
  }
}

function putNote(req, res) {
  var body = req.swagger.params.item.value;
  if (body && body.id) {
    var item = db.find(p => p.id == body.id);
    if (item) {
      let index = db.indexOf(item);

      if (body.title) item.title = body.title;
      if (body.desc) item.title = body.desc;

      db[index] = item;
      res.status(202).send({ message: 'Note updated successfully' });
    } else {
console.log('db1' , db);
      res.status(204).send({ message: 'Note with id does not exist' });
    }
  } else {
    console.log('db2' , db);
    res.status(400).send({ message: 'Invalid input' });
  }
}

function deleteNote(req, res) {
  console.log('db', db);
  var id = req.swagger.params.id.value;
  if (id) {
    var item = db.find(p => p.id == id);
    if (item) {
      let index = db.indexOf(item);
      db.splice(index, 1);
      res.status(202).send({ message: 'Removed the note' });
    } else {
      res.status(400).send({ message: 'Note with id does not exist' });
    }
  } else {
    res.status(400).send({ message: 'Invalid input. Missing note id' });
  }
}