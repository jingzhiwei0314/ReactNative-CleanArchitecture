/**
 * 账号相关业务
 */
import BaseController from '../BaseController'
import DomainType from '../../../common/constant/DomainType';
import Config from '../../../common/Config';
import UserSettingDao from '../../../data/settting/UserSettingDao';
import {globalSettingDao} from "../../../data/settting/GlobalSettingDao";
import {hex_md5} from "../../../common/utils/md5";
import DeviceInfo from 'react-native-device-info';
import CustomEvent from "../../../common/events/CustomEvent";
import BaseResponse from "../../../common/http/base/BaseResponse";
import EventType from "../../../common/constant/EventType";

let instance = null;
export default class AccountController extends BaseController {

    constructor() {
        super();
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    /***
     * 获取单例对象
     */
    static getInstance() {
        let singleton = new AccountController();
        return singleton;
    }

    /**
     * 退出登录一定要把单例对象制空
     */
    setInstanceNull() {
        instance = null;
    }

    autoLogin = async (finishEventType, errorEventType) => {
        let requestType = DomainType.ACCOUNT_AUTO_LOGIN;
        try {
            let userInfo = await globalSettingDao.getUserInfo();
            Log('autoLogin userInfo -> ' + userInfo);
            Config.getInstance().setUserInfo(userInfo);
            this.onFinish(requestType, userInfo, finishEventType);
        } catch (e) {
            console.warn("autoLogin e-> ", e);
            this.onError(requestType, e, errorEventType)
        }
    };

    /**
     * 获取最后登录手机号
     * @param finishEventType
     * @param errorEventType
     * @returns {Promise<void>}
     */
    getLastAccount = async (finishEventType, errorEventType) => {
        let requestType = DomainType.ACCOUNT_GET_LAST_ACCOUNT;
        try {
            let account = await globalSettingDao.getLastAccount();
            if (account == null) {
                account = "";
            }
            this.onFinish(requestType, account, finishEventType);
        } catch (e) {
            console.warn("getLastAccount e-> ", e);
            this.onError(requestType, e, errorEventType)
        }
    };

    /**
     * 获取验证码
     * @param finish
     * @param error
     * @param phone
     * @private
     */
    getVerifyCode = async (finishEventType, errorEventType, phone) => {
        let requestType = DomainType.ACCOUNT_CONTROL_GET_CODE;
        try {
            // let resultData = await API.AUTHENTICATE_CODE(phone);
            // console.log("getVerifyCode resultData -> ", resultData);
            //验证码获取成功
            this.onFinish(requestType, true, finishEventType);
        } catch (e) {
            console.warn("getVerifyCode e-> ", e);
            this.onError(requestType, e, errorEventType)
        }
    };


    /**
     * 获取用户初始化数据
     * @param finishEventType
     * @param errorEventType
     * @param phone
     * @param code
     * @returns {Promise<void>}
     */
    getInitData = async (finishEventType, errorEventType) => {
        let requestType = DomainType.ACCOUNT_GET_INIT_DATA;
        try {
            let resultData = await API.GET_ACCOUNT_INIT_DATA(Config.getInstance().getPhone(), {authtoken: Config.getInstance().getAuthtoken()});
            let userInfo = {
                phone: Config.getInstance().getPhone(),
                userId: Config.getInstance().getUserId(),
                authtoken: Config.getInstance().getAuthtoken(),
                realName: Config.getInstance().getRealName(),
                isAuth: resultData.data.isAuth,
                amount: resultData.data.amount,
            };
            Config.getInstance().setUserInfo(userInfo);
            globalSettingDao.setUserInfo(userInfo);
            this.onFinish(requestType, userInfo, finishEventType);
        } catch (e) {
            console.warn("login e-> ", e);
            this.onError(requestType, e, errorEventType);
        }
    };
    /**
     * 短信验证码登录
     * @param finish
     * @param error
     * @param phone
     * @param code
     * @private
     */
    login = async (finishEventType, errorEventType, phone, code) => {
        let requestType = DomainType.ACCOUNT_CONTROL_LOGIN;
        try {
            // let resultData = await API.AUTHENTICATE_LOGIN(phone, code);
            // Log("login phone -> " + phone + ', code -> ' + code + ", resultData -> " + resultData);
            // let userInfo = {
            //     phone: phone,
            //     userId: resultData.data.userId,
            //     authtoken: resultData.data.authtoken,
            //     isAuth: resultData.data.isAuth,
            //     amount: resultData.data.amount,
            //     realName: resultData.data.realName,
            // };
            //
            // Config.getInstance().setUserInfo(userInfo);
            // globalSettingDao.setUserInfo(userInfo);
            // globalSettingDao.setLastAccount(userInfo.phone);
            this.onFinish(requestType, true, finishEventType);
        } catch (e) {
            console.warn("login e-> ", e);
            this.onError(requestType, e, errorEventType);
        }
    };




    /**
     * 退出登录
     * @param finish
     * @param error
     */
    logout = async (finishEventType, errorEventType) => {
        let requestType = DomainType.ACCOUNT_LOGOUT;
        try {
            let resultData = await API.AUTHENTICATE_LOGOUT({authtoken: Config.getInstance().getAuthtoken()});
            this.clearCache();
            CustomEvent.emit(EventType.EVENT_TYPE_ON_EXIT_LOGIN, "onExit");
            this.onFinish(requestType, true, finishEventType);
        } catch (e) {
            console.warn("logout e-> ", e);
            this.onError(requestType, e, errorEventType)
        }
    };

    clearCache() {
        Config.getInstance().setUserInfo(null);//清除缓存
        globalSettingDao.setUserInfo(null);
    }


}
