'use strict';
const _ = require('lodash');

/**
 * @class Utils
 */
class Utils {
  /**
   *
   * @param {*} obj
   */
  static pruneUndefined(obj) {
    // eslint-disable-next-line
    return _.omitBy(obj, (v) =>
      _.isBoolean(v) || _.isFinite(v) ? false : _.isUndefined(v),
    );
  }

  static pruneEmpty(obj) {
    return _.pickBy(obj, _.identity);
  }

  static extractIncludeAttributes(includeAttributes) {
    if (_.isString(includeAttributes)) {
      return includeAttributes
        .split(',')
        .map((attr) => attr.trim())
        .filter((attr) => !_.isEmpty(attr));
    } else if (_.isArray(includeAttributes)) {
      return includeAttributes.filter(
        (attr) => _.isString(attr) && !_.isEmpty(attr),
      );
    }
    return [];
  }

  /**
   *
   * @param {*} val
   * @param {Array<*>} defaultVal
   */
  static getArray(val, defaultVal = []) {
    if (val == null) {
      return defaultVal;
    } else if (_.isArray(val)) {
      return val;
    } else {
      return [val];
    }
  }

  /**
   *
   * @param {String | Number | Boolean} val
   * @param {Boolean} defaultVal
   */
  static getBoolean(val, defaultVal = false) {
    if (val == null) {
      return defaultVal;
    }
    switch (Utils.getString(val).toLowerCase()) {
      case 'true':
      case '1':
      case 'on':
      case 'yes':
      case 'y':
        return true;
      case 'false':
      case '0':
      case 'off':
      case 'no':
      case 'n':
        return false;
      default:
        return defaultVal;
    }
  }

  /**
   *
   * @param {String} input
   * @param {Date} defaultVal
   * @returns {Date}
   */
  static getDateFromString(input, defaultVal = new Date()) {
    let ret = defaultVal;
    if (input != null) {
      ret = new Date(input);
    }
    return ret;
  }

  /**
   *
   * @param {String|Number} input
   * @param {Number} defaultVal
   * @param {Number} radix
   * @returns {Number}
   */
  static getInteger(input, defaultVal = 0, radix = 10) {
    let ret = defaultVal;
    if (input != null) {
      const parsed = Number.parseInt(input, radix);
      if (!Number.isNaN(parsed)) {
        ret = parsed;
      }
    }
    return ret;
  }

  /**
   *
   * @param {String|Number} input
   * @param {Number} defaultVal
   */
  static getFloat(input, defaultVal = 0.0) {
    let ret = defaultVal;
    if (input != null) {
      const parsed = Number.parseFloat(input);
      if (!Number.isNaN(parsed)) {
        ret = parsed;
      }
    }
    return ret;
  }

  /**
   *
   * @param {*} input
   * @param {String} defaultVal
   */
  static getString(input, defaultVal = undefined) {
    let ret = defaultVal;
    if (input != null) {
      ret = input.toString();
    }
    return ret;
  }

  static validateNumberInString(input) {
    for (let i = 0; i < input.length - 1; i++) {
      const ascii = input[i].charCodeAt(0);
      if (ascii != undefined) {
        if (ascii < 47 || ascii > 58) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   *
   * @param {Function} condition
   * @param {Function} action
   */
  static async promiseLoop(condition, action) {
    const loop = async () => {
      if (condition()) {
        return true;
      }
      await action();
      return loop();
    };
    return loop();
  }
  static tvkd(str) {
    if (typeof str != 'string') return '';
    str = str.replace(/[-[\]{}()*+?.,\\/^$@!^&_=+;:'"<>|#%\s]/g, ' ');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    str = str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, ' ');
    str = str.trim();

    return str;
  }
  static checkWordUnsigned(input) {
    let status = false;
    if (input != null) {
      for (let i = 0; i < input.length; i++) {
        const ascii = input[i].charCodeAt(0);
        if (ascii != undefined) {
          if ((ascii > 96) & (ascii < 123)) {
            status = false;
          } else if ((ascii > 47) & (ascii < 58)) {
            status = false;
          } else if (ascii == 46) {
            status = false;
          } else if (ascii == 64) {
            status = false;
          } else {
            status = true;
          }
        }
        if (status == true) {
          return false;
        }
      }
    }
    return true;
  }
}

module.exports = {
  Utils: Utils,
};
