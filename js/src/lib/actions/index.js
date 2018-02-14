const ADD = 'add';
const REMOVE = 'remove';

const add = payload => ({
  type: ADD,
  payload,
});

const remove = payload => ({
  type: REMOVE,
  payload,
});

export { add, ADD, remove, REMOVE };
