export default class BaseException extends Error {
    code;
    requestType;
    displayMessage;
    data;

    /*连接网络超时*/
    static SOCKET_TIMEOUT_ERROR = 2;
    /*无网络连接*/
    static SOCKET_ERROR = 3;
    /*未知错误*/
    static UNKNOWN_ERROR = 4;

    //全局错误码
    static ERROR_HTTP_API_AUTH = 401;//接口认证失败
    static ERROR_HTTP_AUTH_EXPIRE = 401;//授权过期
    static ERROR_HTTP_MISSING_PARAMETERS = 400;//缺失参数
    static ERROR_HTTP_SYSTEM_ERROR = 500;//系统异常

    //http
    static  ERROR_HTTP_400 = 400;

    static ERROR_HTTP_404 = 404;

    static ERROR_HTTP_405 = 405;

    static  ERROR_HTTP_500 = 500;

    static ERROR_HTTP_IDENTITY_NOT_MATCH = 2003;//身份认证不匹配

    static DAO_ERROR = 30;//数据操作失败

    constructor(code, displayMessage) {
        super();
        this.code = code;
        this.displayMessage = displayMessage;
    }

    setCode = (code) => {
        this.code = code;
    }

    getCode = () => {
        return this.code;
    }
    getRequestType = () => {
        return this.requestType;
    }
    setRequestType = (requestType) => {
        this.requestType = requestType;
    }
    setDisplayMessage = (message) => {
        this.displayMessage = message;
    }
    getDisplayMessage = () => {
        return this.displayMessage;
    }
    setData = (data) => {
        this.data = data;
    }
    getData = () => {
        return this.data;
    }
}
