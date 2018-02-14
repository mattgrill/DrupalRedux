import { ADD, REMOVE } from '../actions';

const objectDictionary = (state = {}, { type, payload }) => {
  switch (type) {
    case ADD:
      return { ...state, ...payload };
    case REMOVE:
      if (Object.prototype.hasOwnProperty.call(state, payload.key)) {
        delete state[payload.key];
      }
      return state;
    default:
      return state;
  }
};

export default objectDictionary;
