import {uuid} from "../common/utils/StringUtils";

let instance = null;
export default class Config {
    userInfo = null;

    deviceId = null;

    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    /***
     * 获取单例对象
     */
    static getInstance() {
        let singleton = new Config();
        return singleton;
    }

    setUserInfo(userInfo) {
        this.userInfo = userInfo;
    }

    getUserInfo() {
        return this.userInfo;
    }

    isAuth() {
        if (this.userInfo != null) {
            return this.userInfo.isAuth;
            // return 2;
        }
        return 0;
    }

    getUserId() {
        if (this.userInfo != null) {
            return this.userInfo.userId;
        }
        return "";
    }

    getPhone() {
        if (this.userInfo != null) {
            return this.userInfo.phone;
        }
        return "";
    }

    getAuthtoken() {
        if (this.userInfo != null) {
            return this.userInfo.authtoken;
        }
        return "";
    }

    getDeviceId() {
        if (this.deviceId === null) {
            this.deviceId = uuid();
        }
        return this.deviceId;
    }

    getAmount() {
        if (this.userInfo != null) {
            return this.userInfo.amount + '';
        }
        return "";
    }


    getRealName() {
        if (this.userInfo != null) {
            return this.userInfo.realName;
        }
        return "";
    }
}
