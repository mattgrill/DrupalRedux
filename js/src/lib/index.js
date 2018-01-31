import { createStore } from 'redux';
import { loadState, saveState } from './localStorage';
import objectDictionary from './reducers';

import { add } from './actions';

const DrupalRedux = class DrupalRedux {
  constructor() {
    this.store = createStore(objectDictionary, loadState());

    this.store.subscribe(() => {
      saveState(this.store.getState());
    });

    this.actions = { add };
  }
};

export default DrupalRedux;
