import { ADD } from '../actions';

const objectDictionary = (state = {}, { type, payload }) => {
  switch (type) {
    case ADD:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default objectDictionary;
