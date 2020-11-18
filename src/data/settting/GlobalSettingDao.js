import {readStorage, writeStorage} from './storage/storage';

/**
 * APP全局配置信息
 */
class GlobalSettingDao {
    LAST_ACCOUNT = "last_account";//最后登录账号
    IS_GUIDE = "is_guide";//是否已开启引导模式
    USER_INFO = "user_info";//用户信息

    /**
     * 获取最后登录账号
     * @returns {*|Promise<any>|Promise<*>}
     */
    getLastAccount() {
        return readStorage(this.LAST_ACCOUNT);
    }

    /**
     * 存用户信息
     * @param userInfo
     */
    setUserInfo(userInfo) {
        writeStorage(this.USER_INFO, userInfo);
    }

    /**
     * 取用户信息
     * @returns {*|Promise|Promise<any>|Promise<*>}
     */
    getUserInfo() {
        return readStorage(this.USER_INFO);
    }

    /**
     * 设置最后登录账号
     * @param account
     */
    setLastAccount(account) {
        writeStorage(this.LAST_ACCOUNT, account);
    }

    async getIsGuide() {
        let isGuid = await readStorage(this.IS_GUIDE);
        if (isGuid == null) {
            return false;
        }
        return isGuid;
    }

    setIsGuide(isGuid) {
        writeStorage(this.IS_GUIDE, isGuid);
    }

}


const globalSettingDao = new GlobalSettingDao();
export {globalSettingDao};
