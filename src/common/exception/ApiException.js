import BaseException from './BaseException';

export default class ApiException extends BaseException {


    constructor(code, displayMessage) {
        super(code, displayMessage);
    }
}