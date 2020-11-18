import {readStorage, writeStorage} from './storage/storage';

/**
 * 用户相关配置信息
 */
export default class UserSettingDao {
    account;
    USER_JSON = "_user_json";

    constructor(account) {
        this.account = account;
    }


    getUser() {
        return readStorage((this.account + this.USER_JSON));
    }

    setUser(userJson) {
        writeStorage((this.account + this.USER_JSON), userJson);
    }


}
