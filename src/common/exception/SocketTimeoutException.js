import BaseException from './BaseException';

export default class SocketTimeoutException extends BaseException {

    constructor(code, displayMessage) {
        super(code, displayMessage);
    }
}