import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();

import StandardError from 'standard-error';
import { API_CONFIG } from './../config/api';
import { message, Modal } from 'antd';

const errorMessages = (res) => `${res.status} ${res.statusText}`;

function check401(res) {
  // 登陆界面不需要做401校验
  if (res.status === 401 && !res.url.match('auth')) {
    Modal.error({
      title: "Please Login Again",
      content: "Invalid credentials",
      onOk: () => {
        localStorage.removeItem('auth_token');
        location.href = '/login';
      }
    });

    return Promise.reject(errorMessages(res));

  }
  return res;
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    return response.text().then(errorMsg => {
      const error = JSON.parse(errorMsg);
      return new StandardError({
        statusCode: response.status,
        message: response.status < 500 ? error.error.message : "Server Error Occurred"
      });
    }).then(err => { throw err; });
  }
}

function jsonParse(res) {
  return res.json();
}

function setUriParam(keys, value, keyPostfix) {
  let keyStr = keys[0];

  keys.slice(1).forEach((key) => {
    keyStr += `[${key}]`;
  });

  if (keyPostfix) {
    keyStr += keyPostfix;
  }

  return `${encodeURIComponent(keyStr)}=${encodeURIComponent(value)}`;
}

function getUriParam(keys, object) {
  const array = [];

  if (object instanceof(Array)) {
    object.forEach((value) => {
      array.push(setUriParam(keys, value, '[]'));
    });
  } else if (object instanceof(Object)) {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        const value = object[key];

        array.push(getUriParam(keys.concat(key), value));
      }
    }
  } else {
    if (object !== undefined) {
      array.push(setUriParam(keys, object));
    }
  }

  return array.join('&');
}

function toQueryString(object) {
  const array = [];

  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const str = getUriParam([key], object[key]);

      if (str !== '') {
        array.push(str);
      }
    }
  }

  return array.join('&');
}


function cFetch(url, options) {
  let mergeUrl = API_CONFIG.baseUri + url;
  const defaultOptions = {
    method: 'GET',
  };

  const opts = Object.assign({}, defaultOptions, {...options});

  // add query params to url when method is GET
  if (opts && opts['query']) {
    mergeUrl = mergeUrl + '?' + toQueryString(opts['query']);
  }

  opts.headers = {
    "Content-Type": "application/json",
    ...opts.headers,
    'X-Authorization': localStorage ? localStorage.getItem('auth_token') : undefined,
  };

  return fetch(mergeUrl, opts)
    .then(check401)
    .then(checkStatus)
    .then(jsonParse);
}

//catch all the unhandled exception
window.addEventListener("unhandledrejection", function(err) {
  const ex = err.reason;
  if(ex.constructor != null && ex.constructor == StandardError || ex.msg != null){
    message.error(ex.message, 2.5);
  }
});

export default cFetch;
