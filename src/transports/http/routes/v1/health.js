'use strict';
/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 * @typedef {import("express").NextFunction} NextFunction
 */
const os = require('os');

// INTERNAL
const { ErrorModel } = require('@/models');
const { ERROR } = require('@/constants');
const { logger } = require('@/libs/logger');

module.exports = {
  /**
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  ping: async (req, res, next) => {
    try {
      res.end();
    } catch (err) {
      logger.error(err, err.message);
      next(
        ErrorModel({
          ...ERROR.SYSTEM.INTERNAL,
          message: 'Health check failed',
        }),
      );
    }
  },
  /**
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  stats: async (req, res, next) => {
    try {
      res.json({
        upTime: os.uptime(),
        totalMem: os.totalmem(),
        freeMem: os.freemem(),
        loadAvg: os.loadavg(),
      });
    } catch (err) {
      next(err);
    }
  },
};
