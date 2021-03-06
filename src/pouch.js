import PouchDB from "pouchdb";
import pouchdbfind from 'pouchdb-find';
import React from 'react'

PouchDB.plugin(pouchdbfind);

const db = new PouchDB("dnd");

let remoteDB = false;

const PouchContext = React.createContext();

class Pouch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shouldSync: false,
      isAuthed: false,
      directoryListener: false,
      folderListener: false,
      sync: false
    };
  }

  setAuth = authed => {
    this.setState({isAuthed: authed});
  };
  setSync = shouldSync => {
    this.setState({shouldSync: shouldSync});
  };

  isLoggedIn = () => {
    return this.state.isAuthed;
  }

  requiresLogin = () => {
    if (!this.state.shouldSync ||
      (this.state.shouldSync && this.state.isAuthed)
    ) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <PouchContext.Provider value={{
        db: db,
        doLogin: this.doLogin,
        startSync: this.startSync,
        isLoggedIn: this.isLoggedIn,
        requiresLogin: this.requiresLogin,
        setSync: this.setSync,
        doLogout: this.doLogout,
        setAuth: this.setAuth
      }}>
        {this.props.children}
      </PouchContext.Provider>
    )
  }

  doLogout = () => {
    localStorage.setItem('autoLogin', false);
    this.setSync(false)
    this.setAuth(false)
    if (this.state.sync !== false) {
      let oldSync = this.state.sync
      oldSync.cancel()
      this.setState({sync: false})
      remoteDB.close();
    }
  }

  doLogin = () => {
    remoteDB = new PouchDB("http://dnd.zeak.co:5984/dnd", {
      fetch(url, opts) {
        opts.credentials = "include";
        return PouchDB.fetch(url, opts);
      }
    });

    let sync = db.sync(remoteDB, {
      live: true,
      retry: true
    })
      .on("change", message => {
        this.setAuth(true);
      })
      .on("paused", message => {
        this.setAuth(true);
      })
      .on("active", message => {
        this.setAuth(true);
      })
      .on("error", err => {
        this.setAuth(false);
      });
    this.setState({sync: sync});
    localStorage.setItem('autoLogin', true);
  }

  startSync = (username, password) => {
    fetch("http://dnd.zeak.co:5984/_session", {
      method: "post",
      headers: {
        Accept: "application/json",
        Host: "localhost:5984",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      credentials: "include",
      body: "name=" + username + "&password=" + password
    })
      .then(response => {
        if (!response.ok) {
          this.setAuth({isAuthed: false, shouldSync: true});
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(responseAsJson => {
        this.doLogin();
      });
  }
}

export default Pouch;
export { PouchContext }
