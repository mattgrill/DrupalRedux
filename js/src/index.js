/**
 * @file
 * Drupal Redux API.
 */

import DrupalRedux from './lib';

((Drupal) => {
  Drupal.Redux = new DrupalRedux();
})(Drupal);
