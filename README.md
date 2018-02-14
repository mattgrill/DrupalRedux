# Redux for Drupal

A Redux implementation for Drupal.

## Getting Started

A simple JavaScript API is exposed at, `Drupal.Redux`,
- `Drupal.Redux.getState()`
  - Get the current contents of the store.
- `Drupal.Redux.add({ object })`
  - Add a serializable object to the store.
- `Drupal.Redux.remove('my-key')`
  - Remove an item from the store.
