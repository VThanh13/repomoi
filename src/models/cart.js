'use strict';
/**
 * @typedef {import("mongoose").Document} Document
 */
const mongoose = require('mongoose');

//INTERNAL
const Base = require('./base');
const { Utils } = require('../libs/utils');

/**
 * @class Cart @extends @class Base
 */
class Cart extends Base {
    uid = undefined; /** @type {String | undefined} */
    customerId = undefined; /** @type {String | undefined} */
    product = undefined; /** @type {String | undefined} */

    constructor() {
        super();
    }
    constructor(cart) {
        super();
        this = { ...cart }
    }

    /**
     *
     * @param {Document} input
     * @returns {Cart}
     */
    static fromMongo(input) {
        if (input == null || input instanceof mongoose.Types.ObjectId) {
            return null;
        }

        input.product = input.product.map((item) => ({
            productId: item.productId,
            number: item.number,
            price: item.price,
        }))

        return new Cart(input);
    }

    /**
     *
     * @param {Cart} input
     * @returns {*}
     */
    static toMongo(input) {
        const { includedFields, ...Cart } = input;
        return Cart;
    }

    /**
     * 
     * @param {*} input 
     * @param {*} customerId 
     * @returns 
     */
    static fromRequest(input, customerId) {
        const output = new Cart();
        if (input != null) {
            output.uid = Utils.getString(input.uid, '');
            output.customerId = Utils.getString(customerId, '');
            output.product = Utils.getArray(input.product, []);
        }
        output.includedFields = Utils.extractIncludeAttributes(
            input.includedFields,
        );
        return output;
    }

    /**
     * 
     * @param {*} input 
     * @returns 
     */
    static fromUpdate(input) {
        const output = {};
        if (input != null) {
            output.productId = Utils.getString(input.productId, '');
            output.number = Utils.getInteger(input.number, 0);
            output.price = Utils.getInteger(input.price, 0);
        }
        return output;
    }

    /**
     * 
     * @param {*} input 
     * @param {*} customerId 
     * @returns 
     */
    static create(input, customerId) {
        const output = new Cart();
        if (customerId != null) {
            output.uid = '';
            output.customerId = Utils.getString(customerId, '');
        }
        output.includedFields = Utils.extractIncludeAttributes(
            input.includedFields,
        );
        return output;
    }
}

module.exports = Cart;