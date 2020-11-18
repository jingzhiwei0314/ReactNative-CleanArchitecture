/**
 * DESC:
 * User: Administrator
 * Date: 2019/9/25
 * Time: 16:05
 */
import {action, observable} from 'mobx';
import BasePageStore from "./BasePageStore";
import rootStore from "../RootStore";

export default class MyPageStore extends BasePageStore {

    @observable isLogin = false;
    MyPageStoreFinish = "MyPageStoreFinish";
    MyPageStoreError = "MyPageStoreError";

    componentWillMount() {
        super.componentWillMount();
        console.log("MyPageStore componentWillMount ...");
        //添加EventBus监听
        // this.addListener("eventType", this.listener);
        this.addListener(this.MyPageStoreFinish, this.onFinish);
        this.addListener(this.MyPageStoreError, this.onError);
    }

    componentDidMount() {
        super.componentDidMount();
        console.log("MyPageStore componentDidMount ...");
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        console.log("MyPageStore componentWillUnmount ...");
        //页面销毁后重置页面对应的Store对象
        rootStore.myPageStore = null;
    }

    @action
    onFinish = (baseResponse) => {
        this.superOnFinish(baseResponse);
        if (baseResponse != null) {
            switch (baseResponse.getRequestType()) {
            }
        }
    }

    @action
    onError = (baseException) => {
        this.superOnError(baseException);
        console.warn("MyPageStore onError requestType  -> ", baseException.getRequestType() + "," +
            " displayMsg -> ", baseException.getDisplayMessage())
    }

}
