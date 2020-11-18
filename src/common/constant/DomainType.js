/**
 * Domain业务方法类型定义
 */
export default class DomainType {

    /**
     * 账号相关DomainType定义
     */
    static ACCOUNT_AUTO_LOGIN = 10011;//自动登录
    static ACCOUNT_CONTROL_GET_CODE = 1001;//获取验证码
    static ACCOUNT_CONTROL_LOGIN = 1002;//登录
    static ACCOUNT_GET_LAST_ACCOUNT = 1005;//最后一次登录账号
    static ACCOUNT_LOGOUT = 1006;//退出登录
    static ACCOUNT_GET_INIT_DATA = 1008;//获取初始化数据

}
