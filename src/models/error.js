'use strict';

/**
 * Represent an error of api
 * @class ApiError
 */
class ApiError {
  /** @type {Number} */
  code = 0;
  /** @type {String} */
  type = '';
  /** @type {String} */
  message = '';
  /** @type {Number} */
  http = 400;
  /** @type {Object | undefined} */
  meta = undefined;

  /**
   * Creates an instance of ApiError.
   * @memberof ApiError
   */
  constructor() {
  }

  constructor({ code = 0, type = '', message = '', http = 400 }) {
    this.code = code;
    this.type = type;
    this.message = message;
    this.http = http;
  }

  // static initWithParams({ code = 0, type = '', message = '', http = 400 }) {
  //   const ret = new ApiError();
  //   ret.code = code;
  //   ret.type = type;
  //   ret.message = message;
  //   ret.http = http;
  //   return ret;
  // }
}

module.exports = ApiError;
