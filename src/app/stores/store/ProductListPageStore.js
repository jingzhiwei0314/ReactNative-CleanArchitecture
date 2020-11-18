/**
 * DESC:
 * User: Administrator
 * Date: 2019/12/6
 * Time: 14:48
 */
import {action} from 'mobx';
import BasePageStore from "./BasePageStore";
import rootStore from "../RootStore";


export default class ProductListPageStore extends BasePageStore {

    ProductListPageStoreFinish = "ProductListPageStoreFinish";
    ProductListPageStoreError = "ProductListPageStoreError";

    componentWillMount() {
        super.componentWillMount();
        Log("ProductListPageStore componentWillMount ...");
        //添加EventBus监听
        // this.addListener("eventType", this.listener);
        this.addListener(this.ProductListPageStoreFinish, this.onFinish);
        this.addListener(this.ProductListPageStoreError, this.onError);
    }


    componentWillUnmount() {
        super.componentWillUnmount();
        Log("ProductListPageStore componentWillUnmount ...");
        //页面销毁后重置页面对应的Store对象
        rootStore.productListPageStore = null;
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
        console.warn("ProductListPageStore onError requestType  -> ", baseException.getRequestType() + "," +
            " displayMsg -> ", baseException.getDisplayMessage())
    }
}
