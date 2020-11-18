/**
 * DESC:
 * User: Administrator
 * Date: 2019/9/24
 * Time: 11:47
 */
import {action, observable} from 'mobx';
import DomainType from '../../../common/constant/DomainType';
import BasePageStore from './BasePageStore';
import rootStore from '../RootStore';
import AccountController from '../../../domain/controller/account/AccountController';

export default class LoginPageStore extends BasePageStore {


    @observable
    phone = '';
    LoginPageStoreFinish = 'LoginPageStoreFinish';
    LoginPageStoreError = 'LoginPageStoreError';

    componentWillMount() {
        super.componentWillMount();
        console.log('LoginPageStore componentWillMount ...');
        //添加EventBus监听
        // this.addListener("eventType", this.listener);
        this.addListener(this.LoginPageStoreFinish, this.onFinish);
        this.addListener(this.LoginPageStoreError, this.onError);
    }


    componentDidMount() {
        super.componentDidMount();
        console.log('LoginPageStore componentDidMount ...');
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        console.log('LoginPageStore componentWillUnmount ...');
        //页面销毁后重置页面对应的Store对象
        rootStore.loginPageStore = null;
    }

    /**
     * 获取验证码
     */
    @action
    getCode = () => {
        console.log('LoginPageStore getCode phone -> ' + this.phone);
        if (!phoneNumCheck(this.phone, false)) {
            this.pageView.showHUDMessage('请输入正确的手机号');
            return;
        }
        this.pageView.showHUDLoading();
        AccountController.getInstance().getVerifyCode(this.LoginPageStoreFinish, this.LoginPageStoreError, this.phone);
    };

    @action
    onFinish = (baseResponse) => {
        this.superOnFinish(baseResponse);
        if (baseResponse != null) {
            switch (baseResponse.getRequestType()) {
                case DomainType.ACCOUNT_CONTROL_GET_CODE:
                    //验证码获取成功
                    this.pageView.showHUDMessage('验证码已发送');
                    this.pageView.toCodeLogin();
                    break;
                case DomainType.ACCOUNT_GET_LAST_ACCOUNT:
                    this.phone = baseResponse.getData();
                    break;
            }
        }
    };

    @action
    onError = (baseException) => {
        this.superOnError(baseException);
        console.warn('LoginPageStore onError requestType  -> ', baseException.getRequestType() + ',' +
            ' displayMsg -> ', baseException.getDisplayMessage());
    };

}
