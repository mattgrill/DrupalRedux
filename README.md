# Redux for Drupal

A Redux implementation for Drupal.

## Getting Started

A simple JavaScript API is exposed at, `Drupal.Redux`,

- `Drupal.Redux.store`
  - The created Redux store. State is loaded and saved automatically to local storage. All methods available to a traditional Redux store are available.
- `Drupal.Redux.actions`
  - Available actions used to mutate the store.

- `Drupal.Redux.actions.add({ object })`
  - Add a serializable object to the store.

```javascript
  Drupal.Redux.store.dispatch(
    Drupal.Redux.actions.add(
      {
        mykey: 'myvalue'
      }
    )
  );
````
