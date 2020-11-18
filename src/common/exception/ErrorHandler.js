import BaseException from './BaseException'
import ApiException from './ApiException'
import ErrorMessageFactory from './ErrorMessageFactory'

let instance = null;
export default class ErrorHandler {
    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    /***
     * 获取单例对象
     */
    static errorHandlerInstance() {
        let singleton = new ErrorHandler();
        return singleton;
    }

    _handleError(requestType, e) {
        let baseException = new BaseException();
        baseException.setRequestType(requestType);
        let msg = null;
        if (e != null) {
            if (e instanceof ApiException) {
                baseException.setCode(e.code);
                msg = e.displayMessage;
            } else if (e instanceof TypeError) {
                if (Object.is(e.message, "Network request failed")) {
                    //网络异常
                    baseException.setCode(BaseException.SOCKET_ERROR)
                }
                //todo 其它错误类型处理
            }
        }
        //处理exception DisplayMessage
        baseException.setDisplayMessage(ErrorMessageFactory.errorMessageFactoryInstance()._create(requestType, baseException.getCode(),msg));
        return baseException;
    }
}
