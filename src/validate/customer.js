'use strict';
const { ERROR } = require('../constants');
const { ErrorModel } = require('../models');
const { Validate } = require('../libs/validate');
const { Utils } = require('../libs/utils');

class CustomerValidate {
    static createCustomerValidate(data) {
        if (data.firstName) {
            if (data.firstName.length > 25) {
                throw ErrorModel({
                    ...ERROR.VALIDATION.INVALID_REQUEST,
                    message: 'Họ tên đệm người mua không quá 50 kí tự',
                });
            }
            if (
                data.firstName.length != data.firstName.replace(
                    /[-[\]{}()*+?.,\\/^$@!^&_=+;:'"<>`~|#%1234567890]/g,
                    '',
                ).length
            ) {
                throw ErrorModel({
                    ...ERROR.VALIDATION.INVALID_REQUEST,
                    message: 'Họ và tên không hợp lệ',
                });
            }
        } else {
            throw ErrorModel({
                ...ERROR.VALIDATION.INVALID_REQUEST,
                message: 'Yêu cầu phải có họ tên đệm người mua',
            });
        }
        if (data.lastName) {
            if (data.lastName.length > 25) {
                throw ErrorModel({
                    ...ERROR.VALIDATION.INVALID_REQUEST,
                    message: 'Tên người mua không quá 50 kí tự',
                });
            }
            if (
                data.lastName.length != data.lastName.replace(
                    /[-[\]{}()*+?.,\\/^$@!^&_=+;:'"<>`~|#%1234567890]/g,
                    '',
                ).length
            ) {
                throw ErrorModel({
                    ...ERROR.VALIDATION.INVALID_REQUEST,
                    message: 'họ và tên không hợp lệ',
                });
            }
            if (data.lastName.length != data.lastName.replace(/\s+/g, '').length) {
                throw ErrorModel({
                    ...ERROR.VALIDATION.INVALID_REQUEST,
                    message: 'Tên chỉ yêu cầu 1 từ',
                });
            }
        } else {
            throw ErrorModel({
                ...ERROR.VALIDATION.INVALID_REQUEST,
                message: 'Yêu cầu phải có tên người mua',
            });
        }
        if (data.password) {
            if (data.password.length < 5 || data.password.length > 20) {
                throw ErrorModel({
                    ...ERROR.VALIDATION.INVALID_REQUEST,
                    message: 'Mật khẩu phải từ 5 đến 20 kí tự',
                });
            }
        } else {
            throw ErrorModel({
                ...ERROR.VALIDATION.INVALID_REQUEST,
                message: 'Yêu cầu nhập mật khẩu',
            });
        }
        if (data.username) {
            if (data.username.length > 20 || data.username.length < 6) {
                throw ErrorModel({
                    ...ERROR.VALIDATION.INVALID_REQUEST,
                    message: 'Tên đăng nhập phải từ 6 đến 20 kí tự',
                });
            }
            const checkWordUnsigned = Utils.checkWordUnsigned(data.username);
            if (checkWordUnsigned == false) {
                throw ErrorModel({
                    ...ERROR.VALIDATION.INVALID_REQUEST,
                    message: 'Tên đăng nhập chỉ sử dụng (a-z),(0-9),(.),(@)',
                });
            }
        }
        if (data.phone) {
            const vPhone = Validate.phone(data.phone);
            if (!vPhone) {
                throw ErrorModel({
                    ...ERROR.VALIDATION.INVALID_REQUEST,
                    message: 'Số điện thoại không hợp lệ',
                });
            }
        } else {
            throw ErrorModel({
                ...ERROR.VALIDATION.INVALID_REQUEST,
                message: 'Yêu cầu phải có số điện thoại',
            });
        }
        if (data.email) {
            const vEmail = Validate.email(data.email);
            if (!vEmail) {
                throw ErrorModel({
                    ...ERROR.VALIDATION.INVALID_REQUEST,
                    message: 'Email không hợp lệ',
                });
            }
        } else {
            throw ErrorModel({
                ...ERROR.VALIDATION.INVALID_REQUEST,
                message: 'Email yêu cầu phải có',
            });
        }
    }
    static updateCustomerValidate(data) {
        if (data.firstName) {
            if (data.firstName.length > 25) {
                throw ErrorModel({
                    ...ERROR.VALIDATION.INVALID_REQUEST,
                    message: 'Họ tên đệm người mua không quá 25 kí tự',
                });
            }
            if (
                data.firstName.length != data.firstName.replace(
                    /[-[\]{}()*+?.,\\/^$@!^&_=+;:'"<>`~|#%1234567890]/g,
                    '',
                ).length
            ) {
                throw ErrorModel({
                    ...ERROR.VALIDATION.INVALID_REQUEST,
                    message: 'Họ và tên không hợp lệ',
                });
            }
        } else {
            throw ErrorModel({
                ...ERROR.VALIDATION.INVALID_REQUEST,
                message: 'Yêu cầu phải có họ tên đệm người mua',
            });
        }
        if (data.lastName) {
            if (data.lastName.length > 25) {
                throw ErrorModel({
                    ...ERROR.VALIDATION.INVALID_REQUEST,
                    message: 'Tên người mua không quá 25 kí tự',
                });
            }
            if (
                data.lastName.length != data.lastName.replace(
                    /[-[\]{}()*+?.,\\/^$@!^&_=+;:'"<>`~|#%1234567890]/g,
                    '',
                ).length
            ) {
                throw ErrorModel({
                    ...ERROR.VALIDATION.INVALID_REQUEST,
                    message: 'Họ và tên không hợp lệ',
                });
            }
            if (data.lastName.length != data.lastName.replace(/\s+/g, '').length) {
                throw ErrorModel({
                    ...ERROR.VALIDATION.INVALID_REQUEST,
                    message: 'Tên chỉ yêu cầu 1 từ',
                });
            }
        } else {
            throw ErrorModel({
                ...ERROR.VALIDATION.INVALID_REQUEST,
                message: 'Yêu cầu phải có tên người mua',
            });
        }
        if (data.phone) {
            const vPhone = Validate.phone(data.phone);
            if (!vPhone) {
                throw ErrorModel({
                    ...ERROR.VALIDATION.INVALID_REQUEST,
                    message: 'Số điện thoại không hợp lệ',
                });
            }
        } else {
            throw ErrorModel({
                ...ERROR.VALIDATION.INVALID_REQUEST,
                message: 'Yêu cầu phải có số điện thoại',
            });
        }
        if (data.email) {
            const vEmail = Validate.email(data.email);
            if (!vEmail) {
                throw ErrorModel({
                    ...ERROR.VALIDATION.INVALID_REQUEST,
                    message: 'Email không hợp lệ',
                });
            }
        } else {
            throw ErrorModel({
                ...ERROR.VALIDATION.INVALID_REQUEST,
                message: 'Email yêu cầu phải có',
            });
        }
        if (data.street && data.province && data.district && data.ward) {
            if (data.street.length > 200) {
                throw ErrorModel({
                    ...ERROR.VALIDATION.INVALID_REQUEST,
                    message: 'Địa chỉ đường người mua không quá 200 kí tự',
                });
            }
            if (data.province.length > 50) {
                throw ErrorModel({
                    ...ERROR.VALIDATION.INVALID_REQUEST,
                    message: 'Địa chỉ phường người mua không quá 50 kí tự',
                });
            }
            if (data.district.length > 50) {
                throw ErrorModel({
                    ...ERROR.VALIDATION.INVALID_REQUEST,
                    message: 'Địa chỉ quận người mua không quá 50 kí tự',
                });
            }
            if (data.ward.length > 50) {
                throw ErrorModel({
                    ...ERROR.VALIDATION.INVALID_REQUEST,
                    message: 'Địa chỉ thành phố/tỉnh người mua không quá 50 kí tự',
                });
            }
        } else {
            throw ErrorModel({
                ...ERROR.VALIDATION.INVALID_REQUEST,
                message: 'Phải có địa chỉ người mua và phải đủ thông tin',
            });
        }
    }
    static updateShop(data) {
        if (data.firstName) {
            if (data.firstName.length > 25) {
                throw ErrorModel({
                    ...ERROR.VALIDATION.INVALID_REQUEST,
                    message: 'Họ tên đệm người mua không quá 25 kí tự',
                });
            }
            if (
                data.firstName.length != data.firstName.replace(
                    /[-[\]{}()*+?.,\\/^$@!^&_=+;:'"<>`~|#%1234567890]/g,
                    '',
                ).length
            ) {
                throw ErrorModel({
                    ...ERROR.VALIDATION.INVALID_REQUEST,
                    message: 'Họ và tên không hợp lệ',
                });
            }
        } else {
            throw ErrorModel({
                ...ERROR.VALIDATION.INVALID_REQUEST,
                message: 'Yêu cầu phải có họ tên đệm người mua',
            });
        }
        if (data.lastName) {
            if (data.lastName.length > 25) {
                throw ErrorModel({
                    ...ERROR.VALIDATION.INVALID_REQUEST,
                    message: 'Tên người mua không quá 25 kí tự',
                });
            }
            if (
                data.lastName.length != data.lastName.replace(
                    /[-[\]{}()*+?.,\\/^$@!^&_=+;:'"<>`~|#%1234567890]/g,
                    '',
                ).length
            ) {
                throw ErrorModel({
                    ...ERROR.VALIDATION.INVALID_REQUEST,
                    message: 'Họ và tên không hợp lệ',
                });
            }
            if (data.lastName.length != data.lastName.replace(/\s+/g, '').length) {
                throw ErrorModel({
                    ...ERROR.VALIDATION.INVALID_REQUEST,
                    message: 'Tên chỉ yêu cầu 1 từ',
                });
            }
        } else {
            throw ErrorModel({
                ...ERROR.VALIDATION.INVALID_REQUEST,
                message: 'Yêu cầu phải có tên người mua',
            });
        }
        if (data.taxCode) {
            if (Utils.validateNumberInString(data.taxCode)) {
                if (data.taxCode.length > 13 || data.taxCode.length < 10) {
                    throw ErrorModel({
                        ...ERROR.VALIDATION.INVALID_REQUEST,
                        message: 'Mã số thuế là 10 hoặc 13 chữ số',
                    });
                }
            } else {
                throw ErrorModel({
                    ...ERROR.VALIDATION.INVALID_REQUEST,
                    message: 'Mã số thuế không hợp lệ',
                });
            }
        }
        if (data.phone) {
            const vPhone = Validate.phone(data.phone);
            if (!vPhone) {
                throw ErrorModel({
                    ...ERROR.VALIDATION.INVALID_REQUEST,
                    message: 'Số điện thoại không hợp lệ',
                });
            }
        }
        if (data.email) {
            const vEmail = Validate.email(data.email);
            if (!vEmail) {
                throw ErrorModel({
                    ...ERROR.VALIDATION.INVALID_REQUEST,
                    message: 'Email không hợp lệ',
                });
            }
        } else {
            throw ErrorModel({
                ...ERROR.VALIDATION.INVALID_REQUEST,
                message: 'Email yêu cầu phải có',
            });
        }
        if (data.address) {
            for (const i in data.address) {
                if (
                    data.address[i].street &&
                    data.address[i].province &&
                    data.address[i].district &&
                    data.address[i].ward
                ) {
                    if (data.address[i].street.length > 200) {
                        throw ErrorModel({
                            ...ERROR.VALIDATION.INVALID_REQUEST,
                            message: 'STT ' +
                                String(Number(i) + 1) +
                                ' địa chỉ đường người mua không quá 200 kí tự',
                        });
                    }
                    if (data.address[i].province.length > 50) {
                        throw ErrorModel({
                            ...ERROR.VALIDATION.INVALID_REQUEST,
                            message: 'STT ' +
                                String(Number(i) + 1) +
                                ' địa chỉ phường người mua không quá 50 kí tự',
                        });
                    }
                    if (data.address[i].district.length > 50) {
                        throw ErrorModel({
                            ...ERROR.VALIDATION.INVALID_REQUEST,
                            message: 'STT ' +
                                String(Number(i) + 1) +
                                ' địa chỉ quận người mua không quá 50 kí tự',
                        });
                    }
                    if (data.address[i].ward.length > 50) {
                        throw ErrorModel({
                            ...ERROR.VALIDATION.INVALID_REQUEST,
                            message: 'STT ' +
                                String(Number(i) + 1) +
                                ' địa chỉ thành phố/tỉnh người mua không quá 50 kí tự',
                        });
                    }
                } else {
                    throw ErrorModel({
                        ...ERROR.VALIDATION.INVALID_REQUEST,
                        message: 'Yêu cầu nhập đầy đủ thông tin địa chỉ',
                    });
                }
            }
        } else {
            throw ErrorModel({
                ...ERROR.VALIDATION.INVALID_REQUEST,
                message: 'Yêu cầu phải có địa chỉ người mua',
            });
        }
    }
}

module.exports = CustomerValidate;