'use strict';
/**
 * @typedef {import("mongoose").Document} Document
 * @typedef {import("@/data/models/Customers")} CustomerSchema
 */
const mongoose = require('mongoose');

//INTERNAL
const Base = require('./base');
const { Utils } = require('../libs/utils');

class Customer extends Base {
    /** @type {String | undefined} */
    uid = undefined;
    /** @type {String | undefined} */
    code = undefined;
    /** @type {String | undefined} */
    name = undefined;
    /** @type {String | undefined} */
    nameUnsigned = undefined;
    /** @type {String | undefined} */
    status = undefined;
    /** @type {String | undefined} */
    username = undefined;
    /** @type {String | undefined} */
    password = undefined;
    /** @type {String | undefined} */
    firstName = undefined;
    /** @type {String | undefined} */
    lastName = undefined;
    /** @type {String | undefined} */
    dateOfBirth = undefined;
    /** @type {String | undefined} */
    sex = undefined;
    /** @type {String | undefined} */
    phone = undefined;
    /** @type {String | undefined} */
    email = undefined;
    /** @type {Boolean | undefined} */
    status = undefined;
    /** @type {String | undefined} */
    avatar = undefined;
    /** @type {String | undefined} */
    roleId = undefined;
    /** @type {Array | undefined} */
    address = undefined;

    constructor() {
        super();
    }

    /**
     * constructor with customer param
     * @param {Customer} customer 
     */
    constructor(customer) {
        super();
        this = { ...customer }
    }

    /**
     * 
     * @param {*} input 
     * @returns {Customer}
     */
    static fromMongo(input) {
        if (input == null || input instanceof mongoose.Types.ObjectId) {
            return null;
        }
        const output = new Customer(input);
        return output;
    }

    /**
     * 
     * @param {*} input 
     * @returns {Customer}
     */
    static toMongo(input) {

        // eslint-disable-next-line no-unused-vars
        const { includedFields, ...customer } = input;
        return customer;
    }

    /**
     * 
     * @param {*} input 
     * @returns {Customer}
     */
    static fromRequest(input) {
        const output = new Customer();
        if (input != null) {
            output.uid = Utils.getString(input.uid, '');
            output.code = Utils.getString(input.code, '');
            output.name = Utils.getString(input.firstName + ' ' + input.lastName, '');
            output.nameUnsigned = Utils.getString(Utils.tvkd(output.name), '');
            output.username = Utils.getString(input.username, '');
            output.password = Utils.getString(input.password, '');
            output.firstName = Utils.getString(input.firstName, '');
            output.lastName = Utils.getString(input.lastName, '');
            output.dateOfBirth = Utils.getDateFromString(input.dateOfBirth);
            output.sex = Utils.getString(input.sex, '');
            output.phone = Utils.getString(input.phone, '');
            output.email = Utils.getString(input.email, '');
            output.status = Utils.getBoolean(input.status, true);
            output.avatar = Utils.getString(input.avatar, '');
            output.address = [{
                street: Utils.getString(input.street, ''),
                province: Utils.getString(input.province, ''),
                district: Utils.getString(input.district, ''),
                ward: Utils.getString(input.ward, ''),
                status: true,
            },];
            output.includedFields = Utils.extractIncludeAttributes(
                input.includedFields,
            );
        }
        output.email = output.email.toLowerCase();
        output.name = output.name.trim().replace(/\s\s+/g, ' ');
        output.nameUnsigned = output.nameUnsigned.trim().replace(/\s\s+/g, ' ');
        output.firstName = output.firstName.trim().replace(/\s\s+/g, ' ');
        output.lastName = output.lastName.trim().replace(/\s\s+/g, ' ');
        return output;
    }

    /**
     * 
     * @param {*} input 
     * @returns 
     */
    static fromUpdateCustomer(input) {
        const output = {};
        if (input != null) {
            output.name = Utils.getString(input.firstName + ' ' + input.lastName, '');
            output.nameUnsigned = Utils.getString(Utils.tvkd(output.name), '');
            output.username = Utils.getString(input.username, '');
            output.password = Utils.getString(input.password, '');
            output.firstName = Utils.getString(input.firstName, '');
            output.lastName = Utils.getString(input.lastName, '');
            output.dateOfBirth = Utils.getDateFromString(input.dateOfBirth);
            output.sex = Utils.getString(input.sex, '');
            output.phone = Utils.getString(input.phone, '');
            output.email = Utils.getString(input.email, '');
            output.status = Utils.getBoolean(input.status, false);
            output.avatar = Utils.getString(input.avatar, '');
            output.address = [{
                street: Utils.getString(input.street, ''),
                province: Utils.getString(input.province, ''),
                district: Utils.getString(input.district, ''),
                ward: Utils.getString(input.ward, ''),
                status: true,
            },];
            output.includedFields = Utils.extractIncludeAttributes(
                input.includedFields,
            );
        }
        output.email = output.email.toLowerCase();
        output.name = output.name.trim().replace(/\s\s+/g, ' ');
        output.nameUnsigned = output.nameUnsigned.trim().replace(/\s\s+/g, ' ');
        output.firstName = output.firstName.trim().replace(/\s\s+/g, ' ');
        output.lastName = output.lastName.trim().replace(/\s\s+/g, ' ');
        return output;
    }

    /**
     * 
     * @param {*} input 
     * @returns 
     */
    static fromUpdateStatusCustomer(input) {
        const output = {};
        if (input != null) {
            output.status = Utils.getBoolean(input.status, false);
        }
        return output;
    }

    /**
     * 
     * @param {*} input 
     * @returns 
     */
    static searchCustomer(input) {
        const output = {};
        output.code = !input.code ? null : input.code.trim();
        output.name = !input.name ?
            null :
            Utils.tvkd(input.name.trim().replace(/\s\s+/g, ' '));
        output.status = !input.status ? null : input.status.trim();
        output.limit = input.limit || '10';
        output.limit = Number.parseInt(output.limit, 10);
        output.page = input.page || '1';
        output.page = Number.parseInt(output.page, 10);
        if (Number.isNaN(output.page) || Number.isNaN(output.limit)) {
            output.limit = 100;
            output.page = 1;
        }
        return output;
    }

    /**
     * 
     * @param {*} input 
     * @returns 
     */
    static login(input) {
        const output = {};
        if (input != null) {
            output.username = Utils.getString(input.username, '');
            output.password = Utils.getString(input.password, '');
            output.includedFields = Utils.extractIncludeAttributes(
                input.includedFields,
            );
        }
        output.username = output.username.trim().replace(/\s+/g, '');
        return output;
    }
}
module.exports = Customer;