const PouchDB = require('pouchdb')
const db = new PouchDB('dnd')

const remoteDB = new PouchDB('http://dnd.zeak.co:5984/dnd')

db.sync(remoteDB, {
  live: true,
  retry: true
}).on('change', function (change) {
  console.log('data change', change)
}).on('error', function (err) {
  console.log('sync error', err)
});

export default db;
