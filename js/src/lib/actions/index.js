const ADD = 'add';

const add = payload => ({
  type: ADD,
  payload,
});

export { add, ADD };
