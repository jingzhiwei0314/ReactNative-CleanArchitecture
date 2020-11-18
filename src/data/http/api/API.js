import HTTPClient from '../client/HTTPClient';
import URLConstant from './URLConstant'

export default class API {

    /**
     * 获取登录验证码
     * params{account手机号}
     */
    static AUTHENTICATE_CODE = (phone, headers = null) => {
        return HTTPClient.HTTPClientInstance().GET(URLConstant.HTTP_USER_GET_CODE, {phone}, headers);
    };

    /**
     * 短信验证码登录接口
     * @param temptoken
     * @param headers
     * @returns {Promise<*>}
     * @constructor
     */
    static AUTHENTICATE_LOGIN = (phone, code, headers = null) => {
        return HTTPClient.HTTPClientInstance().POST(URLConstant.HTTP_USER_LOGIN, {
            phone,
            code,
            channelCode: 123456
        }, headers);
    };
    /**
     * 获取登录验证码
     * params{account手机号}
     */
    static GET_ACCOUNT_INIT_DATA = (phone, headers = null) => {
        return HTTPClient.HTTPClientInstance().GET(URLConstant.HTTP_USER_GET_INIT_DATA, {phone}, headers);
    };

    /**
     * 密码登录接口
     * @param phone
     * @param pwd
     * @param headers
     * @returns {Promise<*>}
     * @constructor
     */
    static AUTHENTICATE_LOGIN_PWD = (phone, pwd, headers = null) => {
        return HTTPClient.HTTPClientInstance().POST(URLConstant.HTTP_USER_LOGIN_PWD, {phone, pwd}, headers);
    };


    /**
     * 登出接口
     * @param headers
     * @returns {Promise<*>}
     * @constructor
     */
    static AUTHENTICATE_LOGOUT = (headers = null) => {
        return HTTPClient.HTTPClientInstance().POST(URLConstant.HTTP_USER_LOGOUT, null, headers);
    };

}
