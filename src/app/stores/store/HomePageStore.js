/**
 * DESC:  首页Store
 * User: Administrator
 * Date: 2019/9/23
 * Time: 14:19
 */
import {action} from 'mobx';
import BasePageStore from "./BasePageStore";
import rootStore from "../RootStore";


export default class HomePageStore extends BasePageStore {

    HomePageStoreFinish = "HomePageStoreFinish";
    HomePageStoreError = "HomePageStoreError";


    componentWillMount() {
        super.componentWillMount();
        console.log("HomePageStore componentWillMount ...");
        //添加EventBus监听
        // this.addListener("eventType", this.listener);
        this.addListener(this.HomePageStoreFinish, this.onFinish);
        this.addListener(this.HomePageStoreError, this.onError);
    }


    componentDidMount() {
        super.componentDidMount();
        console.log("HomePageStore componentDidMount ...");
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        console.log("HomePageStore componentWillUnmount ...");
        //页面销毁后重置页面对应的Store对象
        rootStore.homePageStore = null;
    }

    @action
    onFinish = (baseResponse) => {
        this.superOnFinish(baseResponse);
        if (baseResponse != null) {
            switch (baseResponse.getRequestType()) {
            }
        }
    };

    @action
    onError = (baseException) => {
        this.superOnError(baseException);
        console.warn("HomePageStore onError requestType  -> ", baseException.getRequestType() + "," +
            " displayMsg -> ", baseException.getDisplayMessage())
    }

}
