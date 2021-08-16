(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"shop","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 11:
/*!******************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/uview-ui/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 12));



var _request = _interopRequireDefault(__webpack_require__(/*! ./libs/request */ 13));




















var _queryParams = _interopRequireDefault(__webpack_require__(/*! ./libs/function/queryParams.js */ 17));

var _route = _interopRequireDefault(__webpack_require__(/*! ./libs/function/route.js */ 18));

var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFormat.js */ 22));

var _timeFrom = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFrom.js */ 23));

var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 24));

var _guid = _interopRequireDefault(__webpack_require__(/*! ./libs/function/guid.js */ 25));

var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/function/color.js */ 26));

var _type2icon = _interopRequireDefault(__webpack_require__(/*! ./libs/function/type2icon.js */ 27));

var _randomArray = _interopRequireDefault(__webpack_require__(/*! ./libs/function/randomArray.js */ 28));

var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepClone.js */ 15));

var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepMerge.js */ 14));

var _addUnit = _interopRequireDefault(__webpack_require__(/*! ./libs/function/addUnit.js */ 29));


var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 16));

var _random = _interopRequireDefault(__webpack_require__(/*! ./libs/function/random.js */ 30));

var _trim = _interopRequireDefault(__webpack_require__(/*! ./libs/function/trim.js */ 31));

var _toast = _interopRequireDefault(__webpack_require__(/*! ./libs/function/toast.js */ 32));

var _getParent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/getParent.js */ 33));

var _$parent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/$parent.js */ 34));



var _sys = __webpack_require__(/*! ./libs/function/sys.js */ 35);

var _debounce = _interopRequireDefault(__webpack_require__(/*! ./libs/function/debounce.js */ 36));

var _throttle = _interopRequireDefault(__webpack_require__(/*! ./libs/function/throttle.js */ 37));



var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 38));

var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 39));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 引入全局mixin
// 引入关于是否mixin集成小程序分享的配置
// import wxshare from './libs/mixin/mpShare.js'
// 全局挂载引入http相关请求拦截插件
function wranning(str) {// 开发环境进行信息输出,主要是一些报错信息
  // 这个环境的来由是在程序编写时候,点击hx编辑器运行调试代码的时候,详见:
  // 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
  if (true) {console.warn(str);}} // 尝试判断在根目录的/store中是否有$u.mixin.js，此文件uView默认为需要挂在到全局的vuex的state变量
// HX2.6.11版本,放到try中,控制台依然会警告,暂时不用此方式，
// let vuexStore = {};
// try {
// 	vuexStore = require("@/store/$u.mixin.js");
// } catch (e) {
// 	//TODO handle the exception
// }
// post类型对象参数转为get类型url参数
var $u = { queryParams: _queryParams.default, route: _route.default, timeFormat: _timeFormat.default, date: _timeFormat.default, // 另名date
  timeFrom: _timeFrom.default, colorGradient: _colorGradient.default.colorGradient, colorToRgba: _colorGradient.default.colorToRgba, guid: _guid.default, color: _color.default, sys: _sys.sys, os: _sys.os, type2icon: _type2icon.default, randomArray: _randomArray.default, wranning: wranning, get: _request.default.get,
  post: _request.default.post,
  put: _request.default.put,
  'delete': _request.default.delete,
  hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  test: _test.default,
  random: _random.default,
  deepClone: _deepClone.default,
  deepMerge: _deepMerge.default,
  getParent: _getParent.default,
  $parent: _$parent.default,
  addUnit: _addUnit.default,
  trim: _trim.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  http: _request.default,
  toast: _toast.default,
  config: _config.default, // uView配置信息相关，比如版本号
  zIndex: _zIndex.default,
  debounce: _debounce.default,
  throttle: _throttle.default };


// $u挂载到uni对象上
uni.$u = $u;

var install = function install(Vue) {
  Vue.mixin(_mixin.default);
  if (Vue.prototype.openShare) {
    Vue.mixin(mpShare);
  }
  // Vue.mixin(vuexStore);
  // 时间格式化，同时两个名称，date和timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  Vue.filter('date', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  // 将多久以前的方法，注入到全局过滤器
  Vue.filter('timeFrom', function (timestamp, format) {
    return (0, _timeFrom.default)(timestamp, format);
  });
  Vue.prototype.$u = $u;
};var _default =

{
  install: install };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 12:
/*!*****************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/uview-ui/libs/mixin/mixin.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$u.getRect = this.$uGetRect;
  },
  methods: {
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $uGetRect: function $uGetRect(selector, all) {var _this = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().
        in(_this)[all ? 'selectAll' : 'select'](selector).
        boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).
        exec();
      });
    },
    getParentData: function getParentData() {var _this2 = this;var parentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      // 避免在created中去定义parent变量
      if (!this.parent) this.parent = false;
      // 这里的本质原理是，通过获取父组件实例(也即u-radio-group的this)
      // 将父组件this中对应的参数，赋值给本组件(u-radio的this)的parentData对象中对应的属性
      // 之所以需要这么做，是因为所有端中，头条小程序不支持通过this.parent.xxx去监听父组件参数的变化
      this.parent = this.$u.$parent.call(this, parentName);
      if (this.parent) {
        // 历遍parentData中的属性，将parent中的同名属性赋值给parentData
        Object.keys(this.parentData).map(function (key) {
          _this2.parentData[key] = _this2.parent[key];
        });
      }
    },
    // 阻止事件冒泡
    preventEvent: function preventEvent(e) {
      e && e.stopPropagation && e.stopPropagation();
    } },

  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  },
  beforeDestroy: function beforeDestroy() {var _this3 = this;
    // 判断当前页面是否存在parent和chldren，一般在checkbox和checkbox-group父子联动的场景会有此情况
    // 组件销毁时，移除子组件在父组件children数组中的实例，释放资源，避免数据混乱
    if (this.parent && uni.$u.test.array(this.parent.children)) {
      // 组件销毁时，移除父组件中的children数组中对应的实例
      var childrenList = this.parent.children;
      childrenList.map(function (child, index) {
        // 如果相等，则移除
        if (child === _this3) {
          childrenList.splice(index, 1);
        }
      });
    }
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 13:
/*!*******************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/uview-ui/libs/request/index.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ../function/deepMerge */ 14));
var _test = _interopRequireDefault(__webpack_require__(/*! ../function/test */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var
Request = /*#__PURE__*/function () {_createClass(Request, [{ key: "setConfig",
    // 设置全局默认配置
    value: function setConfig(customConfig) {
      // 深度合并对象，否则会造成对象深层属性丢失
      this.config = (0, _deepMerge.default)(this.config, customConfig);
    }

    // 主要请求部分
  }, { key: "request", value: function request() {var _this = this;var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // 检查请求拦截
      if (this.interceptor.request && typeof this.interceptor.request === 'function') {
        var tmpConfig = {};
        var interceptorRequest = this.interceptor.request(options);
        if (interceptorRequest === false) {
          // 返回一个处于pending状态中的Promise，来取消原promise，避免进入then()回调
          return new Promise(function () {});
        }
        this.options = interceptorRequest;
      }
      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || '';
      options.params = options.params || {};
      options.header = Object.assign({}, this.config.header, options.header);
      options.method = options.method || this.config.method;

      return new Promise(function (resolve, reject) {
        options.complete = function (response) {
          // 请求返回后，隐藏loading(如果请求返回快的话，可能会没有loading)
          uni.hideLoading();
          // 清除定时器，如果请求回来了，就无需loading
          clearTimeout(_this.config.timer);
          _this.config.timer = null;
          // 判断用户对拦截返回数据的要求，如果originalData为true，返回所有的数据(response)到拦截器，否则只返回response.data
          if (_this.config.originalData) {
            // 判断是否存在拦截器
            if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
              var resInterceptors = _this.interceptor.response(response);
              // 如果拦截器不返回false，就将拦截器返回的内容给this.$u.post的then回调
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                // 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
                reject(response);
              }
            } else {
              // 如果要求返回原始数据，就算没有拦截器，也返回最原始的数据
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
                var _resInterceptors = _this.interceptor.response(response.data);
                if (_resInterceptors !== false) {
                  resolve(_resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                // 如果不是返回原始数据(originalData=false)，且没有拦截器的情况下，返回纯数据给then回调
                resolve(response.data);
              }
            } else {
              // 不返回原始数据的情况下，服务器状态码不为200，modal弹框提示
              // if(response.errMsg) {
              // 	uni.showModal({
              // 		title: response.errMsg
              // 	});
              // }
              reject(response);
            }
          }
        };

        // 判断用户传递的URL是否/开头,如果不是,加上/，这里使用了uView的test.js验证库的url()方法
        options.url = _test.default.url(options.url) ? options.url : _this.config.baseUrl + (options.url.indexOf('/') == 0 ?
        options.url : '/' + options.url);

        // 是否显示loading
        // 加一个是否已有timer定时器的判断，否则有两个同时请求的时候，后者会清除前者的定时器id
        // 而没有清除前者的定时器，导致前者超时，一直显示loading
        if (_this.config.showLoading && !_this.config.timer) {
          _this.config.timer = setTimeout(function () {
            uni.showLoading({
              title: _this.config.loadingText,
              mask: _this.config.loadingMask });

            _this.config.timer = null;
          }, _this.config.loadingTime);
        }
        uni.request(options);
      });
      // .catch(res => {
      // 	// 如果返回reject()，不让其进入this.$u.post().then().catch()后面的catct()
      // 	// 因为很多人都会忘了写后面的catch()，导致报错捕获不到catch
      // 	return new Promise(()=>{});
      // })
    } }]);

  function Request() {var _this2 = this;_classCallCheck(this, Request);
    this.config = {
      baseUrl: '', // 请求的根域名
      // 默认的请求头
      header: {},
      method: 'POST',
      // 设置为json，返回后uni.request会对数据进行一次JSON.parse
      dataType: 'json',
      // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
      responseType: 'text',
      showLoading: true, // 是否显示请求中的loading
      loadingText: '请求中...',
      loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
      timer: null, // 定时器
      originalData: false, // 是否在拦截器中返回服务端的原始数据，见文档说明
      loadingMask: true // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    };

    // 拦截器
    this.interceptor = {
      // 请求前的拦截
      request: null,
      // 请求后的拦截
      response: null };


    // get请求
    this.get = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        method: 'GET',
        url: url,
        header: header,
        data: data });

    };

    // post请求
    this.post = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'POST',
        header: header,
        data: data });

    };

    // put请求，不支持支付宝小程序(HX2.6.15)
    this.put = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'PUT',
        header: header,
        data: data });

    };

    // delete请求，不支持支付宝和头条小程序(HX2.6.15)
    this.delete = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'DELETE',
        header: header,
        data: data });

    };
  }return Request;}();var _default =

new Request();exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 14:
/*!************************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/uview-ui/libs/function/deepMerge.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./deepClone */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// JS对象深度合并
function deepMerge() {var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = (0, _deepClone.default)(target);
  if (typeof target !== 'object' || typeof source !== 'object') return false;
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop];
      } else {
        if (typeof source[prop] !== 'object') {
          target[prop] = source[prop];
        } else {
          if (target[prop].concat && source[prop].concat) {
            target[prop] = target[prop].concat(source[prop]);
          } else {
            target[prop] = deepMerge(target[prop], source[prop]);
          }
        }
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}var _default =

deepMerge;exports.default = _default;

/***/ }),

/***/ 15:
/*!************************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/uview-ui/libs/function/deepClone.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

// 深度克隆
function deepClone(obj) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== "object" && typeof obj !== 'function') {
    //原始类型直接返回
    return obj;
  }
  var o = isArray(obj) ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}var _default =

deepClone;exports.default = _default;

/***/ }),

/***/ 16:
/*!*******************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/uview-ui/libs/function/test.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 验证电子邮箱格式
                                                                                                      */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
   * 验证手机格式
   */
function mobile(value) {
  return /^1[3-9]\d{9}$/.test(value);
}

/**
   * 验证URL格式
   */
function url(value) {
  return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value);
}

/**
   * 验证日期格式
   */
function date(value) {
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
   * 验证ISO类型的日期格式
   */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
   * 验证十进制数字
   */
function number(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
}

/**
   * 验证整数
   */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
   * 验证身份证号码
   */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
  value);
}

/**
   * 是否车牌号
   */
function carNo(value) {
  // 新能源车牌
  var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
}

/**
   * 金额,只允许2位小数
   */
function amount(value) {
  //金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
   * 中文
   */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
   * 只能输入字母
   */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
   * 只能是字母或者数字
   */
function enOrNum(value) {
  //英文或者数字
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
   * 验证是否包含某个值
   */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
   * 验证一个值范围[min, max]
   */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
   * 验证一个长度范围[min, max]
   */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
   * 是否固定电话
   */
function landline(value) {
  var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
   * 判断是否为空
   */
function empty(value) {
  switch (typeof value) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (0 === value || isNaN(value)) return true;
      break;
    case 'object':
      if (null === value || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;}

  return false;
}

/**
   * 是否json字符串
   */
function jsonString(value) {
  if (typeof value == 'string') {
    try {
      var obj = JSON.parse(value);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}


/**
   * 是否数组
   */
function array(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}

/**
   * 是否对象
   */
function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
   * 是否短信验证码
   */
function code(value) {var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  return new RegExp("^\\d{".concat(len, "}$")).test(value);
}var _default =


{
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty,
  jsonString: jsonString,
  landline: landline,
  object: object,
  array: array,
  code: code };exports.default = _default;

/***/ }),

/***/ 17:
/*!**************************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/uview-ui/libs/function/queryParams.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 对象转url参数
                                                                                                      * @param {*} data,对象
                                                                                                      * @param {*} isPrefix,是否自动加上"?"
                                                                                                      */
function queryParams() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';var _loop = function _loop(
  key) {
    var value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i]);
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push(key + '=' + _value);
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          var commaStr = "";
          value.forEach(function (_value) {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(key + '=' + commaStr);
          break;
        default:
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });}

    } else {
      _result.push(key + '=' + value);
    }};for (var key in data) {var _ret = _loop(key);if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}var _default =

queryParams;exports.default = _default;

/***/ }),

/***/ 18:
/*!********************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/uview-ui/libs/function/route.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 19));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * 路由跳转方法，该方法相对于直接使用uni.xxx的好处是使用更加简单快捷
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * 并且带有路由拦截功能
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */var

Router = /*#__PURE__*/function () {
  function Router() {_classCallCheck(this, Router);
    // 原始属性定义
    this.config = {
      type: 'navigateTo',
      url: '',
      delta: 1, // navigateBack页面后退时,回退的层数
      params: {}, // 传递的参数
      animationType: 'pop-in', // 窗口动画,只在APP有效
      animationDuration: 300, // 窗口动画持续时间,单位毫秒,只在APP有效
      intercept: false // 是否需要拦截
    };
    // 因为route方法是需要对外赋值给另外的对象使用，同时route内部有使用this，会导致route失去上下文
    // 这里在构造函数中进行this绑定
    this.route = this.route.bind(this);
  }

  // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
  _createClass(Router, [{ key: "addRootPath", value: function addRootPath(url) {
      return url[0] === '/' ? url : "/".concat(url);
    }

    // 整合路由参数
  }, { key: "mixinParam", value: function mixinParam(url, params) {
      url = url && this.addRootPath(url);

      // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
      // 如果有url中有get参数，转换后无需带上"?"
      var query = '';
      if (/.*\/.*\?.*=.*/.test(url)) {
        // object对象转为get类型的参数
        query = uni.$u.queryParams(params, false);
        // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
        return url += "&" + query;
      } else {
        // 直接拼接参数，因为此处url中没有后面的query参数，也就没有"?/&"之类的符号
        query = uni.$u.queryParams(params);
        return url += query;
      }
    }

    // 对外的方法名称
  }, { key: "route", value: function () {var _route = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var options,params,mergeConfig,isNext,_args = arguments;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                // 合并用户的配置和内部的默认配置
                mergeConfig = {};

                if (typeof options === 'string') {
                  // 如果options为字符串，则为route(url, params)的形式
                  mergeConfig.url = this.mixinParam(options, params);
                  mergeConfig.type = 'navigateTo';
                } else {
                  mergeConfig = uni.$u.deepClone(options, this.config);
                  // 否则正常使用mergeConfig中的url和params进行拼接
                  mergeConfig.url = this.mixinParam(options.url, options.params);
                }

                if (params.intercept) {
                  this.config.intercept = params.intercept;
                }
                // params参数也带给拦截器
                mergeConfig.params = params;
                // 合并内外部参数
                mergeConfig = uni.$u.deepMerge(this.config, mergeConfig);
                // 判断用户是否定义了拦截器
                if (!(typeof uni.$u.routeIntercept === 'function')) {_context.next = 14;break;}_context.next = 10;return (

                  new Promise(function (resolve, reject) {
                    uni.$u.routeIntercept(mergeConfig, resolve);
                  }));case 10:isNext = _context.sent;
                // 如果isNext为true，则执行路由跳转
                isNext && this.openPage(mergeConfig);_context.next = 15;break;case 14:

                this.openPage(mergeConfig);case 15:case "end":return _context.stop();}}}, _callee, this);}));function route() {return _route.apply(this, arguments);}return route;}()



    // 执行路由跳转
  }, { key: "openPage", value: function openPage(config) {
      // 解构参数
      var
      url =




      config.url,type = config.type,delta = config.delta,animationType = config.animationType,animationDuration = config.animationDuration;
      if (config.type == 'navigateTo' || config.type == 'to') {
        uni.navigateTo({
          url: url,
          animationType: animationType,
          animationDuration: animationDuration });

      }
      if (config.type == 'redirectTo' || config.type == 'redirect') {
        uni.redirectTo({
          url: url });

      }
      if (config.type == 'switchTab' || config.type == 'tab') {
        uni.switchTab({
          url: url });

      }
      if (config.type == 'reLaunch' || config.type == 'launch') {
        uni.reLaunch({
          url: url });

      }
      if (config.type == 'navigateBack' || config.type == 'back') {
        uni.navigateBack({
          delta: delta });

      }
    } }]);return Router;}();var _default =


new Router().route;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 19:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 20);

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    // NOTE 此处将 != 修改为 !==。涉及地方太多恐怕测试不到，如果出现数据对比问题，将其修改回来。
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"shop","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"shop","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"shop","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"shop","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 21);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 21:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 22:
/*!*************************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/uview-ui/libs/function/timeFormat.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
// 所以这里做一个兼容polyfill的兼容处理
if (!String.prototype.padStart) {
  // 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
  String.prototype.padStart = function (maxLength) {var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
    if (Object.prototype.toString.call(fillString) !== "[object String]") throw new TypeError(
    'fillString must be String');
    var str = this;
    // 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
    if (str.length >= maxLength) return String(str);

    var fillLength = maxLength - str.length,
    times = Math.ceil(fillLength / fillString.length);
    while (times >>= 1) {
      fillString += fillString;
      if (times === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}

// 其他更多是格式化有如下:
// yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
function timeFormat() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var date = new Date(dateTime);
  var ret;
  var opt = {
    "y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    };
  };
  return fmt;
}var _default =

timeFormat;exports.default = _default;

/***/ }),

/***/ 23:
/*!***********************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/uview-ui/libs/function/timeFrom.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/timeFormat.js */ 22));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                                          * 时间戳转为多久之前
                                                                                                                                                                                                                                                                                          * @param String timestamp 时间戳
                                                                                                                                                                                                                                                                                          * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
                                                                                                                                                                                                                                                                                          * 如果为布尔值false，无论什么时间，都返回多久以前的格式
                                                                                                                                                                                                                                                                                          */
function timeFrom() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var timestamp = +new Date(Number(dateTime));

  var timer = (Number(new Date()) - timestamp) / 1000;
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = parseInt(timer / 60) + '分钟前';
      break;
    case timer >= 3600 && timer < 86400:
      tips = parseInt(timer / 3600) + '小时前';
      break;
    case timer >= 86400 && timer < 2592000:
      tips = parseInt(timer / 86400) + '天前';
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = parseInt(timer / (86400 * 30)) + '个月前';
        } else {
          tips = parseInt(timer / (86400 * 365)) + '年前';
        }
      } else {
        tips = (0, _timeFormat.default)(timestamp, format);
      }}

  return tips;
}var _default =

timeFrom;exports.default = _default;

/***/ }),

/***/ 24:
/*!****************************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/uview-ui/libs/function/colorGradient.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 求两个颜色之间的渐变值
                                                                                                      * @param {string} startColor 开始的颜色
                                                                                                      * @param {string} endColor 结束的颜色
                                                                                                      * @param {number} step 颜色等分的份额
                                                                                                      * */
function colorGradient() {var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); //转换为rgb数组模式
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];

  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];

  var sR = (endR - startR) / step; //总差值
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    //计算每一步的hex值 
    var hex = rgbToHex('rgb(' + Math.round(sR * i + startR) + ',' + Math.round(sG * i + startG) + ',' + Math.round(sB *
    i + startB) + ')');
    colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function hexToRgb(sColor) {var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = sColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(_i, _i + 2)));
    }
    if (!str) {
      return sColorChange;
    } else {
      return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
    }
  } else if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    return arr.map(function (val) {return Number(val);});
  } else {
    return sColor;
  }
};

// 将rgb表示方式转换为hex表示方式
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  } else if (reg.test(_this)) {
    var aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}


/**
  * JS颜色十六进制转换为rgb或rgba,返回的格式为 rgba（255，255，255，0.5）字符串
  * sHex为传入的十六进制的色值
  * alpha为rgba的透明度
  */
function colorToRgba(color) {var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.3;
  color = rgbToHex(color);
  // 十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  /* 16进制颜色转为RGB格式 */
  var sColor = color.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#';
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    var sColorChange = [];
    for (var _i3 = 1; _i3 < 7; _i3 += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(_i3, _i3 + 2)));
    }
    // return sColorChange.join(',')
    return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')';
  } else
  {
    return sColor;
  }
}var _default =

{
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex,
  colorToRgba: colorToRgba };exports.default = _default;

/***/ }),

/***/ 25:
/*!*******************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/uview-ui/libs/function/guid.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
                                                                                                      * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier) 
                                                                                                      * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
                                                                                                      * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
                                                                                                      * v-for的时候,推荐使用后端返回的id而不是循环的index
                                                                                                      * @param {Number} len uuid的长度
                                                                                                      * @param {Boolean} firstU 将返回的首字母置为"u"
                                                                                                      * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
                                                                                                      */
function guid() {var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (var i = 0; i < len; i++) {uuid[i] = chars[0 | Math.random() * radix];}
  } else {
    var r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return 'u' + uuid.join('');
  } else {
    return uuid.join('');
  }
}var _default =

guid;exports.default = _default;

/***/ }),

/***/ 26:
/*!********************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/uview-ui/libs/function/color.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 为了让用户能够自定义主题，会逐步弃用此文件，各颜色通过css提供
// 为了给某些特殊场景使用和向后兼容，无需删除此文件(2020-06-20)
var color = {
  primary: "#2979ff",
  primaryDark: "#2b85e4",
  primaryDisabled: "#a0cfff",
  primaryLight: "#ecf5ff",
  bgColor: "#f3f4f6",

  info: "#909399",
  infoDark: "#82848a",
  infoDisabled: "#c8c9cc",
  infoLight: "#f4f4f5",

  warning: "#ff9900",
  warningDark: "#f29100",
  warningDisabled: "#fcbd71",
  warningLight: "#fdf6ec",

  error: "#fa3534",
  errorDark: "#dd6161",
  errorDisabled: "#fab6b6",
  errorLight: "#fef0f0",

  success: "#19be6b",
  successDark: "#18b566",
  successDisabled: "#71d5a1",
  successLight: "#dbf1e1",

  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909399",
  lightColor: "#c0c4cc",
  borderColor: "#e4e7ed" };var _default =


color;exports.default = _default;

/***/ }),

/***/ 27:
/*!************************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/uview-ui/libs/function/type2icon.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 根据主题type值,获取对应的图标
                                                                                                      * @param String type 主题名称,primary|info|error|warning|success
                                                                                                      * @param String fill 是否使用fill填充实体的图标  
                                                                                                      */
function type2icon() {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // 如果非预置值,默认为success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // 目前(2019-12-12),info和primary使用同一个图标
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';}

  // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
  if (fill) iconName += '-fill';
  return iconName;
}var _default =

type2icon;exports.default = _default;

/***/ }),

/***/ 28:
/*!**************************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/uview-ui/libs/function/randomArray.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 打乱数组
function randomArray() {var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(function () {return Math.random() - 0.5;});
}var _default =

randomArray;exports.default = _default;

/***/ }),

/***/ 29:
/*!**********************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/uview-ui/libs/function/addUnit.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = addUnit;var _test = _interopRequireDefault(__webpack_require__(/*! ./test.js */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 添加单位，如果有rpx，%，px等单位结尾或者值为auto，直接返回，否则加上rpx单位结尾
function addUnit() {var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rpx';
  value = String(value);
  // 用uView内置验证规则中的number判断是否为数值
  return _test.default.number(value) ? "".concat(value).concat(unit) : value;
}

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!*********************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/uview-ui/libs/function/random.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  } else {
    return 0;
  }
}var _default =

random;exports.default = _default;

/***/ }),

/***/ 31:
/*!*******************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/uview-ui/libs/function/trim.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function trim(str) {var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, "");
  } else if (pos == "left") {
    return str.replace(/^\s*/, '');
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, "");
  } else if (pos == 'all') {
    return str.replace(/\s+/g, "");
  } else {
    return str;
  }
}var _default =

trim;exports.default = _default;

/***/ }),

/***/ 32:
/*!********************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/uview-ui/libs/function/toast.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function toast(title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  uni.showToast({
    title: title,
    icon: 'none',
    duration: duration });

}var _default =

toast;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 320:
/*!*******************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/uview-ui/libs/util/province.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var provinceData = [{ "label": "北京市", "value": "11" }, { "label": "天津市", "value": "12" }, { "label": "河北省", "value": "13" }, { "label": "山西省", "value": "14" }, { "label": "内蒙古自治区", "value": "15" }, { "label": "辽宁省", "value": "21" }, { "label": "吉林省", "value": "22" }, { "label": "黑龙江省", "value": "23" }, { "label": "上海市", "value": "31" }, { "label": "江苏省", "value": "32" }, { "label": "浙江省", "value": "33" }, { "label": "安徽省", "value": "34" }, { "label": "福建省", "value": "35" }, { "label": "江西省", "value": "36" }, { "label": "山东省", "value": "37" }, { "label": "河南省", "value": "41" }, { "label": "湖北省", "value": "42" }, { "label": "湖南省", "value": "43" }, { "label": "广东省", "value": "44" }, { "label": "广西壮族自治区", "value": "45" }, { "label": "海南省", "value": "46" }, { "label": "重庆市", "value": "50" }, { "label": "四川省", "value": "51" }, { "label": "贵州省", "value": "52" }, { "label": "云南省", "value": "53" }, { "label": "西藏自治区", "value": "54" }, { "label": "陕西省", "value": "61" }, { "label": "甘肃省", "value": "62" }, { "label": "青海省", "value": "63" }, { "label": "宁夏回族自治区", "value": "64" }, { "label": "新疆维吾尔自治区", "value": "65" }, { "label": "台湾", "value": "66" }, { "label": "香港", "value": "67" }, { "label": "澳门", "value": "68" }];var _default = provinceData;exports.default = _default;

/***/ }),

/***/ 321:
/*!***************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/uview-ui/libs/util/city.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var cityData = [[{ "label": "市辖区", "value": "1101" }], [{ "label": "市辖区", "value": "1201" }], [{ "label": "石家庄市", "value": "1301" }, { "label": "唐山市", "value": "1302" }, { "label": "秦皇岛市", "value": "1303" }, { "label": "邯郸市", "value": "1304" }, { "label": "邢台市", "value": "1305" }, { "label": "保定市", "value": "1306" }, { "label": "张家口市", "value": "1307" }, { "label": "承德市", "value": "1308" }, { "label": "沧州市", "value": "1309" }, { "label": "廊坊市", "value": "1310" }, { "label": "衡水市", "value": "1311" }], [{ "label": "太原市", "value": "1401" }, { "label": "大同市", "value": "1402" }, { "label": "阳泉市", "value": "1403" }, { "label": "长治市", "value": "1404" }, { "label": "晋城市", "value": "1405" }, { "label": "朔州市", "value": "1406" }, { "label": "晋中市", "value": "1407" }, { "label": "运城市", "value": "1408" }, { "label": "忻州市", "value": "1409" }, { "label": "临汾市", "value": "1410" }, { "label": "吕梁市", "value": "1411" }], [{ "label": "呼和浩特市", "value": "1501" }, { "label": "包头市", "value": "1502" }, { "label": "乌海市", "value": "1503" }, { "label": "赤峰市", "value": "1504" }, { "label": "通辽市", "value": "1505" }, { "label": "鄂尔多斯市", "value": "1506" }, { "label": "呼伦贝尔市", "value": "1507" }, { "label": "巴彦淖尔市", "value": "1508" }, { "label": "乌兰察布市", "value": "1509" }, { "label": "兴安盟", "value": "1522" }, { "label": "锡林郭勒盟", "value": "1525" }, { "label": "阿拉善盟", "value": "1529" }], [{ "label": "沈阳市", "value": "2101" }, { "label": "大连市", "value": "2102" }, { "label": "鞍山市", "value": "2103" }, { "label": "抚顺市", "value": "2104" }, { "label": "本溪市", "value": "2105" }, { "label": "丹东市", "value": "2106" }, { "label": "锦州市", "value": "2107" }, { "label": "营口市", "value": "2108" }, { "label": "阜新市", "value": "2109" }, { "label": "辽阳市", "value": "2110" }, { "label": "盘锦市", "value": "2111" }, { "label": "铁岭市", "value": "2112" }, { "label": "朝阳市", "value": "2113" }, { "label": "葫芦岛市", "value": "2114" }], [{ "label": "长春市", "value": "2201" }, { "label": "吉林市", "value": "2202" }, { "label": "四平市", "value": "2203" }, { "label": "辽源市", "value": "2204" }, { "label": "通化市", "value": "2205" }, { "label": "白山市", "value": "2206" }, { "label": "松原市", "value": "2207" }, { "label": "白城市", "value": "2208" }, { "label": "延边朝鲜族自治州", "value": "2224" }], [{ "label": "哈尔滨市", "value": "2301" }, { "label": "齐齐哈尔市", "value": "2302" }, { "label": "鸡西市", "value": "2303" }, { "label": "鹤岗市", "value": "2304" }, { "label": "双鸭山市", "value": "2305" }, { "label": "大庆市", "value": "2306" }, { "label": "伊春市", "value": "2307" }, { "label": "佳木斯市", "value": "2308" }, { "label": "七台河市", "value": "2309" }, { "label": "牡丹江市", "value": "2310" }, { "label": "黑河市", "value": "2311" }, { "label": "绥化市", "value": "2312" }, { "label": "大兴安岭地区", "value": "2327" }], [{ "label": "市辖区", "value": "3101" }], [{ "label": "南京市", "value": "3201" }, { "label": "无锡市", "value": "3202" }, { "label": "徐州市", "value": "3203" }, { "label": "常州市", "value": "3204" }, { "label": "苏州市", "value": "3205" }, { "label": "南通市", "value": "3206" }, { "label": "连云港市", "value": "3207" }, { "label": "淮安市", "value": "3208" }, { "label": "盐城市", "value": "3209" }, { "label": "扬州市", "value": "3210" }, { "label": "镇江市", "value": "3211" }, { "label": "泰州市", "value": "3212" }, { "label": "宿迁市", "value": "3213" }], [{ "label": "杭州市", "value": "3301" }, { "label": "宁波市", "value": "3302" }, { "label": "温州市", "value": "3303" }, { "label": "嘉兴市", "value": "3304" }, { "label": "湖州市", "value": "3305" }, { "label": "绍兴市", "value": "3306" }, { "label": "金华市", "value": "3307" }, { "label": "衢州市", "value": "3308" }, { "label": "舟山市", "value": "3309" }, { "label": "台州市", "value": "3310" }, { "label": "丽水市", "value": "3311" }], [{ "label": "合肥市", "value": "3401" }, { "label": "芜湖市", "value": "3402" }, { "label": "蚌埠市", "value": "3403" }, { "label": "淮南市", "value": "3404" }, { "label": "马鞍山市", "value": "3405" }, { "label": "淮北市", "value": "3406" }, { "label": "铜陵市", "value": "3407" }, { "label": "安庆市", "value": "3408" }, { "label": "黄山市", "value": "3410" }, { "label": "滁州市", "value": "3411" }, { "label": "阜阳市", "value": "3412" }, { "label": "宿州市", "value": "3413" }, { "label": "六安市", "value": "3415" }, { "label": "亳州市", "value": "3416" }, { "label": "池州市", "value": "3417" }, { "label": "宣城市", "value": "3418" }], [{ "label": "福州市", "value": "3501" }, { "label": "厦门市", "value": "3502" }, { "label": "莆田市", "value": "3503" }, { "label": "三明市", "value": "3504" }, { "label": "泉州市", "value": "3505" }, { "label": "漳州市", "value": "3506" }, { "label": "南平市", "value": "3507" }, { "label": "龙岩市", "value": "3508" }, { "label": "宁德市", "value": "3509" }], [{ "label": "南昌市", "value": "3601" }, { "label": "景德镇市", "value": "3602" }, { "label": "萍乡市", "value": "3603" }, { "label": "九江市", "value": "3604" }, { "label": "新余市", "value": "3605" }, { "label": "鹰潭市", "value": "3606" }, { "label": "赣州市", "value": "3607" }, { "label": "吉安市", "value": "3608" }, { "label": "宜春市", "value": "3609" }, { "label": "抚州市", "value": "3610" }, { "label": "上饶市", "value": "3611" }], [{ "label": "济南市", "value": "3701" }, { "label": "青岛市", "value": "3702" }, { "label": "淄博市", "value": "3703" }, { "label": "枣庄市", "value": "3704" }, { "label": "东营市", "value": "3705" }, { "label": "烟台市", "value": "3706" }, { "label": "潍坊市", "value": "3707" }, { "label": "济宁市", "value": "3708" }, { "label": "泰安市", "value": "3709" }, { "label": "威海市", "value": "3710" }, { "label": "日照市", "value": "3711" }, { "label": "莱芜市", "value": "3712" }, { "label": "临沂市", "value": "3713" }, { "label": "德州市", "value": "3714" }, { "label": "聊城市", "value": "3715" }, { "label": "滨州市", "value": "3716" }, { "label": "菏泽市", "value": "3717" }], [{ "label": "郑州市", "value": "4101" }, { "label": "开封市", "value": "4102" }, { "label": "洛阳市", "value": "4103" }, { "label": "平顶山市", "value": "4104" }, { "label": "安阳市", "value": "4105" }, { "label": "鹤壁市", "value": "4106" }, { "label": "新乡市", "value": "4107" }, { "label": "焦作市", "value": "4108" }, { "label": "濮阳市", "value": "4109" }, { "label": "许昌市", "value": "4110" }, { "label": "漯河市", "value": "4111" }, { "label": "三门峡市", "value": "4112" }, { "label": "南阳市", "value": "4113" }, { "label": "商丘市", "value": "4114" }, { "label": "信阳市", "value": "4115" }, { "label": "周口市", "value": "4116" }, { "label": "驻马店市", "value": "4117" }, { "label": "省直辖县级行政区划", "value": "4190" }], [{ "label": "武汉市", "value": "4201" }, { "label": "黄石市", "value": "4202" }, { "label": "十堰市", "value": "4203" }, { "label": "宜昌市", "value": "4205" }, { "label": "襄阳市", "value": "4206" }, { "label": "鄂州市", "value": "4207" }, { "label": "荆门市", "value": "4208" }, { "label": "孝感市", "value": "4209" }, { "label": "荆州市", "value": "4210" }, { "label": "黄冈市", "value": "4211" }, { "label": "咸宁市", "value": "4212" }, { "label": "随州市", "value": "4213" }, { "label": "恩施土家族苗族自治州", "value": "4228" }, { "label": "省直辖县级行政区划", "value": "4290" }], [{ "label": "长沙市", "value": "4301" }, { "label": "株洲市", "value": "4302" }, { "label": "湘潭市", "value": "4303" }, { "label": "衡阳市", "value": "4304" }, { "label": "邵阳市", "value": "4305" }, { "label": "岳阳市", "value": "4306" }, { "label": "常德市", "value": "4307" }, { "label": "张家界市", "value": "4308" }, { "label": "益阳市", "value": "4309" }, { "label": "郴州市", "value": "4310" }, { "label": "永州市", "value": "4311" }, { "label": "怀化市", "value": "4312" }, { "label": "娄底市", "value": "4313" }, { "label": "湘西土家族苗族自治州", "value": "4331" }], [{ "label": "广州市", "value": "4401" }, { "label": "韶关市", "value": "4402" }, { "label": "深圳市", "value": "4403" }, { "label": "珠海市", "value": "4404" }, { "label": "汕头市", "value": "4405" }, { "label": "佛山市", "value": "4406" }, { "label": "江门市", "value": "4407" }, { "label": "湛江市", "value": "4408" }, { "label": "茂名市", "value": "4409" }, { "label": "肇庆市", "value": "4412" }, { "label": "惠州市", "value": "4413" }, { "label": "梅州市", "value": "4414" }, { "label": "汕尾市", "value": "4415" }, { "label": "河源市", "value": "4416" }, { "label": "阳江市", "value": "4417" }, { "label": "清远市", "value": "4418" }, { "label": "东莞市", "value": "4419" }, { "label": "中山市", "value": "4420" }, { "label": "潮州市", "value": "4451" }, { "label": "揭阳市", "value": "4452" }, { "label": "云浮市", "value": "4453" }], [{ "label": "南宁市", "value": "4501" }, { "label": "柳州市", "value": "4502" }, { "label": "桂林市", "value": "4503" }, { "label": "梧州市", "value": "4504" }, { "label": "北海市", "value": "4505" }, { "label": "防城港市", "value": "4506" }, { "label": "钦州市", "value": "4507" }, { "label": "贵港市", "value": "4508" }, { "label": "玉林市", "value": "4509" }, { "label": "百色市", "value": "4510" }, { "label": "贺州市", "value": "4511" }, { "label": "河池市", "value": "4512" }, { "label": "来宾市", "value": "4513" }, { "label": "崇左市", "value": "4514" }], [{ "label": "海口市", "value": "4601" }, { "label": "三亚市", "value": "4602" }, { "label": "三沙市", "value": "4603" }, { "label": "儋州市", "value": "4604" }, { "label": "省直辖县级行政区划", "value": "4690" }], [{ "label": "市辖区", "value": "5001" }, { "label": "县", "value": "5002" }], [{ "label": "成都市", "value": "5101" }, { "label": "自贡市", "value": "5103" }, { "label": "攀枝花市", "value": "5104" }, { "label": "泸州市", "value": "5105" }, { "label": "德阳市", "value": "5106" }, { "label": "绵阳市", "value": "5107" }, { "label": "广元市", "value": "5108" }, { "label": "遂宁市", "value": "5109" }, { "label": "内江市", "value": "5110" }, { "label": "乐山市", "value": "5111" }, { "label": "南充市", "value": "5113" }, { "label": "眉山市", "value": "5114" }, { "label": "宜宾市", "value": "5115" }, { "label": "广安市", "value": "5116" }, { "label": "达州市", "value": "5117" }, { "label": "雅安市", "value": "5118" }, { "label": "巴中市", "value": "5119" }, { "label": "资阳市", "value": "5120" }, { "label": "阿坝藏族羌族自治州", "value": "5132" }, { "label": "甘孜藏族自治州", "value": "5133" }, { "label": "凉山彝族自治州", "value": "5134" }], [{ "label": "贵阳市", "value": "5201" }, { "label": "六盘水市", "value": "5202" }, { "label": "遵义市", "value": "5203" }, { "label": "安顺市", "value": "5204" }, { "label": "毕节市", "value": "5205" }, { "label": "铜仁市", "value": "5206" }, { "label": "黔西南布依族苗族自治州", "value": "5223" }, { "label": "黔东南苗族侗族自治州", "value": "5226" }, { "label": "黔南布依族苗族自治州", "value": "5227" }], [{ "label": "昆明市", "value": "5301" }, { "label": "曲靖市", "value": "5303" }, { "label": "玉溪市", "value": "5304" }, { "label": "保山市", "value": "5305" }, { "label": "昭通市", "value": "5306" }, { "label": "丽江市", "value": "5307" }, { "label": "普洱市", "value": "5308" }, { "label": "临沧市", "value": "5309" }, { "label": "楚雄彝族自治州", "value": "5323" }, { "label": "红河哈尼族彝族自治州", "value": "5325" }, { "label": "文山壮族苗族自治州", "value": "5326" }, { "label": "西双版纳傣族自治州", "value": "5328" }, { "label": "大理白族自治州", "value": "5329" }, { "label": "德宏傣族景颇族自治州", "value": "5331" }, { "label": "怒江傈僳族自治州", "value": "5333" }, { "label": "迪庆藏族自治州", "value": "5334" }], [{ "label": "拉萨市", "value": "5401" }, { "label": "日喀则市", "value": "5402" }, { "label": "昌都市", "value": "5403" }, { "label": "林芝市", "value": "5404" }, { "label": "山南市", "value": "5405" }, { "label": "那曲地区", "value": "5424" }, { "label": "阿里地区", "value": "5425" }], [{ "label": "西安市", "value": "6101" }, { "label": "铜川市", "value": "6102" }, { "label": "宝鸡市", "value": "6103" }, { "label": "咸阳市", "value": "6104" }, { "label": "渭南市", "value": "6105" }, { "label": "延安市", "value": "6106" }, { "label": "汉中市", "value": "6107" }, { "label": "榆林市", "value": "6108" }, { "label": "安康市", "value": "6109" }, { "label": "商洛市", "value": "6110" }], [{ "label": "兰州市", "value": "6201" }, { "label": "嘉峪关市", "value": "6202" }, { "label": "金昌市", "value": "6203" }, { "label": "白银市", "value": "6204" }, { "label": "天水市", "value": "6205" }, { "label": "武威市", "value": "6206" }, { "label": "张掖市", "value": "6207" }, { "label": "平凉市", "value": "6208" }, { "label": "酒泉市", "value": "6209" }, { "label": "庆阳市", "value": "6210" }, { "label": "定西市", "value": "6211" }, { "label": "陇南市", "value": "6212" }, { "label": "临夏回族自治州", "value": "6229" }, { "label": "甘南藏族自治州", "value": "6230" }], [{ "label": "西宁市", "value": "6301" }, { "label": "海东市", "value": "6302" }, { "label": "海北藏族自治州", "value": "6322" }, { "label": "黄南藏族自治州", "value": "6323" }, { "label": "海南藏族自治州", "value": "6325" }, { "label": "果洛藏族自治州", "value": "6326" }, { "label": "玉树藏族自治州", "value": "6327" }, { "label": "海西蒙古族藏族自治州", "value": "6328" }], [{ "label": "银川市", "value": "6401" }, { "label": "石嘴山市", "value": "6402" }, { "label": "吴忠市", "value": "6403" }, { "label": "固原市", "value": "6404" }, { "label": "中卫市", "value": "6405" }], [{ "label": "乌鲁木齐市", "value": "6501" }, { "label": "克拉玛依市", "value": "6502" }, { "label": "吐鲁番市", "value": "6504" }, { "label": "哈密市", "value": "6505" }, { "label": "昌吉回族自治州", "value": "6523" }, { "label": "博尔塔拉蒙古自治州", "value": "6527" }, { "label": "巴音郭楞蒙古自治州", "value": "6528" }, { "label": "阿克苏地区", "value": "6529" }, { "label": "克孜勒苏柯尔克孜自治州", "value": "6530" }, { "label": "喀什地区", "value": "6531" }, { "label": "和田地区", "value": "6532" }, { "label": "伊犁哈萨克自治州", "value": "6540" }, { "label": "塔城地区", "value": "6542" }, { "label": "阿勒泰地区", "value": "6543" }, { "label": "自治区直辖县级行政区划", "value": "6590" }], [{ "label": "台北", "value": "6601" }, { "label": "高雄", "value": "6602" }, { "label": "基隆", "value": "6603" }, { "label": "台中", "value": "6604" }, { "label": "台南", "value": "6605" }, { "label": "新竹", "value": "6606" }, { "label": "嘉义", "value": "6607" }, { "label": "宜兰", "value": "6608" }, { "label": "桃园", "value": "6609" }, { "label": "苗栗", "value": "6610" }, { "label": "彰化", "value": "6611" }, { "label": "南投", "value": "6612" }, { "label": "云林", "value": "6613" }, { "label": "屏东", "value": "6614" }, { "label": "台东", "value": "6615" }, { "label": "花莲", "value": "6616" }, { "label": "澎湖", "value": "6617" }], [{ "label": "香港岛", "value": "6701" }, { "label": "九龙", "value": "6702" }, { "label": "新界", "value": "6703" }], [{ "label": "澳门半岛", "value": "6801" }, { "label": "氹仔岛", "value": "6802" }, { "label": "路环岛", "value": "6803" }, { "label": "路氹城", "value": "6804" }]];var _default = cityData;exports.default = _default;

/***/ }),

/***/ 322:
/*!***************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/uview-ui/libs/util/area.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var areaData = [[[{ "label": "东城区", "value": "110101" }, { "label": "西城区", "value": "110102" }, { "label": "朝阳区", "value": "110105" }, { "label": "丰台区", "value": "110106" }, { "label": "石景山区", "value": "110107" }, { "label": "海淀区", "value": "110108" }, { "label": "门头沟区", "value": "110109" }, { "label": "房山区", "value": "110111" }, { "label": "通州区", "value": "110112" }, { "label": "顺义区", "value": "110113" }, { "label": "昌平区", "value": "110114" }, { "label": "大兴区", "value": "110115" }, { "label": "怀柔区", "value": "110116" }, { "label": "平谷区", "value": "110117" }, { "label": "密云区", "value": "110118" }, { "label": "延庆区", "value": "110119" }]], [[{ "label": "和平区", "value": "120101" }, { "label": "河东区", "value": "120102" }, { "label": "河西区", "value": "120103" }, { "label": "南开区", "value": "120104" }, { "label": "河北区", "value": "120105" }, { "label": "红桥区", "value": "120106" }, { "label": "东丽区", "value": "120110" }, { "label": "西青区", "value": "120111" }, { "label": "津南区", "value": "120112" }, { "label": "北辰区", "value": "120113" }, { "label": "武清区", "value": "120114" }, { "label": "宝坻区", "value": "120115" }, { "label": "滨海新区", "value": "120116" }, { "label": "宁河区", "value": "120117" }, { "label": "静海区", "value": "120118" }, { "label": "蓟州区", "value": "120119" }]], [[{ "label": "长安区", "value": "130102" }, { "label": "桥西区", "value": "130104" }, { "label": "新华区", "value": "130105" }, { "label": "井陉矿区", "value": "130107" }, { "label": "裕华区", "value": "130108" }, { "label": "藁城区", "value": "130109" }, { "label": "鹿泉区", "value": "130110" }, { "label": "栾城区", "value": "130111" }, { "label": "井陉县", "value": "130121" }, { "label": "正定县", "value": "130123" }, { "label": "行唐县", "value": "130125" }, { "label": "灵寿县", "value": "130126" }, { "label": "高邑县", "value": "130127" }, { "label": "深泽县", "value": "130128" }, { "label": "赞皇县", "value": "130129" }, { "label": "无极县", "value": "130130" }, { "label": "平山县", "value": "130131" }, { "label": "元氏县", "value": "130132" }, { "label": "赵县", "value": "130133" }, { "label": "石家庄高新技术产业开发区", "value": "130171" }, { "label": "石家庄循环化工园区", "value": "130172" }, { "label": "辛集市", "value": "130181" }, { "label": "晋州市", "value": "130183" }, { "label": "新乐市", "value": "130184" }], [{ "label": "路南区", "value": "130202" }, { "label": "路北区", "value": "130203" }, { "label": "古冶区", "value": "130204" }, { "label": "开平区", "value": "130205" }, { "label": "丰南区", "value": "130207" }, { "label": "丰润区", "value": "130208" }, { "label": "曹妃甸区", "value": "130209" }, { "label": "滦县", "value": "130223" }, { "label": "滦南县", "value": "130224" }, { "label": "乐亭县", "value": "130225" }, { "label": "迁西县", "value": "130227" }, { "label": "玉田县", "value": "130229" }, { "label": "唐山市芦台经济技术开发区", "value": "130271" }, { "label": "唐山市汉沽管理区", "value": "130272" }, { "label": "唐山高新技术产业开发区", "value": "130273" }, { "label": "河北唐山海港经济开发区", "value": "130274" }, { "label": "遵化市", "value": "130281" }, { "label": "迁安市", "value": "130283" }], [{ "label": "海港区", "value": "130302" }, { "label": "山海关区", "value": "130303" }, { "label": "北戴河区", "value": "130304" }, { "label": "抚宁区", "value": "130306" }, { "label": "青龙满族自治县", "value": "130321" }, { "label": "昌黎县", "value": "130322" }, { "label": "卢龙县", "value": "130324" }, { "label": "秦皇岛市经济技术开发区", "value": "130371" }, { "label": "北戴河新区", "value": "130372" }], [{ "label": "邯山区", "value": "130402" }, { "label": "丛台区", "value": "130403" }, { "label": "复兴区", "value": "130404" }, { "label": "峰峰矿区", "value": "130406" }, { "label": "肥乡区", "value": "130407" }, { "label": "永年区", "value": "130408" }, { "label": "临漳县", "value": "130423" }, { "label": "成安县", "value": "130424" }, { "label": "大名县", "value": "130425" }, { "label": "涉县", "value": "130426" }, { "label": "磁县", "value": "130427" }, { "label": "邱县", "value": "130430" }, { "label": "鸡泽县", "value": "130431" }, { "label": "广平县", "value": "130432" }, { "label": "馆陶县", "value": "130433" }, { "label": "魏县", "value": "130434" }, { "label": "曲周县", "value": "130435" }, { "label": "邯郸经济技术开发区", "value": "130471" }, { "label": "邯郸冀南新区", "value": "130473" }, { "label": "武安市", "value": "130481" }], [{ "label": "桥东区", "value": "130502" }, { "label": "桥西区", "value": "130503" }, { "label": "邢台县", "value": "130521" }, { "label": "临城县", "value": "130522" }, { "label": "内丘县", "value": "130523" }, { "label": "柏乡县", "value": "130524" }, { "label": "隆尧县", "value": "130525" }, { "label": "任县", "value": "130526" }, { "label": "南和县", "value": "130527" }, { "label": "宁晋县", "value": "130528" }, { "label": "巨鹿县", "value": "130529" }, { "label": "新河县", "value": "130530" }, { "label": "广宗县", "value": "130531" }, { "label": "平乡县", "value": "130532" }, { "label": "威县", "value": "130533" }, { "label": "清河县", "value": "130534" }, { "label": "临西县", "value": "130535" }, { "label": "河北邢台经济开发区", "value": "130571" }, { "label": "南宫市", "value": "130581" }, { "label": "沙河市", "value": "130582" }], [{ "label": "竞秀区", "value": "130602" }, { "label": "莲池区", "value": "130606" }, { "label": "满城区", "value": "130607" }, { "label": "清苑区", "value": "130608" }, { "label": "徐水区", "value": "130609" }, { "label": "涞水县", "value": "130623" }, { "label": "阜平县", "value": "130624" }, { "label": "定兴县", "value": "130626" }, { "label": "唐县", "value": "130627" }, { "label": "高阳县", "value": "130628" }, { "label": "容城县", "value": "130629" }, { "label": "涞源县", "value": "130630" }, { "label": "望都县", "value": "130631" }, { "label": "安新县", "value": "130632" }, { "label": "易县", "value": "130633" }, { "label": "曲阳县", "value": "130634" }, { "label": "蠡县", "value": "130635" }, { "label": "顺平县", "value": "130636" }, { "label": "博野县", "value": "130637" }, { "label": "雄县", "value": "130638" }, { "label": "保定高新技术产业开发区", "value": "130671" }, { "label": "保定白沟新城", "value": "130672" }, { "label": "涿州市", "value": "130681" }, { "label": "定州市", "value": "130682" }, { "label": "安国市", "value": "130683" }, { "label": "高碑店市", "value": "130684" }], [{ "label": "桥东区", "value": "130702" }, { "label": "桥西区", "value": "130703" }, { "label": "宣化区", "value": "130705" }, { "label": "下花园区", "value": "130706" }, { "label": "万全区", "value": "130708" }, { "label": "崇礼区", "value": "130709" }, { "label": "张北县", "value": "130722" }, { "label": "康保县", "value": "130723" }, { "label": "沽源县", "value": "130724" }, { "label": "尚义县", "value": "130725" }, { "label": "蔚县", "value": "130726" }, { "label": "阳原县", "value": "130727" }, { "label": "怀安县", "value": "130728" }, { "label": "怀来县", "value": "130730" }, { "label": "涿鹿县", "value": "130731" }, { "label": "赤城县", "value": "130732" }, { "label": "张家口市高新技术产业开发区", "value": "130771" }, { "label": "张家口市察北管理区", "value": "130772" }, { "label": "张家口市塞北管理区", "value": "130773" }], [{ "label": "双桥区", "value": "130802" }, { "label": "双滦区", "value": "130803" }, { "label": "鹰手营子矿区", "value": "130804" }, { "label": "承德县", "value": "130821" }, { "label": "兴隆县", "value": "130822" }, { "label": "滦平县", "value": "130824" }, { "label": "隆化县", "value": "130825" }, { "label": "丰宁满族自治县", "value": "130826" }, { "label": "宽城满族自治县", "value": "130827" }, { "label": "围场满族蒙古族自治县", "value": "130828" }, { "label": "承德高新技术产业开发区", "value": "130871" }, { "label": "平泉市", "value": "130881" }], [{ "label": "新华区", "value": "130902" }, { "label": "运河区", "value": "130903" }, { "label": "沧县", "value": "130921" }, { "label": "青县", "value": "130922" }, { "label": "东光县", "value": "130923" }, { "label": "海兴县", "value": "130924" }, { "label": "盐山县", "value": "130925" }, { "label": "肃宁县", "value": "130926" }, { "label": "南皮县", "value": "130927" }, { "label": "吴桥县", "value": "130928" }, { "label": "献县", "value": "130929" }, { "label": "孟村回族自治县", "value": "130930" }, { "label": "河北沧州经济开发区", "value": "130971" }, { "label": "沧州高新技术产业开发区", "value": "130972" }, { "label": "沧州渤海新区", "value": "130973" }, { "label": "泊头市", "value": "130981" }, { "label": "任丘市", "value": "130982" }, { "label": "黄骅市", "value": "130983" }, { "label": "河间市", "value": "130984" }], [{ "label": "安次区", "value": "131002" }, { "label": "广阳区", "value": "131003" }, { "label": "固安县", "value": "131022" }, { "label": "永清县", "value": "131023" }, { "label": "香河县", "value": "131024" }, { "label": "大城县", "value": "131025" }, { "label": "文安县", "value": "131026" }, { "label": "大厂回族自治县", "value": "131028" }, { "label": "廊坊经济技术开发区", "value": "131071" }, { "label": "霸州市", "value": "131081" }, { "label": "三河市", "value": "131082" }], [{ "label": "桃城区", "value": "131102" }, { "label": "冀州区", "value": "131103" }, { "label": "枣强县", "value": "131121" }, { "label": "武邑县", "value": "131122" }, { "label": "武强县", "value": "131123" }, { "label": "饶阳县", "value": "131124" }, { "label": "安平县", "value": "131125" }, { "label": "故城县", "value": "131126" }, { "label": "景县", "value": "131127" }, { "label": "阜城县", "value": "131128" }, { "label": "河北衡水经济开发区", "value": "131171" }, { "label": "衡水滨湖新区", "value": "131172" }, { "label": "深州市", "value": "131182" }]], [[{ "label": "小店区", "value": "140105" }, { "label": "迎泽区", "value": "140106" }, { "label": "杏花岭区", "value": "140107" }, { "label": "尖草坪区", "value": "140108" }, { "label": "万柏林区", "value": "140109" }, { "label": "晋源区", "value": "140110" }, { "label": "清徐县", "value": "140121" }, { "label": "阳曲县", "value": "140122" }, { "label": "娄烦县", "value": "140123" }, { "label": "山西转型综合改革示范区", "value": "140171" }, { "label": "古交市", "value": "140181" }], [{ "label": "城区", "value": "140202" }, { "label": "矿区", "value": "140203" }, { "label": "南郊区", "value": "140211" }, { "label": "新荣区", "value": "140212" }, { "label": "阳高县", "value": "140221" }, { "label": "天镇县", "value": "140222" }, { "label": "广灵县", "value": "140223" }, { "label": "灵丘县", "value": "140224" }, { "label": "浑源县", "value": "140225" }, { "label": "左云县", "value": "140226" }, { "label": "大同县", "value": "140227" }, { "label": "山西大同经济开发区", "value": "140271" }], [{ "label": "城区", "value": "140302" }, { "label": "矿区", "value": "140303" }, { "label": "郊区", "value": "140311" }, { "label": "平定县", "value": "140321" }, { "label": "盂县", "value": "140322" }, { "label": "山西阳泉经济开发区", "value": "140371" }], [{ "label": "城区", "value": "140402" }, { "label": "郊区", "value": "140411" }, { "label": "长治县", "value": "140421" }, { "label": "襄垣县", "value": "140423" }, { "label": "屯留县", "value": "140424" }, { "label": "平顺县", "value": "140425" }, { "label": "黎城县", "value": "140426" }, { "label": "壶关县", "value": "140427" }, { "label": "长子县", "value": "140428" }, { "label": "武乡县", "value": "140429" }, { "label": "沁县", "value": "140430" }, { "label": "沁源县", "value": "140431" }, { "label": "山西长治高新技术产业园区", "value": "140471" }, { "label": "潞城市", "value": "140481" }], [{ "label": "城区", "value": "140502" }, { "label": "沁水县", "value": "140521" }, { "label": "阳城县", "value": "140522" }, { "label": "陵川县", "value": "140524" }, { "label": "泽州县", "value": "140525" }, { "label": "高平市", "value": "140581" }], [{ "label": "朔城区", "value": "140602" }, { "label": "平鲁区", "value": "140603" }, { "label": "山阴县", "value": "140621" }, { "label": "应县", "value": "140622" }, { "label": "右玉县", "value": "140623" }, { "label": "怀仁县", "value": "140624" }, { "label": "山西朔州经济开发区", "value": "140671" }], [{ "label": "榆次区", "value": "140702" }, { "label": "榆社县", "value": "140721" }, { "label": "左权县", "value": "140722" }, { "label": "和顺县", "value": "140723" }, { "label": "昔阳县", "value": "140724" }, { "label": "寿阳县", "value": "140725" }, { "label": "太谷县", "value": "140726" }, { "label": "祁县", "value": "140727" }, { "label": "平遥县", "value": "140728" }, { "label": "灵石县", "value": "140729" }, { "label": "介休市", "value": "140781" }], [{ "label": "盐湖区", "value": "140802" }, { "label": "临猗县", "value": "140821" }, { "label": "万荣县", "value": "140822" }, { "label": "闻喜县", "value": "140823" }, { "label": "稷山县", "value": "140824" }, { "label": "新绛县", "value": "140825" }, { "label": "绛县", "value": "140826" }, { "label": "垣曲县", "value": "140827" }, { "label": "夏县", "value": "140828" }, { "label": "平陆县", "value": "140829" }, { "label": "芮城县", "value": "140830" }, { "label": "永济市", "value": "140881" }, { "label": "河津市", "value": "140882" }], [{ "label": "忻府区", "value": "140902" }, { "label": "定襄县", "value": "140921" }, { "label": "五台县", "value": "140922" }, { "label": "代县", "value": "140923" }, { "label": "繁峙县", "value": "140924" }, { "label": "宁武县", "value": "140925" }, { "label": "静乐县", "value": "140926" }, { "label": "神池县", "value": "140927" }, { "label": "五寨县", "value": "140928" }, { "label": "岢岚县", "value": "140929" }, { "label": "河曲县", "value": "140930" }, { "label": "保德县", "value": "140931" }, { "label": "偏关县", "value": "140932" }, { "label": "五台山风景名胜区", "value": "140971" }, { "label": "原平市", "value": "140981" }], [{ "label": "尧都区", "value": "141002" }, { "label": "曲沃县", "value": "141021" }, { "label": "翼城县", "value": "141022" }, { "label": "襄汾县", "value": "141023" }, { "label": "洪洞县", "value": "141024" }, { "label": "古县", "value": "141025" }, { "label": "安泽县", "value": "141026" }, { "label": "浮山县", "value": "141027" }, { "label": "吉县", "value": "141028" }, { "label": "乡宁县", "value": "141029" }, { "label": "大宁县", "value": "141030" }, { "label": "隰县", "value": "141031" }, { "label": "永和县", "value": "141032" }, { "label": "蒲县", "value": "141033" }, { "label": "汾西县", "value": "141034" }, { "label": "侯马市", "value": "141081" }, { "label": "霍州市", "value": "141082" }], [{ "label": "离石区", "value": "141102" }, { "label": "文水县", "value": "141121" }, { "label": "交城县", "value": "141122" }, { "label": "兴县", "value": "141123" }, { "label": "临县", "value": "141124" }, { "label": "柳林县", "value": "141125" }, { "label": "石楼县", "value": "141126" }, { "label": "岚县", "value": "141127" }, { "label": "方山县", "value": "141128" }, { "label": "中阳县", "value": "141129" }, { "label": "交口县", "value": "141130" }, { "label": "孝义市", "value": "141181" }, { "label": "汾阳市", "value": "141182" }]], [[{ "label": "新城区", "value": "150102" }, { "label": "回民区", "value": "150103" }, { "label": "玉泉区", "value": "150104" }, { "label": "赛罕区", "value": "150105" }, { "label": "土默特左旗", "value": "150121" }, { "label": "托克托县", "value": "150122" }, { "label": "和林格尔县", "value": "150123" }, { "label": "清水河县", "value": "150124" }, { "label": "武川县", "value": "150125" }, { "label": "呼和浩特金海工业园区", "value": "150171" }, { "label": "呼和浩特经济技术开发区", "value": "150172" }], [{ "label": "东河区", "value": "150202" }, { "label": "昆都仑区", "value": "150203" }, { "label": "青山区", "value": "150204" }, { "label": "石拐区", "value": "150205" }, { "label": "白云鄂博矿区", "value": "150206" }, { "label": "九原区", "value": "150207" }, { "label": "土默特右旗", "value": "150221" }, { "label": "固阳县", "value": "150222" }, { "label": "达尔罕茂明安联合旗", "value": "150223" }, { "label": "包头稀土高新技术产业开发区", "value": "150271" }], [{ "label": "海勃湾区", "value": "150302" }, { "label": "海南区", "value": "150303" }, { "label": "乌达区", "value": "150304" }], [{ "label": "红山区", "value": "150402" }, { "label": "元宝山区", "value": "150403" }, { "label": "松山区", "value": "150404" }, { "label": "阿鲁科尔沁旗", "value": "150421" }, { "label": "巴林左旗", "value": "150422" }, { "label": "巴林右旗", "value": "150423" }, { "label": "林西县", "value": "150424" }, { "label": "克什克腾旗", "value": "150425" }, { "label": "翁牛特旗", "value": "150426" }, { "label": "喀喇沁旗", "value": "150428" }, { "label": "宁城县", "value": "150429" }, { "label": "敖汉旗", "value": "150430" }], [{ "label": "科尔沁区", "value": "150502" }, { "label": "科尔沁左翼中旗", "value": "150521" }, { "label": "科尔沁左翼后旗", "value": "150522" }, { "label": "开鲁县", "value": "150523" }, { "label": "库伦旗", "value": "150524" }, { "label": "奈曼旗", "value": "150525" }, { "label": "扎鲁特旗", "value": "150526" }, { "label": "通辽经济技术开发区", "value": "150571" }, { "label": "霍林郭勒市", "value": "150581" }], [{ "label": "东胜区", "value": "150602" }, { "label": "康巴什区", "value": "150603" }, { "label": "达拉特旗", "value": "150621" }, { "label": "准格尔旗", "value": "150622" }, { "label": "鄂托克前旗", "value": "150623" }, { "label": "鄂托克旗", "value": "150624" }, { "label": "杭锦旗", "value": "150625" }, { "label": "乌审旗", "value": "150626" }, { "label": "伊金霍洛旗", "value": "150627" }], [{ "label": "海拉尔区", "value": "150702" }, { "label": "扎赉诺尔区", "value": "150703" }, { "label": "阿荣旗", "value": "150721" }, { "label": "莫力达瓦达斡尔族自治旗", "value": "150722" }, { "label": "鄂伦春自治旗", "value": "150723" }, { "label": "鄂温克族自治旗", "value": "150724" }, { "label": "陈巴尔虎旗", "value": "150725" }, { "label": "新巴尔虎左旗", "value": "150726" }, { "label": "新巴尔虎右旗", "value": "150727" }, { "label": "满洲里市", "value": "150781" }, { "label": "牙克石市", "value": "150782" }, { "label": "扎兰屯市", "value": "150783" }, { "label": "额尔古纳市", "value": "150784" }, { "label": "根河市", "value": "150785" }], [{ "label": "临河区", "value": "150802" }, { "label": "五原县", "value": "150821" }, { "label": "磴口县", "value": "150822" }, { "label": "乌拉特前旗", "value": "150823" }, { "label": "乌拉特中旗", "value": "150824" }, { "label": "乌拉特后旗", "value": "150825" }, { "label": "杭锦后旗", "value": "150826" }], [{ "label": "集宁区", "value": "150902" }, { "label": "卓资县", "value": "150921" }, { "label": "化德县", "value": "150922" }, { "label": "商都县", "value": "150923" }, { "label": "兴和县", "value": "150924" }, { "label": "凉城县", "value": "150925" }, { "label": "察哈尔右翼前旗", "value": "150926" }, { "label": "察哈尔右翼中旗", "value": "150927" }, { "label": "察哈尔右翼后旗", "value": "150928" }, { "label": "四子王旗", "value": "150929" }, { "label": "丰镇市", "value": "150981" }], [{ "label": "乌兰浩特市", "value": "152201" }, { "label": "阿尔山市", "value": "152202" }, { "label": "科尔沁右翼前旗", "value": "152221" }, { "label": "科尔沁右翼中旗", "value": "152222" }, { "label": "扎赉特旗", "value": "152223" }, { "label": "突泉县", "value": "152224" }], [{ "label": "二连浩特市", "value": "152501" }, { "label": "锡林浩特市", "value": "152502" }, { "label": "阿巴嘎旗", "value": "152522" }, { "label": "苏尼特左旗", "value": "152523" }, { "label": "苏尼特右旗", "value": "152524" }, { "label": "东乌珠穆沁旗", "value": "152525" }, { "label": "西乌珠穆沁旗", "value": "152526" }, { "label": "太仆寺旗", "value": "152527" }, { "label": "镶黄旗", "value": "152528" }, { "label": "正镶白旗", "value": "152529" }, { "label": "正蓝旗", "value": "152530" }, { "label": "多伦县", "value": "152531" }, { "label": "乌拉盖管委会", "value": "152571" }], [{ "label": "阿拉善左旗", "value": "152921" }, { "label": "阿拉善右旗", "value": "152922" }, { "label": "额济纳旗", "value": "152923" }, { "label": "内蒙古阿拉善经济开发区", "value": "152971" }]], [[{ "label": "和平区", "value": "210102" }, { "label": "沈河区", "value": "210103" }, { "label": "大东区", "value": "210104" }, { "label": "皇姑区", "value": "210105" }, { "label": "铁西区", "value": "210106" }, { "label": "苏家屯区", "value": "210111" }, { "label": "浑南区", "value": "210112" }, { "label": "沈北新区", "value": "210113" }, { "label": "于洪区", "value": "210114" }, { "label": "辽中区", "value": "210115" }, { "label": "康平县", "value": "210123" }, { "label": "法库县", "value": "210124" }, { "label": "新民市", "value": "210181" }], [{ "label": "中山区", "value": "210202" }, { "label": "西岗区", "value": "210203" }, { "label": "沙河口区", "value": "210204" }, { "label": "甘井子区", "value": "210211" }, { "label": "旅顺口区", "value": "210212" }, { "label": "金州区", "value": "210213" }, { "label": "普兰店区", "value": "210214" }, { "label": "长海县", "value": "210224" }, { "label": "瓦房店市", "value": "210281" }, { "label": "庄河市", "value": "210283" }], [{ "label": "铁东区", "value": "210302" }, { "label": "铁西区", "value": "210303" }, { "label": "立山区", "value": "210304" }, { "label": "千山区", "value": "210311" }, { "label": "台安县", "value": "210321" }, { "label": "岫岩满族自治县", "value": "210323" }, { "label": "海城市", "value": "210381" }], [{ "label": "新抚区", "value": "210402" }, { "label": "东洲区", "value": "210403" }, { "label": "望花区", "value": "210404" }, { "label": "顺城区", "value": "210411" }, { "label": "抚顺县", "value": "210421" }, { "label": "新宾满族自治县", "value": "210422" }, { "label": "清原满族自治县", "value": "210423" }], [{ "label": "平山区", "value": "210502" }, { "label": "溪湖区", "value": "210503" }, { "label": "明山区", "value": "210504" }, { "label": "南芬区", "value": "210505" }, { "label": "本溪满族自治县", "value": "210521" }, { "label": "桓仁满族自治县", "value": "210522" }], [{ "label": "元宝区", "value": "210602" }, { "label": "振兴区", "value": "210603" }, { "label": "振安区", "value": "210604" }, { "label": "宽甸满族自治县", "value": "210624" }, { "label": "东港市", "value": "210681" }, { "label": "凤城市", "value": "210682" }], [{ "label": "古塔区", "value": "210702" }, { "label": "凌河区", "value": "210703" }, { "label": "太和区", "value": "210711" }, { "label": "黑山县", "value": "210726" }, { "label": "义县", "value": "210727" }, { "label": "凌海市", "value": "210781" }, { "label": "北镇市", "value": "210782" }], [{ "label": "站前区", "value": "210802" }, { "label": "西市区", "value": "210803" }, { "label": "鲅鱼圈区", "value": "210804" }, { "label": "老边区", "value": "210811" }, { "label": "盖州市", "value": "210881" }, { "label": "大石桥市", "value": "210882" }], [{ "label": "海州区", "value": "210902" }, { "label": "新邱区", "value": "210903" }, { "label": "太平区", "value": "210904" }, { "label": "清河门区", "value": "210905" }, { "label": "细河区", "value": "210911" }, { "label": "阜新蒙古族自治县", "value": "210921" }, { "label": "彰武县", "value": "210922" }], [{ "label": "白塔区", "value": "211002" }, { "label": "文圣区", "value": "211003" }, { "label": "宏伟区", "value": "211004" }, { "label": "弓长岭区", "value": "211005" }, { "label": "太子河区", "value": "211011" }, { "label": "辽阳县", "value": "211021" }, { "label": "灯塔市", "value": "211081" }], [{ "label": "双台子区", "value": "211102" }, { "label": "兴隆台区", "value": "211103" }, { "label": "大洼区", "value": "211104" }, { "label": "盘山县", "value": "211122" }], [{ "label": "银州区", "value": "211202" }, { "label": "清河区", "value": "211204" }, { "label": "铁岭县", "value": "211221" }, { "label": "西丰县", "value": "211223" }, { "label": "昌图县", "value": "211224" }, { "label": "调兵山市", "value": "211281" }, { "label": "开原市", "value": "211282" }], [{ "label": "双塔区", "value": "211302" }, { "label": "龙城区", "value": "211303" }, { "label": "朝阳县", "value": "211321" }, { "label": "建平县", "value": "211322" }, { "label": "喀喇沁左翼蒙古族自治县", "value": "211324" }, { "label": "北票市", "value": "211381" }, { "label": "凌源市", "value": "211382" }], [{ "label": "连山区", "value": "211402" }, { "label": "龙港区", "value": "211403" }, { "label": "南票区", "value": "211404" }, { "label": "绥中县", "value": "211421" }, { "label": "建昌县", "value": "211422" }, { "label": "兴城市", "value": "211481" }]], [[{ "label": "南关区", "value": "220102" }, { "label": "宽城区", "value": "220103" }, { "label": "朝阳区", "value": "220104" }, { "label": "二道区", "value": "220105" }, { "label": "绿园区", "value": "220106" }, { "label": "双阳区", "value": "220112" }, { "label": "九台区", "value": "220113" }, { "label": "农安县", "value": "220122" }, { "label": "长春经济技术开发区", "value": "220171" }, { "label": "长春净月高新技术产业开发区", "value": "220172" }, { "label": "长春高新技术产业开发区", "value": "220173" }, { "label": "长春汽车经济技术开发区", "value": "220174" }, { "label": "榆树市", "value": "220182" }, { "label": "德惠市", "value": "220183" }], [{ "label": "昌邑区", "value": "220202" }, { "label": "龙潭区", "value": "220203" }, { "label": "船营区", "value": "220204" }, { "label": "丰满区", "value": "220211" }, { "label": "永吉县", "value": "220221" }, { "label": "吉林经济开发区", "value": "220271" }, { "label": "吉林高新技术产业开发区", "value": "220272" }, { "label": "吉林中国新加坡食品区", "value": "220273" }, { "label": "蛟河市", "value": "220281" }, { "label": "桦甸市", "value": "220282" }, { "label": "舒兰市", "value": "220283" }, { "label": "磐石市", "value": "220284" }], [{ "label": "铁西区", "value": "220302" }, { "label": "铁东区", "value": "220303" }, { "label": "梨树县", "value": "220322" }, { "label": "伊通满族自治县", "value": "220323" }, { "label": "公主岭市", "value": "220381" }, { "label": "双辽市", "value": "220382" }], [{ "label": "龙山区", "value": "220402" }, { "label": "西安区", "value": "220403" }, { "label": "东丰县", "value": "220421" }, { "label": "东辽县", "value": "220422" }], [{ "label": "东昌区", "value": "220502" }, { "label": "二道江区", "value": "220503" }, { "label": "通化县", "value": "220521" }, { "label": "辉南县", "value": "220523" }, { "label": "柳河县", "value": "220524" }, { "label": "梅河口市", "value": "220581" }, { "label": "集安市", "value": "220582" }], [{ "label": "浑江区", "value": "220602" }, { "label": "江源区", "value": "220605" }, { "label": "抚松县", "value": "220621" }, { "label": "靖宇县", "value": "220622" }, { "label": "长白朝鲜族自治县", "value": "220623" }, { "label": "临江市", "value": "220681" }], [{ "label": "宁江区", "value": "220702" }, { "label": "前郭尔罗斯蒙古族自治县", "value": "220721" }, { "label": "长岭县", "value": "220722" }, { "label": "乾安县", "value": "220723" }, { "label": "吉林松原经济开发区", "value": "220771" }, { "label": "扶余市", "value": "220781" }], [{ "label": "洮北区", "value": "220802" }, { "label": "镇赉县", "value": "220821" }, { "label": "通榆县", "value": "220822" }, { "label": "吉林白城经济开发区", "value": "220871" }, { "label": "洮南市", "value": "220881" }, { "label": "大安市", "value": "220882" }], [{ "label": "延吉市", "value": "222401" }, { "label": "图们市", "value": "222402" }, { "label": "敦化市", "value": "222403" }, { "label": "珲春市", "value": "222404" }, { "label": "龙井市", "value": "222405" }, { "label": "和龙市", "value": "222406" }, { "label": "汪清县", "value": "222424" }, { "label": "安图县", "value": "222426" }]], [[{ "label": "道里区", "value": "230102" }, { "label": "南岗区", "value": "230103" }, { "label": "道外区", "value": "230104" }, { "label": "平房区", "value": "230108" }, { "label": "松北区", "value": "230109" }, { "label": "香坊区", "value": "230110" }, { "label": "呼兰区", "value": "230111" }, { "label": "阿城区", "value": "230112" }, { "label": "双城区", "value": "230113" }, { "label": "依兰县", "value": "230123" }, { "label": "方正县", "value": "230124" }, { "label": "宾县", "value": "230125" }, { "label": "巴彦县", "value": "230126" }, { "label": "木兰县", "value": "230127" }, { "label": "通河县", "value": "230128" }, { "label": "延寿县", "value": "230129" }, { "label": "尚志市", "value": "230183" }, { "label": "五常市", "value": "230184" }], [{ "label": "龙沙区", "value": "230202" }, { "label": "建华区", "value": "230203" }, { "label": "铁锋区", "value": "230204" }, { "label": "昂昂溪区", "value": "230205" }, { "label": "富拉尔基区", "value": "230206" }, { "label": "碾子山区", "value": "230207" }, { "label": "梅里斯达斡尔族区", "value": "230208" }, { "label": "龙江县", "value": "230221" }, { "label": "依安县", "value": "230223" }, { "label": "泰来县", "value": "230224" }, { "label": "甘南县", "value": "230225" }, { "label": "富裕县", "value": "230227" }, { "label": "克山县", "value": "230229" }, { "label": "克东县", "value": "230230" }, { "label": "拜泉县", "value": "230231" }, { "label": "讷河市", "value": "230281" }], [{ "label": "鸡冠区", "value": "230302" }, { "label": "恒山区", "value": "230303" }, { "label": "滴道区", "value": "230304" }, { "label": "梨树区", "value": "230305" }, { "label": "城子河区", "value": "230306" }, { "label": "麻山区", "value": "230307" }, { "label": "鸡东县", "value": "230321" }, { "label": "虎林市", "value": "230381" }, { "label": "密山市", "value": "230382" }], [{ "label": "向阳区", "value": "230402" }, { "label": "工农区", "value": "230403" }, { "label": "南山区", "value": "230404" }, { "label": "兴安区", "value": "230405" }, { "label": "东山区", "value": "230406" }, { "label": "兴山区", "value": "230407" }, { "label": "萝北县", "value": "230421" }, { "label": "绥滨县", "value": "230422" }], [{ "label": "尖山区", "value": "230502" }, { "label": "岭东区", "value": "230503" }, { "label": "四方台区", "value": "230505" }, { "label": "宝山区", "value": "230506" }, { "label": "集贤县", "value": "230521" }, { "label": "友谊县", "value": "230522" }, { "label": "宝清县", "value": "230523" }, { "label": "饶河县", "value": "230524" }], [{ "label": "萨尔图区", "value": "230602" }, { "label": "龙凤区", "value": "230603" }, { "label": "让胡路区", "value": "230604" }, { "label": "红岗区", "value": "230605" }, { "label": "大同区", "value": "230606" }, { "label": "肇州县", "value": "230621" }, { "label": "肇源县", "value": "230622" }, { "label": "林甸县", "value": "230623" }, { "label": "杜尔伯特蒙古族自治县", "value": "230624" }, { "label": "大庆高新技术产业开发区", "value": "230671" }], [{ "label": "伊春区", "value": "230702" }, { "label": "南岔区", "value": "230703" }, { "label": "友好区", "value": "230704" }, { "label": "西林区", "value": "230705" }, { "label": "翠峦区", "value": "230706" }, { "label": "新青区", "value": "230707" }, { "label": "美溪区", "value": "230708" }, { "label": "金山屯区", "value": "230709" }, { "label": "五营区", "value": "230710" }, { "label": "乌马河区", "value": "230711" }, { "label": "汤旺河区", "value": "230712" }, { "label": "带岭区", "value": "230713" }, { "label": "乌伊岭区", "value": "230714" }, { "label": "红星区", "value": "230715" }, { "label": "上甘岭区", "value": "230716" }, { "label": "嘉荫县", "value": "230722" }, { "label": "铁力市", "value": "230781" }], [{ "label": "向阳区", "value": "230803" }, { "label": "前进区", "value": "230804" }, { "label": "东风区", "value": "230805" }, { "label": "郊区", "value": "230811" }, { "label": "桦南县", "value": "230822" }, { "label": "桦川县", "value": "230826" }, { "label": "汤原县", "value": "230828" }, { "label": "同江市", "value": "230881" }, { "label": "富锦市", "value": "230882" }, { "label": "抚远市", "value": "230883" }], [{ "label": "新兴区", "value": "230902" }, { "label": "桃山区", "value": "230903" }, { "label": "茄子河区", "value": "230904" }, { "label": "勃利县", "value": "230921" }], [{ "label": "东安区", "value": "231002" }, { "label": "阳明区", "value": "231003" }, { "label": "爱民区", "value": "231004" }, { "label": "西安区", "value": "231005" }, { "label": "林口县", "value": "231025" }, { "label": "牡丹江经济技术开发区", "value": "231071" }, { "label": "绥芬河市", "value": "231081" }, { "label": "海林市", "value": "231083" }, { "label": "宁安市", "value": "231084" }, { "label": "穆棱市", "value": "231085" }, { "label": "东宁市", "value": "231086" }], [{ "label": "爱辉区", "value": "231102" }, { "label": "嫩江县", "value": "231121" }, { "label": "逊克县", "value": "231123" }, { "label": "孙吴县", "value": "231124" }, { "label": "北安市", "value": "231181" }, { "label": "五大连池市", "value": "231182" }], [{ "label": "北林区", "value": "231202" }, { "label": "望奎县", "value": "231221" }, { "label": "兰西县", "value": "231222" }, { "label": "青冈县", "value": "231223" }, { "label": "庆安县", "value": "231224" }, { "label": "明水县", "value": "231225" }, { "label": "绥棱县", "value": "231226" }, { "label": "安达市", "value": "231281" }, { "label": "肇东市", "value": "231282" }, { "label": "海伦市", "value": "231283" }], [{ "label": "加格达奇区", "value": "232701" }, { "label": "松岭区", "value": "232702" }, { "label": "新林区", "value": "232703" }, { "label": "呼中区", "value": "232704" }, { "label": "呼玛县", "value": "232721" }, { "label": "塔河县", "value": "232722" }, { "label": "漠河县", "value": "232723" }]], [[{ "label": "黄浦区", "value": "310101" }, { "label": "徐汇区", "value": "310104" }, { "label": "长宁区", "value": "310105" }, { "label": "静安区", "value": "310106" }, { "label": "普陀区", "value": "310107" }, { "label": "虹口区", "value": "310109" }, { "label": "杨浦区", "value": "310110" }, { "label": "闵行区", "value": "310112" }, { "label": "宝山区", "value": "310113" }, { "label": "嘉定区", "value": "310114" }, { "label": "浦东新区", "value": "310115" }, { "label": "金山区", "value": "310116" }, { "label": "松江区", "value": "310117" }, { "label": "青浦区", "value": "310118" }, { "label": "奉贤区", "value": "310120" }, { "label": "崇明区", "value": "310151" }]], [[{ "label": "玄武区", "value": "320102" }, { "label": "秦淮区", "value": "320104" }, { "label": "建邺区", "value": "320105" }, { "label": "鼓楼区", "value": "320106" }, { "label": "浦口区", "value": "320111" }, { "label": "栖霞区", "value": "320113" }, { "label": "雨花台区", "value": "320114" }, { "label": "江宁区", "value": "320115" }, { "label": "六合区", "value": "320116" }, { "label": "溧水区", "value": "320117" }, { "label": "高淳区", "value": "320118" }], [{ "label": "锡山区", "value": "320205" }, { "label": "惠山区", "value": "320206" }, { "label": "滨湖区", "value": "320211" }, { "label": "梁溪区", "value": "320213" }, { "label": "新吴区", "value": "320214" }, { "label": "江阴市", "value": "320281" }, { "label": "宜兴市", "value": "320282" }], [{ "label": "鼓楼区", "value": "320302" }, { "label": "云龙区", "value": "320303" }, { "label": "贾汪区", "value": "320305" }, { "label": "泉山区", "value": "320311" }, { "label": "铜山区", "value": "320312" }, { "label": "丰县", "value": "320321" }, { "label": "沛县", "value": "320322" }, { "label": "睢宁县", "value": "320324" }, { "label": "徐州经济技术开发区", "value": "320371" }, { "label": "新沂市", "value": "320381" }, { "label": "邳州市", "value": "320382" }], [{ "label": "天宁区", "value": "320402" }, { "label": "钟楼区", "value": "320404" }, { "label": "新北区", "value": "320411" }, { "label": "武进区", "value": "320412" }, { "label": "金坛区", "value": "320413" }, { "label": "溧阳市", "value": "320481" }], [{ "label": "虎丘区", "value": "320505" }, { "label": "吴中区", "value": "320506" }, { "label": "相城区", "value": "320507" }, { "label": "姑苏区", "value": "320508" }, { "label": "吴江区", "value": "320509" }, { "label": "苏州工业园区", "value": "320571" }, { "label": "常熟市", "value": "320581" }, { "label": "张家港市", "value": "320582" }, { "label": "昆山市", "value": "320583" }, { "label": "太仓市", "value": "320585" }], [{ "label": "崇川区", "value": "320602" }, { "label": "港闸区", "value": "320611" }, { "label": "通州区", "value": "320612" }, { "label": "海安县", "value": "320621" }, { "label": "如东县", "value": "320623" }, { "label": "南通经济技术开发区", "value": "320671" }, { "label": "启东市", "value": "320681" }, { "label": "如皋市", "value": "320682" }, { "label": "海门市", "value": "320684" }], [{ "label": "连云区", "value": "320703" }, { "label": "海州区", "value": "320706" }, { "label": "赣榆区", "value": "320707" }, { "label": "东海县", "value": "320722" }, { "label": "灌云县", "value": "320723" }, { "label": "灌南县", "value": "320724" }, { "label": "连云港经济技术开发区", "value": "320771" }, { "label": "连云港高新技术产业开发区", "value": "320772" }], [{ "label": "淮安区", "value": "320803" }, { "label": "淮阴区", "value": "320804" }, { "label": "清江浦区", "value": "320812" }, { "label": "洪泽区", "value": "320813" }, { "label": "涟水县", "value": "320826" }, { "label": "盱眙县", "value": "320830" }, { "label": "金湖县", "value": "320831" }, { "label": "淮安经济技术开发区", "value": "320871" }], [{ "label": "亭湖区", "value": "320902" }, { "label": "盐都区", "value": "320903" }, { "label": "大丰区", "value": "320904" }, { "label": "响水县", "value": "320921" }, { "label": "滨海县", "value": "320922" }, { "label": "阜宁县", "value": "320923" }, { "label": "射阳县", "value": "320924" }, { "label": "建湖县", "value": "320925" }, { "label": "盐城经济技术开发区", "value": "320971" }, { "label": "东台市", "value": "320981" }], [{ "label": "广陵区", "value": "321002" }, { "label": "邗江区", "value": "321003" }, { "label": "江都区", "value": "321012" }, { "label": "宝应县", "value": "321023" }, { "label": "扬州经济技术开发区", "value": "321071" }, { "label": "仪征市", "value": "321081" }, { "label": "高邮市", "value": "321084" }], [{ "label": "京口区", "value": "321102" }, { "label": "润州区", "value": "321111" }, { "label": "丹徒区", "value": "321112" }, { "label": "镇江新区", "value": "321171" }, { "label": "丹阳市", "value": "321181" }, { "label": "扬中市", "value": "321182" }, { "label": "句容市", "value": "321183" }], [{ "label": "海陵区", "value": "321202" }, { "label": "高港区", "value": "321203" }, { "label": "姜堰区", "value": "321204" }, { "label": "泰州医药高新技术产业开发区", "value": "321271" }, { "label": "兴化市", "value": "321281" }, { "label": "靖江市", "value": "321282" }, { "label": "泰兴市", "value": "321283" }], [{ "label": "宿城区", "value": "321302" }, { "label": "宿豫区", "value": "321311" }, { "label": "沭阳县", "value": "321322" }, { "label": "泗阳县", "value": "321323" }, { "label": "泗洪县", "value": "321324" }, { "label": "宿迁经济技术开发区", "value": "321371" }]], [[{ "label": "上城区", "value": "330102" }, { "label": "下城区", "value": "330103" }, { "label": "江干区", "value": "330104" }, { "label": "拱墅区", "value": "330105" }, { "label": "西湖区", "value": "330106" }, { "label": "滨江区", "value": "330108" }, { "label": "萧山区", "value": "330109" }, { "label": "余杭区", "value": "330110" }, { "label": "富阳区", "value": "330111" }, { "label": "临安区", "value": "330112" }, { "label": "桐庐县", "value": "330122" }, { "label": "淳安县", "value": "330127" }, { "label": "建德市", "value": "330182" }], [{ "label": "海曙区", "value": "330203" }, { "label": "江北区", "value": "330205" }, { "label": "北仑区", "value": "330206" }, { "label": "镇海区", "value": "330211" }, { "label": "鄞州区", "value": "330212" }, { "label": "奉化区", "value": "330213" }, { "label": "象山县", "value": "330225" }, { "label": "宁海县", "value": "330226" }, { "label": "余姚市", "value": "330281" }, { "label": "慈溪市", "value": "330282" }], [{ "label": "鹿城区", "value": "330302" }, { "label": "龙湾区", "value": "330303" }, { "label": "瓯海区", "value": "330304" }, { "label": "洞头区", "value": "330305" }, { "label": "永嘉县", "value": "330324" }, { "label": "平阳县", "value": "330326" }, { "label": "苍南县", "value": "330327" }, { "label": "文成县", "value": "330328" }, { "label": "泰顺县", "value": "330329" }, { "label": "温州经济技术开发区", "value": "330371" }, { "label": "瑞安市", "value": "330381" }, { "label": "乐清市", "value": "330382" }], [{ "label": "南湖区", "value": "330402" }, { "label": "秀洲区", "value": "330411" }, { "label": "嘉善县", "value": "330421" }, { "label": "海盐县", "value": "330424" }, { "label": "海宁市", "value": "330481" }, { "label": "平湖市", "value": "330482" }, { "label": "桐乡市", "value": "330483" }], [{ "label": "吴兴区", "value": "330502" }, { "label": "南浔区", "value": "330503" }, { "label": "德清县", "value": "330521" }, { "label": "长兴县", "value": "330522" }, { "label": "安吉县", "value": "330523" }], [{ "label": "越城区", "value": "330602" }, { "label": "柯桥区", "value": "330603" }, { "label": "上虞区", "value": "330604" }, { "label": "新昌县", "value": "330624" }, { "label": "诸暨市", "value": "330681" }, { "label": "嵊州市", "value": "330683" }], [{ "label": "婺城区", "value": "330702" }, { "label": "金东区", "value": "330703" }, { "label": "武义县", "value": "330723" }, { "label": "浦江县", "value": "330726" }, { "label": "磐安县", "value": "330727" }, { "label": "兰溪市", "value": "330781" }, { "label": "义乌市", "value": "330782" }, { "label": "东阳市", "value": "330783" }, { "label": "永康市", "value": "330784" }], [{ "label": "柯城区", "value": "330802" }, { "label": "衢江区", "value": "330803" }, { "label": "常山县", "value": "330822" }, { "label": "开化县", "value": "330824" }, { "label": "龙游县", "value": "330825" }, { "label": "江山市", "value": "330881" }], [{ "label": "定海区", "value": "330902" }, { "label": "普陀区", "value": "330903" }, { "label": "岱山县", "value": "330921" }, { "label": "嵊泗县", "value": "330922" }], [{ "label": "椒江区", "value": "331002" }, { "label": "黄岩区", "value": "331003" }, { "label": "路桥区", "value": "331004" }, { "label": "三门县", "value": "331022" }, { "label": "天台县", "value": "331023" }, { "label": "仙居县", "value": "331024" }, { "label": "温岭市", "value": "331081" }, { "label": "临海市", "value": "331082" }, { "label": "玉环市", "value": "331083" }], [{ "label": "莲都区", "value": "331102" }, { "label": "青田县", "value": "331121" }, { "label": "缙云县", "value": "331122" }, { "label": "遂昌县", "value": "331123" }, { "label": "松阳县", "value": "331124" }, { "label": "云和县", "value": "331125" }, { "label": "庆元县", "value": "331126" }, { "label": "景宁畲族自治县", "value": "331127" }, { "label": "龙泉市", "value": "331181" }]], [[{ "label": "瑶海区", "value": "340102" }, { "label": "庐阳区", "value": "340103" }, { "label": "蜀山区", "value": "340104" }, { "label": "包河区", "value": "340111" }, { "label": "长丰县", "value": "340121" }, { "label": "肥东县", "value": "340122" }, { "label": "肥西县", "value": "340123" }, { "label": "庐江县", "value": "340124" }, { "label": "合肥高新技术产业开发区", "value": "340171" }, { "label": "合肥经济技术开发区", "value": "340172" }, { "label": "合肥新站高新技术产业开发区", "value": "340173" }, { "label": "巢湖市", "value": "340181" }], [{ "label": "镜湖区", "value": "340202" }, { "label": "弋江区", "value": "340203" }, { "label": "鸠江区", "value": "340207" }, { "label": "三山区", "value": "340208" }, { "label": "芜湖县", "value": "340221" }, { "label": "繁昌县", "value": "340222" }, { "label": "南陵县", "value": "340223" }, { "label": "无为县", "value": "340225" }, { "label": "芜湖经济技术开发区", "value": "340271" }, { "label": "安徽芜湖长江大桥经济开发区", "value": "340272" }], [{ "label": "龙子湖区", "value": "340302" }, { "label": "蚌山区", "value": "340303" }, { "label": "禹会区", "value": "340304" }, { "label": "淮上区", "value": "340311" }, { "label": "怀远县", "value": "340321" }, { "label": "五河县", "value": "340322" }, { "label": "固镇县", "value": "340323" }, { "label": "蚌埠市高新技术开发区", "value": "340371" }, { "label": "蚌埠市经济开发区", "value": "340372" }], [{ "label": "大通区", "value": "340402" }, { "label": "田家庵区", "value": "340403" }, { "label": "谢家集区", "value": "340404" }, { "label": "八公山区", "value": "340405" }, { "label": "潘集区", "value": "340406" }, { "label": "凤台县", "value": "340421" }, { "label": "寿县", "value": "340422" }], [{ "label": "花山区", "value": "340503" }, { "label": "雨山区", "value": "340504" }, { "label": "博望区", "value": "340506" }, { "label": "当涂县", "value": "340521" }, { "label": "含山县", "value": "340522" }, { "label": "和县", "value": "340523" }], [{ "label": "杜集区", "value": "340602" }, { "label": "相山区", "value": "340603" }, { "label": "烈山区", "value": "340604" }, { "label": "濉溪县", "value": "340621" }], [{ "label": "铜官区", "value": "340705" }, { "label": "义安区", "value": "340706" }, { "label": "郊区", "value": "340711" }, { "label": "枞阳县", "value": "340722" }], [{ "label": "迎江区", "value": "340802" }, { "label": "大观区", "value": "340803" }, { "label": "宜秀区", "value": "340811" }, { "label": "怀宁县", "value": "340822" }, { "label": "潜山县", "value": "340824" }, { "label": "太湖县", "value": "340825" }, { "label": "宿松县", "value": "340826" }, { "label": "望江县", "value": "340827" }, { "label": "岳西县", "value": "340828" }, { "label": "安徽安庆经济开发区", "value": "340871" }, { "label": "桐城市", "value": "340881" }], [{ "label": "屯溪区", "value": "341002" }, { "label": "黄山区", "value": "341003" }, { "label": "徽州区", "value": "341004" }, { "label": "歙县", "value": "341021" }, { "label": "休宁县", "value": "341022" }, { "label": "黟县", "value": "341023" }, { "label": "祁门县", "value": "341024" }], [{ "label": "琅琊区", "value": "341102" }, { "label": "南谯区", "value": "341103" }, { "label": "来安县", "value": "341122" }, { "label": "全椒县", "value": "341124" }, { "label": "定远县", "value": "341125" }, { "label": "凤阳县", "value": "341126" }, { "label": "苏滁现代产业园", "value": "341171" }, { "label": "滁州经济技术开发区", "value": "341172" }, { "label": "天长市", "value": "341181" }, { "label": "明光市", "value": "341182" }], [{ "label": "颍州区", "value": "341202" }, { "label": "颍东区", "value": "341203" }, { "label": "颍泉区", "value": "341204" }, { "label": "临泉县", "value": "341221" }, { "label": "太和县", "value": "341222" }, { "label": "阜南县", "value": "341225" }, { "label": "颍上县", "value": "341226" }, { "label": "阜阳合肥现代产业园区", "value": "341271" }, { "label": "阜阳经济技术开发区", "value": "341272" }, { "label": "界首市", "value": "341282" }], [{ "label": "埇桥区", "value": "341302" }, { "label": "砀山县", "value": "341321" }, { "label": "萧县", "value": "341322" }, { "label": "灵璧县", "value": "341323" }, { "label": "泗县", "value": "341324" }, { "label": "宿州马鞍山现代产业园区", "value": "341371" }, { "label": "宿州经济技术开发区", "value": "341372" }], [{ "label": "金安区", "value": "341502" }, { "label": "裕安区", "value": "341503" }, { "label": "叶集区", "value": "341504" }, { "label": "霍邱县", "value": "341522" }, { "label": "舒城县", "value": "341523" }, { "label": "金寨县", "value": "341524" }, { "label": "霍山县", "value": "341525" }], [{ "label": "谯城区", "value": "341602" }, { "label": "涡阳县", "value": "341621" }, { "label": "蒙城县", "value": "341622" }, { "label": "利辛县", "value": "341623" }], [{ "label": "贵池区", "value": "341702" }, { "label": "东至县", "value": "341721" }, { "label": "石台县", "value": "341722" }, { "label": "青阳县", "value": "341723" }], [{ "label": "宣州区", "value": "341802" }, { "label": "郎溪县", "value": "341821" }, { "label": "广德县", "value": "341822" }, { "label": "泾县", "value": "341823" }, { "label": "绩溪县", "value": "341824" }, { "label": "旌德县", "value": "341825" }, { "label": "宣城市经济开发区", "value": "341871" }, { "label": "宁国市", "value": "341881" }]], [[{ "label": "鼓楼区", "value": "350102" }, { "label": "台江区", "value": "350103" }, { "label": "仓山区", "value": "350104" }, { "label": "马尾区", "value": "350105" }, { "label": "晋安区", "value": "350111" }, { "label": "闽侯县", "value": "350121" }, { "label": "连江县", "value": "350122" }, { "label": "罗源县", "value": "350123" }, { "label": "闽清县", "value": "350124" }, { "label": "永泰县", "value": "350125" }, { "label": "平潭县", "value": "350128" }, { "label": "福清市", "value": "350181" }, { "label": "长乐市", "value": "350182" }], [{ "label": "思明区", "value": "350203" }, { "label": "海沧区", "value": "350205" }, { "label": "湖里区", "value": "350206" }, { "label": "集美区", "value": "350211" }, { "label": "同安区", "value": "350212" }, { "label": "翔安区", "value": "350213" }], [{ "label": "城厢区", "value": "350302" }, { "label": "涵江区", "value": "350303" }, { "label": "荔城区", "value": "350304" }, { "label": "秀屿区", "value": "350305" }, { "label": "仙游县", "value": "350322" }], [{ "label": "梅列区", "value": "350402" }, { "label": "三元区", "value": "350403" }, { "label": "明溪县", "value": "350421" }, { "label": "清流县", "value": "350423" }, { "label": "宁化县", "value": "350424" }, { "label": "大田县", "value": "350425" }, { "label": "尤溪县", "value": "350426" }, { "label": "沙县", "value": "350427" }, { "label": "将乐县", "value": "350428" }, { "label": "泰宁县", "value": "350429" }, { "label": "建宁县", "value": "350430" }, { "label": "永安市", "value": "350481" }], [{ "label": "鲤城区", "value": "350502" }, { "label": "丰泽区", "value": "350503" }, { "label": "洛江区", "value": "350504" }, { "label": "泉港区", "value": "350505" }, { "label": "惠安县", "value": "350521" }, { "label": "安溪县", "value": "350524" }, { "label": "永春县", "value": "350525" }, { "label": "德化县", "value": "350526" }, { "label": "金门县", "value": "350527" }, { "label": "石狮市", "value": "350581" }, { "label": "晋江市", "value": "350582" }, { "label": "南安市", "value": "350583" }], [{ "label": "芗城区", "value": "350602" }, { "label": "龙文区", "value": "350603" }, { "label": "云霄县", "value": "350622" }, { "label": "漳浦县", "value": "350623" }, { "label": "诏安县", "value": "350624" }, { "label": "长泰县", "value": "350625" }, { "label": "东山县", "value": "350626" }, { "label": "南靖县", "value": "350627" }, { "label": "平和县", "value": "350628" }, { "label": "华安县", "value": "350629" }, { "label": "龙海市", "value": "350681" }], [{ "label": "延平区", "value": "350702" }, { "label": "建阳区", "value": "350703" }, { "label": "顺昌县", "value": "350721" }, { "label": "浦城县", "value": "350722" }, { "label": "光泽县", "value": "350723" }, { "label": "松溪县", "value": "350724" }, { "label": "政和县", "value": "350725" }, { "label": "邵武市", "value": "350781" }, { "label": "武夷山市", "value": "350782" }, { "label": "建瓯市", "value": "350783" }], [{ "label": "新罗区", "value": "350802" }, { "label": "永定区", "value": "350803" }, { "label": "长汀县", "value": "350821" }, { "label": "上杭县", "value": "350823" }, { "label": "武平县", "value": "350824" }, { "label": "连城县", "value": "350825" }, { "label": "漳平市", "value": "350881" }], [{ "label": "蕉城区", "value": "350902" }, { "label": "霞浦县", "value": "350921" }, { "label": "古田县", "value": "350922" }, { "label": "屏南县", "value": "350923" }, { "label": "寿宁县", "value": "350924" }, { "label": "周宁县", "value": "350925" }, { "label": "柘荣县", "value": "350926" }, { "label": "福安市", "value": "350981" }, { "label": "福鼎市", "value": "350982" }]], [[{ "label": "东湖区", "value": "360102" }, { "label": "西湖区", "value": "360103" }, { "label": "青云谱区", "value": "360104" }, { "label": "湾里区", "value": "360105" }, { "label": "青山湖区", "value": "360111" }, { "label": "新建区", "value": "360112" }, { "label": "南昌县", "value": "360121" }, { "label": "安义县", "value": "360123" }, { "label": "进贤县", "value": "360124" }], [{ "label": "昌江区", "value": "360202" }, { "label": "珠山区", "value": "360203" }, { "label": "浮梁县", "value": "360222" }, { "label": "乐平市", "value": "360281" }], [{ "label": "安源区", "value": "360302" }, { "label": "湘东区", "value": "360313" }, { "label": "莲花县", "value": "360321" }, { "label": "上栗县", "value": "360322" }, { "label": "芦溪县", "value": "360323" }], [{ "label": "濂溪区", "value": "360402" }, { "label": "浔阳区", "value": "360403" }, { "label": "柴桑区", "value": "360404" }, { "label": "武宁县", "value": "360423" }, { "label": "修水县", "value": "360424" }, { "label": "永修县", "value": "360425" }, { "label": "德安县", "value": "360426" }, { "label": "都昌县", "value": "360428" }, { "label": "湖口县", "value": "360429" }, { "label": "彭泽县", "value": "360430" }, { "label": "瑞昌市", "value": "360481" }, { "label": "共青城市", "value": "360482" }, { "label": "庐山市", "value": "360483" }], [{ "label": "渝水区", "value": "360502" }, { "label": "分宜县", "value": "360521" }], [{ "label": "月湖区", "value": "360602" }, { "label": "余江县", "value": "360622" }, { "label": "贵溪市", "value": "360681" }], [{ "label": "章贡区", "value": "360702" }, { "label": "南康区", "value": "360703" }, { "label": "赣县区", "value": "360704" }, { "label": "信丰县", "value": "360722" }, { "label": "大余县", "value": "360723" }, { "label": "上犹县", "value": "360724" }, { "label": "崇义县", "value": "360725" }, { "label": "安远县", "value": "360726" }, { "label": "龙南县", "value": "360727" }, { "label": "定南县", "value": "360728" }, { "label": "全南县", "value": "360729" }, { "label": "宁都县", "value": "360730" }, { "label": "于都县", "value": "360731" }, { "label": "兴国县", "value": "360732" }, { "label": "会昌县", "value": "360733" }, { "label": "寻乌县", "value": "360734" }, { "label": "石城县", "value": "360735" }, { "label": "瑞金市", "value": "360781" }], [{ "label": "吉州区", "value": "360802" }, { "label": "青原区", "value": "360803" }, { "label": "吉安县", "value": "360821" }, { "label": "吉水县", "value": "360822" }, { "label": "峡江县", "value": "360823" }, { "label": "新干县", "value": "360824" }, { "label": "永丰县", "value": "360825" }, { "label": "泰和县", "value": "360826" }, { "label": "遂川县", "value": "360827" }, { "label": "万安县", "value": "360828" }, { "label": "安福县", "value": "360829" }, { "label": "永新县", "value": "360830" }, { "label": "井冈山市", "value": "360881" }], [{ "label": "袁州区", "value": "360902" }, { "label": "奉新县", "value": "360921" }, { "label": "万载县", "value": "360922" }, { "label": "上高县", "value": "360923" }, { "label": "宜丰县", "value": "360924" }, { "label": "靖安县", "value": "360925" }, { "label": "铜鼓县", "value": "360926" }, { "label": "丰城市", "value": "360981" }, { "label": "樟树市", "value": "360982" }, { "label": "高安市", "value": "360983" }], [{ "label": "临川区", "value": "361002" }, { "label": "东乡区", "value": "361003" }, { "label": "南城县", "value": "361021" }, { "label": "黎川县", "value": "361022" }, { "label": "南丰县", "value": "361023" }, { "label": "崇仁县", "value": "361024" }, { "label": "乐安县", "value": "361025" }, { "label": "宜黄县", "value": "361026" }, { "label": "金溪县", "value": "361027" }, { "label": "资溪县", "value": "361028" }, { "label": "广昌县", "value": "361030" }], [{ "label": "信州区", "value": "361102" }, { "label": "广丰区", "value": "361103" }, { "label": "上饶县", "value": "361121" }, { "label": "玉山县", "value": "361123" }, { "label": "铅山县", "value": "361124" }, { "label": "横峰县", "value": "361125" }, { "label": "弋阳县", "value": "361126" }, { "label": "余干县", "value": "361127" }, { "label": "鄱阳县", "value": "361128" }, { "label": "万年县", "value": "361129" }, { "label": "婺源县", "value": "361130" }, { "label": "德兴市", "value": "361181" }]], [[{ "label": "历下区", "value": "370102" }, { "label": "市中区", "value": "370103" }, { "label": "槐荫区", "value": "370104" }, { "label": "天桥区", "value": "370105" }, { "label": "历城区", "value": "370112" }, { "label": "长清区", "value": "370113" }, { "label": "章丘区", "value": "370114" }, { "label": "平阴县", "value": "370124" }, { "label": "济阳县", "value": "370125" }, { "label": "商河县", "value": "370126" }, { "label": "济南高新技术产业开发区", "value": "370171" }], [{ "label": "市南区", "value": "370202" }, { "label": "市北区", "value": "370203" }, { "label": "黄岛区", "value": "370211" }, { "label": "崂山区", "value": "370212" }, { "label": "李沧区", "value": "370213" }, { "label": "城阳区", "value": "370214" }, { "label": "即墨区", "value": "370215" }, { "label": "青岛高新技术产业开发区", "value": "370271" }, { "label": "胶州市", "value": "370281" }, { "label": "平度市", "value": "370283" }, { "label": "莱西市", "value": "370285" }], [{ "label": "淄川区", "value": "370302" }, { "label": "张店区", "value": "370303" }, { "label": "博山区", "value": "370304" }, { "label": "临淄区", "value": "370305" }, { "label": "周村区", "value": "370306" }, { "label": "桓台县", "value": "370321" }, { "label": "高青县", "value": "370322" }, { "label": "沂源县", "value": "370323" }], [{ "label": "市中区", "value": "370402" }, { "label": "薛城区", "value": "370403" }, { "label": "峄城区", "value": "370404" }, { "label": "台儿庄区", "value": "370405" }, { "label": "山亭区", "value": "370406" }, { "label": "滕州市", "value": "370481" }], [{ "label": "东营区", "value": "370502" }, { "label": "河口区", "value": "370503" }, { "label": "垦利区", "value": "370505" }, { "label": "利津县", "value": "370522" }, { "label": "广饶县", "value": "370523" }, { "label": "东营经济技术开发区", "value": "370571" }, { "label": "东营港经济开发区", "value": "370572" }], [{ "label": "芝罘区", "value": "370602" }, { "label": "福山区", "value": "370611" }, { "label": "牟平区", "value": "370612" }, { "label": "莱山区", "value": "370613" }, { "label": "长岛县", "value": "370634" }, { "label": "烟台高新技术产业开发区", "value": "370671" }, { "label": "烟台经济技术开发区", "value": "370672" }, { "label": "龙口市", "value": "370681" }, { "label": "莱阳市", "value": "370682" }, { "label": "莱州市", "value": "370683" }, { "label": "蓬莱市", "value": "370684" }, { "label": "招远市", "value": "370685" }, { "label": "栖霞市", "value": "370686" }, { "label": "海阳市", "value": "370687" }], [{ "label": "潍城区", "value": "370702" }, { "label": "寒亭区", "value": "370703" }, { "label": "坊子区", "value": "370704" }, { "label": "奎文区", "value": "370705" }, { "label": "临朐县", "value": "370724" }, { "label": "昌乐县", "value": "370725" }, { "label": "潍坊滨海经济技术开发区", "value": "370772" }, { "label": "青州市", "value": "370781" }, { "label": "诸城市", "value": "370782" }, { "label": "寿光市", "value": "370783" }, { "label": "安丘市", "value": "370784" }, { "label": "高密市", "value": "370785" }, { "label": "昌邑市", "value": "370786" }], [{ "label": "任城区", "value": "370811" }, { "label": "兖州区", "value": "370812" }, { "label": "微山县", "value": "370826" }, { "label": "鱼台县", "value": "370827" }, { "label": "金乡县", "value": "370828" }, { "label": "嘉祥县", "value": "370829" }, { "label": "汶上县", "value": "370830" }, { "label": "泗水县", "value": "370831" }, { "label": "梁山县", "value": "370832" }, { "label": "济宁高新技术产业开发区", "value": "370871" }, { "label": "曲阜市", "value": "370881" }, { "label": "邹城市", "value": "370883" }], [{ "label": "泰山区", "value": "370902" }, { "label": "岱岳区", "value": "370911" }, { "label": "宁阳县", "value": "370921" }, { "label": "东平县", "value": "370923" }, { "label": "新泰市", "value": "370982" }, { "label": "肥城市", "value": "370983" }], [{ "label": "环翠区", "value": "371002" }, { "label": "文登区", "value": "371003" }, { "label": "威海火炬高技术产业开发区", "value": "371071" }, { "label": "威海经济技术开发区", "value": "371072" }, { "label": "威海临港经济技术开发区", "value": "371073" }, { "label": "荣成市", "value": "371082" }, { "label": "乳山市", "value": "371083" }], [{ "label": "东港区", "value": "371102" }, { "label": "岚山区", "value": "371103" }, { "label": "五莲县", "value": "371121" }, { "label": "莒县", "value": "371122" }, { "label": "日照经济技术开发区", "value": "371171" }, { "label": "日照国际海洋城", "value": "371172" }], [{ "label": "莱城区", "value": "371202" }, { "label": "钢城区", "value": "371203" }], [{ "label": "兰山区", "value": "371302" }, { "label": "罗庄区", "value": "371311" }, { "label": "河东区", "value": "371312" }, { "label": "沂南县", "value": "371321" }, { "label": "郯城县", "value": "371322" }, { "label": "沂水县", "value": "371323" }, { "label": "兰陵县", "value": "371324" }, { "label": "费县", "value": "371325" }, { "label": "平邑县", "value": "371326" }, { "label": "莒南县", "value": "371327" }, { "label": "蒙阴县", "value": "371328" }, { "label": "临沭县", "value": "371329" }, { "label": "临沂高新技术产业开发区", "value": "371371" }, { "label": "临沂经济技术开发区", "value": "371372" }, { "label": "临沂临港经济开发区", "value": "371373" }], [{ "label": "德城区", "value": "371402" }, { "label": "陵城区", "value": "371403" }, { "label": "宁津县", "value": "371422" }, { "label": "庆云县", "value": "371423" }, { "label": "临邑县", "value": "371424" }, { "label": "齐河县", "value": "371425" }, { "label": "平原县", "value": "371426" }, { "label": "夏津县", "value": "371427" }, { "label": "武城县", "value": "371428" }, { "label": "德州经济技术开发区", "value": "371471" }, { "label": "德州运河经济开发区", "value": "371472" }, { "label": "乐陵市", "value": "371481" }, { "label": "禹城市", "value": "371482" }], [{ "label": "东昌府区", "value": "371502" }, { "label": "阳谷县", "value": "371521" }, { "label": "莘县", "value": "371522" }, { "label": "茌平县", "value": "371523" }, { "label": "东阿县", "value": "371524" }, { "label": "冠县", "value": "371525" }, { "label": "高唐县", "value": "371526" }, { "label": "临清市", "value": "371581" }], [{ "label": "滨城区", "value": "371602" }, { "label": "沾化区", "value": "371603" }, { "label": "惠民县", "value": "371621" }, { "label": "阳信县", "value": "371622" }, { "label": "无棣县", "value": "371623" }, { "label": "博兴县", "value": "371625" }, { "label": "邹平县", "value": "371626" }], [{ "label": "牡丹区", "value": "371702" }, { "label": "定陶区", "value": "371703" }, { "label": "曹县", "value": "371721" }, { "label": "单县", "value": "371722" }, { "label": "成武县", "value": "371723" }, { "label": "巨野县", "value": "371724" }, { "label": "郓城县", "value": "371725" }, { "label": "鄄城县", "value": "371726" }, { "label": "东明县", "value": "371728" }, { "label": "菏泽经济技术开发区", "value": "371771" }, { "label": "菏泽高新技术开发区", "value": "371772" }]], [[{ "label": "中原区", "value": "410102" }, { "label": "二七区", "value": "410103" }, { "label": "管城回族区", "value": "410104" }, { "label": "金水区", "value": "410105" }, { "label": "上街区", "value": "410106" }, { "label": "惠济区", "value": "410108" }, { "label": "中牟县", "value": "410122" }, { "label": "郑州经济技术开发区", "value": "410171" }, { "label": "郑州高新技术产业开发区", "value": "410172" }, { "label": "郑州航空港经济综合实验区", "value": "410173" }, { "label": "巩义市", "value": "410181" }, { "label": "荥阳市", "value": "410182" }, { "label": "新密市", "value": "410183" }, { "label": "新郑市", "value": "410184" }, { "label": "登封市", "value": "410185" }], [{ "label": "龙亭区", "value": "410202" }, { "label": "顺河回族区", "value": "410203" }, { "label": "鼓楼区", "value": "410204" }, { "label": "禹王台区", "value": "410205" }, { "label": "祥符区", "value": "410212" }, { "label": "杞县", "value": "410221" }, { "label": "通许县", "value": "410222" }, { "label": "尉氏县", "value": "410223" }, { "label": "兰考县", "value": "410225" }], [{ "label": "老城区", "value": "410302" }, { "label": "西工区", "value": "410303" }, { "label": "瀍河回族区", "value": "410304" }, { "label": "涧西区", "value": "410305" }, { "label": "吉利区", "value": "410306" }, { "label": "洛龙区", "value": "410311" }, { "label": "孟津县", "value": "410322" }, { "label": "新安县", "value": "410323" }, { "label": "栾川县", "value": "410324" }, { "label": "嵩县", "value": "410325" }, { "label": "汝阳县", "value": "410326" }, { "label": "宜阳县", "value": "410327" }, { "label": "洛宁县", "value": "410328" }, { "label": "伊川县", "value": "410329" }, { "label": "洛阳高新技术产业开发区", "value": "410371" }, { "label": "偃师市", "value": "410381" }], [{ "label": "新华区", "value": "410402" }, { "label": "卫东区", "value": "410403" }, { "label": "石龙区", "value": "410404" }, { "label": "湛河区", "value": "410411" }, { "label": "宝丰县", "value": "410421" }, { "label": "叶县", "value": "410422" }, { "label": "鲁山县", "value": "410423" }, { "label": "郏县", "value": "410425" }, { "label": "平顶山高新技术产业开发区", "value": "410471" }, { "label": "平顶山市新城区", "value": "410472" }, { "label": "舞钢市", "value": "410481" }, { "label": "汝州市", "value": "410482" }], [{ "label": "文峰区", "value": "410502" }, { "label": "北关区", "value": "410503" }, { "label": "殷都区", "value": "410505" }, { "label": "龙安区", "value": "410506" }, { "label": "安阳县", "value": "410522" }, { "label": "汤阴县", "value": "410523" }, { "label": "滑县", "value": "410526" }, { "label": "内黄县", "value": "410527" }, { "label": "安阳高新技术产业开发区", "value": "410571" }, { "label": "林州市", "value": "410581" }], [{ "label": "鹤山区", "value": "410602" }, { "label": "山城区", "value": "410603" }, { "label": "淇滨区", "value": "410611" }, { "label": "浚县", "value": "410621" }, { "label": "淇县", "value": "410622" }, { "label": "鹤壁经济技术开发区", "value": "410671" }], [{ "label": "红旗区", "value": "410702" }, { "label": "卫滨区", "value": "410703" }, { "label": "凤泉区", "value": "410704" }, { "label": "牧野区", "value": "410711" }, { "label": "新乡县", "value": "410721" }, { "label": "获嘉县", "value": "410724" }, { "label": "原阳县", "value": "410725" }, { "label": "延津县", "value": "410726" }, { "label": "封丘县", "value": "410727" }, { "label": "长垣县", "value": "410728" }, { "label": "新乡高新技术产业开发区", "value": "410771" }, { "label": "新乡经济技术开发区", "value": "410772" }, { "label": "新乡市平原城乡一体化示范区", "value": "410773" }, { "label": "卫辉市", "value": "410781" }, { "label": "辉县市", "value": "410782" }], [{ "label": "解放区", "value": "410802" }, { "label": "中站区", "value": "410803" }, { "label": "马村区", "value": "410804" }, { "label": "山阳区", "value": "410811" }, { "label": "修武县", "value": "410821" }, { "label": "博爱县", "value": "410822" }, { "label": "武陟县", "value": "410823" }, { "label": "温县", "value": "410825" }, { "label": "焦作城乡一体化示范区", "value": "410871" }, { "label": "沁阳市", "value": "410882" }, { "label": "孟州市", "value": "410883" }], [{ "label": "华龙区", "value": "410902" }, { "label": "清丰县", "value": "410922" }, { "label": "南乐县", "value": "410923" }, { "label": "范县", "value": "410926" }, { "label": "台前县", "value": "410927" }, { "label": "濮阳县", "value": "410928" }, { "label": "河南濮阳工业园区", "value": "410971" }, { "label": "濮阳经济技术开发区", "value": "410972" }], [{ "label": "魏都区", "value": "411002" }, { "label": "建安区", "value": "411003" }, { "label": "鄢陵县", "value": "411024" }, { "label": "襄城县", "value": "411025" }, { "label": "许昌经济技术开发区", "value": "411071" }, { "label": "禹州市", "value": "411081" }, { "label": "长葛市", "value": "411082" }], [{ "label": "源汇区", "value": "411102" }, { "label": "郾城区", "value": "411103" }, { "label": "召陵区", "value": "411104" }, { "label": "舞阳县", "value": "411121" }, { "label": "临颍县", "value": "411122" }, { "label": "漯河经济技术开发区", "value": "411171" }], [{ "label": "湖滨区", "value": "411202" }, { "label": "陕州区", "value": "411203" }, { "label": "渑池县", "value": "411221" }, { "label": "卢氏县", "value": "411224" }, { "label": "河南三门峡经济开发区", "value": "411271" }, { "label": "义马市", "value": "411281" }, { "label": "灵宝市", "value": "411282" }], [{ "label": "宛城区", "value": "411302" }, { "label": "卧龙区", "value": "411303" }, { "label": "南召县", "value": "411321" }, { "label": "方城县", "value": "411322" }, { "label": "西峡县", "value": "411323" }, { "label": "镇平县", "value": "411324" }, { "label": "内乡县", "value": "411325" }, { "label": "淅川县", "value": "411326" }, { "label": "社旗县", "value": "411327" }, { "label": "唐河县", "value": "411328" }, { "label": "新野县", "value": "411329" }, { "label": "桐柏县", "value": "411330" }, { "label": "南阳高新技术产业开发区", "value": "411371" }, { "label": "南阳市城乡一体化示范区", "value": "411372" }, { "label": "邓州市", "value": "411381" }], [{ "label": "梁园区", "value": "411402" }, { "label": "睢阳区", "value": "411403" }, { "label": "民权县", "value": "411421" }, { "label": "睢县", "value": "411422" }, { "label": "宁陵县", "value": "411423" }, { "label": "柘城县", "value": "411424" }, { "label": "虞城县", "value": "411425" }, { "label": "夏邑县", "value": "411426" }, { "label": "豫东综合物流产业聚集区", "value": "411471" }, { "label": "河南商丘经济开发区", "value": "411472" }, { "label": "永城市", "value": "411481" }], [{ "label": "浉河区", "value": "411502" }, { "label": "平桥区", "value": "411503" }, { "label": "罗山县", "value": "411521" }, { "label": "光山县", "value": "411522" }, { "label": "新县", "value": "411523" }, { "label": "商城县", "value": "411524" }, { "label": "固始县", "value": "411525" }, { "label": "潢川县", "value": "411526" }, { "label": "淮滨县", "value": "411527" }, { "label": "息县", "value": "411528" }, { "label": "信阳高新技术产业开发区", "value": "411571" }], [{ "label": "川汇区", "value": "411602" }, { "label": "扶沟县", "value": "411621" }, { "label": "西华县", "value": "411622" }, { "label": "商水县", "value": "411623" }, { "label": "沈丘县", "value": "411624" }, { "label": "郸城县", "value": "411625" }, { "label": "淮阳县", "value": "411626" }, { "label": "太康县", "value": "411627" }, { "label": "鹿邑县", "value": "411628" }, { "label": "河南周口经济开发区", "value": "411671" }, { "label": "项城市", "value": "411681" }], [{ "label": "驿城区", "value": "411702" }, { "label": "西平县", "value": "411721" }, { "label": "上蔡县", "value": "411722" }, { "label": "平舆县", "value": "411723" }, { "label": "正阳县", "value": "411724" }, { "label": "确山县", "value": "411725" }, { "label": "泌阳县", "value": "411726" }, { "label": "汝南县", "value": "411727" }, { "label": "遂平县", "value": "411728" }, { "label": "新蔡县", "value": "411729" }, { "label": "河南驻马店经济开发区", "value": "411771" }], [{ "label": "济源市", "value": "419001" }]], [[{ "label": "江岸区", "value": "420102" }, { "label": "江汉区", "value": "420103" }, { "label": "硚口区", "value": "420104" }, { "label": "汉阳区", "value": "420105" }, { "label": "武昌区", "value": "420106" }, { "label": "青山区", "value": "420107" }, { "label": "洪山区", "value": "420111" }, { "label": "东西湖区", "value": "420112" }, { "label": "汉南区", "value": "420113" }, { "label": "蔡甸区", "value": "420114" }, { "label": "江夏区", "value": "420115" }, { "label": "黄陂区", "value": "420116" }, { "label": "新洲区", "value": "420117" }], [{ "label": "黄石港区", "value": "420202" }, { "label": "西塞山区", "value": "420203" }, { "label": "下陆区", "value": "420204" }, { "label": "铁山区", "value": "420205" }, { "label": "阳新县", "value": "420222" }, { "label": "大冶市", "value": "420281" }], [{ "label": "茅箭区", "value": "420302" }, { "label": "张湾区", "value": "420303" }, { "label": "郧阳区", "value": "420304" }, { "label": "郧西县", "value": "420322" }, { "label": "竹山县", "value": "420323" }, { "label": "竹溪县", "value": "420324" }, { "label": "房县", "value": "420325" }, { "label": "丹江口市", "value": "420381" }], [{ "label": "西陵区", "value": "420502" }, { "label": "伍家岗区", "value": "420503" }, { "label": "点军区", "value": "420504" }, { "label": "猇亭区", "value": "420505" }, { "label": "夷陵区", "value": "420506" }, { "label": "远安县", "value": "420525" }, { "label": "兴山县", "value": "420526" }, { "label": "秭归县", "value": "420527" }, { "label": "长阳土家族自治县", "value": "420528" }, { "label": "五峰土家族自治县", "value": "420529" }, { "label": "宜都市", "value": "420581" }, { "label": "当阳市", "value": "420582" }, { "label": "枝江市", "value": "420583" }], [{ "label": "襄城区", "value": "420602" }, { "label": "樊城区", "value": "420606" }, { "label": "襄州区", "value": "420607" }, { "label": "南漳县", "value": "420624" }, { "label": "谷城县", "value": "420625" }, { "label": "保康县", "value": "420626" }, { "label": "老河口市", "value": "420682" }, { "label": "枣阳市", "value": "420683" }, { "label": "宜城市", "value": "420684" }], [{ "label": "梁子湖区", "value": "420702" }, { "label": "华容区", "value": "420703" }, { "label": "鄂城区", "value": "420704" }], [{ "label": "东宝区", "value": "420802" }, { "label": "掇刀区", "value": "420804" }, { "label": "京山县", "value": "420821" }, { "label": "沙洋县", "value": "420822" }, { "label": "钟祥市", "value": "420881" }], [{ "label": "孝南区", "value": "420902" }, { "label": "孝昌县", "value": "420921" }, { "label": "大悟县", "value": "420922" }, { "label": "云梦县", "value": "420923" }, { "label": "应城市", "value": "420981" }, { "label": "安陆市", "value": "420982" }, { "label": "汉川市", "value": "420984" }], [{ "label": "沙市区", "value": "421002" }, { "label": "荆州区", "value": "421003" }, { "label": "公安县", "value": "421022" }, { "label": "监利县", "value": "421023" }, { "label": "江陵县", "value": "421024" }, { "label": "荆州经济技术开发区", "value": "421071" }, { "label": "石首市", "value": "421081" }, { "label": "洪湖市", "value": "421083" }, { "label": "松滋市", "value": "421087" }], [{ "label": "黄州区", "value": "421102" }, { "label": "团风县", "value": "421121" }, { "label": "红安县", "value": "421122" }, { "label": "罗田县", "value": "421123" }, { "label": "英山县", "value": "421124" }, { "label": "浠水县", "value": "421125" }, { "label": "蕲春县", "value": "421126" }, { "label": "黄梅县", "value": "421127" }, { "label": "龙感湖管理区", "value": "421171" }, { "label": "麻城市", "value": "421181" }, { "label": "武穴市", "value": "421182" }], [{ "label": "咸安区", "value": "421202" }, { "label": "嘉鱼县", "value": "421221" }, { "label": "通城县", "value": "421222" }, { "label": "崇阳县", "value": "421223" }, { "label": "通山县", "value": "421224" }, { "label": "赤壁市", "value": "421281" }], [{ "label": "曾都区", "value": "421303" }, { "label": "随县", "value": "421321" }, { "label": "广水市", "value": "421381" }], [{ "label": "恩施市", "value": "422801" }, { "label": "利川市", "value": "422802" }, { "label": "建始县", "value": "422822" }, { "label": "巴东县", "value": "422823" }, { "label": "宣恩县", "value": "422825" }, { "label": "咸丰县", "value": "422826" }, { "label": "来凤县", "value": "422827" }, { "label": "鹤峰县", "value": "422828" }], [{ "label": "仙桃市", "value": "429004" }, { "label": "潜江市", "value": "429005" }, { "label": "天门市", "value": "429006" }, { "label": "神农架林区", "value": "429021" }]], [[{ "label": "芙蓉区", "value": "430102" }, { "label": "天心区", "value": "430103" }, { "label": "岳麓区", "value": "430104" }, { "label": "开福区", "value": "430105" }, { "label": "雨花区", "value": "430111" }, { "label": "望城区", "value": "430112" }, { "label": "长沙县", "value": "430121" }, { "label": "浏阳市", "value": "430181" }, { "label": "宁乡市", "value": "430182" }], [{ "label": "荷塘区", "value": "430202" }, { "label": "芦淞区", "value": "430203" }, { "label": "石峰区", "value": "430204" }, { "label": "天元区", "value": "430211" }, { "label": "株洲县", "value": "430221" }, { "label": "攸县", "value": "430223" }, { "label": "茶陵县", "value": "430224" }, { "label": "炎陵县", "value": "430225" }, { "label": "云龙示范区", "value": "430271" }, { "label": "醴陵市", "value": "430281" }], [{ "label": "雨湖区", "value": "430302" }, { "label": "岳塘区", "value": "430304" }, { "label": "湘潭县", "value": "430321" }, { "label": "湖南湘潭高新技术产业园区", "value": "430371" }, { "label": "湘潭昭山示范区", "value": "430372" }, { "label": "湘潭九华示范区", "value": "430373" }, { "label": "湘乡市", "value": "430381" }, { "label": "韶山市", "value": "430382" }], [{ "label": "珠晖区", "value": "430405" }, { "label": "雁峰区", "value": "430406" }, { "label": "石鼓区", "value": "430407" }, { "label": "蒸湘区", "value": "430408" }, { "label": "南岳区", "value": "430412" }, { "label": "衡阳县", "value": "430421" }, { "label": "衡南县", "value": "430422" }, { "label": "衡山县", "value": "430423" }, { "label": "衡东县", "value": "430424" }, { "label": "祁东县", "value": "430426" }, { "label": "衡阳综合保税区", "value": "430471" }, { "label": "湖南衡阳高新技术产业园区", "value": "430472" }, { "label": "湖南衡阳松木经济开发区", "value": "430473" }, { "label": "耒阳市", "value": "430481" }, { "label": "常宁市", "value": "430482" }], [{ "label": "双清区", "value": "430502" }, { "label": "大祥区", "value": "430503" }, { "label": "北塔区", "value": "430511" }, { "label": "邵东县", "value": "430521" }, { "label": "新邵县", "value": "430522" }, { "label": "邵阳县", "value": "430523" }, { "label": "隆回县", "value": "430524" }, { "label": "洞口县", "value": "430525" }, { "label": "绥宁县", "value": "430527" }, { "label": "新宁县", "value": "430528" }, { "label": "城步苗族自治县", "value": "430529" }, { "label": "武冈市", "value": "430581" }], [{ "label": "岳阳楼区", "value": "430602" }, { "label": "云溪区", "value": "430603" }, { "label": "君山区", "value": "430611" }, { "label": "岳阳县", "value": "430621" }, { "label": "华容县", "value": "430623" }, { "label": "湘阴县", "value": "430624" }, { "label": "平江县", "value": "430626" }, { "label": "岳阳市屈原管理区", "value": "430671" }, { "label": "汨罗市", "value": "430681" }, { "label": "临湘市", "value": "430682" }], [{ "label": "武陵区", "value": "430702" }, { "label": "鼎城区", "value": "430703" }, { "label": "安乡县", "value": "430721" }, { "label": "汉寿县", "value": "430722" }, { "label": "澧县", "value": "430723" }, { "label": "临澧县", "value": "430724" }, { "label": "桃源县", "value": "430725" }, { "label": "石门县", "value": "430726" }, { "label": "常德市西洞庭管理区", "value": "430771" }, { "label": "津市市", "value": "430781" }], [{ "label": "永定区", "value": "430802" }, { "label": "武陵源区", "value": "430811" }, { "label": "慈利县", "value": "430821" }, { "label": "桑植县", "value": "430822" }], [{ "label": "资阳区", "value": "430902" }, { "label": "赫山区", "value": "430903" }, { "label": "南县", "value": "430921" }, { "label": "桃江县", "value": "430922" }, { "label": "安化县", "value": "430923" }, { "label": "益阳市大通湖管理区", "value": "430971" }, { "label": "湖南益阳高新技术产业园区", "value": "430972" }, { "label": "沅江市", "value": "430981" }], [{ "label": "北湖区", "value": "431002" }, { "label": "苏仙区", "value": "431003" }, { "label": "桂阳县", "value": "431021" }, { "label": "宜章县", "value": "431022" }, { "label": "永兴县", "value": "431023" }, { "label": "嘉禾县", "value": "431024" }, { "label": "临武县", "value": "431025" }, { "label": "汝城县", "value": "431026" }, { "label": "桂东县", "value": "431027" }, { "label": "安仁县", "value": "431028" }, { "label": "资兴市", "value": "431081" }], [{ "label": "零陵区", "value": "431102" }, { "label": "冷水滩区", "value": "431103" }, { "label": "祁阳县", "value": "431121" }, { "label": "东安县", "value": "431122" }, { "label": "双牌县", "value": "431123" }, { "label": "道县", "value": "431124" }, { "label": "江永县", "value": "431125" }, { "label": "宁远县", "value": "431126" }, { "label": "蓝山县", "value": "431127" }, { "label": "新田县", "value": "431128" }, { "label": "江华瑶族自治县", "value": "431129" }, { "label": "永州经济技术开发区", "value": "431171" }, { "label": "永州市金洞管理区", "value": "431172" }, { "label": "永州市回龙圩管理区", "value": "431173" }], [{ "label": "鹤城区", "value": "431202" }, { "label": "中方县", "value": "431221" }, { "label": "沅陵县", "value": "431222" }, { "label": "辰溪县", "value": "431223" }, { "label": "溆浦县", "value": "431224" }, { "label": "会同县", "value": "431225" }, { "label": "麻阳苗族自治县", "value": "431226" }, { "label": "新晃侗族自治县", "value": "431227" }, { "label": "芷江侗族自治县", "value": "431228" }, { "label": "靖州苗族侗族自治县", "value": "431229" }, { "label": "通道侗族自治县", "value": "431230" }, { "label": "怀化市洪江管理区", "value": "431271" }, { "label": "洪江市", "value": "431281" }], [{ "label": "娄星区", "value": "431302" }, { "label": "双峰县", "value": "431321" }, { "label": "新化县", "value": "431322" }, { "label": "冷水江市", "value": "431381" }, { "label": "涟源市", "value": "431382" }], [{ "label": "吉首市", "value": "433101" }, { "label": "泸溪县", "value": "433122" }, { "label": "凤凰县", "value": "433123" }, { "label": "花垣县", "value": "433124" }, { "label": "保靖县", "value": "433125" }, { "label": "古丈县", "value": "433126" }, { "label": "永顺县", "value": "433127" }, { "label": "龙山县", "value": "433130" }, { "label": "湖南吉首经济开发区", "value": "433172" }, { "label": "湖南永顺经济开发区", "value": "433173" }]], [[{ "label": "荔湾区", "value": "440103" }, { "label": "越秀区", "value": "440104" }, { "label": "海珠区", "value": "440105" }, { "label": "天河区", "value": "440106" }, { "label": "白云区", "value": "440111" }, { "label": "黄埔区", "value": "440112" }, { "label": "番禺区", "value": "440113" }, { "label": "花都区", "value": "440114" }, { "label": "南沙区", "value": "440115" }, { "label": "从化区", "value": "440117" }, { "label": "增城区", "value": "440118" }], [{ "label": "武江区", "value": "440203" }, { "label": "浈江区", "value": "440204" }, { "label": "曲江区", "value": "440205" }, { "label": "始兴县", "value": "440222" }, { "label": "仁化县", "value": "440224" }, { "label": "翁源县", "value": "440229" }, { "label": "乳源瑶族自治县", "value": "440232" }, { "label": "新丰县", "value": "440233" }, { "label": "乐昌市", "value": "440281" }, { "label": "南雄市", "value": "440282" }], [{ "label": "罗湖区", "value": "440303" }, { "label": "福田区", "value": "440304" }, { "label": "南山区", "value": "440305" }, { "label": "宝安区", "value": "440306" }, { "label": "龙岗区", "value": "440307" }, { "label": "盐田区", "value": "440308" }, { "label": "龙华区", "value": "440309" }, { "label": "坪山区", "value": "440310" }], [{ "label": "香洲区", "value": "440402" }, { "label": "斗门区", "value": "440403" }, { "label": "金湾区", "value": "440404" }], [{ "label": "龙湖区", "value": "440507" }, { "label": "金平区", "value": "440511" }, { "label": "濠江区", "value": "440512" }, { "label": "潮阳区", "value": "440513" }, { "label": "潮南区", "value": "440514" }, { "label": "澄海区", "value": "440515" }, { "label": "南澳县", "value": "440523" }], [{ "label": "禅城区", "value": "440604" }, { "label": "南海区", "value": "440605" }, { "label": "顺德区", "value": "440606" }, { "label": "三水区", "value": "440607" }, { "label": "高明区", "value": "440608" }], [{ "label": "蓬江区", "value": "440703" }, { "label": "江海区", "value": "440704" }, { "label": "新会区", "value": "440705" }, { "label": "台山市", "value": "440781" }, { "label": "开平市", "value": "440783" }, { "label": "鹤山市", "value": "440784" }, { "label": "恩平市", "value": "440785" }], [{ "label": "赤坎区", "value": "440802" }, { "label": "霞山区", "value": "440803" }, { "label": "坡头区", "value": "440804" }, { "label": "麻章区", "value": "440811" }, { "label": "遂溪县", "value": "440823" }, { "label": "徐闻县", "value": "440825" }, { "label": "廉江市", "value": "440881" }, { "label": "雷州市", "value": "440882" }, { "label": "吴川市", "value": "440883" }], [{ "label": "茂南区", "value": "440902" }, { "label": "电白区", "value": "440904" }, { "label": "高州市", "value": "440981" }, { "label": "化州市", "value": "440982" }, { "label": "信宜市", "value": "440983" }], [{ "label": "端州区", "value": "441202" }, { "label": "鼎湖区", "value": "441203" }, { "label": "高要区", "value": "441204" }, { "label": "广宁县", "value": "441223" }, { "label": "怀集县", "value": "441224" }, { "label": "封开县", "value": "441225" }, { "label": "德庆县", "value": "441226" }, { "label": "四会市", "value": "441284" }], [{ "label": "惠城区", "value": "441302" }, { "label": "惠阳区", "value": "441303" }, { "label": "博罗县", "value": "441322" }, { "label": "惠东县", "value": "441323" }, { "label": "龙门县", "value": "441324" }], [{ "label": "梅江区", "value": "441402" }, { "label": "梅县区", "value": "441403" }, { "label": "大埔县", "value": "441422" }, { "label": "丰顺县", "value": "441423" }, { "label": "五华县", "value": "441424" }, { "label": "平远县", "value": "441426" }, { "label": "蕉岭县", "value": "441427" }, { "label": "兴宁市", "value": "441481" }], [{ "label": "城区", "value": "441502" }, { "label": "海丰县", "value": "441521" }, { "label": "陆河县", "value": "441523" }, { "label": "陆丰市", "value": "441581" }], [{ "label": "源城区", "value": "441602" }, { "label": "紫金县", "value": "441621" }, { "label": "龙川县", "value": "441622" }, { "label": "连平县", "value": "441623" }, { "label": "和平县", "value": "441624" }, { "label": "东源县", "value": "441625" }], [{ "label": "江城区", "value": "441702" }, { "label": "阳东区", "value": "441704" }, { "label": "阳西县", "value": "441721" }, { "label": "阳春市", "value": "441781" }], [{ "label": "清城区", "value": "441802" }, { "label": "清新区", "value": "441803" }, { "label": "佛冈县", "value": "441821" }, { "label": "阳山县", "value": "441823" }, { "label": "连山壮族瑶族自治县", "value": "441825" }, { "label": "连南瑶族自治县", "value": "441826" }, { "label": "英德市", "value": "441881" }, { "label": "连州市", "value": "441882" }], [{ "label": "东莞市", "value": "441900" }], [{ "label": "中山市", "value": "442000" }], [{ "label": "湘桥区", "value": "445102" }, { "label": "潮安区", "value": "445103" }, { "label": "饶平县", "value": "445122" }], [{ "label": "榕城区", "value": "445202" }, { "label": "揭东区", "value": "445203" }, { "label": "揭西县", "value": "445222" }, { "label": "惠来县", "value": "445224" }, { "label": "普宁市", "value": "445281" }], [{ "label": "云城区", "value": "445302" }, { "label": "云安区", "value": "445303" }, { "label": "新兴县", "value": "445321" }, { "label": "郁南县", "value": "445322" }, { "label": "罗定市", "value": "445381" }]], [[{ "label": "兴宁区", "value": "450102" }, { "label": "青秀区", "value": "450103" }, { "label": "江南区", "value": "450105" }, { "label": "西乡塘区", "value": "450107" }, { "label": "良庆区", "value": "450108" }, { "label": "邕宁区", "value": "450109" }, { "label": "武鸣区", "value": "450110" }, { "label": "隆安县", "value": "450123" }, { "label": "马山县", "value": "450124" }, { "label": "上林县", "value": "450125" }, { "label": "宾阳县", "value": "450126" }, { "label": "横县", "value": "450127" }], [{ "label": "城中区", "value": "450202" }, { "label": "鱼峰区", "value": "450203" }, { "label": "柳南区", "value": "450204" }, { "label": "柳北区", "value": "450205" }, { "label": "柳江区", "value": "450206" }, { "label": "柳城县", "value": "450222" }, { "label": "鹿寨县", "value": "450223" }, { "label": "融安县", "value": "450224" }, { "label": "融水苗族自治县", "value": "450225" }, { "label": "三江侗族自治县", "value": "450226" }], [{ "label": "秀峰区", "value": "450302" }, { "label": "叠彩区", "value": "450303" }, { "label": "象山区", "value": "450304" }, { "label": "七星区", "value": "450305" }, { "label": "雁山区", "value": "450311" }, { "label": "临桂区", "value": "450312" }, { "label": "阳朔县", "value": "450321" }, { "label": "灵川县", "value": "450323" }, { "label": "全州县", "value": "450324" }, { "label": "兴安县", "value": "450325" }, { "label": "永福县", "value": "450326" }, { "label": "灌阳县", "value": "450327" }, { "label": "龙胜各族自治县", "value": "450328" }, { "label": "资源县", "value": "450329" }, { "label": "平乐县", "value": "450330" }, { "label": "荔浦县", "value": "450331" }, { "label": "恭城瑶族自治县", "value": "450332" }], [{ "label": "万秀区", "value": "450403" }, { "label": "长洲区", "value": "450405" }, { "label": "龙圩区", "value": "450406" }, { "label": "苍梧县", "value": "450421" }, { "label": "藤县", "value": "450422" }, { "label": "蒙山县", "value": "450423" }, { "label": "岑溪市", "value": "450481" }], [{ "label": "海城区", "value": "450502" }, { "label": "银海区", "value": "450503" }, { "label": "铁山港区", "value": "450512" }, { "label": "合浦县", "value": "450521" }], [{ "label": "港口区", "value": "450602" }, { "label": "防城区", "value": "450603" }, { "label": "上思县", "value": "450621" }, { "label": "东兴市", "value": "450681" }], [{ "label": "钦南区", "value": "450702" }, { "label": "钦北区", "value": "450703" }, { "label": "灵山县", "value": "450721" }, { "label": "浦北县", "value": "450722" }], [{ "label": "港北区", "value": "450802" }, { "label": "港南区", "value": "450803" }, { "label": "覃塘区", "value": "450804" }, { "label": "平南县", "value": "450821" }, { "label": "桂平市", "value": "450881" }], [{ "label": "玉州区", "value": "450902" }, { "label": "福绵区", "value": "450903" }, { "label": "容县", "value": "450921" }, { "label": "陆川县", "value": "450922" }, { "label": "博白县", "value": "450923" }, { "label": "兴业县", "value": "450924" }, { "label": "北流市", "value": "450981" }], [{ "label": "右江区", "value": "451002" }, { "label": "田阳县", "value": "451021" }, { "label": "田东县", "value": "451022" }, { "label": "平果县", "value": "451023" }, { "label": "德保县", "value": "451024" }, { "label": "那坡县", "value": "451026" }, { "label": "凌云县", "value": "451027" }, { "label": "乐业县", "value": "451028" }, { "label": "田林县", "value": "451029" }, { "label": "西林县", "value": "451030" }, { "label": "隆林各族自治县", "value": "451031" }, { "label": "靖西市", "value": "451081" }], [{ "label": "八步区", "value": "451102" }, { "label": "平桂区", "value": "451103" }, { "label": "昭平县", "value": "451121" }, { "label": "钟山县", "value": "451122" }, { "label": "富川瑶族自治县", "value": "451123" }], [{ "label": "金城江区", "value": "451202" }, { "label": "宜州区", "value": "451203" }, { "label": "南丹县", "value": "451221" }, { "label": "天峨县", "value": "451222" }, { "label": "凤山县", "value": "451223" }, { "label": "东兰县", "value": "451224" }, { "label": "罗城仫佬族自治县", "value": "451225" }, { "label": "环江毛南族自治县", "value": "451226" }, { "label": "巴马瑶族自治县", "value": "451227" }, { "label": "都安瑶族自治县", "value": "451228" }, { "label": "大化瑶族自治县", "value": "451229" }], [{ "label": "兴宾区", "value": "451302" }, { "label": "忻城县", "value": "451321" }, { "label": "象州县", "value": "451322" }, { "label": "武宣县", "value": "451323" }, { "label": "金秀瑶族自治县", "value": "451324" }, { "label": "合山市", "value": "451381" }], [{ "label": "江州区", "value": "451402" }, { "label": "扶绥县", "value": "451421" }, { "label": "宁明县", "value": "451422" }, { "label": "龙州县", "value": "451423" }, { "label": "大新县", "value": "451424" }, { "label": "天等县", "value": "451425" }, { "label": "凭祥市", "value": "451481" }]], [[{ "label": "秀英区", "value": "460105" }, { "label": "龙华区", "value": "460106" }, { "label": "琼山区", "value": "460107" }, { "label": "美兰区", "value": "460108" }], [{ "label": "海棠区", "value": "460202" }, { "label": "吉阳区", "value": "460203" }, { "label": "天涯区", "value": "460204" }, { "label": "崖州区", "value": "460205" }], [{ "label": "西沙群岛", "value": "460321" }, { "label": "南沙群岛", "value": "460322" }, { "label": "中沙群岛的岛礁及其海域", "value": "460323" }], [{ "label": "儋州市", "value": "460400" }], [{ "label": "五指山市", "value": "469001" }, { "label": "琼海市", "value": "469002" }, { "label": "文昌市", "value": "469005" }, { "label": "万宁市", "value": "469006" }, { "label": "东方市", "value": "469007" }, { "label": "定安县", "value": "469021" }, { "label": "屯昌县", "value": "469022" }, { "label": "澄迈县", "value": "469023" }, { "label": "临高县", "value": "469024" }, { "label": "白沙黎族自治县", "value": "469025" }, { "label": "昌江黎族自治县", "value": "469026" }, { "label": "乐东黎族自治县", "value": "469027" }, { "label": "陵水黎族自治县", "value": "469028" }, { "label": "保亭黎族苗族自治县", "value": "469029" }, { "label": "琼中黎族苗族自治县", "value": "469030" }]], [[{ "label": "万州区", "value": "500101" }, { "label": "涪陵区", "value": "500102" }, { "label": "渝中区", "value": "500103" }, { "label": "大渡口区", "value": "500104" }, { "label": "江北区", "value": "500105" }, { "label": "沙坪坝区", "value": "500106" }, { "label": "九龙坡区", "value": "500107" }, { "label": "南岸区", "value": "500108" }, { "label": "北碚区", "value": "500109" }, { "label": "綦江区", "value": "500110" }, { "label": "大足区", "value": "500111" }, { "label": "渝北区", "value": "500112" }, { "label": "巴南区", "value": "500113" }, { "label": "黔江区", "value": "500114" }, { "label": "长寿区", "value": "500115" }, { "label": "江津区", "value": "500116" }, { "label": "合川区", "value": "500117" }, { "label": "永川区", "value": "500118" }, { "label": "南川区", "value": "500119" }, { "label": "璧山区", "value": "500120" }, { "label": "铜梁区", "value": "500151" }, { "label": "潼南区", "value": "500152" }, { "label": "荣昌区", "value": "500153" }, { "label": "开州区", "value": "500154" }, { "label": "梁平区", "value": "500155" }, { "label": "武隆区", "value": "500156" }], [{ "label": "城口县", "value": "500229" }, { "label": "丰都县", "value": "500230" }, { "label": "垫江县", "value": "500231" }, { "label": "忠县", "value": "500233" }, { "label": "云阳县", "value": "500235" }, { "label": "奉节县", "value": "500236" }, { "label": "巫山县", "value": "500237" }, { "label": "巫溪县", "value": "500238" }, { "label": "石柱土家族自治县", "value": "500240" }, { "label": "秀山土家族苗族自治县", "value": "500241" }, { "label": "酉阳土家族苗族自治县", "value": "500242" }, { "label": "彭水苗族土家族自治县", "value": "500243" }]], [[{ "label": "锦江区", "value": "510104" }, { "label": "青羊区", "value": "510105" }, { "label": "金牛区", "value": "510106" }, { "label": "武侯区", "value": "510107" }, { "label": "成华区", "value": "510108" }, { "label": "龙泉驿区", "value": "510112" }, { "label": "青白江区", "value": "510113" }, { "label": "新都区", "value": "510114" }, { "label": "温江区", "value": "510115" }, { "label": "双流区", "value": "510116" }, { "label": "郫都区", "value": "510117" }, { "label": "金堂县", "value": "510121" }, { "label": "大邑县", "value": "510129" }, { "label": "蒲江县", "value": "510131" }, { "label": "新津县", "value": "510132" }, { "label": "都江堰市", "value": "510181" }, { "label": "彭州市", "value": "510182" }, { "label": "邛崃市", "value": "510183" }, { "label": "崇州市", "value": "510184" }, { "label": "简阳市", "value": "510185" }], [{ "label": "自流井区", "value": "510302" }, { "label": "贡井区", "value": "510303" }, { "label": "大安区", "value": "510304" }, { "label": "沿滩区", "value": "510311" }, { "label": "荣县", "value": "510321" }, { "label": "富顺县", "value": "510322" }], [{ "label": "东区", "value": "510402" }, { "label": "西区", "value": "510403" }, { "label": "仁和区", "value": "510411" }, { "label": "米易县", "value": "510421" }, { "label": "盐边县", "value": "510422" }], [{ "label": "江阳区", "value": "510502" }, { "label": "纳溪区", "value": "510503" }, { "label": "龙马潭区", "value": "510504" }, { "label": "泸县", "value": "510521" }, { "label": "合江县", "value": "510522" }, { "label": "叙永县", "value": "510524" }, { "label": "古蔺县", "value": "510525" }], [{ "label": "旌阳区", "value": "510603" }, { "label": "罗江区", "value": "510604" }, { "label": "中江县", "value": "510623" }, { "label": "广汉市", "value": "510681" }, { "label": "什邡市", "value": "510682" }, { "label": "绵竹市", "value": "510683" }], [{ "label": "涪城区", "value": "510703" }, { "label": "游仙区", "value": "510704" }, { "label": "安州区", "value": "510705" }, { "label": "三台县", "value": "510722" }, { "label": "盐亭县", "value": "510723" }, { "label": "梓潼县", "value": "510725" }, { "label": "北川羌族自治县", "value": "510726" }, { "label": "平武县", "value": "510727" }, { "label": "江油市", "value": "510781" }], [{ "label": "利州区", "value": "510802" }, { "label": "昭化区", "value": "510811" }, { "label": "朝天区", "value": "510812" }, { "label": "旺苍县", "value": "510821" }, { "label": "青川县", "value": "510822" }, { "label": "剑阁县", "value": "510823" }, { "label": "苍溪县", "value": "510824" }], [{ "label": "船山区", "value": "510903" }, { "label": "安居区", "value": "510904" }, { "label": "蓬溪县", "value": "510921" }, { "label": "射洪县", "value": "510922" }, { "label": "大英县", "value": "510923" }], [{ "label": "市中区", "value": "511002" }, { "label": "东兴区", "value": "511011" }, { "label": "威远县", "value": "511024" }, { "label": "资中县", "value": "511025" }, { "label": "内江经济开发区", "value": "511071" }, { "label": "隆昌市", "value": "511083" }], [{ "label": "市中区", "value": "511102" }, { "label": "沙湾区", "value": "511111" }, { "label": "五通桥区", "value": "511112" }, { "label": "金口河区", "value": "511113" }, { "label": "犍为县", "value": "511123" }, { "label": "井研县", "value": "511124" }, { "label": "夹江县", "value": "511126" }, { "label": "沐川县", "value": "511129" }, { "label": "峨边彝族自治县", "value": "511132" }, { "label": "马边彝族自治县", "value": "511133" }, { "label": "峨眉山市", "value": "511181" }], [{ "label": "顺庆区", "value": "511302" }, { "label": "高坪区", "value": "511303" }, { "label": "嘉陵区", "value": "511304" }, { "label": "南部县", "value": "511321" }, { "label": "营山县", "value": "511322" }, { "label": "蓬安县", "value": "511323" }, { "label": "仪陇县", "value": "511324" }, { "label": "西充县", "value": "511325" }, { "label": "阆中市", "value": "511381" }], [{ "label": "东坡区", "value": "511402" }, { "label": "彭山区", "value": "511403" }, { "label": "仁寿县", "value": "511421" }, { "label": "洪雅县", "value": "511423" }, { "label": "丹棱县", "value": "511424" }, { "label": "青神县", "value": "511425" }], [{ "label": "翠屏区", "value": "511502" }, { "label": "南溪区", "value": "511503" }, { "label": "宜宾县", "value": "511521" }, { "label": "江安县", "value": "511523" }, { "label": "长宁县", "value": "511524" }, { "label": "高县", "value": "511525" }, { "label": "珙县", "value": "511526" }, { "label": "筠连县", "value": "511527" }, { "label": "兴文县", "value": "511528" }, { "label": "屏山县", "value": "511529" }], [{ "label": "广安区", "value": "511602" }, { "label": "前锋区", "value": "511603" }, { "label": "岳池县", "value": "511621" }, { "label": "武胜县", "value": "511622" }, { "label": "邻水县", "value": "511623" }, { "label": "华蓥市", "value": "511681" }], [{ "label": "通川区", "value": "511702" }, { "label": "达川区", "value": "511703" }, { "label": "宣汉县", "value": "511722" }, { "label": "开江县", "value": "511723" }, { "label": "大竹县", "value": "511724" }, { "label": "渠县", "value": "511725" }, { "label": "达州经济开发区", "value": "511771" }, { "label": "万源市", "value": "511781" }], [{ "label": "雨城区", "value": "511802" }, { "label": "名山区", "value": "511803" }, { "label": "荥经县", "value": "511822" }, { "label": "汉源县", "value": "511823" }, { "label": "石棉县", "value": "511824" }, { "label": "天全县", "value": "511825" }, { "label": "芦山县", "value": "511826" }, { "label": "宝兴县", "value": "511827" }], [{ "label": "巴州区", "value": "511902" }, { "label": "恩阳区", "value": "511903" }, { "label": "通江县", "value": "511921" }, { "label": "南江县", "value": "511922" }, { "label": "平昌县", "value": "511923" }, { "label": "巴中经济开发区", "value": "511971" }], [{ "label": "雁江区", "value": "512002" }, { "label": "安岳县", "value": "512021" }, { "label": "乐至县", "value": "512022" }], [{ "label": "马尔康市", "value": "513201" }, { "label": "汶川县", "value": "513221" }, { "label": "理县", "value": "513222" }, { "label": "茂县", "value": "513223" }, { "label": "松潘县", "value": "513224" }, { "label": "九寨沟县", "value": "513225" }, { "label": "金川县", "value": "513226" }, { "label": "小金县", "value": "513227" }, { "label": "黑水县", "value": "513228" }, { "label": "壤塘县", "value": "513230" }, { "label": "阿坝县", "value": "513231" }, { "label": "若尔盖县", "value": "513232" }, { "label": "红原县", "value": "513233" }], [{ "label": "康定市", "value": "513301" }, { "label": "泸定县", "value": "513322" }, { "label": "丹巴县", "value": "513323" }, { "label": "九龙县", "value": "513324" }, { "label": "雅江县", "value": "513325" }, { "label": "道孚县", "value": "513326" }, { "label": "炉霍县", "value": "513327" }, { "label": "甘孜县", "value": "513328" }, { "label": "新龙县", "value": "513329" }, { "label": "德格县", "value": "513330" }, { "label": "白玉县", "value": "513331" }, { "label": "石渠县", "value": "513332" }, { "label": "色达县", "value": "513333" }, { "label": "理塘县", "value": "513334" }, { "label": "巴塘县", "value": "513335" }, { "label": "乡城县", "value": "513336" }, { "label": "稻城县", "value": "513337" }, { "label": "得荣县", "value": "513338" }], [{ "label": "西昌市", "value": "513401" }, { "label": "木里藏族自治县", "value": "513422" }, { "label": "盐源县", "value": "513423" }, { "label": "德昌县", "value": "513424" }, { "label": "会理县", "value": "513425" }, { "label": "会东县", "value": "513426" }, { "label": "宁南县", "value": "513427" }, { "label": "普格县", "value": "513428" }, { "label": "布拖县", "value": "513429" }, { "label": "金阳县", "value": "513430" }, { "label": "昭觉县", "value": "513431" }, { "label": "喜德县", "value": "513432" }, { "label": "冕宁县", "value": "513433" }, { "label": "越西县", "value": "513434" }, { "label": "甘洛县", "value": "513435" }, { "label": "美姑县", "value": "513436" }, { "label": "雷波县", "value": "513437" }]], [[{ "label": "南明区", "value": "520102" }, { "label": "云岩区", "value": "520103" }, { "label": "花溪区", "value": "520111" }, { "label": "乌当区", "value": "520112" }, { "label": "白云区", "value": "520113" }, { "label": "观山湖区", "value": "520115" }, { "label": "开阳县", "value": "520121" }, { "label": "息烽县", "value": "520122" }, { "label": "修文县", "value": "520123" }, { "label": "清镇市", "value": "520181" }], [{ "label": "钟山区", "value": "520201" }, { "label": "六枝特区", "value": "520203" }, { "label": "水城县", "value": "520221" }, { "label": "盘州市", "value": "520281" }], [{ "label": "红花岗区", "value": "520302" }, { "label": "汇川区", "value": "520303" }, { "label": "播州区", "value": "520304" }, { "label": "桐梓县", "value": "520322" }, { "label": "绥阳县", "value": "520323" }, { "label": "正安县", "value": "520324" }, { "label": "道真仡佬族苗族自治县", "value": "520325" }, { "label": "务川仡佬族苗族自治县", "value": "520326" }, { "label": "凤冈县", "value": "520327" }, { "label": "湄潭县", "value": "520328" }, { "label": "余庆县", "value": "520329" }, { "label": "习水县", "value": "520330" }, { "label": "赤水市", "value": "520381" }, { "label": "仁怀市", "value": "520382" }], [{ "label": "西秀区", "value": "520402" }, { "label": "平坝区", "value": "520403" }, { "label": "普定县", "value": "520422" }, { "label": "镇宁布依族苗族自治县", "value": "520423" }, { "label": "关岭布依族苗族自治县", "value": "520424" }, { "label": "紫云苗族布依族自治县", "value": "520425" }], [{ "label": "七星关区", "value": "520502" }, { "label": "大方县", "value": "520521" }, { "label": "黔西县", "value": "520522" }, { "label": "金沙县", "value": "520523" }, { "label": "织金县", "value": "520524" }, { "label": "纳雍县", "value": "520525" }, { "label": "威宁彝族回族苗族自治县", "value": "520526" }, { "label": "赫章县", "value": "520527" }], [{ "label": "碧江区", "value": "520602" }, { "label": "万山区", "value": "520603" }, { "label": "江口县", "value": "520621" }, { "label": "玉屏侗族自治县", "value": "520622" }, { "label": "石阡县", "value": "520623" }, { "label": "思南县", "value": "520624" }, { "label": "印江土家族苗族自治县", "value": "520625" }, { "label": "德江县", "value": "520626" }, { "label": "沿河土家族自治县", "value": "520627" }, { "label": "松桃苗族自治县", "value": "520628" }], [{ "label": "兴义市", "value": "522301" }, { "label": "兴仁县", "value": "522322" }, { "label": "普安县", "value": "522323" }, { "label": "晴隆县", "value": "522324" }, { "label": "贞丰县", "value": "522325" }, { "label": "望谟县", "value": "522326" }, { "label": "册亨县", "value": "522327" }, { "label": "安龙县", "value": "522328" }], [{ "label": "凯里市", "value": "522601" }, { "label": "黄平县", "value": "522622" }, { "label": "施秉县", "value": "522623" }, { "label": "三穗县", "value": "522624" }, { "label": "镇远县", "value": "522625" }, { "label": "岑巩县", "value": "522626" }, { "label": "天柱县", "value": "522627" }, { "label": "锦屏县", "value": "522628" }, { "label": "剑河县", "value": "522629" }, { "label": "台江县", "value": "522630" }, { "label": "黎平县", "value": "522631" }, { "label": "榕江县", "value": "522632" }, { "label": "从江县", "value": "522633" }, { "label": "雷山县", "value": "522634" }, { "label": "麻江县", "value": "522635" }, { "label": "丹寨县", "value": "522636" }], [{ "label": "都匀市", "value": "522701" }, { "label": "福泉市", "value": "522702" }, { "label": "荔波县", "value": "522722" }, { "label": "贵定县", "value": "522723" }, { "label": "瓮安县", "value": "522725" }, { "label": "独山县", "value": "522726" }, { "label": "平塘县", "value": "522727" }, { "label": "罗甸县", "value": "522728" }, { "label": "长顺县", "value": "522729" }, { "label": "龙里县", "value": "522730" }, { "label": "惠水县", "value": "522731" }, { "label": "三都水族自治县", "value": "522732" }]], [[{ "label": "五华区", "value": "530102" }, { "label": "盘龙区", "value": "530103" }, { "label": "官渡区", "value": "530111" }, { "label": "西山区", "value": "530112" }, { "label": "东川区", "value": "530113" }, { "label": "呈贡区", "value": "530114" }, { "label": "晋宁区", "value": "530115" }, { "label": "富民县", "value": "530124" }, { "label": "宜良县", "value": "530125" }, { "label": "石林彝族自治县", "value": "530126" }, { "label": "嵩明县", "value": "530127" }, { "label": "禄劝彝族苗族自治县", "value": "530128" }, { "label": "寻甸回族彝族自治县", "value": "530129" }, { "label": "安宁市", "value": "530181" }], [{ "label": "麒麟区", "value": "530302" }, { "label": "沾益区", "value": "530303" }, { "label": "马龙县", "value": "530321" }, { "label": "陆良县", "value": "530322" }, { "label": "师宗县", "value": "530323" }, { "label": "罗平县", "value": "530324" }, { "label": "富源县", "value": "530325" }, { "label": "会泽县", "value": "530326" }, { "label": "宣威市", "value": "530381" }], [{ "label": "红塔区", "value": "530402" }, { "label": "江川区", "value": "530403" }, { "label": "澄江县", "value": "530422" }, { "label": "通海县", "value": "530423" }, { "label": "华宁县", "value": "530424" }, { "label": "易门县", "value": "530425" }, { "label": "峨山彝族自治县", "value": "530426" }, { "label": "新平彝族傣族自治县", "value": "530427" }, { "label": "元江哈尼族彝族傣族自治县", "value": "530428" }], [{ "label": "隆阳区", "value": "530502" }, { "label": "施甸县", "value": "530521" }, { "label": "龙陵县", "value": "530523" }, { "label": "昌宁县", "value": "530524" }, { "label": "腾冲市", "value": "530581" }], [{ "label": "昭阳区", "value": "530602" }, { "label": "鲁甸县", "value": "530621" }, { "label": "巧家县", "value": "530622" }, { "label": "盐津县", "value": "530623" }, { "label": "大关县", "value": "530624" }, { "label": "永善县", "value": "530625" }, { "label": "绥江县", "value": "530626" }, { "label": "镇雄县", "value": "530627" }, { "label": "彝良县", "value": "530628" }, { "label": "威信县", "value": "530629" }, { "label": "水富县", "value": "530630" }], [{ "label": "古城区", "value": "530702" }, { "label": "玉龙纳西族自治县", "value": "530721" }, { "label": "永胜县", "value": "530722" }, { "label": "华坪县", "value": "530723" }, { "label": "宁蒗彝族自治县", "value": "530724" }], [{ "label": "思茅区", "value": "530802" }, { "label": "宁洱哈尼族彝族自治县", "value": "530821" }, { "label": "墨江哈尼族自治县", "value": "530822" }, { "label": "景东彝族自治县", "value": "530823" }, { "label": "景谷傣族彝族自治县", "value": "530824" }, { "label": "镇沅彝族哈尼族拉祜族自治县", "value": "530825" }, { "label": "江城哈尼族彝族自治县", "value": "530826" }, { "label": "孟连傣族拉祜族佤族自治县", "value": "530827" }, { "label": "澜沧拉祜族自治县", "value": "530828" }, { "label": "西盟佤族自治县", "value": "530829" }], [{ "label": "临翔区", "value": "530902" }, { "label": "凤庆县", "value": "530921" }, { "label": "云县", "value": "530922" }, { "label": "永德县", "value": "530923" }, { "label": "镇康县", "value": "530924" }, { "label": "双江拉祜族佤族布朗族傣族自治县", "value": "530925" }, { "label": "耿马傣族佤族自治县", "value": "530926" }, { "label": "沧源佤族自治县", "value": "530927" }], [{ "label": "楚雄市", "value": "532301" }, { "label": "双柏县", "value": "532322" }, { "label": "牟定县", "value": "532323" }, { "label": "南华县", "value": "532324" }, { "label": "姚安县", "value": "532325" }, { "label": "大姚县", "value": "532326" }, { "label": "永仁县", "value": "532327" }, { "label": "元谋县", "value": "532328" }, { "label": "武定县", "value": "532329" }, { "label": "禄丰县", "value": "532331" }], [{ "label": "个旧市", "value": "532501" }, { "label": "开远市", "value": "532502" }, { "label": "蒙自市", "value": "532503" }, { "label": "弥勒市", "value": "532504" }, { "label": "屏边苗族自治县", "value": "532523" }, { "label": "建水县", "value": "532524" }, { "label": "石屏县", "value": "532525" }, { "label": "泸西县", "value": "532527" }, { "label": "元阳县", "value": "532528" }, { "label": "红河县", "value": "532529" }, { "label": "金平苗族瑶族傣族自治县", "value": "532530" }, { "label": "绿春县", "value": "532531" }, { "label": "河口瑶族自治县", "value": "532532" }], [{ "label": "文山市", "value": "532601" }, { "label": "砚山县", "value": "532622" }, { "label": "西畴县", "value": "532623" }, { "label": "麻栗坡县", "value": "532624" }, { "label": "马关县", "value": "532625" }, { "label": "丘北县", "value": "532626" }, { "label": "广南县", "value": "532627" }, { "label": "富宁县", "value": "532628" }], [{ "label": "景洪市", "value": "532801" }, { "label": "勐海县", "value": "532822" }, { "label": "勐腊县", "value": "532823" }], [{ "label": "大理市", "value": "532901" }, { "label": "漾濞彝族自治县", "value": "532922" }, { "label": "祥云县", "value": "532923" }, { "label": "宾川县", "value": "532924" }, { "label": "弥渡县", "value": "532925" }, { "label": "南涧彝族自治县", "value": "532926" }, { "label": "巍山彝族回族自治县", "value": "532927" }, { "label": "永平县", "value": "532928" }, { "label": "云龙县", "value": "532929" }, { "label": "洱源县", "value": "532930" }, { "label": "剑川县", "value": "532931" }, { "label": "鹤庆县", "value": "532932" }], [{ "label": "瑞丽市", "value": "533102" }, { "label": "芒市", "value": "533103" }, { "label": "梁河县", "value": "533122" }, { "label": "盈江县", "value": "533123" }, { "label": "陇川县", "value": "533124" }], [{ "label": "泸水市", "value": "533301" }, { "label": "福贡县", "value": "533323" }, { "label": "贡山独龙族怒族自治县", "value": "533324" }, { "label": "兰坪白族普米族自治县", "value": "533325" }], [{ "label": "香格里拉市", "value": "533401" }, { "label": "德钦县", "value": "533422" }, { "label": "维西傈僳族自治县", "value": "533423" }]], [[{ "label": "城关区", "value": "540102" }, { "label": "堆龙德庆区", "value": "540103" }, { "label": "林周县", "value": "540121" }, { "label": "当雄县", "value": "540122" }, { "label": "尼木县", "value": "540123" }, { "label": "曲水县", "value": "540124" }, { "label": "达孜县", "value": "540126" }, { "label": "墨竹工卡县", "value": "540127" }, { "label": "格尔木藏青工业园区", "value": "540171" }, { "label": "拉萨经济技术开发区", "value": "540172" }, { "label": "西藏文化旅游创意园区", "value": "540173" }, { "label": "达孜工业园区", "value": "540174" }], [{ "label": "桑珠孜区", "value": "540202" }, { "label": "南木林县", "value": "540221" }, { "label": "江孜县", "value": "540222" }, { "label": "定日县", "value": "540223" }, { "label": "萨迦县", "value": "540224" }, { "label": "拉孜县", "value": "540225" }, { "label": "昂仁县", "value": "540226" }, { "label": "谢通门县", "value": "540227" }, { "label": "白朗县", "value": "540228" }, { "label": "仁布县", "value": "540229" }, { "label": "康马县", "value": "540230" }, { "label": "定结县", "value": "540231" }, { "label": "仲巴县", "value": "540232" }, { "label": "亚东县", "value": "540233" }, { "label": "吉隆县", "value": "540234" }, { "label": "聂拉木县", "value": "540235" }, { "label": "萨嘎县", "value": "540236" }, { "label": "岗巴县", "value": "540237" }], [{ "label": "卡若区", "value": "540302" }, { "label": "江达县", "value": "540321" }, { "label": "贡觉县", "value": "540322" }, { "label": "类乌齐县", "value": "540323" }, { "label": "丁青县", "value": "540324" }, { "label": "察雅县", "value": "540325" }, { "label": "八宿县", "value": "540326" }, { "label": "左贡县", "value": "540327" }, { "label": "芒康县", "value": "540328" }, { "label": "洛隆县", "value": "540329" }, { "label": "边坝县", "value": "540330" }], [{ "label": "巴宜区", "value": "540402" }, { "label": "工布江达县", "value": "540421" }, { "label": "米林县", "value": "540422" }, { "label": "墨脱县", "value": "540423" }, { "label": "波密县", "value": "540424" }, { "label": "察隅县", "value": "540425" }, { "label": "朗县", "value": "540426" }], [{ "label": "乃东区", "value": "540502" }, { "label": "扎囊县", "value": "540521" }, { "label": "贡嘎县", "value": "540522" }, { "label": "桑日县", "value": "540523" }, { "label": "琼结县", "value": "540524" }, { "label": "曲松县", "value": "540525" }, { "label": "措美县", "value": "540526" }, { "label": "洛扎县", "value": "540527" }, { "label": "加查县", "value": "540528" }, { "label": "隆子县", "value": "540529" }, { "label": "错那县", "value": "540530" }, { "label": "浪卡子县", "value": "540531" }], [{ "label": "那曲县", "value": "542421" }, { "label": "嘉黎县", "value": "542422" }, { "label": "比如县", "value": "542423" }, { "label": "聂荣县", "value": "542424" }, { "label": "安多县", "value": "542425" }, { "label": "申扎县", "value": "542426" }, { "label": "索县", "value": "542427" }, { "label": "班戈县", "value": "542428" }, { "label": "巴青县", "value": "542429" }, { "label": "尼玛县", "value": "542430" }, { "label": "双湖县", "value": "542431" }], [{ "label": "普兰县", "value": "542521" }, { "label": "札达县", "value": "542522" }, { "label": "噶尔县", "value": "542523" }, { "label": "日土县", "value": "542524" }, { "label": "革吉县", "value": "542525" }, { "label": "改则县", "value": "542526" }, { "label": "措勤县", "value": "542527" }]], [[{ "label": "新城区", "value": "610102" }, { "label": "碑林区", "value": "610103" }, { "label": "莲湖区", "value": "610104" }, { "label": "灞桥区", "value": "610111" }, { "label": "未央区", "value": "610112" }, { "label": "雁塔区", "value": "610113" }, { "label": "阎良区", "value": "610114" }, { "label": "临潼区", "value": "610115" }, { "label": "长安区", "value": "610116" }, { "label": "高陵区", "value": "610117" }, { "label": "鄠邑区", "value": "610118" }, { "label": "蓝田县", "value": "610122" }, { "label": "周至县", "value": "610124" }], [{ "label": "王益区", "value": "610202" }, { "label": "印台区", "value": "610203" }, { "label": "耀州区", "value": "610204" }, { "label": "宜君县", "value": "610222" }], [{ "label": "渭滨区", "value": "610302" }, { "label": "金台区", "value": "610303" }, { "label": "陈仓区", "value": "610304" }, { "label": "凤翔县", "value": "610322" }, { "label": "岐山县", "value": "610323" }, { "label": "扶风县", "value": "610324" }, { "label": "眉县", "value": "610326" }, { "label": "陇县", "value": "610327" }, { "label": "千阳县", "value": "610328" }, { "label": "麟游县", "value": "610329" }, { "label": "凤县", "value": "610330" }, { "label": "太白县", "value": "610331" }], [{ "label": "秦都区", "value": "610402" }, { "label": "杨陵区", "value": "610403" }, { "label": "渭城区", "value": "610404" }, { "label": "三原县", "value": "610422" }, { "label": "泾阳县", "value": "610423" }, { "label": "乾县", "value": "610424" }, { "label": "礼泉县", "value": "610425" }, { "label": "永寿县", "value": "610426" }, { "label": "彬县", "value": "610427" }, { "label": "长武县", "value": "610428" }, { "label": "旬邑县", "value": "610429" }, { "label": "淳化县", "value": "610430" }, { "label": "武功县", "value": "610431" }, { "label": "兴平市", "value": "610481" }], [{ "label": "临渭区", "value": "610502" }, { "label": "华州区", "value": "610503" }, { "label": "潼关县", "value": "610522" }, { "label": "大荔县", "value": "610523" }, { "label": "合阳县", "value": "610524" }, { "label": "澄城县", "value": "610525" }, { "label": "蒲城县", "value": "610526" }, { "label": "白水县", "value": "610527" }, { "label": "富平县", "value": "610528" }, { "label": "韩城市", "value": "610581" }, { "label": "华阴市", "value": "610582" }], [{ "label": "宝塔区", "value": "610602" }, { "label": "安塞区", "value": "610603" }, { "label": "延长县", "value": "610621" }, { "label": "延川县", "value": "610622" }, { "label": "子长县", "value": "610623" }, { "label": "志丹县", "value": "610625" }, { "label": "吴起县", "value": "610626" }, { "label": "甘泉县", "value": "610627" }, { "label": "富县", "value": "610628" }, { "label": "洛川县", "value": "610629" }, { "label": "宜川县", "value": "610630" }, { "label": "黄龙县", "value": "610631" }, { "label": "黄陵县", "value": "610632" }], [{ "label": "汉台区", "value": "610702" }, { "label": "南郑区", "value": "610703" }, { "label": "城固县", "value": "610722" }, { "label": "洋县", "value": "610723" }, { "label": "西乡县", "value": "610724" }, { "label": "勉县", "value": "610725" }, { "label": "宁强县", "value": "610726" }, { "label": "略阳县", "value": "610727" }, { "label": "镇巴县", "value": "610728" }, { "label": "留坝县", "value": "610729" }, { "label": "佛坪县", "value": "610730" }], [{ "label": "榆阳区", "value": "610802" }, { "label": "横山区", "value": "610803" }, { "label": "府谷县", "value": "610822" }, { "label": "靖边县", "value": "610824" }, { "label": "定边县", "value": "610825" }, { "label": "绥德县", "value": "610826" }, { "label": "米脂县", "value": "610827" }, { "label": "佳县", "value": "610828" }, { "label": "吴堡县", "value": "610829" }, { "label": "清涧县", "value": "610830" }, { "label": "子洲县", "value": "610831" }, { "label": "神木市", "value": "610881" }], [{ "label": "汉滨区", "value": "610902" }, { "label": "汉阴县", "value": "610921" }, { "label": "石泉县", "value": "610922" }, { "label": "宁陕县", "value": "610923" }, { "label": "紫阳县", "value": "610924" }, { "label": "岚皋县", "value": "610925" }, { "label": "平利县", "value": "610926" }, { "label": "镇坪县", "value": "610927" }, { "label": "旬阳县", "value": "610928" }, { "label": "白河县", "value": "610929" }], [{ "label": "商州区", "value": "611002" }, { "label": "洛南县", "value": "611021" }, { "label": "丹凤县", "value": "611022" }, { "label": "商南县", "value": "611023" }, { "label": "山阳县", "value": "611024" }, { "label": "镇安县", "value": "611025" }, { "label": "柞水县", "value": "611026" }]], [[{ "label": "城关区", "value": "620102" }, { "label": "七里河区", "value": "620103" }, { "label": "西固区", "value": "620104" }, { "label": "安宁区", "value": "620105" }, { "label": "红古区", "value": "620111" }, { "label": "永登县", "value": "620121" }, { "label": "皋兰县", "value": "620122" }, { "label": "榆中县", "value": "620123" }, { "label": "兰州新区", "value": "620171" }], [{ "label": "嘉峪关市", "value": "620201" }], [{ "label": "金川区", "value": "620302" }, { "label": "永昌县", "value": "620321" }], [{ "label": "白银区", "value": "620402" }, { "label": "平川区", "value": "620403" }, { "label": "靖远县", "value": "620421" }, { "label": "会宁县", "value": "620422" }, { "label": "景泰县", "value": "620423" }], [{ "label": "秦州区", "value": "620502" }, { "label": "麦积区", "value": "620503" }, { "label": "清水县", "value": "620521" }, { "label": "秦安县", "value": "620522" }, { "label": "甘谷县", "value": "620523" }, { "label": "武山县", "value": "620524" }, { "label": "张家川回族自治县", "value": "620525" }], [{ "label": "凉州区", "value": "620602" }, { "label": "民勤县", "value": "620621" }, { "label": "古浪县", "value": "620622" }, { "label": "天祝藏族自治县", "value": "620623" }], [{ "label": "甘州区", "value": "620702" }, { "label": "肃南裕固族自治县", "value": "620721" }, { "label": "民乐县", "value": "620722" }, { "label": "临泽县", "value": "620723" }, { "label": "高台县", "value": "620724" }, { "label": "山丹县", "value": "620725" }], [{ "label": "崆峒区", "value": "620802" }, { "label": "泾川县", "value": "620821" }, { "label": "灵台县", "value": "620822" }, { "label": "崇信县", "value": "620823" }, { "label": "华亭县", "value": "620824" }, { "label": "庄浪县", "value": "620825" }, { "label": "静宁县", "value": "620826" }, { "label": "平凉工业园区", "value": "620871" }], [{ "label": "肃州区", "value": "620902" }, { "label": "金塔县", "value": "620921" }, { "label": "瓜州县", "value": "620922" }, { "label": "肃北蒙古族自治县", "value": "620923" }, { "label": "阿克塞哈萨克族自治县", "value": "620924" }, { "label": "玉门市", "value": "620981" }, { "label": "敦煌市", "value": "620982" }], [{ "label": "西峰区", "value": "621002" }, { "label": "庆城县", "value": "621021" }, { "label": "环县", "value": "621022" }, { "label": "华池县", "value": "621023" }, { "label": "合水县", "value": "621024" }, { "label": "正宁县", "value": "621025" }, { "label": "宁县", "value": "621026" }, { "label": "镇原县", "value": "621027" }], [{ "label": "安定区", "value": "621102" }, { "label": "通渭县", "value": "621121" }, { "label": "陇西县", "value": "621122" }, { "label": "渭源县", "value": "621123" }, { "label": "临洮县", "value": "621124" }, { "label": "漳县", "value": "621125" }, { "label": "岷县", "value": "621126" }], [{ "label": "武都区", "value": "621202" }, { "label": "成县", "value": "621221" }, { "label": "文县", "value": "621222" }, { "label": "宕昌县", "value": "621223" }, { "label": "康县", "value": "621224" }, { "label": "西和县", "value": "621225" }, { "label": "礼县", "value": "621226" }, { "label": "徽县", "value": "621227" }, { "label": "两当县", "value": "621228" }], [{ "label": "临夏市", "value": "622901" }, { "label": "临夏县", "value": "622921" }, { "label": "康乐县", "value": "622922" }, { "label": "永靖县", "value": "622923" }, { "label": "广河县", "value": "622924" }, { "label": "和政县", "value": "622925" }, { "label": "东乡族自治县", "value": "622926" }, { "label": "积石山保安族东乡族撒拉族自治县", "value": "622927" }], [{ "label": "合作市", "value": "623001" }, { "label": "临潭县", "value": "623021" }, { "label": "卓尼县", "value": "623022" }, { "label": "舟曲县", "value": "623023" }, { "label": "迭部县", "value": "623024" }, { "label": "玛曲县", "value": "623025" }, { "label": "碌曲县", "value": "623026" }, { "label": "夏河县", "value": "623027" }]], [[{ "label": "城东区", "value": "630102" }, { "label": "城中区", "value": "630103" }, { "label": "城西区", "value": "630104" }, { "label": "城北区", "value": "630105" }, { "label": "大通回族土族自治县", "value": "630121" }, { "label": "湟中县", "value": "630122" }, { "label": "湟源县", "value": "630123" }], [{ "label": "乐都区", "value": "630202" }, { "label": "平安区", "value": "630203" }, { "label": "民和回族土族自治县", "value": "630222" }, { "label": "互助土族自治县", "value": "630223" }, { "label": "化隆回族自治县", "value": "630224" }, { "label": "循化撒拉族自治县", "value": "630225" }], [{ "label": "门源回族自治县", "value": "632221" }, { "label": "祁连县", "value": "632222" }, { "label": "海晏县", "value": "632223" }, { "label": "刚察县", "value": "632224" }], [{ "label": "同仁县", "value": "632321" }, { "label": "尖扎县", "value": "632322" }, { "label": "泽库县", "value": "632323" }, { "label": "河南蒙古族自治县", "value": "632324" }], [{ "label": "共和县", "value": "632521" }, { "label": "同德县", "value": "632522" }, { "label": "贵德县", "value": "632523" }, { "label": "兴海县", "value": "632524" }, { "label": "贵南县", "value": "632525" }], [{ "label": "玛沁县", "value": "632621" }, { "label": "班玛县", "value": "632622" }, { "label": "甘德县", "value": "632623" }, { "label": "达日县", "value": "632624" }, { "label": "久治县", "value": "632625" }, { "label": "玛多县", "value": "632626" }], [{ "label": "玉树市", "value": "632701" }, { "label": "杂多县", "value": "632722" }, { "label": "称多县", "value": "632723" }, { "label": "治多县", "value": "632724" }, { "label": "囊谦县", "value": "632725" }, { "label": "曲麻莱县", "value": "632726" }], [{ "label": "格尔木市", "value": "632801" }, { "label": "德令哈市", "value": "632802" }, { "label": "乌兰县", "value": "632821" }, { "label": "都兰县", "value": "632822" }, { "label": "天峻县", "value": "632823" }, { "label": "大柴旦行政委员会", "value": "632857" }, { "label": "冷湖行政委员会", "value": "632858" }, { "label": "茫崖行政委员会", "value": "632859" }]], [[{ "label": "兴庆区", "value": "640104" }, { "label": "西夏区", "value": "640105" }, { "label": "金凤区", "value": "640106" }, { "label": "永宁县", "value": "640121" }, { "label": "贺兰县", "value": "640122" }, { "label": "灵武市", "value": "640181" }], [{ "label": "大武口区", "value": "640202" }, { "label": "惠农区", "value": "640205" }, { "label": "平罗县", "value": "640221" }], [{ "label": "利通区", "value": "640302" }, { "label": "红寺堡区", "value": "640303" }, { "label": "盐池县", "value": "640323" }, { "label": "同心县", "value": "640324" }, { "label": "青铜峡市", "value": "640381" }], [{ "label": "原州区", "value": "640402" }, { "label": "西吉县", "value": "640422" }, { "label": "隆德县", "value": "640423" }, { "label": "泾源县", "value": "640424" }, { "label": "彭阳县", "value": "640425" }], [{ "label": "沙坡头区", "value": "640502" }, { "label": "中宁县", "value": "640521" }, { "label": "海原县", "value": "640522" }]], [[{ "label": "天山区", "value": "650102" }, { "label": "沙依巴克区", "value": "650103" }, { "label": "新市区", "value": "650104" }, { "label": "水磨沟区", "value": "650105" }, { "label": "头屯河区", "value": "650106" }, { "label": "达坂城区", "value": "650107" }, { "label": "米东区", "value": "650109" }, { "label": "乌鲁木齐县", "value": "650121" }, { "label": "乌鲁木齐经济技术开发区", "value": "650171" }, { "label": "乌鲁木齐高新技术产业开发区", "value": "650172" }], [{ "label": "独山子区", "value": "650202" }, { "label": "克拉玛依区", "value": "650203" }, { "label": "白碱滩区", "value": "650204" }, { "label": "乌尔禾区", "value": "650205" }], [{ "label": "高昌区", "value": "650402" }, { "label": "鄯善县", "value": "650421" }, { "label": "托克逊县", "value": "650422" }], [{ "label": "伊州区", "value": "650502" }, { "label": "巴里坤哈萨克自治县", "value": "650521" }, { "label": "伊吾县", "value": "650522" }], [{ "label": "昌吉市", "value": "652301" }, { "label": "阜康市", "value": "652302" }, { "label": "呼图壁县", "value": "652323" }, { "label": "玛纳斯县", "value": "652324" }, { "label": "奇台县", "value": "652325" }, { "label": "吉木萨尔县", "value": "652327" }, { "label": "木垒哈萨克自治县", "value": "652328" }], [{ "label": "博乐市", "value": "652701" }, { "label": "阿拉山口市", "value": "652702" }, { "label": "精河县", "value": "652722" }, { "label": "温泉县", "value": "652723" }], [{ "label": "库尔勒市", "value": "652801" }, { "label": "轮台县", "value": "652822" }, { "label": "尉犁县", "value": "652823" }, { "label": "若羌县", "value": "652824" }, { "label": "且末县", "value": "652825" }, { "label": "焉耆回族自治县", "value": "652826" }, { "label": "和静县", "value": "652827" }, { "label": "和硕县", "value": "652828" }, { "label": "博湖县", "value": "652829" }, { "label": "库尔勒经济技术开发区", "value": "652871" }], [{ "label": "阿克苏市", "value": "652901" }, { "label": "温宿县", "value": "652922" }, { "label": "库车县", "value": "652923" }, { "label": "沙雅县", "value": "652924" }, { "label": "新和县", "value": "652925" }, { "label": "拜城县", "value": "652926" }, { "label": "乌什县", "value": "652927" }, { "label": "阿瓦提县", "value": "652928" }, { "label": "柯坪县", "value": "652929" }], [{ "label": "阿图什市", "value": "653001" }, { "label": "阿克陶县", "value": "653022" }, { "label": "阿合奇县", "value": "653023" }, { "label": "乌恰县", "value": "653024" }], [{ "label": "喀什市", "value": "653101" }, { "label": "疏附县", "value": "653121" }, { "label": "疏勒县", "value": "653122" }, { "label": "英吉沙县", "value": "653123" }, { "label": "泽普县", "value": "653124" }, { "label": "莎车县", "value": "653125" }, { "label": "叶城县", "value": "653126" }, { "label": "麦盖提县", "value": "653127" }, { "label": "岳普湖县", "value": "653128" }, { "label": "伽师县", "value": "653129" }, { "label": "巴楚县", "value": "653130" }, { "label": "塔什库尔干塔吉克自治县", "value": "653131" }], [{ "label": "和田市", "value": "653201" }, { "label": "和田县", "value": "653221" }, { "label": "墨玉县", "value": "653222" }, { "label": "皮山县", "value": "653223" }, { "label": "洛浦县", "value": "653224" }, { "label": "策勒县", "value": "653225" }, { "label": "于田县", "value": "653226" }, { "label": "民丰县", "value": "653227" }], [{ "label": "伊宁市", "value": "654002" }, { "label": "奎屯市", "value": "654003" }, { "label": "霍尔果斯市", "value": "654004" }, { "label": "伊宁县", "value": "654021" }, { "label": "察布查尔锡伯自治县", "value": "654022" }, { "label": "霍城县", "value": "654023" }, { "label": "巩留县", "value": "654024" }, { "label": "新源县", "value": "654025" }, { "label": "昭苏县", "value": "654026" }, { "label": "特克斯县", "value": "654027" }, { "label": "尼勒克县", "value": "654028" }], [{ "label": "塔城市", "value": "654201" }, { "label": "乌苏市", "value": "654202" }, { "label": "额敏县", "value": "654221" }, { "label": "沙湾县", "value": "654223" }, { "label": "托里县", "value": "654224" }, { "label": "裕民县", "value": "654225" }, { "label": "和布克赛尔蒙古自治县", "value": "654226" }], [{ "label": "阿勒泰市", "value": "654301" }, { "label": "布尔津县", "value": "654321" }, { "label": "富蕴县", "value": "654322" }, { "label": "福海县", "value": "654323" }, { "label": "哈巴河县", "value": "654324" }, { "label": "青河县", "value": "654325" }, { "label": "吉木乃县", "value": "654326" }], [{ "label": "石河子市", "value": "659001" }, { "label": "阿拉尔市", "value": "659002" }, { "label": "图木舒克市", "value": "659003" }, { "label": "五家渠市", "value": "659004" }, { "label": "铁门关市", "value": "659006" }]], [[{ "label": "台北", "value": "660101" }], [{ "label": "高雄", "value": "660201" }], [{ "label": "基隆", "value": "660301" }], [{ "label": "台中", "value": "660401" }], [{ "label": "台南", "value": "660501" }], [{ "label": "新竹", "value": "660601" }], [{ "label": "嘉义", "value": "660701" }], [{ "label": "宜兰", "value": "660801" }], [{ "label": "桃园", "value": "660901" }], [{ "label": "苗栗", "value": "661001" }], [{ "label": "彰化", "value": "661101" }], [{ "label": "南投", "value": "661201" }], [{ "label": "云林", "value": "661301" }], [{ "label": "屏东", "value": "661401" }], [{ "label": "台东", "value": "661501" }], [{ "label": "花莲", "value": "661601" }], [{ "label": "澎湖", "value": "661701" }]], [[{ "label": "香港岛", "value": "670101" }], [{ "label": "九龙", "value": "670201" }], [{ "label": "新界", "value": "670301" }]], [[{ "label": "澳门半岛", "value": "680101" }], [{ "label": "氹仔岛", "value": "680201" }], [{ "label": "路环岛", "value": "680301" }], [{ "label": "路氹城", "value": "680401" }]]];var _default = areaData;exports.default = _default;

/***/ }),

/***/ 33:
/*!************************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/uview-ui/libs/function/getParent.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = getParent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
function getParent(name, keys) {
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {var _ret = function () {
        var data = {};
        // 判断keys是否数组，如果传过来的是一个数组，那么直接使用数组元素值当做键值去父组件寻找
        if (Array.isArray(keys)) {
          keys.map(function (val) {
            data[val] = parent[val] ? parent[val] : '';
          });
        } else {
          // 历遍传过来的对象参数
          for (var i in keys) {
            // 如果子组件有此值则用，无此值则用父组件的值
            // 判断是否空数组，如果是，则用父组件的值，否则用子组件的值
            if (Array.isArray(keys[i])) {
              if (keys[i].length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else if (keys[i].constructor === Object) {
              // 判断是否对象，如果是对象，且有属性，那么使用子组件的值，否则使用父组件的值
              if (Object.keys(keys[i]).length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else {
              // 只要子组件有传值，即使是false值，也是“传值”了，也需要覆盖父组件的同名参数
              data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
            }
          }
        }
        return { v: data };}();if (typeof _ret === "object") return _ret.v;
    }
  }

  return {};
}

/***/ }),

/***/ 337:
/*!******************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/uview-ui/libs/util/emitter.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 递归使用 call 方式this指向
                                                                                                      * @param componentName // 需要找的组件的名称
                                                                                                      * @param eventName // 事件名称
                                                                                                      * @param params // 需要传递的参数
                                                                                                      */
function _broadcast(componentName, eventName, params) {
  // 循环子节点找到名称一样的子节点 否则 递归 当前子节点
  this.$children.map(function (child) {
    if (componentName === child.$options.name) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      _broadcast.apply(child, [componentName, eventName].concat(params));
    }
  });
}var _default =
{
  methods: {
    /**
              * 派发 (向上查找) (一个)
              * @param componentName // 需要找的组件的名称
              * @param eventName // 事件名称
              * @param params // 需要传递的参数
              */
    dispatch: function dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root; //$parent 找到最近的父节点 $root 根节点
      var name = parent.$options.name; // 获取当前组件实例的name
      // 如果当前有节点 && 当前没名称 且 当前名称等于需要传进来的名称的时候就去查找当前的节点
      // 循环出当前名称的一样的组件实例
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.name;
        }
      }
      // 有节点表示当前找到了name一样的实例
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    /**
        * 广播 (向下查找) (广播多个)
        * @param componentName // 需要找的组件的名称
        * @param eventName // 事件名称
        * @param params // 需要传递的参数
        */
    broadcast: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    } } };exports.default = _default;

/***/ }),

/***/ 34:
/*!**********************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/uview-ui/libs/function/$parent.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = $parent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
// 这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
// 值(默认为undefined)，就是查找最顶层的$parent
function $parent() {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options && parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}

/***/ }),

/***/ 35:
/*!******************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/uview-ui/libs/function/sys.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.os = os;exports.sys = sys;function os() {
  return uni.getSystemInfoSync().platform;
};

function sys() {
  return uni.getSystemInfoSync();
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 36:
/*!***********************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/uview-ui/libs/function/debounce.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timeout = null;

/**
                                                                                                                         * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
                                                                                                                         * 
                                                                                                                         * @param {Function} func 要执行的回调函数 
                                                                                                                         * @param {Number} wait 延时的时间
                                                                                                                         * @param {Boolean} immediate 是否立即执行 
                                                                                                                         * @return null
                                                                                                                         */
function debounce(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === 'function' && func();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      typeof func === 'function' && func();
    }, wait);
  }
}var _default =

debounce;exports.default = _default;

/***/ }),

/***/ 37:
/*!***********************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/uview-ui/libs/function/throttle.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timer, flag;
/**
                                                                                                                      * 节流原理：在一定时间内，只能触发一次
                                                                                                                      * 
                                                                                                                      * @param {Function} func 要执行的回调函数 
                                                                                                                      * @param {Number} wait 延时的时间
                                                                                                                      * @param {Boolean} immediate 是否立即执行
                                                                                                                      * @return null
                                                                                                                      */
function throttle(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func();
      timer = setTimeout(function () {
        flag = false;
      }, wait);
    }
  } else {
    if (!flag) {
      flag = true;
      // 如果是非立即执行，则在wait毫秒内的结束处执行
      timer = setTimeout(function () {
        flag = false;
        typeof func === 'function' && func();
      }, wait);
    }

  }
};var _default =
throttle;exports.default = _default;

/***/ }),

/***/ 38:
/*!*******************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/uview-ui/libs/config/config.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 此版本发布于2020-12-17
var version = '1.8.3';var _default =

{
  v: version,
  version: version,
  // 主题名称
  type: [
  'primary',
  'success',
  'info',
  'error',
  'warning'] };exports.default = _default;

/***/ }),

/***/ 39:
/*!*******************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/uview-ui/libs/config/zIndex.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // uniapp在H5中各API的z-index值如下：
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 * toast: 999
 */var _default =

{
  toast: 10090,
  noNetwork: 10080,
  // popup包含popup，actionsheet，keyboard，picker的值
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965 };exports.default = _default;

/***/ }),

/***/ 4:
/*!**********************************************!*\
  !*** D:/HBuilderProjects/rushifu/pages.json ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 40:
/*!************************************************!*\
  !*** D:/HBuilderProjects/rushifu/api/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _axios = _interopRequireDefault(__webpack_require__(/*! axios */ 41));
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

var _url = _interopRequireDefault(__webpack_require__(/*! ./url.js */ 70));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
var vue = new _vue.default();
var myPost = _axios.default.create({
  baseURL: _url.default.baseUrl,
  method: 'post'
  // timeout: 1000,
});
var myGet = _axios.default.create({
  baseURL: _url.default.baseUrl,
  method: 'get'
  // timeout: 1000,
});
var myDelete = _axios.default.create({
  baseURL: _url.default.baseUrl,
  method: 'delete'
  // timeout: 1000,
});
_axios.default.defaults.adapter = function (config) {//自己定义个适配器，用来适配uniapp的语法
  return new Promise(function (resolve, reject) {
    var settle = __webpack_require__(/*! axios/lib/core/settle */ 56);
    var buildURL = __webpack_require__(/*! axios/lib/helpers/buildURL */ 46);
    uni.request({
      method: config.method.toUpperCase(),
      url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
      header: config.headers,
      data: config.data,
      dataType: config.dataType,
      responseType: config.responseType,
      sslVerify: config.sslVerify,
      complete: function complete(response) {
        response = {
          data: response.data,
          status: response.statusCode,
          errMsg: response.errMsg,
          header: response.header,
          config: config };


        settle(resolve, reject, response);
      } });

  });
};

myPost.interceptors.request.use(function (config) {
  if (uni.getStorageSync('token')) {
    config.headers = {
      'Accept': 'application/json'
      // 'token':  uni.getStorageSync('token'),
      // 'Access-Control-Allow-Origin': '*',
      // "access-control-allow-credentials": "true"
    };
    // config.headers.token = uni.getStorageSync('token');
  }
  console.log(config);
  return config;
}, function (error) {
  console.log(error);
  return Promise.reject();
});
myGet.interceptors.request.use(function (config) {
  if (uni.getStorageSync('token')) {
    config.headers = {
      'Accept': 'application/json'
      // 'token': sessionStorage.token,
      // 'Access-Control-Allow-Origin': '*',
      // "access-control-allow-credentials": "true"
    };
    config.headers.token = uni.getStorageSync('token');
  }
  return config;
}, function (error) {
  console.log(error);
  return Promise.reject();
});
myPost.interceptors.response.use(function (response) {
  // console.log(response)
  if (response.status === 200) {
    return response.data;
  }
  // if (response.status === 200 && response.data.code == '200') {
  //     vue.$message({
  //         message: response.data.msg,
  //         type: "success",
  //     });
  //     return response.data;
  // }
  else {
      vue.$message.error(response.data.info);
      Promise.reject();
    }
}, function (error) {
  //错误跳转
  console.log(error);
  if (error.response.status === 500) {
    console.log(vue);
    if (error.response.data.info != '参数错误') {
      vue.$message.error(error.response.data.info);
    }
  } else if (error.response.status === 401) {
    sessionStorage.setItem("isLogin", false);
    console.log(sessionStorage.getItem("isLogin"));
    // router.push({ path: "/" })
    // router.go(0)
    return Promise.reject();
  } else if (error.response.status === 404) {
    vue.$alert('页面不存在', '404错误', {
      confirmButtonText: '确定' });

    return Promise.reject();
  } else if (error.response.status === 402) {
    vue.$alert('请求次数限制', '402错误', {
      confirmButtonText: '确定' });

    return Promise.reject();
  } else {
    if (error.response.data.info != '参数错误') {
      vue.$message.error(error.response.data.info);
    }
  }
});
myGet.interceptors.response.use(function (response) {
  if (response.status === 200) {
    return response.data;
  }
  // if (response.status === 200 && response.data.code == '200') {
  //     vue.$message({
  //         message: response.data.msg,
  //         type: "success",
  //     });
  //     return response.data;
  // }
  else {
      vue.$message.error(response.data.info);
      Promise.reject();
    }
}, function (error) {
  //错误跳转
  console.log(error);
  if (error.response.status === 500) {
    if (error.response.data.info != '参数错误') {
      vue.$message.error(error.response.data.info);
    }
  } else if (error.response.status === 401) {
    sessionStorage.setItem("isLogin", false);
    console.log(sessionStorage.getItem("isLogin"));
    // router.push({ path: "/" })
    // router.go(0)
    return Promise.reject();
  } else if (error.response.status === 404) {
    vue.$alert('页面不存在', '404错误', {
      confirmButtonText: '确定' });

    return Promise.reject();
  } else if (error.response.status === 402) {
    vue.$alert('请求次数限制', '402错误', {
      confirmButtonText: '确定' });

    return Promise.reject();
  } else {
    if (error.response.data.info != '参数错误') {
      vue.$message.error(error.response.data.info);
    }
  }
});var _default =

{
  loginWechat: function loginWechat(obj) {
    return myPost({
      url: _url.default.loginWechat,
      data: _objectSpread({},
      obj) });


  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 408:
/*!*******************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/components/pcaPicker/pcaData.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var pca = [
{
  "code": "11", "name": "北京市", "children": [
  { "code": "1101", "name": "市辖区", "children": [
    { "code": "110101", "name": "东城区" },
    { "code": "110102", "name": "西城区" },
    { "code": "110105", "name": "朝阳区" },
    { "code": "110106", "name": "丰台区" },
    { "code": "110107", "name": "石景山区" },
    { "code": "110108", "name": "海淀区" },
    { "code": "110109", "name": "门头沟区" },
    { "code": "110111", "name": "房山区" },
    { "code": "110112", "name": "通州区" },
    { "code": "110113", "name": "顺义区" },
    { "code": "110114", "name": "昌平区" },
    { "code": "110115", "name": "大兴区" },
    { "code": "110116", "name": "怀柔区" },
    { "code": "110117", "name": "平谷区" },
    { "code": "110118", "name": "密云区" },
    { "code": "110119", "name": "延庆区" }] }] },



{
  "code": "12", "name": "天津市", "children": [
  { "code": "1201", "name": "市辖区", "children": [
    { "code": "120101", "name": "和平区" },
    { "code": "120102", "name": "河东区" },
    { "code": "120103", "name": "河西区" },
    { "code": "120104", "name": "南开区" },
    { "code": "120105", "name": "河北区" },
    { "code": "120106", "name": "红桥区" },
    { "code": "120110", "name": "东丽区" },
    { "code": "120111", "name": "西青区" },
    { "code": "120112", "name": "津南区" },
    { "code": "120113", "name": "北辰区" },
    { "code": "120114", "name": "武清区" },
    { "code": "120115", "name": "宝坻区" },
    { "code": "120116", "name": "滨海新区" },
    { "code": "120117", "name": "宁河区" },
    { "code": "120118", "name": "静海区" },
    { "code": "120119", "name": "蓟州区" }] }] },



{
  "code": "13", "name": "河北省", "children": [
  { "code": "1301", "name": "石家庄市", "children": [
    { "code": "130102", "name": "长安区" },
    { "code": "130104", "name": "桥西区" },
    { "code": "130105", "name": "新华区" },
    { "code": "130107", "name": "井陉矿区" },
    { "code": "130108", "name": "裕华区" },
    { "code": "130109", "name": "藁城区" },
    { "code": "130110", "name": "鹿泉区" },
    { "code": "130111", "name": "栾城区" },
    { "code": "130121", "name": "井陉县" },
    { "code": "130123", "name": "正定县" },
    { "code": "130125", "name": "行唐县" },
    { "code": "130126", "name": "灵寿县" },
    { "code": "130127", "name": "高邑县" },
    { "code": "130128", "name": "深泽县" },
    { "code": "130129", "name": "赞皇县" },
    { "code": "130130", "name": "无极县" },
    { "code": "130131", "name": "平山县" },
    { "code": "130132", "name": "元氏县" },
    { "code": "130133", "name": "赵县" },
    { "code": "130171", "name": "石家庄高新技术产业开发区" },
    { "code": "130172", "name": "石家庄循环化工园区" },
    { "code": "130181", "name": "辛集市" },
    { "code": "130183", "name": "晋州市" },
    { "code": "130184", "name": "新乐市" }] },

  { "code": "1302", "name": "唐山市", "children": [
    { "code": "130202", "name": "路南区" },
    { "code": "130203", "name": "路北区" },
    { "code": "130204", "name": "古冶区" },
    { "code": "130205", "name": "开平区" },
    { "code": "130207", "name": "丰南区" },
    { "code": "130208", "name": "丰润区" },
    { "code": "130209", "name": "曹妃甸区" },
    { "code": "130224", "name": "滦南县" },
    { "code": "130225", "name": "乐亭县" },
    { "code": "130227", "name": "迁西县" },
    { "code": "130229", "name": "玉田县" },
    { "code": "130271", "name": "河北唐山芦台经济开发区" },
    { "code": "130272", "name": "唐山市汉沽管理区" },
    { "code": "130273", "name": "唐山高新技术产业开发区" },
    { "code": "130274", "name": "河北唐山海港经济开发区" },
    { "code": "130281", "name": "遵化市" },
    { "code": "130283", "name": "迁安市" },
    { "code": "130284", "name": "滦州市" }] },

  { "code": "1303", "name": "秦皇岛市", "children": [
    { "code": "130302", "name": "海港区" },
    { "code": "130303", "name": "山海关区" },
    { "code": "130304", "name": "北戴河区" },
    { "code": "130306", "name": "抚宁区" },
    { "code": "130321", "name": "青龙满族自治县" },
    { "code": "130322", "name": "昌黎县" },
    { "code": "130324", "name": "卢龙县" },
    { "code": "130371", "name": "秦皇岛市经济技术开发区" },
    { "code": "130372", "name": "北戴河新区" }] },

  { "code": "1304", "name": "邯郸市", "children": [
    { "code": "130402", "name": "邯山区" },
    { "code": "130403", "name": "丛台区" },
    { "code": "130404", "name": "复兴区" },
    { "code": "130406", "name": "峰峰矿区" },
    { "code": "130407", "name": "肥乡区" },
    { "code": "130408", "name": "永年区" },
    { "code": "130423", "name": "临漳县" },
    { "code": "130424", "name": "成安县" },
    { "code": "130425", "name": "大名县" },
    { "code": "130426", "name": "涉县" },
    { "code": "130427", "name": "磁县" },
    { "code": "130430", "name": "邱县" },
    { "code": "130431", "name": "鸡泽县" },
    { "code": "130432", "name": "广平县" },
    { "code": "130433", "name": "馆陶县" },
    { "code": "130434", "name": "魏县" },
    { "code": "130435", "name": "曲周县" },
    { "code": "130471", "name": "邯郸经济技术开发区" },
    { "code": "130473", "name": "邯郸冀南新区" },
    { "code": "130481", "name": "武安市" }] },

  { "code": "1305", "name": "邢台市", "children": [
    { "code": "130502", "name": "桥东区" },
    { "code": "130503", "name": "桥西区" },
    { "code": "130521", "name": "邢台县" },
    { "code": "130522", "name": "临城县" },
    { "code": "130523", "name": "内丘县" },
    { "code": "130524", "name": "柏乡县" },
    { "code": "130525", "name": "隆尧县" },
    { "code": "130526", "name": "任县" },
    { "code": "130527", "name": "南和县" },
    { "code": "130528", "name": "宁晋县" },
    { "code": "130529", "name": "巨鹿县" },
    { "code": "130530", "name": "新河县" },
    { "code": "130531", "name": "广宗县" },
    { "code": "130532", "name": "平乡县" },
    { "code": "130533", "name": "威县" },
    { "code": "130534", "name": "清河县" },
    { "code": "130535", "name": "临西县" },
    { "code": "130571", "name": "河北邢台经济开发区" },
    { "code": "130581", "name": "南宫市" },
    { "code": "130582", "name": "沙河市" }] },

  { "code": "1306", "name": "保定市", "children": [
    { "code": "130602", "name": "竞秀区" },
    { "code": "130606", "name": "莲池区" },
    { "code": "130607", "name": "满城区" },
    { "code": "130608", "name": "清苑区" },
    { "code": "130609", "name": "徐水区" },
    { "code": "130623", "name": "涞水县" },
    { "code": "130624", "name": "阜平县" },
    { "code": "130626", "name": "定兴县" },
    { "code": "130627", "name": "唐县" },
    { "code": "130628", "name": "高阳县" },
    { "code": "130629", "name": "容城县" },
    { "code": "130630", "name": "涞源县" },
    { "code": "130631", "name": "望都县" },
    { "code": "130632", "name": "安新县" },
    { "code": "130633", "name": "易县" },
    { "code": "130634", "name": "曲阳县" },
    { "code": "130635", "name": "蠡县" },
    { "code": "130636", "name": "顺平县" },
    { "code": "130637", "name": "博野县" },
    { "code": "130638", "name": "雄县" },
    { "code": "130671", "name": "保定高新技术产业开发区" },
    { "code": "130672", "name": "保定白沟新城" },
    { "code": "130681", "name": "涿州市" },
    { "code": "130682", "name": "定州市" },
    { "code": "130683", "name": "安国市" },
    { "code": "130684", "name": "高碑店市" }] },

  { "code": "1307", "name": "张家口市", "children": [
    { "code": "130702", "name": "桥东区" },
    { "code": "130703", "name": "桥西区" },
    { "code": "130705", "name": "宣化区" },
    { "code": "130706", "name": "下花园区" },
    { "code": "130708", "name": "万全区" },
    { "code": "130709", "name": "崇礼区" },
    { "code": "130722", "name": "张北县" },
    { "code": "130723", "name": "康保县" },
    { "code": "130724", "name": "沽源县" },
    { "code": "130725", "name": "尚义县" },
    { "code": "130726", "name": "蔚县" },
    { "code": "130727", "name": "阳原县" },
    { "code": "130728", "name": "怀安县" },
    { "code": "130730", "name": "怀来县" },
    { "code": "130731", "name": "涿鹿县" },
    { "code": "130732", "name": "赤城县" },
    { "code": "130771", "name": "张家口经济开发区" },
    { "code": "130772", "name": "张家口市察北管理区" },
    { "code": "130773", "name": "张家口市塞北管理区" }] },

  { "code": "1308", "name": "承德市", "children": [
    { "code": "130802", "name": "双桥区" },
    { "code": "130803", "name": "双滦区" },
    { "code": "130804", "name": "鹰手营子矿区" },
    { "code": "130821", "name": "承德县" },
    { "code": "130822", "name": "兴隆县" },
    { "code": "130824", "name": "滦平县" },
    { "code": "130825", "name": "隆化县" },
    { "code": "130826", "name": "丰宁满族自治县" },
    { "code": "130827", "name": "宽城满族自治县" },
    { "code": "130828", "name": "围场满族蒙古族自治县" },
    { "code": "130871", "name": "承德高新技术产业开发区" },
    { "code": "130881", "name": "平泉市" }] },

  { "code": "1309", "name": "沧州市", "children": [
    { "code": "130902", "name": "新华区" },
    { "code": "130903", "name": "运河区" },
    { "code": "130921", "name": "沧县" },
    { "code": "130922", "name": "青县" },
    { "code": "130923", "name": "东光县" },
    { "code": "130924", "name": "海兴县" },
    { "code": "130925", "name": "盐山县" },
    { "code": "130926", "name": "肃宁县" },
    { "code": "130927", "name": "南皮县" },
    { "code": "130928", "name": "吴桥县" },
    { "code": "130929", "name": "献县" },
    { "code": "130930", "name": "孟村回族自治县" },
    { "code": "130971", "name": "河北沧州经济开发区" },
    { "code": "130972", "name": "沧州高新技术产业开发区" },
    { "code": "130973", "name": "沧州渤海新区" },
    { "code": "130981", "name": "泊头市" },
    { "code": "130982", "name": "任丘市" },
    { "code": "130983", "name": "黄骅市" },
    { "code": "130984", "name": "河间市" }] },

  { "code": "1310", "name": "廊坊市", "children": [
    { "code": "131002", "name": "安次区" },
    { "code": "131003", "name": "广阳区" },
    { "code": "131022", "name": "固安县" },
    { "code": "131023", "name": "永清县" },
    { "code": "131024", "name": "香河县" },
    { "code": "131025", "name": "大城县" },
    { "code": "131026", "name": "文安县" },
    { "code": "131028", "name": "大厂回族自治县" },
    { "code": "131071", "name": "廊坊经济技术开发区" },
    { "code": "131081", "name": "霸州市" },
    { "code": "131082", "name": "三河市" }] },

  { "code": "1311", "name": "衡水市", "children": [
    { "code": "131102", "name": "桃城区" },
    { "code": "131103", "name": "冀州区" },
    { "code": "131121", "name": "枣强县" },
    { "code": "131122", "name": "武邑县" },
    { "code": "131123", "name": "武强县" },
    { "code": "131124", "name": "饶阳县" },
    { "code": "131125", "name": "安平县" },
    { "code": "131126", "name": "故城县" },
    { "code": "131127", "name": "景县" },
    { "code": "131128", "name": "阜城县" },
    { "code": "131171", "name": "河北衡水高新技术产业开发区" },
    { "code": "131172", "name": "衡水滨湖新区" },
    { "code": "131182", "name": "深州市" }] }] },



{
  "code": "14", "name": "山西省", "children": [
  { "code": "1401", "name": "太原市", "children": [
    { "code": "140105", "name": "小店区" },
    { "code": "140106", "name": "迎泽区" },
    { "code": "140107", "name": "杏花岭区" },
    { "code": "140108", "name": "尖草坪区" },
    { "code": "140109", "name": "万柏林区" },
    { "code": "140110", "name": "晋源区" },
    { "code": "140121", "name": "清徐县" },
    { "code": "140122", "name": "阳曲县" },
    { "code": "140123", "name": "娄烦县" },
    { "code": "140171", "name": "山西转型综合改革示范区" },
    { "code": "140181", "name": "古交市" }] },

  { "code": "1402", "name": "大同市", "children": [
    { "code": "140212", "name": "新荣区" },
    { "code": "140213", "name": "平城区" },
    { "code": "140214", "name": "云冈区" },
    { "code": "140215", "name": "云州区" },
    { "code": "140221", "name": "阳高县" },
    { "code": "140222", "name": "天镇县" },
    { "code": "140223", "name": "广灵县" },
    { "code": "140224", "name": "灵丘县" },
    { "code": "140225", "name": "浑源县" },
    { "code": "140226", "name": "左云县" },
    { "code": "140271", "name": "山西大同经济开发区" }] },

  { "code": "1403", "name": "阳泉市", "children": [
    { "code": "140302", "name": "城区" },
    { "code": "140303", "name": "矿区" },
    { "code": "140311", "name": "郊区" },
    { "code": "140321", "name": "平定县" },
    { "code": "140322", "name": "盂县" }] },

  { "code": "1404", "name": "长治市", "children": [
    { "code": "140403", "name": "潞州区" },
    { "code": "140404", "name": "上党区" },
    { "code": "140405", "name": "屯留区" },
    { "code": "140406", "name": "潞城区" },
    { "code": "140423", "name": "襄垣县" },
    { "code": "140425", "name": "平顺县" },
    { "code": "140426", "name": "黎城县" },
    { "code": "140427", "name": "壶关县" },
    { "code": "140428", "name": "长子县" },
    { "code": "140429", "name": "武乡县" },
    { "code": "140430", "name": "沁县" },
    { "code": "140431", "name": "沁源县" },
    { "code": "140471", "name": "山西长治高新技术产业园区" }] },

  { "code": "1405", "name": "晋城市", "children": [
    { "code": "140502", "name": "城区" },
    { "code": "140521", "name": "沁水县" },
    { "code": "140522", "name": "阳城县" },
    { "code": "140524", "name": "陵川县" },
    { "code": "140525", "name": "泽州县" },
    { "code": "140581", "name": "高平市" }] },

  { "code": "1406", "name": "朔州市", "children": [
    { "code": "140602", "name": "朔城区" },
    { "code": "140603", "name": "平鲁区" },
    { "code": "140621", "name": "山阴县" },
    { "code": "140622", "name": "应县" },
    { "code": "140623", "name": "右玉县" },
    { "code": "140671", "name": "山西朔州经济开发区" },
    { "code": "140681", "name": "怀仁市" }] },

  { "code": "1407", "name": "晋中市", "children": [
    { "code": "140702", "name": "榆次区" },
    { "code": "140721", "name": "榆社县" },
    { "code": "140722", "name": "左权县" },
    { "code": "140723", "name": "和顺县" },
    { "code": "140724", "name": "昔阳县" },
    { "code": "140725", "name": "寿阳县" },
    { "code": "140726", "name": "太谷县" },
    { "code": "140727", "name": "祁县" },
    { "code": "140728", "name": "平遥县" },
    { "code": "140729", "name": "灵石县" },
    { "code": "140781", "name": "介休市" }] },

  { "code": "1408", "name": "运城市", "children": [
    { "code": "140802", "name": "盐湖区" },
    { "code": "140821", "name": "临猗县" },
    { "code": "140822", "name": "万荣县" },
    { "code": "140823", "name": "闻喜县" },
    { "code": "140824", "name": "稷山县" },
    { "code": "140825", "name": "新绛县" },
    { "code": "140826", "name": "绛县" },
    { "code": "140827", "name": "垣曲县" },
    { "code": "140828", "name": "夏县" },
    { "code": "140829", "name": "平陆县" },
    { "code": "140830", "name": "芮城县" },
    { "code": "140881", "name": "永济市" },
    { "code": "140882", "name": "河津市" }] },

  { "code": "1409", "name": "忻州市", "children": [
    { "code": "140902", "name": "忻府区" },
    { "code": "140921", "name": "定襄县" },
    { "code": "140922", "name": "五台县" },
    { "code": "140923", "name": "代县" },
    { "code": "140924", "name": "繁峙县" },
    { "code": "140925", "name": "宁武县" },
    { "code": "140926", "name": "静乐县" },
    { "code": "140927", "name": "神池县" },
    { "code": "140928", "name": "五寨县" },
    { "code": "140929", "name": "岢岚县" },
    { "code": "140930", "name": "河曲县" },
    { "code": "140931", "name": "保德县" },
    { "code": "140932", "name": "偏关县" },
    { "code": "140971", "name": "五台山风景名胜区" },
    { "code": "140981", "name": "原平市" }] },

  { "code": "1410", "name": "临汾市", "children": [
    { "code": "141002", "name": "尧都区" },
    { "code": "141021", "name": "曲沃县" },
    { "code": "141022", "name": "翼城县" },
    { "code": "141023", "name": "襄汾县" },
    { "code": "141024", "name": "洪洞县" },
    { "code": "141025", "name": "古县" },
    { "code": "141026", "name": "安泽县" },
    { "code": "141027", "name": "浮山县" },
    { "code": "141028", "name": "吉县" },
    { "code": "141029", "name": "乡宁县" },
    { "code": "141030", "name": "大宁县" },
    { "code": "141031", "name": "隰县" },
    { "code": "141032", "name": "永和县" },
    { "code": "141033", "name": "蒲县" },
    { "code": "141034", "name": "汾西县" },
    { "code": "141081", "name": "侯马市" },
    { "code": "141082", "name": "霍州市" }] },

  { "code": "1411", "name": "吕梁市", "children": [
    { "code": "141102", "name": "离石区" },
    { "code": "141121", "name": "文水县" },
    { "code": "141122", "name": "交城县" },
    { "code": "141123", "name": "兴县" },
    { "code": "141124", "name": "临县" },
    { "code": "141125", "name": "柳林县" },
    { "code": "141126", "name": "石楼县" },
    { "code": "141127", "name": "岚县" },
    { "code": "141128", "name": "方山县" },
    { "code": "141129", "name": "中阳县" },
    { "code": "141130", "name": "交口县" },
    { "code": "141181", "name": "孝义市" },
    { "code": "141182", "name": "汾阳市" }] }] },



{
  "code": "15", "name": "内蒙古自治区", "children": [
  { "code": "1501", "name": "呼和浩特市", "children": [
    { "code": "150102", "name": "新城区" },
    { "code": "150103", "name": "回民区" },
    { "code": "150104", "name": "玉泉区" },
    { "code": "150105", "name": "赛罕区" },
    { "code": "150121", "name": "土默特左旗" },
    { "code": "150122", "name": "托克托县" },
    { "code": "150123", "name": "和林格尔县" },
    { "code": "150124", "name": "清水河县" },
    { "code": "150125", "name": "武川县" },
    { "code": "150171", "name": "呼和浩特金海工业园区" },
    { "code": "150172", "name": "呼和浩特经济技术开发区" }] },

  { "code": "1502", "name": "包头市", "children": [
    { "code": "150202", "name": "东河区" },
    { "code": "150203", "name": "昆都仑区" },
    { "code": "150204", "name": "青山区" },
    { "code": "150205", "name": "石拐区" },
    { "code": "150206", "name": "白云鄂博矿区" },
    { "code": "150207", "name": "九原区" },
    { "code": "150221", "name": "土默特右旗" },
    { "code": "150222", "name": "固阳县" },
    { "code": "150223", "name": "达尔罕茂明安联合旗" },
    { "code": "150271", "name": "包头稀土高新技术产业开发区" }] },

  { "code": "1503", "name": "乌海市", "children": [
    { "code": "150302", "name": "海勃湾区" },
    { "code": "150303", "name": "海南区" },
    { "code": "150304", "name": "乌达区" }] },

  { "code": "1504", "name": "赤峰市", "children": [
    { "code": "150402", "name": "红山区" },
    { "code": "150403", "name": "元宝山区" },
    { "code": "150404", "name": "松山区" },
    { "code": "150421", "name": "阿鲁科尔沁旗" },
    { "code": "150422", "name": "巴林左旗" },
    { "code": "150423", "name": "巴林右旗" },
    { "code": "150424", "name": "林西县" },
    { "code": "150425", "name": "克什克腾旗" },
    { "code": "150426", "name": "翁牛特旗" },
    { "code": "150428", "name": "喀喇沁旗" },
    { "code": "150429", "name": "宁城县" },
    { "code": "150430", "name": "敖汉旗" }] },

  { "code": "1505", "name": "通辽市", "children": [
    { "code": "150502", "name": "科尔沁区" },
    { "code": "150521", "name": "科尔沁左翼中旗" },
    { "code": "150522", "name": "科尔沁左翼后旗" },
    { "code": "150523", "name": "开鲁县" },
    { "code": "150524", "name": "库伦旗" },
    { "code": "150525", "name": "奈曼旗" },
    { "code": "150526", "name": "扎鲁特旗" },
    { "code": "150571", "name": "通辽经济技术开发区" },
    { "code": "150581", "name": "霍林郭勒市" }] },

  { "code": "1506", "name": "鄂尔多斯市", "children": [
    { "code": "150602", "name": "东胜区" },
    { "code": "150603", "name": "康巴什区" },
    { "code": "150621", "name": "达拉特旗" },
    { "code": "150622", "name": "准格尔旗" },
    { "code": "150623", "name": "鄂托克前旗" },
    { "code": "150624", "name": "鄂托克旗" },
    { "code": "150625", "name": "杭锦旗" },
    { "code": "150626", "name": "乌审旗" },
    { "code": "150627", "name": "伊金霍洛旗" }] },

  { "code": "1507", "name": "呼伦贝尔市", "children": [
    { "code": "150702", "name": "海拉尔区" },
    { "code": "150703", "name": "扎赉诺尔区" },
    { "code": "150721", "name": "阿荣旗" },
    { "code": "150722", "name": "莫力达瓦达斡尔族自治旗" },
    { "code": "150723", "name": "鄂伦春自治旗" },
    { "code": "150724", "name": "鄂温克族自治旗" },
    { "code": "150725", "name": "陈巴尔虎旗" },
    { "code": "150726", "name": "新巴尔虎左旗" },
    { "code": "150727", "name": "新巴尔虎右旗" },
    { "code": "150781", "name": "满洲里市" },
    { "code": "150782", "name": "牙克石市" },
    { "code": "150783", "name": "扎兰屯市" },
    { "code": "150784", "name": "额尔古纳市" },
    { "code": "150785", "name": "根河市" }] },

  { "code": "1508", "name": "巴彦淖尔市", "children": [
    { "code": "150802", "name": "临河区" },
    { "code": "150821", "name": "五原县" },
    { "code": "150822", "name": "磴口县" },
    { "code": "150823", "name": "乌拉特前旗" },
    { "code": "150824", "name": "乌拉特中旗" },
    { "code": "150825", "name": "乌拉特后旗" },
    { "code": "150826", "name": "杭锦后旗" }] },

  { "code": "1509", "name": "乌兰察布市", "children": [
    { "code": "150902", "name": "集宁区" },
    { "code": "150921", "name": "卓资县" },
    { "code": "150922", "name": "化德县" },
    { "code": "150923", "name": "商都县" },
    { "code": "150924", "name": "兴和县" },
    { "code": "150925", "name": "凉城县" },
    { "code": "150926", "name": "察哈尔右翼前旗" },
    { "code": "150927", "name": "察哈尔右翼中旗" },
    { "code": "150928", "name": "察哈尔右翼后旗" },
    { "code": "150929", "name": "四子王旗" },
    { "code": "150981", "name": "丰镇市" }] },

  { "code": "1522", "name": "兴安盟", "children": [
    { "code": "152201", "name": "乌兰浩特市" },
    { "code": "152202", "name": "阿尔山市" },
    { "code": "152221", "name": "科尔沁右翼前旗" },
    { "code": "152222", "name": "科尔沁右翼中旗" },
    { "code": "152223", "name": "扎赉特旗" },
    { "code": "152224", "name": "突泉县" }] },

  { "code": "1525", "name": "锡林郭勒盟", "children": [
    { "code": "152501", "name": "二连浩特市" },
    { "code": "152502", "name": "锡林浩特市" },
    { "code": "152522", "name": "阿巴嘎旗" },
    { "code": "152523", "name": "苏尼特左旗" },
    { "code": "152524", "name": "苏尼特右旗" },
    { "code": "152525", "name": "东乌珠穆沁旗" },
    { "code": "152526", "name": "西乌珠穆沁旗" },
    { "code": "152527", "name": "太仆寺旗" },
    { "code": "152528", "name": "镶黄旗" },
    { "code": "152529", "name": "正镶白旗" },
    { "code": "152530", "name": "正蓝旗" },
    { "code": "152531", "name": "多伦县" },
    { "code": "152571", "name": "乌拉盖管委会" }] },

  { "code": "1529", "name": "阿拉善盟", "children": [
    { "code": "152921", "name": "阿拉善左旗" },
    { "code": "152922", "name": "阿拉善右旗" },
    { "code": "152923", "name": "额济纳旗" },
    { "code": "152971", "name": "内蒙古阿拉善经济开发区" }] }] },



{
  "code": "21", "name": "辽宁省", "children": [
  { "code": "2101", "name": "沈阳市", "children": [
    { "code": "210102", "name": "和平区" },
    { "code": "210103", "name": "沈河区" },
    { "code": "210104", "name": "大东区" },
    { "code": "210105", "name": "皇姑区" },
    { "code": "210106", "name": "铁西区" },
    { "code": "210111", "name": "苏家屯区" },
    { "code": "210112", "name": "浑南区" },
    { "code": "210113", "name": "沈北新区" },
    { "code": "210114", "name": "于洪区" },
    { "code": "210115", "name": "辽中区" },
    { "code": "210123", "name": "康平县" },
    { "code": "210124", "name": "法库县" },
    { "code": "210181", "name": "新民市" }] },

  { "code": "2102", "name": "大连市", "children": [
    { "code": "210202", "name": "中山区" },
    { "code": "210203", "name": "西岗区" },
    { "code": "210204", "name": "沙河口区" },
    { "code": "210211", "name": "甘井子区" },
    { "code": "210212", "name": "旅顺口区" },
    { "code": "210213", "name": "金州区" },
    { "code": "210214", "name": "普兰店区" },
    { "code": "210224", "name": "长海县" },
    { "code": "210281", "name": "瓦房店市" },
    { "code": "210283", "name": "庄河市" }] },

  { "code": "2103", "name": "鞍山市", "children": [
    { "code": "210302", "name": "铁东区" },
    { "code": "210303", "name": "铁西区" },
    { "code": "210304", "name": "立山区" },
    { "code": "210311", "name": "千山区" },
    { "code": "210321", "name": "台安县" },
    { "code": "210323", "name": "岫岩满族自治县" },
    { "code": "210381", "name": "海城市" }] },

  { "code": "2104", "name": "抚顺市", "children": [
    { "code": "210402", "name": "新抚区" },
    { "code": "210403", "name": "东洲区" },
    { "code": "210404", "name": "望花区" },
    { "code": "210411", "name": "顺城区" },
    { "code": "210421", "name": "抚顺县" },
    { "code": "210422", "name": "新宾满族自治县" },
    { "code": "210423", "name": "清原满族自治县" }] },

  { "code": "2105", "name": "本溪市", "children": [
    { "code": "210502", "name": "平山区" },
    { "code": "210503", "name": "溪湖区" },
    { "code": "210504", "name": "明山区" },
    { "code": "210505", "name": "南芬区" },
    { "code": "210521", "name": "本溪满族自治县" },
    { "code": "210522", "name": "桓仁满族自治县" }] },

  { "code": "2106", "name": "丹东市", "children": [
    { "code": "210602", "name": "元宝区" },
    { "code": "210603", "name": "振兴区" },
    { "code": "210604", "name": "振安区" },
    { "code": "210624", "name": "宽甸满族自治县" },
    { "code": "210681", "name": "东港市" },
    { "code": "210682", "name": "凤城市" }] },

  { "code": "2107", "name": "锦州市", "children": [
    { "code": "210702", "name": "古塔区" },
    { "code": "210703", "name": "凌河区" },
    { "code": "210711", "name": "太和区" },
    { "code": "210726", "name": "黑山县" },
    { "code": "210727", "name": "义县" },
    { "code": "210781", "name": "凌海市" },
    { "code": "210782", "name": "北镇市" }] },

  { "code": "2108", "name": "营口市", "children": [
    { "code": "210802", "name": "站前区" },
    { "code": "210803", "name": "西市区" },
    { "code": "210804", "name": "鲅鱼圈区" },
    { "code": "210811", "name": "老边区" },
    { "code": "210881", "name": "盖州市" },
    { "code": "210882", "name": "大石桥市" }] },

  { "code": "2109", "name": "阜新市", "children": [
    { "code": "210902", "name": "海州区" },
    { "code": "210903", "name": "新邱区" },
    { "code": "210904", "name": "太平区" },
    { "code": "210905", "name": "清河门区" },
    { "code": "210911", "name": "细河区" },
    { "code": "210921", "name": "阜新蒙古族自治县" },
    { "code": "210922", "name": "彰武县" }] },

  { "code": "2110", "name": "辽阳市", "children": [
    { "code": "211002", "name": "白塔区" },
    { "code": "211003", "name": "文圣区" },
    { "code": "211004", "name": "宏伟区" },
    { "code": "211005", "name": "弓长岭区" },
    { "code": "211011", "name": "太子河区" },
    { "code": "211021", "name": "辽阳县" },
    { "code": "211081", "name": "灯塔市" }] },

  { "code": "2111", "name": "盘锦市", "children": [
    { "code": "211102", "name": "双台子区" },
    { "code": "211103", "name": "兴隆台区" },
    { "code": "211104", "name": "大洼区" },
    { "code": "211122", "name": "盘山县" }] },

  { "code": "2112", "name": "铁岭市", "children": [
    { "code": "211202", "name": "银州区" },
    { "code": "211204", "name": "清河区" },
    { "code": "211221", "name": "铁岭县" },
    { "code": "211223", "name": "西丰县" },
    { "code": "211224", "name": "昌图县" },
    { "code": "211281", "name": "调兵山市" },
    { "code": "211282", "name": "开原市" }] },

  { "code": "2113", "name": "朝阳市", "children": [
    { "code": "211302", "name": "双塔区" },
    { "code": "211303", "name": "龙城区" },
    { "code": "211321", "name": "朝阳县" },
    { "code": "211322", "name": "建平县" },
    { "code": "211324", "name": "喀喇沁左翼蒙古族自治县" },
    { "code": "211381", "name": "北票市" },
    { "code": "211382", "name": "凌源市" }] },

  { "code": "2114", "name": "葫芦岛市", "children": [
    { "code": "211402", "name": "连山区" },
    { "code": "211403", "name": "龙港区" },
    { "code": "211404", "name": "南票区" },
    { "code": "211421", "name": "绥中县" },
    { "code": "211422", "name": "建昌县" },
    { "code": "211481", "name": "兴城市" }] }] },



{
  "code": "22", "name": "吉林省", "children": [
  { "code": "2201", "name": "长春市", "children": [
    { "code": "220102", "name": "南关区" },
    { "code": "220103", "name": "宽城区" },
    { "code": "220104", "name": "朝阳区" },
    { "code": "220105", "name": "二道区" },
    { "code": "220106", "name": "绿园区" },
    { "code": "220112", "name": "双阳区" },
    { "code": "220113", "name": "九台区" },
    { "code": "220122", "name": "农安县" },
    { "code": "220171", "name": "长春经济技术开发区" },
    { "code": "220172", "name": "长春净月高新技术产业开发区" },
    { "code": "220173", "name": "长春高新技术产业开发区" },
    { "code": "220174", "name": "长春汽车经济技术开发区" },
    { "code": "220182", "name": "榆树市" },
    { "code": "220183", "name": "德惠市" }] },

  { "code": "2202", "name": "吉林市", "children": [
    { "code": "220202", "name": "昌邑区" },
    { "code": "220203", "name": "龙潭区" },
    { "code": "220204", "name": "船营区" },
    { "code": "220211", "name": "丰满区" },
    { "code": "220221", "name": "永吉县" },
    { "code": "220271", "name": "吉林经济开发区" },
    { "code": "220272", "name": "吉林高新技术产业开发区" },
    { "code": "220273", "name": "吉林中国新加坡食品区" },
    { "code": "220281", "name": "蛟河市" },
    { "code": "220282", "name": "桦甸市" },
    { "code": "220283", "name": "舒兰市" },
    { "code": "220284", "name": "磐石市" }] },

  { "code": "2203", "name": "四平市", "children": [
    { "code": "220302", "name": "铁西区" },
    { "code": "220303", "name": "铁东区" },
    { "code": "220322", "name": "梨树县" },
    { "code": "220323", "name": "伊通满族自治县" },
    { "code": "220381", "name": "公主岭市" },
    { "code": "220382", "name": "双辽市" }] },

  { "code": "2204", "name": "辽源市", "children": [
    { "code": "220402", "name": "龙山区" },
    { "code": "220403", "name": "西安区" },
    { "code": "220421", "name": "东丰县" },
    { "code": "220422", "name": "东辽县" }] },

  { "code": "2205", "name": "通化市", "children": [
    { "code": "220502", "name": "东昌区" },
    { "code": "220503", "name": "二道江区" },
    { "code": "220521", "name": "通化县" },
    { "code": "220523", "name": "辉南县" },
    { "code": "220524", "name": "柳河县" },
    { "code": "220581", "name": "梅河口市" },
    { "code": "220582", "name": "集安市" }] },

  { "code": "2206", "name": "白山市", "children": [
    { "code": "220602", "name": "浑江区" },
    { "code": "220605", "name": "江源区" },
    { "code": "220621", "name": "抚松县" },
    { "code": "220622", "name": "靖宇县" },
    { "code": "220623", "name": "长白朝鲜族自治县" },
    { "code": "220681", "name": "临江市" }] },

  { "code": "2207", "name": "松原市", "children": [
    { "code": "220702", "name": "宁江区" },
    { "code": "220721", "name": "前郭尔罗斯蒙古族自治县" },
    { "code": "220722", "name": "长岭县" },
    { "code": "220723", "name": "乾安县" },
    { "code": "220771", "name": "吉林松原经济开发区" },
    { "code": "220781", "name": "扶余市" }] },

  { "code": "2208", "name": "白城市", "children": [
    { "code": "220802", "name": "洮北区" },
    { "code": "220821", "name": "镇赉县" },
    { "code": "220822", "name": "通榆县" },
    { "code": "220871", "name": "吉林白城经济开发区" },
    { "code": "220881", "name": "洮南市" },
    { "code": "220882", "name": "大安市" }] },

  { "code": "2224", "name": "延边朝鲜族自治州", "children": [
    { "code": "222401", "name": "延吉市" },
    { "code": "222402", "name": "图们市" },
    { "code": "222403", "name": "敦化市" },
    { "code": "222404", "name": "珲春市" },
    { "code": "222405", "name": "龙井市" },
    { "code": "222406", "name": "和龙市" },
    { "code": "222424", "name": "汪清县" },
    { "code": "222426", "name": "安图县" }] }] },



{
  "code": "23", "name": "黑龙江省", "children": [
  { "code": "2301", "name": "哈尔滨市", "children": [
    { "code": "230102", "name": "道里区" },
    { "code": "230103", "name": "南岗区" },
    { "code": "230104", "name": "道外区" },
    { "code": "230108", "name": "平房区" },
    { "code": "230109", "name": "松北区" },
    { "code": "230110", "name": "香坊区" },
    { "code": "230111", "name": "呼兰区" },
    { "code": "230112", "name": "阿城区" },
    { "code": "230113", "name": "双城区" },
    { "code": "230123", "name": "依兰县" },
    { "code": "230124", "name": "方正县" },
    { "code": "230125", "name": "宾县" },
    { "code": "230126", "name": "巴彦县" },
    { "code": "230127", "name": "木兰县" },
    { "code": "230128", "name": "通河县" },
    { "code": "230129", "name": "延寿县" },
    { "code": "230183", "name": "尚志市" },
    { "code": "230184", "name": "五常市" }] },

  { "code": "2302", "name": "齐齐哈尔市", "children": [
    { "code": "230202", "name": "龙沙区" },
    { "code": "230203", "name": "建华区" },
    { "code": "230204", "name": "铁锋区" },
    { "code": "230205", "name": "昂昂溪区" },
    { "code": "230206", "name": "富拉尔基区" },
    { "code": "230207", "name": "碾子山区" },
    { "code": "230208", "name": "梅里斯达斡尔族区" },
    { "code": "230221", "name": "龙江县" },
    { "code": "230223", "name": "依安县" },
    { "code": "230224", "name": "泰来县" },
    { "code": "230225", "name": "甘南县" },
    { "code": "230227", "name": "富裕县" },
    { "code": "230229", "name": "克山县" },
    { "code": "230230", "name": "克东县" },
    { "code": "230231", "name": "拜泉县" },
    { "code": "230281", "name": "讷河市" }] },

  { "code": "2303", "name": "鸡西市", "children": [
    { "code": "230302", "name": "鸡冠区" },
    { "code": "230303", "name": "恒山区" },
    { "code": "230304", "name": "滴道区" },
    { "code": "230305", "name": "梨树区" },
    { "code": "230306", "name": "城子河区" },
    { "code": "230307", "name": "麻山区" },
    { "code": "230321", "name": "鸡东县" },
    { "code": "230381", "name": "虎林市" },
    { "code": "230382", "name": "密山市" }] },

  { "code": "2304", "name": "鹤岗市", "children": [
    { "code": "230402", "name": "向阳区" },
    { "code": "230403", "name": "工农区" },
    { "code": "230404", "name": "南山区" },
    { "code": "230405", "name": "兴安区" },
    { "code": "230406", "name": "东山区" },
    { "code": "230407", "name": "兴山区" },
    { "code": "230421", "name": "萝北县" },
    { "code": "230422", "name": "绥滨县" }] },

  { "code": "2305", "name": "双鸭山市", "children": [
    { "code": "230502", "name": "尖山区" },
    { "code": "230503", "name": "岭东区" },
    { "code": "230505", "name": "四方台区" },
    { "code": "230506", "name": "宝山区" },
    { "code": "230521", "name": "集贤县" },
    { "code": "230522", "name": "友谊县" },
    { "code": "230523", "name": "宝清县" },
    { "code": "230524", "name": "饶河县" }] },

  { "code": "2306", "name": "大庆市", "children": [
    { "code": "230602", "name": "萨尔图区" },
    { "code": "230603", "name": "龙凤区" },
    { "code": "230604", "name": "让胡路区" },
    { "code": "230605", "name": "红岗区" },
    { "code": "230606", "name": "大同区" },
    { "code": "230621", "name": "肇州县" },
    { "code": "230622", "name": "肇源县" },
    { "code": "230623", "name": "林甸县" },
    { "code": "230624", "name": "杜尔伯特蒙古族自治县" },
    { "code": "230671", "name": "大庆高新技术产业开发区" }] },

  { "code": "2307", "name": "伊春市", "children": [
    { "code": "230717", "name": "伊美区" },
    { "code": "230718", "name": "乌翠区" },
    { "code": "230719", "name": "友好区" },
    { "code": "230722", "name": "嘉荫县" },
    { "code": "230723", "name": "汤旺县" },
    { "code": "230724", "name": "丰林县" },
    { "code": "230725", "name": "大箐山县" },
    { "code": "230726", "name": "南岔县" },
    { "code": "230751", "name": "金林区" },
    { "code": "230781", "name": "铁力市" }] },

  { "code": "2308", "name": "佳木斯市", "children": [
    { "code": "230803", "name": "向阳区" },
    { "code": "230804", "name": "前进区" },
    { "code": "230805", "name": "东风区" },
    { "code": "230811", "name": "郊区" },
    { "code": "230822", "name": "桦南县" },
    { "code": "230826", "name": "桦川县" },
    { "code": "230828", "name": "汤原县" },
    { "code": "230881", "name": "同江市" },
    { "code": "230882", "name": "富锦市" },
    { "code": "230883", "name": "抚远市" }] },

  { "code": "2309", "name": "七台河市", "children": [
    { "code": "230902", "name": "新兴区" },
    { "code": "230903", "name": "桃山区" },
    { "code": "230904", "name": "茄子河区" },
    { "code": "230921", "name": "勃利县" }] },

  { "code": "2310", "name": "牡丹江市", "children": [
    { "code": "231002", "name": "东安区" },
    { "code": "231003", "name": "阳明区" },
    { "code": "231004", "name": "爱民区" },
    { "code": "231005", "name": "西安区" },
    { "code": "231025", "name": "林口县" },
    { "code": "231071", "name": "牡丹江经济技术开发区" },
    { "code": "231081", "name": "绥芬河市" },
    { "code": "231083", "name": "海林市" },
    { "code": "231084", "name": "宁安市" },
    { "code": "231085", "name": "穆棱市" },
    { "code": "231086", "name": "东宁市" }] },

  { "code": "2311", "name": "黑河市", "children": [
    { "code": "231102", "name": "爱辉区" },
    { "code": "231123", "name": "逊克县" },
    { "code": "231124", "name": "孙吴县" },
    { "code": "231181", "name": "北安市" },
    { "code": "231182", "name": "五大连池市" },
    { "code": "231183", "name": "嫩江市" }] },

  { "code": "2312", "name": "绥化市", "children": [
    { "code": "231202", "name": "北林区" },
    { "code": "231221", "name": "望奎县" },
    { "code": "231222", "name": "兰西县" },
    { "code": "231223", "name": "青冈县" },
    { "code": "231224", "name": "庆安县" },
    { "code": "231225", "name": "明水县" },
    { "code": "231226", "name": "绥棱县" },
    { "code": "231281", "name": "安达市" },
    { "code": "231282", "name": "肇东市" },
    { "code": "231283", "name": "海伦市" }] },

  { "code": "2327", "name": "大兴安岭地区", "children": [
    { "code": "232701", "name": "漠河市" },
    { "code": "232721", "name": "呼玛县" },
    { "code": "232722", "name": "塔河县" },
    { "code": "232761", "name": "加格达奇区" },
    { "code": "232762", "name": "松岭区" },
    { "code": "232763", "name": "新林区" },
    { "code": "232764", "name": "呼中区" }] }] },



{
  "code": "31", "name": "上海市", "children": [
  { "code": "3101", "name": "市辖区", "children": [
    { "code": "310101", "name": "黄浦区" },
    { "code": "310104", "name": "徐汇区" },
    { "code": "310105", "name": "长宁区" },
    { "code": "310106", "name": "静安区" },
    { "code": "310107", "name": "普陀区" },
    { "code": "310109", "name": "虹口区" },
    { "code": "310110", "name": "杨浦区" },
    { "code": "310112", "name": "闵行区" },
    { "code": "310113", "name": "宝山区" },
    { "code": "310114", "name": "嘉定区" },
    { "code": "310115", "name": "浦东新区" },
    { "code": "310116", "name": "金山区" },
    { "code": "310117", "name": "松江区" },
    { "code": "310118", "name": "青浦区" },
    { "code": "310120", "name": "奉贤区" },
    { "code": "310151", "name": "崇明区" }] }] },



{
  "code": "32", "name": "江苏省", "children": [
  { "code": "3201", "name": "南京市", "children": [
    { "code": "320102", "name": "玄武区" },
    { "code": "320104", "name": "秦淮区" },
    { "code": "320105", "name": "建邺区" },
    { "code": "320106", "name": "鼓楼区" },
    { "code": "320111", "name": "浦口区" },
    { "code": "320113", "name": "栖霞区" },
    { "code": "320114", "name": "雨花台区" },
    { "code": "320115", "name": "江宁区" },
    { "code": "320116", "name": "六合区" },
    { "code": "320117", "name": "溧水区" },
    { "code": "320118", "name": "高淳区" }] },

  { "code": "3202", "name": "无锡市", "children": [
    { "code": "320205", "name": "锡山区" },
    { "code": "320206", "name": "惠山区" },
    { "code": "320211", "name": "滨湖区" },
    { "code": "320213", "name": "梁溪区" },
    { "code": "320214", "name": "新吴区" },
    { "code": "320281", "name": "江阴市" },
    { "code": "320282", "name": "宜兴市" }] },

  { "code": "3203", "name": "徐州市", "children": [
    { "code": "320302", "name": "鼓楼区" },
    { "code": "320303", "name": "云龙区" },
    { "code": "320305", "name": "贾汪区" },
    { "code": "320311", "name": "泉山区" },
    { "code": "320312", "name": "铜山区" },
    { "code": "320321", "name": "丰县" },
    { "code": "320322", "name": "沛县" },
    { "code": "320324", "name": "睢宁县" },
    { "code": "320371", "name": "徐州经济技术开发区" },
    { "code": "320381", "name": "新沂市" },
    { "code": "320382", "name": "邳州市" }] },

  { "code": "3204", "name": "常州市", "children": [
    { "code": "320402", "name": "天宁区" },
    { "code": "320404", "name": "钟楼区" },
    { "code": "320411", "name": "新北区" },
    { "code": "320412", "name": "武进区" },
    { "code": "320413", "name": "金坛区" },
    { "code": "320481", "name": "溧阳市" }] },

  { "code": "3205", "name": "苏州市", "children": [
    { "code": "320505", "name": "虎丘区" },
    { "code": "320506", "name": "吴中区" },
    { "code": "320507", "name": "相城区" },
    { "code": "320508", "name": "姑苏区" },
    { "code": "320509", "name": "吴江区" },
    { "code": "320571", "name": "苏州工业园区" },
    { "code": "320581", "name": "常熟市" },
    { "code": "320582", "name": "张家港市" },
    { "code": "320583", "name": "昆山市" },
    { "code": "320585", "name": "太仓市" }] },

  { "code": "3206", "name": "南通市", "children": [
    { "code": "320602", "name": "崇川区" },
    { "code": "320611", "name": "港闸区" },
    { "code": "320612", "name": "通州区" },
    { "code": "320623", "name": "如东县" },
    { "code": "320671", "name": "南通经济技术开发区" },
    { "code": "320681", "name": "启东市" },
    { "code": "320682", "name": "如皋市" },
    { "code": "320684", "name": "海门市" },
    { "code": "320685", "name": "海安市" }] },

  { "code": "3207", "name": "连云港市", "children": [
    { "code": "320703", "name": "连云区" },
    { "code": "320706", "name": "海州区" },
    { "code": "320707", "name": "赣榆区" },
    { "code": "320722", "name": "东海县" },
    { "code": "320723", "name": "灌云县" },
    { "code": "320724", "name": "灌南县" },
    { "code": "320771", "name": "连云港经济技术开发区" },
    { "code": "320772", "name": "连云港高新技术产业开发区" }] },

  { "code": "3208", "name": "淮安市", "children": [
    { "code": "320803", "name": "淮安区" },
    { "code": "320804", "name": "淮阴区" },
    { "code": "320812", "name": "清江浦区" },
    { "code": "320813", "name": "洪泽区" },
    { "code": "320826", "name": "涟水县" },
    { "code": "320830", "name": "盱眙县" },
    { "code": "320831", "name": "金湖县" },
    { "code": "320871", "name": "淮安经济技术开发区" }] },

  { "code": "3209", "name": "盐城市", "children": [
    { "code": "320902", "name": "亭湖区" },
    { "code": "320903", "name": "盐都区" },
    { "code": "320904", "name": "大丰区" },
    { "code": "320921", "name": "响水县" },
    { "code": "320922", "name": "滨海县" },
    { "code": "320923", "name": "阜宁县" },
    { "code": "320924", "name": "射阳县" },
    { "code": "320925", "name": "建湖县" },
    { "code": "320971", "name": "盐城经济技术开发区" },
    { "code": "320981", "name": "东台市" }] },

  { "code": "3210", "name": "扬州市", "children": [
    { "code": "321002", "name": "广陵区" },
    { "code": "321003", "name": "邗江区" },
    { "code": "321012", "name": "江都区" },
    { "code": "321023", "name": "宝应县" },
    { "code": "321071", "name": "扬州经济技术开发区" },
    { "code": "321081", "name": "仪征市" },
    { "code": "321084", "name": "高邮市" }] },

  { "code": "3211", "name": "镇江市", "children": [
    { "code": "321102", "name": "京口区" },
    { "code": "321111", "name": "润州区" },
    { "code": "321112", "name": "丹徒区" },
    { "code": "321171", "name": "镇江新区" },
    { "code": "321181", "name": "丹阳市" },
    { "code": "321182", "name": "扬中市" },
    { "code": "321183", "name": "句容市" }] },

  { "code": "3212", "name": "泰州市", "children": [
    { "code": "321202", "name": "海陵区" },
    { "code": "321203", "name": "高港区" },
    { "code": "321204", "name": "姜堰区" },
    { "code": "321271", "name": "泰州医药高新技术产业开发区" },
    { "code": "321281", "name": "兴化市" },
    { "code": "321282", "name": "靖江市" },
    { "code": "321283", "name": "泰兴市" }] },

  { "code": "3213", "name": "宿迁市", "children": [
    { "code": "321302", "name": "宿城区" },
    { "code": "321311", "name": "宿豫区" },
    { "code": "321322", "name": "沭阳县" },
    { "code": "321323", "name": "泗阳县" },
    { "code": "321324", "name": "泗洪县" },
    { "code": "321371", "name": "宿迁经济技术开发区" }] }] },



{
  "code": "33", "name": "浙江省", "children": [
  { "code": "3301", "name": "杭州市", "children": [
    { "code": "330102", "name": "上城区" },
    { "code": "330103", "name": "下城区" },
    { "code": "330104", "name": "江干区" },
    { "code": "330105", "name": "拱墅区" },
    { "code": "330106", "name": "西湖区" },
    { "code": "330108", "name": "滨江区" },
    { "code": "330109", "name": "萧山区" },
    { "code": "330110", "name": "余杭区" },
    { "code": "330111", "name": "富阳区" },
    { "code": "330112", "name": "临安区" },
    { "code": "330122", "name": "桐庐县" },
    { "code": "330127", "name": "淳安县" },
    { "code": "330182", "name": "建德市" }] },

  { "code": "3302", "name": "宁波市", "children": [
    { "code": "330203", "name": "海曙区" },
    { "code": "330205", "name": "江北区" },
    { "code": "330206", "name": "北仑区" },
    { "code": "330211", "name": "镇海区" },
    { "code": "330212", "name": "鄞州区" },
    { "code": "330213", "name": "奉化区" },
    { "code": "330225", "name": "象山县" },
    { "code": "330226", "name": "宁海县" },
    { "code": "330281", "name": "余姚市" },
    { "code": "330282", "name": "慈溪市" }] },

  { "code": "3303", "name": "温州市", "children": [
    { "code": "330302", "name": "鹿城区" },
    { "code": "330303", "name": "龙湾区" },
    { "code": "330304", "name": "瓯海区" },
    { "code": "330305", "name": "洞头区" },
    { "code": "330324", "name": "永嘉县" },
    { "code": "330326", "name": "平阳县" },
    { "code": "330327", "name": "苍南县" },
    { "code": "330328", "name": "文成县" },
    { "code": "330329", "name": "泰顺县" },
    { "code": "330371", "name": "温州经济技术开发区" },
    { "code": "330381", "name": "瑞安市" },
    { "code": "330382", "name": "乐清市" },
    { "code": "330383", "name": "龙港市" }] },

  { "code": "3304", "name": "嘉兴市", "children": [
    { "code": "330402", "name": "南湖区" },
    { "code": "330411", "name": "秀洲区" },
    { "code": "330421", "name": "嘉善县" },
    { "code": "330424", "name": "海盐县" },
    { "code": "330481", "name": "海宁市" },
    { "code": "330482", "name": "平湖市" },
    { "code": "330483", "name": "桐乡市" }] },

  { "code": "3305", "name": "湖州市", "children": [
    { "code": "330502", "name": "吴兴区" },
    { "code": "330503", "name": "南浔区" },
    { "code": "330521", "name": "德清县" },
    { "code": "330522", "name": "长兴县" },
    { "code": "330523", "name": "安吉县" }] },

  { "code": "3306", "name": "绍兴市", "children": [
    { "code": "330602", "name": "越城区" },
    { "code": "330603", "name": "柯桥区" },
    { "code": "330604", "name": "上虞区" },
    { "code": "330624", "name": "新昌县" },
    { "code": "330681", "name": "诸暨市" },
    { "code": "330683", "name": "嵊州市" }] },

  { "code": "3307", "name": "金华市", "children": [
    { "code": "330702", "name": "婺城区" },
    { "code": "330703", "name": "金东区" },
    { "code": "330723", "name": "武义县" },
    { "code": "330726", "name": "浦江县" },
    { "code": "330727", "name": "磐安县" },
    { "code": "330781", "name": "兰溪市" },
    { "code": "330782", "name": "义乌市" },
    { "code": "330783", "name": "东阳市" },
    { "code": "330784", "name": "永康市" }] },

  { "code": "3308", "name": "衢州市", "children": [
    { "code": "330802", "name": "柯城区" },
    { "code": "330803", "name": "衢江区" },
    { "code": "330822", "name": "常山县" },
    { "code": "330824", "name": "开化县" },
    { "code": "330825", "name": "龙游县" },
    { "code": "330881", "name": "江山市" }] },

  { "code": "3309", "name": "舟山市", "children": [
    { "code": "330902", "name": "定海区" },
    { "code": "330903", "name": "普陀区" },
    { "code": "330921", "name": "岱山县" },
    { "code": "330922", "name": "嵊泗县" }] },

  { "code": "3310", "name": "台州市", "children": [
    { "code": "331002", "name": "椒江区" },
    { "code": "331003", "name": "黄岩区" },
    { "code": "331004", "name": "路桥区" },
    { "code": "331022", "name": "三门县" },
    { "code": "331023", "name": "天台县" },
    { "code": "331024", "name": "仙居县" },
    { "code": "331081", "name": "温岭市" },
    { "code": "331082", "name": "临海市" },
    { "code": "331083", "name": "玉环市" }] },

  { "code": "3311", "name": "丽水市", "children": [
    { "code": "331102", "name": "莲都区" },
    { "code": "331121", "name": "青田县" },
    { "code": "331122", "name": "缙云县" },
    { "code": "331123", "name": "遂昌县" },
    { "code": "331124", "name": "松阳县" },
    { "code": "331125", "name": "云和县" },
    { "code": "331126", "name": "庆元县" },
    { "code": "331127", "name": "景宁畲族自治县" },
    { "code": "331181", "name": "龙泉市" }] }] },



{
  "code": "34", "name": "安徽省", "children": [
  { "code": "3401", "name": "合肥市", "children": [
    { "code": "340102", "name": "瑶海区" },
    { "code": "340103", "name": "庐阳区" },
    { "code": "340104", "name": "蜀山区" },
    { "code": "340111", "name": "包河区" },
    { "code": "340121", "name": "长丰县" },
    { "code": "340122", "name": "肥东县" },
    { "code": "340123", "name": "肥西县" },
    { "code": "340124", "name": "庐江县" },
    { "code": "340171", "name": "合肥高新技术产业开发区" },
    { "code": "340172", "name": "合肥经济技术开发区" },
    { "code": "340173", "name": "合肥新站高新技术产业开发区" },
    { "code": "340181", "name": "巢湖市" }] },

  { "code": "3402", "name": "芜湖市", "children": [
    { "code": "340202", "name": "镜湖区" },
    { "code": "340203", "name": "弋江区" },
    { "code": "340207", "name": "鸠江区" },
    { "code": "340208", "name": "三山区" },
    { "code": "340221", "name": "芜湖县" },
    { "code": "340222", "name": "繁昌县" },
    { "code": "340223", "name": "南陵县" },
    { "code": "340225", "name": "无为县" },
    { "code": "340271", "name": "芜湖经济技术开发区" },
    { "code": "340272", "name": "安徽芜湖长江大桥经济开发区" }] },

  { "code": "3403", "name": "蚌埠市", "children": [
    { "code": "340302", "name": "龙子湖区" },
    { "code": "340303", "name": "蚌山区" },
    { "code": "340304", "name": "禹会区" },
    { "code": "340311", "name": "淮上区" },
    { "code": "340321", "name": "怀远县" },
    { "code": "340322", "name": "五河县" },
    { "code": "340323", "name": "固镇县" },
    { "code": "340371", "name": "蚌埠市高新技术开发区" },
    { "code": "340372", "name": "蚌埠市经济开发区" }] },

  { "code": "3404", "name": "淮南市", "children": [
    { "code": "340402", "name": "大通区" },
    { "code": "340403", "name": "田家庵区" },
    { "code": "340404", "name": "谢家集区" },
    { "code": "340405", "name": "八公山区" },
    { "code": "340406", "name": "潘集区" },
    { "code": "340421", "name": "凤台县" },
    { "code": "340422", "name": "寿县" }] },

  { "code": "3405", "name": "马鞍山市", "children": [
    { "code": "340503", "name": "花山区" },
    { "code": "340504", "name": "雨山区" },
    { "code": "340506", "name": "博望区" },
    { "code": "340521", "name": "当涂县" },
    { "code": "340522", "name": "含山县" },
    { "code": "340523", "name": "和县" }] },

  { "code": "3406", "name": "淮北市", "children": [
    { "code": "340602", "name": "杜集区" },
    { "code": "340603", "name": "相山区" },
    { "code": "340604", "name": "烈山区" },
    { "code": "340621", "name": "濉溪县" }] },

  { "code": "3407", "name": "铜陵市", "children": [
    { "code": "340705", "name": "铜官区" },
    { "code": "340706", "name": "义安区" },
    { "code": "340711", "name": "郊区" },
    { "code": "340722", "name": "枞阳县" }] },

  { "code": "3408", "name": "安庆市", "children": [
    { "code": "340802", "name": "迎江区" },
    { "code": "340803", "name": "大观区" },
    { "code": "340811", "name": "宜秀区" },
    { "code": "340822", "name": "怀宁县" },
    { "code": "340825", "name": "太湖县" },
    { "code": "340826", "name": "宿松县" },
    { "code": "340827", "name": "望江县" },
    { "code": "340828", "name": "岳西县" },
    { "code": "340871", "name": "安徽安庆经济开发区" },
    { "code": "340881", "name": "桐城市" },
    { "code": "340882", "name": "潜山市" }] },

  { "code": "3410", "name": "黄山市", "children": [
    { "code": "341002", "name": "屯溪区" },
    { "code": "341003", "name": "黄山区" },
    { "code": "341004", "name": "徽州区" },
    { "code": "341021", "name": "歙县" },
    { "code": "341022", "name": "休宁县" },
    { "code": "341023", "name": "黟县" },
    { "code": "341024", "name": "祁门县" }] },

  { "code": "3411", "name": "滁州市", "children": [
    { "code": "341102", "name": "琅琊区" },
    { "code": "341103", "name": "南谯区" },
    { "code": "341122", "name": "来安县" },
    { "code": "341124", "name": "全椒县" },
    { "code": "341125", "name": "定远县" },
    { "code": "341126", "name": "凤阳县" },
    { "code": "341171", "name": "苏滁现代产业园" },
    { "code": "341172", "name": "滁州经济技术开发区" },
    { "code": "341181", "name": "天长市" },
    { "code": "341182", "name": "明光市" }] },

  { "code": "3412", "name": "阜阳市", "children": [
    { "code": "341202", "name": "颍州区" },
    { "code": "341203", "name": "颍东区" },
    { "code": "341204", "name": "颍泉区" },
    { "code": "341221", "name": "临泉县" },
    { "code": "341222", "name": "太和县" },
    { "code": "341225", "name": "阜南县" },
    { "code": "341226", "name": "颍上县" },
    { "code": "341271", "name": "阜阳合肥现代产业园区" },
    { "code": "341272", "name": "阜阳经济技术开发区" },
    { "code": "341282", "name": "界首市" }] },

  { "code": "3413", "name": "宿州市", "children": [
    { "code": "341302", "name": "埇桥区" },
    { "code": "341321", "name": "砀山县" },
    { "code": "341322", "name": "萧县" },
    { "code": "341323", "name": "灵璧县" },
    { "code": "341324", "name": "泗县" },
    { "code": "341371", "name": "宿州马鞍山现代产业园区" },
    { "code": "341372", "name": "宿州经济技术开发区" }] },

  { "code": "3415", "name": "六安市", "children": [
    { "code": "341502", "name": "金安区" },
    { "code": "341503", "name": "裕安区" },
    { "code": "341504", "name": "叶集区" },
    { "code": "341522", "name": "霍邱县" },
    { "code": "341523", "name": "舒城县" },
    { "code": "341524", "name": "金寨县" },
    { "code": "341525", "name": "霍山县" }] },

  { "code": "3416", "name": "亳州市", "children": [
    { "code": "341602", "name": "谯城区" },
    { "code": "341621", "name": "涡阳县" },
    { "code": "341622", "name": "蒙城县" },
    { "code": "341623", "name": "利辛县" }] },

  { "code": "3417", "name": "池州市", "children": [
    { "code": "341702", "name": "贵池区" },
    { "code": "341721", "name": "东至县" },
    { "code": "341722", "name": "石台县" },
    { "code": "341723", "name": "青阳县" }] },

  { "code": "3418", "name": "宣城市", "children": [
    { "code": "341802", "name": "宣州区" },
    { "code": "341821", "name": "郎溪县" },
    { "code": "341823", "name": "泾县" },
    { "code": "341824", "name": "绩溪县" },
    { "code": "341825", "name": "旌德县" },
    { "code": "341871", "name": "宣城市经济开发区" },
    { "code": "341881", "name": "宁国市" },
    { "code": "341882", "name": "广德市" }] }] },



{
  "code": "35", "name": "福建省", "children": [
  { "code": "3501", "name": "福州市", "children": [
    { "code": "350102", "name": "鼓楼区" },
    { "code": "350103", "name": "台江区" },
    { "code": "350104", "name": "仓山区" },
    { "code": "350105", "name": "马尾区" },
    { "code": "350111", "name": "晋安区" },
    { "code": "350112", "name": "长乐区" },
    { "code": "350121", "name": "闽侯县" },
    { "code": "350122", "name": "连江县" },
    { "code": "350123", "name": "罗源县" },
    { "code": "350124", "name": "闽清县" },
    { "code": "350125", "name": "永泰县" },
    { "code": "350128", "name": "平潭县" },
    { "code": "350181", "name": "福清市" }] },

  { "code": "3502", "name": "厦门市", "children": [
    { "code": "350203", "name": "思明区" },
    { "code": "350205", "name": "海沧区" },
    { "code": "350206", "name": "湖里区" },
    { "code": "350211", "name": "集美区" },
    { "code": "350212", "name": "同安区" },
    { "code": "350213", "name": "翔安区" }] },

  { "code": "3503", "name": "莆田市", "children": [
    { "code": "350302", "name": "城厢区" },
    { "code": "350303", "name": "涵江区" },
    { "code": "350304", "name": "荔城区" },
    { "code": "350305", "name": "秀屿区" },
    { "code": "350322", "name": "仙游县" }] },

  { "code": "3504", "name": "三明市", "children": [
    { "code": "350402", "name": "梅列区" },
    { "code": "350403", "name": "三元区" },
    { "code": "350421", "name": "明溪县" },
    { "code": "350423", "name": "清流县" },
    { "code": "350424", "name": "宁化县" },
    { "code": "350425", "name": "大田县" },
    { "code": "350426", "name": "尤溪县" },
    { "code": "350427", "name": "沙县" },
    { "code": "350428", "name": "将乐县" },
    { "code": "350429", "name": "泰宁县" },
    { "code": "350430", "name": "建宁县" },
    { "code": "350481", "name": "永安市" }] },

  { "code": "3505", "name": "泉州市", "children": [
    { "code": "350502", "name": "鲤城区" },
    { "code": "350503", "name": "丰泽区" },
    { "code": "350504", "name": "洛江区" },
    { "code": "350505", "name": "泉港区" },
    { "code": "350521", "name": "惠安县" },
    { "code": "350524", "name": "安溪县" },
    { "code": "350525", "name": "永春县" },
    { "code": "350526", "name": "德化县" },
    { "code": "350527", "name": "金门县" },
    { "code": "350581", "name": "石狮市" },
    { "code": "350582", "name": "晋江市" },
    { "code": "350583", "name": "南安市" }] },

  { "code": "3506", "name": "漳州市", "children": [
    { "code": "350602", "name": "芗城区" },
    { "code": "350603", "name": "龙文区" },
    { "code": "350622", "name": "云霄县" },
    { "code": "350623", "name": "漳浦县" },
    { "code": "350624", "name": "诏安县" },
    { "code": "350625", "name": "长泰县" },
    { "code": "350626", "name": "东山县" },
    { "code": "350627", "name": "南靖县" },
    { "code": "350628", "name": "平和县" },
    { "code": "350629", "name": "华安县" },
    { "code": "350681", "name": "龙海市" }] },

  { "code": "3507", "name": "南平市", "children": [
    { "code": "350702", "name": "延平区" },
    { "code": "350703", "name": "建阳区" },
    { "code": "350721", "name": "顺昌县" },
    { "code": "350722", "name": "浦城县" },
    { "code": "350723", "name": "光泽县" },
    { "code": "350724", "name": "松溪县" },
    { "code": "350725", "name": "政和县" },
    { "code": "350781", "name": "邵武市" },
    { "code": "350782", "name": "武夷山市" },
    { "code": "350783", "name": "建瓯市" }] },

  { "code": "3508", "name": "龙岩市", "children": [
    { "code": "350802", "name": "新罗区" },
    { "code": "350803", "name": "永定区" },
    { "code": "350821", "name": "长汀县" },
    { "code": "350823", "name": "上杭县" },
    { "code": "350824", "name": "武平县" },
    { "code": "350825", "name": "连城县" },
    { "code": "350881", "name": "漳平市" }] },

  { "code": "3509", "name": "宁德市", "children": [
    { "code": "350902", "name": "蕉城区" },
    { "code": "350921", "name": "霞浦县" },
    { "code": "350922", "name": "古田县" },
    { "code": "350923", "name": "屏南县" },
    { "code": "350924", "name": "寿宁县" },
    { "code": "350925", "name": "周宁县" },
    { "code": "350926", "name": "柘荣县" },
    { "code": "350981", "name": "福安市" },
    { "code": "350982", "name": "福鼎市" }] }] },



{
  "code": "36", "name": "江西省", "children": [
  { "code": "3601", "name": "南昌市", "children": [
    { "code": "360102", "name": "东湖区" },
    { "code": "360103", "name": "西湖区" },
    { "code": "360104", "name": "青云谱区" },
    { "code": "360105", "name": "湾里区" },
    { "code": "360111", "name": "青山湖区" },
    { "code": "360112", "name": "新建区" },
    { "code": "360121", "name": "南昌县" },
    { "code": "360123", "name": "安义县" },
    { "code": "360124", "name": "进贤县" }] },

  { "code": "3602", "name": "景德镇市", "children": [
    { "code": "360202", "name": "昌江区" },
    { "code": "360203", "name": "珠山区" },
    { "code": "360222", "name": "浮梁县" },
    { "code": "360281", "name": "乐平市" }] },

  { "code": "3603", "name": "萍乡市", "children": [
    { "code": "360302", "name": "安源区" },
    { "code": "360313", "name": "湘东区" },
    { "code": "360321", "name": "莲花县" },
    { "code": "360322", "name": "上栗县" },
    { "code": "360323", "name": "芦溪县" }] },

  { "code": "3604", "name": "九江市", "children": [
    { "code": "360402", "name": "濂溪区" },
    { "code": "360403", "name": "浔阳区" },
    { "code": "360404", "name": "柴桑区" },
    { "code": "360423", "name": "武宁县" },
    { "code": "360424", "name": "修水县" },
    { "code": "360425", "name": "永修县" },
    { "code": "360426", "name": "德安县" },
    { "code": "360428", "name": "都昌县" },
    { "code": "360429", "name": "湖口县" },
    { "code": "360430", "name": "彭泽县" },
    { "code": "360481", "name": "瑞昌市" },
    { "code": "360482", "name": "共青城市" },
    { "code": "360483", "name": "庐山市" }] },

  { "code": "3605", "name": "新余市", "children": [
    { "code": "360502", "name": "渝水区" },
    { "code": "360521", "name": "分宜县" }] },

  { "code": "3606", "name": "鹰潭市", "children": [
    { "code": "360602", "name": "月湖区" },
    { "code": "360603", "name": "余江区" },
    { "code": "360681", "name": "贵溪市" }] },

  { "code": "3607", "name": "赣州市", "children": [
    { "code": "360702", "name": "章贡区" },
    { "code": "360703", "name": "南康区" },
    { "code": "360704", "name": "赣县区" },
    { "code": "360722", "name": "信丰县" },
    { "code": "360723", "name": "大余县" },
    { "code": "360724", "name": "上犹县" },
    { "code": "360725", "name": "崇义县" },
    { "code": "360726", "name": "安远县" },
    { "code": "360727", "name": "龙南县" },
    { "code": "360728", "name": "定南县" },
    { "code": "360729", "name": "全南县" },
    { "code": "360730", "name": "宁都县" },
    { "code": "360731", "name": "于都县" },
    { "code": "360732", "name": "兴国县" },
    { "code": "360733", "name": "会昌县" },
    { "code": "360734", "name": "寻乌县" },
    { "code": "360735", "name": "石城县" },
    { "code": "360781", "name": "瑞金市" }] },

  { "code": "3608", "name": "吉安市", "children": [
    { "code": "360802", "name": "吉州区" },
    { "code": "360803", "name": "青原区" },
    { "code": "360821", "name": "吉安县" },
    { "code": "360822", "name": "吉水县" },
    { "code": "360823", "name": "峡江县" },
    { "code": "360824", "name": "新干县" },
    { "code": "360825", "name": "永丰县" },
    { "code": "360826", "name": "泰和县" },
    { "code": "360827", "name": "遂川县" },
    { "code": "360828", "name": "万安县" },
    { "code": "360829", "name": "安福县" },
    { "code": "360830", "name": "永新县" },
    { "code": "360881", "name": "井冈山市" }] },

  { "code": "3609", "name": "宜春市", "children": [
    { "code": "360902", "name": "袁州区" },
    { "code": "360921", "name": "奉新县" },
    { "code": "360922", "name": "万载县" },
    { "code": "360923", "name": "上高县" },
    { "code": "360924", "name": "宜丰县" },
    { "code": "360925", "name": "靖安县" },
    { "code": "360926", "name": "铜鼓县" },
    { "code": "360981", "name": "丰城市" },
    { "code": "360982", "name": "樟树市" },
    { "code": "360983", "name": "高安市" }] },

  { "code": "3610", "name": "抚州市", "children": [
    { "code": "361002", "name": "临川区" },
    { "code": "361003", "name": "东乡区" },
    { "code": "361021", "name": "南城县" },
    { "code": "361022", "name": "黎川县" },
    { "code": "361023", "name": "南丰县" },
    { "code": "361024", "name": "崇仁县" },
    { "code": "361025", "name": "乐安县" },
    { "code": "361026", "name": "宜黄县" },
    { "code": "361027", "name": "金溪县" },
    { "code": "361028", "name": "资溪县" },
    { "code": "361030", "name": "广昌县" }] },

  { "code": "3611", "name": "上饶市", "children": [
    { "code": "361102", "name": "信州区" },
    { "code": "361103", "name": "广丰区" },
    { "code": "361104", "name": "广信区" },
    { "code": "361123", "name": "玉山县" },
    { "code": "361124", "name": "铅山县" },
    { "code": "361125", "name": "横峰县" },
    { "code": "361126", "name": "弋阳县" },
    { "code": "361127", "name": "余干县" },
    { "code": "361128", "name": "鄱阳县" },
    { "code": "361129", "name": "万年县" },
    { "code": "361130", "name": "婺源县" },
    { "code": "361181", "name": "德兴市" }] }] },



{
  "code": "37", "name": "山东省", "children": [
  { "code": "3701", "name": "济南市", "children": [
    { "code": "370102", "name": "历下区" },
    { "code": "370103", "name": "市中区" },
    { "code": "370104", "name": "槐荫区" },
    { "code": "370105", "name": "天桥区" },
    { "code": "370112", "name": "历城区" },
    { "code": "370113", "name": "长清区" },
    { "code": "370114", "name": "章丘区" },
    { "code": "370115", "name": "济阳区" },
    { "code": "370116", "name": "莱芜区" },
    { "code": "370117", "name": "钢城区" },
    { "code": "370124", "name": "平阴县" },
    { "code": "370126", "name": "商河县" },
    { "code": "370171", "name": "济南高新技术产业开发区" }] },

  { "code": "3702", "name": "青岛市", "children": [
    { "code": "370202", "name": "市南区" },
    { "code": "370203", "name": "市北区" },
    { "code": "370211", "name": "黄岛区" },
    { "code": "370212", "name": "崂山区" },
    { "code": "370213", "name": "李沧区" },
    { "code": "370214", "name": "城阳区" },
    { "code": "370215", "name": "即墨区" },
    { "code": "370271", "name": "青岛高新技术产业开发区" },
    { "code": "370281", "name": "胶州市" },
    { "code": "370283", "name": "平度市" },
    { "code": "370285", "name": "莱西市" }] },

  { "code": "3703", "name": "淄博市", "children": [
    { "code": "370302", "name": "淄川区" },
    { "code": "370303", "name": "张店区" },
    { "code": "370304", "name": "博山区" },
    { "code": "370305", "name": "临淄区" },
    { "code": "370306", "name": "周村区" },
    { "code": "370321", "name": "桓台县" },
    { "code": "370322", "name": "高青县" },
    { "code": "370323", "name": "沂源县" }] },

  { "code": "3704", "name": "枣庄市", "children": [
    { "code": "370402", "name": "市中区" },
    { "code": "370403", "name": "薛城区" },
    { "code": "370404", "name": "峄城区" },
    { "code": "370405", "name": "台儿庄区" },
    { "code": "370406", "name": "山亭区" },
    { "code": "370481", "name": "滕州市" }] },

  { "code": "3705", "name": "东营市", "children": [
    { "code": "370502", "name": "东营区" },
    { "code": "370503", "name": "河口区" },
    { "code": "370505", "name": "垦利区" },
    { "code": "370522", "name": "利津县" },
    { "code": "370523", "name": "广饶县" },
    { "code": "370571", "name": "东营经济技术开发区" },
    { "code": "370572", "name": "东营港经济开发区" }] },

  { "code": "3706", "name": "烟台市", "children": [
    { "code": "370602", "name": "芝罘区" },
    { "code": "370611", "name": "福山区" },
    { "code": "370612", "name": "牟平区" },
    { "code": "370613", "name": "莱山区" },
    { "code": "370634", "name": "长岛县" },
    { "code": "370671", "name": "烟台高新技术产业开发区" },
    { "code": "370672", "name": "烟台经济技术开发区" },
    { "code": "370681", "name": "龙口市" },
    { "code": "370682", "name": "莱阳市" },
    { "code": "370683", "name": "莱州市" },
    { "code": "370684", "name": "蓬莱市" },
    { "code": "370685", "name": "招远市" },
    { "code": "370686", "name": "栖霞市" },
    { "code": "370687", "name": "海阳市" }] },

  { "code": "3707", "name": "潍坊市", "children": [
    { "code": "370702", "name": "潍城区" },
    { "code": "370703", "name": "寒亭区" },
    { "code": "370704", "name": "坊子区" },
    { "code": "370705", "name": "奎文区" },
    { "code": "370724", "name": "临朐县" },
    { "code": "370725", "name": "昌乐县" },
    { "code": "370772", "name": "潍坊滨海经济技术开发区" },
    { "code": "370781", "name": "青州市" },
    { "code": "370782", "name": "诸城市" },
    { "code": "370783", "name": "寿光市" },
    { "code": "370784", "name": "安丘市" },
    { "code": "370785", "name": "高密市" },
    { "code": "370786", "name": "昌邑市" }] },

  { "code": "3708", "name": "济宁市", "children": [
    { "code": "370811", "name": "任城区" },
    { "code": "370812", "name": "兖州区" },
    { "code": "370826", "name": "微山县" },
    { "code": "370827", "name": "鱼台县" },
    { "code": "370828", "name": "金乡县" },
    { "code": "370829", "name": "嘉祥县" },
    { "code": "370830", "name": "汶上县" },
    { "code": "370831", "name": "泗水县" },
    { "code": "370832", "name": "梁山县" },
    { "code": "370871", "name": "济宁高新技术产业开发区" },
    { "code": "370881", "name": "曲阜市" },
    { "code": "370883", "name": "邹城市" }] },

  { "code": "3709", "name": "泰安市", "children": [
    { "code": "370902", "name": "泰山区" },
    { "code": "370911", "name": "岱岳区" },
    { "code": "370921", "name": "宁阳县" },
    { "code": "370923", "name": "东平县" },
    { "code": "370982", "name": "新泰市" },
    { "code": "370983", "name": "肥城市" }] },

  { "code": "3710", "name": "威海市", "children": [
    { "code": "371002", "name": "环翠区" },
    { "code": "371003", "name": "文登区" },
    { "code": "371071", "name": "威海火炬高技术产业开发区" },
    { "code": "371072", "name": "威海经济技术开发区" },
    { "code": "371073", "name": "威海临港经济技术开发区" },
    { "code": "371082", "name": "荣成市" },
    { "code": "371083", "name": "乳山市" }] },

  { "code": "3711", "name": "日照市", "children": [
    { "code": "371102", "name": "东港区" },
    { "code": "371103", "name": "岚山区" },
    { "code": "371121", "name": "五莲县" },
    { "code": "371122", "name": "莒县" },
    { "code": "371171", "name": "日照经济技术开发区" }] },

  { "code": "3713", "name": "临沂市", "children": [
    { "code": "371302", "name": "兰山区" },
    { "code": "371311", "name": "罗庄区" },
    { "code": "371312", "name": "河东区" },
    { "code": "371321", "name": "沂南县" },
    { "code": "371322", "name": "郯城县" },
    { "code": "371323", "name": "沂水县" },
    { "code": "371324", "name": "兰陵县" },
    { "code": "371325", "name": "费县" },
    { "code": "371326", "name": "平邑县" },
    { "code": "371327", "name": "莒南县" },
    { "code": "371328", "name": "蒙阴县" },
    { "code": "371329", "name": "临沭县" },
    { "code": "371371", "name": "临沂高新技术产业开发区" },
    { "code": "371372", "name": "临沂经济技术开发区" },
    { "code": "371373", "name": "临沂临港经济开发区" }] },

  { "code": "3714", "name": "德州市", "children": [
    { "code": "371402", "name": "德城区" },
    { "code": "371403", "name": "陵城区" },
    { "code": "371422", "name": "宁津县" },
    { "code": "371423", "name": "庆云县" },
    { "code": "371424", "name": "临邑县" },
    { "code": "371425", "name": "齐河县" },
    { "code": "371426", "name": "平原县" },
    { "code": "371427", "name": "夏津县" },
    { "code": "371428", "name": "武城县" },
    { "code": "371471", "name": "德州经济技术开发区" },
    { "code": "371472", "name": "德州运河经济开发区" },
    { "code": "371481", "name": "乐陵市" },
    { "code": "371482", "name": "禹城市" }] },

  { "code": "3715", "name": "聊城市", "children": [
    { "code": "371502", "name": "东昌府区" },
    { "code": "371503", "name": "茌平区" },
    { "code": "371521", "name": "阳谷县" },
    { "code": "371522", "name": "莘县" },
    { "code": "371524", "name": "东阿县" },
    { "code": "371525", "name": "冠县" },
    { "code": "371526", "name": "高唐县" },
    { "code": "371581", "name": "临清市" }] },

  { "code": "3716", "name": "滨州市", "children": [
    { "code": "371602", "name": "滨城区" },
    { "code": "371603", "name": "沾化区" },
    { "code": "371621", "name": "惠民县" },
    { "code": "371622", "name": "阳信县" },
    { "code": "371623", "name": "无棣县" },
    { "code": "371625", "name": "博兴县" },
    { "code": "371681", "name": "邹平市" }] },

  { "code": "3717", "name": "菏泽市", "children": [
    { "code": "371702", "name": "牡丹区" },
    { "code": "371703", "name": "定陶区" },
    { "code": "371721", "name": "曹县" },
    { "code": "371722", "name": "单县" },
    { "code": "371723", "name": "成武县" },
    { "code": "371724", "name": "巨野县" },
    { "code": "371725", "name": "郓城县" },
    { "code": "371726", "name": "鄄城县" },
    { "code": "371728", "name": "东明县" },
    { "code": "371771", "name": "菏泽经济技术开发区" },
    { "code": "371772", "name": "菏泽高新技术开发区" }] }] },



{
  "code": "41", "name": "河南省", "children": [
  { "code": "4101", "name": "郑州市", "children": [
    { "code": "410102", "name": "中原区" },
    { "code": "410103", "name": "二七区" },
    { "code": "410104", "name": "管城回族区" },
    { "code": "410105", "name": "金水区" },
    { "code": "410106", "name": "上街区" },
    { "code": "410108", "name": "惠济区" },
    { "code": "410122", "name": "中牟县" },
    { "code": "410171", "name": "郑州经济技术开发区" },
    { "code": "410172", "name": "郑州高新技术产业开发区" },
    { "code": "410173", "name": "郑州航空港经济综合实验区" },
    { "code": "410181", "name": "巩义市" },
    { "code": "410182", "name": "荥阳市" },
    { "code": "410183", "name": "新密市" },
    { "code": "410184", "name": "新郑市" },
    { "code": "410185", "name": "登封市" }] },

  { "code": "4102", "name": "开封市", "children": [
    { "code": "410202", "name": "龙亭区" },
    { "code": "410203", "name": "顺河回族区" },
    { "code": "410204", "name": "鼓楼区" },
    { "code": "410205", "name": "禹王台区" },
    { "code": "410212", "name": "祥符区" },
    { "code": "410221", "name": "杞县" },
    { "code": "410222", "name": "通许县" },
    { "code": "410223", "name": "尉氏县" },
    { "code": "410225", "name": "兰考县" }] },

  { "code": "4103", "name": "洛阳市", "children": [
    { "code": "410302", "name": "老城区" },
    { "code": "410303", "name": "西工区" },
    { "code": "410304", "name": "瀍河回族区" },
    { "code": "410305", "name": "涧西区" },
    { "code": "410306", "name": "吉利区" },
    { "code": "410311", "name": "洛龙区" },
    { "code": "410322", "name": "孟津县" },
    { "code": "410323", "name": "新安县" },
    { "code": "410324", "name": "栾川县" },
    { "code": "410325", "name": "嵩县" },
    { "code": "410326", "name": "汝阳县" },
    { "code": "410327", "name": "宜阳县" },
    { "code": "410328", "name": "洛宁县" },
    { "code": "410329", "name": "伊川县" },
    { "code": "410371", "name": "洛阳高新技术产业开发区" },
    { "code": "410381", "name": "偃师市" }] },

  { "code": "4104", "name": "平顶山市", "children": [
    { "code": "410402", "name": "新华区" },
    { "code": "410403", "name": "卫东区" },
    { "code": "410404", "name": "石龙区" },
    { "code": "410411", "name": "湛河区" },
    { "code": "410421", "name": "宝丰县" },
    { "code": "410422", "name": "叶县" },
    { "code": "410423", "name": "鲁山县" },
    { "code": "410425", "name": "郏县" },
    { "code": "410471", "name": "平顶山高新技术产业开发区" },
    { "code": "410472", "name": "平顶山市城乡一体化示范区" },
    { "code": "410481", "name": "舞钢市" },
    { "code": "410482", "name": "汝州市" }] },

  { "code": "4105", "name": "安阳市", "children": [
    { "code": "410502", "name": "文峰区" },
    { "code": "410503", "name": "北关区" },
    { "code": "410505", "name": "殷都区" },
    { "code": "410506", "name": "龙安区" },
    { "code": "410522", "name": "安阳县" },
    { "code": "410523", "name": "汤阴县" },
    { "code": "410526", "name": "滑县" },
    { "code": "410527", "name": "内黄县" },
    { "code": "410571", "name": "安阳高新技术产业开发区" },
    { "code": "410581", "name": "林州市" }] },

  { "code": "4106", "name": "鹤壁市", "children": [
    { "code": "410602", "name": "鹤山区" },
    { "code": "410603", "name": "山城区" },
    { "code": "410611", "name": "淇滨区" },
    { "code": "410621", "name": "浚县" },
    { "code": "410622", "name": "淇县" },
    { "code": "410671", "name": "鹤壁经济技术开发区" }] },

  { "code": "4107", "name": "新乡市", "children": [
    { "code": "410702", "name": "红旗区" },
    { "code": "410703", "name": "卫滨区" },
    { "code": "410704", "name": "凤泉区" },
    { "code": "410711", "name": "牧野区" },
    { "code": "410721", "name": "新乡县" },
    { "code": "410724", "name": "获嘉县" },
    { "code": "410725", "name": "原阳县" },
    { "code": "410726", "name": "延津县" },
    { "code": "410727", "name": "封丘县" },
    { "code": "410771", "name": "新乡高新技术产业开发区" },
    { "code": "410772", "name": "新乡经济技术开发区" },
    { "code": "410773", "name": "新乡市平原城乡一体化示范区" },
    { "code": "410781", "name": "卫辉市" },
    { "code": "410782", "name": "辉县市" },
    { "code": "410783", "name": "长垣市" }] },

  { "code": "4108", "name": "焦作市", "children": [
    { "code": "410802", "name": "解放区" },
    { "code": "410803", "name": "中站区" },
    { "code": "410804", "name": "马村区" },
    { "code": "410811", "name": "山阳区" },
    { "code": "410821", "name": "修武县" },
    { "code": "410822", "name": "博爱县" },
    { "code": "410823", "name": "武陟县" },
    { "code": "410825", "name": "温县" },
    { "code": "410871", "name": "焦作城乡一体化示范区" },
    { "code": "410882", "name": "沁阳市" },
    { "code": "410883", "name": "孟州市" }] },

  { "code": "4109", "name": "濮阳市", "children": [
    { "code": "410902", "name": "华龙区" },
    { "code": "410922", "name": "清丰县" },
    { "code": "410923", "name": "南乐县" },
    { "code": "410926", "name": "范县" },
    { "code": "410927", "name": "台前县" },
    { "code": "410928", "name": "濮阳县" },
    { "code": "410971", "name": "河南濮阳工业园区" },
    { "code": "410972", "name": "濮阳经济技术开发区" }] },

  { "code": "4110", "name": "许昌市", "children": [
    { "code": "411002", "name": "魏都区" },
    { "code": "411003", "name": "建安区" },
    { "code": "411024", "name": "鄢陵县" },
    { "code": "411025", "name": "襄城县" },
    { "code": "411071", "name": "许昌经济技术开发区" },
    { "code": "411081", "name": "禹州市" },
    { "code": "411082", "name": "长葛市" }] },

  { "code": "4111", "name": "漯河市", "children": [
    { "code": "411102", "name": "源汇区" },
    { "code": "411103", "name": "郾城区" },
    { "code": "411104", "name": "召陵区" },
    { "code": "411121", "name": "舞阳县" },
    { "code": "411122", "name": "临颍县" },
    { "code": "411171", "name": "漯河经济技术开发区" }] },

  { "code": "4112", "name": "三门峡市", "children": [
    { "code": "411202", "name": "湖滨区" },
    { "code": "411203", "name": "陕州区" },
    { "code": "411221", "name": "渑池县" },
    { "code": "411224", "name": "卢氏县" },
    { "code": "411271", "name": "河南三门峡经济开发区" },
    { "code": "411281", "name": "义马市" },
    { "code": "411282", "name": "灵宝市" }] },

  { "code": "4113", "name": "南阳市", "children": [
    { "code": "411302", "name": "宛城区" },
    { "code": "411303", "name": "卧龙区" },
    { "code": "411321", "name": "南召县" },
    { "code": "411322", "name": "方城县" },
    { "code": "411323", "name": "西峡县" },
    { "code": "411324", "name": "镇平县" },
    { "code": "411325", "name": "内乡县" },
    { "code": "411326", "name": "淅川县" },
    { "code": "411327", "name": "社旗县" },
    { "code": "411328", "name": "唐河县" },
    { "code": "411329", "name": "新野县" },
    { "code": "411330", "name": "桐柏县" },
    { "code": "411371", "name": "南阳高新技术产业开发区" },
    { "code": "411372", "name": "南阳市城乡一体化示范区" },
    { "code": "411381", "name": "邓州市" }] },

  { "code": "4114", "name": "商丘市", "children": [
    { "code": "411402", "name": "梁园区" },
    { "code": "411403", "name": "睢阳区" },
    { "code": "411421", "name": "民权县" },
    { "code": "411422", "name": "睢县" },
    { "code": "411423", "name": "宁陵县" },
    { "code": "411424", "name": "柘城县" },
    { "code": "411425", "name": "虞城县" },
    { "code": "411426", "name": "夏邑县" },
    { "code": "411471", "name": "豫东综合物流产业聚集区" },
    { "code": "411472", "name": "河南商丘经济开发区" },
    { "code": "411481", "name": "永城市" }] },

  { "code": "4115", "name": "信阳市", "children": [
    { "code": "411502", "name": "浉河区" },
    { "code": "411503", "name": "平桥区" },
    { "code": "411521", "name": "罗山县" },
    { "code": "411522", "name": "光山县" },
    { "code": "411523", "name": "新县" },
    { "code": "411524", "name": "商城县" },
    { "code": "411525", "name": "固始县" },
    { "code": "411526", "name": "潢川县" },
    { "code": "411527", "name": "淮滨县" },
    { "code": "411528", "name": "息县" },
    { "code": "411571", "name": "信阳高新技术产业开发区" }] },

  { "code": "4116", "name": "周口市", "children": [
    { "code": "411602", "name": "川汇区" },
    { "code": "411603", "name": "淮阳区" },
    { "code": "411621", "name": "扶沟县" },
    { "code": "411622", "name": "西华县" },
    { "code": "411623", "name": "商水县" },
    { "code": "411624", "name": "沈丘县" },
    { "code": "411625", "name": "郸城县" },
    { "code": "411627", "name": "太康县" },
    { "code": "411628", "name": "鹿邑县" },
    { "code": "411671", "name": "河南周口经济开发区" },
    { "code": "411681", "name": "项城市" }] },

  { "code": "4117", "name": "驻马店市", "children": [
    { "code": "411702", "name": "驿城区" },
    { "code": "411721", "name": "西平县" },
    { "code": "411722", "name": "上蔡县" },
    { "code": "411723", "name": "平舆县" },
    { "code": "411724", "name": "正阳县" },
    { "code": "411725", "name": "确山县" },
    { "code": "411726", "name": "泌阳县" },
    { "code": "411727", "name": "汝南县" },
    { "code": "411728", "name": "遂平县" },
    { "code": "411729", "name": "新蔡县" },
    { "code": "411771", "name": "河南驻马店经济开发区" }] },

  { "code": "4190", "name": "省直辖县级行政区划", "children": [
    { "code": "419001", "name": "济源市" }] }] },



{
  "code": "42", "name": "湖北省", "children": [
  { "code": "4201", "name": "武汉市", "children": [
    { "code": "420102", "name": "江岸区" },
    { "code": "420103", "name": "江汉区" },
    { "code": "420104", "name": "硚口区" },
    { "code": "420105", "name": "汉阳区" },
    { "code": "420106", "name": "武昌区" },
    { "code": "420107", "name": "青山区" },
    { "code": "420111", "name": "洪山区" },
    { "code": "420112", "name": "东西湖区" },
    { "code": "420113", "name": "汉南区" },
    { "code": "420114", "name": "蔡甸区" },
    { "code": "420115", "name": "江夏区" },
    { "code": "420116", "name": "黄陂区" },
    { "code": "420117", "name": "新洲区" }] },

  { "code": "4202", "name": "黄石市", "children": [
    { "code": "420202", "name": "黄石港区" },
    { "code": "420203", "name": "西塞山区" },
    { "code": "420204", "name": "下陆区" },
    { "code": "420205", "name": "铁山区" },
    { "code": "420222", "name": "阳新县" },
    { "code": "420281", "name": "大冶市" }] },

  { "code": "4203", "name": "十堰市", "children": [
    { "code": "420302", "name": "茅箭区" },
    { "code": "420303", "name": "张湾区" },
    { "code": "420304", "name": "郧阳区" },
    { "code": "420322", "name": "郧西县" },
    { "code": "420323", "name": "竹山县" },
    { "code": "420324", "name": "竹溪县" },
    { "code": "420325", "name": "房县" },
    { "code": "420381", "name": "丹江口市" }] },

  { "code": "4205", "name": "宜昌市", "children": [
    { "code": "420502", "name": "西陵区" },
    { "code": "420503", "name": "伍家岗区" },
    { "code": "420504", "name": "点军区" },
    { "code": "420505", "name": "猇亭区" },
    { "code": "420506", "name": "夷陵区" },
    { "code": "420525", "name": "远安县" },
    { "code": "420526", "name": "兴山县" },
    { "code": "420527", "name": "秭归县" },
    { "code": "420528", "name": "长阳土家族自治县" },
    { "code": "420529", "name": "五峰土家族自治县" },
    { "code": "420581", "name": "宜都市" },
    { "code": "420582", "name": "当阳市" },
    { "code": "420583", "name": "枝江市" }] },

  { "code": "4206", "name": "襄阳市", "children": [
    { "code": "420602", "name": "襄城区" },
    { "code": "420606", "name": "樊城区" },
    { "code": "420607", "name": "襄州区" },
    { "code": "420624", "name": "南漳县" },
    { "code": "420625", "name": "谷城县" },
    { "code": "420626", "name": "保康县" },
    { "code": "420682", "name": "老河口市" },
    { "code": "420683", "name": "枣阳市" },
    { "code": "420684", "name": "宜城市" }] },

  { "code": "4207", "name": "鄂州市", "children": [
    { "code": "420702", "name": "梁子湖区" },
    { "code": "420703", "name": "华容区" },
    { "code": "420704", "name": "鄂城区" }] },

  { "code": "4208", "name": "荆门市", "children": [
    { "code": "420802", "name": "东宝区" },
    { "code": "420804", "name": "掇刀区" },
    { "code": "420822", "name": "沙洋县" },
    { "code": "420881", "name": "钟祥市" },
    { "code": "420882", "name": "京山市" }] },

  { "code": "4209", "name": "孝感市", "children": [
    { "code": "420902", "name": "孝南区" },
    { "code": "420921", "name": "孝昌县" },
    { "code": "420922", "name": "大悟县" },
    { "code": "420923", "name": "云梦县" },
    { "code": "420981", "name": "应城市" },
    { "code": "420982", "name": "安陆市" },
    { "code": "420984", "name": "汉川市" }] },

  { "code": "4210", "name": "荆州市", "children": [
    { "code": "421002", "name": "沙市区" },
    { "code": "421003", "name": "荆州区" },
    { "code": "421022", "name": "公安县" },
    { "code": "421023", "name": "监利县" },
    { "code": "421024", "name": "江陵县" },
    { "code": "421071", "name": "荆州经济技术开发区" },
    { "code": "421081", "name": "石首市" },
    { "code": "421083", "name": "洪湖市" },
    { "code": "421087", "name": "松滋市" }] },

  { "code": "4211", "name": "黄冈市", "children": [
    { "code": "421102", "name": "黄州区" },
    { "code": "421121", "name": "团风县" },
    { "code": "421122", "name": "红安县" },
    { "code": "421123", "name": "罗田县" },
    { "code": "421124", "name": "英山县" },
    { "code": "421125", "name": "浠水县" },
    { "code": "421126", "name": "蕲春县" },
    { "code": "421127", "name": "黄梅县" },
    { "code": "421171", "name": "龙感湖管理区" },
    { "code": "421181", "name": "麻城市" },
    { "code": "421182", "name": "武穴市" }] },

  { "code": "4212", "name": "咸宁市", "children": [
    { "code": "421202", "name": "咸安区" },
    { "code": "421221", "name": "嘉鱼县" },
    { "code": "421222", "name": "通城县" },
    { "code": "421223", "name": "崇阳县" },
    { "code": "421224", "name": "通山县" },
    { "code": "421281", "name": "赤壁市" }] },

  { "code": "4213", "name": "随州市", "children": [
    { "code": "421303", "name": "曾都区" },
    { "code": "421321", "name": "随县" },
    { "code": "421381", "name": "广水市" }] },

  { "code": "4228", "name": "恩施土家族苗族自治州", "children": [
    { "code": "422801", "name": "恩施市" },
    { "code": "422802", "name": "利川市" },
    { "code": "422822", "name": "建始县" },
    { "code": "422823", "name": "巴东县" },
    { "code": "422825", "name": "宣恩县" },
    { "code": "422826", "name": "咸丰县" },
    { "code": "422827", "name": "来凤县" },
    { "code": "422828", "name": "鹤峰县" }] },

  { "code": "4290", "name": "省直辖县级行政区划", "children": [
    { "code": "429004", "name": "仙桃市" },
    { "code": "429005", "name": "潜江市" },
    { "code": "429006", "name": "天门市" },
    { "code": "429021", "name": "神农架林区" }] }] },



{
  "code": "43", "name": "湖南省", "children": [
  { "code": "4301", "name": "长沙市", "children": [
    { "code": "430102", "name": "芙蓉区" },
    { "code": "430103", "name": "天心区" },
    { "code": "430104", "name": "岳麓区" },
    { "code": "430105", "name": "开福区" },
    { "code": "430111", "name": "雨花区" },
    { "code": "430112", "name": "望城区" },
    { "code": "430121", "name": "长沙县" },
    { "code": "430181", "name": "浏阳市" },
    { "code": "430182", "name": "宁乡市" }] },

  { "code": "4302", "name": "株洲市", "children": [
    { "code": "430202", "name": "荷塘区" },
    { "code": "430203", "name": "芦淞区" },
    { "code": "430204", "name": "石峰区" },
    { "code": "430211", "name": "天元区" },
    { "code": "430212", "name": "渌口区" },
    { "code": "430223", "name": "攸县" },
    { "code": "430224", "name": "茶陵县" },
    { "code": "430225", "name": "炎陵县" },
    { "code": "430271", "name": "云龙示范区" },
    { "code": "430281", "name": "醴陵市" }] },

  { "code": "4303", "name": "湘潭市", "children": [
    { "code": "430302", "name": "雨湖区" },
    { "code": "430304", "name": "岳塘区" },
    { "code": "430321", "name": "湘潭县" },
    { "code": "430371", "name": "湖南湘潭高新技术产业园区" },
    { "code": "430372", "name": "湘潭昭山示范区" },
    { "code": "430373", "name": "湘潭九华示范区" },
    { "code": "430381", "name": "湘乡市" },
    { "code": "430382", "name": "韶山市" }] },

  { "code": "4304", "name": "衡阳市", "children": [
    { "code": "430405", "name": "珠晖区" },
    { "code": "430406", "name": "雁峰区" },
    { "code": "430407", "name": "石鼓区" },
    { "code": "430408", "name": "蒸湘区" },
    { "code": "430412", "name": "南岳区" },
    { "code": "430421", "name": "衡阳县" },
    { "code": "430422", "name": "衡南县" },
    { "code": "430423", "name": "衡山县" },
    { "code": "430424", "name": "衡东县" },
    { "code": "430426", "name": "祁东县" },
    { "code": "430471", "name": "衡阳综合保税区" },
    { "code": "430472", "name": "湖南衡阳高新技术产业园区" },
    { "code": "430473", "name": "湖南衡阳松木经济开发区" },
    { "code": "430481", "name": "耒阳市" },
    { "code": "430482", "name": "常宁市" }] },

  { "code": "4305", "name": "邵阳市", "children": [
    { "code": "430502", "name": "双清区" },
    { "code": "430503", "name": "大祥区" },
    { "code": "430511", "name": "北塔区" },
    { "code": "430522", "name": "新邵县" },
    { "code": "430523", "name": "邵阳县" },
    { "code": "430524", "name": "隆回县" },
    { "code": "430525", "name": "洞口县" },
    { "code": "430527", "name": "绥宁县" },
    { "code": "430528", "name": "新宁县" },
    { "code": "430529", "name": "城步苗族自治县" },
    { "code": "430581", "name": "武冈市" },
    { "code": "430582", "name": "邵东市" }] },

  { "code": "4306", "name": "岳阳市", "children": [
    { "code": "430602", "name": "岳阳楼区" },
    { "code": "430603", "name": "云溪区" },
    { "code": "430611", "name": "君山区" },
    { "code": "430621", "name": "岳阳县" },
    { "code": "430623", "name": "华容县" },
    { "code": "430624", "name": "湘阴县" },
    { "code": "430626", "name": "平江县" },
    { "code": "430671", "name": "岳阳市屈原管理区" },
    { "code": "430681", "name": "汨罗市" },
    { "code": "430682", "name": "临湘市" }] },

  { "code": "4307", "name": "常德市", "children": [
    { "code": "430702", "name": "武陵区" },
    { "code": "430703", "name": "鼎城区" },
    { "code": "430721", "name": "安乡县" },
    { "code": "430722", "name": "汉寿县" },
    { "code": "430723", "name": "澧县" },
    { "code": "430724", "name": "临澧县" },
    { "code": "430725", "name": "桃源县" },
    { "code": "430726", "name": "石门县" },
    { "code": "430771", "name": "常德市西洞庭管理区" },
    { "code": "430781", "name": "津市市" }] },

  { "code": "4308", "name": "张家界市", "children": [
    { "code": "430802", "name": "永定区" },
    { "code": "430811", "name": "武陵源区" },
    { "code": "430821", "name": "慈利县" },
    { "code": "430822", "name": "桑植县" }] },

  { "code": "4309", "name": "益阳市", "children": [
    { "code": "430902", "name": "资阳区" },
    { "code": "430903", "name": "赫山区" },
    { "code": "430921", "name": "南县" },
    { "code": "430922", "name": "桃江县" },
    { "code": "430923", "name": "安化县" },
    { "code": "430971", "name": "益阳市大通湖管理区" },
    { "code": "430972", "name": "湖南益阳高新技术产业园区" },
    { "code": "430981", "name": "沅江市" }] },

  { "code": "4310", "name": "郴州市", "children": [
    { "code": "431002", "name": "北湖区" },
    { "code": "431003", "name": "苏仙区" },
    { "code": "431021", "name": "桂阳县" },
    { "code": "431022", "name": "宜章县" },
    { "code": "431023", "name": "永兴县" },
    { "code": "431024", "name": "嘉禾县" },
    { "code": "431025", "name": "临武县" },
    { "code": "431026", "name": "汝城县" },
    { "code": "431027", "name": "桂东县" },
    { "code": "431028", "name": "安仁县" },
    { "code": "431081", "name": "资兴市" }] },

  { "code": "4311", "name": "永州市", "children": [
    { "code": "431102", "name": "零陵区" },
    { "code": "431103", "name": "冷水滩区" },
    { "code": "431121", "name": "祁阳县" },
    { "code": "431122", "name": "东安县" },
    { "code": "431123", "name": "双牌县" },
    { "code": "431124", "name": "道县" },
    { "code": "431125", "name": "江永县" },
    { "code": "431126", "name": "宁远县" },
    { "code": "431127", "name": "蓝山县" },
    { "code": "431128", "name": "新田县" },
    { "code": "431129", "name": "江华瑶族自治县" },
    { "code": "431171", "name": "永州经济技术开发区" },
    { "code": "431172", "name": "永州市金洞管理区" },
    { "code": "431173", "name": "永州市回龙圩管理区" }] },

  { "code": "4312", "name": "怀化市", "children": [
    { "code": "431202", "name": "鹤城区" },
    { "code": "431221", "name": "中方县" },
    { "code": "431222", "name": "沅陵县" },
    { "code": "431223", "name": "辰溪县" },
    { "code": "431224", "name": "溆浦县" },
    { "code": "431225", "name": "会同县" },
    { "code": "431226", "name": "麻阳苗族自治县" },
    { "code": "431227", "name": "新晃侗族自治县" },
    { "code": "431228", "name": "芷江侗族自治县" },
    { "code": "431229", "name": "靖州苗族侗族自治县" },
    { "code": "431230", "name": "通道侗族自治县" },
    { "code": "431271", "name": "怀化市洪江管理区" },
    { "code": "431281", "name": "洪江市" }] },

  { "code": "4313", "name": "娄底市", "children": [
    { "code": "431302", "name": "娄星区" },
    { "code": "431321", "name": "双峰县" },
    { "code": "431322", "name": "新化县" },
    { "code": "431381", "name": "冷水江市" },
    { "code": "431382", "name": "涟源市" }] },

  { "code": "4331", "name": "湘西土家族苗族自治州", "children": [
    { "code": "433101", "name": "吉首市" },
    { "code": "433122", "name": "泸溪县" },
    { "code": "433123", "name": "凤凰县" },
    { "code": "433124", "name": "花垣县" },
    { "code": "433125", "name": "保靖县" },
    { "code": "433126", "name": "古丈县" },
    { "code": "433127", "name": "永顺县" },
    { "code": "433130", "name": "龙山县" },
    { "code": "433173", "name": "湖南永顺经济开发区" }] }] },



{
  "code": "44", "name": "广东省", "children": [
  { "code": "4401", "name": "广州市", "children": [
    { "code": "440103", "name": "荔湾区" },
    { "code": "440104", "name": "越秀区" },
    { "code": "440105", "name": "海珠区" },
    { "code": "440106", "name": "天河区" },
    { "code": "440111", "name": "白云区" },
    { "code": "440112", "name": "黄埔区" },
    { "code": "440113", "name": "番禺区" },
    { "code": "440114", "name": "花都区" },
    { "code": "440115", "name": "南沙区" },
    { "code": "440117", "name": "从化区" },
    { "code": "440118", "name": "增城区" }] },

  { "code": "4402", "name": "韶关市", "children": [
    { "code": "440203", "name": "武江区" },
    { "code": "440204", "name": "浈江区" },
    { "code": "440205", "name": "曲江区" },
    { "code": "440222", "name": "始兴县" },
    { "code": "440224", "name": "仁化县" },
    { "code": "440229", "name": "翁源县" },
    { "code": "440232", "name": "乳源瑶族自治县" },
    { "code": "440233", "name": "新丰县" },
    { "code": "440281", "name": "乐昌市" },
    { "code": "440282", "name": "南雄市" }] },

  { "code": "4403", "name": "深圳市", "children": [
    { "code": "440303", "name": "罗湖区" },
    { "code": "440304", "name": "福田区" },
    { "code": "440305", "name": "南山区" },
    { "code": "440306", "name": "宝安区" },
    { "code": "440307", "name": "龙岗区" },
    { "code": "440308", "name": "盐田区" },
    { "code": "440309", "name": "龙华区" },
    { "code": "440310", "name": "坪山区" },
    { "code": "440311", "name": "光明区" }] },

  { "code": "4404", "name": "珠海市", "children": [
    { "code": "440402", "name": "香洲区" },
    { "code": "440403", "name": "斗门区" },
    { "code": "440404", "name": "金湾区" }] },

  { "code": "4405", "name": "汕头市", "children": [
    { "code": "440507", "name": "龙湖区" },
    { "code": "440511", "name": "金平区" },
    { "code": "440512", "name": "濠江区" },
    { "code": "440513", "name": "潮阳区" },
    { "code": "440514", "name": "潮南区" },
    { "code": "440515", "name": "澄海区" },
    { "code": "440523", "name": "南澳县" }] },

  { "code": "4406", "name": "佛山市", "children": [
    { "code": "440604", "name": "禅城区" },
    { "code": "440605", "name": "南海区" },
    { "code": "440606", "name": "顺德区" },
    { "code": "440607", "name": "三水区" },
    { "code": "440608", "name": "高明区" }] },

  { "code": "4407", "name": "江门市", "children": [
    { "code": "440703", "name": "蓬江区" },
    { "code": "440704", "name": "江海区" },
    { "code": "440705", "name": "新会区" },
    { "code": "440781", "name": "台山市" },
    { "code": "440783", "name": "开平市" },
    { "code": "440784", "name": "鹤山市" },
    { "code": "440785", "name": "恩平市" }] },

  { "code": "4408", "name": "湛江市", "children": [
    { "code": "440802", "name": "赤坎区" },
    { "code": "440803", "name": "霞山区" },
    { "code": "440804", "name": "坡头区" },
    { "code": "440811", "name": "麻章区" },
    { "code": "440823", "name": "遂溪县" },
    { "code": "440825", "name": "徐闻县" },
    { "code": "440881", "name": "廉江市" },
    { "code": "440882", "name": "雷州市" },
    { "code": "440883", "name": "吴川市" }] },

  { "code": "4409", "name": "茂名市", "children": [
    { "code": "440902", "name": "茂南区" },
    { "code": "440904", "name": "电白区" },
    { "code": "440981", "name": "高州市" },
    { "code": "440982", "name": "化州市" },
    { "code": "440983", "name": "信宜市" }] },

  { "code": "4412", "name": "肇庆市", "children": [
    { "code": "441202", "name": "端州区" },
    { "code": "441203", "name": "鼎湖区" },
    { "code": "441204", "name": "高要区" },
    { "code": "441223", "name": "广宁县" },
    { "code": "441224", "name": "怀集县" },
    { "code": "441225", "name": "封开县" },
    { "code": "441226", "name": "德庆县" },
    { "code": "441284", "name": "四会市" }] },

  { "code": "4413", "name": "惠州市", "children": [
    { "code": "441302", "name": "惠城区" },
    { "code": "441303", "name": "惠阳区" },
    { "code": "441322", "name": "博罗县" },
    { "code": "441323", "name": "惠东县" },
    { "code": "441324", "name": "龙门县" }] },

  { "code": "4414", "name": "梅州市", "children": [
    { "code": "441402", "name": "梅江区" },
    { "code": "441403", "name": "梅县区" },
    { "code": "441422", "name": "大埔县" },
    { "code": "441423", "name": "丰顺县" },
    { "code": "441424", "name": "五华县" },
    { "code": "441426", "name": "平远县" },
    { "code": "441427", "name": "蕉岭县" },
    { "code": "441481", "name": "兴宁市" }] },

  { "code": "4415", "name": "汕尾市", "children": [
    { "code": "441502", "name": "城区" },
    { "code": "441521", "name": "海丰县" },
    { "code": "441523", "name": "陆河县" },
    { "code": "441581", "name": "陆丰市" }] },

  { "code": "4416", "name": "河源市", "children": [
    { "code": "441602", "name": "源城区" },
    { "code": "441621", "name": "紫金县" },
    { "code": "441622", "name": "龙川县" },
    { "code": "441623", "name": "连平县" },
    { "code": "441624", "name": "和平县" },
    { "code": "441625", "name": "东源县" }] },

  { "code": "4417", "name": "阳江市", "children": [
    { "code": "441702", "name": "江城区" },
    { "code": "441704", "name": "阳东区" },
    { "code": "441721", "name": "阳西县" },
    { "code": "441781", "name": "阳春市" }] },

  { "code": "4418", "name": "清远市", "children": [
    { "code": "441802", "name": "清城区" },
    { "code": "441803", "name": "清新区" },
    { "code": "441821", "name": "佛冈县" },
    { "code": "441823", "name": "阳山县" },
    { "code": "441825", "name": "连山壮族瑶族自治县" },
    { "code": "441826", "name": "连南瑶族自治县" },
    { "code": "441881", "name": "英德市" },
    { "code": "441882", "name": "连州市" }] },

  { "code": "4419", "name": "东莞市", "children": [
    { "code": "441900003", "name": "东城街道" },
    { "code": "441900004", "name": "南城街道" },
    { "code": "441900005", "name": "万江街道" },
    { "code": "441900006", "name": "莞城街道" },
    { "code": "441900101", "name": "石碣镇" },
    { "code": "441900102", "name": "石龙镇" },
    { "code": "441900103", "name": "茶山镇" },
    { "code": "441900104", "name": "石排镇" },
    { "code": "441900105", "name": "企石镇" },
    { "code": "441900106", "name": "横沥镇" },
    { "code": "441900107", "name": "桥头镇" },
    { "code": "441900108", "name": "谢岗镇" },
    { "code": "441900109", "name": "东坑镇" },
    { "code": "441900110", "name": "常平镇" },
    { "code": "441900111", "name": "寮步镇" },
    { "code": "441900112", "name": "樟木头镇" },
    { "code": "441900113", "name": "大朗镇" },
    { "code": "441900114", "name": "黄江镇" },
    { "code": "441900115", "name": "清溪镇" },
    { "code": "441900116", "name": "塘厦镇" },
    { "code": "441900117", "name": "凤岗镇" },
    { "code": "441900118", "name": "大岭山镇" },
    { "code": "441900119", "name": "长安镇" },
    { "code": "441900121", "name": "虎门镇" },
    { "code": "441900122", "name": "厚街镇" },
    { "code": "441900123", "name": "沙田镇" },
    { "code": "441900124", "name": "道滘镇" },
    { "code": "441900125", "name": "洪梅镇" },
    { "code": "441900126", "name": "麻涌镇" },
    { "code": "441900127", "name": "望牛墩镇" },
    { "code": "441900128", "name": "中堂镇" },
    { "code": "441900129", "name": "高埗镇" },
    { "code": "441900401", "name": "松山湖" },
    { "code": "441900402", "name": "东莞港" },
    { "code": "441900403", "name": "东莞生态园" }] },

  { "code": "4420", "name": "中山市", "children": [
    { "code": "442000001", "name": "石岐街道" },
    { "code": "442000002", "name": "东区街道" },
    { "code": "442000003", "name": "中山港街道" },
    { "code": "442000004", "name": "西区街道" },
    { "code": "442000005", "name": "南区街道" },
    { "code": "442000006", "name": "五桂山街道" },
    { "code": "442000100", "name": "小榄镇" },
    { "code": "442000101", "name": "黄圃镇" },
    { "code": "442000102", "name": "民众镇" },
    { "code": "442000103", "name": "东凤镇" },
    { "code": "442000104", "name": "东升镇" },
    { "code": "442000105", "name": "古镇镇" },
    { "code": "442000106", "name": "沙溪镇" },
    { "code": "442000107", "name": "坦洲镇" },
    { "code": "442000108", "name": "港口镇" },
    { "code": "442000109", "name": "三角镇" },
    { "code": "442000110", "name": "横栏镇" },
    { "code": "442000111", "name": "南头镇" },
    { "code": "442000112", "name": "阜沙镇" },
    { "code": "442000113", "name": "南朗镇" },
    { "code": "442000114", "name": "三乡镇" },
    { "code": "442000115", "name": "板芙镇" },
    { "code": "442000116", "name": "大涌镇" },
    { "code": "442000117", "name": "神湾镇" }] },

  { "code": "4451", "name": "潮州市", "children": [
    { "code": "445102", "name": "湘桥区" },
    { "code": "445103", "name": "潮安区" },
    { "code": "445122", "name": "饶平县" }] },

  { "code": "4452", "name": "揭阳市", "children": [
    { "code": "445202", "name": "榕城区" },
    { "code": "445203", "name": "揭东区" },
    { "code": "445222", "name": "揭西县" },
    { "code": "445224", "name": "惠来县" },
    { "code": "445281", "name": "普宁市" }] },

  { "code": "4453", "name": "云浮市", "children": [
    { "code": "445302", "name": "云城区" },
    { "code": "445303", "name": "云安区" },
    { "code": "445321", "name": "新兴县" },
    { "code": "445322", "name": "郁南县" },
    { "code": "445381", "name": "罗定市" }] }] },



{ "code": "45", "name": "广西壮族自治区", "children": [
  { "code": "4501", "name": "南宁市", "children": [
    { "code": "450102", "name": "兴宁区" },
    { "code": "450103", "name": "青秀区" },
    { "code": "450105", "name": "江南区" },
    { "code": "450107", "name": "西乡塘区" },
    { "code": "450108", "name": "良庆区" },
    { "code": "450109", "name": "邕宁区" },
    { "code": "450110", "name": "武鸣区" },
    { "code": "450123", "name": "隆安县" },
    { "code": "450124", "name": "马山县" },
    { "code": "450125", "name": "上林县" },
    { "code": "450126", "name": "宾阳县" },
    { "code": "450127", "name": "横县" }] },

  { "code": "4502", "name": "柳州市", "children": [
    { "code": "450202", "name": "城中区" },
    { "code": "450203", "name": "鱼峰区" },
    { "code": "450204", "name": "柳南区" },
    { "code": "450205", "name": "柳北区" },
    { "code": "450206", "name": "柳江区" },
    { "code": "450222", "name": "柳城县" },
    { "code": "450223", "name": "鹿寨县" },
    { "code": "450224", "name": "融安县" },
    { "code": "450225", "name": "融水苗族自治县" },
    { "code": "450226", "name": "三江侗族自治县" }] },

  { "code": "4503", "name": "桂林市", "children": [
    { "code": "450302", "name": "秀峰区" },
    { "code": "450303", "name": "叠彩区" },
    { "code": "450304", "name": "象山区" },
    { "code": "450305", "name": "七星区" },
    { "code": "450311", "name": "雁山区" },
    { "code": "450312", "name": "临桂区" },
    { "code": "450321", "name": "阳朔县" },
    { "code": "450323", "name": "灵川县" },
    { "code": "450324", "name": "全州县" },
    { "code": "450325", "name": "兴安县" },
    { "code": "450326", "name": "永福县" },
    { "code": "450327", "name": "灌阳县" },
    { "code": "450328", "name": "龙胜各族自治县" },
    { "code": "450329", "name": "资源县" },
    { "code": "450330", "name": "平乐县" },
    { "code": "450332", "name": "恭城瑶族自治县" },
    { "code": "450381", "name": "荔浦市" }] },

  { "code": "4504", "name": "梧州市", "children": [
    { "code": "450403", "name": "万秀区" },
    { "code": "450405", "name": "长洲区" },
    { "code": "450406", "name": "龙圩区" },
    { "code": "450421", "name": "苍梧县" },
    { "code": "450422", "name": "藤县" },
    { "code": "450423", "name": "蒙山县" },
    { "code": "450481", "name": "岑溪市" }] },

  { "code": "4505", "name": "北海市", "children": [
    { "code": "450502", "name": "海城区" },
    { "code": "450503", "name": "银海区" },
    { "code": "450512", "name": "铁山港区" },
    { "code": "450521", "name": "合浦县" }] },

  { "code": "4506", "name": "防城港市", "children": [
    { "code": "450602", "name": "港口区" },
    { "code": "450603", "name": "防城区" },
    { "code": "450621", "name": "上思县" },
    { "code": "450681", "name": "东兴市" }] },

  { "code": "4507", "name": "钦州市", "children": [
    { "code": "450702", "name": "钦南区" },
    { "code": "450703", "name": "钦北区" },
    { "code": "450721", "name": "灵山县" },
    { "code": "450722", "name": "浦北县" }] },

  { "code": "4508", "name": "贵港市", "children": [
    { "code": "450802", "name": "港北区" },
    { "code": "450803", "name": "港南区" },
    { "code": "450804", "name": "覃塘区" },
    { "code": "450821", "name": "平南县" },
    { "code": "450881", "name": "桂平市" }] },

  { "code": "4509", "name": "玉林市", "children": [
    { "code": "450902", "name": "玉州区" },
    { "code": "450903", "name": "福绵区" },
    { "code": "450921", "name": "容县" },
    { "code": "450922", "name": "陆川县" },
    { "code": "450923", "name": "博白县" },
    { "code": "450924", "name": "兴业县" },
    { "code": "450981", "name": "北流市" }] },

  { "code": "4510", "name": "百色市", "children": [
    { "code": "451002", "name": "右江区" },
    { "code": "451003", "name": "田阳区" },
    { "code": "451022", "name": "田东县" },
    { "code": "451023", "name": "平果县" },
    { "code": "451024", "name": "德保县" },
    { "code": "451026", "name": "那坡县" },
    { "code": "451027", "name": "凌云县" },
    { "code": "451028", "name": "乐业县" },
    { "code": "451029", "name": "田林县" },
    { "code": "451030", "name": "西林县" },
    { "code": "451031", "name": "隆林各族自治县" },
    { "code": "451081", "name": "靖西市" }] },

  { "code": "4511", "name": "贺州市", "children": [
    { "code": "451102", "name": "八步区" },
    { "code": "451103", "name": "平桂区" },
    { "code": "451121", "name": "昭平县" },
    { "code": "451122", "name": "钟山县" },
    { "code": "451123", "name": "富川瑶族自治县" }] },

  { "code": "4512", "name": "河池市", "children": [
    { "code": "451202", "name": "金城江区" },
    { "code": "451203", "name": "宜州区" },
    { "code": "451221", "name": "南丹县" },
    { "code": "451222", "name": "天峨县" },
    { "code": "451223", "name": "凤山县" },
    { "code": "451224", "name": "东兰县" },
    { "code": "451225", "name": "罗城仫佬族自治县" },
    { "code": "451226", "name": "环江毛南族自治县" },
    { "code": "451227", "name": "巴马瑶族自治县" },
    { "code": "451228", "name": "都安瑶族自治县" },
    { "code": "451229", "name": "大化瑶族自治县" }] },

  { "code": "4513", "name": "来宾市", "children": [
    { "code": "451302", "name": "兴宾区" },
    { "code": "451321", "name": "忻城县" },
    { "code": "451322", "name": "象州县" },
    { "code": "451323", "name": "武宣县" },
    { "code": "451324", "name": "金秀瑶族自治县" },
    { "code": "451381", "name": "合山市" }] },

  { "code": "4514", "name": "崇左市", "children": [
    { "code": "451402", "name": "江州区" },
    { "code": "451421", "name": "扶绥县" },
    { "code": "451422", "name": "宁明县" },
    { "code": "451423", "name": "龙州县" },
    { "code": "451424", "name": "大新县" },
    { "code": "451425", "name": "天等县" },
    { "code": "451481", "name": "凭祥市" }] }] },



{
  "code": "46", "name": "海南省", "children": [
  { "code": "4601", "name": "海口市", "children": [
    { "code": "460105", "name": "秀英区" },
    { "code": "460106", "name": "龙华区" },
    { "code": "460107", "name": "琼山区" },
    { "code": "460108", "name": "美兰区" }] },

  { "code": "4602", "name": "三亚市", "children": [
    { "code": "460202", "name": "海棠区" },
    { "code": "460203", "name": "吉阳区" },
    { "code": "460204", "name": "天涯区" },
    { "code": "460205", "name": "崖州区" }] },

  { "code": "4603", "name": "三沙市", "children": [
    { "code": "460321", "name": "西沙群岛" },
    { "code": "460322", "name": "南沙群岛" },
    { "code": "460323", "name": "中沙群岛的岛礁及其海域" }] },

  { "code": "4604", "name": "儋州市", "children": [
    { "code": "460400100", "name": "那大镇" },
    { "code": "460400101", "name": "和庆镇" },
    { "code": "460400102", "name": "南丰镇" },
    { "code": "460400103", "name": "大成镇" },
    { "code": "460400104", "name": "雅星镇" },
    { "code": "460400105", "name": "兰洋镇" },
    { "code": "460400106", "name": "光村镇" },
    { "code": "460400107", "name": "木棠镇" },
    { "code": "460400108", "name": "海头镇" },
    { "code": "460400109", "name": "峨蔓镇" },
    { "code": "460400111", "name": "王五镇" },
    { "code": "460400112", "name": "白马井镇" },
    { "code": "460400113", "name": "中和镇" },
    { "code": "460400114", "name": "排浦镇" },
    { "code": "460400115", "name": "东成镇" },
    { "code": "460400116", "name": "新州镇" },
    { "code": "460400499", "name": "洋浦经济开发区" },
    { "code": "460400500", "name": "华南热作学院" }] },

  { "code": "4690", "name": "省直辖县级行政区划", "children": [
    { "code": "469001", "name": "五指山市" },
    { "code": "469002", "name": "琼海市" },
    { "code": "469005", "name": "文昌市" },
    { "code": "469006", "name": "万宁市" },
    { "code": "469007", "name": "东方市" },
    { "code": "469021", "name": "定安县" },
    { "code": "469022", "name": "屯昌县" },
    { "code": "469023", "name": "澄迈县" },
    { "code": "469024", "name": "临高县" },
    { "code": "469025", "name": "白沙黎族自治县" },
    { "code": "469026", "name": "昌江黎族自治县" },
    { "code": "469027", "name": "乐东黎族自治县" },
    { "code": "469028", "name": "陵水黎族自治县" },
    { "code": "469029", "name": "保亭黎族苗族自治县" },
    { "code": "469030", "name": "琼中黎族苗族自治县" }] }] },



{
  "code": "50", "name": "重庆市", "children": [
  { "code": "5001", "name": "市辖区", "children": [
    { "code": "500101", "name": "万州区" },
    { "code": "500102", "name": "涪陵区" },
    { "code": "500103", "name": "渝中区" },
    { "code": "500104", "name": "大渡口区" },
    { "code": "500105", "name": "江北区" },
    { "code": "500106", "name": "沙坪坝区" },
    { "code": "500107", "name": "九龙坡区" },
    { "code": "500108", "name": "南岸区" },
    { "code": "500109", "name": "北碚区" },
    { "code": "500110", "name": "綦江区" },
    { "code": "500111", "name": "大足区" },
    { "code": "500112", "name": "渝北区" },
    { "code": "500113", "name": "巴南区" },
    { "code": "500114", "name": "黔江区" },
    { "code": "500115", "name": "长寿区" },
    { "code": "500116", "name": "江津区" },
    { "code": "500117", "name": "合川区" },
    { "code": "500118", "name": "永川区" },
    { "code": "500119", "name": "南川区" },
    { "code": "500120", "name": "璧山区" },
    { "code": "500151", "name": "铜梁区" },
    { "code": "500152", "name": "潼南区" },
    { "code": "500153", "name": "荣昌区" },
    { "code": "500154", "name": "开州区" },
    { "code": "500155", "name": "梁平区" },
    { "code": "500156", "name": "武隆区" }] },

  { "code": "5002", "name": "县", "children": [
    { "code": "500229", "name": "城口县" },
    { "code": "500230", "name": "丰都县" },
    { "code": "500231", "name": "垫江县" },
    { "code": "500233", "name": "忠县" },
    { "code": "500235", "name": "云阳县" },
    { "code": "500236", "name": "奉节县" },
    { "code": "500237", "name": "巫山县" },
    { "code": "500238", "name": "巫溪县" },
    { "code": "500240", "name": "石柱土家族自治县" },
    { "code": "500241", "name": "秀山土家族苗族自治县" },
    { "code": "500242", "name": "酉阳土家族苗族自治县" },
    { "code": "500243", "name": "彭水苗族土家族自治县" }] }] },



{
  "code": "51", "name": "四川省", "children": [
  { "code": "5101", "name": "成都市", "children": [
    { "code": "510104", "name": "锦江区" },
    { "code": "510105", "name": "青羊区" },
    { "code": "510106", "name": "金牛区" },
    { "code": "510107", "name": "武侯区" },
    { "code": "510108", "name": "成华区" },
    { "code": "510112", "name": "龙泉驿区" },
    { "code": "510113", "name": "青白江区" },
    { "code": "510114", "name": "新都区" },
    { "code": "510115", "name": "温江区" },
    { "code": "510116", "name": "双流区" },
    { "code": "510117", "name": "郫都区" },
    { "code": "510121", "name": "金堂县" },
    { "code": "510129", "name": "大邑县" },
    { "code": "510131", "name": "蒲江县" },
    { "code": "510132", "name": "新津县" },
    { "code": "510181", "name": "都江堰市" },
    { "code": "510182", "name": "彭州市" },
    { "code": "510183", "name": "邛崃市" },
    { "code": "510184", "name": "崇州市" },
    { "code": "510185", "name": "简阳市" }] },

  { "code": "5103", "name": "自贡市", "children": [
    { "code": "510302", "name": "自流井区" },
    { "code": "510303", "name": "贡井区" },
    { "code": "510304", "name": "大安区" },
    { "code": "510311", "name": "沿滩区" },
    { "code": "510321", "name": "荣县" },
    { "code": "510322", "name": "富顺县" }] },

  { "code": "5104", "name": "攀枝花市", "children": [
    { "code": "510402", "name": "东区" },
    { "code": "510403", "name": "西区" },
    { "code": "510411", "name": "仁和区" },
    { "code": "510421", "name": "米易县" },
    { "code": "510422", "name": "盐边县" }] },

  { "code": "5105", "name": "泸州市", "children": [
    { "code": "510502", "name": "江阳区" },
    { "code": "510503", "name": "纳溪区" },
    { "code": "510504", "name": "龙马潭区" },
    { "code": "510521", "name": "泸县" },
    { "code": "510522", "name": "合江县" },
    { "code": "510524", "name": "叙永县" },
    { "code": "510525", "name": "古蔺县" }] },

  { "code": "5106", "name": "德阳市", "children": [
    { "code": "510603", "name": "旌阳区" },
    { "code": "510604", "name": "罗江区" },
    { "code": "510623", "name": "中江县" },
    { "code": "510681", "name": "广汉市" },
    { "code": "510682", "name": "什邡市" },
    { "code": "510683", "name": "绵竹市" }] },

  { "code": "5107", "name": "绵阳市", "children": [
    { "code": "510703", "name": "涪城区" },
    { "code": "510704", "name": "游仙区" },
    { "code": "510705", "name": "安州区" },
    { "code": "510722", "name": "三台县" },
    { "code": "510723", "name": "盐亭县" },
    { "code": "510725", "name": "梓潼县" },
    { "code": "510726", "name": "北川羌族自治县" },
    { "code": "510727", "name": "平武县" },
    { "code": "510781", "name": "江油市" }] },

  { "code": "5108", "name": "广元市", "children": [
    { "code": "510802", "name": "利州区" },
    { "code": "510811", "name": "昭化区" },
    { "code": "510812", "name": "朝天区" },
    { "code": "510821", "name": "旺苍县" },
    { "code": "510822", "name": "青川县" },
    { "code": "510823", "name": "剑阁县" },
    { "code": "510824", "name": "苍溪县" }] },

  { "code": "5109", "name": "遂宁市", "children": [
    { "code": "510903", "name": "船山区" },
    { "code": "510904", "name": "安居区" },
    { "code": "510921", "name": "蓬溪县" },
    { "code": "510923", "name": "大英县" },
    { "code": "510981", "name": "射洪市" }] },

  { "code": "5110", "name": "内江市", "children": [
    { "code": "511002", "name": "市中区" },
    { "code": "511011", "name": "东兴区" },
    { "code": "511024", "name": "威远县" },
    { "code": "511025", "name": "资中县" },
    { "code": "511071", "name": "内江经济开发区" },
    { "code": "511083", "name": "隆昌市" }] },

  { "code": "5111", "name": "乐山市", "children": [
    { "code": "511102", "name": "市中区" },
    { "code": "511111", "name": "沙湾区" },
    { "code": "511112", "name": "五通桥区" },
    { "code": "511113", "name": "金口河区" },
    { "code": "511123", "name": "犍为县" },
    { "code": "511124", "name": "井研县" },
    { "code": "511126", "name": "夹江县" },
    { "code": "511129", "name": "沐川县" },
    { "code": "511132", "name": "峨边彝族自治县" },
    { "code": "511133", "name": "马边彝族自治县" },
    { "code": "511181", "name": "峨眉山市" }] },

  { "code": "5113", "name": "南充市", "children": [
    { "code": "511302", "name": "顺庆区" },
    { "code": "511303", "name": "高坪区" },
    { "code": "511304", "name": "嘉陵区" },
    { "code": "511321", "name": "南部县" },
    { "code": "511322", "name": "营山县" },
    { "code": "511323", "name": "蓬安县" },
    { "code": "511324", "name": "仪陇县" },
    { "code": "511325", "name": "西充县" },
    { "code": "511381", "name": "阆中市" }] },

  { "code": "5114", "name": "眉山市", "children": [
    { "code": "511402", "name": "东坡区" },
    { "code": "511403", "name": "彭山区" },
    { "code": "511421", "name": "仁寿县" },
    { "code": "511423", "name": "洪雅县" },
    { "code": "511424", "name": "丹棱县" },
    { "code": "511425", "name": "青神县" }] },

  { "code": "5115", "name": "宜宾市", "children": [
    { "code": "511502", "name": "翠屏区" },
    { "code": "511503", "name": "南溪区" },
    { "code": "511504", "name": "叙州区" },
    { "code": "511523", "name": "江安县" },
    { "code": "511524", "name": "长宁县" },
    { "code": "511525", "name": "高县" },
    { "code": "511526", "name": "珙县" },
    { "code": "511527", "name": "筠连县" },
    { "code": "511528", "name": "兴文县" },
    { "code": "511529", "name": "屏山县" }] },

  { "code": "5116", "name": "广安市", "children": [
    { "code": "511602", "name": "广安区" },
    { "code": "511603", "name": "前锋区" },
    { "code": "511621", "name": "岳池县" },
    { "code": "511622", "name": "武胜县" },
    { "code": "511623", "name": "邻水县" },
    { "code": "511681", "name": "华蓥市" }] },

  { "code": "5117", "name": "达州市", "children": [
    { "code": "511702", "name": "通川区" },
    { "code": "511703", "name": "达川区" },
    { "code": "511722", "name": "宣汉县" },
    { "code": "511723", "name": "开江县" },
    { "code": "511724", "name": "大竹县" },
    { "code": "511725", "name": "渠县" },
    { "code": "511771", "name": "达州经济开发区" },
    { "code": "511781", "name": "万源市" }] },

  { "code": "5118", "name": "雅安市", "children": [
    { "code": "511802", "name": "雨城区" },
    { "code": "511803", "name": "名山区" },
    { "code": "511822", "name": "荥经县" },
    { "code": "511823", "name": "汉源县" },
    { "code": "511824", "name": "石棉县" },
    { "code": "511825", "name": "天全县" },
    { "code": "511826", "name": "芦山县" },
    { "code": "511827", "name": "宝兴县" }] },

  { "code": "5119", "name": "巴中市", "children": [
    { "code": "511902", "name": "巴州区" },
    { "code": "511903", "name": "恩阳区" },
    { "code": "511921", "name": "通江县" },
    { "code": "511922", "name": "南江县" },
    { "code": "511923", "name": "平昌县" },
    { "code": "511971", "name": "巴中经济开发区" }] },

  { "code": "5120", "name": "资阳市", "children": [
    { "code": "512002", "name": "雁江区" },
    { "code": "512021", "name": "安岳县" },
    { "code": "512022", "name": "乐至县" }] },

  { "code": "5132", "name": "阿坝藏族羌族自治州", "children": [
    { "code": "513201", "name": "马尔康市" },
    { "code": "513221", "name": "汶川县" },
    { "code": "513222", "name": "理县" },
    { "code": "513223", "name": "茂县" },
    { "code": "513224", "name": "松潘县" },
    { "code": "513225", "name": "九寨沟县" },
    { "code": "513226", "name": "金川县" },
    { "code": "513227", "name": "小金县" },
    { "code": "513228", "name": "黑水县" },
    { "code": "513230", "name": "壤塘县" },
    { "code": "513231", "name": "阿坝县" },
    { "code": "513232", "name": "若尔盖县" },
    { "code": "513233", "name": "红原县" }] },

  { "code": "5133", "name": "甘孜藏族自治州", "children": [
    { "code": "513301", "name": "康定市" },
    { "code": "513322", "name": "泸定县" },
    { "code": "513323", "name": "丹巴县" },
    { "code": "513324", "name": "九龙县" },
    { "code": "513325", "name": "雅江县" },
    { "code": "513326", "name": "道孚县" },
    { "code": "513327", "name": "炉霍县" },
    { "code": "513328", "name": "甘孜县" },
    { "code": "513329", "name": "新龙县" },
    { "code": "513330", "name": "德格县" },
    { "code": "513331", "name": "白玉县" },
    { "code": "513332", "name": "石渠县" },
    { "code": "513333", "name": "色达县" },
    { "code": "513334", "name": "理塘县" },
    { "code": "513335", "name": "巴塘县" },
    { "code": "513336", "name": "乡城县" },
    { "code": "513337", "name": "稻城县" },
    { "code": "513338", "name": "得荣县" }] },

  { "code": "5134", "name": "凉山彝族自治州", "children": [
    { "code": "513401", "name": "西昌市" },
    { "code": "513422", "name": "木里藏族自治县" },
    { "code": "513423", "name": "盐源县" },
    { "code": "513424", "name": "德昌县" },
    { "code": "513425", "name": "会理县" },
    { "code": "513426", "name": "会东县" },
    { "code": "513427", "name": "宁南县" },
    { "code": "513428", "name": "普格县" },
    { "code": "513429", "name": "布拖县" },
    { "code": "513430", "name": "金阳县" },
    { "code": "513431", "name": "昭觉县" },
    { "code": "513432", "name": "喜德县" },
    { "code": "513433", "name": "冕宁县" },
    { "code": "513434", "name": "越西县" },
    { "code": "513435", "name": "甘洛县" },
    { "code": "513436", "name": "美姑县" },
    { "code": "513437", "name": "雷波县" }] }] },



{
  "code": "52", "name": "贵州省", "children": [
  { "code": "5201", "name": "贵阳市", "children": [
    { "code": "520102", "name": "南明区" },
    { "code": "520103", "name": "云岩区" },
    { "code": "520111", "name": "花溪区" },
    { "code": "520112", "name": "乌当区" },
    { "code": "520113", "name": "白云区" },
    { "code": "520115", "name": "观山湖区" },
    { "code": "520121", "name": "开阳县" },
    { "code": "520122", "name": "息烽县" },
    { "code": "520123", "name": "修文县" },
    { "code": "520181", "name": "清镇市" }] },

  { "code": "5202", "name": "六盘水市", "children": [
    { "code": "520201", "name": "钟山区" },
    { "code": "520203", "name": "六枝特区" },
    { "code": "520221", "name": "水城县" },
    { "code": "520281", "name": "盘州市" }] },

  { "code": "5203", "name": "遵义市", "children": [
    { "code": "520302", "name": "红花岗区" },
    { "code": "520303", "name": "汇川区" },
    { "code": "520304", "name": "播州区" },
    { "code": "520322", "name": "桐梓县" },
    { "code": "520323", "name": "绥阳县" },
    { "code": "520324", "name": "正安县" },
    { "code": "520325", "name": "道真仡佬族苗族自治县" },
    { "code": "520326", "name": "务川仡佬族苗族自治县" },
    { "code": "520327", "name": "凤冈县" },
    { "code": "520328", "name": "湄潭县" },
    { "code": "520329", "name": "余庆县" },
    { "code": "520330", "name": "习水县" },
    { "code": "520381", "name": "赤水市" },
    { "code": "520382", "name": "仁怀市" }] },

  { "code": "5204", "name": "安顺市", "children": [
    { "code": "520402", "name": "西秀区" },
    { "code": "520403", "name": "平坝区" },
    { "code": "520422", "name": "普定县" },
    { "code": "520423", "name": "镇宁布依族苗族自治县" },
    { "code": "520424", "name": "关岭布依族苗族自治县" },
    { "code": "520425", "name": "紫云苗族布依族自治县" }] },

  { "code": "5205", "name": "毕节市", "children": [
    { "code": "520502", "name": "七星关区" },
    { "code": "520521", "name": "大方县" },
    { "code": "520522", "name": "黔西县" },
    { "code": "520523", "name": "金沙县" },
    { "code": "520524", "name": "织金县" },
    { "code": "520525", "name": "纳雍县" },
    { "code": "520526", "name": "威宁彝族回族苗族自治县" },
    { "code": "520527", "name": "赫章县" }] },

  { "code": "5206", "name": "铜仁市", "children": [
    { "code": "520602", "name": "碧江区" },
    { "code": "520603", "name": "万山区" },
    { "code": "520621", "name": "江口县" },
    { "code": "520622", "name": "玉屏侗族自治县" },
    { "code": "520623", "name": "石阡县" },
    { "code": "520624", "name": "思南县" },
    { "code": "520625", "name": "印江土家族苗族自治县" },
    { "code": "520626", "name": "德江县" },
    { "code": "520627", "name": "沿河土家族自治县" },
    { "code": "520628", "name": "松桃苗族自治县" }] },

  { "code": "5223", "name": "黔西南布依族苗族自治州", "children": [
    { "code": "522301", "name": "兴义市" },
    { "code": "522302", "name": "兴仁市" },
    { "code": "522323", "name": "普安县" },
    { "code": "522324", "name": "晴隆县" },
    { "code": "522325", "name": "贞丰县" },
    { "code": "522326", "name": "望谟县" },
    { "code": "522327", "name": "册亨县" },
    { "code": "522328", "name": "安龙县" }] },

  { "code": "5226", "name": "黔东南苗族侗族自治州", "children": [
    { "code": "522601", "name": "凯里市" },
    { "code": "522622", "name": "黄平县" },
    { "code": "522623", "name": "施秉县" },
    { "code": "522624", "name": "三穗县" },
    { "code": "522625", "name": "镇远县" },
    { "code": "522626", "name": "岑巩县" },
    { "code": "522627", "name": "天柱县" },
    { "code": "522628", "name": "锦屏县" },
    { "code": "522629", "name": "剑河县" },
    { "code": "522630", "name": "台江县" },
    { "code": "522631", "name": "黎平县" },
    { "code": "522632", "name": "榕江县" },
    { "code": "522633", "name": "从江县" },
    { "code": "522634", "name": "雷山县" },
    { "code": "522635", "name": "麻江县" },
    { "code": "522636", "name": "丹寨县" }] },

  { "code": "5227", "name": "黔南布依族苗族自治州", "children": [
    { "code": "522701", "name": "都匀市" },
    { "code": "522702", "name": "福泉市" },
    { "code": "522722", "name": "荔波县" },
    { "code": "522723", "name": "贵定县" },
    { "code": "522725", "name": "瓮安县" },
    { "code": "522726", "name": "独山县" },
    { "code": "522727", "name": "平塘县" },
    { "code": "522728", "name": "罗甸县" },
    { "code": "522729", "name": "长顺县" },
    { "code": "522730", "name": "龙里县" },
    { "code": "522731", "name": "惠水县" },
    { "code": "522732", "name": "三都水族自治县" }] }] },



{
  "code": "53", "name": "云南省", "children": [
  { "code": "5301", "name": "昆明市", "children": [
    { "code": "530102", "name": "五华区" },
    { "code": "530103", "name": "盘龙区" },
    { "code": "530111", "name": "官渡区" },
    { "code": "530112", "name": "西山区" },
    { "code": "530113", "name": "东川区" },
    { "code": "530114", "name": "呈贡区" },
    { "code": "530115", "name": "晋宁区" },
    { "code": "530124", "name": "富民县" },
    { "code": "530125", "name": "宜良县" },
    { "code": "530126", "name": "石林彝族自治县" },
    { "code": "530127", "name": "嵩明县" },
    { "code": "530128", "name": "禄劝彝族苗族自治县" },
    { "code": "530129", "name": "寻甸回族彝族自治县" },
    { "code": "530181", "name": "安宁市" }] },

  { "code": "5303", "name": "曲靖市", "children": [
    { "code": "530302", "name": "麒麟区" },
    { "code": "530303", "name": "沾益区" },
    { "code": "530304", "name": "马龙区" },
    { "code": "530322", "name": "陆良县" },
    { "code": "530323", "name": "师宗县" },
    { "code": "530324", "name": "罗平县" },
    { "code": "530325", "name": "富源县" },
    { "code": "530326", "name": "会泽县" },
    { "code": "530381", "name": "宣威市" }] },

  { "code": "5304", "name": "玉溪市", "children": [
    { "code": "530402", "name": "红塔区" },
    { "code": "530403", "name": "江川区" },
    { "code": "530422", "name": "澄江县" },
    { "code": "530423", "name": "通海县" },
    { "code": "530424", "name": "华宁县" },
    { "code": "530425", "name": "易门县" },
    { "code": "530426", "name": "峨山彝族自治县" },
    { "code": "530427", "name": "新平彝族傣族自治县" },
    { "code": "530428", "name": "元江哈尼族彝族傣族自治县" }] },

  { "code": "5305", "name": "保山市", "children": [
    { "code": "530502", "name": "隆阳区" },
    { "code": "530521", "name": "施甸县" },
    { "code": "530523", "name": "龙陵县" },
    { "code": "530524", "name": "昌宁县" },
    { "code": "530581", "name": "腾冲市" }] },

  { "code": "5306", "name": "昭通市", "children": [
    { "code": "530602", "name": "昭阳区" },
    { "code": "530621", "name": "鲁甸县" },
    { "code": "530622", "name": "巧家县" },
    { "code": "530623", "name": "盐津县" },
    { "code": "530624", "name": "大关县" },
    { "code": "530625", "name": "永善县" },
    { "code": "530626", "name": "绥江县" },
    { "code": "530627", "name": "镇雄县" },
    { "code": "530628", "name": "彝良县" },
    { "code": "530629", "name": "威信县" },
    { "code": "530681", "name": "水富市" }] },

  { "code": "5307", "name": "丽江市", "children": [
    { "code": "530702", "name": "古城区" },
    { "code": "530721", "name": "玉龙纳西族自治县" },
    { "code": "530722", "name": "永胜县" },
    { "code": "530723", "name": "华坪县" },
    { "code": "530724", "name": "宁蒗彝族自治县" }] },

  { "code": "5308", "name": "普洱市", "children": [
    { "code": "530802", "name": "思茅区" },
    { "code": "530821", "name": "宁洱哈尼族彝族自治县" },
    { "code": "530822", "name": "墨江哈尼族自治县" },
    { "code": "530823", "name": "景东彝族自治县" },
    { "code": "530824", "name": "景谷傣族彝族自治县" },
    { "code": "530825", "name": "镇沅彝族哈尼族拉祜族自治县" },
    { "code": "530826", "name": "江城哈尼族彝族自治县" },
    { "code": "530827", "name": "孟连傣族拉祜族佤族自治县" },
    { "code": "530828", "name": "澜沧拉祜族自治县" },
    { "code": "530829", "name": "西盟佤族自治县" }] },

  { "code": "5309", "name": "临沧市", "children": [
    { "code": "530902", "name": "临翔区" },
    { "code": "530921", "name": "凤庆县" },
    { "code": "530922", "name": "云县" },
    { "code": "530923", "name": "永德县" },
    { "code": "530924", "name": "镇康县" },
    { "code": "530925", "name": "双江拉祜族佤族布朗族傣族自治县" },
    { "code": "530926", "name": "耿马傣族佤族自治县" },
    { "code": "530927", "name": "沧源佤族自治县" }] },

  { "code": "5323", "name": "楚雄彝族自治州", "children": [
    { "code": "532301", "name": "楚雄市" },
    { "code": "532322", "name": "双柏县" },
    { "code": "532323", "name": "牟定县" },
    { "code": "532324", "name": "南华县" },
    { "code": "532325", "name": "姚安县" },
    { "code": "532326", "name": "大姚县" },
    { "code": "532327", "name": "永仁县" },
    { "code": "532328", "name": "元谋县" },
    { "code": "532329", "name": "武定县" },
    { "code": "532331", "name": "禄丰县" }] },

  { "code": "5325", "name": "红河哈尼族彝族自治州", "children": [
    { "code": "532501", "name": "个旧市" },
    { "code": "532502", "name": "开远市" },
    { "code": "532503", "name": "蒙自市" },
    { "code": "532504", "name": "弥勒市" },
    { "code": "532523", "name": "屏边苗族自治县" },
    { "code": "532524", "name": "建水县" },
    { "code": "532525", "name": "石屏县" },
    { "code": "532527", "name": "泸西县" },
    { "code": "532528", "name": "元阳县" },
    { "code": "532529", "name": "红河县" },
    { "code": "532530", "name": "金平苗族瑶族傣族自治县" },
    { "code": "532531", "name": "绿春县" },
    { "code": "532532", "name": "河口瑶族自治县" }] },

  { "code": "5326", "name": "文山壮族苗族自治州", "children": [
    { "code": "532601", "name": "文山市" },
    { "code": "532622", "name": "砚山县" },
    { "code": "532623", "name": "西畴县" },
    { "code": "532624", "name": "麻栗坡县" },
    { "code": "532625", "name": "马关县" },
    { "code": "532626", "name": "丘北县" },
    { "code": "532627", "name": "广南县" },
    { "code": "532628", "name": "富宁县" }] },

  { "code": "5328", "name": "西双版纳傣族自治州", "children": [
    { "code": "532801", "name": "景洪市" },
    { "code": "532822", "name": "勐海县" },
    { "code": "532823", "name": "勐腊县" }] },

  { "code": "5329", "name": "大理白族自治州", "children": [
    { "code": "532901", "name": "大理市" },
    { "code": "532922", "name": "漾濞彝族自治县" },
    { "code": "532923", "name": "祥云县" },
    { "code": "532924", "name": "宾川县" },
    { "code": "532925", "name": "弥渡县" },
    { "code": "532926", "name": "南涧彝族自治县" },
    { "code": "532927", "name": "巍山彝族回族自治县" },
    { "code": "532928", "name": "永平县" },
    { "code": "532929", "name": "云龙县" },
    { "code": "532930", "name": "洱源县" },
    { "code": "532931", "name": "剑川县" },
    { "code": "532932", "name": "鹤庆县" }] },

  { "code": "5331", "name": "德宏傣族景颇族自治州", "children": [
    { "code": "533102", "name": "瑞丽市" },
    { "code": "533103", "name": "芒市" },
    { "code": "533122", "name": "梁河县" },
    { "code": "533123", "name": "盈江县" },
    { "code": "533124", "name": "陇川县" }] },

  { "code": "5333", "name": "怒江傈僳族自治州", "children": [
    { "code": "533301", "name": "泸水市" },
    { "code": "533323", "name": "福贡县" },
    { "code": "533324", "name": "贡山独龙族怒族自治县" },
    { "code": "533325", "name": "兰坪白族普米族自治县" }] },

  { "code": "5334", "name": "迪庆藏族自治州", "children": [
    { "code": "533401", "name": "香格里拉市" },
    { "code": "533422", "name": "德钦县" },
    { "code": "533423", "name": "维西傈僳族自治县" }] }] },



{
  "code": "54", "name": "西藏自治区", "children": [
  { "code": "5401", "name": "拉萨市", "children": [
    { "code": "540102", "name": "城关区" },
    { "code": "540103", "name": "堆龙德庆区" },
    { "code": "540104", "name": "达孜区" },
    { "code": "540121", "name": "林周县" },
    { "code": "540122", "name": "当雄县" },
    { "code": "540123", "name": "尼木县" },
    { "code": "540124", "name": "曲水县" },
    { "code": "540127", "name": "墨竹工卡县" },
    { "code": "540171", "name": "格尔木藏青工业园区" },
    { "code": "540172", "name": "拉萨经济技术开发区" },
    { "code": "540173", "name": "西藏文化旅游创意园区" },
    { "code": "540174", "name": "达孜工业园区" }] },

  { "code": "5402", "name": "日喀则市", "children": [
    { "code": "540202", "name": "桑珠孜区" },
    { "code": "540221", "name": "南木林县" },
    { "code": "540222", "name": "江孜县" },
    { "code": "540223", "name": "定日县" },
    { "code": "540224", "name": "萨迦县" },
    { "code": "540225", "name": "拉孜县" },
    { "code": "540226", "name": "昂仁县" },
    { "code": "540227", "name": "谢通门县" },
    { "code": "540228", "name": "白朗县" },
    { "code": "540229", "name": "仁布县" },
    { "code": "540230", "name": "康马县" },
    { "code": "540231", "name": "定结县" },
    { "code": "540232", "name": "仲巴县" },
    { "code": "540233", "name": "亚东县" },
    { "code": "540234", "name": "吉隆县" },
    { "code": "540235", "name": "聂拉木县" },
    { "code": "540236", "name": "萨嘎县" },
    { "code": "540237", "name": "岗巴县" }] },

  { "code": "5403", "name": "昌都市", "children": [
    { "code": "540302", "name": "卡若区" },
    { "code": "540321", "name": "江达县" },
    { "code": "540322", "name": "贡觉县" },
    { "code": "540323", "name": "类乌齐县" },
    { "code": "540324", "name": "丁青县" },
    { "code": "540325", "name": "察雅县" },
    { "code": "540326", "name": "八宿县" },
    { "code": "540327", "name": "左贡县" },
    { "code": "540328", "name": "芒康县" },
    { "code": "540329", "name": "洛隆县" },
    { "code": "540330", "name": "边坝县" }] },

  { "code": "5404", "name": "林芝市", "children": [
    { "code": "540402", "name": "巴宜区" },
    { "code": "540421", "name": "工布江达县" },
    { "code": "540422", "name": "米林县" },
    { "code": "540423", "name": "墨脱县" },
    { "code": "540424", "name": "波密县" },
    { "code": "540425", "name": "察隅县" },
    { "code": "540426", "name": "朗县" }] },

  { "code": "5405", "name": "山南市", "children": [
    { "code": "540502", "name": "乃东区" },
    { "code": "540521", "name": "扎囊县" },
    { "code": "540522", "name": "贡嘎县" },
    { "code": "540523", "name": "桑日县" },
    { "code": "540524", "name": "琼结县" },
    { "code": "540525", "name": "曲松县" },
    { "code": "540526", "name": "措美县" },
    { "code": "540527", "name": "洛扎县" },
    { "code": "540528", "name": "加查县" },
    { "code": "540529", "name": "隆子县" },
    { "code": "540530", "name": "错那县" },
    { "code": "540531", "name": "浪卡子县" }] },

  { "code": "5406", "name": "那曲市", "children": [
    { "code": "540602", "name": "色尼区" },
    { "code": "540621", "name": "嘉黎县" },
    { "code": "540622", "name": "比如县" },
    { "code": "540623", "name": "聂荣县" },
    { "code": "540624", "name": "安多县" },
    { "code": "540625", "name": "申扎县" },
    { "code": "540626", "name": "索县" },
    { "code": "540627", "name": "班戈县" },
    { "code": "540628", "name": "巴青县" },
    { "code": "540629", "name": "尼玛县" },
    { "code": "540630", "name": "双湖县" }] },

  { "code": "5425", "name": "阿里地区", "children": [
    { "code": "542521", "name": "普兰县" },
    { "code": "542522", "name": "札达县" },
    { "code": "542523", "name": "噶尔县" },
    { "code": "542524", "name": "日土县" },
    { "code": "542525", "name": "革吉县" },
    { "code": "542526", "name": "改则县" },
    { "code": "542527", "name": "措勤县" }] }] },



{
  "code": "61", "name": "陕西省", "children": [
  { "code": "6101", "name": "西安市", "children": [
    { "code": "610102", "name": "新城区" },
    { "code": "610103", "name": "碑林区" },
    { "code": "610104", "name": "莲湖区" },
    { "code": "610111", "name": "灞桥区" },
    { "code": "610112", "name": "未央区" },
    { "code": "610113", "name": "雁塔区" },
    { "code": "610114", "name": "阎良区" },
    { "code": "610115", "name": "临潼区" },
    { "code": "610116", "name": "长安区" },
    { "code": "610117", "name": "高陵区" },
    { "code": "610118", "name": "鄠邑区" },
    { "code": "610122", "name": "蓝田县" },
    { "code": "610124", "name": "周至县" }] },

  { "code": "6102", "name": "铜川市", "children": [
    { "code": "610202", "name": "王益区" },
    { "code": "610203", "name": "印台区" },
    { "code": "610204", "name": "耀州区" },
    { "code": "610222", "name": "宜君县" }] },

  { "code": "6103", "name": "宝鸡市", "children": [
    { "code": "610302", "name": "渭滨区" },
    { "code": "610303", "name": "金台区" },
    { "code": "610304", "name": "陈仓区" },
    { "code": "610322", "name": "凤翔县" },
    { "code": "610323", "name": "岐山县" },
    { "code": "610324", "name": "扶风县" },
    { "code": "610326", "name": "眉县" },
    { "code": "610327", "name": "陇县" },
    { "code": "610328", "name": "千阳县" },
    { "code": "610329", "name": "麟游县" },
    { "code": "610330", "name": "凤县" },
    { "code": "610331", "name": "太白县" }] },

  { "code": "6104", "name": "咸阳市", "children": [
    { "code": "610402", "name": "秦都区" },
    { "code": "610403", "name": "杨陵区" },
    { "code": "610404", "name": "渭城区" },
    { "code": "610422", "name": "三原县" },
    { "code": "610423", "name": "泾阳县" },
    { "code": "610424", "name": "乾县" },
    { "code": "610425", "name": "礼泉县" },
    { "code": "610426", "name": "永寿县" },
    { "code": "610428", "name": "长武县" },
    { "code": "610429", "name": "旬邑县" },
    { "code": "610430", "name": "淳化县" },
    { "code": "610431", "name": "武功县" },
    { "code": "610481", "name": "兴平市" },
    { "code": "610482", "name": "彬州市" }] },

  { "code": "6105", "name": "渭南市", "children": [
    { "code": "610502", "name": "临渭区" },
    { "code": "610503", "name": "华州区" },
    { "code": "610522", "name": "潼关县" },
    { "code": "610523", "name": "大荔县" },
    { "code": "610524", "name": "合阳县" },
    { "code": "610525", "name": "澄城县" },
    { "code": "610526", "name": "蒲城县" },
    { "code": "610527", "name": "白水县" },
    { "code": "610528", "name": "富平县" },
    { "code": "610581", "name": "韩城市" },
    { "code": "610582", "name": "华阴市" }] },

  { "code": "6106", "name": "延安市", "children": [
    { "code": "610602", "name": "宝塔区" },
    { "code": "610603", "name": "安塞区" },
    { "code": "610621", "name": "延长县" },
    { "code": "610622", "name": "延川县" },
    { "code": "610625", "name": "志丹县" },
    { "code": "610626", "name": "吴起县" },
    { "code": "610627", "name": "甘泉县" },
    { "code": "610628", "name": "富县" },
    { "code": "610629", "name": "洛川县" },
    { "code": "610630", "name": "宜川县" },
    { "code": "610631", "name": "黄龙县" },
    { "code": "610632", "name": "黄陵县" },
    { "code": "610681", "name": "子长市" }] },

  { "code": "6107", "name": "汉中市", "children": [
    { "code": "610702", "name": "汉台区" },
    { "code": "610703", "name": "南郑区" },
    { "code": "610722", "name": "城固县" },
    { "code": "610723", "name": "洋县" },
    { "code": "610724", "name": "西乡县" },
    { "code": "610725", "name": "勉县" },
    { "code": "610726", "name": "宁强县" },
    { "code": "610727", "name": "略阳县" },
    { "code": "610728", "name": "镇巴县" },
    { "code": "610729", "name": "留坝县" },
    { "code": "610730", "name": "佛坪县" }] },

  { "code": "6108", "name": "榆林市", "children": [
    { "code": "610802", "name": "榆阳区" },
    { "code": "610803", "name": "横山区" },
    { "code": "610822", "name": "府谷县" },
    { "code": "610824", "name": "靖边县" },
    { "code": "610825", "name": "定边县" },
    { "code": "610826", "name": "绥德县" },
    { "code": "610827", "name": "米脂县" },
    { "code": "610828", "name": "佳县" },
    { "code": "610829", "name": "吴堡县" },
    { "code": "610830", "name": "清涧县" },
    { "code": "610831", "name": "子洲县" },
    { "code": "610881", "name": "神木市" }] },

  { "code": "6109", "name": "安康市", "children": [
    { "code": "610902", "name": "汉滨区" },
    { "code": "610921", "name": "汉阴县" },
    { "code": "610922", "name": "石泉县" },
    { "code": "610923", "name": "宁陕县" },
    { "code": "610924", "name": "紫阳县" },
    { "code": "610925", "name": "岚皋县" },
    { "code": "610926", "name": "平利县" },
    { "code": "610927", "name": "镇坪县" },
    { "code": "610928", "name": "旬阳县" },
    { "code": "610929", "name": "白河县" }] },

  { "code": "6110", "name": "商洛市", "children": [
    { "code": "611002", "name": "商州区" },
    { "code": "611021", "name": "洛南县" },
    { "code": "611022", "name": "丹凤县" },
    { "code": "611023", "name": "商南县" },
    { "code": "611024", "name": "山阳县" },
    { "code": "611025", "name": "镇安县" },
    { "code": "611026", "name": "柞水县" }] }] },



{
  "code": "62", "name": "甘肃省", "children": [
  { "code": "6201", "name": "兰州市", "children": [
    { "code": "620102", "name": "城关区" },
    { "code": "620103", "name": "七里河区" },
    { "code": "620104", "name": "西固区" },
    { "code": "620105", "name": "安宁区" },
    { "code": "620111", "name": "红古区" },
    { "code": "620121", "name": "永登县" },
    { "code": "620122", "name": "皋兰县" },
    { "code": "620123", "name": "榆中县" },
    { "code": "620171", "name": "兰州新区" }] },

  { "code": "6202", "name": "嘉峪关市", "children": [
    { "code": "620201100", "name": "新城镇" },
    { "code": "620201101", "name": "峪泉镇" },
    { "code": "620201102", "name": "文殊镇" },
    { "code": "620201401", "name": "雄关区" },
    { "code": "620201402", "name": "镜铁区" },
    { "code": "620201403", "name": "长城区" }] },

  { "code": "6203", "name": "金昌市", "children": [
    { "code": "620302", "name": "金川区" },
    { "code": "620321", "name": "永昌县" }] },

  { "code": "6204", "name": "白银市", "children": [
    { "code": "620402", "name": "白银区" },
    { "code": "620403", "name": "平川区" },
    { "code": "620421", "name": "靖远县" },
    { "code": "620422", "name": "会宁县" },
    { "code": "620423", "name": "景泰县" }] },

  { "code": "6205", "name": "天水市", "children": [
    { "code": "620502", "name": "秦州区" },
    { "code": "620503", "name": "麦积区" },
    { "code": "620521", "name": "清水县" },
    { "code": "620522", "name": "秦安县" },
    { "code": "620523", "name": "甘谷县" },
    { "code": "620524", "name": "武山县" },
    { "code": "620525", "name": "张家川回族自治县" }] },

  { "code": "6206", "name": "武威市", "children": [
    { "code": "620602", "name": "凉州区" },
    { "code": "620621", "name": "民勤县" },
    { "code": "620622", "name": "古浪县" },
    { "code": "620623", "name": "天祝藏族自治县" }] },

  { "code": "6207", "name": "张掖市", "children": [
    { "code": "620702", "name": "甘州区" },
    { "code": "620721", "name": "肃南裕固族自治县" },
    { "code": "620722", "name": "民乐县" },
    { "code": "620723", "name": "临泽县" },
    { "code": "620724", "name": "高台县" },
    { "code": "620725", "name": "山丹县" }] },

  { "code": "6208", "name": "平凉市", "children": [
    { "code": "620802", "name": "崆峒区" },
    { "code": "620821", "name": "泾川县" },
    { "code": "620822", "name": "灵台县" },
    { "code": "620823", "name": "崇信县" },
    { "code": "620825", "name": "庄浪县" },
    { "code": "620826", "name": "静宁县" },
    { "code": "620881", "name": "华亭市" }] },

  { "code": "6209", "name": "酒泉市", "children": [
    { "code": "620902", "name": "肃州区" },
    { "code": "620921", "name": "金塔县" },
    { "code": "620922", "name": "瓜州县" },
    { "code": "620923", "name": "肃北蒙古族自治县" },
    { "code": "620924", "name": "阿克塞哈萨克族自治县" },
    { "code": "620981", "name": "玉门市" },
    { "code": "620982", "name": "敦煌市" }] },

  { "code": "6210", "name": "庆阳市", "children": [
    { "code": "621002", "name": "西峰区" },
    { "code": "621021", "name": "庆城县" },
    { "code": "621022", "name": "环县" },
    { "code": "621023", "name": "华池县" },
    { "code": "621024", "name": "合水县" },
    { "code": "621025", "name": "正宁县" },
    { "code": "621026", "name": "宁县" },
    { "code": "621027", "name": "镇原县" }] },

  { "code": "6211", "name": "定西市", "children": [
    { "code": "621102", "name": "安定区" },
    { "code": "621121", "name": "通渭县" },
    { "code": "621122", "name": "陇西县" },
    { "code": "621123", "name": "渭源县" },
    { "code": "621124", "name": "临洮县" },
    { "code": "621125", "name": "漳县" },
    { "code": "621126", "name": "岷县" }] },

  { "code": "6212", "name": "陇南市", "children": [
    { "code": "621202", "name": "武都区" },
    { "code": "621221", "name": "成县" },
    { "code": "621222", "name": "文县" },
    { "code": "621223", "name": "宕昌县" },
    { "code": "621224", "name": "康县" },
    { "code": "621225", "name": "西和县" },
    { "code": "621226", "name": "礼县" },
    { "code": "621227", "name": "徽县" },
    { "code": "621228", "name": "两当县" }] },

  { "code": "6229", "name": "临夏回族自治州", "children": [
    { "code": "622901", "name": "临夏市" },
    { "code": "622921", "name": "临夏县" },
    { "code": "622922", "name": "康乐县" },
    { "code": "622923", "name": "永靖县" },
    { "code": "622924", "name": "广河县" },
    { "code": "622925", "name": "和政县" },
    { "code": "622926", "name": "东乡族自治县" },
    { "code": "622927", "name": "积石山保安族东乡族撒拉族自治县" }] },

  { "code": "6230", "name": "甘南藏族自治州", "children": [
    { "code": "623001", "name": "合作市" },
    { "code": "623021", "name": "临潭县" },
    { "code": "623022", "name": "卓尼县" },
    { "code": "623023", "name": "舟曲县" },
    { "code": "623024", "name": "迭部县" },
    { "code": "623025", "name": "玛曲县" },
    { "code": "623026", "name": "碌曲县" },
    { "code": "623027", "name": "夏河县" }] }] },



{
  "code": "63", "name": "青海省", "children": [
  { "code": "6301", "name": "西宁市", "children": [
    { "code": "630102", "name": "城东区" },
    { "code": "630103", "name": "城中区" },
    { "code": "630104", "name": "城西区" },
    { "code": "630105", "name": "城北区" },
    { "code": "630121", "name": "大通回族土族自治县" },
    { "code": "630122", "name": "湟中县" },
    { "code": "630123", "name": "湟源县" }] },

  { "code": "6302", "name": "海东市", "children": [
    { "code": "630202", "name": "乐都区" },
    { "code": "630203", "name": "平安区" },
    { "code": "630222", "name": "民和回族土族自治县" },
    { "code": "630223", "name": "互助土族自治县" },
    { "code": "630224", "name": "化隆回族自治县" },
    { "code": "630225", "name": "循化撒拉族自治县" }] },

  { "code": "6322", "name": "海北藏族自治州", "children": [
    { "code": "632221", "name": "门源回族自治县" },
    { "code": "632222", "name": "祁连县" },
    { "code": "632223", "name": "海晏县" },
    { "code": "632224", "name": "刚察县" }] },

  { "code": "6323", "name": "黄南藏族自治州", "children": [
    { "code": "632321", "name": "同仁县" },
    { "code": "632322", "name": "尖扎县" },
    { "code": "632323", "name": "泽库县" },
    { "code": "632324", "name": "河南蒙古族自治县" }] },

  { "code": "6325", "name": "海南藏族自治州", "children": [
    { "code": "632521", "name": "共和县" },
    { "code": "632522", "name": "同德县" },
    { "code": "632523", "name": "贵德县" },
    { "code": "632524", "name": "兴海县" },
    { "code": "632525", "name": "贵南县" }] },

  { "code": "6326", "name": "果洛藏族自治州", "children": [
    { "code": "632621", "name": "玛沁县" },
    { "code": "632622", "name": "班玛县" },
    { "code": "632623", "name": "甘德县" },
    { "code": "632624", "name": "达日县" },
    { "code": "632625", "name": "久治县" },
    { "code": "632626", "name": "玛多县" }] },

  { "code": "6327", "name": "玉树藏族自治州", "children": [
    { "code": "632701", "name": "玉树市" },
    { "code": "632722", "name": "杂多县" },
    { "code": "632723", "name": "称多县" },
    { "code": "632724", "name": "治多县" },
    { "code": "632725", "name": "囊谦县" },
    { "code": "632726", "name": "曲麻莱县" }] },

  { "code": "6328", "name": "海西蒙古族藏族自治州", "children": [
    { "code": "632801", "name": "格尔木市" },
    { "code": "632802", "name": "德令哈市" },
    { "code": "632803", "name": "茫崖市" },
    { "code": "632821", "name": "乌兰县" },
    { "code": "632822", "name": "都兰县" },
    { "code": "632823", "name": "天峻县" },
    { "code": "632857", "name": "大柴旦行政委员会" }] }] },



{
  "code": "64", "name": "宁夏回族自治区", "children": [
  { "code": "6401", "name": "银川市", "children": [
    { "code": "640104", "name": "兴庆区" },
    { "code": "640105", "name": "西夏区" },
    { "code": "640106", "name": "金凤区" },
    { "code": "640121", "name": "永宁县" },
    { "code": "640122", "name": "贺兰县" },
    { "code": "640181", "name": "灵武市" }] },

  { "code": "6402", "name": "石嘴山市", "children": [
    { "code": "640202", "name": "大武口区" },
    { "code": "640205", "name": "惠农区" },
    { "code": "640221", "name": "平罗县" }] },

  { "code": "6403", "name": "吴忠市", "children": [
    { "code": "640302", "name": "利通区" },
    { "code": "640303", "name": "红寺堡区" },
    { "code": "640323", "name": "盐池县" },
    { "code": "640324", "name": "同心县" },
    { "code": "640381", "name": "青铜峡市" }] },

  { "code": "6404", "name": "固原市", "children": [
    { "code": "640402", "name": "原州区" },
    { "code": "640422", "name": "西吉县" },
    { "code": "640423", "name": "隆德县" },
    { "code": "640424", "name": "泾源县" },
    { "code": "640425", "name": "彭阳县" }] },

  { "code": "6405", "name": "中卫市", "children": [
    { "code": "640502", "name": "沙坡头区" },
    { "code": "640521", "name": "中宁县" },
    { "code": "640522", "name": "海原县" }] }] },



{
  "code": "65", "name": "新疆维吾尔自治区", "children": [
  { "code": "6501", "name": "乌鲁木齐市", "children": [
    { "code": "650102", "name": "天山区" },
    { "code": "650103", "name": "沙依巴克区" },
    { "code": "650104", "name": "新市区" },
    { "code": "650105", "name": "水磨沟区" },
    { "code": "650106", "name": "头屯河区" },
    { "code": "650107", "name": "达坂城区" },
    { "code": "650109", "name": "米东区" },
    { "code": "650121", "name": "乌鲁木齐县" }] },

  { "code": "6502", "name": "克拉玛依市", "children": [
    { "code": "650202", "name": "独山子区" },
    { "code": "650203", "name": "克拉玛依区" },
    { "code": "650204", "name": "白碱滩区" },
    { "code": "650205", "name": "乌尔禾区" }] },

  { "code": "6504", "name": "吐鲁番市", "children": [
    { "code": "650402", "name": "高昌区" },
    { "code": "650421", "name": "鄯善县" },
    { "code": "650422", "name": "托克逊县" }] },

  { "code": "6505", "name": "哈密市", "children": [
    { "code": "650502", "name": "伊州区" },
    { "code": "650521", "name": "巴里坤哈萨克自治县" },
    { "code": "650522", "name": "伊吾县" }] },

  { "code": "6523", "name": "昌吉回族自治州", "children": [
    { "code": "652301", "name": "昌吉市" },
    { "code": "652302", "name": "阜康市" },
    { "code": "652323", "name": "呼图壁县" },
    { "code": "652324", "name": "玛纳斯县" },
    { "code": "652325", "name": "奇台县" },
    { "code": "652327", "name": "吉木萨尔县" },
    { "code": "652328", "name": "木垒哈萨克自治县" }] },

  { "code": "6527", "name": "博尔塔拉蒙古自治州", "children": [
    { "code": "652701", "name": "博乐市" },
    { "code": "652702", "name": "阿拉山口市" },
    { "code": "652722", "name": "精河县" },
    { "code": "652723", "name": "温泉县" }] },

  { "code": "6528", "name": "巴音郭楞蒙古自治州", "children": [
    { "code": "652801", "name": "库尔勒市" },
    { "code": "652822", "name": "轮台县" },
    { "code": "652823", "name": "尉犁县" },
    { "code": "652824", "name": "若羌县" },
    { "code": "652825", "name": "且末县" },
    { "code": "652826", "name": "焉耆回族自治县" },
    { "code": "652827", "name": "和静县" },
    { "code": "652828", "name": "和硕县" },
    { "code": "652829", "name": "博湖县" },
    { "code": "652871", "name": "库尔勒经济技术开发区" }] },

  { "code": "6529", "name": "阿克苏地区", "children": [
    { "code": "652901", "name": "阿克苏市" },
    { "code": "652922", "name": "温宿县" },
    { "code": "652923", "name": "库车县" },
    { "code": "652924", "name": "沙雅县" },
    { "code": "652925", "name": "新和县" },
    { "code": "652926", "name": "拜城县" },
    { "code": "652927", "name": "乌什县" },
    { "code": "652928", "name": "阿瓦提县" },
    { "code": "652929", "name": "柯坪县" }] },

  { "code": "6530", "name": "克孜勒苏柯尔克孜自治州", "children": [
    { "code": "653001", "name": "阿图什市" },
    { "code": "653022", "name": "阿克陶县" },
    { "code": "653023", "name": "阿合奇县" },
    { "code": "653024", "name": "乌恰县" }] },

  { "code": "6531", "name": "喀什地区", "children": [
    { "code": "653101", "name": "喀什市" },
    { "code": "653121", "name": "疏附县" },
    { "code": "653122", "name": "疏勒县" },
    { "code": "653123", "name": "英吉沙县" },
    { "code": "653124", "name": "泽普县" },
    { "code": "653125", "name": "莎车县" },
    { "code": "653126", "name": "叶城县" },
    { "code": "653127", "name": "麦盖提县" },
    { "code": "653128", "name": "岳普湖县" },
    { "code": "653129", "name": "伽师县" },
    { "code": "653130", "name": "巴楚县" },
    { "code": "653131", "name": "塔什库尔干塔吉克自治县" }] },

  { "code": "6532", "name": "和田地区", "children": [
    { "code": "653201", "name": "和田市" },
    { "code": "653221", "name": "和田县" },
    { "code": "653222", "name": "墨玉县" },
    { "code": "653223", "name": "皮山县" },
    { "code": "653224", "name": "洛浦县" },
    { "code": "653225", "name": "策勒县" },
    { "code": "653226", "name": "于田县" },
    { "code": "653227", "name": "民丰县" }] },

  { "code": "6540", "name": "伊犁哈萨克自治州", "children": [
    { "code": "654002", "name": "伊宁市" },
    { "code": "654003", "name": "奎屯市" },
    { "code": "654004", "name": "霍尔果斯市" },
    { "code": "654021", "name": "伊宁县" },
    { "code": "654022", "name": "察布查尔锡伯自治县" },
    { "code": "654023", "name": "霍城县" },
    { "code": "654024", "name": "巩留县" },
    { "code": "654025", "name": "新源县" },
    { "code": "654026", "name": "昭苏县" },
    { "code": "654027", "name": "特克斯县" },
    { "code": "654028", "name": "尼勒克县" }] },

  { "code": "6542", "name": "塔城地区", "children": [
    { "code": "654201", "name": "塔城市" },
    { "code": "654202", "name": "乌苏市" },
    { "code": "654221", "name": "额敏县" },
    { "code": "654223", "name": "沙湾县" },
    { "code": "654224", "name": "托里县" },
    { "code": "654225", "name": "裕民县" },
    { "code": "654226", "name": "和布克赛尔蒙古自治县" }] },

  { "code": "6543", "name": "阿勒泰地区", "children": [
    { "code": "654301", "name": "阿勒泰市" },
    { "code": "654321", "name": "布尔津县" },
    { "code": "654322", "name": "富蕴县" },
    { "code": "654323", "name": "福海县" },
    { "code": "654324", "name": "哈巴河县" },
    { "code": "654325", "name": "青河县" },
    { "code": "654326", "name": "吉木乃县" }] },

  { "code": "6590", "name": "自治区直辖县级行政区划", "children": [
    { "code": "659001", "name": "石河子市" },
    { "code": "659002", "name": "阿拉尔市" },
    { "code": "659003", "name": "图木舒克市" },
    { "code": "659004", "name": "五家渠市" },
    { "code": "659006", "name": "铁门关市" }] }] }];





module.exports = {
  pca: pca };

/***/ }),

/***/ 41:
/*!***************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/axios/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ 42);

/***/ }),

/***/ 416:
/*!***********************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/uni-luck-draw/utils.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.resolveImage = exports.base64src = exports.changeUnits = exports.rpx2px = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 19));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}var windowWidth = uni.getSystemInfoSync().windowWidth;
// uni-app@2.9起, 屏幕最多适配到960, 超出则按375计算
if (windowWidth > 960) windowWidth = 375;

var rpx2px = function rpx2px(value) {
  if (typeof value === 'string') value = Number(value.replace(/[a-z]*/g, ''));
  return windowWidth / 750 * value;
};exports.rpx2px = rpx2px;

var changeUnits = function changeUnits(value) {
  return Number(value.replace(/^(\-*[0-9.]*)([a-z%]*)$/, function (value, num, unit) {
    switch (unit) {
      case 'px':
        num *= 1;
        break;
      case 'rpx':
        num = rpx2px(num);
        break;
      default:
        num *= 1;
        break;}

    return num;
  }));
};exports.changeUnits = changeUnits;

var fsm;
var tempImageFlag = 0;
var base64src = function base64src(base64data) {
  return new Promise(function (resolve, reject) {
    // 如果不是base64就直接返回路径
    if (!/^data:image\/([a-z]+);base64,/.test(base64data)) return resolve(base64data);var _ref =
    /data:image\/([a-z]+);base64,(.*)/.exec(base64data) || [],_ref2 = _slicedToArray(_ref, 3),format = _ref2[1],bodyData = _ref2[2];
    if (!format) return resolve(base64data);
    var filePath = "".concat(wx.env.USER_DATA_PATH, "/lucky_").concat(Date.now()).concat(tempImageFlag++, ".").concat(format);
    var buffer = wx.base64ToArrayBuffer(bodyData);
    wx.getFileSystemManager().writeFile({
      filePath: filePath,
      data: buffer,
      encoding: 'binary',
      success: function success() {return resolve(filePath);},
      fail: function fail(res) {
        console.error('API `fsm.writeFile` 进入失败回调', {
          errMsg: res.errMsg,
          ArrayBuffer: buffer });

        reject(new Error('base64图片缓存失败'));
      } });

  });
};exports.base64src = base64src;

var resolveImage = /*#__PURE__*/function () {var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(res, img) {var imgName,resolveName,src,$resolve,path,_args = arguments;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:imgName = _args.length > 2 && _args[2] !== undefined ? _args[2] : 'src';resolveName = _args.length > 3 && _args[3] !== undefined ? _args[3] : '$resolve';
            src = img[imgName];
            $resolve = img[resolveName];

            // 如果是base64就调用base64src()方法把图片写入本地, 然后渲染临时路径
            if (!/^data:image\/([a-z]+);base64,/.test(src)) {_context.next = 10;break;}_context.next = 7;return (
              base64src(src));case 7:path = _context.sent;
            $resolve(_objectSpread(_objectSpread({}, res.detail), {}, { path: path }));return _context.abrupt("return");case 10:if (!(




            src.indexOf('http') !== 0)) {_context.next = 13;break;}
            $resolve(_objectSpread(_objectSpread({}, res.detail), {}, { path: src }));return _context.abrupt("return");case 13:


            // 如果是网络图片, 则通过getImageInfo()方法获取图片宽高
            uni.getImageInfo({
              src: src,
              success: function success(imgObj) {return $resolve(imgObj);},
              fail: function fail() {return console.error('API `uni.getImageInfo` 加载图片失败', src);} });case 14:case "end":return _context.stop();}}}, _callee);}));return function resolveImage(_x, _x2) {return _ref3.apply(this, arguments);};}();exports.resolveImage = resolveImage;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 417:
/*!**********************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/lucky-canvas/index.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/lucky-canvas.cjs.min.js */ 418);

/***/ }),

/***/ 418:
/*!******************************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/lucky-canvas/dist/lucky-canvas.cjs.min.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
/*! *****************************************************************************
                                                                          Copyright (c) Microsoft Corporation.
                                                                          
                                                                          Permission to use, copy, modify, and/or distribute this software for any
                                                                          purpose with or without fee is hereby granted.
                                                                          
                                                                          THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
                                                                          REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
                                                                          AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
                                                                          INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
                                                                          LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
                                                                          OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
                                                                          PERFORMANCE OF THIS SOFTWARE.
                                                                          ***************************************************************************** */
var _t = function t(e, i) {return (_t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (t, e) {t.__proto__ = e;} || function (t, e) {for (var i in e) {Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);}})(e, i);};function e(e, i) {if ("function" != typeof i && null !== i) throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");function n() {this.constructor = e;}_t(e, i), e.prototype = null === i ? Object.create(i) : (n.prototype = i.prototype, new n());}var _i = function i() {return (_i = Object.assign || function (t) {for (var e, i = 1, n = arguments.length; i < n; i++) {for (var r in e = arguments[i]) {Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);}}return t;}).apply(this, arguments);};function n(t, e, i, n) {return new (i || (i = Promise))(function (r, o) {function s(t) {try {u(n.next(t));} catch (t) {o(t);}}function a(t) {try {u(n.throw(t));} catch (t) {o(t);}}function u(t) {var e;t.done ? r(t.value) : (e = t.value, e instanceof i ? e : new i(function (t) {t(e);})).then(s, a);}u((n = n.apply(t, e || [])).next());});}function r(t, e) {var i,n,r,o,s = { label: 0, sent: function sent() {if (1 & r[0]) throw r[1];return r[1];}, trys: [], ops: [] };return o = { next: a(0), throw: a(1), return: a(2) }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {return this;}), o;function a(o) {return function (a) {return function (o) {if (i) throw new TypeError("Generator is already executing.");for (; s;) {try {if (i = 1, n && (r = 2 & o[0] ? n.return : o[0] ? n.throw || ((r = n.return) && r.call(n), 0) : n.next) && !(r = r.call(n, o[1])).done) return r;switch (n = 0, r && (o = [2 & o[0], r.value]), o[0]) {case 0:case 1:r = o;break;case 4:return s.label++, { value: o[1], done: !1 };case 5:s.label++, n = o[1], o = [0];continue;case 7:o = s.ops.pop(), s.trys.pop();continue;default:if (!(r = s.trys, (r = r.length > 0 && r[r.length - 1]) || 6 !== o[0] && 2 !== o[0])) {s = 0;continue;}if (3 === o[0] && (!r || o[1] > r[0] && o[1] < r[3])) {s.label = o[1];break;}if (6 === o[0] && s.label < r[1]) {s.label = r[1], r = o;break;}if (r && s.label < r[2]) {s.label = r[2], s.ops.push(o);break;}r[2] && s.ops.pop(), s.trys.pop();continue;}o = e.call(t, s);} catch (t) {o = [6, t], n = 0;} finally {i = r = 0;}}if (5 & o[0]) throw o[1];return { value: o[0] ? o[1] : void 0, done: !0 };}([o, a]);};}}function o(t, e) {for (var i = 0, n = e.length, r = t.length; i < n; i++, r++) {t[r] = e[i];}return t;}String.prototype.includes || (String.prototype.includes = function (t, e) {return "number" != typeof e && (e = 0), !(e + t.length > this.length) && -1 !== this.indexOf(t, e);}), Array.prototype.find || Object.defineProperty(Array.prototype, "find", { value: function value(t) {if (null == this) throw new TypeError('"this" is null or not defined');var e = Object(this),i = e.length >>> 0;if ("function" != typeof t) throw new TypeError("predicate must be a function");for (var n = arguments[1], r = 0; r < i;) {var o = e[r];if (t.call(n, o, r, e)) return o;r++;}} });var s = function s(t) {for (var e = [], i = 1; i < arguments.length; i++) {e[i - 1] = arguments[i];}return e.some(function (e) {return Object.prototype.toString.call(t).slice(8, -1).toLowerCase() === e;});},a = function a(t) {return [].filter.call(t, function (t) {return "\n" !== t;}).join("");},u = function u(t) {if ("string" != typeof t) return !1;if ("transparent" === (t = t.toLocaleLowerCase().trim())) return !1;if (/^rgba/.test(t)) {var e = /([^\s,]+)\)$/.exec(t);if (0 === (null === (i = e) ? 0 : "object" == typeof i ? NaN : "number" == typeof i ? i : "string" == typeof i ? "%" === i[i.length - 1] ? Number(i.slice(0, -1)) / 100 : Number(i) : NaN)) return !1;}var i;return !0;},h = function () {function t() {this.subs = [];}return t.prototype.addSub = function (t) {this.subs.includes(t) || this.subs.push(t);}, t.prototype.notify = function () {this.subs.forEach(function (t) {t.update();});}, t;}(),c = ("__proto__" in {});function l(t, e, i, n) {Object.defineProperty(t, e, { value: i, enumerable: !!n, writable: !0, configurable: !0 });}var f = Array.prototype,d = Object.create(f);["push", "pop", "shift", "unshift", "sort", "splice", "reverse"].forEach(function (t) {d[t] = function () {for (var e = [], i = 0; i < arguments.length; i++) {e[i] = arguments[i];}var n = f[t].apply(this, e),r = this.__luckyOb__;return ["push", "unshift", "splice"].includes(t) && r.walk(this), r.dep.notify(), n;};});var p = function () {function t(t) {this.dep = new h(), l(t, "__luckyOb__", this), Array.isArray(t) && (c ? t.__proto__ = d : Object.getOwnPropertyNames(d).forEach(function (e) {l(t, e, d[e]);})), this.walk(t);}return t.prototype.walk = function (t) {Object.keys(t).forEach(function (e) {m(t, e, t[e]);});}, t;}();function g(t) {if (t && "object" == typeof t) return "__luckyOb__" in t ? t.__luckyOb__ : new p(t);}function m(t, e, i) {var n = new h(),r = Object.getOwnPropertyDescriptor(t, e);if (!r || !1 !== r.configurable) {var o = r && r.get,s = r && r.set;o && !s || 2 !== arguments.length || (i = t[e]);var a = g(i);Object.defineProperty(t, e, { get: function get() {var e = o ? o.call(t) : i;return h.target && (n.addSub(h.target), a && a.dep.addSub(h.target)), e;}, set: function set(e) {e !== i && (i = e, o && !s || (s ? s.call(t, e) : i = e, a = g(e), n.notify()));} });}}var v = 0,b = function () {function t(t, e, i, n) {void 0 === n && (n = {}), this.id = v++, this.$lucky = t, this.expr = e, this.deep = !!n.deep, this.getter = "function" == typeof e ? e : function (t) {t += ".";for (var e = [], i = "", n = 0; n < t.length; n++) {var r = t[n];if (/\[|\./.test(r)) e.push(i), i = "";else {if (/\W/.test(r)) continue;i += r;}}return function (t) {return e.reduce(function (t, e) {return t[e];}, t);};}(e), this.cb = i, this.value = this.get();}return t.prototype.get = function () {h.target = this;var t = this.getter.call(this.$lucky, this.$lucky);return this.deep && function (t) {var e = function e(t) {s(t, "array", "object") && Object.keys(t).forEach(function (i) {var n = t[i];e(n);});};e(t);}(t), h.target = null, t;}, t.prototype.update = function () {var t = this.get(),e = this.value;this.value = t, this.cb.call(this.$lucky, t, e);}, t;}(),y = function () {function t(t) {var e = this;this.htmlFontSize = 16, this.rAF = function () {}, this.boxWidth = 0, this.boxHeight = 0, this.setHTMLFontSize(), "string" == typeof t ? t = { el: t } : 1 === t.nodeType && (t = { el: "", divElement: t }), t = t, this.config = t, this.setDpr(), this.initWindowFunction(), t.flag || (t.flag = "WEB"), Object.prototype.hasOwnProperty.call(t, "ob") || (t.ob = !0), t.el && (t.divElement = document.querySelector(t.el)), t.divElement && (t.canvasElement = document.createElement("canvas"), t.divElement.appendChild(t.canvasElement)), this.resetWidthAndHeight(), t.canvasElement && (t.ctx = t.canvasElement.getContext("2d"), t.canvasElement.setAttribute("package", "lucky-canvas@1.5.4"), t.canvasElement.addEventListener("click", function (t) {return e.handleClick(t);}), t.canvasElement.addEventListener("mousemove", function (t) {return e.handleMouseMove(t);}), t.canvasElement.addEventListener("mousedown", function (t) {return e.handleMouseDown(t);}), t.canvasElement.addEventListener("mouseup", function (t) {return e.handleMouseUp(t);})), this.ctx = t.ctx, t.ctx ? this.boxWidth && this.boxHeight || console.error("无法获取到宽度或高度") : console.error("无法获取到 CanvasContext2D");}return t.prototype.init = function (t) {this.setDpr(), this.setHTMLFontSize(), this.resetWidthAndHeight(), this.zoomCanvas();}, t.prototype.handleClick = function (t) {}, t.prototype.handleMouseDown = function (t) {}, t.prototype.handleMouseUp = function (t) {}, t.prototype.handleMouseMove = function (t) {}, t.prototype.conversionAxis = function (t, e) {return [0, 0];}, t.prototype.setDpr = function () {var t = this.config;t.dpr || (window ? window.dpr = t.dpr = window.devicePixelRatio || 1 : t.dpr || console.error(t, "未传入 dpr 可能会导致绘制异常"));}, t.prototype.setHTMLFontSize = function () {window && (this.htmlFontSize = +window.getComputedStyle(document.documentElement).fontSize.slice(0, -2));}, t.prototype.resetWidthAndHeight = function () {var t = this.config,e = 0,i = 0;t.divElement && (e = t.divElement.offsetWidth, i = t.divElement.offsetHeight), this.boxWidth = this.getLength(t.width) || e, this.boxHeight = this.getLength(t.height) || i, t.divElement && (t.divElement.style.overflow = "hidden", t.divElement.style.width = this.boxWidth + "px", t.divElement.style.height = this.boxHeight + "px");}, t.prototype.initWindowFunction = function () {var t = this.config;if (window) return this.rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (t) {window.setTimeout(t, 1e3 / 60);}, t.setTimeout = window.setTimeout, t.setInterval = window.setInterval, t.clearTimeout = window.clearTimeout, void (t.clearInterval = window.clearInterval);if (t.rAF) this.rAF = t.rAF;else if (t.setTimeout) {var e = t.setTimeout;this.rAF = function (t) {return e(t, 16.7);};} else this.rAF = function (t) {return setTimeout(t, 16.7);};}, t.prototype.zoomCanvas = function () {var t = this.config,e = this.ctx,i = t.canvasElement,n = t.dpr,r = [this.boxWidth * n, this.boxHeight * n],o = r[0],s = r[1],a = function a(t) {return (t * n - t) / (t * n) * (n / 2) * 100;};i && (i.width = o, i.height = s, i.style.width = o + "px", i.style.height = s + "px", i.style.transform = "scale(" + 1 / n + ") translate(" + -a(o) + "%, " + -a(s) + "%)", e.scale(n, n));}, t.prototype.loadImg = function (t, e, i) {var n = this;return void 0 === i && (i = "$resolve"), new Promise(function (r, o) {if (t || o("=> '" + e.src + "' 不能为空或不合法"), "WEB" === n.config.flag) {var s = new Image();s.src = t, s.onload = function () {return r(s);}, s.onerror = function () {return o("=> '" + e.src + "' 图片加载失败");};} else e[i] = r;});}, t.prototype.drawImage = function (t, e, i, n, r) {var o,s = this.config,a = this.ctx;return ["WEB", "MP-WX"].includes(s.flag) ? o = t : ["UNI-H5", "UNI-MP", "TARO-H5", "TARO-MP"].includes(s.flag) && (o = t.path), a.drawImage(o, e, i, n, r);}, t.prototype.getLength = function (t) {return s(t, "number") ? t : s(t, "string") ? this.changeUnits(t) : 0;}, t.prototype.changeUnits = function (t, e) {var i = this;return void 0 === e && (e = 1), Number(t.replace(/^([-]*[0-9.]*)([a-z%]*)$/, function (t, n, r) {var o = { "%": function _(t) {return t * (e / 100);}, px: function px(t) {return 1 * t;}, rem: function rem(t) {return t * i.htmlFontSize;} }[r];if (o) return o(n);var s = i.config.unitFunc;return s ? s(n, r) : n;}));}, t.prototype.$set = function (t, e, i) {t && "object" == typeof t && m(t, e, i);}, t.prototype.$computed = function (t, e, i) {var n = this;Object.defineProperty(t, e, { get: function get() {return i.call(n);} });}, t.prototype.$watch = function (t, e, i) {void 0 === i && (i = {}), "object" == typeof e && (e = (i = e).handler);var n = new b(this, t, e, i);return i.immediate && e.call(this, n.value), function () {};}, t;}(),w = function w(t) {return Math.PI / 180 * t;},x = function x(t, e) {return [+(Math.cos(t) * e).toFixed(8), +(Math.sin(t) * e).toFixed(8)];},z = function z(t, e) {var i = -t / e;return [i, -i * t + e];},I = function I(t, e, i, n, r, o) {var s;if (void 0 === o && (o = !0), Math.abs(r - n).toFixed(8) >= w(180).toFixed(8)) {var a = (r + n) / 2;return o ? (I(t, e, i, n, a, o), I(t, e, i, a, r, o)) : (I(t, e, i, a, r, o), I(t, e, i, n, a, o)), !1;}o || (n = (s = [r, n])[0], r = s[1]);var u = x(n, i),h = u[0],c = u[1],l = x(r, i),f = l[0],d = l[1],p = z(h, c),g = p[0],m = p[1],v = z(f, d),b = v[0],y = v[1],k = (y - m) / (g - b),S = (b * m - g * y) / (b - g);isNaN(k) && (Math.abs(h) === +i.toFixed(8) && (k = h), Math.abs(f) === +i.toFixed(8) && (k = f)), g === 1 / 0 || g === -1 / 0 ? S = b * k + y : b !== 1 / 0 && b !== -1 / 0 || (S = g * k + m), e.lineTo(h, c), t.indexOf("MP") > 0 ? e.quadraticCurveTo(k, S, f, d) : e.arcTo(k, S, f, d, i);},k = function k(t, e, i, n, r, o, s, a) {i || (i = s);var u = w(90 / Math.PI / n * s),h = w(90 / Math.PI / i * s),c = r + u,l = o - u,f = r + h,d = o - h;e.beginPath(), e.fillStyle = a, e.moveTo.apply(e, x(c, n)), I(t, e, n, c, l, !0), d > f ? I(t, e, i, f, d, !1) : e.lineTo.apply(e, x((r + o) / 2, s / 2 / Math.abs(Math.sin((r - o) / 2)))), e.closePath(), e.fill();},S = function S(t, e, i, n, r, o, s) {var a = Math.min(n, r);o > a / 2 && (o = a / 2), t.beginPath(), t.fillStyle = s, t.moveTo(e + o, i), t.lineTo(e + o, i), t.lineTo(e + n - o, i), t.quadraticCurveTo(e + n, i, e + n, i + o), t.lineTo(e + n, i + r - o), t.quadraticCurveTo(e + n, i + r, e + n - o, i + r), t.lineTo(e + o, i + r), t.quadraticCurveTo(e, i + r, e, i + r - o), t.lineTo(e, i + o), t.quadraticCurveTo(e, i, e + o, i), t.closePath(), t.fill();},C = { easeIn: function easeIn(t, e, i, n) {return t >= n && (t = n), i * (t /= n) * t + e;}, easeOut: function easeOut(t, e, i, n) {return t >= n && (t = n), -i * (t /= n) * (t - 2) + e;} },T = { easeIn: function easeIn(t, e, i, n) {return t >= n && (t = n), -i * Math.cos(t / n * (Math.PI / 2)) + i + e;}, easeOut: function easeOut(t, e, i, n) {return t >= n && (t = n), i * Math.sin(t / n * (Math.PI / 2)) + e;} },W = { easeIn: function easeIn(t, e, i, n) {return t >= n && (t = n), 0 == t ? e : i * Math.pow(2, 10 * (t / n - 1)) + e;}, easeOut: function easeOut(t, e, i, n) {return t >= n && (t = n), t == n ? e + i : i * (1 - Math.pow(2, -10 * t / n)) + e;} },O = { easeIn: function easeIn(t, e, i, n) {return t >= n && (t = n), -i * (Math.sqrt(1 - (t /= n) * t) - 1) + e;}, easeOut: function easeOut(t, e, i, n) {return t >= n && (t = n), i * Math.sqrt(1 - (t = t / n - 1) * t) + e;} },_ = Object.freeze({ __proto__: null, quad: C, cubic: { easeIn: function easeIn(t, e, i, n) {return t >= n && (t = n), i * (t /= n) * t * t + e;}, easeOut: function easeOut(t, e, i, n) {return t >= n && (t = n), i * ((t = t / n - 1) * t * t + 1) + e;} }, quart: { easeIn: function easeIn(t, e, i, n) {return t >= n && (t = n), i * (t /= n) * t * t * t + e;}, easeOut: function easeOut(t, e, i, n) {return t >= n && (t = n), -i * ((t = t / n - 1) * t * t * t - 1) + e;} }, quint: { easeIn: function easeIn(t, e, i, n) {return t >= n && (t = n), i * (t /= n) * t * t * t * t + e;}, easeOut: function easeOut(t, e, i, n) {return t >= n && (t = n), i * ((t = t / n - 1) * t * t * t * t + 1) + e;} }, sine: T, expo: W, circ: O }),E = function (t) {function o(e, i) {var n;void 0 === i && (i = {});var r = t.call(this, e) || this;return r.blocks = [], r.prizes = [], r.buttons = [], r.defaultConfig = {}, r._defaultConfig = { gutter: "0px", offsetDegree: 0, speed: 20, speedFunction: "quad", accelerationTime: 2500, decelerationTime: 2500, stopRange: .8 }, r.defaultStyle = {}, r._defaultStyle = { fontSize: "18px", fontColor: "#000", fontStyle: "sans-serif", fontWeight: "400", lineHeight: "", background: "rgba(0,0,0,0)", wordWrap: !0, lengthLimit: "90%" }, r.Radius = 0, r.prizeRadius = 0, r.prizeDeg = 0, r.prizeRadian = 0, r.rotateDeg = 0, r.maxBtnRadius = 0, r.startTime = 0, r.endTime = 0, r.stopDeg = 0, r.endDeg = 0, r.FPS = 16.6, r.blockImgs = [[]], r.prizeImgs = [[]], r.btnImgs = [[]], e.ob && (r.initData(i), r.initWatch()), r.initComputed(), null === (n = e.beforeCreate) || void 0 === n || n.call(r), r.init({ blockImgs: r.blocks.map(function (t) {return t.imgs;}), prizeImgs: r.prizes.map(function (t) {return t.imgs;}), btnImgs: r.buttons.map(function (t) {return t.imgs;}) }), r;}return e(o, t), o.prototype.initData = function (t) {this.$set(this, "blocks", t.blocks || []), this.$set(this, "prizes", t.prizes || []), this.$set(this, "buttons", t.buttons || []), this.$set(this, "defaultConfig", t.defaultConfig || {}), this.$set(this, "defaultStyle", t.defaultStyle || {}), this.$set(this, "startCallback", t.start), this.$set(this, "endCallback", t.end);}, o.prototype.initComputed = function () {var t = this;this.$computed(this, "_defaultConfig", function () {return _i({ gutter: "0px", offsetDegree: 0, speed: 20, speedFunction: "quad", accelerationTime: 2500, decelerationTime: 2500, stopRange: .8 }, t.defaultConfig);}), this.$computed(this, "_defaultStyle", function () {return _i({ fontSize: "18px", fontColor: "#000", fontStyle: "sans-serif", fontWeight: "400", background: "rgba(0,0,0,0)", wordWrap: !0, lengthLimit: "90%" }, t.defaultStyle);});}, o.prototype.initWatch = function () {var t = this;this.$watch("blocks", function (e) {return t.init({ blockImgs: e.map(function (t) {return t.imgs;}) });}, { deep: !0 }), this.$watch("prizes", function (e) {return t.init({ prizeImgs: e.map(function (t) {return t.imgs;}) });}, { deep: !0 }), this.$watch("buttons", function (e) {return t.init({ btnImgs: e.map(function (t) {return t.imgs;}) });}, { deep: !0 }), this.$watch("defaultConfig", function () {return t.draw();}, { deep: !0 }), this.$watch("defaultStyle", function () {return t.draw();}, { deep: !0 }), this.$watch("startCallback", function () {return t.init({});}), this.$watch("endCallback", function () {return t.init({});});}, o.prototype.init = function (e) {var i,n,r = this;t.prototype.init.call(this);var o = this.config,s = this.ctx;this.Radius = Math.min(this.boxWidth, this.boxHeight) / 2, null === (i = o.beforeInit) || void 0 === i || i.call(this), s.translate(this.Radius, this.Radius), this.draw(), this.draw(), Object.keys(e).forEach(function (t) {var i = t,n = { blockImgs: "blocks", prizeImgs: "prizes", btnImgs: "buttons" }[i],o = e[i];o && o.forEach(function (t, e) {t && t.forEach(function (t, o) {r.loadAndCacheImg(n, e, i, o, function () {r.draw();});});});}), null === (n = o.afterInit) || void 0 === n || n.call(this);}, o.prototype.handleClick = function (t) {var e,i = this.ctx;i.beginPath(), i.arc(0, 0, this.maxBtnRadius, 0, 2 * Math.PI, !1), i.isPointInPath(t.offsetX, t.offsetY) && (this.startTime || null === (e = this.startCallback) || void 0 === e || e.call(this, t));}, o.prototype.loadAndCacheImg = function (t, e, i, o, s) {return n(this, void 0, void 0, function () {var n,a,u = this;return r(this, function (r) {return (n = this[t][e]) && n.imgs && (a = n.imgs[o]) ? (this[i][e] || (this[i][e] = []), this.loadImg(a.src, a).then(function (t) {u[i][e][o] = t, s.call(u);}).catch(function (i) {console.error(t + "[" + e + "].imgs[" + o + "] " + i);}), [2]) : [2];});});}, o.prototype.computedWidthAndHeight = function (t, e, i, n) {if (!e.width && !e.height) return [t.width, t.height];if (e.width && !e.height) {var r = this.getWidth(e.width, i);return [r, t.height * (r / t.width)];}if (!e.width && e.height) {var o = this.getHeight(e.height, n);return [t.width * (o / t.height), o];}return [this.getWidth(e.width, i), this.getHeight(e.height, n)];}, o.prototype.draw = function () {var t,e,i = this,n = this,r = n.config,o = n.ctx,s = n._defaultConfig,h = n._defaultStyle;null === (t = r.beforeDraw) || void 0 === t || t.call(this, o), o.clearRect(-this.Radius, -this.Radius, 2 * this.Radius, 2 * this.Radius), this.prizeRadius = this.blocks.reduce(function (t, e, n) {return u(e.background) && (o.beginPath(), o.fillStyle = e.background, o.arc(0, 0, t, 0, 2 * Math.PI, !1), o.fill()), e.imgs && e.imgs.forEach(function (e, r) {if (i.blockImgs[n]) {var s = i.blockImgs[n][r];if (s) {var a = i.computedWidthAndHeight(s, e, 2 * t, 2 * t),u = a[0],h = a[1],c = [i.getOffsetX(u), i.getHeight(e.top, 2 * t) - t],l = c[0],f = c[1];o.save(), e.rotate && o.rotate(w(i.rotateDeg)), i.drawImage(s, l, f, u, h), o.restore();}}}), t - i.getLength(e.padding && e.padding.split(" ")[0]);}, this.Radius), this.prizeDeg = 360 / this.prizes.length, this.prizeRadian = w(this.prizeDeg);var c = w(-90 + this.rotateDeg + s.offsetDegree),l = function l(t) {return i.getOffsetX(o.measureText(t).width);},f = function f(t, e, n) {var r = t.lineHeight || h.lineHeight || t.fontSize || h.fontSize;return i.getHeight(t.top, e) + (n + 1) * i.getLength(r);};o.save(), this.prizes.forEach(function (t, e) {var n = c + e * i.prizeRadian,d = i.prizeRadius - i.maxBtnRadius,p = t.background || h.background;u(p) && function (t, e, i, n, r, o, s, a) {s ? k(t, e, i, n, r, o, s, a) : (e.beginPath(), e.fillStyle = a, e.moveTo(0, 0), e.arc(0, 0, n, r, o, !1), e.closePath(), e.fill());}(r.flag, o, i.maxBtnRadius, i.prizeRadius, n - i.prizeRadian / 2, n + i.prizeRadian / 2, i.getLength(s.gutter), p);var g = Math.cos(n) * i.prizeRadius,m = Math.sin(n) * i.prizeRadius;o.translate(g, m), o.rotate(n + w(90)), t.imgs && t.imgs.forEach(function (t, n) {if (i.prizeImgs[e]) {var r = i.prizeImgs[e][n];if (r) {var o = i.computedWidthAndHeight(r, t, i.prizeRadian * i.prizeRadius, d),s = o[0],a = o[1],u = [i.getOffsetX(s), i.getHeight(t.top, d)],h = u[0],c = u[1];i.drawImage(r, h, c, s, a);}}}), t.fonts && t.fonts.forEach(function (t) {var e = t.fontColor || h.fontColor,n = t.fontWeight || h.fontWeight,r = i.getLength(t.fontSize || h.fontSize),u = t.fontStyle || h.fontStyle;o.fillStyle = e, o.font = n + " " + (r >> 0) + "px " + u;var c = [],p = String(t.text);if (Object.prototype.hasOwnProperty.call(t, "wordWrap") ? t.wordWrap : h.wordWrap) {p = a(p);for (var g = "", m = 0; m < p.length; m++) {g += p[m];var v = o.measureText(g).width,b = (i.prizeRadius - f(t, d, c.length)) * Math.tan(i.prizeRadian / 2) * 2 - i.getLength(s.gutter);v > i.getWidth(t.lengthLimit || h.lengthLimit, b) && (c.push(g.slice(0, -1)), g = p[m]);}g && c.push(g), c.length || c.push(p);} else c = p.split("\n");c.filter(function (t) {return !!t;}).forEach(function (e, i) {o.fillText(e, l(e), f(t, d, i));});}), o.rotate(w(360) - n - w(90)), o.translate(-g, -m);}), o.restore(), this.buttons.forEach(function (t, e) {var n = i.getHeight(t.radius);i.maxBtnRadius = Math.max(i.maxBtnRadius, n), u(t.background) && (o.beginPath(), o.fillStyle = t.background, o.arc(0, 0, n, 0, 2 * Math.PI, !1), o.fill()), t.pointer && u(t.background) && (o.beginPath(), o.fillStyle = t.background, o.moveTo(-n, 0), o.lineTo(n, 0), o.lineTo(0, 2 * -n), o.closePath(), o.fill()), t.imgs && t.imgs.forEach(function (t, r) {if (i.btnImgs[e]) {var o = i.btnImgs[e][r];if (o) {var s = i.computedWidthAndHeight(o, t, 2 * n, 2 * n),a = s[0],u = s[1],h = [i.getOffsetX(a), i.getHeight(t.top, n)],c = h[0],l = h[1];i.drawImage(o, c, l, a, u);}}}), t.fonts && t.fonts.forEach(function (t) {var e = t.fontColor || h.fontColor,r = t.fontWeight || h.fontWeight,s = i.getLength(t.fontSize || h.fontSize),a = t.fontStyle || h.fontStyle;o.fillStyle = e, o.font = r + " " + (s >> 0) + "px " + a, String(t.text).split("\n").forEach(function (e, i) {o.fillText(e, l(e), f(t, n, i));});});}), null === (e = r.afterDraw) || void 0 === e || e.call(this, o);}, o.prototype.play = function () {this.startTime || (this.startTime = Date.now(), this.prizeFlag = void 0, this.run());}, o.prototype.stop = function (t) {this.prizeFlag = t < 0 ? -1 : t % this.prizes.length, -1 === this.prizeFlag && (this.rotateDeg = this.prizeDeg / 2 - this._defaultConfig.offsetDegree, this.draw());}, o.prototype.run = function (t) {void 0 === t && (t = 0);var e = this,i = e.rAF,n = e.prizeFlag,r = e.prizeDeg,o = e.rotateDeg,s = e._defaultConfig,a = Date.now() - this.startTime;if (a >= s.accelerationTime && void 0 !== n) {this.FPS = a / t, this.endTime = Date.now(), this.stopDeg = o;for (var u = (Math.random() * r - r / 2) * this.getLength(s.stopRange), h = 0; ++h;) {var c = 360 * h - n * r - o - s.offsetDegree + u;if (_[s.speedFunction].easeOut(this.FPS, this.stopDeg, c, s.decelerationTime) - this.stopDeg > s.speed) {this.endDeg = c;break;}}return this.slowDown();}this.rotateDeg = (o + _[s.speedFunction].easeIn(a, 0, s.speed, s.accelerationTime)) % 360, this.draw(), i(this.run.bind(this, t + 1));}, o.prototype.slowDown = function () {var t,e = this,n = e.rAF,r = e.prizes,o = e.prizeFlag,s = e.stopDeg,a = e.endDeg,u = e._defaultConfig,h = Date.now() - this.endTime;if (-1 !== o) {if (h >= u.decelerationTime) return this.startTime = 0, void (null === (t = this.endCallback) || void 0 === t || t.call(this, _i({}, r.find(function (t, e) {return e === o;}))));this.rotateDeg = _[u.speedFunction].easeOut(h, s, a, u.decelerationTime) % 360, this.draw(), n(this.slowDown.bind(this));} else this.startTime = 0;}, o.prototype.getWidth = function (t, e) {return void 0 === e && (e = this.prizeRadian * this.prizeRadius), s(t, "number") ? t : s(t, "string") ? this.changeUnits(t, e) : 0;}, o.prototype.getHeight = function (t, e) {return void 0 === e && (e = this.prizeRadius), s(t, "number") ? t : s(t, "string") ? this.changeUnits(t, e) : 0;}, o.prototype.getOffsetX = function (t) {return -t / 2;}, o.prototype.conversionAxis = function (t, e) {var i = this.config;return [t / i.dpr - this.Radius, e / i.dpr - this.Radius];}, o;}(y),P = function (t) {function h(e, i) {var n;void 0 === i && (i = {});var r = t.call(this, e) || this;r.rows = 3, r.cols = 3, r.blocks = [], r.prizes = [], r.buttons = [], r.defaultConfig = {}, r._defaultConfig = { gutter: 5, speed: 20, accelerationTime: 2500, decelerationTime: 2500 }, r.defaultStyle = {}, r._defaultStyle = { borderRadius: 20, fontColor: "#000", fontSize: "18px", fontStyle: "sans-serif", fontWeight: "400", lineHeight: "", background: "rgba(0,0,0,0)", shadow: "", wordWrap: !0, lengthLimit: "90%" }, r.activeStyle = {}, r._activeStyle = { background: "#ffce98", shadow: "", fontStyle: "", fontWeight: "", fontSize: "", lineHeight: "", fontColor: "" }, r.cellWidth = 0, r.cellHeight = 0, r.startTime = 0, r.endTime = 0, r.currIndex = 0, r.stopIndex = 0, r.endIndex = 0, r.demo = !1, r.timer = 0, r.FPS = 16.6, r.prizeFlag = -1, r.cells = [], r.blockImgs = [[]], r.btnImgs = [[]], r.prizeImgs = [], e.ob && (r.initData(i), r.initWatch()), r.initComputed(), null === (n = e.beforeCreate) || void 0 === n || n.call(r);var o = r.buttons.map(function (t) {return t.imgs;});return r.button && o.push(r.button.imgs), r.init({ blockImgs: r.blocks.map(function (t) {return t.imgs;}), prizeImgs: r.prizes.map(function (t) {return t.imgs;}), btnImgs: o }), r;}return e(h, t), h.prototype.initData = function (t) {this.$set(this, "rows", Number(t.rows) || 3), this.$set(this, "cols", Number(t.cols) || 3), this.$set(this, "blocks", t.blocks || []), this.$set(this, "prizes", t.prizes || []), this.$set(this, "buttons", t.buttons || []), this.$set(this, "button", t.button), this.$set(this, "defaultConfig", t.defaultConfig || {}), this.$set(this, "defaultStyle", t.defaultStyle || {}), this.$set(this, "activeStyle", t.activeStyle || {}), this.$set(this, "startCallback", t.start), this.$set(this, "endCallback", t.end);}, h.prototype.initComputed = function () {var t = this;this.$computed(this, "_defaultConfig", function () {var e = _i({ gutter: 5, speed: 20, accelerationTime: 2500, decelerationTime: 2500 }, t.defaultConfig);return e.gutter = t.getLength(e.gutter), e.speed = e.speed / 40, e;}), this.$computed(this, "_defaultStyle", function () {return _i({ borderRadius: 20, fontColor: "#000", fontSize: "18px", fontStyle: "sans-serif", fontWeight: "400", background: "rgba(0,0,0,0)", shadow: "", wordWrap: !0, lengthLimit: "90%" }, t.defaultStyle);}), this.$computed(this, "_activeStyle", function () {return _i({ background: "#ffce98", shadow: "" }, t.activeStyle);});}, h.prototype.initWatch = function () {var t = this;this.$watch("blocks", function (e) {return t.init({ blockImgs: e.map(function (t) {return t.imgs;}) });}, { deep: !0 }), this.$watch("prizes", function (e) {return t.init({ prizeImgs: e.map(function (t) {return t.imgs;}) });}, { deep: !0 }), this.$watch("buttons", function (e) {var i = e.map(function (t) {return t.imgs;});return t.button && i.push(t.button.imgs), t.init({ btnImgs: i });}, { deep: !0 }), this.$watch("button", function () {var e = t.buttons.map(function (t) {return t.imgs;});return t.button && e.push(t.button.imgs), t.init({ btnImgs: e });}, { deep: !0 }), this.$watch("rows", function () {return t.init({});}), this.$watch("cols", function () {return t.init({});}), this.$watch("defaultConfig", function () {return t.draw();}, { deep: !0 }), this.$watch("defaultStyle", function () {return t.draw();}, { deep: !0 }), this.$watch("activeStyle", function () {return t.draw();}, { deep: !0 }), this.$watch("startCallback", function () {return t.init({});}), this.$watch("endCallback", function () {return t.init({});});}, h.prototype.init = function (e) {var i,n,r = this;t.prototype.init.call(this);var o = this,s = o.config;o.ctx, o.button, null === (i = s.beforeInit) || void 0 === i || i.call(this), this.draw(), Object.keys(e).forEach(function (t) {var i = t,n = e[i],o = { blockImgs: "blocks", prizeImgs: "prizes", btnImgs: "buttons" }[i];n && n.forEach(function (t, e) {t && t.forEach(function (t, n) {r.loadAndCacheImg(o, e, i, n, function () {r.draw();});});});}), null === (n = s.afterInit) || void 0 === n || n.call(this);}, h.prototype.handleClick = function (t) {var e = this,i = this.ctx;o(o([], this.buttons), [this.button]).forEach(function (n) {var r;if (n) {var o = e.getGeometricProperty([n.x, n.y, n.col || 1, n.row || 1]),s = o[0],a = o[1],u = o[2],h = o[3];i.beginPath(), i.rect(s, a, u, h), i.isPointInPath(t.offsetX, t.offsetY) && (e.startTime || ("function" == typeof n.callback && n.callback.call(e, n), null === (r = e.startCallback) || void 0 === r || r.call(e, t, n)));}});}, h.prototype.loadAndCacheImg = function (t, e, i, o, s) {return n(this, void 0, void 0, function () {var n,a,u,h = this;return r(this, function (r) {return n = this[t][e], "buttons" === t && !this.buttons.length && this.button && (n = this.button), n && n.imgs && (a = n.imgs[o]) ? (this[i][e] || (this[i][e] = []), u = [this.loadImg(a.src, a), a.activeSrc && this.loadImg(a.activeSrc, a, "$activeResolve")], Promise.all(u).then(function (t) {var n = t[0],r = t[1];h[i][e][o] = { defaultImg: n, activeImg: r }, s.call(h);}).catch(function (i) {console.error(t + "[" + e + "].imgs[" + o + "] " + i);}), [2]) : [2];});});}, h.prototype.computedWidthAndHeight = function (t, e, i) {if (!e.width && !e.height) return [t.width, t.height];if (e.width && !e.height) {var n = this.getWidth(e.width, i.col);return [n, t.height * (n / t.width)];}if (!e.width && e.height) {var r = this.getHeight(e.height, i.row);return [t.width * (r / t.height), r];}return [this.getWidth(e.width, i.col), this.getHeight(e.height, i.row)];}, h.prototype.draw = function () {var t,e,i = this,n = this,r = n.config,h = n.ctx,c = n._defaultConfig,l = n._defaultStyle,f = n._activeStyle;null === (t = r.beforeDraw) || void 0 === t || t.call(this, h), h.clearRect(0, 0, this.boxWidth, this.boxHeight), this.cells = o(o([], this.prizes), this.buttons), this.button && this.cells.push(this.button), this.cells.forEach(function (t) {t.col = t.col || 1, t.row = t.row || 1;}), this.prizeArea = this.blocks.reduce(function (t, e) {var n = t.x,r = t.y,o = t.w,a = t.h,c = function (t) {var e,i = (null === (e = t.padding) || void 0 === e ? void 0 : e.replace(/px/g, "").split(" ").map(function (t) {return ~~t;})) || [0],n = 0,r = 0,o = 0,a = 0;switch (i.length) {case 1:n = r = o = a = i[0];break;case 2:n = r = i[0], o = a = i[1];break;case 3:n = i[0], o = a = i[1], r = i[2];break;default:n = i[0], r = i[1], o = i[2], a = i[3];}var u = { paddingTop: n, paddingBottom: r, paddingLeft: o, paddingRight: a };for (var h in u) {u[h] = Object.prototype.hasOwnProperty.call(t, h) && s(t[h], "string", "number") ? ~~String(t[h]).replace(/px/g, "") : u[h];}return [n, r, o, a];}(e),f = c[0],d = c[1],p = c[2],g = c[3],m = e.borderRadius ? i.getLength(e.borderRadius) : 0,v = e.background || l.background;return u(v) && S(h, n, r, o, a, m, i.handleBackground(n, r, o, a, v)), { x: n + p, y: r + f, w: o - p - g, h: a - f - d };}, { x: 0, y: 0, w: this.boxWidth, h: this.boxHeight }), this.cellWidth = (this.prizeArea.w - c.gutter * (this.cols - 1)) / this.cols, this.cellHeight = (this.prizeArea.h - c.gutter * (this.rows - 1)) / this.rows, this.cells.forEach(function (t, e) {var n = i.getGeometricProperty([t.x, t.y, t.col, t.row]),o = n[0],s = n[1],c = n[2],d = n[3],p = !1;(void 0 === i.prizeFlag || i.prizeFlag > -1) && (p = e === i.currIndex % i.prizes.length >> 0);var g = p ? f.background : t.background || l.background;if (u(g)) {var m = (p ? f.shadow : t.shadow || l.shadow).replace(/px/g, "").split(",")[0].split(" ").map(function (t, e) {return e < 3 ? Number(t) : t;});4 === m.length && (h.shadowColor = m[3], h.shadowOffsetX = m[0] * r.dpr, h.shadowOffsetY = m[1] * r.dpr, h.shadowBlur = m[2], m[0] > 0 ? c -= m[0] : (c += m[0], o -= m[0]), m[1] > 0 ? d -= m[1] : (d += m[1], s -= m[1])), S(h, o, s, c, d, i.getLength(t.borderRadius ? t.borderRadius : l.borderRadius), i.handleBackground(o, s, c, d, g)), h.shadowColor = "rgba(0, 0, 0, 0)", h.shadowOffsetX = 0, h.shadowOffsetY = 0, h.shadowBlur = 0;}var v = "prizeImgs";e >= i.prizes.length && (v = "btnImgs", e -= i.prizes.length), t.imgs && t.imgs.forEach(function (n, r) {if (i[v][e]) {var a = i[v][e][r];if (a) {var u = p && a.activeImg || a.defaultImg;if (u) {var h = i.computedWidthAndHeight(u, n, t),c = h[0],l = h[1],f = [o + i.getOffsetX(c, t.col), s + i.getHeight(n.top, t.row)],d = f[0],g = f[1];i.drawImage(u, d, g, c, l);}}}}), t.fonts && t.fonts.forEach(function (e) {var n = p && f.fontStyle ? f.fontStyle : e.fontStyle || l.fontStyle,r = p && f.fontWeight ? f.fontWeight : e.fontWeight || l.fontWeight,u = p && f.fontSize ? i.getLength(f.fontSize) : i.getLength(e.fontSize || l.fontSize),c = p && f.lineHeight ? f.lineHeight : e.lineHeight || l.lineHeight || e.fontSize || l.fontSize;h.font = r + " " + (u >> 0) + "px " + n, h.fillStyle = p && f.fontColor ? f.fontColor : e.fontColor || l.fontColor;var d = [],g = String(e.text);if (Object.prototype.hasOwnProperty.call(e, "wordWrap") ? e.wordWrap : l.wordWrap) {g = a(g);for (var m = "", v = 0; v < g.length; v++) {m += g[v], h.measureText(m).width > i.getWidth(e.lengthLimit || l.lengthLimit, t.col) && (d.push(m.slice(0, -1)), m = g[v]);}m && d.push(m), d.length || d.push(g);} else d = g.split("\n");d.forEach(function (n, r) {h.fillText(n, o + i.getOffsetX(h.measureText(n).width, t.col), s + i.getHeight(e.top, t.row) + (r + 1) * i.getLength(c));});});}), null === (e = r.afterDraw) || void 0 === e || e.call(this, h);}, h.prototype.handleBackground = function (t, e, i, n, r) {var o = this.ctx;return r.includes("linear-gradient") && (r = function (t, e, i, n, r, o) {var s = /linear-gradient\((.+)\)/.exec(o)[1].split(",").map(function (t) {return t.trim();}),a = s.shift(),u = [0, 0, 0, 0];if (a.includes("deg")) {var h = function h(t) {return Math.tan(t / 180 * Math.PI);};(a = a.slice(0, -3) % 360) >= 0 && a < 45 ? u = [e, i + r, e + n, i + r - n * h(a - 0)] : a >= 45 && a < 90 ? u = [e, i + r, e + n - r * h(a - 45), i] : a >= 90 && a < 135 ? u = [e + n, i + r, e + n - r * h(a - 90), i] : a >= 135 && a < 180 ? u = [e + n, i + r, e, i + n * h(a - 135)] : a >= 180 && a < 225 ? u = [e + n, i, e, i + n * h(a - 180)] : a >= 225 && a < 270 ? u = [e + n, i, e + r * h(a - 225), i + r] : a >= 270 && a < 315 ? u = [e, i, e + r * h(a - 270), i + r] : a >= 315 && a < 360 && (u = [e, i, e + n, i + r - n * h(a - 315)]);} else a.includes("top") ? u = [e, i + r, e, i] : a.includes("bottom") ? u = [e, i, e, i + r] : a.includes("left") ? u = [e + n, i, e, i] : a.includes("right") && (u = [e, i, e + n, i]);var c = t.createLinearGradient.apply(t, u.map(function (t) {return t >> 0;}));return s.reduce(function (t, e, i) {var n = e.split(" ");return 1 === n.length ? t.addColorStop(i, n[0]) : 2 === n.length && t.addColorStop.apply(t, n), t;}, c);}(o, t, e, i, n, r)), r;}, h.prototype.play = function () {var t = this.config.clearInterval;this.startTime || (t(this.timer), this.startTime = Date.now(), this.prizeFlag = void 0, this.run());}, h.prototype.stop = function (t) {this.prizeFlag = t < 0 ? -1 : t % this.prizes.length, -1 === this.prizeFlag && (this.currIndex = 0, this.draw());}, h.prototype.run = function (t) {void 0 === t && (t = 0);var e = this,i = e.rAF,n = e.currIndex,r = e.prizes,o = e.prizeFlag,s = e.startTime,a = e._defaultConfig,u = Date.now() - s;if (u >= a.accelerationTime && void 0 !== o) {this.FPS = u / t, this.endTime = Date.now(), this.stopIndex = n;for (var h = 0; ++h;) {var c = r.length * h + o - (n >> 0);if (C.easeOut(this.FPS, this.stopIndex, c, a.decelerationTime) - this.stopIndex > a.speed) {this.endIndex = c;break;}}return this.slowDown();}this.currIndex = (n + C.easeIn(u, .1, a.speed, a.accelerationTime)) % r.length, this.draw(), i(this.run.bind(this, t + 1));}, h.prototype.slowDown = function () {var t,e = this,n = e.rAF,r = e.prizes,o = e.prizeFlag,s = e.stopIndex,a = e.endIndex,u = e._defaultConfig,h = Date.now() - this.endTime;if (-1 !== o) {if (h > u.decelerationTime) return this.startTime = 0, void (null === (t = this.endCallback) || void 0 === t || t.call(this, _i({}, r.find(function (t, e) {return e === o;}))));this.currIndex = C.easeOut(h, s, a, u.decelerationTime) % r.length, this.draw(), n(this.slowDown.bind(this));} else this.startTime = 0;}, h.prototype.walk = function () {var t = this,e = this.config,i = e.setInterval;(0, e.clearInterval)(this.timer), this.timer = i(function () {t.currIndex += 1, t.draw();}, 1300);}, h.prototype.getGeometricProperty = function (t) {var e = t[0],i = t[1],n = t[2],r = t[3],o = this.cellWidth,s = this.cellHeight,a = this._defaultConfig.gutter,u = [this.prizeArea.x + (o + a) * e, this.prizeArea.y + (s + a) * i];return n && r && u.push(o * n + a * (n - 1), s * r + a * (r - 1)), u;}, h.prototype.getWidth = function (t, e) {return void 0 === e && (e = 1), s(t, "number") ? t : s(t, "string") ? this.changeUnits(t, this.cellWidth * e + this._defaultConfig.gutter * (e - 1)) : 0;}, h.prototype.getHeight = function (t, e) {return void 0 === e && (e = 1), s(t, "number") ? t : s(t, "string") ? this.changeUnits(t, this.cellHeight * e + this._defaultConfig.gutter * (e - 1)) : 0;}, h.prototype.getOffsetX = function (t, e) {return void 0 === e && (e = 1), (this.cellWidth * e + this._defaultConfig.gutter * (e - 1) - t) / 2;}, h.prototype.conversionAxis = function (t, e) {var i = this.config;return [t / i.dpr, e / i.dpr];}, h;}(y);exports.LuckyGrid = P, exports.LuckyWheel = E;

/***/ }),

/***/ 42:
/*!*******************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/axios/lib/axios.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ 43);
var bind = __webpack_require__(/*! ./helpers/bind */ 44);
var Axios = __webpack_require__(/*! ./core/Axios */ 45);
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ 65);
var defaults = __webpack_require__(/*! ./defaults */ 51);

/**
                                       * Create an instance of Axios
                                       *
                                       * @param {Object} defaultConfig The default config for the instance
                                       * @return {Axios} A new instance of Axios
                                       */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ 66);
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ 67);
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ 50);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ 68);

// Expose isAxiosError
axios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ 69);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

/***/ }),

/***/ 43:
/*!*******************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/axios/lib/utils.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ 44);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
                                           * Determine if a value is an Array
                                           *
                                           * @param {Object} val The value to test
                                           * @returns {boolean} True if value is an Array, otherwise false
                                           */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
   * Determine if a value is undefined
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if the value is undefined, otherwise false
   */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
   * Determine if a value is a Buffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Buffer, otherwise false
   */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) &&
  typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
   * Determine if a value is an ArrayBuffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an ArrayBuffer, otherwise false
   */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
   * Determine if a value is a FormData
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an FormData, otherwise false
   */
function isFormData(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}

/**
   * Determine if a value is a view on an ArrayBuffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
   */
function isArrayBufferView(val) {
  var result;
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && val.buffer instanceof ArrayBuffer;
  }
  return result;
}

/**
   * Determine if a value is a String
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a String, otherwise false
   */
function isString(val) {
  return typeof val === 'string';
}

/**
   * Determine if a value is a Number
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Number, otherwise false
   */
function isNumber(val) {
  return typeof val === 'number';
}

/**
   * Determine if a value is an Object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Object, otherwise false
   */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
   * Determine if a value is a plain Object
   *
   * @param {Object} val The value to test
   * @return {boolean} True if value is a plain Object, otherwise false
   */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
   * Determine if a value is a Date
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Date, otherwise false
   */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
   * Determine if a value is a File
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a File, otherwise false
   */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
   * Determine if a value is a Blob
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Blob, otherwise false
   */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
   * Determine if a value is a Function
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Function, otherwise false
   */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
   * Determine if a value is a Stream
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Stream, otherwise false
   */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
   * Determine if a value is a URLSearchParams object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a URLSearchParams object, otherwise false
   */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
   * Trim excess whitespace off the beginning and end of a string
   *
   * @param {String} str The String to trim
   * @returns {String} The String freed of excess whitespace
   */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
   * Determine if we're running in a standard browser environment
   *
   * This allows axios to run in a web worker, and react-native.
   * Both environments support XMLHttpRequest, but not fully standard globals.
   *
   * web workers:
   *  typeof window -> undefined
   *  typeof document -> undefined
   *
   * react-native:
   *  navigator.product -> 'ReactNative'
   * nativescript
   *  navigator.product -> 'NativeScript' or 'NS'
   */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
  navigator.product === 'NativeScript' ||
  navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined');

}

/**
   * Iterate over an Array or an Object invoking a function for each item.
   *
   * If `obj` is an Array callback will be called passing
   * the value, index, and complete array for each item.
   *
   * If 'obj' is an Object callback will be called passing
   * the value, key, and complete object for each property.
   *
   * @param {Object|Array} obj The object to iterate
   * @param {Function} fn The callback to invoke for each item
   */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
   * Accepts varargs expecting each argument to be an object, then
   * immutably merges the properties of each object and returns result.
   *
   * When multiple objects contain the same key the later object in
   * the arguments list will take precedence.
   *
   * Example:
   *
   * ```js
   * var result = merge({foo: 123}, {foo: 456});
   * console.log(result.foo); // outputs 456
   * ```
   *
   * @param {Object} obj1 Object to merge
   * @returns {Object} Result of all merge properties
   */
function merge() /* obj1, obj2, obj3, ... */{
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
   * Extends object a by mutably adding to it the properties of object b.
   *
   * @param {Object} a The object to be extended
   * @param {Object} b The object to copy properties from
   * @param {Object} thisArg The object to bind function to
   * @return {Object} The resulting value of object a
   */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
   * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
   *
   * @param {string} content with BOM
   * @return {string} content value without BOM
   */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM };

/***/ }),

/***/ 44:
/*!**************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/axios/lib/helpers/bind.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

/***/ }),

/***/ 447:
/*!**************************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/uview-ui/libs/util/async-validator.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _extends() {
  _extends = Object.assign || function (target) {
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

  return _extends.apply(this, arguments);
}

/* eslint no-console:0 */
var formatRegExp = /%[sdj%]/g;
var warning = function warning() {}; // don't print warning message when in production env or node runtime

if (typeof process !== 'undefined' && Object({"VUE_APP_NAME":"shop","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}) && "development" !== 'production' && typeof window !==
'undefined' && typeof document !== 'undefined') {
  warning = function warning(type, errors) {
    if (typeof console !== 'undefined' && console.warn) {
      if (errors.every(function (e) {
        return typeof e === 'string';
      })) {
        console.warn(type, errors);
      }
    }
  };
}

function convertFieldsError(errors) {
  if (!errors || !errors.length) return null;
  var fields = {};
  errors.forEach(function (error) {
    var field = error.field;
    fields[field] = fields[field] || [];
    fields[field].push(error);
  });
  return fields;
}

function format() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var i = 1;
  var f = args[0];
  var len = args.length;

  if (typeof f === 'function') {
    return f.apply(null, args.slice(1));
  }

  if (typeof f === 'string') {
    var str = String(f).replace(formatRegExp, function (x) {
      if (x === '%%') {
        return '%';
      }

      if (i >= len) {
        return x;
      }

      switch (x) {
        case '%s':
          return String(args[i++]);

        case '%d':
          return Number(args[i++]);

        case '%j':
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return '[Circular]';
          }

          break;

        default:
          return x;}

    });

    for (var arg = args[i]; i < len; arg = args[++i]) {
      str += " " + arg;
    }

    return str;
  }

  return f;
}

function isNativeStringType(type) {
  return type === 'string' || type === 'url' || type === 'hex' || type === 'email' || type === 'pattern';
}

function isEmptyValue(value, type) {
  if (value === undefined || value === null) {
    return true;
  }

  if (type === 'array' && Array.isArray(value) && !value.length) {
    return true;
  }

  if (isNativeStringType(type) && typeof value === 'string' && !value) {
    return true;
  }

  return false;
}

function asyncParallelArray(arr, func, callback) {
  var results = [];
  var total = 0;
  var arrLength = arr.length;

  function count(errors) {
    results.push.apply(results, errors);
    total++;

    if (total === arrLength) {
      callback(results);
    }
  }

  arr.forEach(function (a) {
    func(a, count);
  });
}

function asyncSerialArray(arr, func, callback) {
  var index = 0;
  var arrLength = arr.length;

  function next(errors) {
    if (errors && errors.length) {
      callback(errors);
      return;
    }

    var original = index;
    index = index + 1;

    if (original < arrLength) {
      func(arr[original], next);
    } else {
      callback([]);
    }
  }

  next([]);
}

function flattenObjArr(objArr) {
  var ret = [];
  Object.keys(objArr).forEach(function (k) {
    ret.push.apply(ret, objArr[k]);
  });
  return ret;
}

function asyncMap(objArr, option, func, callback) {
  if (option.first) {
    var _pending = new Promise(function (resolve, reject) {
      var next = function next(errors) {
        callback(errors);
        return errors.length ? reject({
          errors: errors,
          fields: convertFieldsError(errors) }) :
        resolve();
      };

      var flattenArr = flattenObjArr(objArr);
      asyncSerialArray(flattenArr, func, next);
    });

    _pending["catch"](function (e) {
      return e;
    });

    return _pending;
  }

  var firstFields = option.firstFields || [];

  if (firstFields === true) {
    firstFields = Object.keys(objArr);
  }

  var objArrKeys = Object.keys(objArr);
  var objArrLength = objArrKeys.length;
  var total = 0;
  var results = [];
  var pending = new Promise(function (resolve, reject) {
    var next = function next(errors) {
      results.push.apply(results, errors);
      total++;

      if (total === objArrLength) {
        callback(results);
        return results.length ? reject({
          errors: results,
          fields: convertFieldsError(results) }) :
        resolve();
      }
    };

    if (!objArrKeys.length) {
      callback(results);
      resolve();
    }

    objArrKeys.forEach(function (key) {
      var arr = objArr[key];

      if (firstFields.indexOf(key) !== -1) {
        asyncSerialArray(arr, func, next);
      } else {
        asyncParallelArray(arr, func, next);
      }
    });
  });
  pending["catch"](function (e) {
    return e;
  });
  return pending;
}

function complementError(rule) {
  return function (oe) {
    if (oe && oe.message) {
      oe.field = oe.field || rule.fullField;
      return oe;
    }

    return {
      message: typeof oe === 'function' ? oe() : oe,
      field: oe.field || rule.fullField };

  };
}

function deepMerge(target, source) {
  if (source) {
    for (var s in source) {
      if (source.hasOwnProperty(s)) {
        var value = source[s];

        if (typeof value === 'object' && typeof target[s] === 'object') {
          target[s] = _extends({}, target[s], {}, value);
        } else {
          target[s] = value;
        }
      }
    }
  }

  return target;
}

/**
   *  Rule for validating required fields.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function required(rule, value, source, errors, options, type) {
  if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type || rule.type))) {
    errors.push(format(options.messages.required, rule.fullField));
  }
}

/**
   *  Rule for validating whitespace.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function whitespace(rule, value, source, errors, options) {
  if (/^\s+$/.test(value) || value === '') {
    errors.push(format(options.messages.whitespace, rule.fullField));
  }
}

/* eslint max-len:0 */

var pattern = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  url: new RegExp(
  "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
  'i'),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i };

var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  "float": function _float(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  regexp: function regexp(value) {
    if (value instanceof RegExp) {
      return true;
    }

    try {
      return !!new RegExp(value);
    } catch (e) {
      return false;
    }
  },
  date: function date(value) {
    return typeof value.getTime === 'function' && typeof value.getMonth === 'function' && typeof value.getYear ===
    'function';
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false;
    }

    // 修改源码，将字符串数值先转为数值
    return typeof +value === 'number';
  },
  object: function object(value) {
    return typeof value === 'object' && !types.array(value);
  },
  method: function method(value) {
    return typeof value === 'function';
  },
  email: function email(value) {
    return typeof value === 'string' && !!value.match(pattern.email) && value.length < 255;
  },
  url: function url(value) {
    return typeof value === 'string' && !!value.match(pattern.url);
  },
  hex: function hex(value) {
    return typeof value === 'string' && !!value.match(pattern.hex);
  } };

/**
        *  Rule for validating the type of a value.
        *
        *  @param rule The validation rule.
        *  @param value The value of the field on the source object.
        *  @param source The source object being validated.
        *  @param errors An array of errors that this rule may add
        *  validation errors to.
        *  @param options The validation options.
        *  @param options.messages The validation messages.
        */

function type(rule, value, source, errors, options) {
  if (rule.required && value === undefined) {
    required(rule, value, source, errors, options);
    return;
  }

  var custom = ['integer', 'float', 'array', 'regexp', 'object', 'method', 'email', 'number', 'date', 'url', 'hex'];
  var ruleType = rule.type;

  if (custom.indexOf(ruleType) > -1) {
    if (!types[ruleType](value)) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    } // straight typeof check

  } else if (ruleType && typeof value !== rule.type) {
    errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
  }
}

/**
   *  Rule for validating minimum and maximum allowed values.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function range(rule, value, source, errors, options) {
  var len = typeof rule.len === 'number';
  var min = typeof rule.min === 'number';
  var max = typeof rule.max === 'number'; // 正则匹配码点范围从U+010000一直到U+10FFFF的文字（补充平面Supplementary Plane）

  var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  var val = value;
  var key = null;
  var num = typeof value === 'number';
  var str = typeof value === 'string';
  var arr = Array.isArray(value);

  if (num) {
    key = 'number';
  } else if (str) {
    key = 'string';
  } else if (arr) {
    key = 'array';
  } // if the value is not of a supported type for range validation
  // the validation rule rule should use the
  // type property to also test for a particular type


  if (!key) {
    return false;
  }

  if (arr) {
    val = value.length;
  }

  if (str) {
    // 处理码点大于U+010000的文字length属性不准确的bug，如"𠮷𠮷𠮷".lenght !== 3
    val = value.replace(spRegexp, '_').length;
  }

  if (len) {
    if (val !== rule.len) {
      errors.push(format(options.messages[key].len, rule.fullField, rule.len));
    }
  } else if (min && !max && val < rule.min) {
    errors.push(format(options.messages[key].min, rule.fullField, rule.min));
  } else if (max && !min && val > rule.max) {
    errors.push(format(options.messages[key].max, rule.fullField, rule.max));
  } else if (min && max && (val < rule.min || val > rule.max)) {
    errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
  }
}

var ENUM = 'enum';
/**
                    *  Rule for validating a value exists in an enumerable list.
                    *
                    *  @param rule The validation rule.
                    *  @param value The value of the field on the source object.
                    *  @param source The source object being validated.
                    *  @param errors An array of errors that this rule may add
                    *  validation errors to.
                    *  @param options The validation options.
                    *  @param options.messages The validation messages.
                    */

function enumerable(rule, value, source, errors, options) {
  rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];

  if (rule[ENUM].indexOf(value) === -1) {
    errors.push(format(options.messages[ENUM], rule.fullField, rule[ENUM].join(', ')));
  }
}

/**
   *  Rule for validating a regular expression pattern.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function pattern$1(rule, value, source, errors, options) {
  if (rule.pattern) {
    if (rule.pattern instanceof RegExp) {
      // if a RegExp instance is passed, reset `lastIndex` in case its `global`
      // flag is accidentally set to `true`, which in a validation scenario
      // is not necessary and the result might be misleading
      rule.pattern.lastIndex = 0;

      if (!rule.pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    } else if (typeof rule.pattern === 'string') {
      var _pattern = new RegExp(rule.pattern);

      if (!_pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    }
  }
}

var rules = {
  required: required,
  whitespace: whitespace,
  type: type,
  range: range,
  "enum": enumerable,
  pattern: pattern$1 };


/**
                         *  Performs validation for string types.
                         *
                         *  @param rule The validation rule.
                         *  @param value The value of the field on the source object.
                         *  @param callback The callback function.
                         *  @param source The source object being validated.
                         *  @param options The validation options.
                         *  @param options.messages The validation messages.
                         */

function string(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, 'string');

    if (!isEmptyValue(value, 'string')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
      rules.pattern(rule, value, source, errors, options);

      if (rule.whitespace === true) {
        rules.whitespace(rule, value, source, errors, options);
      }
    }
  }

  callback(errors);
}

/**
   *  Validates a function.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function method(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function number(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (value === '') {
      value = undefined;
    }

    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a boolean.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function _boolean(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates the regular expression type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function regexp(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value)) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number is an integer.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function integer(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number is a floating point number.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function floatFn(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates an array.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function array(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'array') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, 'array');

    if (!isEmptyValue(value, 'array')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates an object.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function object(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

var ENUM$1 = 'enum';
/**
                      *  Validates an enumerable list.
                      *
                      *  @param rule The validation rule.
                      *  @param value The value of the field on the source object.
                      *  @param callback The callback function.
                      *  @param source The source object being validated.
                      *  @param options The validation options.
                      *  @param options.messages The validation messages.
                      */

function enumerable$1(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules[ENUM$1](rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a regular expression pattern.
   *
   *  Performs validation when a rule only contains
   *  a pattern property but is not declared as a string type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function pattern$2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value, 'string')) {
      rules.pattern(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

function date(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value)) {
      var dateObject;

      if (typeof value === 'number') {
        dateObject = new Date(value);
      } else {
        dateObject = value;
      }

      rules.type(rule, dateObject, source, errors, options);

      if (dateObject) {
        rules.range(rule, dateObject.getTime(), source, errors, options);
      }
    }
  }

  callback(errors);
}

function required$1(rule, value, callback, source, options) {
  var errors = [];
  var type = Array.isArray(value) ? 'array' : typeof value;
  rules.required(rule, value, source, errors, options, type);
  callback(errors);
}

function type$1(rule, value, callback, source, options) {
  var ruleType = rule.type;
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, ruleType) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, ruleType);

    if (!isEmptyValue(value, ruleType)) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Performs validation for any type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function any(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);
  }

  callback(errors);
}

var validators = {
  string: string,
  method: method,
  number: number,
  "boolean": _boolean,
  regexp: regexp,
  integer: integer,
  "float": floatFn,
  array: array,
  object: object,
  "enum": enumerable$1,
  pattern: pattern$2,
  date: date,
  url: type$1,
  hex: type$1,
  email: type$1,
  required: required$1,
  any: any };


function newMessages() {
  return {
    "default": 'Validation error on field %s',
    required: '%s is required',
    "enum": '%s must be one of %s',
    whitespace: '%s cannot be empty',
    date: {
      format: '%s date %s is invalid for format %s',
      parse: '%s date could not be parsed, %s is invalid ',
      invalid: '%s date %s is invalid' },

    types: {
      string: '%s is not a %s',
      method: '%s is not a %s (function)',
      array: '%s is not an %s',
      object: '%s is not an %s',
      number: '%s is not a %s',
      date: '%s is not a %s',
      "boolean": '%s is not a %s',
      integer: '%s is not an %s',
      "float": '%s is not a %s',
      regexp: '%s is not a valid %s',
      email: '%s is not a valid %s',
      url: '%s is not a valid %s',
      hex: '%s is not a valid %s' },

    string: {
      len: '%s must be exactly %s characters',
      min: '%s must be at least %s characters',
      max: '%s cannot be longer than %s characters',
      range: '%s must be between %s and %s characters' },

    number: {
      len: '%s must equal %s',
      min: '%s cannot be less than %s',
      max: '%s cannot be greater than %s',
      range: '%s must be between %s and %s' },

    array: {
      len: '%s must be exactly %s in length',
      min: '%s cannot be less than %s in length',
      max: '%s cannot be greater than %s in length',
      range: '%s must be between %s and %s in length' },

    pattern: {
      mismatch: '%s value %s does not match pattern %s' },

    clone: function clone() {
      var cloned = JSON.parse(JSON.stringify(this));
      cloned.clone = this.clone;
      return cloned;
    } };

}
var messages = newMessages();

/**
                               *  Encapsulates a validation schema.
                               *
                               *  @param descriptor An object declaring validation rules
                               *  for this schema.
                               */

function Schema(descriptor) {
  this.rules = null;
  this._messages = messages;
  this.define(descriptor);
}

Schema.prototype = {
  messages: function messages(_messages) {
    if (_messages) {
      this._messages = deepMerge(newMessages(), _messages);
    }

    return this._messages;
  },
  define: function define(rules) {
    if (!rules) {
      throw new Error('Cannot configure a schema with no rules');
    }

    if (typeof rules !== 'object' || Array.isArray(rules)) {
      throw new Error('Rules must be an object');
    }

    this.rules = {};
    var z;
    var item;

    for (z in rules) {
      if (rules.hasOwnProperty(z)) {
        item = rules[z];
        this.rules[z] = Array.isArray(item) ? item : [item];
      }
    }
  },
  validate: function validate(source_, o, oc) {
    var _this = this;

    if (o === void 0) {
      o = {};
    }

    if (oc === void 0) {
      oc = function oc() {};
    }

    var source = source_;
    var options = o;
    var callback = oc;

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    if (!this.rules || Object.keys(this.rules).length === 0) {
      if (callback) {
        callback();
      }

      return Promise.resolve();
    }

    function complete(results) {
      var i;
      var errors = [];
      var fields = {};

      function add(e) {
        if (Array.isArray(e)) {
          var _errors;

          errors = (_errors = errors).concat.apply(_errors, e);
        } else {
          errors.push(e);
        }
      }

      for (i = 0; i < results.length; i++) {
        add(results[i]);
      }

      if (!errors.length) {
        errors = null;
        fields = null;
      } else {
        fields = convertFieldsError(errors);
      }

      callback(errors, fields);
    }

    if (options.messages) {
      var messages$1 = this.messages();

      if (messages$1 === messages) {
        messages$1 = newMessages();
      }

      deepMerge(messages$1, options.messages);
      options.messages = messages$1;
    } else {
      options.messages = this.messages();
    }

    var arr;
    var value;
    var series = {};
    var keys = options.keys || Object.keys(this.rules);
    keys.forEach(function (z) {
      arr = _this.rules[z];
      value = source[z];
      arr.forEach(function (r) {
        var rule = r;

        if (typeof rule.transform === 'function') {
          if (source === source_) {
            source = _extends({}, source);
          }

          value = source[z] = rule.transform(value);
        }

        if (typeof rule === 'function') {
          rule = {
            validator: rule };

        } else {
          rule = _extends({}, rule);
        }

        rule.validator = _this.getValidationMethod(rule);
        rule.field = z;
        rule.fullField = rule.fullField || z;
        rule.type = _this.getType(rule);

        if (!rule.validator) {
          return;
        }

        series[z] = series[z] || [];
        series[z].push({
          rule: rule,
          value: value,
          source: source,
          field: z });

      });
    });
    var errorFields = {};
    return asyncMap(series, options, function (data, doIt) {
      var rule = data.rule;
      var deep = (rule.type === 'object' || rule.type === 'array') && (typeof rule.fields === 'object' || typeof rule.defaultField ===
      'object');
      deep = deep && (rule.required || !rule.required && data.value);
      rule.field = data.field;

      function addFullfield(key, schema) {
        return _extends({}, schema, {
          fullField: rule.fullField + "." + key });

      }

      function cb(e) {
        if (e === void 0) {
          e = [];
        }

        var errors = e;

        if (!Array.isArray(errors)) {
          errors = [errors];
        }

        if (!options.suppressWarning && errors.length) {
          Schema.warning('async-validator:', errors);
        }

        if (errors.length && rule.message) {
          errors = [].concat(rule.message);
        }

        errors = errors.map(complementError(rule));

        if (options.first && errors.length) {
          errorFields[rule.field] = 1;
          return doIt(errors);
        }

        if (!deep) {
          doIt(errors);
        } else {
          // if rule is required but the target object
          // does not exist fail at the rule level and don't
          // go deeper
          if (rule.required && !data.value) {
            if (rule.message) {
              errors = [].concat(rule.message).map(complementError(rule));
            } else if (options.error) {
              errors = [options.error(rule, format(options.messages.required, rule.field))];
            } else {
              errors = [];
            }

            return doIt(errors);
          }

          var fieldsSchema = {};

          if (rule.defaultField) {
            for (var k in data.value) {
              if (data.value.hasOwnProperty(k)) {
                fieldsSchema[k] = rule.defaultField;
              }
            }
          }

          fieldsSchema = _extends({}, fieldsSchema, {}, data.rule.fields);

          for (var f in fieldsSchema) {
            if (fieldsSchema.hasOwnProperty(f)) {
              var fieldSchema = Array.isArray(fieldsSchema[f]) ? fieldsSchema[f] : [fieldsSchema[f]];
              fieldsSchema[f] = fieldSchema.map(addFullfield.bind(null, f));
            }
          }

          var schema = new Schema(fieldsSchema);
          schema.messages(options.messages);

          if (data.rule.options) {
            data.rule.options.messages = options.messages;
            data.rule.options.error = options.error;
          }

          schema.validate(data.value, data.rule.options || options, function (errs) {
            var finalErrors = [];

            if (errors && errors.length) {
              finalErrors.push.apply(finalErrors, errors);
            }

            if (errs && errs.length) {
              finalErrors.push.apply(finalErrors, errs);
            }

            doIt(finalErrors.length ? finalErrors : null);
          });
        }
      }

      var res;

      if (rule.asyncValidator) {
        res = rule.asyncValidator(rule, data.value, cb, data.source, options);
      } else if (rule.validator) {
        res = rule.validator(rule, data.value, cb, data.source, options);

        if (res === true) {
          cb();
        } else if (res === false) {
          cb(rule.message || rule.field + " fails");
        } else if (res instanceof Array) {
          cb(res);
        } else if (res instanceof Error) {
          cb(res.message);
        }
      }

      if (res && res.then) {
        res.then(function () {
          return cb();
        }, function (e) {
          return cb(e);
        });
      }
    }, function (results) {
      complete(results);
    });
  },
  getType: function getType(rule) {
    if (rule.type === undefined && rule.pattern instanceof RegExp) {
      rule.type = 'pattern';
    }

    if (typeof rule.validator !== 'function' && rule.type && !validators.hasOwnProperty(rule.type)) {
      throw new Error(format('Unknown rule type %s', rule.type));
    }

    return rule.type || 'string';
  },
  getValidationMethod: function getValidationMethod(rule) {
    if (typeof rule.validator === 'function') {
      return rule.validator;
    }

    var keys = Object.keys(rule);
    var messageIndex = keys.indexOf('message');

    if (messageIndex !== -1) {
      keys.splice(messageIndex, 1);
    }

    if (keys.length === 1 && keys[0] === 'required') {
      return validators.required;
    }

    return validators[this.getType(rule)] || false;
  } };


Schema.register = function register(type, validator) {
  if (typeof validator !== 'function') {
    throw new Error('Cannot register a validator by type, validator is not a function');
  }

  validators[type] = validator;
};

Schema.warning = warning;
Schema.messages = messages;var _default =

Schema;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/node-libs-browser/mock/process.js */ 52)))

/***/ }),

/***/ 45:
/*!************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/axios/lib/core/Axios.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 43);
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ 46);
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ 47);
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ 48);
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ 65);

/**
                                             * Create a new instance of Axios
                                             *
                                             * @param {Object} instanceConfig The default config for the instance
                                             */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager() };

}

/**
   * Dispatch a request
   *
   * @param {Object} config The config specific for this request (merged with this.defaults)
   */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data }));

  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data }));

  };
});

module.exports = Axios;

/***/ }),

/***/ 46:
/*!******************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/axios/lib/helpers/buildURL.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 43);

function encode(val) {
  return encodeURIComponent(val).
  replace(/%3A/gi, ':').
  replace(/%24/g, '$').
  replace(/%2C/gi, ',').
  replace(/%20/g, '+').
  replace(/%5B/gi, '[').
  replace(/%5D/gi, ']');
}

/**
   * Build a URL by appending params to the end
   *
   * @param {string} url The base of the url (e.g., http://www.google.com)
   * @param {object} [params] The params to be appended
   * @returns {string} The formatted url
   */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

/***/ }),

/***/ 47:
/*!*************************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/axios/lib/core/InterceptorManager.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 43);

function InterceptorManager() {
  this.handlers = [];
}

/**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected });

  return this.handlers.length - 1;
};

/**
    * Remove an interceptor from the stack
    *
    * @param {Number} id The ID that was returned by `use`
    */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
    * Iterate over all the registered interceptors
    *
    * This method is particularly useful for skipping over any
    * interceptors that may have become `null` calling `eject`.
    *
    * @param {Function} fn The function to call for each interceptor
    */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

/***/ }),

/***/ 48:
/*!**********************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/axios/lib/core/dispatchRequest.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 43);
var transformData = __webpack_require__(/*! ./transformData */ 49);
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ 50);
var defaults = __webpack_require__(/*! ../defaults */ 51);

/**
                                        * Throws a `Cancel` if cancellation has been requested.
                                        */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
   * Dispatch a request to the server using the configured adapter.
   *
   * @param {object} config The config that is to be used for the request
   * @returns {Promise} The Promise to be fulfilled
   */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
  config.data,
  config.headers,
  config.transformRequest);


  // Flatten headers
  config.headers = utils.merge(
  config.headers.common || {},
  config.headers[config.method] || {},
  config.headers);


  utils.forEach(
  ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
  function cleanHeaderConfig(method) {
    delete config.headers[method];
  });


  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
    response.data,
    response.headers,
    config.transformResponse);


    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
        reason.response.data,
        reason.response.headers,
        config.transformResponse);

      }
    }

    return Promise.reject(reason);
  });
};

/***/ }),

/***/ 49:
/*!********************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/axios/lib/core/transformData.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 43);

/**
                                    * Transform the data for a request or a response
                                    *
                                    * @param {Object|String} data The data to be transformed
                                    * @param {Array} headers The headers for the request or response
                                    * @param {Array|Function} fns A single function or Array of functions
                                    * @returns {*} The resulting transformed data
                                    */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

/***/ }),

/***/ 50:
/*!*****************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/axios/lib/cancel/isCancel.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

/***/ }),

/***/ 51:
/*!**********************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/axios/lib/defaults.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ 43);
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ 54);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded' };


function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ 55);
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ 55);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
    utils.isArrayBuffer(data) ||
    utils.isBuffer(data) ||
    utils.isStream(data) ||
    utils.isFile(data) ||
    utils.isBlob(data))
    {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {/* Ignore */}
    }
    return data;
  }],

  /**
       * A timeout in milliseconds to abort a request. If set to 0 (default) a
       * timeout is not created.
       */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  } };


defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*' } };



utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/node-libs-browser/mock/process.js */ 52)))

/***/ }),

/***/ 52:
/*!********************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/process.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__(/*! path */ 53);
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),

/***/ 53:
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node-libs-browser/mock/process.js */ 52)))

/***/ }),

/***/ 54:
/*!*****************************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ 43);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/***/ }),

/***/ 55:
/*!**************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/axios/lib/adapters/xhr.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 43);
var settle = __webpack_require__(/*! ./../core/settle */ 56);
var cookies = __webpack_require__(/*! ./../helpers/cookies */ 59);
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ 46);
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ 60);
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ 63);
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ 64);
var createError = __webpack_require__(/*! ../core/createError */ 57);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request };


      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
      request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
      cookies.read(config.xsrfCookieName) :
      undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

/***/ }),

/***/ 56:
/*!*************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/axios/lib/core/settle.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ 57);

/**
                                             * Resolve or reject a Promise based on response status.
                                             *
                                             * @param {Function} resolve A function that resolves the promise.
                                             * @param {Function} reject A function that rejects the promise.
                                             * @param {object} response The response.
                                             */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
    'Request failed with status code ' + response.status,
    response.config,
    null,
    response.request,
    response));

  }
};

/***/ }),

/***/ 57:
/*!******************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/axios/lib/core/createError.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ 58);

/**
                                               * Create an Error with the specified message, config, error code, request and response.
                                               *
                                               * @param {string} message The error message.
                                               * @param {Object} config The config.
                                               * @param {string} [code] The error code (for example, 'ECONNABORTED').
                                               * @param {Object} [request] The request.
                                               * @param {Object} [response] The response.
                                               * @returns {Error} The created error.
                                               */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

/***/ }),

/***/ 58:
/*!*******************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/axios/lib/core/enhanceError.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Update an Error with the specified config, error code, and response.
               *
               * @param {Error} error The error to update.
               * @param {Object} config The config.
               * @param {string} [code] The error code (for example, 'ECONNABORTED').
               * @param {Object} [request] The request.
               * @param {Object} [response] The response.
               * @returns {Error} The error.
               */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code };

  };
  return error;
};

/***/ }),

/***/ 59:
/*!*****************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/axios/lib/helpers/cookies.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 43);

module.exports =
utils.isStandardBrowserEnv() ?

// Standard browser envs support document.cookie
function standardBrowserEnv() {
  return {
    write: function write(name, value, expires, path, domain, secure) {
      var cookie = [];
      cookie.push(name + '=' + encodeURIComponent(value));

      if (utils.isNumber(expires)) {
        cookie.push('expires=' + new Date(expires).toGMTString());
      }

      if (utils.isString(path)) {
        cookie.push('path=' + path);
      }

      if (utils.isString(domain)) {
        cookie.push('domain=' + domain);
      }

      if (secure === true) {
        cookie.push('secure');
      }

      document.cookie = cookie.join('; ');
    },

    read: function read(name) {
      var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return match ? decodeURIComponent(match[3]) : null;
    },

    remove: function remove(name) {
      this.write(name, '', Date.now() - 86400000);
    } };

}() :

// Non standard browser env (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return {
    write: function write() {},
    read: function read() {return null;},
    remove: function remove() {} };

}();

/***/ }),

/***/ 60:
/*!********************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/axios/lib/core/buildFullPath.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ 61);
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ 62);

/**
                                                      * Creates a new URL by combining the baseURL with the requestedURL,
                                                      * only when the requestedURL is not already an absolute URL.
                                                      * If the requestURL is absolute, this function returns the requestedURL untouched.
                                                      *
                                                      * @param {string} baseURL The base URL
                                                      * @param {string} requestedURL Absolute or relative URL to combine
                                                      * @returns {string} The combined full path
                                                      */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};

/***/ }),

/***/ 61:
/*!***********************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Determines whether the specified URL is absolute
               *
               * @param {string} url The URL to test
               * @returns {boolean} True if the specified URL is absolute, otherwise false
               */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

/***/ }),

/***/ 62:
/*!*********************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/axios/lib/helpers/combineURLs.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Creates a new URL by combining the specified URLs
               *
               * @param {string} baseURL The base URL
               * @param {string} relativeURL The relative URL
               * @returns {string} The combined URL
               */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL ?
  baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') :
  baseURL;
};

/***/ }),

/***/ 63:
/*!**********************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/axios/lib/helpers/parseHeaders.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 43);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
'age', 'authorization', 'content-length', 'content-type', 'etag',
'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
'last-modified', 'location', 'max-forwards', 'proxy-authorization',
'referer', 'retry-after', 'user-agent'];


/**
                                          * Parse headers into an object
                                          *
                                          * ```
                                          * Date: Wed, 27 Aug 2014 08:58:49 GMT
                                          * Content-Type: application/json
                                          * Connection: keep-alive
                                          * Transfer-Encoding: chunked
                                          * ```
                                          *
                                          * @param {String} headers Headers needing to be parsed
                                          * @returns {Object} Headers parsed into an object
                                          */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) {return parsed;}

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

/***/ }),

/***/ 64:
/*!*************************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 43);

module.exports =
utils.isStandardBrowserEnv() ?

// Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
function standardBrowserEnv() {
  var msie = /(msie|trident)/i.test(navigator.userAgent);
  var urlParsingNode = document.createElement('a');
  var originURL;

  /**
                 * Parse a URL to discover it's components
                 *
                 * @param {String} url The URL to be parsed
                 * @returns {Object}
                 */
  function resolveURL(url) {
    var href = url;

    if (msie) {
      // IE needs attribute set twice to normalize properties
      urlParsingNode.setAttribute('href', href);
      href = urlParsingNode.href;
    }

    urlParsingNode.setAttribute('href', href);

    // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === '/' ?
      urlParsingNode.pathname :
      '/' + urlParsingNode.pathname };

  }

  originURL = resolveURL(window.location.href);

  /**
                                                * Determine if a URL shares the same origin as the current location
                                                *
                                                * @param {String} requestURL The URL to test
                                                * @returns {boolean} True if URL shares the same origin, otherwise false
                                                */
  return function isURLSameOrigin(requestURL) {
    var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol &&
    parsed.host === originURL.host;
  };
}() :

// Non standard browser envs (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return function isURLSameOrigin() {
    return true;
  };
}();

/***/ }),

/***/ 65:
/*!******************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/axios/lib/core/mergeConfig.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ 43);

/**
                                  * Config-specific merge-function which creates a new config-object
                                  * by merging two configuration objects together.
                                  *
                                  * @param {Object} config1
                                  * @param {Object} config2
                                  * @returns {Object} New object resulting from merging config2 to config1
                                  */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
  'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
  'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
  'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
  'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
  'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'];

  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys.
  concat(mergeDeepPropertiesKeys).
  concat(defaultToConfig2Keys).
  concat(directMergeKeys);

  var otherKeys = Object.
  keys(config1).
  concat(Object.keys(config2)).
  filter(function filterAxiosKeys(key) {
    return axiosKeys.indexOf(key) === -1;
  });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};

/***/ }),

/***/ 66:
/*!***************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/axios/lib/cancel/Cancel.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * A `Cancel` is an object that is thrown when an operation is canceled.
               *
               * @class
               * @param {string=} message The message.
               */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;

/***/ }),

/***/ 67:
/*!********************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/axios/lib/cancel/CancelToken.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ 66);

/**
                                   * A `CancelToken` is an object that can be used to request cancellation of an operation.
                                   *
                                   * @class
                                   * @param {Function} executor The executor function.
                                   */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
   * Throws a `Cancel` if cancellation has been requested.
   */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
    * Returns an object that contains a new `CancelToken` and a function that, when called,
    * cancels the `CancelToken`.
    */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel };

};

module.exports = CancelToken;

/***/ }),

/***/ 68:
/*!****************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/axios/lib/helpers/spread.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Syntactic sugar for invoking a function and expanding an array for arguments.
               *
               * Common use case would be to use `Function.prototype.apply`.
               *
               *  ```js
               *  function f(x, y, z) {}
               *  var args = [1, 2, 3];
               *  f.apply(null, args);
               *  ```
               *
               * With `spread` this example can be re-written.
               *
               *  ```js
               *  spread(function(x, y, z) {})([1, 2, 3]);
               *  ```
               *
               * @param {Function} callback
               * @returns {Function}
               */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

/***/ }),

/***/ 69:
/*!**********************************************************************************!*\
  !*** D:/HBuilderProjects/rushifu/node_modules/axios/lib/helpers/isAxiosError.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Determines whether the payload is an error thrown by Axios
               *
               * @param {*} payload The value to test
               * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
               */
module.exports = function isAxiosError(payload) {
  return typeof payload === 'object' && payload.isAxiosError === true;
};

/***/ }),

/***/ 70:
/*!**********************************************!*\
  !*** D:/HBuilderProjects/rushifu/api/url.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  baseUrl: 'http://192.168.50.96:8001',
  // baseUrl:'https://hii7mo3m.dnat.tech',
  // baseUrl:'https://fenxiao.5laoye.com',
  loginWechat: '/api/login/wechat' //小程序登录
};exports.default = _default;

/***/ }),

/***/ 71:
/*!*****************************************************!*\
  !*** D:/HBuilderProjects/rushifu/static/md5.min.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/**
 * [js-md5]{@link https://github.com/emn178/js-md5}
 *
 * @namespace md5
 * @version 0.7.3
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
!function () {"use strict";function t(t) {if (t) d[0] = d[16] = d[1] = d[2] = d[3] = d[4] = d[5] = d[6] = d[7] = d[8] = d[9] = d[10] = d[11] = d[12] = d[13] = d[14] = d[15] = 0, this.blocks = d, this.buffer8 = l;else if (a) {var r = new ArrayBuffer(68);this.buffer8 = new Uint8Array(r), this.blocks = new Uint32Array(r);} else this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = this.hBytes = 0, this.finalized = this.hashed = !1, this.first = !0;}var r = "input is invalid type",e = "object" == typeof window,i = e ? window : {};i.JS_MD5_NO_WINDOW && (e = !1);var s = !e && "object" == typeof self,h = !i.JS_MD5_NO_NODE_JS && "object" == typeof process && process.versions && process.versions.node;h ? i = global : s && (i = self);var f = !i.JS_MD5_NO_COMMON_JS && "object" == typeof module && module.exports,o =  true && __webpack_require__(/*! !webpack amd options */ 72),a = !i.JS_MD5_NO_ARRAY_BUFFER && "undefined" != typeof ArrayBuffer,n = "0123456789abcdef".split(""),u = [128, 32768, 8388608, -2147483648],y = [0, 8, 16, 24],c = ["hex", "array", "digest", "buffer", "arrayBuffer", "base64"],p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""),d = [],l;if (a) {var A = new ArrayBuffer(68);l = new Uint8Array(A), d = new Uint32Array(A);}!i.JS_MD5_NO_NODE_JS && Array.isArray || (Array.isArray = function (t) {return "[object Array]" === Object.prototype.toString.call(t);}), !a || !i.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView || (ArrayBuffer.isView = function (t) {return "object" == typeof t && t.buffer && t.buffer.constructor === ArrayBuffer;});var b = function b(r) {return function (e) {return new t(!0).update(e)[r]();};},v = function v() {var r = b("hex");h && (r = w(r)), r.create = function () {return new t();}, r.update = function (t) {return r.create().update(t);};for (var e = 0; e < c.length; ++e) {var i = c[e];r[i] = b(i);}return r;},w = function w(t) {var e = eval("require('crypto')"),i = eval("require('buffer').Buffer"),s = function s(_s) {if ("string" == typeof _s) return e.createHash("md5").update(_s, "utf8").digest("hex");if (null === _s || void 0 === _s) throw r;return _s.constructor === ArrayBuffer && (_s = new Uint8Array(_s)), Array.isArray(_s) || ArrayBuffer.isView(_s) || _s.constructor === i ? e.createHash("md5").update(new i(_s)).digest("hex") : t(_s);};return s;};t.prototype.update = function (t) {if (!this.finalized) {var e,i = typeof t;if ("string" !== i) {if ("object" !== i) throw r;if (null === t) throw r;if (a && t.constructor === ArrayBuffer) t = new Uint8Array(t);else if (!(Array.isArray(t) || a && ArrayBuffer.isView(t))) throw r;e = !0;}for (var s, h, f = 0, o = t.length, n = this.blocks, u = this.buffer8; f < o;) {if (this.hashed && (this.hashed = !1, n[0] = n[16], n[16] = n[1] = n[2] = n[3] = n[4] = n[5] = n[6] = n[7] = n[8] = n[9] = n[10] = n[11] = n[12] = n[13] = n[14] = n[15] = 0), e) {if (a) for (h = this.start; f < o && h < 64; ++f) {u[h++] = t[f];} else for (h = this.start; f < o && h < 64; ++f) {n[h >> 2] |= t[f] << y[3 & h++];}} else if (a) for (h = this.start; f < o && h < 64; ++f) {(s = t.charCodeAt(f)) < 128 ? u[h++] = s : s < 2048 ? (u[h++] = 192 | s >> 6, u[h++] = 128 | 63 & s) : s < 55296 || s >= 57344 ? (u[h++] = 224 | s >> 12, u[h++] = 128 | s >> 6 & 63, u[h++] = 128 | 63 & s) : (s = 65536 + ((1023 & s) << 10 | 1023 & t.charCodeAt(++f)), u[h++] = 240 | s >> 18, u[h++] = 128 | s >> 12 & 63, u[h++] = 128 | s >> 6 & 63, u[h++] = 128 | 63 & s);} else for (h = this.start; f < o && h < 64; ++f) {(s = t.charCodeAt(f)) < 128 ? n[h >> 2] |= s << y[3 & h++] : s < 2048 ? (n[h >> 2] |= (192 | s >> 6) << y[3 & h++], n[h >> 2] |= (128 | 63 & s) << y[3 & h++]) : s < 55296 || s >= 57344 ? (n[h >> 2] |= (224 | s >> 12) << y[3 & h++], n[h >> 2] |= (128 | s >> 6 & 63) << y[3 & h++], n[h >> 2] |= (128 | 63 & s) << y[3 & h++]) : (s = 65536 + ((1023 & s) << 10 | 1023 & t.charCodeAt(++f)), n[h >> 2] |= (240 | s >> 18) << y[3 & h++], n[h >> 2] |= (128 | s >> 12 & 63) << y[3 & h++], n[h >> 2] |= (128 | s >> 6 & 63) << y[3 & h++], n[h >> 2] |= (128 | 63 & s) << y[3 & h++]);}this.lastByteIndex = h, this.bytes += h - this.start, h >= 64 ? (this.start = h - 64, this.hash(), this.hashed = !0) : this.start = h;}return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 << 0, this.bytes = this.bytes % 4294967296), this;}}, t.prototype.finalize = function () {if (!this.finalized) {this.finalized = !0;var t = this.blocks,r = this.lastByteIndex;t[r >> 2] |= u[3 & r], r >= 56 && (this.hashed || this.hash(), t[0] = t[16], t[16] = t[1] = t[2] = t[3] = t[4] = t[5] = t[6] = t[7] = t[8] = t[9] = t[10] = t[11] = t[12] = t[13] = t[14] = t[15] = 0), t[14] = this.bytes << 3, t[15] = this.hBytes << 3 | this.bytes >>> 29, this.hash();}}, t.prototype.hash = function () {var t,r,e,i,s,h,f = this.blocks;this.first ? r = ((r = ((t = ((t = f[0] - 680876937) << 7 | t >>> 25) - 271733879 << 0) ^ (e = ((e = (-271733879 ^ (i = ((i = (-1732584194 ^ 2004318071 & t) + f[1] - 117830708) << 12 | i >>> 20) + t << 0) & (-271733879 ^ t)) + f[2] - 1126478375) << 17 | e >>> 15) + i << 0) & (i ^ t)) + f[3] - 1316259209) << 22 | r >>> 10) + e << 0 : (t = this.h0, r = this.h1, e = this.h2, r = ((r += ((t = ((t += ((i = this.h3) ^ r & (e ^ i)) + f[0] - 680876936) << 7 | t >>> 25) + r << 0) ^ (e = ((e += (r ^ (i = ((i += (e ^ t & (r ^ e)) + f[1] - 389564586) << 12 | i >>> 20) + t << 0) & (t ^ r)) + f[2] + 606105819) << 17 | e >>> 15) + i << 0) & (i ^ t)) + f[3] - 1044525330) << 22 | r >>> 10) + e << 0), r = ((r += ((t = ((t += (i ^ r & (e ^ i)) + f[4] - 176418897) << 7 | t >>> 25) + r << 0) ^ (e = ((e += (r ^ (i = ((i += (e ^ t & (r ^ e)) + f[5] + 1200080426) << 12 | i >>> 20) + t << 0) & (t ^ r)) + f[6] - 1473231341) << 17 | e >>> 15) + i << 0) & (i ^ t)) + f[7] - 45705983) << 22 | r >>> 10) + e << 0, r = ((r += ((t = ((t += (i ^ r & (e ^ i)) + f[8] + 1770035416) << 7 | t >>> 25) + r << 0) ^ (e = ((e += (r ^ (i = ((i += (e ^ t & (r ^ e)) + f[9] - 1958414417) << 12 | i >>> 20) + t << 0) & (t ^ r)) + f[10] - 42063) << 17 | e >>> 15) + i << 0) & (i ^ t)) + f[11] - 1990404162) << 22 | r >>> 10) + e << 0, r = ((r += ((t = ((t += (i ^ r & (e ^ i)) + f[12] + 1804603682) << 7 | t >>> 25) + r << 0) ^ (e = ((e += (r ^ (i = ((i += (e ^ t & (r ^ e)) + f[13] - 40341101) << 12 | i >>> 20) + t << 0) & (t ^ r)) + f[14] - 1502002290) << 17 | e >>> 15) + i << 0) & (i ^ t)) + f[15] + 1236535329) << 22 | r >>> 10) + e << 0, r = ((r += ((i = ((i += (r ^ e & ((t = ((t += (e ^ i & (r ^ e)) + f[1] - 165796510) << 5 | t >>> 27) + r << 0) ^ r)) + f[6] - 1069501632) << 9 | i >>> 23) + t << 0) ^ t & ((e = ((e += (t ^ r & (i ^ t)) + f[11] + 643717713) << 14 | e >>> 18) + i << 0) ^ i)) + f[0] - 373897302) << 20 | r >>> 12) + e << 0, r = ((r += ((i = ((i += (r ^ e & ((t = ((t += (e ^ i & (r ^ e)) + f[5] - 701558691) << 5 | t >>> 27) + r << 0) ^ r)) + f[10] + 38016083) << 9 | i >>> 23) + t << 0) ^ t & ((e = ((e += (t ^ r & (i ^ t)) + f[15] - 660478335) << 14 | e >>> 18) + i << 0) ^ i)) + f[4] - 405537848) << 20 | r >>> 12) + e << 0, r = ((r += ((i = ((i += (r ^ e & ((t = ((t += (e ^ i & (r ^ e)) + f[9] + 568446438) << 5 | t >>> 27) + r << 0) ^ r)) + f[14] - 1019803690) << 9 | i >>> 23) + t << 0) ^ t & ((e = ((e += (t ^ r & (i ^ t)) + f[3] - 187363961) << 14 | e >>> 18) + i << 0) ^ i)) + f[8] + 1163531501) << 20 | r >>> 12) + e << 0, r = ((r += ((i = ((i += (r ^ e & ((t = ((t += (e ^ i & (r ^ e)) + f[13] - 1444681467) << 5 | t >>> 27) + r << 0) ^ r)) + f[2] - 51403784) << 9 | i >>> 23) + t << 0) ^ t & ((e = ((e += (t ^ r & (i ^ t)) + f[7] + 1735328473) << 14 | e >>> 18) + i << 0) ^ i)) + f[12] - 1926607734) << 20 | r >>> 12) + e << 0, r = ((r += ((h = (i = ((i += ((s = r ^ e) ^ (t = ((t += (s ^ i) + f[5] - 378558) << 4 | t >>> 28) + r << 0)) + f[8] - 2022574463) << 11 | i >>> 21) + t << 0) ^ t) ^ (e = ((e += (h ^ r) + f[11] + 1839030562) << 16 | e >>> 16) + i << 0)) + f[14] - 35309556) << 23 | r >>> 9) + e << 0, r = ((r += ((h = (i = ((i += ((s = r ^ e) ^ (t = ((t += (s ^ i) + f[1] - 1530992060) << 4 | t >>> 28) + r << 0)) + f[4] + 1272893353) << 11 | i >>> 21) + t << 0) ^ t) ^ (e = ((e += (h ^ r) + f[7] - 155497632) << 16 | e >>> 16) + i << 0)) + f[10] - 1094730640) << 23 | r >>> 9) + e << 0, r = ((r += ((h = (i = ((i += ((s = r ^ e) ^ (t = ((t += (s ^ i) + f[13] + 681279174) << 4 | t >>> 28) + r << 0)) + f[0] - 358537222) << 11 | i >>> 21) + t << 0) ^ t) ^ (e = ((e += (h ^ r) + f[3] - 722521979) << 16 | e >>> 16) + i << 0)) + f[6] + 76029189) << 23 | r >>> 9) + e << 0, r = ((r += ((h = (i = ((i += ((s = r ^ e) ^ (t = ((t += (s ^ i) + f[9] - 640364487) << 4 | t >>> 28) + r << 0)) + f[12] - 421815835) << 11 | i >>> 21) + t << 0) ^ t) ^ (e = ((e += (h ^ r) + f[15] + 530742520) << 16 | e >>> 16) + i << 0)) + f[2] - 995338651) << 23 | r >>> 9) + e << 0, r = ((r += ((i = ((i += (r ^ ((t = ((t += (e ^ (r | ~i)) + f[0] - 198630844) << 6 | t >>> 26) + r << 0) | ~e)) + f[7] + 1126891415) << 10 | i >>> 22) + t << 0) ^ ((e = ((e += (t ^ (i | ~r)) + f[14] - 1416354905) << 15 | e >>> 17) + i << 0) | ~t)) + f[5] - 57434055) << 21 | r >>> 11) + e << 0, r = ((r += ((i = ((i += (r ^ ((t = ((t += (e ^ (r | ~i)) + f[12] + 1700485571) << 6 | t >>> 26) + r << 0) | ~e)) + f[3] - 1894986606) << 10 | i >>> 22) + t << 0) ^ ((e = ((e += (t ^ (i | ~r)) + f[10] - 1051523) << 15 | e >>> 17) + i << 0) | ~t)) + f[1] - 2054922799) << 21 | r >>> 11) + e << 0, r = ((r += ((i = ((i += (r ^ ((t = ((t += (e ^ (r | ~i)) + f[8] + 1873313359) << 6 | t >>> 26) + r << 0) | ~e)) + f[15] - 30611744) << 10 | i >>> 22) + t << 0) ^ ((e = ((e += (t ^ (i | ~r)) + f[6] - 1560198380) << 15 | e >>> 17) + i << 0) | ~t)) + f[13] + 1309151649) << 21 | r >>> 11) + e << 0, r = ((r += ((i = ((i += (r ^ ((t = ((t += (e ^ (r | ~i)) + f[4] - 145523070) << 6 | t >>> 26) + r << 0) | ~e)) + f[11] - 1120210379) << 10 | i >>> 22) + t << 0) ^ ((e = ((e += (t ^ (i | ~r)) + f[2] + 718787259) << 15 | e >>> 17) + i << 0) | ~t)) + f[9] - 343485551) << 21 | r >>> 11) + e << 0, this.first ? (this.h0 = t + 1732584193 << 0, this.h1 = r - 271733879 << 0, this.h2 = e - 1732584194 << 0, this.h3 = i + 271733878 << 0, this.first = !1) : (this.h0 = this.h0 + t << 0, this.h1 = this.h1 + r << 0, this.h2 = this.h2 + e << 0, this.h3 = this.h3 + i << 0);}, t.prototype.hex = function () {this.finalize();var t = this.h0,r = this.h1,e = this.h2,i = this.h3;return n[t >> 4 & 15] + n[15 & t] + n[t >> 12 & 15] + n[t >> 8 & 15] + n[t >> 20 & 15] + n[t >> 16 & 15] + n[t >> 28 & 15] + n[t >> 24 & 15] + n[r >> 4 & 15] + n[15 & r] + n[r >> 12 & 15] + n[r >> 8 & 15] + n[r >> 20 & 15] + n[r >> 16 & 15] + n[r >> 28 & 15] + n[r >> 24 & 15] + n[e >> 4 & 15] + n[15 & e] + n[e >> 12 & 15] + n[e >> 8 & 15] + n[e >> 20 & 15] + n[e >> 16 & 15] + n[e >> 28 & 15] + n[e >> 24 & 15] + n[i >> 4 & 15] + n[15 & i] + n[i >> 12 & 15] + n[i >> 8 & 15] + n[i >> 20 & 15] + n[i >> 16 & 15] + n[i >> 28 & 15] + n[i >> 24 & 15];}, t.prototype.toString = t.prototype.hex, t.prototype.digest = function () {this.finalize();var t = this.h0,r = this.h1,e = this.h2,i = this.h3;return [255 & t, t >> 8 & 255, t >> 16 & 255, t >> 24 & 255, 255 & r, r >> 8 & 255, r >> 16 & 255, r >> 24 & 255, 255 & e, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255, 255 & i, i >> 8 & 255, i >> 16 & 255, i >> 24 & 255];}, t.prototype.array = t.prototype.digest, t.prototype.arrayBuffer = function () {this.finalize();var t = new ArrayBuffer(16),r = new Uint32Array(t);return r[0] = this.h0, r[1] = this.h1, r[2] = this.h2, r[3] = this.h3, t;}, t.prototype.buffer = t.prototype.arrayBuffer, t.prototype.base64 = function () {for (var t, r, e, i = "", s = this.array(), h = 0; h < 15;) {t = s[h++], r = s[h++], e = s[h++], i += p[t >>> 2] + p[63 & (t << 4 | r >>> 4)] + p[63 & (r << 2 | e >>> 6)] + p[63 & e];}return t = s[h], i += p[t >>> 2] + p[t << 4 & 63] + "==";};var _ = v();f ? module.exports = _ : (i.md5 = _, o && !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {return _;}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)));}();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/node-libs-browser/mock/process.js */ 52), __webpack_require__(/*! (webpack)/buildin/global.js */ 3)))

/***/ }),

/***/ 72:
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),

/***/ 73:
/*!********************************************!*\
  !*** D:/HBuilderProjects/rushifu/store.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 74));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_vue.default.use(_vuex.default);var _default =

new _vuex.default.Store({
  state: {
    youhuiquanPage: 1,
    youhuiquanPageSize: 10, //优惠券列表
    // 
    allshopPage: 1, //所有商品列表
    allshopPageSize: 10,
    page: 1, //商品列表
    pageSize: 10,
    ddPage: 1, //订单列表
    ddPageSize: 10,
    mdPage: 1, //免单列表
    mdPageSize: 10,
    mdgmShow: false, //购物车的免单是否显示
    yqhyPage: 1, //邀请好友列表
    yqhyPageSize: 10,
    yjPage: 1, //佣金列表
    yjPageSize: 10,
    yyjlPage: 1, //交易记录列表
    yyjlPageSize: 10,
    txjlPage: 1, //提现历史记录列表
    txjlPageSize: 15,
    shoucangPage: 1, //收藏列表
    shoucangPageSize: 10,
    pinglunPage: 1, //商品评论列表
    pinglunPageSize: 10,
    sousuopage: 1, //搜索商品列表
    sousuopageSize: 10 },

  mutations: {
    youhuiquanPage: function youhuiquanPage(state, str) {
      state.youhuiquanPage = str;
    },
    // 
    allshopPage: function allshopPage(state, str) {
      state.allshopPage = str;
    },
    page: function page(state, str) {
      state.page = str;
    },
    ddPage: function ddPage(state, str) {
      state.ddPage = str;
    },
    mdPage: function mdPage(state, str) {
      state.mdPage = str;
    },
    mdgmShow: function mdgmShow(state, str) {
      state.mdgmShow = str;
    },
    yqhyPage: function yqhyPage(state, str) {
      state.yqhyPage = str;
    },
    yjPage: function yjPage(state, str) {
      state.yjPage = str;
    },
    yyjlPage: function yyjlPage(state, str) {
      state.yyjlPage = str;
    },
    txjlPage: function txjlPage(state, str) {
      state.txjlPage = str;
    },
    shoucangPage: function shoucangPage(state, str) {
      state.shoucangPage = str;
    },
    pinglunPage: function pinglunPage(state, str) {
      state.pinglunPage = str;
    },
    sousuopage: function sousuopage(state, str) {
      state.sousuopage = str;
    } },

  actions: {} });exports.default = _default;

/***/ }),

/***/ 74:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: default, Store, createNamespacedHelpers, install, mapActions, mapGetters, mapMutations, mapState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/*!
 * vuex v3.4.0
 * (c) 2020 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  return parent.hasChild(key)
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index = {
  Store: Store,
  install: install,
  version: '3.4.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["default"] = (index);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 3)))

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map