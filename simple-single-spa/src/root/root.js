import {declareChildApplication, start} from 'single-spa';

declareChildApplication('react', () =>
  import ('../react/index.js'), pathPrefix('/react'));
declareChildApplication('vue', () =>
  import ('../vue/index.js'), pathPrefix('/vue') );

start();

function pathPrefix(prefix) {
  return function(location) {
    return location.pathname.startsWith(`${prefix}`);
  }
}