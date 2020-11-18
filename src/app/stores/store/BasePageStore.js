import CustomEvent from '../../../common/events/CustomEvent';
import BaseException from "../../../common/exception/BaseException";

export default class BasePageStore {

    pageView;//View层句柄
    eventListeners = new Map();

    constructor(_basePageStore) {

    }

    /**
     * 设置页面对象
     * @param pageView
     */
    setPageView(pageView) {
        this.pageView = pageView;
    }

    /**
     * 添加EventBus监听
     * @param eventType
     * @param listener
     */
    addListener = (eventType: string, listener: Function) => {
        CustomEvent.addListener(eventType, listener);
        this.eventListeners.set(eventType, listener);
    }


    /**
     * React-native 生命周期方法
     * 准备加载组件，会调用componentWillMount(),这个函数在整个生命周期中只被调用一次
     */
    componentWillMount() {
        console.log("BasePageStore componentWillMount ... ");
    }

    /**
     * 在组件第一次绘制之后，会调用componentDidMount()，通知组件已经加载完成
     */
    componentDidMount() {
        console.log("BasePageStore componentDidMount ... ");
    }

    /**
     * 当组件要被从界面上移除的时候，就会调用componentWillUnmount()
     */
    componentWillUnmount() {
        console.log("BasePageStore componentWillUnmount ... ");
        //取消EventBus注册的监听
        this.eventListeners.forEach((value, key, map) => {
            CustomEvent.removeListener(key, value);
        });
    }

    /**
     * 业务方法处理成功回调
     * @param baseResponse  domain层回调数据
     */
    superOnFinish = (baseResponse) => {
        if (this.pageView != null)
            this.pageView.hidenHUDLoading();
    }

    /**
     * 业务方法处理失败回调
     * @param baseException domain层回调Exception对象
     */
    superOnError = (baseException) => {
        console.warn("onError requestType  -> " + baseException.getRequestType())
        if (this.pageView != null)
            this.pageView.hidenHUDLoading();
        if (baseException.code === BaseException.ERROR_HTTP_API_AUTH ||
            baseException.code === BaseException.ERROR_HTTP_AUTH_EXPIRE) {
            //token失效
            if (this.pageView != null)
                this.pageView._exceptionLogout();
        } else if (baseException.getDisplayMessage() != null && baseException.getDisplayMessage() != "") {
            if (this.pageView != null)
                this.pageView.showHUDMessage(baseException.getDisplayMessage());
        }
    }
}
