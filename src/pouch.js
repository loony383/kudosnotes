import store from "./store.js";
import PouchAuth from "pouchdb-authentication";

import PouchDB from "pouchdb";

PouchDB.plugin(PouchAuth);

const db = new PouchDB("dnd");

function doLogin() {
  const remoteDB = new PouchDB("http://dnd.zeak.co:5984/dnd", {
    fetch(url, opts) {
     opts.credentials = 'include';
    return PouchDB.fetch(url, opts);
   }
  });

  db.sync(remoteDB, {
    live: true,
    retry: true
  })
    .on("change", function(change) {
      console.log("// yo, something changed!");
    })
    .on("paused", function(info) {
      console.log(
        "// replication was paused, usually because of a lost connection"
      );
    })
    .on("active", function(info) {
      console.log("// replication was resumed");
    })
    .on("error", function(err) {
      console.log("// totally unhandled error (shouldn't happen)");
      // idpatch something to say not authed with remote
      console.log('not authed');
    });
}

doLogin();

export function startSync(username, password) {
  fetch("http://dnd.zeak.co:5984/_session", {
    method: "post",
    headers: {
      Accept: "application/json",
      Host: "localhost:5984",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    credentials: "include", // SUPER IMPORTANT!
    body: "name=" + username + "&password=" + password
  })
    .then(function(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      // Read the response as json.
      return response.json();
    })
    .then(function(responseAsJson) {
      // Do stuff with the JSON
      console.log("POST _session");
      console.log(responseAsJson);
      doLogin();
    })
    .catch(function(error) {
      console.log("Looks like there was a problem: \n", error);
    });
}

export default db;
