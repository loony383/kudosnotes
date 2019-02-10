import PouchDB from "pouchdb";
import pouchdbfind from 'pouchdb-find';

PouchDB.plugin(pouchdbfind);

const db = new PouchDB("dnd");


export default db;
