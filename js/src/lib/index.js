import { createStore } from 'redux';
import { loadState, saveState } from './localStorage';
import objectDictionary from './reducers';

import { add as actionAdd, remove as actionRemove } from './actions';

const DrupalRedux = class DrupalRedux {
  constructor() {
    this._store = createStore(objectDictionary, loadState());

    this._store.subscribe(() => {
      saveState(this._store.getState());
    });
  }
  getState = () => this._store.getState();
  add = payload => this._store.dispatch(actionAdd(payload));
  remove = key => this._store.dispatch(actionRemove({ key }));
};

export default DrupalRedux;
