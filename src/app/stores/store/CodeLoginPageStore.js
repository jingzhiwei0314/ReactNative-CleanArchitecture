/**
 * DESC:
 * User: Administrator
 * Date: 2019/9/24
 * Time: 19:24
 */
import {action, observable} from 'mobx';
import DomainType from '../../../common/constant/DomainType';
import BasePageStore from "./BasePageStore";
import rootStore from "../RootStore";
import AccountController from "../../../domain/controller/account/AccountController";


export default class CodeLoginPageStore extends BasePageStore {

    @observable phone = "";
    @observable code = "";
    @observable verifyText = '重新发送';
    @observable verifyEnable = true;
    CodeLoginPageStoreFinish = "CodeLoginPageStoreFinish";
    CodeLoginPageStoreError = "CodeLoginPageStoreError";

    componentWillMount() {
        super.componentWillMount();
        console.log("CodeLoginPageStore componentWillMount ...");
        //添加EventBus监听
        // this.addListener("eventType", this.listener);
        this.addListener(this.CodeLoginPageStoreFinish, this.onFinish);
        this.addListener(this.CodeLoginPageStoreError, this.onError);
        this.onGetVerifyCodeSuccess();
    }

    componentDidMount() {
        super.componentDidMount();
        console.log("CodeLoginPageStore componentDidMount ...");
    }

    /**
     * 获取验证码
     */
    @action
    getVerifyCode = () => {
        console.info("getVerifyCode phone-> " + this.phone);
        this.pageView.showHUDLoading();
        AccountController.getInstance().getVerifyCode(this.CodeLoginPageStoreFinish, this.CodeLoginPageStoreError, this.phone);
    }

    /**
     * 登录
     */
    @action
    login = () => {
        if (this.code === null || this.code === '') {
            this.pageView.showHUDMessage("请输入验证码");
            return;
        }
        this.pageView.showHUDLoading();
        AccountController.getInstance().login(this.CodeLoginPageStoreFinish, this.CodeLoginPageStoreError, this.phone, this.code);
    }


    @action
    onGetVerifyCodeSuccess() {
        this.verifyEnable = false;//验证码按钮不可点击

        let i = 0;
        this.interval = setInterval(() => {
            i++;
            this.verifyText = `${60 - i}秒`;
            if (i == 60) {
                this.verifyEnable = true;
                clearInterval(this.interval);
                this.verifyText = "重新发送";
            }
        }, 1000);

    }

    componentWillUnmount() {
        super.componentWillUnmount();
        console.log("CodeLoginPageStore componentWillUnmount ...");
        //页面销毁后重置页面对应的Store对象
        rootStore.codeLoginPageStore = null;
    }


    @action
    onFinish = (baseResponse) => {
        Log('CodeLoginPageStore onFinish');
        this.superOnFinish(baseResponse);
        if (baseResponse != null) {
            switch (baseResponse.getRequestType()) {
                case DomainType.ACCOUNT_CONTROL_LOGIN:
                    //登录成功
                    this.pageView.replacePage();
                    break;
                case DomainType.ACCOUNT_CONTROL_GET_CODE:
                    //获取验证码成功
                    this.pageView.showHUDMessage("验证码已发送");
                    this.onGetVerifyCodeSuccess();
                    console.log("onFinish baseResponse ACCOUNT_CONTROL_GET_CODE data -> ", baseResponse.getData())
                    break;
            }
        }
    }


    @action
    onError = (baseException) => {
        this.superOnError(baseException);
        console.warn("CodeLoginPageStore onError requestType  -> ", baseException.getRequestType() + "," +
            " displayMsg -> ", baseException.getDisplayMessage())
    }

}
