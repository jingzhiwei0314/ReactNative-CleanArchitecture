import BaseException from './BaseException';

export default class DAOException extends BaseException {

    constructor(code, displayMessage) {
        super(code, displayMessage);
    }
}
