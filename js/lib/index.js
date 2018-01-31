/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionTypes; });
/* harmony export (immutable) */ __webpack_exports__["b"] = createStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable__ = __webpack_require__(18);


/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */

var ActionTypes = {
  INIT: '@@redux/INIT'
  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [preloadedState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
   * to enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc. The only store enhancer that ships with Redux
   * is `applyMiddleware()`.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */

};
function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */


  function getState() {
    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */


  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */


  function dispatch(action) {
    if (!Object(__WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__["a" /* default */])(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */


  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({
      type: ActionTypes.INIT
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */


  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[__WEBPACK_IMPORTED_MODULE_1_symbol_observable__["a" /* default */]] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[__WEBPACK_IMPORTED_MODULE_1_symbol_observable__["a" /* default */]] = observable, _ref2;
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getPrototype_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__ = __webpack_require__(17);



/** `Object#toString` result references. */

var objectTag = '[object Object]';
/** Used for built-in method references. */

var funcProto = Function.prototype,
    objectProto = Object.prototype;
/** Used to resolve the decompiled source of functions. */

var funcToString = funcProto.toString;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/** Used to infer the `Object` constructor. */

var objectCtorString = funcToString.call(Object);
/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */

function isPlainObject(value) {
  if (!Object(__WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__["a" /* default */])(value) || Object(__WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__["a" /* default */])(value) != objectTag) {
    return false;
  }

  var proto = Object(__WEBPACK_IMPORTED_MODULE_1__getPrototype_js__["a" /* default */])(value);

  if (proto === null) {
    return true;
  }

  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}

/* harmony default export */ __webpack_exports__["a"] = (isPlainObject);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__root_js__ = __webpack_require__(11);

/** Built-in value references. */

var Symbol = __WEBPACK_IMPORTED_MODULE_0__root_js__["a" /* default */].Symbol;
/* harmony default export */ __webpack_exports__["a"] = (Symbol);

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
  // This works if the window reference is available
  if (typeof window === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */

}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib__ = __webpack_require__(8);
/**
 * @file
 * Drupal Redux API.
 */


(Drupal => {
  Drupal.Redux = new __WEBPACK_IMPORTED_MODULE_0__lib__["a" /* default */]();
})(Drupal);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__localStorage__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reducers__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions__ = __webpack_require__(26);




const DrupalRedux = class DrupalRedux {
  constructor() {
    this.store = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["a" /* createStore */])(__WEBPACK_IMPORTED_MODULE_2__reducers__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_1__localStorage__["a" /* loadState */])());
    this.store.subscribe(() => {
      Object(__WEBPACK_IMPORTED_MODULE_1__localStorage__["b" /* saveState */])(this.store.getState());
    });
    this.actions = {
      add: __WEBPACK_IMPORTED_MODULE_3__actions__["b" /* add */]
    };
  }

};
/* harmony default export */ __webpack_exports__["a"] = (DrupalRedux);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__combineReducers__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__compose__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_warning__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__createStore__["b"]; });
/* unused harmony reexport combineReducers */
/* unused harmony reexport bindActionCreators */
/* unused harmony reexport applyMiddleware */
/* unused harmony reexport compose */






/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/

function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  Object(__WEBPACK_IMPORTED_MODULE_5__utils_warning__["a" /* default */])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getRawTag_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objectToString_js__ = __webpack_require__(14);



/** `Object#toString` result references. */

var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';
/** Built-in value references. */

var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;
/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */

function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }

  return symToStringTag && symToStringTag in Object(value) ? Object(__WEBPACK_IMPORTED_MODULE_1__getRawTag_js__["a" /* default */])(value) : Object(__WEBPACK_IMPORTED_MODULE_2__objectToString_js__["a" /* default */])(value);
}

/* harmony default export */ __webpack_exports__["a"] = (baseGetTag);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__ = __webpack_require__(12);

/** Detect free variable `self`. */

var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */

var root = __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__["a" /* default */] || freeSelf || Function('return this')();
/* harmony default export */ __webpack_exports__["a"] = (root);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
/* harmony default export */ __webpack_exports__["a"] = (freeGlobal);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(4)))

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(3);

/** Used for built-in method references. */

var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString = objectProto.toString;
/** Built-in value references. */

var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;
/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */

function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);

  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }

  return result;
}

/* harmony default export */ __webpack_exports__["a"] = (getRawTag);

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** Used for built-in method references. */
var objectProto = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString = objectProto.toString;
/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */

function objectToString(value) {
  return nativeObjectToString.call(value);
}

/* harmony default export */ __webpack_exports__["a"] = (objectToString);

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__overArg_js__ = __webpack_require__(16);

/** Built-in value references. */

var getPrototype = Object(__WEBPACK_IMPORTED_MODULE_0__overArg_js__["a" /* default */])(Object.getPrototypeOf, Object);
/* harmony default export */ __webpack_exports__["a"] = (getPrototype);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

/* harmony default export */ __webpack_exports__["a"] = (overArg);

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/* harmony default export */ __webpack_exports__["a"] = (isObjectLike);

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ponyfill_js__ = __webpack_require__(20);
/* global window */

var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {
  root = Function('return this')();
}

var result = Object(__WEBPACK_IMPORTED_MODULE_0__ponyfill_js__["a" /* default */])(root);
/* harmony default export */ __webpack_exports__["a"] = (result);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(4), __webpack_require__(19)(module)))

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = function (originalModule) {
  if (!originalModule.webpackPolyfill) {
    var module = Object.create(originalModule); // module.parent = undefined by default

    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function get() {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function get() {
        return module.i;
      }
    });
    Object.defineProperty(module, "exports", {
      enumerable: true
    });
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
  var result;
  var Symbol = root.Symbol;

  if (typeof Symbol === 'function') {
    if (Symbol.observable) {
      result = Symbol.observable;
    } else {
      result = Symbol('observable');
      Symbol.observable = result;
    }
  } else {
    result = '@@observable';
  }

  return result;
}
;

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* unused harmony export default */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_warning__ = __webpack_require__(5);




function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';
  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!Object(__WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__["a" /* default */])(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT
    });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');

    if (typeof reducer(undefined, {
      type: type
    }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */


function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers);
  var unexpectedKeyCache = void 0;

  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError = void 0;

  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);

      if (warningMessage) {
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    return hasChanged ? nextState : state;
  };
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */


function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
}

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__compose__ = __webpack_require__(6);
var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};


/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */

function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];
      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = __WEBPACK_IMPORTED_MODULE_0__compose__["a" /* default */].apply(undefined, chain)(store.dispatch);
      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return loadState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return saveState; });
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {// Ignore write errors for now.
  }
};



/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions__ = __webpack_require__(26);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



const objectDictionary = (state = {}, {
  type,
  payload
}) => {
  switch (type) {
    case __WEBPACK_IMPORTED_MODULE_0__actions__["a" /* ADD */]:
      return _extends({}, state, payload);

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (objectDictionary);

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ADD; });
const ADD = 'add';

const add = payload => ({
  type: ADD,
  payload
});



/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYmY3M2JjZjE4NTNlYTFjZDA4NzAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvY3JlYXRlU3RvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc1BsYWluT2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX1N5bWJvbC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWR1eC9lcy91dGlscy93YXJuaW5nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9jb21wb3NlLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlR2V0VGFnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3Jvb3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZnJlZUdsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRSYXdUYWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb2JqZWN0VG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0UHJvdG90eXBlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX292ZXJBcmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc09iamVjdExpa2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2VzL2luZGV4LmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9oYXJtb255LW1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3ltYm9sLW9ic2VydmFibGUvZXMvcG9ueWZpbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2NvbWJpbmVSZWR1Y2Vycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvYmluZEFjdGlvbkNyZWF0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9hcHBseU1pZGRsZXdhcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9sb2NhbFN0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9yZWR1Y2Vycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2FjdGlvbnMvaW5kZXguanMiXSwibmFtZXMiOlsicHJvY2VzcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJjYWNoZWRTZXRUaW1lb3V0IiwiY2FjaGVkQ2xlYXJUaW1lb3V0IiwiZGVmYXVsdFNldFRpbW91dCIsIkVycm9yIiwiZGVmYXVsdENsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJlIiwiY2xlYXJUaW1lb3V0IiwicnVuVGltZW91dCIsImZ1biIsImNhbGwiLCJydW5DbGVhclRpbWVvdXQiLCJtYXJrZXIiLCJxdWV1ZSIsImRyYWluaW5nIiwiY3VycmVudFF1ZXVlIiwicXVldWVJbmRleCIsImNsZWFuVXBOZXh0VGljayIsImxlbmd0aCIsImNvbmNhdCIsImRyYWluUXVldWUiLCJ0aW1lb3V0IiwibGVuIiwicnVuIiwibmV4dFRpY2siLCJhcmdzIiwiQXJyYXkiLCJhcmd1bWVudHMiLCJpIiwicHVzaCIsIkl0ZW0iLCJhcnJheSIsInByb3RvdHlwZSIsImFwcGx5IiwidGl0bGUiLCJicm93c2VyIiwiZW52IiwiYXJndiIsInZlcnNpb24iLCJ2ZXJzaW9ucyIsIm5vb3AiLCJvbiIsImFkZExpc3RlbmVyIiwib25jZSIsIm9mZiIsInJlbW92ZUxpc3RlbmVyIiwicmVtb3ZlQWxsTGlzdGVuZXJzIiwiZW1pdCIsInByZXBlbmRMaXN0ZW5lciIsInByZXBlbmRPbmNlTGlzdGVuZXIiLCJsaXN0ZW5lcnMiLCJuYW1lIiwiYmluZGluZyIsImN3ZCIsImNoZGlyIiwiZGlyIiwidW1hc2siLCJBY3Rpb25UeXBlcyIsIklOSVQiLCJjcmVhdGVTdG9yZSIsInJlZHVjZXIiLCJwcmVsb2FkZWRTdGF0ZSIsImVuaGFuY2VyIiwiX3JlZjIiLCJ1bmRlZmluZWQiLCJjdXJyZW50UmVkdWNlciIsImN1cnJlbnRTdGF0ZSIsImN1cnJlbnRMaXN0ZW5lcnMiLCJuZXh0TGlzdGVuZXJzIiwiaXNEaXNwYXRjaGluZyIsImVuc3VyZUNhbk11dGF0ZU5leHRMaXN0ZW5lcnMiLCJzbGljZSIsImdldFN0YXRlIiwic3Vic2NyaWJlIiwibGlzdGVuZXIiLCJpc1N1YnNjcmliZWQiLCJ1bnN1YnNjcmliZSIsImluZGV4IiwiaW5kZXhPZiIsInNwbGljZSIsImRpc3BhdGNoIiwiYWN0aW9uIiwiaXNQbGFpbk9iamVjdCIsInR5cGUiLCJyZXBsYWNlUmVkdWNlciIsIm5leHRSZWR1Y2VyIiwib2JzZXJ2YWJsZSIsIl9yZWYiLCJvdXRlclN1YnNjcmliZSIsIm9ic2VydmVyIiwiVHlwZUVycm9yIiwib2JzZXJ2ZVN0YXRlIiwibmV4dCIsIm9iamVjdFRhZyIsImZ1bmNQcm90byIsIkZ1bmN0aW9uIiwib2JqZWN0UHJvdG8iLCJPYmplY3QiLCJmdW5jVG9TdHJpbmciLCJ0b1N0cmluZyIsImhhc093blByb3BlcnR5Iiwib2JqZWN0Q3RvclN0cmluZyIsInZhbHVlIiwiaXNPYmplY3RMaWtlIiwiYmFzZUdldFRhZyIsInByb3RvIiwiZ2V0UHJvdG90eXBlIiwiQ3RvciIsImNvbnN0cnVjdG9yIiwiU3ltYm9sIiwicm9vdCIsImciLCJldmFsIiwid2luZG93Iiwid2FybmluZyIsIm1lc3NhZ2UiLCJjb25zb2xlIiwiZXJyb3IiLCJjb21wb3NlIiwiX2xlbiIsImZ1bmNzIiwiX2tleSIsImFyZyIsInJlZHVjZSIsImEiLCJiIiwiRHJ1cGFsIiwiUmVkdXgiLCJEcnVwYWxSZWR1eCIsInN0b3JlIiwibG9hZFN0YXRlIiwic2F2ZVN0YXRlIiwiYWN0aW9ucyIsImFkZCIsImlzQ3J1c2hlZCIsIk5PREVfRU5WIiwibnVsbFRhZyIsInVuZGVmaW5lZFRhZyIsInN5bVRvU3RyaW5nVGFnIiwidG9TdHJpbmdUYWciLCJnZXRSYXdUYWciLCJvYmplY3RUb1N0cmluZyIsImZyZWVTZWxmIiwic2VsZiIsImZyZWVHbG9iYWwiLCJnbG9iYWwiLCJuYXRpdmVPYmplY3RUb1N0cmluZyIsImlzT3duIiwidGFnIiwidW5tYXNrZWQiLCJyZXN1bHQiLCJvdmVyQXJnIiwiZ2V0UHJvdG90eXBlT2YiLCJmdW5jIiwidHJhbnNmb3JtIiwicG9ueWZpbGwiLCJvcmlnaW5hbE1vZHVsZSIsIndlYnBhY2tQb2x5ZmlsbCIsImNyZWF0ZSIsImNoaWxkcmVuIiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiZ2V0IiwibCIsInN5bWJvbE9ic2VydmFibGVQb255ZmlsbCIsImdldFVuZGVmaW5lZFN0YXRlRXJyb3JNZXNzYWdlIiwia2V5IiwiYWN0aW9uVHlwZSIsImFjdGlvbk5hbWUiLCJnZXRVbmV4cGVjdGVkU3RhdGVTaGFwZVdhcm5pbmdNZXNzYWdlIiwiaW5wdXRTdGF0ZSIsInJlZHVjZXJzIiwidW5leHBlY3RlZEtleUNhY2hlIiwicmVkdWNlcktleXMiLCJrZXlzIiwiYXJndW1lbnROYW1lIiwibWF0Y2giLCJqb2luIiwidW5leHBlY3RlZEtleXMiLCJmaWx0ZXIiLCJmb3JFYWNoIiwiYXNzZXJ0UmVkdWNlclNoYXBlIiwiaW5pdGlhbFN0YXRlIiwiTWF0aCIsInJhbmRvbSIsInN1YnN0cmluZyIsInNwbGl0IiwiY29tYmluZVJlZHVjZXJzIiwiZmluYWxSZWR1Y2VycyIsImZpbmFsUmVkdWNlcktleXMiLCJzaGFwZUFzc2VydGlvbkVycm9yIiwiY29tYmluYXRpb24iLCJzdGF0ZSIsIndhcm5pbmdNZXNzYWdlIiwiaGFzQ2hhbmdlZCIsIm5leHRTdGF0ZSIsIl9pIiwicHJldmlvdXNTdGF0ZUZvcktleSIsIm5leHRTdGF0ZUZvcktleSIsImVycm9yTWVzc2FnZSIsImJpbmRBY3Rpb25DcmVhdG9yIiwiYWN0aW9uQ3JlYXRvciIsImJpbmRBY3Rpb25DcmVhdG9ycyIsImFjdGlvbkNyZWF0b3JzIiwiYm91bmRBY3Rpb25DcmVhdG9ycyIsIl9leHRlbmRzIiwiYXNzaWduIiwidGFyZ2V0Iiwic291cmNlIiwiYXBwbHlNaWRkbGV3YXJlIiwibWlkZGxld2FyZXMiLCJfZGlzcGF0Y2giLCJjaGFpbiIsIm1pZGRsZXdhcmVBUEkiLCJtYXAiLCJtaWRkbGV3YXJlIiwic2VyaWFsaXplZFN0YXRlIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsIkpTT04iLCJwYXJzZSIsImVyciIsInN0cmluZ2lmeSIsInNldEl0ZW0iLCJvYmplY3REaWN0aW9uYXJ5IiwicGF5bG9hZCIsIkFERCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDN0RBO0FBQ0Es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QUNBLFFBQUlGLG9CQUFvQixJQUF4QixFQUE4QjtBQUM1QixhQUFPeEosU0FBUDtBQUNEOztBQUNELFdBQU8ySixLQUFLQyxLQUFMLENBQVdKLGVBQVgsQ0FBUDtBQUNELEdBTkQsQ0FNRSxPQUFPSyxHQUFQLEVBQVk7QUFDWixXQUFPN0osU0FBUDtBQUNEO0FBQ0YsQ0FWRDs7QUFZQSxNQUFNbUUsWUFBYTZELEtBQUQsSUFBVztBQUMzQixNQUFJO0FBQ0YsVUFBTXdCLGtCQUFrQkcsS0FBS0csU0FBTCxDQUFlOUIsS0FBZixDQUF4QjtBQUNBeUIsaUJBQWFNLE9BQWIsQ0FBcUIsT0FBckIsRUFBOEJQLGVBQTlCO0FBQ0QsR0FIRCxDQUdFLE9BQU9LLEdBQVAsRUFBWSxDQUNaO0FBQ0Q7QUFDRixDQVBEOzs7Ozs7Ozs7Ozs7QUNaQTs7QUFFQSxNQUFNRyxtQkFBbUIsQ0FBQ2hDLFFBQVEsRUFBVCxFQUFhO0FBQUU3RyxNQUFGO0FBQVE4STtBQUFSLENBQWIsS0FBbUM7QUFDMUQsVUFBUTlJLElBQVI7QUFDRSxTQUFLLHFEQUFMO0FBQ0UsMEJBQVk2RyxLQUFaLEVBQXNCaUMsT0FBdEI7O0FBQ0Y7QUFDRSxhQUFPakMsS0FBUDtBQUpKO0FBTUQsQ0FQRDs7QUFTQSx5REFBZWdDLGdCQUFmLEU7Ozs7Ozs7O0FDWEE7QUFBQSxNQUFNRSxNQUFNLEtBQVo7O0FBRUEsTUFBTTdGLE1BQU00RixZQUFZO0FBQ3RCOUksUUFBTStJLEdBRGdCO0FBRXRCRDtBQUZzQixDQUFaLENBQVoiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBiZjczYmNmMTg1M2VhMWNkMDg3MCIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwiaW1wb3J0IGlzUGxhaW5PYmplY3QgZnJvbSAnbG9kYXNoLWVzL2lzUGxhaW5PYmplY3QnO1xuaW1wb3J0ICQkb2JzZXJ2YWJsZSBmcm9tICdzeW1ib2wtb2JzZXJ2YWJsZSc7XG5cbi8qKlxuICogVGhlc2UgYXJlIHByaXZhdGUgYWN0aW9uIHR5cGVzIHJlc2VydmVkIGJ5IFJlZHV4LlxuICogRm9yIGFueSB1bmtub3duIGFjdGlvbnMsIHlvdSBtdXN0IHJldHVybiB0aGUgY3VycmVudCBzdGF0ZS5cbiAqIElmIHRoZSBjdXJyZW50IHN0YXRlIGlzIHVuZGVmaW5lZCwgeW91IG11c3QgcmV0dXJuIHRoZSBpbml0aWFsIHN0YXRlLlxuICogRG8gbm90IHJlZmVyZW5jZSB0aGVzZSBhY3Rpb24gdHlwZXMgZGlyZWN0bHkgaW4geW91ciBjb2RlLlxuICovXG5leHBvcnQgdmFyIEFjdGlvblR5cGVzID0ge1xuICBJTklUOiAnQEByZWR1eC9JTklUJ1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgUmVkdXggc3RvcmUgdGhhdCBob2xkcyB0aGUgc3RhdGUgdHJlZS5cbiAgICogVGhlIG9ubHkgd2F5IHRvIGNoYW5nZSB0aGUgZGF0YSBpbiB0aGUgc3RvcmUgaXMgdG8gY2FsbCBgZGlzcGF0Y2goKWAgb24gaXQuXG4gICAqXG4gICAqIFRoZXJlIHNob3VsZCBvbmx5IGJlIGEgc2luZ2xlIHN0b3JlIGluIHlvdXIgYXBwLiBUbyBzcGVjaWZ5IGhvdyBkaWZmZXJlbnRcbiAgICogcGFydHMgb2YgdGhlIHN0YXRlIHRyZWUgcmVzcG9uZCB0byBhY3Rpb25zLCB5b3UgbWF5IGNvbWJpbmUgc2V2ZXJhbCByZWR1Y2Vyc1xuICAgKiBpbnRvIGEgc2luZ2xlIHJlZHVjZXIgZnVuY3Rpb24gYnkgdXNpbmcgYGNvbWJpbmVSZWR1Y2Vyc2AuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHJlZHVjZXIgQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIG5leHQgc3RhdGUgdHJlZSwgZ2l2ZW5cbiAgICogdGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBhbmQgdGhlIGFjdGlvbiB0byBoYW5kbGUuXG4gICAqXG4gICAqIEBwYXJhbSB7YW55fSBbcHJlbG9hZGVkU3RhdGVdIFRoZSBpbml0aWFsIHN0YXRlLiBZb3UgbWF5IG9wdGlvbmFsbHkgc3BlY2lmeSBpdFxuICAgKiB0byBoeWRyYXRlIHRoZSBzdGF0ZSBmcm9tIHRoZSBzZXJ2ZXIgaW4gdW5pdmVyc2FsIGFwcHMsIG9yIHRvIHJlc3RvcmUgYVxuICAgKiBwcmV2aW91c2x5IHNlcmlhbGl6ZWQgdXNlciBzZXNzaW9uLlxuICAgKiBJZiB5b3UgdXNlIGBjb21iaW5lUmVkdWNlcnNgIHRvIHByb2R1Y2UgdGhlIHJvb3QgcmVkdWNlciBmdW5jdGlvbiwgdGhpcyBtdXN0IGJlXG4gICAqIGFuIG9iamVjdCB3aXRoIHRoZSBzYW1lIHNoYXBlIGFzIGBjb21iaW5lUmVkdWNlcnNgIGtleXMuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtlbmhhbmNlcl0gVGhlIHN0b3JlIGVuaGFuY2VyLiBZb3UgbWF5IG9wdGlvbmFsbHkgc3BlY2lmeSBpdFxuICAgKiB0byBlbmhhbmNlIHRoZSBzdG9yZSB3aXRoIHRoaXJkLXBhcnR5IGNhcGFiaWxpdGllcyBzdWNoIGFzIG1pZGRsZXdhcmUsXG4gICAqIHRpbWUgdHJhdmVsLCBwZXJzaXN0ZW5jZSwgZXRjLiBUaGUgb25seSBzdG9yZSBlbmhhbmNlciB0aGF0IHNoaXBzIHdpdGggUmVkdXhcbiAgICogaXMgYGFwcGx5TWlkZGxld2FyZSgpYC5cbiAgICpcbiAgICogQHJldHVybnMge1N0b3JlfSBBIFJlZHV4IHN0b3JlIHRoYXQgbGV0cyB5b3UgcmVhZCB0aGUgc3RhdGUsIGRpc3BhdGNoIGFjdGlvbnNcbiAgICogYW5kIHN1YnNjcmliZSB0byBjaGFuZ2VzLlxuICAgKi9cbn07ZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlU3RvcmUocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUsIGVuaGFuY2VyKSB7XG4gIHZhciBfcmVmMjtcblxuICBpZiAodHlwZW9mIHByZWxvYWRlZFN0YXRlID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBlbmhhbmNlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBlbmhhbmNlciA9IHByZWxvYWRlZFN0YXRlO1xuICAgIHByZWxvYWRlZFN0YXRlID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBlbmhhbmNlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAodHlwZW9mIGVuaGFuY2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSBlbmhhbmNlciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIHJldHVybiBlbmhhbmNlcihjcmVhdGVTdG9yZSkocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiByZWR1Y2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCB0aGUgcmVkdWNlciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIGN1cnJlbnRSZWR1Y2VyID0gcmVkdWNlcjtcbiAgdmFyIGN1cnJlbnRTdGF0ZSA9IHByZWxvYWRlZFN0YXRlO1xuICB2YXIgY3VycmVudExpc3RlbmVycyA9IFtdO1xuICB2YXIgbmV4dExpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnM7XG4gIHZhciBpc0Rpc3BhdGNoaW5nID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZW5zdXJlQ2FuTXV0YXRlTmV4dExpc3RlbmVycygpIHtcbiAgICBpZiAobmV4dExpc3RlbmVycyA9PT0gY3VycmVudExpc3RlbmVycykge1xuICAgICAgbmV4dExpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnMuc2xpY2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVhZHMgdGhlIHN0YXRlIHRyZWUgbWFuYWdlZCBieSB0aGUgc3RvcmUuXG4gICAqXG4gICAqIEByZXR1cm5zIHthbnl9IFRoZSBjdXJyZW50IHN0YXRlIHRyZWUgb2YgeW91ciBhcHBsaWNhdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIGdldFN0YXRlKCkge1xuICAgIHJldHVybiBjdXJyZW50U3RhdGU7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGNoYW5nZSBsaXN0ZW5lci4gSXQgd2lsbCBiZSBjYWxsZWQgYW55IHRpbWUgYW4gYWN0aW9uIGlzIGRpc3BhdGNoZWQsXG4gICAqIGFuZCBzb21lIHBhcnQgb2YgdGhlIHN0YXRlIHRyZWUgbWF5IHBvdGVudGlhbGx5IGhhdmUgY2hhbmdlZC4gWW91IG1heSB0aGVuXG4gICAqIGNhbGwgYGdldFN0YXRlKClgIHRvIHJlYWQgdGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBpbnNpZGUgdGhlIGNhbGxiYWNrLlxuICAgKlxuICAgKiBZb3UgbWF5IGNhbGwgYGRpc3BhdGNoKClgIGZyb20gYSBjaGFuZ2UgbGlzdGVuZXIsIHdpdGggdGhlIGZvbGxvd2luZ1xuICAgKiBjYXZlYXRzOlxuICAgKlxuICAgKiAxLiBUaGUgc3Vic2NyaXB0aW9ucyBhcmUgc25hcHNob3R0ZWQganVzdCBiZWZvcmUgZXZlcnkgYGRpc3BhdGNoKClgIGNhbGwuXG4gICAqIElmIHlvdSBzdWJzY3JpYmUgb3IgdW5zdWJzY3JpYmUgd2hpbGUgdGhlIGxpc3RlbmVycyBhcmUgYmVpbmcgaW52b2tlZCwgdGhpc1xuICAgKiB3aWxsIG5vdCBoYXZlIGFueSBlZmZlY3Qgb24gdGhlIGBkaXNwYXRjaCgpYCB0aGF0IGlzIGN1cnJlbnRseSBpbiBwcm9ncmVzcy5cbiAgICogSG93ZXZlciwgdGhlIG5leHQgYGRpc3BhdGNoKClgIGNhbGwsIHdoZXRoZXIgbmVzdGVkIG9yIG5vdCwgd2lsbCB1c2UgYSBtb3JlXG4gICAqIHJlY2VudCBzbmFwc2hvdCBvZiB0aGUgc3Vic2NyaXB0aW9uIGxpc3QuXG4gICAqXG4gICAqIDIuIFRoZSBsaXN0ZW5lciBzaG91bGQgbm90IGV4cGVjdCB0byBzZWUgYWxsIHN0YXRlIGNoYW5nZXMsIGFzIHRoZSBzdGF0ZVxuICAgKiBtaWdodCBoYXZlIGJlZW4gdXBkYXRlZCBtdWx0aXBsZSB0aW1lcyBkdXJpbmcgYSBuZXN0ZWQgYGRpc3BhdGNoKClgIGJlZm9yZVxuICAgKiB0aGUgbGlzdGVuZXIgaXMgY2FsbGVkLiBJdCBpcywgaG93ZXZlciwgZ3VhcmFudGVlZCB0aGF0IGFsbCBzdWJzY3JpYmVyc1xuICAgKiByZWdpc3RlcmVkIGJlZm9yZSB0aGUgYGRpc3BhdGNoKClgIHN0YXJ0ZWQgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGUgbGF0ZXN0XG4gICAqIHN0YXRlIGJ5IHRoZSB0aW1lIGl0IGV4aXRzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBBIGNhbGxiYWNrIHRvIGJlIGludm9rZWQgb24gZXZlcnkgZGlzcGF0Y2guXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0byByZW1vdmUgdGhpcyBjaGFuZ2UgbGlzdGVuZXIuXG4gICAqL1xuICBmdW5jdGlvbiBzdWJzY3JpYmUobGlzdGVuZXIpIHtcbiAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGxpc3RlbmVyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgdmFyIGlzU3Vic2NyaWJlZCA9IHRydWU7XG5cbiAgICBlbnN1cmVDYW5NdXRhdGVOZXh0TGlzdGVuZXJzKCk7XG4gICAgbmV4dExpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiB1bnN1YnNjcmliZSgpIHtcbiAgICAgIGlmICghaXNTdWJzY3JpYmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaXNTdWJzY3JpYmVkID0gZmFsc2U7XG5cbiAgICAgIGVuc3VyZUNhbk11dGF0ZU5leHRMaXN0ZW5lcnMoKTtcbiAgICAgIHZhciBpbmRleCA9IG5leHRMaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XG4gICAgICBuZXh0TGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwYXRjaGVzIGFuIGFjdGlvbi4gSXQgaXMgdGhlIG9ubHkgd2F5IHRvIHRyaWdnZXIgYSBzdGF0ZSBjaGFuZ2UuXG4gICAqXG4gICAqIFRoZSBgcmVkdWNlcmAgZnVuY3Rpb24sIHVzZWQgdG8gY3JlYXRlIHRoZSBzdG9yZSwgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGVcbiAgICogY3VycmVudCBzdGF0ZSB0cmVlIGFuZCB0aGUgZ2l2ZW4gYGFjdGlvbmAuIEl0cyByZXR1cm4gdmFsdWUgd2lsbFxuICAgKiBiZSBjb25zaWRlcmVkIHRoZSAqKm5leHQqKiBzdGF0ZSBvZiB0aGUgdHJlZSwgYW5kIHRoZSBjaGFuZ2UgbGlzdGVuZXJzXG4gICAqIHdpbGwgYmUgbm90aWZpZWQuXG4gICAqXG4gICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9ubHkgc3VwcG9ydHMgcGxhaW4gb2JqZWN0IGFjdGlvbnMuIElmIHlvdSB3YW50IHRvXG4gICAqIGRpc3BhdGNoIGEgUHJvbWlzZSwgYW4gT2JzZXJ2YWJsZSwgYSB0aHVuaywgb3Igc29tZXRoaW5nIGVsc2UsIHlvdSBuZWVkIHRvXG4gICAqIHdyYXAgeW91ciBzdG9yZSBjcmVhdGluZyBmdW5jdGlvbiBpbnRvIHRoZSBjb3JyZXNwb25kaW5nIG1pZGRsZXdhcmUuIEZvclxuICAgKiBleGFtcGxlLCBzZWUgdGhlIGRvY3VtZW50YXRpb24gZm9yIHRoZSBgcmVkdXgtdGh1bmtgIHBhY2thZ2UuIEV2ZW4gdGhlXG4gICAqIG1pZGRsZXdhcmUgd2lsbCBldmVudHVhbGx5IGRpc3BhdGNoIHBsYWluIG9iamVjdCBhY3Rpb25zIHVzaW5nIHRoaXMgbWV0aG9kLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uIEEgcGxhaW4gb2JqZWN0IHJlcHJlc2VudGluZyDigJx3aGF0IGNoYW5nZWTigJ0uIEl0IGlzXG4gICAqIGEgZ29vZCBpZGVhIHRvIGtlZXAgYWN0aW9ucyBzZXJpYWxpemFibGUgc28geW91IGNhbiByZWNvcmQgYW5kIHJlcGxheSB1c2VyXG4gICAqIHNlc3Npb25zLCBvciB1c2UgdGhlIHRpbWUgdHJhdmVsbGluZyBgcmVkdXgtZGV2dG9vbHNgLiBBbiBhY3Rpb24gbXVzdCBoYXZlXG4gICAqIGEgYHR5cGVgIHByb3BlcnR5IHdoaWNoIG1heSBub3QgYmUgYHVuZGVmaW5lZGAuIEl0IGlzIGEgZ29vZCBpZGVhIHRvIHVzZVxuICAgKiBzdHJpbmcgY29uc3RhbnRzIGZvciBhY3Rpb24gdHlwZXMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEZvciBjb252ZW5pZW5jZSwgdGhlIHNhbWUgYWN0aW9uIG9iamVjdCB5b3UgZGlzcGF0Y2hlZC5cbiAgICpcbiAgICogTm90ZSB0aGF0LCBpZiB5b3UgdXNlIGEgY3VzdG9tIG1pZGRsZXdhcmUsIGl0IG1heSB3cmFwIGBkaXNwYXRjaCgpYCB0b1xuICAgKiByZXR1cm4gc29tZXRoaW5nIGVsc2UgKGZvciBleGFtcGxlLCBhIFByb21pc2UgeW91IGNhbiBhd2FpdCkuXG4gICAqL1xuICBmdW5jdGlvbiBkaXNwYXRjaChhY3Rpb24pIHtcbiAgICBpZiAoIWlzUGxhaW5PYmplY3QoYWN0aW9uKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBY3Rpb25zIG11c3QgYmUgcGxhaW4gb2JqZWN0cy4gJyArICdVc2UgY3VzdG9tIG1pZGRsZXdhcmUgZm9yIGFzeW5jIGFjdGlvbnMuJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBhY3Rpb24udHlwZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQWN0aW9ucyBtYXkgbm90IGhhdmUgYW4gdW5kZWZpbmVkIFwidHlwZVwiIHByb3BlcnR5LiAnICsgJ0hhdmUgeW91IG1pc3NwZWxsZWQgYSBjb25zdGFudD8nKTtcbiAgICB9XG5cbiAgICBpZiAoaXNEaXNwYXRjaGluZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWR1Y2VycyBtYXkgbm90IGRpc3BhdGNoIGFjdGlvbnMuJyk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGlzRGlzcGF0Y2hpbmcgPSB0cnVlO1xuICAgICAgY3VycmVudFN0YXRlID0gY3VycmVudFJlZHVjZXIoY3VycmVudFN0YXRlLCBhY3Rpb24pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpc0Rpc3BhdGNoaW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGxpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnMgPSBuZXh0TGlzdGVuZXJzO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV07XG4gICAgICBsaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIHJldHVybiBhY3Rpb247XG4gIH1cblxuICAvKipcbiAgICogUmVwbGFjZXMgdGhlIHJlZHVjZXIgY3VycmVudGx5IHVzZWQgYnkgdGhlIHN0b3JlIHRvIGNhbGN1bGF0ZSB0aGUgc3RhdGUuXG4gICAqXG4gICAqIFlvdSBtaWdodCBuZWVkIHRoaXMgaWYgeW91ciBhcHAgaW1wbGVtZW50cyBjb2RlIHNwbGl0dGluZyBhbmQgeW91IHdhbnQgdG9cbiAgICogbG9hZCBzb21lIG9mIHRoZSByZWR1Y2VycyBkeW5hbWljYWxseS4gWW91IG1pZ2h0IGFsc28gbmVlZCB0aGlzIGlmIHlvdVxuICAgKiBpbXBsZW1lbnQgYSBob3QgcmVsb2FkaW5nIG1lY2hhbmlzbSBmb3IgUmVkdXguXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG5leHRSZWR1Y2VyIFRoZSByZWR1Y2VyIGZvciB0aGUgc3RvcmUgdG8gdXNlIGluc3RlYWQuXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgZnVuY3Rpb24gcmVwbGFjZVJlZHVjZXIobmV4dFJlZHVjZXIpIHtcbiAgICBpZiAodHlwZW9mIG5leHRSZWR1Y2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSBuZXh0UmVkdWNlciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGN1cnJlbnRSZWR1Y2VyID0gbmV4dFJlZHVjZXI7XG4gICAgZGlzcGF0Y2goeyB0eXBlOiBBY3Rpb25UeXBlcy5JTklUIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyb3BlcmFiaWxpdHkgcG9pbnQgZm9yIG9ic2VydmFibGUvcmVhY3RpdmUgbGlicmFyaWVzLlxuICAgKiBAcmV0dXJucyB7b2JzZXJ2YWJsZX0gQSBtaW5pbWFsIG9ic2VydmFibGUgb2Ygc3RhdGUgY2hhbmdlcy5cbiAgICogRm9yIG1vcmUgaW5mb3JtYXRpb24sIHNlZSB0aGUgb2JzZXJ2YWJsZSBwcm9wb3NhbDpcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtb2JzZXJ2YWJsZVxuICAgKi9cbiAgZnVuY3Rpb24gb2JzZXJ2YWJsZSgpIHtcbiAgICB2YXIgX3JlZjtcblxuICAgIHZhciBvdXRlclN1YnNjcmliZSA9IHN1YnNjcmliZTtcbiAgICByZXR1cm4gX3JlZiA9IHtcbiAgICAgIC8qKlxuICAgICAgICogVGhlIG1pbmltYWwgb2JzZXJ2YWJsZSBzdWJzY3JpcHRpb24gbWV0aG9kLlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9ic2VydmVyIEFueSBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCBhcyBhbiBvYnNlcnZlci5cbiAgICAgICAqIFRoZSBvYnNlcnZlciBvYmplY3Qgc2hvdWxkIGhhdmUgYSBgbmV4dGAgbWV0aG9kLlxuICAgICAgICogQHJldHVybnMge3N1YnNjcmlwdGlvbn0gQW4gb2JqZWN0IHdpdGggYW4gYHVuc3Vic2NyaWJlYCBtZXRob2QgdGhhdCBjYW5cbiAgICAgICAqIGJlIHVzZWQgdG8gdW5zdWJzY3JpYmUgdGhlIG9ic2VydmFibGUgZnJvbSB0aGUgc3RvcmUsIGFuZCBwcmV2ZW50IGZ1cnRoZXJcbiAgICAgICAqIGVtaXNzaW9uIG9mIHZhbHVlcyBmcm9tIHRoZSBvYnNlcnZhYmxlLlxuICAgICAgICovXG4gICAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uIHN1YnNjcmliZShvYnNlcnZlcikge1xuICAgICAgICBpZiAodHlwZW9mIG9ic2VydmVyICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHRoZSBvYnNlcnZlciB0byBiZSBhbiBvYmplY3QuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBvYnNlcnZlU3RhdGUoKSB7XG4gICAgICAgICAgaWYgKG9ic2VydmVyLm5leHQpIHtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoZ2V0U3RhdGUoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgb2JzZXJ2ZVN0YXRlKCk7XG4gICAgICAgIHZhciB1bnN1YnNjcmliZSA9IG91dGVyU3Vic2NyaWJlKG9ic2VydmVTdGF0ZSk7XG4gICAgICAgIHJldHVybiB7IHVuc3Vic2NyaWJlOiB1bnN1YnNjcmliZSB9O1xuICAgICAgfVxuICAgIH0sIF9yZWZbJCRvYnNlcnZhYmxlXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sIF9yZWY7XG4gIH1cblxuICAvLyBXaGVuIGEgc3RvcmUgaXMgY3JlYXRlZCwgYW4gXCJJTklUXCIgYWN0aW9uIGlzIGRpc3BhdGNoZWQgc28gdGhhdCBldmVyeVxuICAvLyByZWR1Y2VyIHJldHVybnMgdGhlaXIgaW5pdGlhbCBzdGF0ZS4gVGhpcyBlZmZlY3RpdmVseSBwb3B1bGF0ZXNcbiAgLy8gdGhlIGluaXRpYWwgc3RhdGUgdHJlZS5cbiAgZGlzcGF0Y2goeyB0eXBlOiBBY3Rpb25UeXBlcy5JTklUIH0pO1xuXG4gIHJldHVybiBfcmVmMiA9IHtcbiAgICBkaXNwYXRjaDogZGlzcGF0Y2gsXG4gICAgc3Vic2NyaWJlOiBzdWJzY3JpYmUsXG4gICAgZ2V0U3RhdGU6IGdldFN0YXRlLFxuICAgIHJlcGxhY2VSZWR1Y2VyOiByZXBsYWNlUmVkdWNlclxuICB9LCBfcmVmMlskJG9ic2VydmFibGVdID0gb2JzZXJ2YWJsZSwgX3JlZjI7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2NyZWF0ZVN0b3JlLmpzIiwiaW1wb3J0IGJhc2VHZXRUYWcgZnJvbSAnLi9fYmFzZUdldFRhZy5qcyc7XG5pbXBvcnQgZ2V0UHJvdG90eXBlIGZyb20gJy4vX2dldFByb3RvdHlwZS5qcyc7XG5pbXBvcnQgaXNPYmplY3RMaWtlIGZyb20gJy4vaXNPYmplY3RMaWtlLmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gaW5mZXIgdGhlIGBPYmplY3RgIGNvbnN0cnVjdG9yLiAqL1xudmFyIG9iamVjdEN0b3JTdHJpbmcgPSBmdW5jVG9TdHJpbmcuY2FsbChPYmplY3QpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCB0aGF0IGlzLCBhbiBvYmplY3QgY3JlYXRlZCBieSB0aGVcbiAqIGBPYmplY3RgIGNvbnN0cnVjdG9yIG9yIG9uZSB3aXRoIGEgYFtbUHJvdG90eXBlXV1gIG9mIGBudWxsYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuOC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiB9XG4gKlxuICogXy5pc1BsYWluT2JqZWN0KG5ldyBGb28pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KHsgJ3gnOiAwLCAneSc6IDAgfSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3RMaWtlKHZhbHVlKSB8fCBiYXNlR2V0VGFnKHZhbHVlKSAhPSBvYmplY3RUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHByb3RvID0gZ2V0UHJvdG90eXBlKHZhbHVlKTtcbiAgaWYgKHByb3RvID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIEN0b3IgPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3RvLCAnY29uc3RydWN0b3InKSAmJiBwcm90by5jb25zdHJ1Y3RvcjtcbiAgcmV0dXJuIHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3RvciBpbnN0YW5jZW9mIEN0b3IgJiZcbiAgICBmdW5jVG9TdHJpbmcuY2FsbChDdG9yKSA9PSBvYmplY3RDdG9yU3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc1BsYWluT2JqZWN0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc1BsYWluT2JqZWN0LmpzIiwiaW1wb3J0IHJvb3QgZnJvbSAnLi9fcm9vdC5qcyc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5leHBvcnQgZGVmYXVsdCBTeW1ib2w7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19TeW1ib2wuanMiLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2goZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcclxuXHRcdGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwiLyoqXG4gKiBQcmludHMgYSB3YXJuaW5nIGluIHRoZSBjb25zb2xlIGlmIGl0IGV4aXN0cy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBUaGUgd2FybmluZyBtZXNzYWdlLlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdhcm5pbmcobWVzc2FnZSkge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGNvbnNvbGUuZXJyb3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICB9XG4gIC8qIGVzbGludC1lbmFibGUgbm8tY29uc29sZSAqL1xuICB0cnkge1xuICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgaWYgeW91IGVuYWJsZVxuICAgIC8vIFwiYnJlYWsgb24gYWxsIGV4Y2VwdGlvbnNcIiBpbiB5b3VyIGNvbnNvbGUsXG4gICAgLy8gaXQgd291bGQgcGF1c2UgdGhlIGV4ZWN1dGlvbiBhdCB0aGlzIGxpbmUuXG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWVtcHR5ICovXG4gIH0gY2F0Y2ggKGUpIHt9XG4gIC8qIGVzbGludC1lbmFibGUgbm8tZW1wdHkgKi9cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvdXRpbHMvd2FybmluZy5qcyIsIi8qKlxuICogQ29tcG9zZXMgc2luZ2xlLWFyZ3VtZW50IGZ1bmN0aW9ucyBmcm9tIHJpZ2h0IHRvIGxlZnQuIFRoZSByaWdodG1vc3RcbiAqIGZ1bmN0aW9uIGNhbiB0YWtlIG11bHRpcGxlIGFyZ3VtZW50cyBhcyBpdCBwcm92aWRlcyB0aGUgc2lnbmF0dXJlIGZvclxuICogdGhlIHJlc3VsdGluZyBjb21wb3NpdGUgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gZnVuY3MgVGhlIGZ1bmN0aW9ucyB0byBjb21wb3NlLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIG9idGFpbmVkIGJ5IGNvbXBvc2luZyB0aGUgYXJndW1lbnQgZnVuY3Rpb25zXG4gKiBmcm9tIHJpZ2h0IHRvIGxlZnQuIEZvciBleGFtcGxlLCBjb21wb3NlKGYsIGcsIGgpIGlzIGlkZW50aWNhbCB0byBkb2luZ1xuICogKC4uLmFyZ3MpID0+IGYoZyhoKC4uLmFyZ3MpKSkuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tcG9zZSgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGZ1bmNzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgZnVuY3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICBpZiAoZnVuY3MubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgIHJldHVybiBhcmc7XG4gICAgfTtcbiAgfVxuXG4gIGlmIChmdW5jcy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gZnVuY3NbMF07XG4gIH1cblxuICByZXR1cm4gZnVuY3MucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBhKGIuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpKTtcbiAgICB9O1xuICB9KTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvY29tcG9zZS5qcyIsIi8qKlxuICogQGZpbGVcbiAqIERydXBhbCBSZWR1eCBBUEkuXG4gKi9cblxuaW1wb3J0IERydXBhbFJlZHV4IGZyb20gJy4vbGliJztcblxuKChEcnVwYWwpID0+IHtcbiAgRHJ1cGFsLlJlZHV4ID0gbmV3IERydXBhbFJlZHV4KCk7XG59KShEcnVwYWwpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwiaW1wb3J0IHsgY3JlYXRlU3RvcmUgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBsb2FkU3RhdGUsIHNhdmVTdGF0ZSB9IGZyb20gJy4vbG9jYWxTdG9yYWdlJztcbmltcG9ydCBvYmplY3REaWN0aW9uYXJ5IGZyb20gJy4vcmVkdWNlcnMnO1xuXG5pbXBvcnQgeyBhZGQgfSBmcm9tICcuL2FjdGlvbnMnO1xuXG5jb25zdCBEcnVwYWxSZWR1eCA9IGNsYXNzIERydXBhbFJlZHV4IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zdG9yZSA9IGNyZWF0ZVN0b3JlKG9iamVjdERpY3Rpb25hcnksIGxvYWRTdGF0ZSgpKTtcblxuICAgIHRoaXMuc3RvcmUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHNhdmVTdGF0ZSh0aGlzLnN0b3JlLmdldFN0YXRlKCkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5hY3Rpb25zID0geyBhZGQgfTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgRHJ1cGFsUmVkdXg7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbGliL2luZGV4LmpzIiwiaW1wb3J0IGNyZWF0ZVN0b3JlIGZyb20gJy4vY3JlYXRlU3RvcmUnO1xuaW1wb3J0IGNvbWJpbmVSZWR1Y2VycyBmcm9tICcuL2NvbWJpbmVSZWR1Y2Vycyc7XG5pbXBvcnQgYmluZEFjdGlvbkNyZWF0b3JzIGZyb20gJy4vYmluZEFjdGlvbkNyZWF0b3JzJztcbmltcG9ydCBhcHBseU1pZGRsZXdhcmUgZnJvbSAnLi9hcHBseU1pZGRsZXdhcmUnO1xuaW1wb3J0IGNvbXBvc2UgZnJvbSAnLi9jb21wb3NlJztcbmltcG9ydCB3YXJuaW5nIGZyb20gJy4vdXRpbHMvd2FybmluZyc7XG5cbi8qXG4qIFRoaXMgaXMgYSBkdW1teSBmdW5jdGlvbiB0byBjaGVjayBpZiB0aGUgZnVuY3Rpb24gbmFtZSBoYXMgYmVlbiBhbHRlcmVkIGJ5IG1pbmlmaWNhdGlvbi5cbiogSWYgdGhlIGZ1bmN0aW9uIGhhcyBiZWVuIG1pbmlmaWVkIGFuZCBOT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nLCB3YXJuIHRoZSB1c2VyLlxuKi9cbmZ1bmN0aW9uIGlzQ3J1c2hlZCgpIHt9XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHR5cGVvZiBpc0NydXNoZWQubmFtZSA9PT0gJ3N0cmluZycgJiYgaXNDcnVzaGVkLm5hbWUgIT09ICdpc0NydXNoZWQnKSB7XG4gIHdhcm5pbmcoJ1lvdSBhcmUgY3VycmVudGx5IHVzaW5nIG1pbmlmaWVkIGNvZGUgb3V0c2lkZSBvZiBOT0RFX0VOViA9PT0gXFwncHJvZHVjdGlvblxcJy4gJyArICdUaGlzIG1lYW5zIHRoYXQgeW91IGFyZSBydW5uaW5nIGEgc2xvd2VyIGRldmVsb3BtZW50IGJ1aWxkIG9mIFJlZHV4LiAnICsgJ1lvdSBjYW4gdXNlIGxvb3NlLWVudmlmeSAoaHR0cHM6Ly9naXRodWIuY29tL3plcnRvc2gvbG9vc2UtZW52aWZ5KSBmb3IgYnJvd3NlcmlmeSAnICsgJ29yIERlZmluZVBsdWdpbiBmb3Igd2VicGFjayAoaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zMDAzMDAzMSkgJyArICd0byBlbnN1cmUgeW91IGhhdmUgdGhlIGNvcnJlY3QgY29kZSBmb3IgeW91ciBwcm9kdWN0aW9uIGJ1aWxkLicpO1xufVxuXG5leHBvcnQgeyBjcmVhdGVTdG9yZSwgY29tYmluZVJlZHVjZXJzLCBiaW5kQWN0aW9uQ3JlYXRvcnMsIGFwcGx5TWlkZGxld2FyZSwgY29tcG9zZSB9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9pbmRleC5qcyIsImltcG9ydCBTeW1ib2wgZnJvbSAnLi9fU3ltYm9sLmpzJztcbmltcG9ydCBnZXRSYXdUYWcgZnJvbSAnLi9fZ2V0UmF3VGFnLmpzJztcbmltcG9ydCBvYmplY3RUb1N0cmluZyBmcm9tICcuL19vYmplY3RUb1N0cmluZy5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nLFxuICAgIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgcmV0dXJuIChzeW1Ub1N0cmluZ1RhZyAmJiBzeW1Ub1N0cmluZ1RhZyBpbiBPYmplY3QodmFsdWUpKVxuICAgID8gZ2V0UmF3VGFnKHZhbHVlKVxuICAgIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlR2V0VGFnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUdldFRhZy5qcyIsImltcG9ydCBmcmVlR2xvYmFsIGZyb20gJy4vX2ZyZWVHbG9iYWwuanMnO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvb3Q7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19yb290LmpzIiwiLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuZXhwb3J0IGRlZmF1bHQgZnJlZUdsb2JhbDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2ZyZWVHbG9iYWwuanMiLCJpbXBvcnQgU3ltYm9sIGZyb20gJy4vX1N5bWJvbC5qcyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VHZXRUYWdgIHdoaWNoIGlnbm9yZXMgYFN5bWJvbC50b1N0cmluZ1RhZ2AgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHJhdyBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBnZXRSYXdUYWcodmFsdWUpIHtcbiAgdmFyIGlzT3duID0gaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgc3ltVG9TdHJpbmdUYWcpLFxuICAgICAgdGFnID0gdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuXG4gIHRyeSB7XG4gICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdW5kZWZpbmVkO1xuICAgIHZhciB1bm1hc2tlZCA9IHRydWU7XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgdmFyIHJlc3VsdCA9IG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICBpZiAodW5tYXNrZWQpIHtcbiAgICBpZiAoaXNPd24pIHtcbiAgICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHRhZztcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0UmF3VGFnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0UmF3VGFnLmpzIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyB1c2luZyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG9iamVjdFRvU3RyaW5nO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb2JqZWN0VG9TdHJpbmcuanMiLCJpbXBvcnQgb3ZlckFyZyBmcm9tICcuL19vdmVyQXJnLmpzJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgZ2V0UHJvdG90eXBlID0gb3ZlckFyZyhPYmplY3QuZ2V0UHJvdG90eXBlT2YsIE9iamVjdCk7XG5cbmV4cG9ydCBkZWZhdWx0IGdldFByb3RvdHlwZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldFByb3RvdHlwZS5qcyIsIi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBvdmVyQXJnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb3ZlckFyZy5qcyIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc09iamVjdExpa2U7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzT2JqZWN0TGlrZS5qcyIsIi8qIGdsb2JhbCB3aW5kb3cgKi9cbmltcG9ydCBwb255ZmlsbCBmcm9tICcuL3BvbnlmaWxsLmpzJztcblxudmFyIHJvb3Q7XG5cbmlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IHNlbGY7XG59IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSBnbG9iYWw7XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSBtb2R1bGU7XG59IGVsc2Uge1xuICByb290ID0gRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbn1cblxudmFyIHJlc3VsdCA9IHBvbnlmaWxsKHJvb3QpO1xuZXhwb3J0IGRlZmF1bHQgcmVzdWx0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2VzL2luZGV4LmpzIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvcmlnaW5hbE1vZHVsZSkge1xyXG5cdGlmKCFvcmlnaW5hbE1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcclxuXHRcdHZhciBtb2R1bGUgPSBPYmplY3QuY3JlYXRlKG9yaWdpbmFsTW9kdWxlKTtcclxuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxyXG5cdFx0aWYoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImV4cG9ydHNcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0fSk7XHJcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcclxuXHR9XHJcblx0cmV0dXJuIG1vZHVsZTtcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vICh3ZWJwYWNrKS9idWlsZGluL2hhcm1vbnktbW9kdWxlLmpzIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3ltYm9sT2JzZXJ2YWJsZVBvbnlmaWxsKHJvb3QpIHtcblx0dmFyIHJlc3VsdDtcblx0dmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5cdGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0aWYgKFN5bWJvbC5vYnNlcnZhYmxlKSB7XG5cdFx0XHRyZXN1bHQgPSBTeW1ib2wub2JzZXJ2YWJsZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0ID0gU3ltYm9sKCdvYnNlcnZhYmxlJyk7XG5cdFx0XHRTeW1ib2wub2JzZXJ2YWJsZSA9IHJlc3VsdDtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0cmVzdWx0ID0gJ0BAb2JzZXJ2YWJsZSc7XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9zeW1ib2wtb2JzZXJ2YWJsZS9lcy9wb255ZmlsbC5qcyIsImltcG9ydCB7IEFjdGlvblR5cGVzIH0gZnJvbSAnLi9jcmVhdGVTdG9yZSc7XG5pbXBvcnQgaXNQbGFpbk9iamVjdCBmcm9tICdsb2Rhc2gtZXMvaXNQbGFpbk9iamVjdCc7XG5pbXBvcnQgd2FybmluZyBmcm9tICcuL3V0aWxzL3dhcm5pbmcnO1xuXG5mdW5jdGlvbiBnZXRVbmRlZmluZWRTdGF0ZUVycm9yTWVzc2FnZShrZXksIGFjdGlvbikge1xuICB2YXIgYWN0aW9uVHlwZSA9IGFjdGlvbiAmJiBhY3Rpb24udHlwZTtcbiAgdmFyIGFjdGlvbk5hbWUgPSBhY3Rpb25UeXBlICYmICdcIicgKyBhY3Rpb25UeXBlLnRvU3RyaW5nKCkgKyAnXCInIHx8ICdhbiBhY3Rpb24nO1xuXG4gIHJldHVybiAnR2l2ZW4gYWN0aW9uICcgKyBhY3Rpb25OYW1lICsgJywgcmVkdWNlciBcIicgKyBrZXkgKyAnXCIgcmV0dXJuZWQgdW5kZWZpbmVkLiAnICsgJ1RvIGlnbm9yZSBhbiBhY3Rpb24sIHlvdSBtdXN0IGV4cGxpY2l0bHkgcmV0dXJuIHRoZSBwcmV2aW91cyBzdGF0ZS4gJyArICdJZiB5b3Ugd2FudCB0aGlzIHJlZHVjZXIgdG8gaG9sZCBubyB2YWx1ZSwgeW91IGNhbiByZXR1cm4gbnVsbCBpbnN0ZWFkIG9mIHVuZGVmaW5lZC4nO1xufVxuXG5mdW5jdGlvbiBnZXRVbmV4cGVjdGVkU3RhdGVTaGFwZVdhcm5pbmdNZXNzYWdlKGlucHV0U3RhdGUsIHJlZHVjZXJzLCBhY3Rpb24sIHVuZXhwZWN0ZWRLZXlDYWNoZSkge1xuICB2YXIgcmVkdWNlcktleXMgPSBPYmplY3Qua2V5cyhyZWR1Y2Vycyk7XG4gIHZhciBhcmd1bWVudE5hbWUgPSBhY3Rpb24gJiYgYWN0aW9uLnR5cGUgPT09IEFjdGlvblR5cGVzLklOSVQgPyAncHJlbG9hZGVkU3RhdGUgYXJndW1lbnQgcGFzc2VkIHRvIGNyZWF0ZVN0b3JlJyA6ICdwcmV2aW91cyBzdGF0ZSByZWNlaXZlZCBieSB0aGUgcmVkdWNlcic7XG5cbiAgaWYgKHJlZHVjZXJLZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiAnU3RvcmUgZG9lcyBub3QgaGF2ZSBhIHZhbGlkIHJlZHVjZXIuIE1ha2Ugc3VyZSB0aGUgYXJndW1lbnQgcGFzc2VkICcgKyAndG8gY29tYmluZVJlZHVjZXJzIGlzIGFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIHJlZHVjZXJzLic7XG4gIH1cblxuICBpZiAoIWlzUGxhaW5PYmplY3QoaW5wdXRTdGF0ZSkpIHtcbiAgICByZXR1cm4gJ1RoZSAnICsgYXJndW1lbnROYW1lICsgJyBoYXMgdW5leHBlY3RlZCB0eXBlIG9mIFwiJyArIHt9LnRvU3RyaW5nLmNhbGwoaW5wdXRTdGF0ZSkubWF0Y2goL1xccyhbYS16fEEtWl0rKS8pWzFdICsgJ1wiLiBFeHBlY3RlZCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nICcgKyAoJ2tleXM6IFwiJyArIHJlZHVjZXJLZXlzLmpvaW4oJ1wiLCBcIicpICsgJ1wiJyk7XG4gIH1cblxuICB2YXIgdW5leHBlY3RlZEtleXMgPSBPYmplY3Qua2V5cyhpbnB1dFN0YXRlKS5maWx0ZXIoZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiAhcmVkdWNlcnMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAhdW5leHBlY3RlZEtleUNhY2hlW2tleV07XG4gIH0pO1xuXG4gIHVuZXhwZWN0ZWRLZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHVuZXhwZWN0ZWRLZXlDYWNoZVtrZXldID0gdHJ1ZTtcbiAgfSk7XG5cbiAgaWYgKHVuZXhwZWN0ZWRLZXlzLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gJ1VuZXhwZWN0ZWQgJyArICh1bmV4cGVjdGVkS2V5cy5sZW5ndGggPiAxID8gJ2tleXMnIDogJ2tleScpICsgJyAnICsgKCdcIicgKyB1bmV4cGVjdGVkS2V5cy5qb2luKCdcIiwgXCInKSArICdcIiBmb3VuZCBpbiAnICsgYXJndW1lbnROYW1lICsgJy4gJykgKyAnRXhwZWN0ZWQgdG8gZmluZCBvbmUgb2YgdGhlIGtub3duIHJlZHVjZXIga2V5cyBpbnN0ZWFkOiAnICsgKCdcIicgKyByZWR1Y2VyS2V5cy5qb2luKCdcIiwgXCInKSArICdcIi4gVW5leHBlY3RlZCBrZXlzIHdpbGwgYmUgaWdub3JlZC4nKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhc3NlcnRSZWR1Y2VyU2hhcGUocmVkdWNlcnMpIHtcbiAgT2JqZWN0LmtleXMocmVkdWNlcnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHZhciByZWR1Y2VyID0gcmVkdWNlcnNba2V5XTtcbiAgICB2YXIgaW5pdGlhbFN0YXRlID0gcmVkdWNlcih1bmRlZmluZWQsIHsgdHlwZTogQWN0aW9uVHlwZXMuSU5JVCB9KTtcblxuICAgIGlmICh0eXBlb2YgaW5pdGlhbFN0YXRlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWR1Y2VyIFwiJyArIGtleSArICdcIiByZXR1cm5lZCB1bmRlZmluZWQgZHVyaW5nIGluaXRpYWxpemF0aW9uLiAnICsgJ0lmIHRoZSBzdGF0ZSBwYXNzZWQgdG8gdGhlIHJlZHVjZXIgaXMgdW5kZWZpbmVkLCB5b3UgbXVzdCAnICsgJ2V4cGxpY2l0bHkgcmV0dXJuIHRoZSBpbml0aWFsIHN0YXRlLiBUaGUgaW5pdGlhbCBzdGF0ZSBtYXkgJyArICdub3QgYmUgdW5kZWZpbmVkLiBJZiB5b3UgZG9uXFwndCB3YW50IHRvIHNldCBhIHZhbHVlIGZvciB0aGlzIHJlZHVjZXIsICcgKyAneW91IGNhbiB1c2UgbnVsbCBpbnN0ZWFkIG9mIHVuZGVmaW5lZC4nKTtcbiAgICB9XG5cbiAgICB2YXIgdHlwZSA9ICdAQHJlZHV4L1BST0JFX1VOS05PV05fQUNUSU9OXycgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoNykuc3BsaXQoJycpLmpvaW4oJy4nKTtcbiAgICBpZiAodHlwZW9mIHJlZHVjZXIodW5kZWZpbmVkLCB7IHR5cGU6IHR5cGUgfSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZHVjZXIgXCInICsga2V5ICsgJ1wiIHJldHVybmVkIHVuZGVmaW5lZCB3aGVuIHByb2JlZCB3aXRoIGEgcmFuZG9tIHR5cGUuICcgKyAoJ0RvblxcJ3QgdHJ5IHRvIGhhbmRsZSAnICsgQWN0aW9uVHlwZXMuSU5JVCArICcgb3Igb3RoZXIgYWN0aW9ucyBpbiBcInJlZHV4LypcIiAnKSArICduYW1lc3BhY2UuIFRoZXkgYXJlIGNvbnNpZGVyZWQgcHJpdmF0ZS4gSW5zdGVhZCwgeW91IG11c3QgcmV0dXJuIHRoZSAnICsgJ2N1cnJlbnQgc3RhdGUgZm9yIGFueSB1bmtub3duIGFjdGlvbnMsIHVubGVzcyBpdCBpcyB1bmRlZmluZWQsICcgKyAnaW4gd2hpY2ggY2FzZSB5b3UgbXVzdCByZXR1cm4gdGhlIGluaXRpYWwgc3RhdGUsIHJlZ2FyZGxlc3Mgb2YgdGhlICcgKyAnYWN0aW9uIHR5cGUuIFRoZSBpbml0aWFsIHN0YXRlIG1heSBub3QgYmUgdW5kZWZpbmVkLCBidXQgY2FuIGJlIG51bGwuJyk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBUdXJucyBhbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSBkaWZmZXJlbnQgcmVkdWNlciBmdW5jdGlvbnMsIGludG8gYSBzaW5nbGVcbiAqIHJlZHVjZXIgZnVuY3Rpb24uIEl0IHdpbGwgY2FsbCBldmVyeSBjaGlsZCByZWR1Y2VyLCBhbmQgZ2F0aGVyIHRoZWlyIHJlc3VsdHNcbiAqIGludG8gYSBzaW5nbGUgc3RhdGUgb2JqZWN0LCB3aG9zZSBrZXlzIGNvcnJlc3BvbmQgdG8gdGhlIGtleXMgb2YgdGhlIHBhc3NlZFxuICogcmVkdWNlciBmdW5jdGlvbnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHJlZHVjZXJzIEFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgY29ycmVzcG9uZCB0byBkaWZmZXJlbnRcbiAqIHJlZHVjZXIgZnVuY3Rpb25zIHRoYXQgbmVlZCB0byBiZSBjb21iaW5lZCBpbnRvIG9uZS4gT25lIGhhbmR5IHdheSB0byBvYnRhaW5cbiAqIGl0IGlzIHRvIHVzZSBFUzYgYGltcG9ydCAqIGFzIHJlZHVjZXJzYCBzeW50YXguIFRoZSByZWR1Y2VycyBtYXkgbmV2ZXIgcmV0dXJuXG4gKiB1bmRlZmluZWQgZm9yIGFueSBhY3Rpb24uIEluc3RlYWQsIHRoZXkgc2hvdWxkIHJldHVybiB0aGVpciBpbml0aWFsIHN0YXRlXG4gKiBpZiB0aGUgc3RhdGUgcGFzc2VkIHRvIHRoZW0gd2FzIHVuZGVmaW5lZCwgYW5kIHRoZSBjdXJyZW50IHN0YXRlIGZvciBhbnlcbiAqIHVucmVjb2duaXplZCBhY3Rpb24uXG4gKlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIHJlZHVjZXIgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGV2ZXJ5IHJlZHVjZXIgaW5zaWRlIHRoZVxuICogcGFzc2VkIG9iamVjdCwgYW5kIGJ1aWxkcyBhIHN0YXRlIG9iamVjdCB3aXRoIHRoZSBzYW1lIHNoYXBlLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21iaW5lUmVkdWNlcnMocmVkdWNlcnMpIHtcbiAgdmFyIHJlZHVjZXJLZXlzID0gT2JqZWN0LmtleXMocmVkdWNlcnMpO1xuICB2YXIgZmluYWxSZWR1Y2VycyA9IHt9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJlZHVjZXJLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IHJlZHVjZXJLZXlzW2ldO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmICh0eXBlb2YgcmVkdWNlcnNba2V5XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgd2FybmluZygnTm8gcmVkdWNlciBwcm92aWRlZCBmb3Iga2V5IFwiJyArIGtleSArICdcIicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcmVkdWNlcnNba2V5XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZmluYWxSZWR1Y2Vyc1trZXldID0gcmVkdWNlcnNba2V5XTtcbiAgICB9XG4gIH1cbiAgdmFyIGZpbmFsUmVkdWNlcktleXMgPSBPYmplY3Qua2V5cyhmaW5hbFJlZHVjZXJzKTtcblxuICB2YXIgdW5leHBlY3RlZEtleUNhY2hlID0gdm9pZCAwO1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHVuZXhwZWN0ZWRLZXlDYWNoZSA9IHt9O1xuICB9XG5cbiAgdmFyIHNoYXBlQXNzZXJ0aW9uRXJyb3IgPSB2b2lkIDA7XG4gIHRyeSB7XG4gICAgYXNzZXJ0UmVkdWNlclNoYXBlKGZpbmFsUmVkdWNlcnMpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgc2hhcGVBc3NlcnRpb25FcnJvciA9IGU7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gY29tYmluYXRpb24oKSB7XG4gICAgdmFyIHN0YXRlID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgICB2YXIgYWN0aW9uID0gYXJndW1lbnRzWzFdO1xuXG4gICAgaWYgKHNoYXBlQXNzZXJ0aW9uRXJyb3IpIHtcbiAgICAgIHRocm93IHNoYXBlQXNzZXJ0aW9uRXJyb3I7XG4gICAgfVxuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciB3YXJuaW5nTWVzc2FnZSA9IGdldFVuZXhwZWN0ZWRTdGF0ZVNoYXBlV2FybmluZ01lc3NhZ2Uoc3RhdGUsIGZpbmFsUmVkdWNlcnMsIGFjdGlvbiwgdW5leHBlY3RlZEtleUNhY2hlKTtcbiAgICAgIGlmICh3YXJuaW5nTWVzc2FnZSkge1xuICAgICAgICB3YXJuaW5nKHdhcm5pbmdNZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgaGFzQ2hhbmdlZCA9IGZhbHNlO1xuICAgIHZhciBuZXh0U3RhdGUgPSB7fTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgZmluYWxSZWR1Y2VyS2V5cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfa2V5ID0gZmluYWxSZWR1Y2VyS2V5c1tfaV07XG4gICAgICB2YXIgcmVkdWNlciA9IGZpbmFsUmVkdWNlcnNbX2tleV07XG4gICAgICB2YXIgcHJldmlvdXNTdGF0ZUZvcktleSA9IHN0YXRlW19rZXldO1xuICAgICAgdmFyIG5leHRTdGF0ZUZvcktleSA9IHJlZHVjZXIocHJldmlvdXNTdGF0ZUZvcktleSwgYWN0aW9uKTtcbiAgICAgIGlmICh0eXBlb2YgbmV4dFN0YXRlRm9yS2V5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gZ2V0VW5kZWZpbmVkU3RhdGVFcnJvck1lc3NhZ2UoX2tleSwgYWN0aW9uKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgICB9XG4gICAgICBuZXh0U3RhdGVbX2tleV0gPSBuZXh0U3RhdGVGb3JLZXk7XG4gICAgICBoYXNDaGFuZ2VkID0gaGFzQ2hhbmdlZCB8fCBuZXh0U3RhdGVGb3JLZXkgIT09IHByZXZpb3VzU3RhdGVGb3JLZXk7XG4gICAgfVxuICAgIHJldHVybiBoYXNDaGFuZ2VkID8gbmV4dFN0YXRlIDogc3RhdGU7XG4gIH07XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2NvbWJpbmVSZWR1Y2Vycy5qcyIsImZ1bmN0aW9uIGJpbmRBY3Rpb25DcmVhdG9yKGFjdGlvbkNyZWF0b3IsIGRpc3BhdGNoKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRpc3BhdGNoKGFjdGlvbkNyZWF0b3IuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBUdXJucyBhbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSBhY3Rpb24gY3JlYXRvcnMsIGludG8gYW4gb2JqZWN0IHdpdGggdGhlXG4gKiBzYW1lIGtleXMsIGJ1dCB3aXRoIGV2ZXJ5IGZ1bmN0aW9uIHdyYXBwZWQgaW50byBhIGBkaXNwYXRjaGAgY2FsbCBzbyB0aGV5XG4gKiBtYXkgYmUgaW52b2tlZCBkaXJlY3RseS4gVGhpcyBpcyBqdXN0IGEgY29udmVuaWVuY2UgbWV0aG9kLCBhcyB5b3UgY2FuIGNhbGxcbiAqIGBzdG9yZS5kaXNwYXRjaChNeUFjdGlvbkNyZWF0b3JzLmRvU29tZXRoaW5nKCkpYCB5b3Vyc2VsZiBqdXN0IGZpbmUuXG4gKlxuICogRm9yIGNvbnZlbmllbmNlLCB5b3UgY2FuIGFsc28gcGFzcyBhIHNpbmdsZSBmdW5jdGlvbiBhcyB0aGUgZmlyc3QgYXJndW1lbnQsXG4gKiBhbmQgZ2V0IGEgZnVuY3Rpb24gaW4gcmV0dXJuLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb258T2JqZWN0fSBhY3Rpb25DcmVhdG9ycyBBbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSBhY3Rpb25cbiAqIGNyZWF0b3IgZnVuY3Rpb25zLiBPbmUgaGFuZHkgd2F5IHRvIG9idGFpbiBpdCBpcyB0byB1c2UgRVM2IGBpbXBvcnQgKiBhc2BcbiAqIHN5bnRheC4gWW91IG1heSBhbHNvIHBhc3MgYSBzaW5nbGUgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZGlzcGF0Y2ggVGhlIGBkaXNwYXRjaGAgZnVuY3Rpb24gYXZhaWxhYmxlIG9uIHlvdXIgUmVkdXhcbiAqIHN0b3JlLlxuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbnxPYmplY3R9IFRoZSBvYmplY3QgbWltaWNraW5nIHRoZSBvcmlnaW5hbCBvYmplY3QsIGJ1dCB3aXRoXG4gKiBldmVyeSBhY3Rpb24gY3JlYXRvciB3cmFwcGVkIGludG8gdGhlIGBkaXNwYXRjaGAgY2FsbC4gSWYgeW91IHBhc3NlZCBhXG4gKiBmdW5jdGlvbiBhcyBgYWN0aW9uQ3JlYXRvcnNgLCB0aGUgcmV0dXJuIHZhbHVlIHdpbGwgYWxzbyBiZSBhIHNpbmdsZVxuICogZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmRBY3Rpb25DcmVhdG9ycyhhY3Rpb25DcmVhdG9ycywgZGlzcGF0Y2gpIHtcbiAgaWYgKHR5cGVvZiBhY3Rpb25DcmVhdG9ycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBiaW5kQWN0aW9uQ3JlYXRvcihhY3Rpb25DcmVhdG9ycywgZGlzcGF0Y2gpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBhY3Rpb25DcmVhdG9ycyAhPT0gJ29iamVjdCcgfHwgYWN0aW9uQ3JlYXRvcnMgPT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2JpbmRBY3Rpb25DcmVhdG9ycyBleHBlY3RlZCBhbiBvYmplY3Qgb3IgYSBmdW5jdGlvbiwgaW5zdGVhZCByZWNlaXZlZCAnICsgKGFjdGlvbkNyZWF0b3JzID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIGFjdGlvbkNyZWF0b3JzKSArICcuICcgKyAnRGlkIHlvdSB3cml0ZSBcImltcG9ydCBBY3Rpb25DcmVhdG9ycyBmcm9tXCIgaW5zdGVhZCBvZiBcImltcG9ydCAqIGFzIEFjdGlvbkNyZWF0b3JzIGZyb21cIj8nKTtcbiAgfVxuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoYWN0aW9uQ3JlYXRvcnMpO1xuICB2YXIgYm91bmRBY3Rpb25DcmVhdG9ycyA9IHt9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICB2YXIgYWN0aW9uQ3JlYXRvciA9IGFjdGlvbkNyZWF0b3JzW2tleV07XG4gICAgaWYgKHR5cGVvZiBhY3Rpb25DcmVhdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBib3VuZEFjdGlvbkNyZWF0b3JzW2tleV0gPSBiaW5kQWN0aW9uQ3JlYXRvcihhY3Rpb25DcmVhdG9yLCBkaXNwYXRjaCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBib3VuZEFjdGlvbkNyZWF0b3JzO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9iaW5kQWN0aW9uQ3JlYXRvcnMuanMiLCJ2YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5pbXBvcnQgY29tcG9zZSBmcm9tICcuL2NvbXBvc2UnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBzdG9yZSBlbmhhbmNlciB0aGF0IGFwcGxpZXMgbWlkZGxld2FyZSB0byB0aGUgZGlzcGF0Y2ggbWV0aG9kXG4gKiBvZiB0aGUgUmVkdXggc3RvcmUuIFRoaXMgaXMgaGFuZHkgZm9yIGEgdmFyaWV0eSBvZiB0YXNrcywgc3VjaCBhcyBleHByZXNzaW5nXG4gKiBhc3luY2hyb25vdXMgYWN0aW9ucyBpbiBhIGNvbmNpc2UgbWFubmVyLCBvciBsb2dnaW5nIGV2ZXJ5IGFjdGlvbiBwYXlsb2FkLlxuICpcbiAqIFNlZSBgcmVkdXgtdGh1bmtgIHBhY2thZ2UgYXMgYW4gZXhhbXBsZSBvZiB0aGUgUmVkdXggbWlkZGxld2FyZS5cbiAqXG4gKiBCZWNhdXNlIG1pZGRsZXdhcmUgaXMgcG90ZW50aWFsbHkgYXN5bmNocm9ub3VzLCB0aGlzIHNob3VsZCBiZSB0aGUgZmlyc3RcbiAqIHN0b3JlIGVuaGFuY2VyIGluIHRoZSBjb21wb3NpdGlvbiBjaGFpbi5cbiAqXG4gKiBOb3RlIHRoYXQgZWFjaCBtaWRkbGV3YXJlIHdpbGwgYmUgZ2l2ZW4gdGhlIGBkaXNwYXRjaGAgYW5kIGBnZXRTdGF0ZWAgZnVuY3Rpb25zXG4gKiBhcyBuYW1lZCBhcmd1bWVudHMuXG4gKlxuICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gbWlkZGxld2FyZXMgVGhlIG1pZGRsZXdhcmUgY2hhaW4gdG8gYmUgYXBwbGllZC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBzdG9yZSBlbmhhbmNlciBhcHBseWluZyB0aGUgbWlkZGxld2FyZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXBwbHlNaWRkbGV3YXJlKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgbWlkZGxld2FyZXMgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBtaWRkbGV3YXJlc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoY3JlYXRlU3RvcmUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHJlZHVjZXIsIHByZWxvYWRlZFN0YXRlLCBlbmhhbmNlcikge1xuICAgICAgdmFyIHN0b3JlID0gY3JlYXRlU3RvcmUocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUsIGVuaGFuY2VyKTtcbiAgICAgIHZhciBfZGlzcGF0Y2ggPSBzdG9yZS5kaXNwYXRjaDtcbiAgICAgIHZhciBjaGFpbiA9IFtdO1xuXG4gICAgICB2YXIgbWlkZGxld2FyZUFQSSA9IHtcbiAgICAgICAgZ2V0U3RhdGU6IHN0b3JlLmdldFN0YXRlLFxuICAgICAgICBkaXNwYXRjaDogZnVuY3Rpb24gZGlzcGF0Y2goYWN0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuIF9kaXNwYXRjaChhY3Rpb24pO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY2hhaW4gPSBtaWRkbGV3YXJlcy5tYXAoZnVuY3Rpb24gKG1pZGRsZXdhcmUpIHtcbiAgICAgICAgcmV0dXJuIG1pZGRsZXdhcmUobWlkZGxld2FyZUFQSSk7XG4gICAgICB9KTtcbiAgICAgIF9kaXNwYXRjaCA9IGNvbXBvc2UuYXBwbHkodW5kZWZpbmVkLCBjaGFpbikoc3RvcmUuZGlzcGF0Y2gpO1xuXG4gICAgICByZXR1cm4gX2V4dGVuZHMoe30sIHN0b3JlLCB7XG4gICAgICAgIGRpc3BhdGNoOiBfZGlzcGF0Y2hcbiAgICAgIH0pO1xuICAgIH07XG4gIH07XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2FwcGx5TWlkZGxld2FyZS5qcyIsImNvbnN0IGxvYWRTdGF0ZSA9ICgpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBzZXJpYWxpemVkU3RhdGUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3RhdGUnKTtcbiAgICBpZiAoc2VyaWFsaXplZFN0YXRlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gSlNPTi5wYXJzZShzZXJpYWxpemVkU3RhdGUpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59O1xuXG5jb25zdCBzYXZlU3RhdGUgPSAoc3RhdGUpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBzZXJpYWxpemVkU3RhdGUgPSBKU09OLnN0cmluZ2lmeShzdGF0ZSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0YXRlJywgc2VyaWFsaXplZFN0YXRlKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgLy8gSWdub3JlIHdyaXRlIGVycm9ycyBmb3Igbm93LlxuICB9XG59O1xuXG5leHBvcnQgeyBsb2FkU3RhdGUsIHNhdmVTdGF0ZSB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xpYi9sb2NhbFN0b3JhZ2UuanMiLCJpbXBvcnQgeyBBREQgfSBmcm9tICcuLi9hY3Rpb25zJztcblxuY29uc3Qgb2JqZWN0RGljdGlvbmFyeSA9IChzdGF0ZSA9IHt9LCB7IHR5cGUsIHBheWxvYWQgfSkgPT4ge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIEFERDpcbiAgICAgIHJldHVybiB7IC4uLnN0YXRlLCAuLi5wYXlsb2FkIH07XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgb2JqZWN0RGljdGlvbmFyeTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9saWIvcmVkdWNlcnMvaW5kZXguanMiLCJjb25zdCBBREQgPSAnYWRkJztcblxuY29uc3QgYWRkID0gcGF5bG9hZCA9PiAoe1xuICB0eXBlOiBBREQsXG4gIHBheWxvYWQsXG59KTtcblxuZXhwb3J0IHsgYWRkLCBBREQgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9saWIvYWN0aW9ucy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=