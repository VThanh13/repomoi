'use strict';
const pino = require('pino');

const NO_LOG = process.env.NO_LOG

module.exports = {
  /** @type {pino.Logger} */
  logger: pino({ name: 'process', enabled: NO_LOG !== 'true' }),
  /** @type {pino.Logger} */
  transport: pino({
    name: 'transport',
    enabled: NO_LOG !== 'true',
  }),
};
