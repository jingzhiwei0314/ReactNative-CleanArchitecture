import BaseException from './BaseException'
import DomainType from '../constant/DomainType'
import zh from '../language/zh'

/**
 * 将错误code转换成显示的errorMsg
 */
let instance = null;
export default class ErrorMessageFactory {

    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    /***
     * 获取单例对象
     */
    static errorMessageFactoryInstance() {
        let singleton = new ErrorMessageFactory();
        return singleton;
    }

    _create(requestType, code, msg) {
        let errorMsg = "";
        switch (code) {
            case BaseException.SOCKET_TIMEOUT_ERROR:
                errorMsg = zh.ERROR_MSG_NET_TIME_OUT;
                break;
            case BaseException.SOCKET_ERROR:
                errorMsg = zh.ERROR_MSG_SOCKET_ERROR;
                break;
            case BaseException.ERROR_HTTP_400:
            case BaseException.ERROR_HTTP_IDENTITY_NOT_MATCH:
                errorMsg = msg;
                break;
            case BaseException.ERROR_HTTP_404:
                errorMsg = zh.ERROR_MSG_SERVER_RESOURCE_NOT_FIND;
                break;
            case BaseException.ERROR_HTTP_500:
                errorMsg = zh.ERROR_MSG_SERVER_FAILED;
                break;
            default:
                switch (requestType) {
                    case DomainType.ACCOUNT_CONTROL_GET_CODE://获取验证码失败
                        errorMsg = zh.ERROR_MSG_GET_CODE_ERROR
                        break;
                    case DomainType.ACCOUNT_CONTROL_LOGIN://登录失败
                        errorMsg = zh.ERROR_MSG_LOGIN_ERROR;
                        break;
                    default://未知错误
                        errorMsg = zh.ERROR_MSG_UNKNOWN_ERROR;
                        break;
                }
        }
        return errorMsg;
    }
}
