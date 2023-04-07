const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

/**
 * hast text by criptr lib
 * @param {String} text 
 * @returns {String}
 */
const hashText = (text) => text ? cryptr.encrypt(text) : '';

/**
 * compare the text and hash is equal
 * @param {String} text 
 * @param {String} hash 
 * @return {Boolean} 
 */
const compareTwoText = (text, hash) => {
  const hashToTextDecrypt = cryptr.decrypt(hash);
  return hashToTextDecrypt === text;
};

/**
 * decrypt hast string to text
 * @param {String} hash 
 * @returns {String}
 */
const HashToText = (hash) => {
  return cryptr.decrypt(hash);
};

module.exports = {
  hashText,
  compareTwoText,
  HashToText,
};
